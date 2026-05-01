import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';

export interface RecruiterPerformance {
  id: string;
  name: string;
  placements: number;
  offers: number;
  acceptanceRate: number;
  avgTimeToClose: number;
  month: string;
  rank: number;
}

@Component({
  selector: 'app-recruiters',
  template: `
    <section class="stack-page">
      <mat-tab-group [(selectedIndex)]="activeTab" animationDuration="150ms">

        <!-- ── TAB 1: Analytics ── -->
        <mat-tab label="Analytics">
          <div style="padding-top:20px;">

            <div class="kpi-grid" style="margin-bottom:24px;">
              <article class="kpi-tile">
                <div class="kpi-label">Total Recruiters</div>
                <div class="kpi-value">{{ recruiters.length }}</div>
                <div class="kpi-meta">Active team members</div>
              </article>
              <article class="kpi-tile">
                <div class="kpi-label">Total Placements</div>
                <div class="kpi-value" style="color:#7c3aed;">{{ totalPlacements }}</div>
                <div class="kpi-meta">This period</div>
              </article>
              <article class="kpi-tile">
                <div class="kpi-label">Avg Acceptance</div>
                <div class="kpi-value" style="color:#10b981;">{{ avgAcceptance }}%</div>
                <div class="kpi-meta">Offer acceptance rate</div>
              </article>
              <article class="kpi-tile">
                <div class="kpi-label">Avg Time to Close</div>
                <div class="kpi-value" style="color:#06b6d4;">{{ avgTimeClose }}d</div>
                <div class="kpi-meta">Days from open to join</div>
              </article>
            </div>

            <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px;">

              <!-- Placements Bar Chart -->
              <div class="card" style="padding:24px;">
                <h3 style="margin:0 0 20px;">Placements Leaderboard</h3>
                <div *ngFor="let r of recruiters; let i = index" style="margin-bottom:16px;">
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px;">
                    <div style="display:flex;align-items:center;gap:8px;">
                      <span class="rec-rank"
                            [style.background]="i===0?'rgba(251,191,36,.15)':i===1?'rgba(192,192,192,.15)':i===2?'rgba(205,127,50,.15)':'#f8fafc'"
                            [style.color]="i===0?'#b45309':i===1?'#6b7280':i===2?'#92400e':'var(--text-3)'">
                        {{ i + 1 }}
                      </span>
                      <span style="font-weight:600;font-size:13px;">{{ r.name }}</span>
                    </div>
                    <b style="font-size:14px;color:#7c3aed;">{{ r.placements }}</b>
                  </div>
                  <div style="height:10px;background:#f1f5f9;border-radius:5px;overflow:hidden;">
                    <div [style.width.%]="r.placements * 100 / maxPlacements"
                         [style.background]="i===0?'#7c3aed':i===1?'#06b6d4':i===2?'#10b981':'#6366f1'"
                         style="height:100%;border-radius:5px;transition:width .4s;"></div>
                  </div>
                </div>
                <div *ngIf="!recruiters.length" style="color:var(--text-3);text-align:center;padding:20px;">No data</div>
              </div>

              <!-- Acceptance Rate Donut -->
              <div class="card" style="padding:24px;">
                <h3 style="margin:0 0 20px;">Acceptance Rate Distribution</h3>
                <div style="display:flex;align-items:center;gap:20px;flex-wrap:wrap;">
                  <svg viewBox="0 0 120 120" width="140" height="140">
                    <circle cx="60" cy="60" r="45" fill="none" stroke="#f1f5f9" stroke-width="16"/>
                    <ng-container *ngFor="let seg of acceptanceSegments">
                      <circle cx="60" cy="60" r="45" fill="none" stroke-width="16"
                        [attr.stroke]="seg.color"
                        [attr.stroke-dasharray]="seg.dash + ' 283'"
                        [attr.stroke-dashoffset]="-seg.offset"
                        transform="rotate(-90 60 60)"/>
                    </ng-container>
                    <text x="60" y="55" text-anchor="middle" font-size="16" font-weight="700" fill="#1e293b">{{ avgAcceptance }}%</text>
                    <text x="60" y="70" text-anchor="middle" font-size="9" fill="#94a3b8">AVG</text>
                  </svg>
                  <div style="display:flex;flex-direction:column;gap:8px;">
                    <div *ngFor="let r of recruiters; let i = index"
                         style="display:flex;align-items:center;gap:8px;font-size:12px;max-width:160px;">
                      <span style="width:8px;height:8px;border-radius:50%;display:inline-block;flex-shrink:0;"
                            [style.background]="i===0?'#7c3aed':i===1?'#06b6d4':i===2?'#10b981':'#6366f1'"></span>
                      <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">{{ r.name }}</span>
                      <b style="margin-left:auto;padding-left:4px;">{{ r.acceptanceRate }}%</b>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Trend Line -->
            <div class="card" style="padding:24px;">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
                <h3 style="margin:0;">Placement Trend</h3>
                <span style="font-size:12px;color:var(--text-3);">Last 6 months</span>
              </div>
              <svg viewBox="0 0 500 100" width="100%" height="100" style="overflow:visible;">
                <line x1="0" y1="33" x2="500" y2="33" stroke="#f1f5f9" stroke-width="1"/>
                <line x1="0" y1="66" x2="500" y2="66" stroke="#f1f5f9" stroke-width="1"/>
                <polyline [attr.points]="recAreaPts" fill="rgba(124,58,237,0.08)" stroke="none"/>
                <polyline [attr.points]="recLinePts" fill="none" stroke="#7c3aed" stroke-width="2.5"
                          stroke-linecap="round" stroke-linejoin="round"/>
                <circle *ngFor="let pt of recDotPts" [attr.cx]="pt.x" [attr.cy]="pt.y" r="4" fill="#7c3aed"/>
              </svg>
              <div style="display:flex;justify-content:space-between;margin-top:8px;">
                <span *ngFor="let m of recMonths" style="font-size:11px;color:var(--text-3);">{{ m }}</span>
              </div>
            </div>
          </div>
        </mat-tab>

        <!-- ── TAB 2: Leaderboard ── -->
        <mat-tab label="Leaderboard">
          <div style="padding-top:20px;">
    <div class="recruiters-container page-enter">
      <!-- Header -->
      <div class="page-header">
        <div>
          <h1 class="page-title">Recruiters</h1>
          <div class="page-breadcrumb">Core • Recruiter Performance</div>
        </div>
        <div class="header-controls">
          <button class="btn btn-ghost" [class.active]="selectedPeriod === 'month'" 
            (click)="setPeriod('month')">Month</button>
          <button class="btn btn-ghost" [class.active]="selectedPeriod === 'quarter'" 
            (click)="setPeriod('quarter')">Quarter</button>
          <button class="btn btn-ghost" [class.active]="selectedPeriod === 'year'" 
            (click)="setPeriod('year')">Year</button>
        </div>
      </div>

      <!-- Top 3 Podium -->
      <div class="podium">
        <div class="podium-item podium-2nd" *ngIf="topRecruiter 2ndRecruiter">
          <div class="podium-rank">2nd</div>
          <div class="podium-medal">🥈</div>
          <div class="podium-name">{{ top2Recruiter?.name }}</div>
          <div class="podium-stat">{{ top2Recruiter?.placements }} Placements</div>
        </div>
        <div class="podium-item podium-1st" *ngIf="topRecruiter">
          <div class="podium-rank">1st</div>
          <div class="podium-medal">🥇</div>
          <div class="podium-name">{{ topRecruiter?.name }}</div>
          <div class="podium-stat">{{ topRecruiter?.placements }} Placements</div>
        </div>
        <div class="podium-item podium-3rd" *ngIf="top3Recruiter">
          <div class="podium-rank">3rd</div>
          <div class="podium-medal">🥉</div>
          <div class="podium-name">{{ top3Recruiter?.name }}</div>
          <div class="podium-stat">{{ top3Recruiter?.placements }} Placements</div>
        </div>
      </div>

      <!-- Leaderboard Table -->
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Leaderboard</h3>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Placements</th>
              <th>Offers</th>
              <th>Acceptance Rate</th>
              <th>Avg Days to Close</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let recruiter of recruiters; let i = index" class="table-row">
              <td class="cell-center">
                <span class="rank-badge" [class.rank-1]="i === 0" [class.rank-2]="i === 1" [class.rank-3]="i === 2">
                  {{ i + 1 }}
                </span>
              </td>
              <td class="cell-bold">{{ recruiter.name }}</td>
              <td class="cell-center">{{ recruiter.placements }}</td>
              <td class="cell-center">{{ recruiter.offers }}</td>
              <td class="cell-center">{{ recruiter.acceptanceRate }}%</td>
              <td class="cell-center">{{ recruiter.avgTimeToClose }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Attention Needed -->
      <div class="card attention-card">
        <div class="card-header">
          <h3 class="card-title">Attention Needed</h3>
        </div>
        <div class="attention-list">
          <div class="attention-item" *ngFor="let item of attentionItems">
            <div class="attention-icon">⚠️</div>
            <div class="attention-content">
              <div class="attention-title">{{ item.title }}</div>
              <div class="attention-description">{{ item.description }}</div>
            </div>
            <button class="btn btn-ghost btn-sm">View</button>
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
    .rec-rank {
      display:inline-flex; align-items:center; justify-content:center;
      width:24px; height:24px; border-radius:6px; font-weight:700; font-size:12px; flex-shrink:0;
    }
    .recruiters-container {
      padding: 24px;
    }
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 32px;
    }
    .header-controls {
      display: flex;
      gap: 8px;
    }
    .btn.active {
      background-color: var(--violet-600);
      color: white;
    }
    .podium {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      margin-bottom: 32px;
      align-items: flex-end;
    }
    .podium-item {
      background: var(--white);
      border: 2px solid var(--gray-200);
      border-radius: 8px;
      padding: 20px;
      text-align: center;
      height: 200px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .podium-1st {
      border-color: var(--yellow-400);
      height: 240px;
    }
    .podium-2nd { border-color: var(--gray-400); height: 200px; }
    .podium-3rd { border-color: var(--amber-600); height: 160px; }
    .podium-medal { font-size: 48px; margin: 10px 0; }
    .podium-name { font-weight: 600; font-size: 16px; }
    .rank-badge {
      padding: 4px 12px;
      background: var(--gray-100);
      border-radius: 4px;
      font-weight: 600;
    }
    .rank-1 { background-color: rgba(251, 191, 36, 0.2); color: var(--yellow-600); }
    .rank-2 { background-color: rgba(156, 163, 175, 0.2); color: var(--gray-700); }
    .rank-3 { background-color: rgba(217, 119, 6, 0.2); color: var(--amber-700); }
    .table { width: 100%; border-collapse: collapse; }
    .table-row:hover { background-color: var(--gray-50); }
    .attention-card { margin-top: 24px; }
    .attention-list { display: flex; flex-direction: column; gap: 12px; }
    .attention-item {
      display: flex;
      gap: 12px;
      align-items: center;
      padding: 12px;
      background: rgba(251, 146, 60, 0.05);
      border-left: 3px solid var(--orange-500);
      border-radius: 4px;
    }
    .attention-icon { font-size: 20px; }
    .attention-title { font-weight: 600; font-size: 14px; }
    .attention-description { font-size: 12px; color: var(--gray-600); }
  `]
})
export class RecruitersComponent implements OnInit {
  activeTab = 0;
  recruiters: RecruiterPerformance[] = [];
  topRecruiter: RecruiterPerformance | null = null;
  top2Recruiter: RecruiterPerformance | null = null;
  top3Recruiter: RecruiterPerformance | null = null;
  selectedPeriod: 'month' | 'quarter' | 'year' = 'month';

