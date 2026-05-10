import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface BenchmarkRole { role: string; dept: string; yourMedian: number;
  p25: number; p50: number; p75: number; comparaRatio: number; belowMarket: boolean;
}

@Component({ selector: 'app-salary-benchmarking',
  template: `
    <div class="page-container page-enter">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="page-title">Salary Benchmarking</h1>
          <p style="color:var(--text-3);font-size:13px;">Market Comparison · Compa-Ratio · Recommendations</p>
        </div>
        <div style="display:flex;gap:8px;">
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='comparison'" (click)="tab='comparison'">Market Comparison</button>
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='chart'" (click)="tab='chart'">Compa-Ratio Chart</button>
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='recommend'" (click)="tab='recommend'">Recommendations</button>
        </div>
      </div>

      <!-- KPIs -->
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:24px;">
        <div class="kpi-card"><div class="kpi-val" style="color:#6b4df0;">{{avgCompaRatio | number:'1.2-2'}}</div><div class="kpi-lbl">Avg Compa-Ratio</div></div>
        <div class="kpi-card"><div class="kpi-val" style="color:#ef4444;">{{belowMarketCount}}</div><div class="kpi-lbl">Below Market Roles</div></div>
        <div class="kpi-card"><div class="kpi-val" style="color:#10b981;">{{atMarketCount}}</div><div class="kpi-lbl">At Market</div></div>
        <div class="kpi-card"><div class="kpi-val" style="color:#f59e0b;">{{aboveMarketCount}}</div><div class="kpi-lbl">Above Market</div></div>
      </div>

      <!-- Filters -->
      <div style="display:flex;gap:12px;margin-bottom:16px;">
        <select class="select" style="max-width:180px;" [(ngModel)]="filterDept">
          <option value="">All Departments</option>
          <option *ngFor="let d of departments">{{d}}</option>
        </select>
        <input class="input" style="max-width:220px;" [(ngModel)]="search" placeholder="Search role...">
      </div>

      <!-- COMPARISON TABLE -->
      <div *ngIf="tab==='comparison'" class="card" style="overflow-x:auto;">
        <h3 style="font-weight:700;margin-bottom:16px;">Role vs Market Salary (Annual, Indian Market)</h3>
        <table style="width:100%;border-collapse:collapse;min-width:800px;">
          <thead><tr style="border-bottom:2px solid var(--border);">
            <th class="th">Role</th><th class="th">Dept</th>
            <th class="th" style="text-align:right;">Your Median</th>
            <th class="th" style="text-align:right;">Market P25</th>
            <th class="th" style="text-align:right;">Market P50</th>
            <th class="th" style="text-align:right;">Market P75</th>
            <th class="th" style="text-align:right;">Compa-Ratio</th>
            <th class="th">Position</th>
          </tr></thead>
          <tbody>
            <tr *ngFor="let r of filteredRoles" style="border-bottom:1px solid var(--border);" class="tr-hover" [class.below-market]="r.belowMarket">
              <td class="td"><strong>{{r.role}}</strong></td>
              <td class="td" style="color:var(--text-3);">{{r.dept}}</td>
              <td class="td" style="text-align:right;font-weight:600;">₹{{r.yourMedian | number}}</td>
              <td class="td" style="text-align:right;color:var(--text-3);">₹{{r.p25 | number}}</td>
              <td class="td" style="text-align:right;">₹{{r.p50 | number}}</td>
              <td class="td" style="text-align:right;color:var(--text-3);">₹{{r.p75 | number}}</td>
              <td class="td" style="text-align:right;">
                <span style="font-weight:700;" [style.color]="r.comparaRatio<0.9?'#ef4444':r.comparaRatio>1.1?'#10b981':'#6b4df0'">{{r.comparaRatio | number:'1.2-2'}}</span>
              </td>
              <td class="td">
                <span class="pos-badge" [class.below]="r.belowMarket" [class.at]="!r.belowMarket && r.comparaRatio<=1.1" [class.above]="r.comparaRatio>1.1">
                  {{r.comparaRatio<0.9?'Below':'Below'===''?'':r.comparaRatio>1.1?'Above':'At Market'}}
                  {{r.comparaRatio<0.9?'Market':r.comparaRatio>1.1?'Market':''}}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- COMPA-RATIO CHART -->
      <div *ngIf="tab==='chart'" class="card">
        <h3 style="font-weight:700;margin-bottom:16px;">Compa-Ratio by Role (1.0 = Market Median)</h3>
        <svg width="100%" viewBox="0 0 700 320" style="overflow:visible;">
          <!-- Reference line at 1.0 -->
          <line x1="80" y1="160" x2="680" y2="160" stroke="#6b4df0" stroke-width="1.5" stroke-dasharray="6 3" opacity="0.5"></line>
          <text x="76" y="164" text-anchor="end" font-size="11" fill="var(--text-3)">1.0</text>
          <text x="76" y="120" text-anchor="end" font-size="11" fill="var(--text-3)">1.1</text>
          <text x="76" y="200" text-anchor="end" font-size="11" fill="var(--text-3)">0.9</text>

          <g *ngFor="let r of roles; let i=index">
            <rect [attr.x]="80+i*60" [attr.y]="r.comparaRatio>=1?160-(r.comparaRatio-1)*400:160" [attr.width]="40"
              [attr.height]="Math.abs(r.comparaRatio-1)*400"
              [attr.fill]="r.comparaRatio<0.9?'#ef4444':r.comparaRatio>1.1?'#10b981':'#6b4df0'" opacity="0.85" rx="3">
            </rect>
            <text [attr.x]="100+i*60" [attr.y]="r.comparaRatio>=1?150-(r.comparaRatio-1)*400:170+Math.abs(r.comparaRatio-1)*400" text-anchor="middle" font-size="10" fill="var(--text)">{{r.comparaRatio}}</text>
            <text [attr.x]="100+i*60" [attr.y]="318" text-anchor="middle" font-size="9" fill="var(--text-3)" transform="rotate(-35, {{100+i*60}}, 318)">{{r.role.slice(0,12)}}</text>
          </g>
        </svg>
      </div>

      <!-- RECOMMENDATIONS -->
      <div *ngIf="tab==='recommend'">
        <div style="margin-bottom:16px;padding:16px;background:rgba(107,77,240,.06);border-radius:10px;border:1px solid rgba(107,77,240,.2);">
          <h4 style="font-weight:700;margin-bottom:8px;color:#6b4df0;">AI Recommendations</h4>
          <p style="font-size:13px;color:var(--text-3);">{{belowMarketCount}} roles are below the P50 market benchmark. Consider revising these in the next salary cycle to maintain competitiveness and reduce attrition risk.</p>
        </div>
        <div style="display:flex;flex-direction:column;gap:12px;">
          <div *ngFor="let r of belowMarketRoles" class="card" style="border-left:4px solid #ef4444;">
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <div>
                <div style="font-weight:700;font-size:15px;">{{r.role}}</div>
                <div style="font-size:12px;color:var(--text-3);">{{r.dept}}</div>
              </div>
              <div style="text-align:right;">
                <div style="font-size:13px;">Current: <strong>₹{{r.yourMedian | number}}</strong></div>
                <div style="font-size:13px;">P50 Market: <strong style="color:#6b4df0;">₹{{r.p50 | number}}</strong></div>
                <div style="font-size:12px;color:#ef4444;font-weight:700;">Gap: ₹{{(r.p50-r.yourMedian) | number}} ({{((r.p50-r.yourMedian)/r.yourMedian*100)|number:'1.0-0'}}%)</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Import -->
        <div class="card" style="margin-top:24px;max-width:420px;">
          <h4 style="font-weight:700;margin-bottom:12px;">Import Market Data</h4>
          <input class="input" [(ngModel)]="importSource" placeholder="Data source (e.g. Mercer, Korn Ferry, Naukri)" style="margin-bottom:12px;">
          <input #benchFile type="file" accept=".csv" style="display:none;" (change)="onBenchFile($event)">
          <div style="padding:24px;border:2px dashed var(--border);border-radius:8px;text-align:center;color:var(--text-3);cursor:pointer;" (click)="benchFile.click()">📤 Click to upload market survey CSV<br><small style="font-size:11px;">Columns: role, department, p25, p50, p75</small></div>
          <button class="btn btn-primary" style="margin-top:12px;" (click)="importData()" *ngIf="importSource">Import from Source Name</button>
          <div *ngIf="importMsg" style="margin-top:8px;padding:8px 12px;background:#d1fae5;border-radius:6px;color:#065f46;font-size:13px;font-weight:600;">{{importMsg}}</div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .kpi-card { background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px;text-align:center; }
    .kpi-val { font-size:28px;font-weight:800; }
    .kpi-lbl { font-size:12px;color:var(--text-3);margin-top:4px; }
    .th { padding:10px;text-align:left;font-size:12px;color:var(--text-3);font-weight:600; }
    .td { padding:10px;font-size:13px; }
    .tr-hover:hover { background:var(--surface-alt); }
    .below-market { background:rgba(239,68,68,.04); }
    .pos-badge { padding:3px 8px;border-radius:20px;font-size:11px;font-weight:700; }
    .pos-badge.below { background:#fee2e2;color:#991b1b; }
    .pos-badge.at { background:#d1fae5;color:#065f46; }
    .pos-badge.above { background:rgba(107,77,240,.1);color:#6b4df0; }
    .card { background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px;margin-bottom:16px; }
  `]
})
export class SalaryBenchmarkingComponent implements OnInit { private api = `${environment.apiUrl}/api/payroll`;
  constructor(private http: HttpClient) {}
  tab = 'comparison';
  filterDept = '';
  search = '';
  importSource = '';
  importMsg = '';
  Math = Math;

