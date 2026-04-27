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
  `,
  styles: [`
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
  recruiters: RecruiterPerformance[] = [];
  topRecruiter: RecruiterPerformance | null = null;
  top2Recruiter: RecruiterPerformance | null = null;
  top3Recruiter: RecruiterPerformance | null = null;
  selectedPeriod: 'month' | 'quarter' | 'year' = 'month';
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
