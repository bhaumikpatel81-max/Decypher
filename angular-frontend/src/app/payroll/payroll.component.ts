import { Component, OnInit } from '@angular/core';

interface PayrollRecord {
  id: number; name: string; empId: string; dept: string;
  ctc: number; basic: number; hra: number; da: number; special: number;
  pf: number; pt: number; tds: number; netPay: number;
}

@Component({
  selector: 'app-payroll',
  template: `
    <div class="page-container page-enter">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="page-title">Payroll Processing</h1>
          <p style="color:var(--text-3);font-size:13px;">Monthly Payroll · Indian Salary Structure · Auto Calculate</p>
        </div>
        <div style="display:flex;gap:8px;">
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='run'" (click)="tab='run'">Run Payroll</button>
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='history'" (click)="tab='history'">History</button>
        </div>
      </div>

      <!-- Controls -->
      <div class="card" style="display:flex;align-items:center;gap:16px;margin-bottom:24px;flex-wrap:wrap;">
        <div>
          <label style="font-size:12px;font-weight:600;color:var(--text-3);">Month</label>
          <select class="select" [(ngModel)]="selectedMonth" style="margin-top:4px;min-width:120px;">
            <option *ngFor="let m of months" [value]="m.val">{{m.label}}</option>
          </select>
        </div>
        <div>
          <label style="font-size:12px;font-weight:600;color:var(--text-3);">Year</label>
          <select class="select" [(ngModel)]="selectedYear" style="margin-top:4px;min-width:90px;">
            <option>2025</option><option>2026</option>
          </select>
        </div>
        <div style="margin-top:18px;display:flex;gap:8px;">
          <button class="btn btn-primary" (click)="runPayroll()" [disabled]="running">
            <span *ngIf="!running">Run Payroll</span>
            <span *ngIf="running">Processing... {{runProgress}}%</span>
          </button>
          <button class="btn btn-ghost" (click)="exportCSV()" [disabled]="!payrollRan">Export CSV</button>
          <button class="btn btn-ghost" (click)="lockPayroll()" [disabled]="locked || !payrollRan" [style.opacity]="locked?0.5:1">
            {{locked ? '🔒 Locked' : 'Lock Payroll'}}
          </button>
        </div>
        <div *ngIf="payrollRan" style="margin-top:18px;padding:6px 14px;background:#d1fae5;border-radius:8px;color:#065f46;font-size:13px;font-weight:600;">
          Payroll for {{selectedMonth}}/{{selectedYear}} processed
        </div>
      </div>

      <!-- KPIs -->
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:24px;">
        <div class="kpi-card"><div class="kpi-val" style="color:#6b4df0;">₹{{totalPayroll | number}}</div><div class="kpi-lbl">Total Payroll Cost</div></div>
        <div class="kpi-card"><div class="kpi-val" style="color:#10b981;">{{payrollData.length}}</div><div class="kpi-lbl">Employees Processed</div></div>
        <div class="kpi-card"><div class="kpi-val" style="color:#f59e0b;">₹{{totalDeductions | number}}</div><div class="kpi-lbl">Total Deductions</div></div>
        <div class="kpi-card"><div class="kpi-val" style="color:#3b82f6;">₹{{avgNetPay | number:'1.0-0'}}</div><div class="kpi-lbl">Average Net Pay</div></div>
      </div>

      <!-- PAYROLL TABLE -->
      <div *ngIf="tab==='run'" class="card" style="overflow-x:auto;">
        <h3 style="font-weight:700;margin-bottom:16px;">Payroll Register — {{selectedMonth}}/{{selectedYear}}</h3>
        <table style="width:100%;border-collapse:collapse;min-width:1000px;">
          <thead>
            <tr style="border-bottom:2px solid var(--border);">
              <th class="th">Employee</th>
              <th class="th" style="text-align:right;">CTC</th>
              <th class="th" style="text-align:right;">Basic</th>
              <th class="th" style="text-align:right;">HRA</th>
              <th class="th" style="text-align:right;">DA</th>
              <th class="th" style="text-align:right;color:#ef4444;">PF</th>
              <th class="th" style="text-align:right;color:#ef4444;">PT</th>
              <th class="th" style="text-align:right;color:#ef4444;">TDS</th>
              <th class="th" style="text-align:right;color:#10b981;">Net Pay</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let p of payrollData" style="border-bottom:1px solid var(--border);" class="tr-hover">
              <td class="td">
                <div style="font-weight:600;font-size:13px;">{{p.name}}</div>
                <div style="font-size:11px;color:var(--text-3);">{{p.empId}} · {{p.dept}}</div>
              </td>
              <td class="td" style="text-align:right;">{{p.ctc | number}}</td>
              <td class="td" style="text-align:right;">{{p.basic | number}}</td>
              <td class="td" style="text-align:right;">{{p.hra | number}}</td>
              <td class="td" style="text-align:right;">{{p.da | number}}</td>
              <td class="td" style="text-align:right;color:#ef4444;">({{p.pf | number}})</td>
              <td class="td" style="text-align:right;color:#ef4444;">({{p.pt | number}})</td>
              <td class="td" style="text-align:right;color:#ef4444;">({{p.tds | number}})</td>
              <td class="td" style="text-align:right;font-weight:700;color:#10b981;">₹{{p.netPay | number}}</td>
            </tr>
            <tr style="background:var(--surface-alt);font-weight:700;border-top:2px solid var(--border);">
              <td class="td">TOTAL</td>
              <td class="td" style="text-align:right;">{{totalCTC | number}}</td>
              <td class="td" style="text-align:right;">{{sum('basic') | number}}</td>
              <td class="td" style="text-align:right;">{{sum('hra') | number}}</td>
              <td class="td" style="text-align:right;">{{sum('da') | number}}</td>
              <td class="td" style="text-align:right;color:#ef4444;">({{sum('pf') | number}})</td>
              <td class="td" style="text-align:right;color:#ef4444;">({{sum('pt') | number}})</td>
              <td class="td" style="text-align:right;color:#ef4444;">({{sum('tds') | number}})</td>
              <td class="td" style="text-align:right;color:#10b981;">₹{{totalPayroll | number}}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- HISTORY -->
      <div *ngIf="tab==='history'" class="card">
        <h3 style="font-weight:700;margin-bottom:16px;">Payroll History</h3>
        <table style="width:100%;border-collapse:collapse;">
          <thead><tr style="border-bottom:2px solid var(--border);">
            <th class="th">Month/Year</th><th class="th">Employees</th><th class="th">Total Payroll</th><th class="th">Status</th><th class="th">Actions</th>
          </tr></thead>
          <tbody>
            <tr *ngFor="let h of history" style="border-bottom:1px solid var(--border);" class="tr-hover">
              <td class="td"><strong>{{h.month}}/{{h.year}}</strong></td>
              <td class="td">{{h.count}}</td>
              <td class="td" style="color:#10b981;font-weight:600;">₹{{h.total | number}}</td>
              <td class="td"><span class="spill" [class.approved]="h.status==='Processed'" [class.pending]="h.status==='Pending'">{{h.status}}</span></td>
              <td class="td"><button class="btn btn-ghost btn-sm">Download</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .kpi-card { background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px;text-align:center; }
    .kpi-val { font-size:26px;font-weight:800; }
    .kpi-lbl { font-size:12px;color:var(--text-3);margin-top:4px; }
    .th { padding:10px;text-align:left;font-size:12px;color:var(--text-3);font-weight:600; }
    .td { padding:10px;font-size:13px; }
    .tr-hover:hover { background:var(--surface-alt); }
    .spill { padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700; }
    .spill.approved { background:#d1fae5;color:#065f46; }
    .spill.pending { background:#fef3c7;color:#92400e; }
    .card { background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px;margin-bottom:16px; }
  `]
})
export class PayrollComponent implements OnInit {
  tab = 'run';
  selectedMonth = 5;
  selectedYear = '2026';
  running = false;
  runProgress = 0;
  payrollRan = false;
  locked = false;

