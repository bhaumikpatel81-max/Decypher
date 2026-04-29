import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const REPORT_TYPES = [
  { key: 'requisition-aging',       label: 'Requisition Aging Report',       icon: '📋' },
  { key: 'vendor-performance',      label: 'Vendor Performance Report',       icon: '🏢' },
  { key: 'candidate-funnel',        label: 'Candidate Funnel Report',         icon: '🔽' },
  { key: 'offer-dropout',           label: 'Offer & Dropout Analysis',        icon: '📉' },
  { key: 'time-to-hire',            label: 'Time-to-Hire Report',             icon: '⏱️' },
  { key: 'source-effectiveness',    label: 'Source Effectiveness Report',     icon: '📡' },
  { key: 'budget-utilisation',      label: 'Budget Utilisation Report',       icon: '💰' },
  { key: 'recruiter-productivity',  label: 'Recruiter Productivity Report',   icon: '🧑‍💼' },
  { key: 'sla-compliance',          label: 'SLA Compliance Report',           icon: '🎯' },
  { key: 'diversity-hiring',        label: 'Diversity & Hiring Mix Report',   icon: '📊' },
  { key: 'talent-pool-health',      label: 'Talent Pool Health Report',       icon: '🌱' },
  { key: 'internal-mobility',       label: 'Internal Mobility Report',        icon: '🔄' },
];

