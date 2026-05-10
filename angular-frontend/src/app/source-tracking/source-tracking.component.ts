import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({ selector: 'app-source-tracking',
  template: `
    <section class="stack-page">
      <mat-tab-group [(selectedIndex)]="activeTab" animationDuration="150ms">

        <!-- ── TAB 1: Analytics ── -->
        <mat-tab label="Analytics">
          <div style="padding-top:20px;">

            <div class="kpi-grid" style="margin-bottom:24px;">
              <article class="kpi-tile">
                <div class="kpi-label">Total Applicants</div>
                <div class="kpi-value">{{ totalApplicants }}</div>
                <div class="kpi-meta">Across all sources</div>
              </article>
              <article class="kpi-tile">
                <div class="kpi-label">Total Hires</div>
                <div class="kpi-value" style="color:#10b981;">{{ totalHires }}</div>
                <div class="kpi-meta">Successful conversions</div>
              </article>
              <article class="kpi-tile">
                <div class="kpi-label">Overall Conversion</div>
                <div class="kpi-value" style="color:#7c3aed;">{{ overallConversion }}%</div>
                <div class="kpi-meta">Applicants → Hires</div>
              </article>
              <article class="kpi-tile">
                <div class="kpi-label">Best Source</div>
                <div class="kpi-value" style="font-size:20px;">{{ bestSource }}</div>
                <div class="kpi-meta">Highest hire count</div>
              </article>
            </div>

            <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px;">

              <!-- Pie Chart by Source -->
              <div class="card" style="padding:24px;">
                <h3 style="margin:0 0 20px;">Applicants by Source</h3>
                <div style="display:flex;align-items:center;gap:20px;flex-wrap:wrap;">
                  <svg viewBox="0 0 120 120" width="140" height="140">
                    <circle cx="60" cy="60" r="45" fill="none" stroke="#f1f5f9" stroke-width="20"/>
                    <ng-container *ngFor="let seg of pieSegments">
                      <circle cx="60" cy="60" r="45" fill="none" stroke-width="20"
                        [attr.stroke]="seg.color"
                        [attr.stroke-dasharray]="seg.dash + ' 283'"
                        [attr.stroke-dashoffset]="-seg.offset"
                        transform="rotate(-90 60 60)"/>
                    </ng-container>
                    <text *ngIf="!summary.length" x="60" y="64" text-anchor="middle" font-size="9" fill="#94a3b8">No data</text>
                  </svg>
                  <div style="display:flex;flex-direction:column;gap:8px;">
                    <div *ngFor="let seg of pieSegments"
                         style="display:flex;align-items:center;gap:8px;font-size:12px;">
                      <span [style.background]="seg.color"
                            style="width:10px;height:10px;border-radius:2px;display:inline-block;flex-shrink:0;"></span>
                      <span>{{ seg.label }}</span>
                      <b style="margin-left:4px;">{{ seg.applicants }}</b>
                    </div>
                    <div *ngIf="!pieSegments.length" style="color:var(--text-3);font-size:12px;">No data yet</div>
                  </div>
                </div>
              </div>

              <!-- Conversion Rate Bars -->
              <div class="card" style="padding:24px;">
                <h3 style="margin:0 0 20px;">Conversion Rate by Source</h3>
                <div *ngFor="let row of summary; let i = index" style="margin-bottom:14px;">
                  <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:5px;">
                    <span>
                      <span [style.background]="sourceColors[i % 5]"
                            style="width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:6px;"></span>
                      {{ row.source }}
                    </span>
                    <b>{{ row.conversionPct | number:'1.1-1' }}%</b>
                  </div>
                  <div style="height:10px;background:#f1f5f9;border-radius:5px;overflow:hidden;">
                    <div [style.width.%]="row.conversionPct"
                         [style.background]="sourceColors[i % 5]"
                         style="height:100%;border-radius:5px;transition:width .4s;"></div>
                  </div>
                </div>
                <div *ngIf="!summary.length" style="color:var(--text-3);text-align:center;padding:20px;">No data yet</div>
              </div>
            </div>

            <!-- Full Funnel Pivot Table -->
            <div class="card" style="padding:24px;">
              <h3 style="margin:0 0 16px;">Funnel by Source</h3>
              <table class="table">
                <thead>
                  <tr>
                    <th>Source</th>
                    <th>Applicants</th>
                    <th>Interviews</th>
                    <th>Offers</th>
                    <th>Hires</th>
                    <th>Conversion</th>
                    <th style="width:160px;">Pipeline</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let row of summary; let i = index">
                    <td>
                      <span [style.background]="sourceColors[i % 5]"
                            style="width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:6px;"></span>
                      <b>{{ row.source }}</b>
                    </td>
                    <td>{{ row.applicants }}</td>
                    <td>{{ row.interviews }}</td>
                    <td>{{ row.offers }}</td>
                    <td>{{ row.hires }}</td>
                    <td><b>{{ row.conversionPct | number:'1.1-1' }}%</b></td>
                    <td>
                      <div style="height:6px;background:#f1f5f9;border-radius:3px;overflow:hidden;">
                        <div [style.width.%]="row.applicants * 100 / maxApplicants"
                             [style.background]="sourceColors[i % 5]"
                             style="height:100%;border-radius:3px;transition:width .4s;"></div>
                      </div>
                    </td>
                  </tr>
                  <tr *ngIf="!summary.length">
                    <td colspan="7" style="text-align:center;color:var(--text-3);padding:20px;">No source data yet.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </mat-tab>

        <!-- ── TAB 2: UTM Generator ── -->
        <mat-tab label="UTM Generator">
          <div style="padding-top:20px;">
            <div class="card form-card">
              <h3>UTM Tracking Link Generator</h3>
              <div style="display:flex;gap:8px;">
                <input class="input" placeholder="Base job URL" [(ngModel)]="baseUrl" style="flex:1;">
                <select class="select" [(ngModel)]="utmSource" style="flex:0 0 150px;">
                  <option>LinkedIn</option><option>Indeed</option><option>Referral</option>
                  <option>Portal</option><option>Agency</option>
                </select>
                <button class="btn btn-secondary" (click)="generateLink()">Generate</button>
              </div>
              <div *ngIf="generatedLink"
                   style="background:#f8fafc;padding:10px;border-radius:8px;font-size:12px;word-break:break-all;margin-top:8px;">
                {{ generatedLink }}
              </div>
            </div>

            <div class="card">
              <h3>Application Source Summary</h3>
              <table class="table">
                <thead>
                  <tr>
                    <th>Source</th><th>Applicants</th><th>Interviews</th>
                    <th>Offers</th><th>Hires</th><th>Conversion %</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let row of summary">
                    <td><strong>{{ row.source }}</strong></td>
                    <td>{{ row.applicants }}</td>
                    <td>{{ row.interviews }}</td>
                    <td>{{ row.offers }}</td>
                    <td>{{ row.hires }}</td>
                    <td>{{ row.conversionPct | number:'1.1-1' }}%</td>
                  </tr>
                  <tr *ngIf="!summary.length">
                    <td colspan="6" style="text-align:center;color:var(--text-3)">No source data yet.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </mat-tab>

      </mat-tab-group>
    </section>
  `
})
export class SourceTrackingComponent implements OnInit { activeTab = 0;
  summary: any[] = [];
  baseUrl = '';
  utmSource = 'LinkedIn';
  generatedLink = '';

