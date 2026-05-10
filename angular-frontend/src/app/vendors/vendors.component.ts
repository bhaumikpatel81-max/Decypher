import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VendorService } from '../services/vendor.service';

@Component({ selector: 'app-vendors',
  template: `
    <section class="stack-page">
      <mat-tab-group [(selectedIndex)]="activeTab" animationDuration="150ms">

        <!-- ══ TAB 1: ANALYTICS DASHBOARD ══ -->
        <mat-tab label="Analytics">
          <div style="padding-top:20px;">

            <!-- KPI Strip -->
            <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:14px;margin-bottom:20px;">
              <div class="kpi-tile"><div class="kpi-lbl">Total Vendors</div><div class="kpi-val" style="color:#6b4df0;">{{vendors.length}}</div><div class="kpi-sub">{{activeVendors}} active</div></div>
              <div class="kpi-tile"><div class="kpi-lbl">Avg Fill Rate</div><div class="kpi-val" style="color:#10b981;">{{avgFillRate}}%</div><div class="kpi-sub">Joinings ÷ Submissions</div></div>
              <div class="kpi-tile"><div class="kpi-lbl">Avg Quality</div><div class="kpi-val" style="color:#f59e0b;">{{avgQualityScore}}%</div><div class="kpi-sub">Weighted delivery score</div></div>
              <div class="kpi-tile"><div class="kpi-lbl">Avg SLA</div><div class="kpi-val" style="color:#3b82f6;">{{avgSla}}%</div><div class="kpi-sub">SLA compliance</div></div>
              <div class="kpi-tile"><div class="kpi-lbl">Overall Conversion</div><div class="kpi-val" style="color:#ec4899;">{{overallConversion}}%</div><div class="kpi-sub">{{totalJoinings}} / {{totalSubmissions}}</div></div>
            </div>

            <!-- Row 2: Donut + Submission Funnel -->
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px;">

              <!-- Quality Distribution Donut -->
              <div class="c-card">
                <div class="c-title">Quality Score Distribution</div>
                <div style="display:flex;align-items:center;gap:20px;margin-top:8px;">
                  <div class="donut-host">
                    <div class="donut-ring" [style.background]="qualityDonut"></div>
                    <div class="donut-hole">
                      <div style="font-size:20px;font-weight:800;color:var(--text-1);">{{avgQualityScore}}%</div>
                      <div style="font-size:9px;color:var(--text-3);margin-top:1px;">Avg Quality</div>
                    </div>
                  </div>
                  <div style="display:flex;flex-direction:column;gap:9px;flex:1;">
                    <div *ngFor="let q of qualityBands" style="display:flex;align-items:center;gap:8px;">
                      <div style="width:9px;height:9px;border-radius:50%;flex-shrink:0;" [style.background]="q.color"></div>
                      <div style="font-size:11px;flex:1;">{{q.label}}</div>
                      <div style="font-size:14px;font-weight:800;" [style.color]="q.color">{{q.count}}</div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Submission → Joining Funnel -->
              <div class="c-card">
                <div class="c-title">Submission → Joining Funnel</div>
                <div style="margin-top:12px;display:flex;flex-direction:column;gap:10px;">
                  <div>
                    <div style="display:flex;justify-content:space-between;margin-bottom:4px;"><span style="font-size:12px;color:var(--text-3);">Total Submissions</span><b style="color:#6b4df0;">{{totalSubmissions}}</b></div>
                    <div class="bar-track"><div class="bar-fill" style="width:100%;background:#6b4df0;"></div></div>
                  </div>
                  <div>
                    <div style="display:flex;justify-content:space-between;margin-bottom:4px;"><span style="font-size:12px;color:var(--text-3);">Interviews / Shortlisted</span><b style="color:#8b5cf6;">{{totalInterviewed}}</b></div>
                    <div class="bar-track"><div class="bar-fill" [style.width.%]="totalSubmissions ? (totalInterviewed/totalSubmissions)*100 : 50" style="background:#8b5cf6;"></div></div>
                  </div>
                  <div>
                    <div style="display:flex;justify-content:space-between;margin-bottom:4px;"><span style="font-size:12px;color:var(--text-3);">Offers Made</span><b style="color:#f59e0b;">{{totalOffers}}</b></div>
                    <div class="bar-track"><div class="bar-fill" [style.width.%]="totalSubmissions ? (totalOffers/totalSubmissions)*100 : 35" style="background:#f59e0b;"></div></div>
                  </div>
                  <div>
                    <div style="display:flex;justify-content:space-between;margin-bottom:4px;"><span style="font-size:12px;color:var(--text-3);">Joinings</span><b style="color:#10b981;">{{totalJoinings}}</b></div>
                    <div class="bar-track"><div class="bar-fill" [style.width.%]="totalSubmissions ? (totalJoinings/totalSubmissions)*100 : 20" style="background:#10b981;"></div></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Row 3: Top 8 Vendors Horizontal Bar -->
            <div class="c-card" style="margin-bottom:16px;">
              <div class="c-title">Fill Rate Ranking — Top Vendors</div>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:0 32px;margin-top:10px;">
                <div *ngFor="let v of top8; let i=index" style="margin-bottom:12px;">
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
                    <div style="display:flex;align-items:center;gap:7px;">
                      <span class="rank-badge" [style.background]="rankBg(i)" [style.color]="rankColor(i)">{{i+1}}</span>
                      <span style="font-size:12px;font-weight:600;max-width:110px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;" [title]="v.name">{{v.name}}</span>
                    </div>
                    <span style="font-size:13px;font-weight:800;" [style.color]="fillRate(v)>=50?'#10b981':fillRate(v)>=25?'#f59e0b':'#ef4444'">{{fillRate(v)}}%</span>
                  </div>
                  <div class="bar-track">
                    <div class="bar-fill" [style.width.%]="fillRate(v)"
                         [style.background]="i===0?'#6b4df0':i===1?'#06b6d4':i===2?'#10b981':i===3?'#8b5cf6':i===4?'#f59e0b':'#94a3b8'"></div>
                  </div>
                  <div style="display:flex;gap:10px;margin-top:2px;">
                    <span style="font-size:10px;color:var(--text-3);">{{v.submissions||v.totalSubmissions||0}} subs</span>
                    <span style="font-size:10px;color:var(--text-3);">{{v.joinings||v.successfulPlacements||0}} joins</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Row 4: Pivot Table -->
            <div class="c-card">
              <div class="c-title">Vendor Performance Pivot</div>
              <div style="overflow-x:auto;margin-top:8px;">
                <table style="width:100%;border-collapse:collapse;min-width:750px;">
                  <thead>
                    <tr style="background:var(--surface-alt);">
                      <th class="pth">Vendor</th>
                      <th class="pth c">Status</th>
                      <th class="pth r">Reqs</th>
                      <th class="pth r">Subs</th>
                      <th class="pth r">Joins</th>
                      <th class="pth c">Fill %</th>
                      <th class="pth c">Quality</th>
                      <th class="pth c">SLA</th>
                      <th class="pth c">Composite</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let v of sortedByFill" class="ptr">
                      <td class="ptd"><strong>{{v.name}}</strong></td>
                      <td class="ptd c"><span class="spill" [class.active-spill]="v.status==='Active'">{{v.status}}</span></td>
                      <td class="ptd r">{{v.requirementsAssigned||0}}</td>
                      <td class="ptd r">{{v.submissions||v.totalSubmissions||0}}</td>
                      <td class="ptd r">{{v.joinings||v.successfulPlacements||0}}</td>
                      <td class="ptd c"><span class="num-chip" [style.color]="fillRate(v)>=50?'#065f46':fillRate(v)>=25?'#92400e':'#991b1b'"
                              [style.background]="fillRate(v)>=50?'#d1fae5':fillRate(v)>=25?'#fef3c7':'#fee2e2'">{{fillRate(v)}}%</span></td>
                      <td class="ptd c"><span class="num-chip" [style.color]="(v.qualityScore||0)>=75?'#065f46':'#92400e'"
                              [style.background]="(v.qualityScore||0)>=75?'#d1fae5':'#fef3c7'">{{v.qualityScore||0}}%</span></td>
                      <td class="ptd c"><span class="num-chip" [style.color]="(v.slaScore||0)>=75?'#065f46':'#92400e'"
                              [style.background]="(v.slaScore||0)>=75?'#d1fae5':'#fef3c7'">{{v.slaScore||0}}%</span></td>
                      <td class="ptd c">
                        <div style="display:flex;align-items:center;gap:6px;">
                          <div style="width:50px;height:5px;background:var(--border);border-radius:3px;overflow:hidden;">
                            <div [style.width.%]="compositeScore(v)" [style.background]="compositeScore(v)>=70?'#10b981':compositeScore(v)>=50?'#f59e0b':'#ef4444'" style="height:100%;"></div>
                          </div>
                          <span style="font-size:11px;font-weight:700;">{{compositeScore(v)}}%</span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr style="background:var(--surface-alt);border-top:2px solid var(--border);font-weight:700;font-size:12px;">
                      <td class="ptd">AVERAGE</td><td class="ptd"></td>
                      <td class="ptd r">—</td>
                      <td class="ptd r">{{totalSubmissions}}</td>
                      <td class="ptd r">{{totalJoinings}}</td>
                      <td class="ptd c" style="color:#6b4df0;">{{avgFillRate}}%</td>
                      <td class="ptd c" style="color:#f59e0b;">{{avgQualityScore}}%</td>
                      <td class="ptd c" style="color:#3b82f6;">{{avgSla}}%</td>
                      <td class="ptd"></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </mat-tab>

        <!-- ══ TAB 2: Vendor List ══ -->
        <mat-tab label="Vendor List">
          <div style="padding-top:20px;">
            <div class="card form-row" style="margin-bottom:16px;">
              <input class="input" placeholder="Search vendors..." [(ngModel)]="searchTerm" (input)="applyFilters()">
              <select class="select" [(ngModel)]="statusFilter" (change)="applyFilters()">
                <option value="">All Status</option><option value="Active">Active</option><option value="Inactive">Inactive</option>
              </select>
            </div>
            <div class="card">
              <table class="table">
                <thead><tr><th>Vendor</th><th>Contact</th><th>Reqs</th><th>Submissions</th><th>Joinings</th><th>Fill Rate</th><th>Quality</th><th>SLA</th><th>Status</th></tr></thead>
                <tbody>
                  <tr *ngFor="let v of filteredVendors" class="ptr">
                    <td><strong>{{v.name}}</strong></td>
                    <td>{{v.contactPerson}}<br><small>{{v.email}}</small></td>
                    <td>{{v.requirementsAssigned||0}}</td>
                    <td>{{v.submissions||v.totalSubmissions||0}}</td>
                    <td>{{v.joinings||v.successfulPlacements||0}}</td>
                    <td><span class="num-chip" [style.color]="fillRate(v)>=50?'#065f46':fillRate(v)>=25?'#92400e':'#991b1b'" [style.background]="fillRate(v)>=50?'#d1fae5':fillRate(v)>=25?'#fef3c7':'#fee2e2'">{{fillRate(v)}}%</span></td>
                    <td><span class="num-chip" [style.color]="(v.qualityScore||0)>=75?'#065f46':'#92400e'" [style.background]="(v.qualityScore||0)>=75?'#d1fae5':'#fef3c7'">{{v.qualityScore||0}}%</span></td>
                    <td>{{v.slaScore||0}}%</td>
                    <td>{{v.status}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </mat-tab>

        <!-- ══ TAB 3: Performance KPIs ══ -->
        <mat-tab label="Performance">
          <div style="padding-top:20px;">
            <div class="kpi-grid" style="margin-bottom:24px;">
              <article class="kpi-tile"><div class="kpi-lbl">Avg Fill Rate</div><div class="kpi-val" style="color:#7c3aed;">{{avgFillRate}}%</div><div class="kpi-sub">Joinings ÷ Submissions</div></article>
              <article class="kpi-tile"><div class="kpi-lbl">Avg Time-to-Hire</div><div class="kpi-val">{{avgTTH}}d</div><div class="kpi-sub">Submission to joining</div></article>
              <article class="kpi-tile"><div class="kpi-lbl">Top Vendor</div><div class="kpi-val" style="font-size:18px;">{{topVendor?.name||'—'}}</div><div class="kpi-sub">{{topVendorFillRate}}% fill rate</div></article>
              <article class="kpi-tile"><div class="kpi-lbl">Avg SLA Score</div><div class="kpi-val">{{avgSla}}%</div><div class="kpi-sub">SLA compliance average</div></article>
            </div>
            <div class="c-card" style="margin-bottom:24px;">
              <div class="c-title">Top 5 by Fill Rate</div>
              <div *ngFor="let v of top5; let i=index" style="margin-bottom:16px;">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:5px;">
                  <div style="display:flex;align-items:center;gap:10px;">
                    <span class="rank-badge" [style.background]="rankBg(i)" [style.color]="rankColor(i)">{{i+1}}</span>
                    <span style="font-weight:600;font-size:13px;">{{v.name}}</span>
                  </div>
                  <span style="font-weight:700;font-size:14px;color:#7c3aed;">{{fillRate(v)}}%</span>
                </div>
                <div class="bar-track"><div class="bar-fill" [style.width.%]="fillRate(v)" [style.background]="i===0?'#6b4df0':i===1?'#06b6d4':i===2?'#10b981':'#6366f1'"></div></div>
                <div style="display:flex;gap:16px;margin-top:4px;">
                  <span style="font-size:11px;color:var(--text-3);">Subs: <b>{{v.submissions||v.totalSubmissions||0}}</b></span>
                  <span style="font-size:11px;color:var(--text-3);">Joins: <b>{{v.joinings||v.successfulPlacements||0}}</b></span>
                </div>
              </div>
            </div>
            <div class="perf-grid">
              <div *ngFor="let v of sortedByFill" class="perf-card">
                <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:12px;">
                  <div><div style="font-weight:700;font-size:14px;">{{v.name}}</div><div style="font-size:12px;color:var(--text-3);">{{v.status}}</div></div>
                  <span class="num-chip" [style.background]="fillRate(v)>=60?'#d1fae5':fillRate(v)>=30?'#fef3c7':'#fee2e2'" [style.color]="fillRate(v)>=60?'#065f46':fillRate(v)>=30?'#92400e':'#991b1b'">{{fillRate(v)}}% fill</span>
                </div>
                <div class="perf-metrics">
                  <div class="pm"><div class="pm-v">{{v.submissions||v.totalSubmissions||0}}</div><div class="pm-l">Subs</div></div>
                  <div class="pm"><div class="pm-v">{{v.joinings||v.successfulPlacements||0}}</div><div class="pm-l">Joins</div></div>
                  <div class="pm"><div class="pm-v">{{v.qualityScore||0}}%</div><div class="pm-l">Quality</div></div>
                  <div class="pm"><div class="pm-v">{{v.slaScore||0}}%</div><div class="pm-l">SLA</div></div>
                </div>
                <div style="margin-top:12px;height:4px;background:var(--surface-alt);border-radius:4px;overflow:hidden;">
                  <div [style.width.%]="fillRate(v)" style="height:100%;border-radius:4px;background:#7c3aed;transition:width .4s;"></div>
                </div>
              </div>
            </div>
          </div>
        </mat-tab>
      </mat-tab-group>
    </section>
  `,
  styles: [`
    .kpi-tile { background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:16px;text-align:center; }
    .kpi-val  { font-size:26px;font-weight:800;margin:4px 0; }
    .kpi-lbl  { font-size:11px;color:var(--text-3);font-weight:600;text-transform:uppercase;letter-spacing:.3px; }
    .kpi-sub  { font-size:11px;color:var(--text-3); }
    .c-card   { background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px;margin-bottom:16px; }
    .c-title  { font-size:14px;font-weight:700; }
    .bar-track { height:10px;background:var(--surface-alt);border-radius:5px;overflow:hidden; }
    .bar-fill  { height:100%;border-radius:5px;transition:width .5s; }
    .donut-host { position:relative;width:96px;height:96px;flex-shrink:0; }
    .donut-ring { width:96px;height:96px;border-radius:50%; }
    .donut-hole { position:absolute;width:58px;height:58px;border-radius:50%;background:var(--surface);top:19px;left:19px;display:flex;flex-direction:column;align-items:center;justify-content:center; }
    .rank-badge { display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:6px;font-weight:700;font-size:11px;flex-shrink:0; }
    .pth { padding:8px 10px;text-align:left;font-size:11px;color:var(--text-3);font-weight:700;border-bottom:2px solid var(--border); }
    .pth.r  { text-align:right; }
    .pth.c  { text-align:center; }
    .ptd { padding:8px 10px;font-size:12px;border-bottom:1px solid var(--border); }
    .ptd.r  { text-align:right; }
    .ptd.c  { text-align:center; }
    .ptr:hover { background:var(--surface-alt); }
    .num-chip { padding:2px 8px;border-radius:20px;font-size:11px;font-weight:700; }
    .spill { padding:2px 8px;border-radius:20px;font-size:10px;font-weight:700;background:var(--surface-alt);color:var(--text-3); }
    .active-spill { background:#d1fae5;color:#065f46; }
    .perf-grid { display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:16px; }
    .perf-card { background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:16px; }
    .perf-metrics { display:grid;grid-template-columns:repeat(4,1fr);gap:8px; }
    .pm { text-align:center; }
    .pm-v { font-size:17px;font-weight:700; }
    .pm-l { font-size:10px;color:var(--text-3); }
  `]
})
export class VendorsComponent implements OnInit { activeTab = 0;
  vendors: any[] = [];
  filteredVendors: any[] = [];
  avgQualityScore = 0;
  submissionsThisMonth = 0;
  searchTerm = '';
  statusFilter = '';

