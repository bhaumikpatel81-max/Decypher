import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../environments/environment';

const CHART_ICONS: Record<string, string> = {
  bar:      '📊', dualLine: '📈', kpiTable: '🗂️',
  funnel:   '🔽', donut:    '🍩'
};

interface ReportMeta {
  key: string; label: string; icon: string; freq: string; chartType: string; desc: string;
}

const STANDARD_REPORTS: ReportMeta[] = [
  { key: 'requisition-aging',      label: 'Requisition Aging',        icon: '📋', freq: 'Monthly',   chartType: 'bar',     desc: 'Days open + overdue tracking per dept.' },
  { key: 'vendor-performance',     label: 'Vendor Performance',        icon: '🏢', freq: 'Monthly',   chartType: 'bar',     desc: 'Submission, selection & joining rate per vendor.' },
  { key: 'candidate-funnel',       label: 'Candidate Funnel',          icon: '🔽', freq: 'Monthly',   chartType: 'funnel',  desc: 'Stage-wise conversion across full pipeline.' },
  { key: 'offer-dropout',          label: 'Offer & Dropout Analysis',  icon: '📉', freq: 'Monthly',   chartType: 'bar',     desc: 'Offers made, accepted, rejected and reasons.' },
  { key: 'time-to-hire',           label: 'Time-to-Hire',              icon: '⏱️', freq: 'Monthly',   chartType: 'bar',     desc: 'Avg TAT per requisition vs target.' },
  { key: 'source-effectiveness',   label: 'Source Effectiveness',      icon: '📡', freq: 'Monthly',   chartType: 'bar',     desc: 'ROI by sourcing channel.' },
  { key: 'budget-utilisation',     label: 'Budget Utilisation',        icon: '💰', freq: 'Monthly',   chartType: 'bar',     desc: 'Allocated vs spent per department.' },
  { key: 'recruiter-productivity', label: 'Recruiter Productivity',    icon: '🧑‍💼', freq: 'Monthly',  chartType: 'bar',     desc: 'Submissions, selections, joinings per recruiter.' },
  { key: 'sla-compliance',         label: 'SLA Compliance',            icon: '🎯', freq: 'Monthly',   chartType: 'bar',     desc: 'On-track vs overdue by stage.' },
  { key: 'diversity-hiring',       label: 'Diversity & Hiring Mix',    icon: '📊', freq: 'Monthly',   chartType: 'donut',   desc: 'Headcount by type across departments.' },
  { key: 'talent-pool-health',     label: 'Talent Pool Health',        icon: '🌱', freq: 'Monthly',   chartType: 'donut',   desc: 'Active / passive / do-not-contact breakdown.' },
  { key: 'internal-mobility',      label: 'Internal Mobility',         icon: '🔄', freq: 'Monthly',   chartType: 'bar',     desc: 'Internal postings and application fill rate.' },
];

const TA_P3_REPORTS: ReportMeta[] = [
  { key: 'ta-volume-by-bu',        label: 'TA Volume by BU + Project', icon: '📊', freq: 'Monthly',   chartType: 'bar',      desc: 'Total positions raised per BU and project.' },
  { key: 'full-year-demand',       label: 'Full Year Demand + Phasing',icon: '📈', freq: 'Quarterly', chartType: 'dualLine', desc: 'Demand vs fulfilled across 12 months (fiscal year).' },
  { key: 'open-positions-aging',   label: 'Open Positions + Aging',    icon: '🗂️', freq: 'Monthly',   chartType: 'kpiTable', desc: 'Open reqs with age, grade, P1/P2/P3 criticality.' },
  { key: 'positions-closed-mtd',   label: 'Positions Closed MTD',      icon: '✅', freq: 'Monthly',   chartType: 'bar',      desc: 'Month-to-date closures per BU.' },
  { key: 'cost-per-hire',          label: 'Cost per Hire',             icon: '💵', freq: 'Monthly',   chartType: 'bar',      desc: 'Avg cost per hire per BU vs org benchmark.' },
  { key: 'hiring-pipeline-stage',  label: 'Hiring Pipeline by Stage',  icon: '🔽', freq: 'Weekly',    chartType: 'funnel',   desc: 'Screen → Phone → Tech → Final → Offer funnel.' },
  { key: 'avg-time-to-hire',       label: 'Avg Time to Hire',          icon: '⏱️', freq: 'Monthly',   chartType: 'bar',      desc: 'Avg days to close per BU with target line.' },
  { key: 'gender-ratio-hiring',    label: 'Gender Ratio in Hiring',    icon: '🍩', freq: 'Monthly',   chartType: 'donut',    desc: 'M:F ratio of new joins per BU.' },
];

