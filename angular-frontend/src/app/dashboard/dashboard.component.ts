import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-dashboard',
  template: `
    <section class="dash">

      <!-- ── KPI STRIP ─────────────────────────────────────────── -->
      <div class="kpi-row">
        <div class="kpi-card" *ngFor="let k of kpis">
          <div class="kpi-icon" [style.background]="k.color">{{ k.icon }}</div>
          <div class="kpi-body">
            <div class="kpi-label">{{ k.label }}</div>
            <div class="kpi-value">{{ k.value }}</div>
            <div class="kpi-foot">
              <span class="kpi-trend" [class.trend-up]="k.up" [class.trend-dn]="!k.up">
                {{ k.up ? '▲' : '▼' }} {{ k.change }}
              </span>
              <span class="kpi-sub">{{ k.meta }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ── TREND CHART + DONUT ───────────────────────────────── -->
      <div class="row-2col wide-left">

        <!-- Monthly Hiring Trend (SVG area chart) -->
        <div class="card">
          <div class="card-head">
            <h3>Monthly Hiring Trend</h3>
            <div class="legend-row">
              <span class="leg-dot" style="background:#6b4df0"></span><span class="leg-text">Submitted</span>
              <span class="leg-dot" style="background:#3bbdea; margin-left:14px"></span><span class="leg-text">Joined</span>
            </div>
          </div>
          <div class="chart-wrap">
            <svg [attr.viewBox]="'0 0 ' + svgW + ' ' + svgH" class="trend-svg" preserveAspectRatio="none">
              <defs>
                <linearGradient id="gSubmit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#6b4df0" stop-opacity="0.28"/>
                  <stop offset="100%" stop-color="#6b4df0" stop-opacity="0.02"/>
                </linearGradient>
                <linearGradient id="gJoin" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#3bbdea" stop-opacity="0.22"/>
                  <stop offset="100%" stop-color="#3bbdea" stop-opacity="0.02"/>
                </linearGradient>
              </defs>
              <line *ngFor="let y of yGrids" [attr.x1]="0" [attr.y1]="y" [attr.x2]="svgW" [attr.y2]="y" stroke="#eef0f4" stroke-width="1"/>
              <path [attr.d]="submitArea" fill="url(#gSubmit)"/>
              <polyline [attr.points]="submitLine" fill="none" stroke="#6b4df0" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
              <path [attr.d]="joinArea" fill="url(#gJoin)"/>
              <polyline [attr.points]="joinLine" fill="none" stroke="#3bbdea" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>
              <circle *ngFor="let p of submitDots" [attr.cx]="p.x" [attr.cy]="p.y" r="4" fill="#6b4df0" stroke="#fff" stroke-width="2"/>
              <circle *ngFor="let p of joinDots"   [attr.cx]="p.x" [attr.cy]="p.y" r="3.5" fill="#3bbdea" stroke="#fff" stroke-width="2"/>
            </svg>
            <div class="chart-x-labels">
              <span *ngFor="let m of monthlyTrend">{{ m.month }}</span>
            </div>
          </div>
        </div>

        <!-- Donut – Selection Rate -->
        <div class="card donut-card">
          <div class="card-head"><h3>Selection Rate</h3></div>
          <div class="donut-center">
            <svg viewBox="0 0 130 130" class="donut-svg">
              <defs>
                <linearGradient id="dGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stop-color="#6b4df0"/>
                  <stop offset="100%" stop-color="#3bbdea"/>
                </linearGradient>
              </defs>
              <circle cx="65" cy="65" r="52" fill="none" stroke="#eef0f4" stroke-width="13"/>
              <circle cx="65" cy="65" r="52" fill="none"
                stroke="url(#dGrad)" stroke-width="13" stroke-linecap="round"
                [attr.stroke-dasharray]="donutDash"
                transform="rotate(-90 65 65)"/>
              <text x="65" y="62" text-anchor="middle" font-size="22" font-weight="700" fill="#0f1320">{{ selectionRate }}%</text>
              <text x="65" y="79" text-anchor="middle" font-size="9" fill="#9aa2b2" letter-spacing="1">SELECTION</text>
            </svg>
            <div class="donut-stats">
              <div class="donut-stat">
                <div class="ds-val">{{ totalCandidates }}</div>
                <div class="ds-lbl">Total</div>
              </div>
              <div class="donut-divider"></div>
              <div class="donut-stat">
                <div class="ds-val" style="color:#16a34a">{{ joinedCount }}</div>
                <div class="ds-lbl">Joined</div>
              </div>
              <div class="donut-divider"></div>
              <div class="donut-stat">
                <div class="ds-val" style="color:#6b4df0">{{ openReqs }}</div>
                <div class="ds-lbl">Open Reqs</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ── FUNNEL + VENDORS + TIME-TO-FILL ──────────────────── -->
      <div class="row-3col">

        <!-- Hiring Funnel -->
        <div class="card">
          <div class="card-head"><h3>Hiring Funnel</h3><span class="tag">Live</span></div>
          <div class="funnel-wrap">
            <div class="funnel-row" *ngFor="let s of funnel; let i = index">
              <span class="funnel-lbl">{{ s.stage }}</span>
              <div class="funnel-track">
                <div class="funnel-fill" [style.width.%]="s.pct" [style.background]="funnelColors[i % funnelColors.length]"></div>
              </div>
              <span class="funnel-cnt">{{ s.count }}</span>
            </div>
          </div>
        </div>

        <!-- Top Vendors -->
        <div class="card">
          <div class="card-head"><h3>Top Vendors</h3><span class="tag">Quality Score</span></div>
          <div class="vendor-list">
            <div class="vendor-row" *ngFor="let v of topVendors">
              <div class="v-avatar">{{ v.name[0] }}</div>
              <div class="v-info">
                <span class="v-name">{{ v.name }}</span>
                <div class="v-bar-track">
                  <div class="v-bar-fill" [style.width.%]="v.qualityScore"></div>
                </div>
              </div>
              <span class="v-score"
                [class.sc-hi]="v.qualityScore >= 85"
                [class.sc-md]="v.qualityScore >= 70 && v.qualityScore < 85"
                [class.sc-lo]="v.qualityScore < 70">{{ v.qualityScore }}%</span>
            </div>
          </div>
        </div>

        <!-- Time to Fill -->
        <div class="card">
          <div class="card-head"><h3>Time to Fill</h3><span class="tag">vs 30d target</span></div>
          <div class="ttf-list">
            <div class="ttf-row" *ngFor="let r of timeToFill">
              <span class="ttf-role">{{ r.role }}</span>
              <div class="ttf-track">
                <div class="ttf-fill"
                  [style.width.%]="(r.days / 45) * 100"
                  [class.ttf-ok]="r.days <= r.target"
                  [class.ttf-ov]="r.days > r.target"></div>
                <div class="ttf-marker" [style.left.%]="(r.target / 45) * 100"></div>
              </div>
              <span class="ttf-days" [class.ttf-ov]="r.days > r.target">{{ r.days }}d</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ── SKILLS + RECRUITER TABLE + ACTIVITY ───────────────── -->
      <div class="row-3col bottom">

        <!-- Skill Demand -->
        <div class="card">
          <div class="card-head"><h3>Skill Demand</h3><span class="tag">Top 6</span></div>
          <div class="skill-list">
            <div class="skill-row" *ngFor="let s of topSkills">
              <span class="skill-name">{{ s.skill }}</span>
              <div class="skill-track">
                <div class="skill-fill" [style.width.%]="s.pct"></div>
              </div>
              <span class="skill-cnt">{{ s.count }}</span>
            </div>
          </div>
        </div>

        <!-- Recruiter Performance (pivot table) -->
        <div class="card">
          <div class="card-head"><h3>Recruiter Performance</h3><span class="tag">This Quarter</span></div>
          <div class="table-scroll">
            <table class="perf-tbl">
              <thead>
                <tr>
                  <th>Recruiter</th>
                  <th>Sub.</th>
                  <th>Short.</th>
                  <th>Joined</th>
                  <th>Rate</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let r of enrichedRecruiters">
                  <td>
                    <div class="r-cell">
                      <div class="r-av" [style.background]="r.color">{{ r.name[0] }}</div>
                      <span>{{ r.name }}</span>
                    </div>
                  </td>
                  <td>{{ r.submissions }}</td>
                  <td>{{ r.shortlisted }}</td>
                  <td>{{ r.joinings }}</td>
                  <td><strong>{{ r.selectionRatio }}%</strong></td>
                  <td>
                    <span class="grade"
                      [class.g-a]="r.grade === 'A'"
                      [class.g-b]="r.grade === 'B'"
                      [class.g-c]="r.grade === 'C'">{{ r.grade }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Activity Timeline -->
        <div class="card">
          <div class="card-head"><h3>Recent Activity</h3></div>
          <div class="activity-feed">
            <div class="act-item" *ngFor="let a of activity">
              <div class="act-dot"
                [class.dot-skill]="a.time === 'Top skill'"
                [class.dot-today]="a.time === 'Today'"></div>
              <div class="act-body">
                <span class="act-text">{{ a.action }}</span>
                <span class="act-time">{{ a.time }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  `,
  styles: [`
    .dash { display: flex; flex-direction: column; gap: 18px; }

    /* ── KPI STRIP ── */
    .kpi-row { display: grid; grid-template-columns: repeat(5, 1fr); gap: 14px; }
    .kpi-card {
      background: #fff; border: 1px solid #e1e4eb; border-radius: 12px;
      padding: 16px; display: flex; gap: 13px; align-items: flex-start;
      box-shadow: 0 1px 3px rgba(17,20,45,.05);
      transition: box-shadow 180ms, transform 180ms;
    }
    .kpi-card:hover { box-shadow: 0 6px 20px rgba(107,77,240,.13); transform: translateY(-1px); }
    .kpi-icon {
      width: 44px; height: 44px; border-radius: 10px;
      display: flex; align-items: center; justify-content: center;
      font-size: 19px; flex-shrink: 0;
    }
    .kpi-body { flex: 1; min-width: 0; }
    .kpi-label { font-size: 10px; font-weight: 700; color: #6e7686; text-transform: uppercase; letter-spacing: .07em; }
    .kpi-value { font-size: 30px; font-weight: 800; color: #0f1320; line-height: 1.05; margin: 3px 0 5px; }
    .kpi-foot { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
    .kpi-trend { font-size: 11px; font-weight: 700; }
    .trend-up { color: #16a34a; }
    .trend-dn { color: #dc2626; }
    .kpi-sub { font-size: 11px; color: #9aa2b2; }

    /* ── LAYOUT ── */
    .card {
      background: #fff; border: 1px solid #e1e4eb; border-radius: 12px;
      padding: 20px; box-shadow: 0 1px 3px rgba(17,20,45,.05);
    }
    .card-head {
      display: flex; justify-content: space-between; align-items: center;
      margin-bottom: 16px;
    }
    .card-head h3 { margin: 0; font-size: 14px; font-weight: 700; color: #0f1320; }
    .tag {
      font-size: 10px; font-weight: 700; letter-spacing: .05em; text-transform: uppercase;
      color: #5C5C99; background: rgba(92,92,153,.1); padding: 3px 8px; border-radius: 99px;
    }

    .row-2col { display: grid; gap: 14px; }
    .wide-left { grid-template-columns: 1fr 260px; }
    .row-3col { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
    .bottom { }

    /* ── SVG TREND CHART ── */
    .chart-wrap { position: relative; }
    .trend-svg { width: 100%; height: 160px; display: block; }
    .chart-x-labels {
      display: flex; justify-content: space-between;
      font-size: 11px; color: #9aa2b2; margin-top: 6px; padding: 0 2px;
    }
    .legend-row { display: flex; align-items: center; gap: 5px; font-size: 12px; color: #6e7686; }
    .leg-dot { width: 10px; height: 10px; border-radius: 50%; display: inline-block; }
    .leg-text { margin-right: 2px; }

    /* ── DONUT ── */
    .donut-card { display: flex; flex-direction: column; }
    .donut-center { display: flex; flex-direction: column; align-items: center; gap: 14px; flex: 1; padding-top: 6px; }
    .donut-svg { width: 150px; height: 150px; }
    .donut-stats { display: flex; align-items: center; gap: 12px; width: 100%; justify-content: center; }
    .donut-stat { text-align: center; }
    .ds-val { font-size: 20px; font-weight: 800; color: #0f1320; }
    .ds-lbl { font-size: 10px; color: #9aa2b2; text-transform: uppercase; letter-spacing: .05em; margin-top: 2px; }
    .donut-divider { width: 1px; height: 32px; background: #e1e4eb; }

    /* ── FUNNEL ── */
    .funnel-wrap { display: flex; flex-direction: column; gap: 10px; }
    .funnel-row { display: flex; align-items: center; gap: 10px; }
    .funnel-lbl { width: 80px; font-size: 12px; color: #4b5262; flex-shrink: 0; }
    .funnel-track { flex: 1; height: 26px; background: #f6f7fa; border-radius: 6px; overflow: hidden; }
    .funnel-fill { height: 100%; border-radius: 6px; transition: width 900ms cubic-bezier(.4,0,.2,1); }
    .funnel-cnt { width: 28px; text-align: right; font-size: 13px; font-weight: 700; color: #0f1320; }

    /* ── VENDORS ── */
    .vendor-list { display: flex; flex-direction: column; gap: 13px; }
    .vendor-row { display: flex; align-items: center; gap: 10px; }
    .v-avatar { width: 34px; height: 34px; border-radius: 8px; background: #5C5C99; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 14px; flex-shrink: 0; }
    .v-info { flex: 1; min-width: 0; }
    .v-name { font-size: 13px; font-weight: 600; color: #0f1320; display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .v-bar-track { height: 5px; background: #eef0f4; border-radius: 99px; margin-top: 5px; overflow: hidden; }
    .v-bar-fill { height: 100%; background: linear-gradient(90deg, #6b4df0, #3bbdea); border-radius: 99px; transition: width 900ms; }
    .v-score { font-size: 12px; font-weight: 800; width: 40px; text-align: right; }
    .sc-hi { color: #16a34a; }
    .sc-md { color: #e8912a; }
    .sc-lo { color: #dc2626; }

    /* ── TIME TO FILL ── */
    .ttf-list { display: flex; flex-direction: column; gap: 12px; }
    .ttf-row { display: flex; align-items: center; gap: 10px; }
    .ttf-role { width: 95px; font-size: 12px; color: #4b5262; flex-shrink: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .ttf-track { flex: 1; height: 8px; background: #f6f7fa; border-radius: 99px; position: relative; overflow: visible; }
    .ttf-fill { height: 100%; border-radius: 99px; transition: width 900ms; }
    .ttf-ok { background: #16a34a; }
    .ttf-ov { background: #dc2626; }
    .ttf-marker { position: absolute; top: -3px; width: 2px; height: 14px; background: #343a48; border-radius: 1px; }
    .ttf-days { font-size: 12px; font-weight: 700; width: 32px; text-align: right; color: #0f1320; }
    .ttf-days.ttf-ov { color: #dc2626; }

    /* ── SKILLS ── */
    .skill-list { display: flex; flex-direction: column; gap: 11px; }
    .skill-row { display: flex; align-items: center; gap: 10px; }
    .skill-name { width: 80px; font-size: 12px; color: #4b5262; flex-shrink: 0; }
    .skill-track { flex: 1; height: 8px; background: #f6f7fa; border-radius: 99px; overflow: hidden; }
    .skill-fill { height: 100%; background: linear-gradient(90deg, #5C5C99, #CCCCFF); border-radius: 99px; transition: width 900ms; }
    .skill-cnt { font-size: 12px; font-weight: 700; color: #0f1320; width: 24px; text-align: right; }

    /* ── RECRUITER TABLE ── */
    .table-scroll { overflow-x: auto; }
    .perf-tbl { width: 100%; border-collapse: collapse; font-size: 13px; }
    .perf-tbl th {
      padding: 7px 10px; text-align: left; font-size: 10px; font-weight: 700;
      text-transform: uppercase; letter-spacing: .06em; color: #6e7686;
      border-bottom: 2px solid #e1e4eb; white-space: nowrap;
    }
    .perf-tbl td { padding: 9px 10px; border-bottom: 1px solid #f6f7fa; color: #0f1320; }
    .perf-tbl tbody tr:last-child td { border-bottom: none; }
    .perf-tbl tbody tr:hover td { background: #f6f7fa; }
    .r-cell { display: flex; align-items: center; gap: 8px; }
    .r-av { width: 26px; height: 26px; border-radius: 6px; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 11px; flex-shrink: 0; }
    .grade { display: inline-flex; align-items: center; justify-content: center; width: 24px; height: 24px; border-radius: 6px; font-size: 11px; font-weight: 800; }
    .g-a { background: rgba(22,163,74,.14); color: #16a34a; }
    .g-b { background: rgba(232,145,42,.14); color: #e8912a; }
    .g-c { background: rgba(220,38,38,.14); color: #dc2626; }

    /* ── ACTIVITY ── */
    .activity-feed { display: flex; flex-direction: column; }
    .act-item { display: flex; gap: 10px; align-items: flex-start; padding: 8px 0; border-bottom: 1px solid #f6f7fa; }
    .act-item:last-child { border-bottom: none; }
    .act-dot { width: 8px; height: 8px; border-radius: 50%; background: #cbd0da; flex-shrink: 0; margin-top: 4px; }
    .act-dot.dot-skill { background: #6b4df0; }
    .act-dot.dot-today { background: #16a34a; }
    .act-body { flex: 1; min-width: 0; }
    .act-text { display: block; font-size: 13px; color: #343a48; line-height: 1.4; }
    .act-time { font-size: 11px; color: #9aa2b2; }

    @media (max-width: 1200px) {
      .kpi-row { grid-template-columns: repeat(3, 1fr); }
      .row-2col.wide-left { grid-template-columns: 1fr; }
      .row-3col { grid-template-columns: 1fr 1fr; }
    }
    @media (max-width: 860px) {
      .kpi-row, .row-2col, .row-3col { grid-template-columns: 1fr; }
    }
  `]
})
export class DashboardComponent implements OnInit {
  kpis: any[] = [];
  funnel: any[] = [];
  topVendors: any[] = [];
  enrichedRecruiters: any[] = [];
  activity: any[] = [];
  selectionRate = 0;
  joinedCount = 0;
  totalCandidates = 0;
  openReqs = 0;

