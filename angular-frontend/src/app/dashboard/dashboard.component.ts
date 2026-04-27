import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-dashboard',
  template: `
    <section class="stack-page">
      <div class="kpi-grid">
        <article class="kpi-tile" *ngFor="let kpi of kpis">
          <div class="kpi-label">{{ kpi.label }}</div>
          <div class="kpi-value">{{ kpi.value }}</div>
          <div class="kpi-meta">{{ kpi.meta }}</div>
        </article>
      </div>

      <div class="dashboard-grid">
        <div class="card">
          <h3>Hiring Funnel</h3>
          <div class="funnel-stage" *ngFor="let stage of funnel" [style.width.%]="stage.width">
            <span>{{ stage.stage }}</span>
            <strong>{{ stage.count }}</strong>
          </div>
        </div>

        <div class="card">
          <h3>Top Vendors</h3>
          <div class="metric-line" *ngFor="let vendor of topVendors">
            <span>{{ vendor.name }}</span>
            <b>{{ vendor.qualityScore }}%</b>
          </div>
        </div>
      </div>

      <div class="dashboard-grid">
        <div class="card">
          <h3>Recruiter Performance</h3>
          <table class="table">
            <thead><tr><th>Recruiter</th><th>Submissions</th><th>Joinings</th><th>Ratio</th></tr></thead>
            <tbody>
              <tr *ngFor="let recruiter of recruiters">
                <td>{{ recruiter.name }}</td>
                <td>{{ recruiter.submissions }}</td>
                <td>{{ recruiter.joinings }}</td>
                <td>{{ recruiter.selectionRatio }}%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="card">
          <h3>Recent Activity</h3>
          <div class="metric-line" *ngFor="let item of activity">
            <span>{{ item.action }}</span>
            <small>{{ item.time }}</small>
          </div>
        </div>
      </div>
    </section>
  `
})
export class DashboardComponent implements OnInit {
  kpis: any[] = [];
  funnel: any[] = [];
  topVendors: any[] = [];
  recruiters: any[] = [];
  activity: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any>(`${environment.apiUrl}/api/dashboard/metrics`).subscribe(metrics => {
      this.kpis = [
        { label: 'Total Candidates', value: metrics.totalCandidates, meta: 'From CV and pipeline records' },
        { label: 'Total CVs', value: metrics.totalCVs, meta: `${metrics.interviewedEarlier} interviewed earlier` },
        { label: 'Open Requirements', value: metrics.totalJobs, meta: 'Active hiring demand' },
        { label: 'Active Vendors', value: metrics.activeVendors, meta: `${metrics.totalVendors} total vendors` },
        { label: 'Selection Rate', value: `${metrics.selectionRate}%`, meta: 'Calculated from live candidates' }
      ];
      this.funnel = metrics.hiringFunnel;
      this.topVendors = metrics.topVendors;
      this.activity = metrics.recentActivity;
      this.activity = [
        ...(metrics.topSkills || []).map((item: any) => ({ action: `${item.skill}: ${item.count} CV(s)`, time: 'Top skill' })),
        ...metrics.recentActivity
      ];
    });

    this.http.get<any[]>(`${environment.apiUrl}/api/recruiters`).subscribe(data => this.recruiters = data);
  }
}