const FREQ_COLORS: Record<string, string> = {
  Monthly: '#0ea5e9', Weekly: '#f97316', Quarterly: '#8b5cf6'
};

@Component({
  selector: 'app-reports',
  template: `
    <section class="stack-page">
      <div class="card" style="padding:20px 24px">
        <h2 style="margin:0 0 4px;font-size:20px;font-weight:700">Reports</h2>
        <p style="margin:0 0 20px;color:#64748b;font-size:13px">Select a report to view KPIs, charts and data. TA = Talent Acquisition (recruiting). The org unit label (Department / Function / BU etc.) is configurable per company.</p>

        <!-- Global Controls -->
        <div style="display:flex;align-items:center;gap:16px;margin-bottom:20px;flex-wrap:wrap">
          <div style="display:flex;align-items:center;gap:8px">
            <label style="font-size:12px;font-weight:600;color:#475569">Org unit label</label>
            <select class="input" [(ngModel)]="groupByLabel" style="width:140px;font-size:13px">
              <option value="Department">Department</option>
              <option value="Function">Function</option>
              <option value="BU">BU (Business Unit)</option>
              <option value="Division">Division</option>
              <option value="Team">Team</option>
              <option value="Vertical">Vertical</option>
            </select>
          </div>
          <div style="font-size:12px;color:#94a3b8">
            <span style="display:inline-block;width:8px;height:8px;border-radius:2px;background:#0ea5e9;margin-right:4px"></span>Monthly
            <span style="display:inline-block;width:8px;height:8px;border-radius:2px;background:#f97316;margin-right:4px;margin-left:12px"></span>Weekly
            <span style="display:inline-block;width:8px;height:8px;border-radius:2px;background:#8b5cf6;margin-right:4px;margin-left:12px"></span>Quarterly
          </div>
        </div>

        <!-- Standard Reports Section -->
        <div style="margin-bottom:8px">
          <div style="font-size:11px;font-weight:700;color:#64748b;letter-spacing:.06em;text-transform:uppercase;margin-bottom:10px">Standard Reports</div>
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:10px;margin-bottom:24px">
            <div *ngFor="let r of standardReports"
                 (click)="selectReport(r)"
                 [style.border]="selected === r.key ? '2px solid #6b4df0' : '1.5px solid #e2e8f0'"
                 [style.background]="selected === r.key ? '#f5f3ff' : '#fff'"
                 style="padding:14px 16px;border-radius:10px;cursor:pointer;transition:all .15s;position:relative">
              <div style="font-size:18px;margin-bottom:6px">{{ r.icon }}</div>
              <div style="font-size:12px;font-weight:600;color:#0f172a;line-height:1.3">{{ r.label }}</div>
              <div style="font-size:11px;color:#94a3b8;margin-top:3px">{{ r.desc }}</div>
              <span [style.background]="freqColor(r.freq)"
                    style="position:absolute;top:8px;right:8px;font-size:10px;color:#fff;padding:2px 6px;border-radius:10px;font-weight:600">
                {{ r.freq }}
              </span>
            </div>
          </div>
        </div>

        <!-- Talent Acquisition P3 Section -->
        <div style="margin-bottom:20px">
          <div style="font-size:11px;font-weight:700;color:#64748b;letter-spacing:.06em;text-transform:uppercase;margin-bottom:4px">Talent Acquisition P3</div>
          <div style="font-size:12px;color:#94a3b8;margin-bottom:10px">
            Org unit shown as <strong style="color:#6b4df0">{{ groupByLabel }}</strong>. TA = Talent Acquisition (the recruiting team/process). Change the label above to match your company's terminology.
          </div>
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:10px;margin-bottom:24px">
            <div *ngFor="let r of taP3Reports"
                 (click)="selectReport(r)"
                 [style.border]="selected === r.key ? '2px solid #6b4df0' : '1.5px solid #e2e8f0'"
                 [style.background]="selected === r.key ? '#f5f3ff' : '#fafaf9'"
                 style="padding:14px 16px;border-radius:10px;cursor:pointer;transition:all .15s;position:relative">
              <div style="font-size:18px;margin-bottom:6px">{{ r.icon }}</div>
              <div style="font-size:12px;font-weight:600;color:#0f172a;line-height:1.3">{{ r.label }}</div>
              <div style="font-size:11px;color:#94a3b8;margin-top:3px">{{ r.desc }}</div>
              <span [style.background]="freqColor(r.freq)"
                    style="position:absolute;top:8px;right:8px;font-size:10px;color:#fff;padding:2px 6px;border-radius:10px;font-weight:600">
                {{ r.freq }}
              </span>
              <span style="position:absolute;bottom:8px;right:8px;font-size:10px;color:#6b4df0;opacity:.7">
                {{ chartIcon(r.chartType) }} {{ r.chartType }}
              </span>
            </div>
          </div>
        </div>

        <!-- Date Range + Run -->
        <div *ngIf="selected" style="display:flex;align-items:center;gap:12px;margin-bottom:20px;flex-wrap:wrap">
          <label style="font-size:13px;font-weight:600">From</label>
          <input class="input" type="date" [(ngModel)]="fromDate" style="width:160px">
          <label style="font-size:13px;font-weight:600">To</label>
          <input class="input" type="date" [(ngModel)]="toDate" style="width:160px">
          <ng-container *ngIf="selected === 'full-year-demand'">
            <label style="font-size:13px;font-weight:600">Year</label>
            <input class="input" type="number" [(ngModel)]="fiscalYear" style="width:90px" min="2020" max="2030">
          </ng-container>
          <ng-container *ngIf="selected === 'avg-time-to-hire'">
            <label style="font-size:13px;font-weight:600">Target (days)</label>
            <input class="input" type="number" [(ngModel)]="targetDays" style="width:80px" min="1">
          </ng-container>
          <button class="btn btn-primary" (click)="runReport()" [disabled]="loading">
            {{ loading ? 'Loading…' : 'Run Report' }}
          </button>
          <button class="btn btn-secondary" (click)="exportExcel()" *ngIf="reportData">Export Excel</button>
          <button class="btn btn-secondary" (click)="exportPdf()"   *ngIf="reportData">Export PDF</button>
        </div>

        <!-- KPI Cards -->
        <div *ngIf="reportData" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:12px;margin-bottom:20px">
          <div *ngFor="let kpi of reportData.kpis" class="card"
               style="text-align:center;padding:16px 12px;background:#f8fafc;border:1.5px solid #e2e8f0">
            <div style="font-size:24px;font-weight:800;color:#6b4df0">{{ kpi.value }}</div>
            <div style="font-size:12px;color:#64748b;margin-top:4px">{{ kpi.label }}</div>
          </div>
        </div>

        <!-- Chart Area -->
        <div *ngIf="reportData" style="background:#f8fafc;border:1.5px solid #e2e8f0;border-radius:10px;padding:24px;margin-bottom:20px;min-height:140px">
          <div *ngIf="reportData.chartType === 'funnel'" style="display:flex;flex-direction:column;align-items:center;gap:4px">
            <div style="font-size:12px;font-weight:700;color:#475569;margin-bottom:8px">
              {{ selectedLabel }} — Funnel
            </div>
            <ng-container *ngFor="let row of reportData.rows; let i = index">
              <div [style.width]="funnelWidth(i, reportData.rows.length)"
                   style="background:linear-gradient(90deg,#6b4df0,#8b6cf6);color:#fff;padding:8px 16px;border-radius:4px;text-align:center;font-size:12px;font-weight:600;transition:width .3s">
                {{ row['Stage'] }} — {{ row['Count'] }} ({{ row['Conversion %'] }})
              </div>
            </ng-container>
          </div>

          <div *ngIf="reportData.chartType === 'dualLine'" style="text-align:center;padding:16px 0">
            <div style="font-size:13px;font-weight:700;color:#475569;margin-bottom:12px">
              {{ selectedLabel }} — Dual Line Chart (Demand vs Fulfilled, {{ reportData.year || fiscalYear }})
            </div>
            <div style="display:flex;gap:24px;justify-content:center;flex-wrap:wrap">
              <div *ngFor="let row of reportData.rows"
                   style="display:flex;flex-direction:column;align-items:center;gap:2px;min-width:48px">
                <div style="font-size:11px;font-weight:700;color:#6b4df0">{{ row['Demand'] }}</div>
                <div style="font-size:11px;color:#10b981">{{ row['Fulfilled'] }}</div>
                <div style="font-size:10px;color:#94a3b8">{{ row['Month'] }}</div>
              </div>
            </div>
            <div style="display:flex;gap:16px;justify-content:center;margin-top:8px;font-size:11px">
              <span><span style="color:#6b4df0">■</span> Demand</span>
              <span><span style="color:#10b981">■</span> Fulfilled</span>
            </div>
          </div>

          <div *ngIf="reportData.chartType === 'donut'" style="text-align:center;padding:16px 0">
            <div style="font-size:13px;font-weight:700;color:#475569;margin-bottom:8px">
              {{ selectedLabel }} — Donut Chart per {{ groupByLabel }}
            </div>
            <div style="font-size:32px;margin-bottom:4px">🍩</div>
            <div style="font-size:12px;color:#64748b">Chart.js Doughnut — wire to reportData.rows</div>
          </div>

          <div *ngIf="reportData.chartType === 'bar'" style="text-align:center;padding:16px 0">
            <div style="font-size:13px;font-weight:700;color:#475569;margin-bottom:8px">
              {{ selectedLabel }} — Bar Chart per {{ groupByLabel }}
            </div>
            <div *ngIf="reportData.chartMeta?.benchmarkLine || reportData.chartMeta?.targetLine"
                 style="font-size:12px;color:#f97316;margin-bottom:4px">
              ── Benchmark / Target line: {{ reportData.chartMeta?.benchmarkLine ?? reportData.chartMeta?.targetLine }}
            </div>
            <div style="font-size:32px;margin-bottom:4px">📊</div>
            <div style="font-size:12px;color:#64748b">Chart.js Bar — wire to reportData.rows</div>
          </div>

          <div *ngIf="reportData.chartType === 'kpiTable'" style="text-align:center;padding:16px 0">
            <div style="font-size:13px;font-weight:700;color:#475569;margin-bottom:4px">
              {{ selectedLabel }} — KPI Tile + Table
            </div>
            <div style="font-size:12px;color:#64748b">Inline KPIs above + detail table below</div>
          </div>
        </div>

        <!-- Note (e.g. gender field missing) -->
        <div *ngIf="reportData?.note"
             style="background:#fffbeb;border:1px solid #fcd34d;border-radius:8px;padding:10px 14px;margin-bottom:16px;font-size:12px;color:#92400e">
          ℹ️ {{ reportData.note }}
        </div>

        <!-- BU Breakdown (pipeline report) -->
        <div *ngIf="reportData?.buBreakdown?.length" style="margin-bottom:20px">
          <div style="font-size:12px;font-weight:700;color:#475569;margin-bottom:8px">
            Pipeline by {{ groupByLabel }}
          </div>
          <div style="overflow-x:auto">
            <table style="width:100%;border-collapse:collapse;font-size:12px">
              <thead>
                <tr style="border-bottom:2px solid #e2e8f0;text-align:left">
                  <th *ngFor="let col of reportData.buBreakdownColumns" style="padding:8px 6px;font-weight:700;color:#475569">{{ col }}</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let row of reportData.buBreakdown" style="border-bottom:1px solid #f1f5f9">
                  <td *ngFor="let col of reportData.buBreakdownColumns" style="padding:7px 6px">{{ row[col] ?? '—' }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Data Table -->
        <div *ngIf="reportData && reportData.rows?.length" style="overflow-x:auto">
          <table style="width:100%;border-collapse:collapse;font-size:13px">
            <thead>
              <tr style="border-bottom:2px solid #e2e8f0;text-align:left">
                <th *ngFor="let col of reportData.columns" style="padding:10px 8px;font-weight:700;color:#475569">{{ col }}</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let row of reportData.rows" style="border-bottom:1px solid #f1f5f9">
                <td *ngFor="let col of reportData.columns"
                    [style.color]="cellColor(col, row[col])"
                    style="padding:9px 8px">{{ row[col] ?? '—' }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div *ngIf="reportData && !reportData.rows?.length" style="padding:32px;text-align:center;color:#94a3b8">
          No data for the selected date range.
        </div>
        <div *ngIf="!selected" style="padding:40px;text-align:center;color:#94a3b8">
          Select a report type above to get started.
        </div>
      </div>
    </section>
  `
})
export class ReportsComponent implements OnInit {
  private readonly api = environment.apiUrl;
  standardReports = STANDARD_REPORTS;
  taP3Reports     = TA_P3_REPORTS;
  selected        = '';
  selectedLabel   = '';
  selectedChartType = '';
  fromDate        = '';
  toDate          = '';
  fiscalYear      = new Date().getFullYear();
  targetDays      = 30;
  groupByLabel    = 'Department';
  loading         = false;
  reportData: any = null;