  /* SVG chart state */
  readonly svgW = 580;
  readonly svgH = 160;
  submitLine = '';
  submitArea = '';
  joinLine = '';
  joinArea = '';
  submitDots: { x: number; y: number }[] = [];
  joinDots: { x: number; y: number }[] = [];
  yGrids: number[] = [];
  donutDash = '0 327';

  funnelColors = ['#6b4df0', '#a94ee6', '#3bbdea', '#16a34a', '#e8912a'];

  monthlyTrend = [
    { month: 'Nov', submitted: 18, joined: 4 },
    { month: 'Dec', submitted: 22, joined: 6 },
    { month: 'Jan', submitted: 28, joined: 8 },
    { month: 'Feb', submitted: 35, joined: 10 },
    { month: 'Mar', submitted: 30, joined: 9 },
    { month: 'Apr', submitted: 42, joined: 12 },
  ];

  topSkills = [
    { skill: 'React',      count: 24, pct: 80 },
    { skill: '.NET Core',  count: 21, pct: 70 },
    { skill: 'Angular',    count: 18, pct: 60 },
    { skill: 'AWS',        count: 15, pct: 50 },
    { skill: 'PostgreSQL', count: 12, pct: 40 },
    { skill: 'Docker',     count: 9,  pct: 30 },
  ];