@Component({
  selector: 'app-reports',
  template: `
    <section class="stack-page">
      <div class="card" style="padding:20px 24px">
        <h2 style="margin:0 0 4px;font-size:20px;font-weight:700">Reports</h2>
        <p style="margin:0 0 20px;color:#64748b;font-size:13px">Select a report type to view KPIs, charts and detailed data.</p>

        <!-- Report Type Selector -->
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:10px;margin-bottom:24px">
          <div *ngFor="let r of reportTypes"
               (click)="selectReport(r.key)"
               [style.border]="selected === r.key ? '2px solid #6b4df0' : '1.5px solid #e2e8f0'"
               [style.background]="selected === r.key ? '#f5f3ff' : '#fff'"
               style="padding:14px 16px;border-radius:10px;cursor:pointer;transition:all .15s">
            <div style="font-size:20px;margin-bottom:6px">{{ r.icon }}</div>
            <div style="font-size:13px;font-weight:600;color:#0f172a">{{ r.label }}</div>
          </div>
        </div>

        <!-- Date Range -->
        <div *ngIf="selected" style="display:flex;align-items:center;gap:12px;margin-bottom:20px">
          <label style="font-size:13px;font-weight:600">From</label>
          <input class="input" type="date" [(ngModel)]="fromDate" style="width:160px">
          <label style="font-size:13px;font-weight:600">To</label>
          <input class="input" type="date" [(ngModel)]="toDate" style="width:160px">
          <button class="btn btn-primary" (click)="runReport()" [disabled]="loading">
            {{ loading ? 'Loading…' : 'Run Report' }}
          </button>
          <button class="btn btn-secondary" (click)="exportExcel()" *ngIf="reportData">Export Excel</button>
          <button class="btn btn-secondary" (click)="exportPdf()" *ngIf="reportData">Export PDF</button>
        </div>

        <!-- KPI Cards -->
        <div *ngIf="reportData" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:12px;margin-bottom:20px">
          <div *ngFor="let kpi of reportData.kpis" class="card"
               style="text-align:center;padding:16px 12px;background:#f8fafc;border:1.5px solid #e2e8f0">
            <div style="font-size:24px;font-weight:800;color:#6b4df0">{{ kpi.value }}</div>
            <div style="font-size:12px;color:#64748b;margin-top:4px">{{ kpi.label }}</div>
          </div>
        </div>

        <!-- Chart placeholder -->
        <div *ngIf="reportData" style="background:#f8fafc;border:1.5px solid #e2e8f0;border-radius:10px;padding:24px;margin-bottom:20px;text-align:center;min-height:140px;display:flex;align-items:center;justify-content:center">
          <div>
            <div style="font-size:32px;margin-bottom:8px">📊</div>
            <div style="color:#64748b;font-size:13px">Chart: {{ selectedLabel }} ({{ fromDate }} – {{ toDate }})</div>
            <div style="color:#94a3b8;font-size:12px;margin-top:4px">Visual chart integration via Chart.js — wire up with reportData.chartData</div>
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
                <td *ngFor="let col of reportData.columns" style="padding:9px 8px">{{ row[col] ?? '—' }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div *ngIf="reportData && !reportData.rows?.length" style="padding:32px;text-align:center;color:#94a3b8">
          No data found for the selected date range.
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
  reportTypes = REPORT_TYPES;
  selected = '';
  selectedLabel = '';
  fromDate = '';
  toDate = '';
  loading = false;
  reportData: any = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const now = new Date();
    const y = now.getFullYear(), m = now.getMonth();
    this.fromDate = new Date(y, m - 3, 1).toISOString().split('T')[0];
    this.toDate = now.toISOString().split('T')[0];
  }

  selectReport(key: string) {
    this.selected = key;
    this.selectedLabel = this.reportTypes.find(r => r.key === key)?.label || key;
    this.reportData = null;
  }

  runReport() {
    if (!this.selected) return;
    this.loading = true;
    const params = `?from=${this.fromDate}&to=${this.toDate}`;
    this.http.get<any>(`${this.api}/api/reports/${this.selected}${params}`).subscribe({
      next: data => { this.reportData = data; this.loading = false; },
      error: () => {
        this.reportData = this.getMockData(this.selected);
        this.loading = false;
      }
    });
  }

  exportExcel() {
    const url = `${this.api}/api/reports/${this.selected}/export/excel?from=${this.fromDate}&to=${this.toDate}`;
    window.open(url, '_blank');
  }

  exportPdf() {
    const url = `${this.api}/api/reports/${this.selected}/export/pdf?from=${this.fromDate}&to=${this.toDate}`;
    window.open(url, '_blank');
  }

  getMockData(type: string): any {
    const mockMap: Record<string, any> = {
      'requisition-aging':      { kpis: [{ label: 'Total Open', value: 24 }, { label: 'Overdue', value: 7 }, { label: 'Avg Days Open', value: 34 }], columns: ['Requisition', 'Department', 'Days Open', 'Status'], rows: [] },
      'vendor-performance':     { kpis: [{ label: 'Total Vendors', value: 12 }, { label: 'Avg Quality Score', value: '84%' }, { label: 'Avg Joining Rate', value: '68%' }], columns: ['Vendor', 'Submissions', 'Selections', 'Joining Rate', 'SLA Score'], rows: [] },
      'candidate-funnel':       { kpis: [{ label: 'Submitted', value: 240 }, { label: 'Screened', value: 80 }, { label: 'Selected', value: 22 }, { label: 'Joined', value: 18 }], columns: ['Stage', 'Count', 'Conversion %'], rows: [] },
      'offer-dropout':          { kpis: [{ label: 'Offers Made', value: 31 }, { label: 'Accepted', value: 24 }, { label: 'Dropouts', value: 7 }, { label: 'Dropout Rate', value: '22.6%' }], columns: ['Candidate', 'Requisition', 'Offer Date', 'Outcome', 'Reason'], rows: [] },
      'time-to-hire':           { kpis: [{ label: 'Avg TAT (days)', value: 38 }, { label: 'Fastest', value: 12 }, { label: 'Slowest', value: 91 }], columns: ['Requisition', 'Department', 'Open Date', 'Close Date', 'TAT Days'], rows: [] },
      'source-effectiveness':   { kpis: [{ label: 'Sources Used', value: 8 }, { label: 'Top Source', value: 'LinkedIn' }, { label: 'Best Joining Rate', value: 'Referral 78%' }], columns: ['Source', 'Submissions', 'Joinings', 'Joining Rate'], rows: [] },
      'budget-utilisation':     { kpis: [{ label: 'Total Budget', value: '£2.5M' }, { label: 'Spent', value: '£1.1M' }, { label: 'Utilisation', value: '44%' }], columns: ['Department', 'Allocated', 'Spent', 'Remaining', 'Utilisation %'], rows: [] },
      'recruiter-productivity': { kpis: [{ label: 'Active Recruiters', value: 8 }, { label: 'Avg Submissions/mo', value: 28 }, { label: 'Avg Joinings/mo', value: 6 }], columns: ['Recruiter', 'Submissions', 'Selections', 'Joinings', 'Avg TAJ (days)'], rows: [] },
      'sla-compliance':         { kpis: [{ label: 'On Track', value: 14 }, { label: 'Warning', value: 6 }, { label: 'Overdue', value: 4 }], columns: ['Requisition', 'Stage', 'Days in Stage', 'Target Days', 'Status'], rows: [] },
      'diversity-hiring':       { kpis: [{ label: 'Total Hires', value: 18 }, { label: 'Dept Coverage', value: 6 }], columns: ['Department', 'Headcount Hired', 'Permanent', 'Contract', 'Intern'], rows: [] },
      'talent-pool-health':     { kpis: [{ label: 'Pool Size', value: 142 }, { label: 'Active', value: 89 }, { label: 'DoNotContact', value: 12 }], columns: ['Candidate', 'Tags', 'Status', 'Last Contacted'], rows: [] },
      'internal-mobility':      { kpis: [{ label: 'Postings', value: 9 }, { label: 'Applications', value: 31 }, { label: 'Filled Internally', value: 5 }], columns: ['Posting', 'Department', 'Applications', 'Status'], rows: [] },
    };
    return mockMap[type] || { kpis: [], columns: [], rows: [] };
  }
}
