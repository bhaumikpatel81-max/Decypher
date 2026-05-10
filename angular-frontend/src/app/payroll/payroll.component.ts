import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../environments/environment';

interface PayrollRecord { id: number; name: string; empId: string; dept: string;
  ctc: number; basic: number; hra: number; da: number; special: number;
  pf: number; pt: number; tds: number; netPay: number;
}

@Component({ selector: 'app-payroll',
  template: `
    <div class="page-container page-enter">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="page-title">Payroll Processing</h1>
          <p style="color:var(--text-3);font-size:13px;">Monthly Payroll · Indian Salary Structure · Auto Calculate</p>
        </div>
        <div style="display:flex;gap:8px;">
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='dashboard'" (click)="tab='dashboard'">Dashboard</button>
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='run'" (click)="tab='run'">Run Payroll</button>
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='history'" (click)="tab='history'">History</button>
        </div>
      </div>

      <!-- ══ DASHBOARD TAB ══ -->
      <ng-container *ngIf="tab==='dashboard'">

        <!-- KPI Strip -->
        <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:14px;margin-bottom:20px;">
          <div class="kpi-c"><div class="kpi-l">Total Payroll</div><div class="kpi-v" style="color:#6b4df0;">₹{{totalPayroll | number:'1.0-0'}}</div><div class="kpi-s">Net disbursed</div></div>
          <div class="kpi-c"><div class="kpi-l">Employees</div><div class="kpi-v" style="color:#10b981;">{{payrollData.length}}</div><div class="kpi-s">Processed this run</div></div>
          <div class="kpi-c"><div class="kpi-l">Total Deductions</div><div class="kpi-v" style="color:#ef4444;">₹{{totalDeductions | number:'1.0-0'}}</div><div class="kpi-s">PF + PT + TDS</div></div>
          <div class="kpi-c"><div class="kpi-l">Avg Net Pay</div><div class="kpi-v" style="color:#3b82f6;">₹{{avgNetPay | number:'1.0-0'}}</div><div class="kpi-s">Per employee</div></div>
          <div class="kpi-c"><div class="kpi-l">Gross CTC</div><div class="kpi-v" style="color:#f59e0b;">₹{{totalCTC | number:'1.0-0'}}</div><div class="kpi-s">Monthly CTC total</div></div>
        </div>

        <!-- Row 2: Monthly Trend + Component Split -->
        <div style="display:grid;grid-template-columns:1.6fr 1fr;gap:16px;margin-bottom:16px;">

          <!-- Monthly Payroll Trend (SVG line chart) -->
          <div class="c-card">
            <div class="c-title">Monthly Payroll Trend</div>
            <div *ngIf="!monthlyTrend.length" style="text-align:center;padding:40px;color:var(--text-3);font-size:13px;">Run payroll or view history to see trend</div>
            <ng-container *ngIf="monthlyTrend.length">
              <div style="position:relative;height:160px;margin-top:12px;">
                <svg width="100%" height="160" viewBox="0 0 500 160" preserveAspectRatio="none" style="overflow:visible;">
                  <defs>
                    <linearGradient id="payGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stop-color="#6b4df0" stop-opacity="0.25"/>
                      <stop offset="100%" stop-color="#6b4df0" stop-opacity="0"/>
                    </linearGradient>
                  </defs>
                  <path [attr.d]="svgArea(monthlyTrend.map(toVal), 500, 140)" fill="url(#payGrad)"/>
                  <path [attr.d]="svgLine(monthlyTrend.map(toVal), 500, 140)" fill="none" stroke="#6b4df0" stroke-width="2.5" stroke-linecap="round"/>
                  <circle *ngFor="let p of trendDots" [attr.cx]="p.x" [attr.cy]="p.y" r="4" fill="#6b4df0" stroke="var(--surface)" stroke-width="2"/>
                </svg>
                <!-- X-axis labels -->
                <div style="display:flex;justify-content:space-between;margin-top:4px;">
                  <span *ngFor="let t of monthlyTrend" style="font-size:10px;color:var(--text-3);text-align:center;flex:1;">{{t.label}}</span>
                </div>
              </div>
              <!-- Y-axis max hint -->
              <div style="font-size:11px;color:var(--text-3);margin-top:4px;">Peak: ₹{{maxTrend | number:'1.0-0'}}</div>
            </ng-container>
          </div>

          <!-- Gross Component Split Donut -->
          <div class="c-card">
            <div class="c-title">Gross Component Split</div>
            <div style="display:flex;align-items:center;gap:16px;margin-top:8px;">
              <div class="donut-host">
                <div class="donut-ring" [style.background]="componentDonut"></div>
                <div class="donut-hole">
                  <div style="font-size:14px;font-weight:800;">{{payrollData.length ? 'Gross' : '—'}}</div>
                  <div style="font-size:9px;color:var(--text-3);">split</div>
                </div>
              </div>
              <div style="display:flex;flex-direction:column;gap:8px;flex:1;">
                <div *ngFor="let c of componentSplit" style="display:flex;align-items:center;gap:7px;">
                  <div style="width:8px;height:8px;border-radius:50%;flex-shrink:0;" [style.background]="c.color"></div>
                  <span style="font-size:11px;flex:1;">{{c.label}}</span>
                  <span style="font-size:12px;font-weight:700;" [style.color]="c.color">{{c.pct}}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Row 3: Department Breakdown + Deduction Analysis -->
        <div style="display:grid;grid-template-columns:1.4fr 1fr;gap:16px;margin-bottom:16px;">

          <!-- Department Payroll Breakdown -->
          <div class="c-card">
            <div class="c-title">Department-wise Payroll</div>
            <div *ngIf="!deptBreakdown.length" style="text-align:center;padding:24px;color:var(--text-3);font-size:13px;">Run payroll to see department breakdown</div>
            <div *ngFor="let d of deptBreakdown; let i=index" style="margin-bottom:12px;margin-top:8px;">
              <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
                <span style="font-size:12px;font-weight:600;">{{d.dept || 'Unassigned'}}</span>
                <div style="display:flex;gap:8px;align-items:center;">
                  <span style="font-size:10px;color:var(--text-3);">{{d.count}} emp</span>
                  <span style="font-size:13px;font-weight:700;color:#6b4df0;">₹{{d.total | number:'1.0-0'}}</span>
                </div>
              </div>
              <div class="bar-track">
                <div class="bar-fill" [style.width.%]="maxDept ? (d.total/maxDept)*100 : 0"
                     [style.background]="deptColors[i % deptColors.length]"></div>
              </div>
            </div>
          </div>

          <!-- Deduction Breakdown -->
          <div class="c-card">
            <div class="c-title">Deduction Breakdown</div>
            <div style="margin-top:8px;display:flex;flex-direction:column;gap:10px;">
              <div>
                <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
                  <span style="font-size:12px;">Provident Fund (PF)</span>
                  <b style="color:#6b4df0;">₹{{sum('pf') | number:'1.0-0'}}</b>
                </div>
                <div class="bar-track"><div class="bar-fill" style="background:#6b4df0;" [style.width.%]="totalDeductions ? (sum('pf')/totalDeductions)*100 : 33"></div></div>
              </div>
              <div>
                <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
                  <span style="font-size:12px;">TDS (Income Tax)</span>
                  <b style="color:#ef4444;">₹{{sum('tds') | number:'1.0-0'}}</b>
                </div>
                <div class="bar-track"><div class="bar-fill" style="background:#ef4444;" [style.width.%]="totalDeductions ? (sum('tds')/totalDeductions)*100 : 50"></div></div>
              </div>
              <div>
                <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
                  <span style="font-size:12px;">Professional Tax (PT)</span>
                  <b style="color:#f59e0b;">₹{{sum('pt') | number:'1.0-0'}}</b>
                </div>
                <div class="bar-track"><div class="bar-fill" style="background:#f59e0b;" [style.width.%]="totalDeductions ? (sum('pt')/totalDeductions)*100 : 17"></div></div>
              </div>
              <div style="padding:12px;background:var(--surface-alt);border-radius:8px;margin-top:4px;">
                <div style="font-size:11px;color:var(--text-3);">Total Deductions</div>
                <div style="font-size:24px;font-weight:800;color:#ef4444;">₹{{totalDeductions | number:'1.0-0'}}</div>
                <div style="font-size:11px;color:var(--text-3);margin-top:2px;">{{totalCTC ? ((totalDeductions/totalCTC)*100 | number:'1.1-1') : 0}}% of Gross CTC</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Row 4: Net Pay Distribution Pivot -->
        <div class="c-card">
          <div class="c-title">Net Pay Distribution</div>
          <div *ngIf="!payrollData.length" style="text-align:center;padding:24px;color:var(--text-3);font-size:13px;">Run payroll to see pay distribution</div>
          <div *ngIf="payrollData.length" style="overflow-x:auto;margin-top:8px;">
            <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:12px;min-width:600px;">
              <div *ngFor="let b of netPayBands" class="band-card">
                <div style="font-size:10px;color:var(--text-3);font-weight:600;text-transform:uppercase;letter-spacing:.3px;">{{b.label}}</div>
                <div style="font-size:26px;font-weight:800;margin:4px 0;" [style.color]="b.color">{{b.count}}</div>
                <div style="font-size:10px;color:var(--text-3);">employees</div>
                <div class="bar-track" style="margin-top:8px;"><div class="bar-fill" [style.width.%]="payrollData.length ? (b.count/payrollData.length)*100 : 0" [style.background]="b.color"></div></div>
                <div style="font-size:11px;margin-top:4px;font-weight:600;" [style.color]="b.color">{{payrollData.length ? ((b.count/payrollData.length)*100 | number:'1.0-0') : 0}}%</div>
              </div>
            </div>
          </div>
        </div>
      </ng-container>

      <!-- ══ RUN PAYROLL TAB ══ -->
      <ng-container *ngIf="tab==='run'">
        <div class="c-card" style="display:flex;align-items:center;gap:16px;margin-bottom:24px;flex-wrap:wrap;">
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

        <!-- KPIs inline for run tab -->
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:24px;">
          <div class="kpi-c"><div class="kpi-l">Total Payroll Cost</div><div class="kpi-v" style="color:#6b4df0;">₹{{totalPayroll | number}}</div></div>
          <div class="kpi-c"><div class="kpi-l">Employees Processed</div><div class="kpi-v" style="color:#10b981;">{{payrollData.length}}</div></div>
          <div class="kpi-c"><div class="kpi-l">Total Deductions</div><div class="kpi-v" style="color:#ef4444;">₹{{totalDeductions | number}}</div></div>
          <div class="kpi-c"><div class="kpi-l">Average Net Pay</div><div class="kpi-v" style="color:#3b82f6;">₹{{avgNetPay | number:'1.0-0'}}</div></div>
        </div>

        <div class="c-card" style="overflow-x:auto;">
          <h3 style="font-weight:700;margin-bottom:16px;">Payroll Register — {{selectedMonth}}/{{selectedYear}}</h3>
          <table style="width:100%;border-collapse:collapse;min-width:1000px;">
            <thead>
              <tr style="border-bottom:2px solid var(--border);">
                <th class="th">Employee</th>
                <th class="th" style="text-align:right;">CTC/mo</th>
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
                <td class="td"><div style="font-weight:600;font-size:13px;">{{p.name}}</div><div style="font-size:11px;color:var(--text-3);">{{p.empId}} · {{p.dept}}</div></td>
                <td class="td" style="text-align:right;">{{p.ctc/12 | number:'1.0-0'}}</td>
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
                <td class="td" style="text-align:right;">{{totalCTC | number:'1.0-0'}}</td>
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
      </ng-container>

      <!-- ══ HISTORY TAB ══ -->
      <ng-container *ngIf="tab==='history'">
        <div class="c-card">
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
      </ng-container>
    </div>
  `,
  styles: [`
    .kpi-c { background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:16px;text-align:center; }
    .kpi-v { font-size:24px;font-weight:800;margin:4px 0; }
    .kpi-l { font-size:11px;color:var(--text-3);font-weight:600;text-transform:uppercase;letter-spacing:.3px; }
    .kpi-s { font-size:11px;color:var(--text-3); }
    .c-card { background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px;margin-bottom:16px; }
    .c-title { font-size:14px;font-weight:700;margin-bottom:4px; }
    .bar-track { height:10px;background:var(--surface-alt);border-radius:5px;overflow:hidden; }
    .bar-fill  { height:100%;border-radius:5px;transition:width .5s; }
    .donut-host { position:relative;width:90px;height:90px;flex-shrink:0; }
    .donut-ring { width:90px;height:90px;border-radius:50%; }
    .donut-hole { position:absolute;width:54px;height:54px;border-radius:50%;background:var(--surface);top:18px;left:18px;display:flex;flex-direction:column;align-items:center;justify-content:center; }
    .band-card { background:var(--surface-alt);border-radius:10px;padding:14px; }
    .th { padding:10px;text-align:left;font-size:12px;color:var(--text-3);font-weight:600; }
    .td { padding:10px;font-size:13px; }
    .tr-hover:hover { background:var(--surface-alt); }
    .spill { padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700; }
    .spill.approved { background:#d1fae5;color:#065f46; }
    .spill.pending { background:#fef3c7;color:#92400e; }
  `]
})
export class PayrollComponent implements OnInit { private api = `${environment.apiUrl}/api/payroll`;
  tab = 'dashboard';
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