  readonly recMonths    = ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'];
  readonly recTrendData = [4, 7, 11, 9, 14, 18];

  get totalPlacements() { return this.recruiters.reduce((s, r) => s + r.placements, 0); }
  get maxPlacements()   { return Math.max(...this.recruiters.map(r => r.placements), 1); }
  get avgAcceptance()   {
    return this.recruiters.length
      ? Math.round(this.recruiters.reduce((s, r) => s + r.acceptanceRate, 0) / this.recruiters.length)
      : 0;
  }
  get avgTimeClose()    {
    return this.recruiters.length
      ? Math.round(this.recruiters.reduce((s, r) => s + r.avgTimeToClose, 0) / this.recruiters.length)
      : 0;
  }

  get acceptanceSegments(): {color: string, dash: number, offset: number}[] {
    const colors = ['#7c3aed', '#06b6d4', '#10b981', '#6366f1', '#f59e0b'];
    const total = this.recruiters.reduce((s, r) => s + r.acceptanceRate, 0) || 1;
    let offset = 0;
    return this.recruiters.map((r, i) => {
      const dash = (r.acceptanceRate / total) * 283;
      const seg = { color: colors[i % 5], dash, offset };
      offset += dash;
      return seg;
    });
  }

  get recLinePts(): string {
    const pts = this.recTrendData, max = Math.max(...pts, 1), step = 500 / (pts.length - 1);
    return pts.map((v, i) => `${i * step},${90 - (v / max) * 80}`).join(' ');
  }
  get recAreaPts(): string {
    const pts = this.recTrendData, max = Math.max(...pts, 1), step = 500 / (pts.length - 1);
    const line = pts.map((v, i) => `${i * step},${90 - (v / max) * 80}`).join(' ');
    return `0,90 ${line} 500,90`;
  }
  get recDotPts(): {x: number, y: number}[] {
    const pts = this.recTrendData, max = Math.max(...pts, 1), step = 500 / (pts.length - 1);
    return pts.map((v, i) => ({ x: i * step, y: 90 - (v / max) * 80 }));
  }
  attentionItems = [
    {
      title: 'Raj has low acceptance rate',
      description: '22% acceptance rate this quarter, investigation recommended'
    },
    {
      title: 'Priya exceeding targets',
      description: 'Consider for bonus or promotion - 145% of quota'
    },
    {
      title: 'Pipeline bottleneck',
      description: 'Avg time to close increased by 5 days - check process'
    }
  ];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadRecruiterPerformance();
  }

  loadRecruiterPerformance(): void {
    const tenantId = this.getTenantId();
    this.dashboardService.getRecruiterPerformance(tenantId).subscribe({
      next: (recruiters) => {
        this.recruiters = recruiters.sort((a, b) => b.placements - a.placements);
        if (this.recruiters.length > 0) {
          this.topRecruiter = this.recruiters[0];
          this.top2Recruiter = this.recruiters[1];
          this.top3Recruiter = this.recruiters[2];
        }
      },
      error: (error) => console.error('Failed to load recruiter performance', error)
    });
  }

  setPeriod(period: 'month' | 'quarter' | 'year'): void {
    this.selectedPeriod = period;
    this.loadRecruiterPerformance();
  }

  private getTenantId(): string {
    return localStorage.getItem('tenantId') || 'default';
  }
}