  constructor(private http: HttpClient, private snack: MatSnackBar) {}

  ngOnInit() {
    const now = new Date();
    const y = now.getFullYear(), m = now.getMonth();
    this.fromDate = new Date(y, m - 1, 1).toISOString().split('T')[0];
    this.toDate   = now.toISOString().split('T')[0];
  }

  selectReport(r: ReportMeta) {
    this.selected          = r.key;
    this.selectedLabel     = r.label;
    this.selectedChartType = r.chartType;
    this.reportData        = null;
  }

  runReport() {
    if (!this.selected) return;
    this.loading = true;
    let params = `?from=${this.fromDate}&to=${this.toDate}&groupBy=${encodeURIComponent(this.groupByLabel)}`;
    if (this.selected === 'full-year-demand')  params = `?year=${this.fiscalYear}&groupBy=${encodeURIComponent(this.groupByLabel)}`;
    if (this.selected === 'avg-time-to-hire')  params += `&targetDays=${this.targetDays}`;
    if (this.selected === 'open-positions-aging' || this.selected === 'positions-closed-mtd')
      params = `?groupBy=${encodeURIComponent(this.groupByLabel)}`;

    this.http.get<any>(`${this.api}/api/reports/${this.selected}${params}`).subscribe({
      next: data => { this.reportData = { ...data, rows: [...(data.rows || [])], columns: [...(data.columns || [])], kpis: [...(data.kpis || [])] }; this.loading = false; },
      error: () => {
        this.reportData = null;
        this.loading = false;
        this.snack.open('Failed to load report — check your date range and try again', 'Close', { duration: 4000 });
      }
    });
  }

