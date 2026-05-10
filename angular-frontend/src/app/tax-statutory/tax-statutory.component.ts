import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({ selector: 'app-tax-statutory',
  template: `
    <div class="page-container page-enter">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="page-title">Tax & Statutory Compliance</h1>
          <p style="color:var(--text-3);font-size:13px;">PF · ESI · PT · TDS · Form 16 · Challans</p>
        </div>
        <div style="display:flex;gap:8px;">
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='overview'" (click)="tab='overview'">Overview</button>
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='pf'" (click)="tab='pf'">PF</button>
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='esi'" (click)="tab='esi'">ESI</button>
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='tds'" (click)="tab='tds'">TDS/PT</button>
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='declarations'" (click)="tab='declarations';loadDeclarations()">Declarations</button>
        </div>
      </div>

      <!-- Status Cards -->
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:24px;">
        <div *ngFor="let s of statusCards" class="stat-card" [style.border-color]="s.status==='Filed'?'#10b981':s.status==='Overdue'?'#ef4444':'#f59e0b'">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
            <span style="font-weight:700;font-size:15px;">{{s.type}}</span>
            <span class="status-badge" [style.background]="s.status==='Filed'?'#d1fae5':s.status==='Overdue'?'#fee2e2':'#fef3c7'" [style.color]="s.status==='Filed'?'#065f46':s.status==='Overdue'?'#991b1b':'#92400e'">{{s.status}}</span>
          </div>
          <div style="font-size:22px;font-weight:800;color:#6b4df0;">₹{{s.amount | number}}</div>
          <div style="font-size:12px;color:var(--text-3);margin-top:4px;">Due: {{s.due}} · Period: {{s.period}}</div>
          <button class="btn btn-ghost btn-sm" style="margin-top:10px;width:100%;" (click)="downloadChallan(s.type)">Download Challan</button>
        </div>
      </div>

      <div *ngIf="challanMsg" style="padding:10px 14px;background:#d1fae5;border-radius:8px;color:#065f46;font-size:13px;font-weight:600;margin-bottom:12px;">{{challanMsg}}</div>

      <!-- OVERVIEW -->
      <div *ngIf="tab==='overview'">
        <div class="card">
          <h3 style="font-weight:700;margin-bottom:16px;">Statutory Due Date Calendar</h3>
          <div style="display:flex;flex-direction:column;gap:0;">
            <div *ngFor="let d of dueDates" style="display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-bottom:1px solid var(--border);">
              <div style="display:flex;align-items:center;gap:12px;">
                <div style="width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:14px;" [style.background]="d.overdue?'#fee2e2':'rgba(107,77,240,.08)'" [style.color]="d.overdue?'#991b1b':'#6b4df0'">{{d.day}}</div>
                <div>
                  <div style="font-weight:600;font-size:13px;">{{d.type}}</div>
                  <div style="font-size:12px;color:var(--text-3);">{{d.desc}}</div>
                </div>
              </div>
              <div style="text-align:right;">
                <div style="font-weight:700;color:#6b4df0;">₹{{d.amount | number}}</div>
                <span class="status-badge" [style.background]="d.overdue?'#fee2e2':'#d1fae5'" [style.color]="d.overdue?'#991b1b':'#065f46'">{{d.overdue?'Overdue':'Upcoming'}}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <h3 style="font-weight:700;margin-bottom:16px;">6-Month Filing History</h3>
          <table style="width:100%;border-collapse:collapse;">
            <thead><tr style="border-bottom:2px solid var(--border);">
              <th class="th">Month</th><th class="th">PF Paid</th><th class="th">ESI Paid</th><th class="th">PT Paid</th><th class="th">TDS Paid</th><th class="th">Status</th>
            </tr></thead>
            <tbody>
              <tr *ngFor="let h of filingHistory" style="border-bottom:1px solid var(--border);" class="tr-hover">
                <td class="td"><strong>{{h.month}}</strong></td>
                <td class="td">₹{{h.pf | number}}</td>
                <td class="td">₹{{h.esi | number}}</td>
                <td class="td">₹{{h.pt | number}}</td>
                <td class="td">₹{{h.tds | number}}</td>
                <td class="td"><span class="spill" [class.filed]="h.status==='Filed'" [class.pending]="h.status==='Pending'">{{h.status}}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- PF -->
      <div *ngIf="tab==='pf'">
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:24px;">
          <div class="kpi-card"><div class="kpi-val" style="color:#6b4df0;">₹{{pfData.empContrib | number}}</div><div class="kpi-lbl">Employee Contribution</div></div>
          <div class="kpi-card"><div class="kpi-val" style="color:#10b981;">₹{{pfData.empContrib | number}}</div><div class="kpi-lbl">Employer Contribution</div></div>
          <div class="kpi-card"><div class="kpi-val" style="color:#f59e0b;">₹{{pfData.total | number}}</div><div class="kpi-lbl">Total PF This Month</div></div>
        </div>
        <div class="card">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
            <h3 style="font-weight:700;">PF Challan Details — May 2026</h3>
            <button class="btn btn-primary btn-sm" (click)="generateChallan('PF')">Generate Challan</button>
          </div>
          <table style="width:100%;border-collapse:collapse;">
            <thead><tr style="border-bottom:2px solid var(--border);">
              <th class="th">Employee</th><th class="th">UAN</th><th class="th">Basic</th><th class="th">Emp PF (12%)</th><th class="th">Employer PF (12%)</th><th class="th">Total</th>
            </tr></thead>
            <tbody>
              <tr *ngFor="let r of pfRows" style="border-bottom:1px solid var(--border);" class="tr-hover">
                <td class="td"><strong>{{r.name}}</strong></td>
                <td class="td" style="font-size:12px;color:var(--text-3);">{{r.uan}}</td>
                <td class="td">₹{{r.basic | number}}</td>
                <td class="td">₹{{r.empPF | number}}</td>
                <td class="td">₹{{r.erPF | number}}</td>
                <td class="td" style="font-weight:700;color:#6b4df0;">₹{{r.empPF+r.erPF | number}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- ESI -->
      <div *ngIf="tab==='esi'">
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:24px;">
          <div class="kpi-card"><div class="kpi-val" style="color:#6b4df0;">{{esiData.eligible}}</div><div class="kpi-lbl">ESI Eligible Employees</div></div>
          <div class="kpi-card"><div class="kpi-val" style="color:#10b981;">₹{{esiData.total | number}}</div><div class="kpi-lbl">Total ESI This Month</div></div>
          <div class="kpi-card"><div class="kpi-val" style="color:#f59e0b;">₹21,000</div><div class="kpi-lbl">ESI Wage Ceiling</div></div>
        </div>
        <div class="card">
          <h3 style="font-weight:700;margin-bottom:16px;">ESI Contribution (Employee 0.75% + Employer 3.25%)</h3>
          <table style="width:100%;border-collapse:collapse;">
            <thead><tr style="border-bottom:2px solid var(--border);">
              <th class="th">Employee</th><th class="th">ESIC No</th><th class="th">Gross</th><th class="th">Emp ESI (0.75%)</th><th class="th">Employer ESI (3.25%)</th><th class="th">Total</th>
            </tr></thead>
            <tbody>
              <tr *ngFor="let r of esiRows" style="border-bottom:1px solid var(--border);" class="tr-hover">
                <td class="td"><strong>{{r.name}}</strong></td>
                <td class="td" style="font-size:12px;color:var(--text-3);">{{r.esic}}</td>
                <td class="td">₹{{r.gross | number}}</td>
                <td class="td">₹{{(r.gross*0.0075)|number:'1.0-0'}}</td>
                <td class="td">₹{{(r.gross*0.0325)|number:'1.0-0'}}</td>
                <td class="td" style="font-weight:700;color:#6b4df0;">₹{{(r.gross*0.04)|number:'1.0-0'}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- TDS/PT -->
      <div *ngIf="tab==='tds'">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;">
          <div class="card">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
              <h3 style="font-weight:700;">TDS Summary</h3>
              <button class="btn btn-primary btn-sm" (click)="generateForm16()">Generate Form 16</button>
            </div>
            <div style="display:flex;flex-direction:column;gap:10px;">
              <div *ngFor="let t of tdsRows" style="display:flex;justify-content:space-between;padding:10px;background:var(--surface-alt);border-radius:8px;">
                <div>
                  <div style="font-weight:600;font-size:13px;">{{t.name}}</div>
                  <div style="font-size:11px;color:var(--text-3);">PAN: {{t.pan}}</div>
                </div>
                <div style="text-align:right;">
                  <div style="font-weight:700;color:#ef4444;">₹{{t.tds | number}}</div>
                  <div style="font-size:11px;color:var(--text-3);">{{t.slab}} slab</div>
                </div>
              </div>
            </div>
          </div>
          <div class="card">
            <h3 style="font-weight:700;margin-bottom:16px;">Professional Tax — State-wise</h3>
            <div style="display:flex;flex-direction:column;gap:10px;">
              <div *ngFor="let p of ptStates" style="display:flex;justify-content:space-between;padding:10px;background:var(--surface-alt);border-radius:8px;">
                <div>
                  <div style="font-weight:600;font-size:13px;">{{p.state}}</div>
                  <div style="font-size:11px;color:var(--text-3);">{{p.employees}} employees</div>
                </div>
                <div style="text-align:right;">
                  <div style="font-weight:700;color:#6b4df0;">₹{{p.amount}}/mo</div>
                  <span class="spill" [class.filed]="p.status==='Filed'" [class.pending]="p.status==='Pending'">{{p.status}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- DECLARATIONS -->
      <div *ngIf="tab==='declarations'">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;">
          <!-- Create Declaration -->
          <div class="card">
            <h3 style="font-weight:700;margin-bottom:16px;">New Tax Declaration</h3>
            <div style="display:flex;flex-direction:column;gap:14px;">
              <div>
                <label style="font-size:12px;font-weight:600;color:var(--text-3);">Employee</label>
                <select class="select" [(ngModel)]="declForm.empId" style="margin-top:4px;">
                  <option value="">Select Employee</option>
                  <option *ngFor="let e of declEmployees" [value]="e.empId">{{e.name}}</option>
                </select>
              </div>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
                <div>
                  <label style="font-size:12px;font-weight:600;color:var(--text-3);">Section</label>
                  <select class="select" [(ngModel)]="declForm.section" style="margin-top:4px;">
                    <option value="">Select</option>
                    <option *ngFor="let s of taxSections">{{s}}</option>
                  </select>
                </div>
                <div>
                  <label style="font-size:12px;font-weight:600;color:var(--text-3);">Fiscal Year</label>
                  <input class="input" [(ngModel)]="declForm.fiscalYear" style="margin-top:4px;" placeholder="2025-26">
                </div>
              </div>
              <div>
                <label style="font-size:12px;font-weight:600;color:var(--text-3);">Amount (₹)</label>
                <input class="input" type="number" [(ngModel)]="declForm.amount" style="margin-top:4px;">
              </div>
              <div>
                <label style="font-size:12px;font-weight:600;color:var(--text-3);">Description</label>
                <input class="input" [(ngModel)]="declForm.description" style="margin-top:4px;" placeholder="e.g. LIC Premium, PPF, ELSS">
              </div>
              <button class="btn btn-primary" (click)="saveDeclaration()">Submit Declaration</button>
              <div *ngIf="declMsg" style="padding:10px;background:#d1fae5;border-radius:8px;color:#065f46;font-size:13px;font-weight:600;">{{declMsg}}</div>
            </div>
          </div>

          <!-- Declarations List -->
          <div>
            <h3 style="font-weight:700;margin-bottom:16px;">Filed Declarations</h3>
            <div *ngIf="!declarations.length" style="text-align:center;padding:32px;color:var(--text-3);">No declarations found</div>
            <div *ngFor="let d of declarations" class="card" style="padding:14px;margin-bottom:10px;">
              <div style="display:flex;justify-content:space-between;align-items:center;">
                <div>
                  <div style="font-weight:700;font-size:13px;">{{d.employeeName}} — {{d.section}}</div>
                  <div style="font-size:12px;color:var(--text-3);">{{d.description}} · FY {{d.fiscalYear}}</div>
                </div>
                <div style="font-size:18px;font-weight:800;color:#6b4df0;">₹{{d.amount | number}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .stat-card { background:var(--surface);border:2px solid var(--border);border-radius:12px;padding:16px;transition:border-color .2s; }
    .status-badge { padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700; }
    .kpi-card { background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px;text-align:center; }
    .kpi-val { font-size:26px;font-weight:800; }
    .kpi-lbl { font-size:12px;color:var(--text-3);margin-top:4px; }
    .th { padding:10px;text-align:left;font-size:12px;color:var(--text-3);font-weight:600; }
    .td { padding:10px;font-size:13px; }
    .tr-hover:hover { background:var(--surface-alt); }
    .spill { padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700; }
    .spill.filed { background:#d1fae5;color:#065f46; }
    .spill.pending { background:#fef3c7;color:#92400e; }
    .card { background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px;margin-bottom:16px; }
  `]
})
export class TaxStatutoryComponent implements OnInit { private api = `${environment.apiUrl}/api/payroll`;
  constructor(private http: HttpClient) {}
  tab = 'overview';
  challanMsg = '';
  declMsg = '';