  departments = ['Engineering', 'HR', 'Finance', 'Sales', 'Operations'];

  roles: BenchmarkRole[] = [];

  get filteredRoles() { return this.roles.filter(r =>
      (!this.filterDept || r.dept === this.filterDept) &&
      (!this.search || r.role.toLowerCase().includes(this.search.toLowerCase()))
    ); }
  get avgCompaRatio() { return this.roles.reduce((s, r) => s + r.comparaRatio, 0) / this.roles.length; }
  get belowMarketCount() { return this.roles.filter(r => r.comparaRatio < 0.95).length; }
  get atMarketCount() { return this.roles.filter(r => r.comparaRatio >= 0.95 && r.comparaRatio <= 1.1).length; }
  get aboveMarketCount() { return this.roles.filter(r => r.comparaRatio > 1.1).length; }
  get belowMarketRoles() { return this.roles.filter(r => r.belowMarket); }

  ngOnInit() { this.loadBenchmarks(); }

  loadBenchmarks() { this.http.get<any[]>(`${this.api}/benchmarks`).subscribe(data => { this.roles = (data || []).map(r => { const yourMedian = r.yourMedianSalary || r.yourMedian || 0;
        const p50 = r.marketP50 || r.p50 || 0;
        const comparaRatio = p50 ? +(yourMedian / p50).toFixed(2) : 1;
        return { role: r.role || r.jobTitle || '',
          dept: r.department || r.dept || '',
          yourMedian,
          p25: r.marketP25 || r.p25 || 0,
          p50,
          p75: r.marketP75 || r.p75 || 0,
          comparaRatio,
          belowMarket: comparaRatio < 0.95 }; }); }); }