  exportExcel() {
    window.open(`${this.api}/api/reports/${this.selected}/export/excel?from=${this.fromDate}&to=${this.toDate}`, '_blank');
  }

  exportPdf() {
    window.open(`${this.api}/api/reports/${this.selected}/export/pdf?from=${this.fromDate}&to=${this.toDate}`, '_blank');
  }

  freqColor(freq: string): string { return FREQ_COLORS[freq] ?? '#64748b'; }
  chartIcon(type: string): string  { return CHART_ICONS[type] ?? '📊'; }

  funnelWidth(index: number, total: number): string {
    const pct = 100 - (index / (total || 1)) * 40;
    return `${pct}%`;
  }

  cellColor(col: string, val: any): string {
    if (col === 'Status') {
      if (val === 'On Target') return '#16a34a';
      if (val === 'Over Target') return '#dc2626';
    }
    if (col === 'Criticality') {
      if (val === 'P1') return '#dc2626';
      if (val === 'P2') return '#f97316';
      if (val === 'P3') return '#eab308';
    }
    if (col === 'Aging Band' && typeof val === 'string' && val.startsWith('60')) return '#dc2626';
    if (col === 'vs Target' && typeof val === 'string' && val.startsWith('+')) return '#dc2626';
    return '';
  }

  getMockData(type: string): any {
    const bu = this.groupByLabel;
    const mockMap: Record<string, any> = {
      // ── Standard ──────────────────────────────────────────────────────────────
      'requisition-aging':      { kpis: [{ label: 'Total Open', value: 24 }, { label: 'Overdue', value: 7 }, { label: 'Avg Days Open', value: 34 }], chartType: 'bar', columns: ['Requisition', 'Department', 'Days Open', 'Status'], rows: [] },
      'vendor-performance':     { kpis: [{ label: 'Total Vendors', value: 12 }, { label: 'Avg Quality Score', value: '84%' }, { label: 'Avg Joining Rate', value: '68%' }], chartType: 'bar', columns: ['Vendor', 'Submissions', 'Selections', 'Joining Rate', 'SLA Score'], rows: [] },
      'candidate-funnel':       { kpis: [{ label: 'Submitted', value: 240 }, { label: 'Screened', value: 80 }, { label: 'Selected', value: 22 }, { label: 'Joined', value: 18 }], chartType: 'funnel', columns: ['Stage', 'Count', 'Conversion %'], rows: [{ Stage: 'Submitted', Count: 240, 'Conversion %': '100%' }, { Stage: 'Screening', Count: 80, 'Conversion %': '33.3%' }, { Stage: 'Selected', Count: 22, 'Conversion %': '9.2%' }, { Stage: 'Joined', Count: 18, 'Conversion %': '7.5%' }] },
      'offer-dropout':          { kpis: [{ label: 'Offers Made', value: 31 }, { label: 'Accepted', value: 24 }, { label: 'Dropouts', value: 7 }, { label: 'Dropout Rate', value: '22.6%' }], chartType: 'bar', columns: ['Candidate', 'Requisition', 'Offer Date', 'Outcome', 'Reason'], rows: [] },
      'time-to-hire':           { kpis: [{ label: 'Avg TAT (days)', value: 38 }, { label: 'Fastest', value: 12 }, { label: 'Slowest', value: 91 }], chartType: 'bar', columns: ['Requisition', 'Department', 'Open Date', 'Close Date', 'TAT Days'], rows: [] },
      'source-effectiveness':   { kpis: [{ label: 'Sources Used', value: 8 }, { label: 'Top Source', value: 'LinkedIn' }], chartType: 'bar', columns: ['Source', 'Submissions', 'Joinings', 'Joining Rate'], rows: [] },
      'budget-utilisation':     { kpis: [{ label: 'Total Budget', value: '₹2.5M' }, { label: 'Spent', value: '₹1.1M' }, { label: 'Utilisation', value: '44%' }], chartType: 'bar', columns: ['Department', 'Allocated', 'Spent', 'Remaining', 'Utilisation %'], rows: [] },
      'recruiter-productivity': { kpis: [{ label: 'Active Recruiters', value: 8 }, { label: 'Avg Submissions/mo', value: 28 }], chartType: 'bar', columns: ['Recruiter', 'Submissions', 'Selections', 'Joinings', 'Avg TAJ (days)'], rows: [] },
      'sla-compliance':         { kpis: [{ label: 'On Track', value: 14 }, { label: 'Warning', value: 6 }, { label: 'Overdue', value: 4 }], chartType: 'bar', columns: ['Requisition', 'Stage', 'Days in Stage', 'Target Days', 'Status'], rows: [] },
      'diversity-hiring':       { kpis: [{ label: 'Total Hires', value: 18 }, { label: 'Dept Coverage', value: 6 }], chartType: 'donut', columns: ['Department', 'Headcount Hired', 'Permanent', 'Contract', 'Intern'], rows: [] },
      'talent-pool-health':     { kpis: [{ label: 'Pool Size', value: 142 }, { label: 'Active', value: 89 }, { label: 'DoNotContact', value: 12 }], chartType: 'donut', columns: ['Candidate', 'Tags', 'Status', 'Last Contacted'], rows: [] },
      'internal-mobility':      { kpis: [{ label: 'Postings', value: 9 }, { label: 'Applications', value: 31 }, { label: 'Filled Internally', value: 5 }], chartType: 'bar', columns: ['Posting', 'Department', 'Applications', 'Status'], rows: [] },

      // ── Talent Acquisition P3 ─────────────────────────────────────────────────
      'ta-volume-by-bu': {
        kpis: [{ label: `Total ${bu}s`, value: 4 }, { label: 'Total Positions', value: 38 }, { label: 'Open Reqs', value: 22 }, { label: 'Closed Reqs', value: 16 }],
        chartType: 'bar', chartMeta: { xAxis: bu, series: ['Open', 'Closed'] },
        columns: [bu, 'Project', 'Total Positions', 'Open', 'Closed'],
        rows: [
          { [bu]: 'Engineering', Project: 'PROJ-001', 'Total Positions': 12, Open: 7, Closed: 5 },
          { [bu]: 'Engineering', Project: 'PROJ-002', 'Total Positions': 6,  Open: 3, Closed: 3 },
          { [bu]: 'Sales',       Project: 'PROJ-003', 'Total Positions': 10, Open: 6, Closed: 4 },
          { [bu]: 'HR',          Project: 'PROJ-004', 'Total Positions': 5,  Open: 3, Closed: 2 },
          { [bu]: 'Finance',     Project: 'PROJ-005', 'Total Positions': 5,  Open: 3, Closed: 2 },
        ]
      },
      'full-year-demand': {
        kpis: [{ label: 'FY Demand', value: 120 }, { label: 'FY Fulfilled', value: 84 }, { label: 'Fulfillment %', value: '70%' }],
        chartType: 'dualLine', chartMeta: { xAxis: 'Month', series: ['Demand', 'Fulfilled'] }, year: this.fiscalYear,
        columns: ['Month', 'Demand', 'Fulfilled'],
        rows: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map((m, i) => ({
          Month: m, Demand: [8,6,10,9,11,12,10,8,9,12,14,11][i], Fulfilled: [5,4,7,6,8,9,7,5,7,9,10,7][i]
        }))
      },
      'open-positions-aging': {
        kpis: [{ label: 'Total Open', value: 22 }, { label: 'P1 (Critical)', value: 4 }, { label: 'P2 (High)', value: 8 }, { label: 'Aged >45d', value: 6 }, { label: 'Avg Days Open', value: 31 }],
        chartType: 'kpiTable',
        columns: [bu, 'Role', 'Grade', 'Criticality', 'Positions', 'Days Open', 'Aging Band'],
        rows: [
          { [bu]: 'Engineering', Role: 'Sr. Engineer',   Grade: '5-8 yrs', Criticality: 'P1', Positions: 2, 'Days Open': 62, 'Aging Band': '60d+' },
          { [bu]: 'Engineering', Role: 'Tech Lead',      Grade: '8+ yrs',  Criticality: 'P1', Positions: 1, 'Days Open': 55, 'Aging Band': '45-59d' },
          { [bu]: 'Sales',       Role: 'Account Mgr',   Grade: '3-5 yrs', Criticality: 'P2', Positions: 3, 'Days Open': 28, 'Aging Band': '15-29d' },
          { [bu]: 'HR',          Role: 'HR Business Partner', Grade: '4-6 yrs', Criticality: 'P2', Positions: 1, 'Days Open': 14, 'Aging Band': '0-14d' },
          { [bu]: 'Finance',     Role: 'Analyst',       Grade: '2-4 yrs', Criticality: 'P3', Positions: 2, 'Days Open': 10, 'Aging Band': '0-14d' },
        ]
      },
      'positions-closed-mtd': {
        kpis: [{ label: 'Positions Closed MTD', value: 14 }, { label: `${bu}s Active`, value: 4 }],
        chartType: 'bar', chartMeta: { xAxis: bu, series: ['Positions Closed'] },
        columns: [bu, 'Positions Closed'],
        rows: [
          { [bu]: 'Engineering', 'Positions Closed': 6 },
          { [bu]: 'Sales',       'Positions Closed': 4 },
          { [bu]: 'HR',          'Positions Closed': 2 },
          { [bu]: 'Finance',     'Positions Closed': 2 },
        ]
      },
      'cost-per-hire': {
        kpis: [{ label: 'Total Hires', value: 14 }, { label: 'Org Avg Cost', value: 850000 }, { label: `${bu}s`, value: 4 }],
        chartType: 'bar', chartMeta: { xAxis: bu, series: ['Avg Cost'], benchmarkLine: 850000 },
        columns: [bu, 'Hires', 'Avg Cost', 'vs Org Avg'],
        rows: [
          { [bu]: 'Engineering', Hires: 6, 'Avg Cost': 1100000, 'vs Org Avg': '+29.4%' },
          { [bu]: 'Sales',       Hires: 4, 'Avg Cost': 750000,  'vs Org Avg': '-11.8%' },
          { [bu]: 'HR',          Hires: 2, 'Avg Cost': 650000,  'vs Org Avg': '-23.5%' },
          { [bu]: 'Finance',     Hires: 2, 'Avg Cost': 900000,  'vs Org Avg': '+5.9%'  },
        ]
      },
      'hiring-pipeline-stage': {
        kpis: [{ label: 'Total in Pipeline', value: 186 }, { label: 'At Offer Stage', value: 21 }, { label: 'Offer Conversion', value: '11.3%' }],
        chartType: 'funnel', chartMeta: { stages: ['Screen', 'Phone', 'Tech', 'Final', 'Offer'] },
        columns: ['Stage', 'Count', 'Conversion %'],
        rows: [
          { Stage: 'Screen', Count: 186, 'Conversion %': '100%' },
          { Stage: 'Phone',  Count: 94,  'Conversion %': '50.5%' },
          { Stage: 'Tech',   Count: 52,  'Conversion %': '28.0%' },
          { Stage: 'Final',  Count: 31,  'Conversion %': '16.7%' },
          { Stage: 'Offer',  Count: 21,  'Conversion %': '11.3%' },
        ],
        buBreakdownColumns: [bu, 'Screen', 'Phone', 'Tech', 'Final', 'Offer'],
        buBreakdown: [
          { [bu]: 'Engineering', Screen: 80, Phone: 40, Tech: 22, Final: 14, Offer: 9 },
          { [bu]: 'Sales',       Screen: 60, Phone: 30, Tech: 16, Final: 10, Offer: 7 },
          { [bu]: 'HR',          Screen: 26, Phone: 14, Tech: 8,  Final: 4,  Offer: 3 },
          { [bu]: 'Finance',     Screen: 20, Phone: 10, Tech: 6,  Final: 3,  Offer: 2 },
        ]
      },
      'avg-time-to-hire': {
        kpis: [{ label: 'Hires in Period', value: 14 }, { label: 'Org Avg (days)', value: 34 }, { label: 'Target (days)', value: this.targetDays }, { label: 'On Target BUs', value: 2 }],
        chartType: 'bar', chartMeta: { xAxis: bu, series: ['Avg Days'], targetLine: this.targetDays },
        columns: [bu, 'Hires', 'Avg Days', 'Target Days', 'vs Target', 'Status'],
        rows: [
          { [bu]: 'Sales',       Hires: 4, 'Avg Days': 24, 'Target Days': this.targetDays, 'vs Target': `-${this.targetDays - 24}d`, Status: 'On Target' },
          { [bu]: 'HR',          Hires: 2, 'Avg Days': 28, 'Target Days': this.targetDays, 'vs Target': `-${this.targetDays - 28}d`, Status: 'On Target' },
          { [bu]: 'Finance',     Hires: 2, 'Avg Days': 33, 'Target Days': this.targetDays, 'vs Target': `+${33 - this.targetDays}d`, Status: 'Over Target' },
          { [bu]: 'Engineering', Hires: 6, 'Avg Days': 45, 'Target Days': this.targetDays, 'vs Target': `+${45 - this.targetDays}d`, Status: 'Over Target' },
        ]
      },
      'gender-ratio-hiring': {
        kpis: [{ label: 'Total New Joins', value: 14 }, { label: 'Male', value: 9 }, { label: 'Female', value: 5 }, { label: 'Female %', value: '35.7%' }],
        chartType: 'donut', chartMeta: { segments: ['Male', 'Female', 'Other'], groupBy: bu },
        columns: [bu, 'Total', 'Male', 'Female', 'Other', 'M:F Ratio', 'Female %'],
        note: "Add a 'Gender' string field to the Candidate model to enable live gender tracking.",
        rows: [
          { [bu]: 'Engineering', Total: 6, Male: 5, Female: 1, Other: 0, 'M:F Ratio': '5.0:1', 'Female %': '16.7%' },
          { [bu]: 'Sales',       Total: 4, Male: 2, Female: 2, Other: 0, 'M:F Ratio': '1.0:1', 'Female %': '50.0%' },
          { [bu]: 'HR',          Total: 2, Male: 0, Female: 2, Other: 0, 'M:F Ratio': '—',     'Female %': '100%'  },
          { [bu]: 'Finance',     Total: 2, Male: 2, Female: 0, Other: 0, 'M:F Ratio': '—',     'Female %': '0.0%'  },
        ]
      },
    };
    return mockMap[type] || { kpis: [], chartType: 'bar', columns: [], rows: [] };
  }
}