  deptColors = ['#6b4df0', '#10b981', '#3b82f6', '#f59e0b', '#ec4899', '#06b6d4', '#8b5cf6', '#ef4444'];

  payrollData: PayrollRecord[] = [];
  history: any[] = [];

  constructor(private http: HttpClient, private snack: MatSnackBar) {}

  get totalPayroll() { return this.payrollData.reduce((s, p) => s + p.netPay, 0); }
  get totalCTC() { return this.payrollData.reduce((s, p) => s + p.ctc / 12, 0); }
  get totalDeductions() { return this.payrollData.reduce((s, p) => s + p.pf + p.pt + p.tds, 0); }
  get avgNetPay() { return this.payrollData.length ? this.totalPayroll / this.payrollData.length : 0; }
  sum(field: keyof PayrollRecord): number { return this.payrollData.reduce((s, p) => s + (p[field] as number), 0); }

  get deptBreakdown(): { dept: string; total: number; count: number }[] { const map: { [k: string]: { total: number; count: number } } = {};
    this.payrollData.forEach(p => { if (!map[p.dept]) map[p.dept] = { total: 0, count: 0 };
      map[p.dept].total += p.netPay;
      map[p.dept].count++; });
    return Object.entries(map).sort((a, b) => b[1].total - a[1].total)
      .map(([dept, v]) => ({ dept, ...v })); }