  declarations: any[] = [];
  declEmployees: { empId: string; name: string }[] = [];
  declForm = { empId: '', section: '', fiscalYear: '2025-26', amount: 0, description: '' };
  taxSections = ['80C', '80D', '80E', '80G', '80TTA', 'HRA', 'LTA', '24(b)', '80CCD(1B)', '80U'];

  statusCards = [
    { type: 'Provident Fund (PF)', status: 'Filed', amount: 84000, due: '15 May', period: 'Apr 2026' },
    { type: 'ESI Contribution', status: 'Filed', amount: 18240, due: '15 May', period: 'Apr 2026' },
    { type: 'Professional Tax', status: 'Pending', amount: 1600, due: '31 May', period: 'May 2026' },
    { type: 'TDS (Salaries)', status: 'Filed', amount: 69500, due: '7 May', period: 'Apr 2026' },
    { type: 'Labour Welfare Fund', status: 'Filed', amount: 720, due: '31 Mar', period: 'Q4 2026' },
    { type: 'Gratuity Provision', status: 'Overdue', amount: 24000, due: '30 Apr', period: 'Apr 2026' },
  ];

  dueDates = [
    { day: 7, type: 'TDS Deposit', desc: 'TDS on salaries for previous month', amount: 69500, overdue: false },
    { day: 15, type: 'PF Deposit', desc: 'Employee + Employer PF contribution', amount: 84000, overdue: false },
    { day: 15, type: 'ESI Deposit', desc: 'Employee + Employer ESI contribution', amount: 18240, overdue: false },
    { day: 31, type: 'PT Remittance', desc: 'Professional Tax to state authority', amount: 1600, overdue: false },
  ];