  readonly sourceColors = ['#7c3aed', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];

  constructor(private http: HttpClient) {}

  ngOnInit() { this.http.get<any[]>(`${environment.apiUrl}/api/source-tracking/summary`)
      .subscribe({ next: d => this.summary = d, error: () => {} }); }

  generateLink() { if (!this.baseUrl.trim()) return;
    const sep = this.baseUrl.includes('?') ? '&' : '?';
    this.generatedLink = `${this.baseUrl}${sep}utm_source=${encodeURIComponent(this.utmSource)}&utm_medium=job_post&utm_campaign=decypher`; }

  get totalApplicants() { return this.summary.reduce((s, r) => s + (r.applicants || 0), 0); }
  get totalHires()      { return this.summary.reduce((s, r) => s + (r.hires || 0), 0); }
  get maxApplicants()   { return Math.max(...this.summary.map(r => r.applicants || 0), 1); }
  get bestSource()      { return [...this.summary].sort((a, b) => (b.hires||0) - (a.hires||0))[0]?.source || '—'; }
  get overallConversion() { const t = this.totalApplicants;
    return t ? Math.round(this.totalHires / t * 100) : 0; }

  get pieSegments(): {color: string, dash: number, offset: number, label: string, applicants: number}[] { const total = this.totalApplicants || 1;
    const circ = 283;
    let offset = 0;
    return this.summary.map((r, i) => { const dash = (r.applicants / total) * circ;
      const seg = { color: this.sourceColors[i % 5], dash, offset, label: r.source, applicants: r.applicants };
      offset += dash;
      return seg; }); }
}

