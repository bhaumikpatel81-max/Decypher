import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VendorService, Vendor } from '../services/vendor.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-vendors',
  template: `
    <section class="stack-page">
      <mat-tab-group [(selectedIndex)]="activeTab" animationDuration="150ms">

        <!-- ── TAB 1: Overview ── -->
        <mat-tab label="Overview">
          <div style="padding-top:20px;">
            <div class="kpi-grid">
              <article class="kpi-tile">
                <div class="kpi-label">Total Vendors</div>
                <div class="kpi-value">{{ vendors.length }}</div>
                <div class="kpi-meta">Connected to local database</div>
              </article>
              <article class="kpi-tile">
                <div class="kpi-label">Avg Quality</div>
                <div class="kpi-value">{{ avgQualityScore }}%</div>
                <div class="kpi-meta">Weighted vendor delivery score</div>
              </article>
              <article class="kpi-tile">
                <div class="kpi-label">Submissions</div>
                <div class="kpi-value">{{ submissionsThisMonth }}</div>
                <div class="kpi-meta">Current database total</div>
              </article>
            </div>

            <div class="card form-row">
              <input class="input" placeholder="Search vendors..." [(ngModel)]="searchTerm" (input)="applyFilters()">
              <select class="select" [(ngModel)]="statusFilter" (change)="applyFilters()">
                <option value="">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div class="card">
              <table class="table">
                <thead>
                  <tr><th>Vendor</th><th>Contact</th><th>Requirements</th><th>Assigned By</th><th>Submissions</th><th>Joinings</th><th>Quality</th><th>SLA</th><th>Status</th></tr>
                </thead>
                <tbody>
                  <tr *ngFor="let vendor of filteredVendors">
                    <td><strong>{{ vendor.name }}</strong></td>
                    <td>{{ vendor.contactPerson }}<br><small>{{ vendor.email }}</small></td>
                    <td>{{ vendor.requirementsAssigned || 0 }}</td>
                    <td>{{ vendor.assignedBy || '-' }}</td>
                    <td>{{ vendor.submissions || vendor.totalSubmissions }}</td>
                    <td>{{ vendor.joinings || vendor.successfulPlacements }}</td>
                    <td><span class="chip chip-brand">{{ vendor.qualityScore }}%</span></td>
                    <td>{{ vendor.slaScore }}%</td>
                    <td>{{ vendor.status }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </mat-tab>

        <!-- ── TAB 2: Performance ── -->
        <mat-tab label="Performance KPIs">
          <div style="padding-top:20px;">

            <!-- KPI summary row -->
            <div class="kpi-grid" style="margin-bottom:24px;">
              <article class="kpi-tile">
                <div class="kpi-label">Avg Fill Rate</div>
                <div class="kpi-value" style="color:#7c3aed;">{{ avgFillRate }}%</div>
                <div class="kpi-meta">Joinings ÷ Submissions</div>
              </article>
              <article class="kpi-tile">
                <div class="kpi-label">Avg Time-to-Hire</div>
                <div class="kpi-value">{{ avgTTH }}d</div>
                <div class="kpi-meta">Submission to joining</div>
              </article>
              <article class="kpi-tile">
                <div class="kpi-label">Top Vendor</div>
                <div class="kpi-value" style="font-size:20px;">{{ topVendor?.name || '—' }}</div>
                <div class="kpi-meta">{{ topVendor ? topVendorFillRate + '% fill rate' : '' }}</div>
              </article>
              <article class="kpi-tile">
                <div class="kpi-label">Avg SLA Score</div>
                <div class="kpi-value">{{ avgSla }}%</div>
                <div class="kpi-meta">SLA compliance average</div>
              </article>
            </div>

            <!-- Bar chart: Top 5 by fill rate -->
            <div class="card" style="padding:24px;margin-bottom:24px;">
              <h3 style="margin:0 0 20px;">Top 5 Vendors by Fill Rate</h3>
              <div *ngFor="let v of top5; let i = index" style="margin-bottom:16px;">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:5px;">
                  <div style="display:flex;align-items:center;gap:10px;">
                    <span class="rank-num"
                          [style.background]="i===0?'rgba(251,191,36,.2)':i===1?'rgba(192,192,192,.2)':i===2?'rgba(205,127,50,.2)':'var(--surface-alt)'"
                          [style.color]="i===0?'#b45309':i===1?'#6b7280':i===2?'#92400e':'var(--text-3)'">
                      {{ i + 1 }}
                    </span>
                    <span style="font-weight:600;font-size:13px;">{{ v.name }}</span>
                  </div>
                  <span style="font-weight:700;font-size:14px;color:#7c3aed;">{{ fillRate(v) }}%</span>
                </div>
                <div style="height:12px;background:var(--surface-alt);border-radius:6px;overflow:hidden;">
                  <div [style.width.%]="fillRate(v)"
                       style="height:100%;border-radius:6px;transition:width .5s;"
                       [style.background]="i===0?'#7c3aed':i===1?'#06b6d4':i===2?'#10b981':'#6366f1'">
                  </div>
                </div>
                <div style="display:flex;gap:16px;margin-top:4px;">
                  <span style="font-size:11px;color:var(--text-3);">Submissions: <b>{{ v.submissions || v.totalSubmissions || 0 }}</b></span>
                  <span style="font-size:11px;color:var(--text-3);">Joinings: <b>{{ v.joinings || v.successfulPlacements || 0 }}</b></span>
                </div>
              </div>
              <div *ngIf="!top5.length" style="text-align:center;color:var(--text-3);padding:20px;">
                No vendor data available.
              </div>
            </div>

            <!-- Per-vendor detail cards -->
            <div class="perf-grid">
              <div *ngFor="let v of sortedByFill" class="perf-card">
                <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:12px;">
                  <div>
                    <div style="font-weight:700;font-size:14px;">{{ v.name }}</div>
                    <div style="font-size:12px;color:var(--text-3);margin-top:2px;">{{ v.status }}</div>
                  </div>
                  <span class="fill-badge"
                        [style.background]="fillRate(v) >= 60 ? '#d1fae5' : fillRate(v) >= 30 ? '#fef3c7' : '#fee2e2'"
                        [style.color]="fillRate(v) >= 60 ? '#065f46' : fillRate(v) >= 30 ? '#92400e' : '#991b1b'">
                    {{ fillRate(v) }}% fill
                  </span>
                </div>
                <div class="perf-metrics">
                  <div class="perf-metric">
                    <div class="perf-metric-val">{{ v.submissions || v.totalSubmissions || 0 }}</div>
                    <div class="perf-metric-lbl">Submissions</div>
                  </div>
                  <div class="perf-metric">
                    <div class="perf-metric-val">{{ v.joinings || v.successfulPlacements || 0 }}</div>
                    <div class="perf-metric-lbl">Joinings</div>
                  </div>
                  <div class="perf-metric">
                    <div class="perf-metric-val">{{ v.qualityScore || 0 }}%</div>
                    <div class="perf-metric-lbl">Quality</div>
                  </div>
                  <div class="perf-metric">
                    <div class="perf-metric-val">{{ v.slaScore || 0 }}%</div>
                    <div class="perf-metric-lbl">SLA</div>
                  </div>
                </div>
                <!-- Mini fill bar -->
                <div style="margin-top:12px;height:4px;background:var(--surface-alt);border-radius:4px;overflow:hidden;">
                  <div [style.width.%]="fillRate(v)"
                       style="height:100%;border-radius:4px;background:#7c3aed;transition:width .4s;">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </mat-tab>

      </mat-tab-group>
    </section>
  `,
  styles: [`
    .rank-num {
      display:inline-flex; align-items:center; justify-content:center;
      width:24px; height:24px; border-radius:6px; font-weight:700; font-size:12px;
    }
    .perf-grid { display:grid; grid-template-columns:repeat(auto-fill, minmax(260px, 1fr)); gap:16px; }
    .perf-card {
      background:var(--surface); border:1px solid var(--border); border-radius:12px; padding:16px;
      transition:border-color .15s, box-shadow .15s;
    }
    .perf-card:hover { border-color:var(--brand); box-shadow:0 2px 8px rgba(124,58,237,.1); }
    .fill-badge { padding:3px 10px; border-radius:16px; font-size:11px; font-weight:700; }
    .perf-metrics { display:grid; grid-template-columns:1fr 1fr 1fr 1fr; gap:8px; }
    .perf-metric { text-align:center; }
    .perf-metric-val { font-size:18px; font-weight:700; color:var(--text-1); }
    .perf-metric-lbl { font-size:10px; color:var(--text-3); margin-top:2px; }
  `]
})
export class VendorsComponent implements OnInit {
  activeTab = 0;