  get maxDept(): number { return Math.max(...this.deptBreakdown.map(d => d.total), 1); }

  get componentSplit(): { label: string; pct: number; color: string }[] { const gross = this.totalCTC || 1;
    return [
      { label: 'Basic', pct: Math.round((this.sum('basic') / gross) * 100), color: '#6b4df0' },
      { label: 'HRA',   pct: Math.round((this.sum('hra')   / gross) * 100), color: '#10b981' },
      { label: 'DA',    pct: Math.round((this.sum('da')    / gross) * 100), color: '#3b82f6' },
      { label: 'Special/Other', pct: Math.round((this.sum('special') / gross) * 100), color: '#f59e0b' },
    ].filter(c => c.pct > 0); }

  get componentDonut(): string { if (!this.payrollData.length) return 'conic-gradient(var(--border) 0deg 360deg)';
    let pct = 0;
    const segs = this.componentSplit.map(c => { const deg = (c.pct / 100) * 360;
      const r = `${c.color} ${pct}deg ${pct + deg}deg`;
      pct += deg;
      return r; });
    return `conic-gradient(${segs.join(', ')})`; }

  get monthlyTrend(): { label: string; value: number }[] { return [...this.history].reverse().slice(0, 6).map(h => ({ label: `${h.month}/${String(h.year).slice(2)}`,
      value: h.total || 0 })); }