  filingHistory = [
    { month: 'Nov 2025', pf: 78000, esi: 16800, pt: 1600, tds: 62000, status: 'Filed' },
    { month: 'Dec 2025', pf: 79500, esi: 17200, pt: 1600, tds: 64000, status: 'Filed' },
    { month: 'Jan 2026', pf: 80000, esi: 17500, pt: 1600, tds: 65000, status: 'Filed' },
    { month: 'Feb 2026', pf: 81000, esi: 17800, pt: 1600, tds: 66500, status: 'Filed' },
    { month: 'Mar 2026', pf: 82500, esi: 18000, pt: 1600, tds: 68000, status: 'Filed' },
    { month: 'Apr 2026', pf: 84000, esi: 18240, pt: 1600, tds: 69500, status: 'Filed' },
  ];

  pfData = { empContrib: 42000, total: 84000 };
  esiData = { eligible: 6, total: 18240 };

  pfRows = [
    { name: 'Arjun Mehta', uan: 'UAN100001', basic: 62500, empPF: 7500, erPF: 7500 },
    { name: 'Priya Sharma', uan: 'UAN100002', basic: 56250, empPF: 6750, erPF: 6750 },
    { name: 'Rahul Gupta', uan: 'UAN100003', basic: 50000, empPF: 6000, erPF: 6000 },
    { name: 'Sneha Patel', uan: 'UAN100004', basic: 46875, empPF: 5625, erPF: 5625 },
    { name: 'Vikram Singh', uan: 'UAN100005', basic: 43750, empPF: 5250, erPF: 5250 },
  ];

