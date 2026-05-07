import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

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
  private api = `${environment.apiUrl}/api/payroll`;
  tab = 'run';
  selectedMonth = new Date().getMonth() + 1;
  selectedYear = String(new Date().getFullYear());
  running = false;
  runProgress = 0;
  payrollRan = false;
  locked = false;
  currentRunId: string | null = null;

  months = [
    { val: 1, label: 'January' }, { val: 2, label: 'February' }, { val: 3, label: 'March' },
    { val: 4, label: 'April' }, { val: 5, label: 'May' }, { val: 6, label: 'June' },
    { val: 7, label: 'July' }, { val: 8, label: 'August' }, { val: 9, label: 'September' },
    { val: 10, label: 'October' }, { val: 11, label: 'November' }, { val: 12, label: 'December' },
  ];

  payrollData: PayrollRecord[] = [];
  history: any[] = [];

  constructor(private http: HttpClient) {}

  get totalPayroll() { return this.payrollData.reduce((s, p) => s + p.netPay, 0); }
  get totalCTC() { return this.payrollData.reduce((s, p) => s + p.ctc / 12, 0); }
  get totalDeductions() { return this.payrollData.reduce((s, p) => s + p.pf + p.pt + p.tds, 0); }
  get avgNetPay() { return this.payrollData.length ? this.totalPayroll / this.payrollData.length : 0; }
  sum(field: keyof PayrollRecord): number { return this.payrollData.reduce((s, p) => s + (p[field] as number), 0); }

  ngOnInit() { this.loadHistory(); }

  loadHistory() {
    this.http.get<any[]>(`${this.api}/runs`).subscribe(data => {
      this.history = (data || []).map(r => ({
        id: r.id, month: r.month, year: r.year,
        count: r.totalEmployees || 0, total: r.totalNetPay || 0, status: r.status
      }));
    });
  }

  runPayroll() {
    this.running = true;
    this.runProgress = 0;
    const iv = setInterval(() => { this.runProgress += 15; if (this.runProgress >= 75) clearInterval(iv); }, 200);

    this.http.post<any>(`${this.api}/runs/process`, { month: this.selectedMonth, year: parseInt(this.selectedYear) }).subscribe({
      next: run => {
        clearInterval(iv);
        this.runProgress = 100;
        this.running = false;
        this.payrollRan = true;
        this.currentRunId = run.id;
        this.payrollData = (run.payslips || []).map((p: any) => ({
          id: p.id, name: p.employeeName || '', empId: p.employeeCode || '', dept: p.department || '',
          ctc: p.annualCTC || 0, basic: p.basicSalary || 0, hra: p.hra || 0,
          da: p.da || 0, special: p.specialAllowance || 0,
          pf: p.pfDeduction || 0, pt: p.professionalTax || 0,
          tds: p.tdsDeduction || 0, netPay: p.netPay || 0
        }));
        this.loadHistory();
      },
      error: () => { clearInterval(iv); this.running = false; }
    });
  }

  exportCSV() {
    this.http.get(`${this.api}/export/csv`, { responseType: 'blob' }).subscribe(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = `payroll-${new Date().toISOString().slice(0,10)}.csv`;
      a.click(); URL.revokeObjectURL(url);
    });
  }

  lockPayroll() {
    if (!this.currentRunId) return;
    this.http.post(`${this.api}/runs/${this.currentRunId}/approve`, {}).subscribe({
      next: () => { this.locked = true; this.loadHistory(); },
      error: () => { this.locked = true; }
    });
  }
}