  get maxTrend(): number { return Math.max(...this.monthlyTrend.map(t => t.value), 1); }

  toVal = (t: { value: number }) => t.value;

  svgLine(values: number[], w: number, h: number): string { if (values.length < 2) return '';
    const max = Math.max(...values, 1);
    return values.map((v, i) => { const x = (i / (values.length - 1)) * w;
      const y = h - (v / max) * (h - 10);
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`; }).join(' '); }

  svgArea(values: number[], w: number, h: number): string { if (values.length < 2) return '';
    return this.svgLine(values, w, h) + ` L ${w} ${h} L 0 ${h} Z`; }

  get trendDots(): { x: number; y: number }[] { const values = this.monthlyTrend.map(t => t.value);
    if (values.length < 2) return [];
    const max = Math.max(...values, 1);
    const h = 140;
    return values.map((v, i) => ({ x: (i / (values.length - 1)) * 500,
      y: h - (v / max) * (h - 10) })); }

  get netPayBands(): { label: string; count: number; color: string }[] { const bands = [
      { label: '<₹20K',        min: 0,     max: 20000,  color: '#ef4444' },
      { label: '₹20K–40K',     min: 20000, max: 40000,  color: '#f59e0b' },
      { label: '₹40K–70K',     min: 40000, max: 70000,  color: '#6b4df0' },
      { label: '₹70K–1L',      min: 70000, max: 100000, color: '#3b82f6' },
      { label: '>₹1L',         min: 100000, max: Infinity, color: '#10b981' },
    ];
    return bands.map(b => ({ ...b, count: this.payrollData.filter(p => p.netPay >= b.min && p.netPay < b.max).length })); }

  ngOnInit() { this.loadHistory(); }

  loadHistory() { this.http.get<any[]>(`${this.api}/runs`).subscribe({ next: data => { this.history = [...(data || []).map(r => ({ id: r.id, month: r.month, year: r.year,
          count: r.totalEmployees || 0, total: r.totalNetPay || 0, status: r.status }))]; },
      error: () => this.snack.open('Failed to load payroll history', 'Close', { duration: 3000 }) }); }

  runPayroll() { this.running = true;
    this.runProgress = 0;
    const iv = setInterval(() => { this.runProgress += 15; if (this.runProgress >= 75) clearInterval(iv); }, 200);

    this.http.post<any>(`${this.api}/runs/process`, { month: this.selectedMonth, year: parseInt(this.selectedYear) }).subscribe({ next: run => { clearInterval(iv);
        this.runProgress = 100;
        this.running = false;
        this.payrollRan = true;
        this.currentRunId = run.id;
        this.payrollData = [...(run.payslips || []).map((p: any) => ({ id: p.id, name: p.employeeName || '', empId: p.employeeCode || '', dept: p.department || '',
          ctc: p.annualCTC || 0, basic: p.basicSalary || 0, hra: p.hra || 0,
          da: p.da || 0, special: p.specialAllowance || 0,
          pf: p.pfDeduction || 0, pt: p.professionalTax || 0,
          tds: p.tdsDeduction || 0, netPay: p.netPay || 0 }))];
        this.loadHistory();
        this.snack.open(`Payroll processed — ${this.payrollData.length} employees`, '', { duration: 2500 }); },
      error: () => { clearInterval(iv); this.running = false; this.snack.open('Payroll processing failed', 'Close', { duration: 3000 }); } }); }

  exportCSV() { this.http.get(`${this.api}/export/csv`, { responseType: 'blob' }).subscribe({ next: blob => { const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = `payroll-${new Date().toISOString().slice(0, 10)}.csv`;
        a.click(); URL.revokeObjectURL(url); },
      error: () => this.snack.open('Export failed', 'Close', { duration: 3000 }) }); }

  lockPayroll() { if (!this.currentRunId) return;
    this.http.post(`${this.api}/runs/${this.currentRunId}/approve`, {}).subscribe({ next: () => { this.locked = true; this.loadHistory(); this.snack.open('Payroll locked', '', { duration: 2000 }); },
      error: () => { this.locked = true; this.snack.open('Payroll locked locally', '', { duration: 2000 }); } }); }
}