  timeToFill = [
    { role: 'Frontend',    days: 18, target: 30 },
    { role: 'Backend',     days: 24, target: 30 },
    { role: 'DevOps',      days: 35, target: 30 },
    { role: 'Data Analyst',days: 12, target: 30 },
    { role: 'QA Engineer', days: 20, target: 30 },
  ];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.buildSvgChart();

    this.http.get<any>(`${environment.apiUrl}/api/dashboard/metrics`).subscribe(metrics => {
      this.selectionRate = metrics.selectionRate || 0;
      this.totalCandidates = metrics.totalCandidates || 0;
      this.openReqs = metrics.totalJobs || 0;

      const circumference = 2 * Math.PI * 52;
      const filled = (this.selectionRate / 100) * circumference;
      this.donutDash = `${filled.toFixed(1)} ${circumference.toFixed(1)}`;

      this.joinedCount = (metrics.hiringFunnel || []).find((f: any) =>
        f.stage?.toLowerCase() === 'joined')?.count || 0;

      this.kpis = [
        { label: 'Total Candidates', value: metrics.totalCandidates,  meta: 'All sources',           change: '+12%', up: true,  color: '#6b4df0', icon: '👥' },
        { label: 'Total CVs',        value: metrics.totalCVs,         meta: `${metrics.interviewedEarlier || 0} interviewed`, change: '+8%', up: true, color: '#3bbdea', icon: '📋' },
        { label: 'Open Reqs',        value: metrics.totalJobs,        meta: 'Active demand',         change: '+2',   up: true,  color: '#e8912a', icon: '📌' },
        { label: 'Active Vendors',   value: metrics.activeVendors,    meta: `${metrics.totalVendors || 0} total`, change: '—', up: true, color: '#16a34a', icon: '🏢' },
        { label: 'Selection Rate',   value: `${metrics.selectionRate || 0}%`, meta: 'Live', change: '-2%', up: false, color: '#dc2626', icon: '🎯' },
      ];

      const maxCount = Math.max(...(metrics.hiringFunnel || [1]).map((f: any) => f.count || 1));
      this.funnel = (metrics.hiringFunnel || []).map((f: any) => ({
        ...f,
        pct: Math.max(8, ((f.count || 0) / maxCount) * 100),
      }));

      this.topVendors = metrics.topVendors || [];

      const skillActivity = (metrics.topSkills || []).map((s: any) => ({
        action: `${s.skill}: ${s.count} CV(s)`, time: 'Top skill'
      }));
      this.activity = [...skillActivity, ...(metrics.recentActivity || [])];
    });