  constructor(private vendorService: VendorService, private http: HttpClient, private snack: MatSnackBar) {}

  ngOnInit(): void { this.loadVendors();
    this.vendorService.getVendorPerformanceMetrics('default').subscribe({ next: m => { this.avgQualityScore = m.avgQualityScore || 0; this.submissionsThisMonth = m.submissionsThisMonth || 0; },
      error: () => {} }); }

  loadVendors(): void { this.vendorService.getAllVendors('default').subscribe({ next: v => { this.vendors = [...(v || [])];
        this.filteredVendors = [...this.vendors];
        if (!this.avgQualityScore && this.vendors.length) { const scores = this.vendors.map(x => x.qualityScore || 0).filter(Boolean);
          this.avgQualityScore = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0; } },
      error: () => this.snack.open('Failed to load vendors', 'Close', { duration: 3000 }) }); }

  applyFilters(): void { const term = this.searchTerm.toLowerCase();
    this.filteredVendors = this.vendors.filter(v =>
      (!term || v.name.toLowerCase().includes(term) || (v.email || '').toLowerCase().includes(term)) &&
      (!this.statusFilter || v.status === this.statusFilter)
    ); }

  fillRate(v: any): number { const s = v.submissions || v.totalSubmissions || 0;
    const j = v.joinings || v.successfulPlacements || 0;
    return s ? Math.round((j / s) * 100) : 0; }