  months = [
    { val: 1, label: 'January' }, { val: 2, label: 'February' }, { val: 3, label: 'March' },
    { val: 4, label: 'April' }, { val: 5, label: 'May' }, { val: 6, label: 'June' },
    { val: 7, label: 'July' }, { val: 8, label: 'August' }, { val: 9, label: 'September' },
    { val: 10, label: 'October' }, { val: 11, label: 'November' }, { val: 12, label: 'December' },
  ];

  payrollData: PayrollRecord[] = [
    { id: 1, name: 'Arjun Mehta', empId: 'EMP001', dept: 'Engineering', ctc: 1500000, basic: 62500, hra: 31250, da: 7500, special: 24000, pf: 7500, pt: 200, tds: 12500, netPay: 105050 },
    { id: 2, name: 'Priya Sharma', empId: 'EMP002', dept: 'HR', ctc: 1350000, basic: 56250, hra: 28125, da: 6750, special: 21000, pf: 6750, pt: 200, tds: 10500, netPay: 94675 },
    { id: 3, name: 'Rahul Gupta', empId: 'EMP003', dept: 'DevOps', ctc: 1200000, basic: 50000, hra: 25000, da: 6000, special: 19000, pf: 6000, pt: 200, tds: 8500, netPay: 85300 },
    { id: 4, name: 'Sneha Patel', empId: 'EMP004', dept: 'QA', ctc: 1125000, basic: 46875, hra: 23437, da: 5625, special: 17500, pf: 5625, pt: 200, tds: 7200, netPay: 80412 },
    { id: 5, name: 'Vikram Singh', empId: 'EMP005', dept: 'Support', ctc: 1050000, basic: 43750, hra: 21875, da: 5250, special: 16000, pf: 5250, pt: 200, tds: 6000, netPay: 75425 },
    { id: 6, name: 'Ananya Iyer', empId: 'EMP006', dept: 'Business', ctc: 1425000, basic: 59375, hra: 29687, da: 7125, special: 22500, pf: 7125, pt: 200, tds: 11000, netPay: 100362 },
    { id: 7, name: 'Kiran Desai', empId: 'EMP007', dept: 'Analytics', ctc: 1275000, basic: 53125, hra: 26562, da: 6375, special: 20000, pf: 6375, pt: 200, tds: 9500, netPay: 89987 },
    { id: 8, name: 'Rohan Nair', empId: 'EMP008', dept: 'Infrastructure', ctc: 975000, basic: 40625, hra: 20312, da: 4875, special: 14500, pf: 4875, pt: 200, tds: 4500, netPay: 70737 },
  ];