    this.http.get<any[]>(`${environment.apiUrl}/api/recruiters`).subscribe(data => {
      const colors = ['#6b4df0', '#a94ee6', '#3bbdea', '#16a34a', '#e8912a'];
      this.enrichedRecruiters = (data || []).map((r: any, i: number) => ({
        ...r,
        shortlisted: Math.round((r.submissions || 0) * 0.42),
        color: colors[i % colors.length],
        grade: r.selectionRatio >= 40 ? 'A' : r.selectionRatio >= 25 ? 'B' : 'C',
      }));
    });
  }

  buildSvgChart() {
    const W = this.svgW, H = this.svgH, PAD = 18;
    const sub = this.monthlyTrend.map(m => m.submitted);
    const joi = this.monthlyTrend.map(m => m.joined);
    const maxV = Math.max(...sub);
    const n = sub.length;

    const pt = (v: number, i: number) => ({
      x: PAD + (i / (n - 1)) * (W - PAD * 2),
      y: H - PAD - (v / maxV) * (H - PAD * 2),
    });

    const sP = sub.map((v, i) => pt(v, i));
    const jP = joi.map((v, i) => pt(v, i));

    this.submitLine = sP.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
    this.joinLine   = jP.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
    this.submitDots = sP;
    this.joinDots   = jP;

    const areaPath = (pts: { x: number; y: number }[]) =>
      `M ${pts[0].x.toFixed(1)},${pts[0].y.toFixed(1)} ` +
      pts.slice(1).map(p => `L ${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ') +
      ` L ${pts[pts.length - 1].x.toFixed(1)},${H} L ${pts[0].x.toFixed(1)},${H} Z`;

    this.submitArea = areaPath(sP);
    this.joinArea   = areaPath(jP);

    this.yGrids = [H * 0.2, H * 0.5, H * 0.8].map(v => +v.toFixed(1));
  }
}