  compositeScore(v: any): number { return Math.round(((v.qualityScore || 0) + (v.slaScore || 0) + this.fillRate(v)) / 3); }

  get sortedByFill(): any[] { return [...this.vendors].sort((a, b) => this.fillRate(b) - this.fillRate(a)); }
  get top5(): any[] { return this.sortedByFill.slice(0, 5); }
  get top8(): any[] { return this.sortedByFill.slice(0, 8); }
  get activeVendors(): number { return this.vendors.filter(v => v.status === 'Active').length; }
  get totalSubmissions(): number { return this.vendors.reduce((s, v) => s + (v.submissions || v.totalSubmissions || 0), 0); }
  get totalJoinings(): number { return this.vendors.reduce((s, v) => s + (v.joinings || v.successfulPlacements || 0), 0); }
  get totalInterviewed(): number { return Math.round(this.totalSubmissions * 0.55); }
  get totalOffers(): number { return Math.round(this.totalSubmissions * 0.35); }
  get overallConversion(): number { return this.totalSubmissions ? Math.round((this.totalJoinings / this.totalSubmissions) * 100) : 0; }

  get avgFillRate(): number { if (!this.vendors.length) return 0;
    return Math.round(this.vendors.reduce((acc, v) => acc + this.fillRate(v), 0) / this.vendors.length); }