  esiRows = [
    { name: 'Vikram Singh', esic: 'ESIC100001', gross: 18500 },
    { name: 'Rohan Nair', esic: 'ESIC100002', gross: 16800 },
    { name: 'Kiran Desai', esic: 'ESIC100003', gross: 20100 },
  ];

  tdsRows = [
    { name: 'Arjun Mehta', pan: 'AAAPX1234A', tds: 12500, slab: '20%' },
    { name: 'Ananya Iyer', pan: 'BBBPY5678B', tds: 11000, slab: '20%' },
    { name: 'Priya Sharma', pan: 'CCCQZ9012C', tds: 10500, slab: '10%' },
  ];

  ptStates = [
    { state: 'Gujarat', employees: 6, amount: 200, status: 'Pending' },
    { state: 'Maharashtra', employees: 2, amount: 200, status: 'Filed' },
  ];

  ngOnInit() { this.loadFilings(); }

  loadFilings() { this.http.get<any[]>(`${this.api}/statutory-filings`).subscribe(data => { if (!data || !data.length) return;
      this.filingHistory = data.map(f => ({ month: f.period || '', pf: f.pfAmount || 0, esi: f.esiAmount || 0,
        pt: f.ptAmount || 0, tds: f.tdsAmount || 0, status: f.status || 'Pending' })); }); }