  importData() { if (!this.importSource) return;
    this.http.post(`${this.api}/benchmarking/import`, { source: this.importSource }).subscribe({ next: () => { this.importMsg = 'Import triggered'; this.importSource = ''; this.loadBenchmarks(); setTimeout(() => this.importMsg = '', 3000); },
      error: () => {} }); }

  onBenchFile(evt: Event) { const file = (evt.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => { const text = e.target?.result as string;
      const lines = text.split('\n').filter(l => l.trim());
      const header = lines[0].toLowerCase().split(',');
      const col = (name: string) => header.findIndex(h => h.includes(name));
      const rows = lines.slice(1).map(l => { const parts = l.split(',');
        return { role: parts[col('role')]?.trim() || parts[0]?.trim(),
          department: parts[col('dept')]?.trim() || parts[col('dep')]?.trim() || '',
          marketP25: +parts[col('p25')]?.trim() || 0,
          marketP50: +parts[col('p50')]?.trim() || 0,
          marketP75: +parts[col('p75')]?.trim() || 0,
          source: file.name }; }).filter(r => r.role && r.marketP50 > 0);
      let done = 0;
      rows.forEach(r => this.http.post(`${this.api}/benchmarks`, r).subscribe({ next: () => { if (++done === rows.length) { this.importMsg = `${done} benchmark rows imported`; setTimeout(() => this.importMsg = '', 4000); this.loadBenchmarks(); } } }));
      if (!rows.length) { this.importMsg = 'No valid rows found in CSV'; setTimeout(() => this.importMsg = '', 3000); } };
    reader.readAsText(file);
    (evt.target as HTMLInputElement).value = ''; }
}