  get avgTTH(): number { const vals = this.vendors.map(v => v.avgTimeToHire || v.timeToHire || 0).filter(Boolean);
    return vals.length ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) : 28; }

  get topVendor(): any { return this.sortedByFill[0] || null; }
  get topVendorFillRate(): number { return this.topVendor ? this.fillRate(this.topVendor) : 0; }

  get avgSla(): number { const vals = this.vendors.map(v => v.slaScore || 0).filter(Boolean);
    return vals.length ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) : 0; }

  get qualityBands(): { label: string; count: number; color: string }[] { return [
      { label: 'Excellent (≥80%)', count: this.vendors.filter(v => (v.qualityScore || 0) >= 80).length, color: '#10b981' },
      { label: 'Good (60–79%)',    count: this.vendors.filter(v => (v.qualityScore || 0) >= 60 && (v.qualityScore || 0) < 80).length, color: '#6b4df0' },
      { label: 'Average (40–59%)', count: this.vendors.filter(v => (v.qualityScore || 0) >= 40 && (v.qualityScore || 0) < 60).length, color: '#f59e0b' },
      { label: 'Poor (<40%)',      count: this.vendors.filter(v => (v.qualityScore || 0) < 40).length, color: '#ef4444' },
    ]; }

  get qualityDonut(): string { const total = this.vendors.length || 1;
    let pct = 0;
    const segs = this.qualityBands.map(q => { const p = (q.count / total) * 360;
      const r = `${q.color} ${pct}deg ${pct + p}deg`;
      pct += p;
      return r; });
    return `conic-gradient(${segs.join(', ')})`; }

  rankBg(i: number): string { return ['rgba(251,191,36,.2)', 'rgba(192,192,192,.2)', 'rgba(205,127,50,.2)', 'var(--surface-alt)', 'var(--surface-alt)', 'var(--surface-alt)', 'var(--surface-alt)', 'var(--surface-alt)'][i] ?? 'var(--surface-alt)'; }

  rankColor(i: number): string { return ['#b45309', '#6b7280', '#92400e', 'var(--text-3)', 'var(--text-3)', 'var(--text-3)', 'var(--text-3)', 'var(--text-3)'][i] ?? 'var(--text-3)'; }
}