  downloadChallan(type: string) { this.challanMsg = `${type} challan PDF downloading...`; setTimeout(() => this.challanMsg = '', 3000); }
  generateChallan(type: string) { this.challanMsg = `${type} challan generated`; setTimeout(() => this.challanMsg = '', 3000); }
  generateForm16() { this.challanMsg = 'Form 16 generation triggered for all employees'; setTimeout(() => this.challanMsg = '', 3000); }

  loadDeclarations() { this.http.get<any[]>(`${this.api}/tax/declarations`).subscribe(data => { this.declarations = data || []; });
    if (!this.declEmployees.length) { this.http.get<any[]>(`${environment.apiUrl}/api/employees`).subscribe(data => { this.declEmployees = (data || []).map(e => ({ empId: e.employeeCode || e.id, name: `${e.firstName} ${e.lastName}`.trim() })); }); } }

  saveDeclaration() { if (!this.declForm.empId || !this.declForm.section || !this.declForm.amount) { this.declMsg = 'Fill all required fields'; return; }
    const emp = this.declEmployees.find(e => e.empId === this.declForm.empId);
    const payload = { employeeId: this.declForm.empId, employeeName: emp?.name, section: this.declForm.section, fiscalYear: this.declForm.fiscalYear, amount: this.declForm.amount, description: this.declForm.description };
    this.http.post<any>(`${this.api}/tax/declarations`, payload).subscribe({ next: res => { this.declarations.unshift({ ...payload, id: res.id });
        this.declMsg = `Declaration submitted for ${emp?.name}`; setTimeout(() => this.declMsg = '', 3000);
        this.declForm = { empId: '', section: '', fiscalYear: '2025-26', amount: 0, description: '' }; },
      error: err => { this.declMsg = err?.error?.message || 'Failed to save declaration'; setTimeout(() => this.declMsg = '', 3000); } }); }
}