  vendors: any[] = [];
  filteredVendors: any[] = [];
  avgQualityScore = 0;
  submissionsThisMonth = 0;
  searchTerm = '';
  statusFilter = '';

  constructor(private vendorService: VendorService, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadVendors();
    this.vendorService.getVendorPerformanceMetrics('default').subscribe(metrics => {
      this.avgQualityScore = metrics.avgQualityScore || 0;
      this.submissionsThisMonth = metrics.submissionsThisMonth || 0;
    });
  }

  loadVendors(): void {
    this.vendorService.getAllVendors('default').subscribe(vendors => {
      this.vendors = vendors;
      this.filteredVendors = vendors;
    });
  }

  applyFilters(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredVendors = this.vendors.filter(vendor => {
      const matchesSearch = vendor.name.toLowerCase().includes(term) || vendor.email.toLowerCase().includes(term);
      const matchesStatus = !this.statusFilter || vendor.status === this.statusFilter;
      return matchesSearch && matchesStatus;
    });
  }

  fillRate(v: any): number {
    const subs = v.submissions || v.totalSubmissions || 0;
    const joins = v.joinings || v.successfulPlacements || 0;
    return subs ? Math.round((joins / subs) * 100) : 0;
  }

  get sortedByFill(): any[] {
    return [...this.vendors].sort((a, b) => this.fillRate(b) - this.fillRate(a));
  }

  get top5(): any[] {
    return this.sortedByFill.slice(0, 5);
  }

  get avgFillRate(): number {
    if (!this.vendors.length) return 0;
    const sum = this.vendors.reduce((acc, v) => acc + this.fillRate(v), 0);
    return Math.round(sum / this.vendors.length);
  }

  get avgTTH(): number {
    const vals = this.vendors.map(v => v.avgTimeToHire || v.timeToHire || 0).filter(Boolean);
    return vals.length ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) : 28;
  }

  get topVendor(): any {
    return this.sortedByFill[0] || null;
  }

  get topVendorFillRate(): number {
    return this.topVendor ? this.fillRate(this.topVendor) : 0;
  }

  get avgSla(): number {
    const vals = this.vendors.map(v => v.slaScore || 0).filter(Boolean);
    return vals.length ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) : 0;
  }
}