  history = [
    { month: 4, year: 2026, count: 8, total: 701948, status: 'Processed' },
    { month: 3, year: 2026, count: 8, total: 698500, status: 'Processed' },
    { month: 2, year: 2026, count: 7, total: 651000, status: 'Processed' },
    { month: 1, year: 2026, count: 7, total: 648500, status: 'Processed' },
  ];

  get totalPayroll() { return this.payrollData.reduce((s, p) => s + p.netPay, 0); }
  get totalCTC() { return this.payrollData.reduce((s, p) => s + p.ctc / 12, 0); }
  get totalDeductions() { return this.payrollData.reduce((s, p) => s + p.pf + p.pt + p.tds, 0); }
  get avgNetPay() { return this.totalPayroll / this.payrollData.length; }

  sum(field: keyof PayrollRecord): number { return this.payrollData.reduce((s, p) => s + (p[field] as number), 0); }

  ngOnInit() {}

  runPayroll() {
    this.running = true;
    this.runProgress = 0;
    const iv = setInterval(() => {
      this.runProgress += 10;
      if (this.runProgress >= 100) { clearInterval(iv); this.running = false; this.payrollRan = true; }
    }, 200);
  }

  exportCSV() { alert('Payroll CSV exported successfully'); }
  lockPayroll() { this.locked = true; alert('Payroll locked for this month'); }
}
