import { Component, NgModule, OnInit, Pipe, PipeTransform } from '@angular/core';
import { BrowserModule, DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule, Routes } from '@angular/router';
import { CurrencyPipe, DecimalPipe, DatePipe } from '@angular/common';

import { AppComponent } from './app.component';
import { HttpConfigInterceptor } from './http-config.interceptor';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from './shared.module';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-users-admin',
  template: `
    <section class="grid-page">
      <div class="card form-card">
        <h3>Create User</h3>
        <input class="input" placeholder="Full name" [(ngModel)]="draft.fullName">
        <input class="input" placeholder="Email" [(ngModel)]="draft.email">
        <input class="input" placeholder="Password" [(ngModel)]="draft.password" type="password">
        <select class="select" [(ngModel)]="draft.role">
          <option>TenantAdmin</option>
          <option>TeamLead</option>
          <option>Recruiter</option>
          <option>Viewer</option>
        </select>
        <div class="access-grid">
          <label *ngFor="let key of accessKeys">
            <input type="checkbox" [checked]="draft.access.includes(key)" (change)="toggleAccess(key)">
            {{ key }}
          </label>
        </div>
        <button class="btn btn-primary" (click)="createUser()">Create user</button>
      </div>

      <div class="card table-card">
        <h3>Users & Custom Access</h3>
        <table class="table">
          <thead><tr><th>User</th><th>Role</th><th>Access</th><th>Status</th></tr></thead>
          <tbody>
            <tr *ngFor="let user of users">
              <td><strong>{{ user.fullName }}</strong><br><small>{{ user.email }}</small></td>
              <td>{{ user.role }}</td>
              <td>
                <span class="chip chip-brand" *ngFor="let item of user.access">{{ item }}</span>
              </td>
              <td>{{ user.status }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  `
})
export class UsersAdminComponent implements OnInit {
  users: any[] = [];
  accessKeys = ['dashboard', 'vendors', 'recruiters', 'cvDatabase', 'aiTools', 'users'];
  draft: any = { fullName: '', email: '', password: '', role: 'Recruiter', access: ['dashboard', 'cvDatabase'] };
  private api = `${environment.apiUrl}/api/users`;
  constructor(private http: HttpClient) {}
  ngOnInit() { this.load(); }
  load() { this.http.get<any[]>(this.api).subscribe(users => this.users = users); }
  toggleAccess(key: string) {
    this.draft.access = this.draft.access.includes(key)
      ? this.draft.access.filter((item: string) => item !== key)
      : [...this.draft.access, key];
  }
  createUser() {
    this.http.post<any>(this.api, this.draft).subscribe(user => {
      this.users = [...this.users, user];
      this.draft = { fullName: '', email: '', password: '', role: 'Recruiter', access: ['dashboard', 'cvDatabase'] };
    });
  }
}

@Component({
  selector: 'app-cv-database',
  template: `
    <section class="stack-page">
      <div class="card form-row">
        <input class="input" placeholder="Search by skill, name, role, company..." [(ngModel)]="query" (keyup.enter)="search()">
        <button class="btn btn-primary" (click)="search()">Search CVs</button>
      </div>
      <div class="card form-card">
        <h3>Add CV Profile</h3>
        <div class="form-grid">
          <input class="input" placeholder="Candidate name" [(ngModel)]="draft.name">
          <input class="input" placeholder="Email" [(ngModel)]="draft.email">
          <input class="input" placeholder="Current role" [(ngModel)]="draft.currentRole">
          <input class="input" placeholder="Company" [(ngModel)]="draft.company">
          <input class="input" placeholder="Skills comma separated" [(ngModel)]="draft.skillsText">
          <input class="input" placeholder="Experience years" type="number" [(ngModel)]="draft.experience">
        </div>
        <label class="upload-box">
          <span>{{ draft.fileName || 'Upload CV (.pdf, .docx, .doc, .jpg, .png)' }}</span>
          <input type="file" [accept]="allowedTypes" (change)="onFile($event)">
        </label>
        <label class="check-row">
          <input type="checkbox" [(ngModel)]="draft.interviewedEarlier"> Interviewed earlier
        </label>
        <textarea class="textarea" placeholder="Paste CV text here" [(ngModel)]="draft.cvText"></textarea>
        <button class="btn btn-primary" (click)="addCv()">Add to CV database</button>
      </div>
      <div class="cards-grid">
        <article class="card candidate-card" *ngFor="let cv of cvs">
          <div class="candidate-head">
            <div><h3>{{ cv.name }}</h3><p>{{ cv.currentRole }} at {{ cv.company }}</p></div>
            <strong>{{ cv.experience }} yrs</strong>
          </div>
          <div class="skill-row"><span class="chip" *ngFor="let skill of cv.skills">{{ skill }}</span></div>
          <div class="metric-line"><span>Source file</span><b>{{ cv.fileName || 'Manual entry' }}</b></div>
          <div class="metric-line"><span>Interviewed earlier</span><b>{{ cv.interviewedEarlier ? 'Yes' : 'No' }}</b></div>
          <p>{{ cv.summary }}</p>
        </article>
      </div>
    </section>
  `
})
export class CvDatabaseComponent implements OnInit {
  cvs: any[] = [];
  query = '';
  allowedTypes = '.pdf,.docx,.doc,.jpg,.png';
  draft: any = { name:'', email:'', currentRole:'', company:'', skillsText:'', experience:0, cvText:'', interviewedEarlier:false, fileName:'', fileType:'', fileData:'' };
  private api = `${environment.apiUrl}/api/cv-database`;
  constructor(private http: HttpClient, private route: ActivatedRoute) {}
  ngOnInit() { this.route.queryParams.subscribe(params => { this.query = params['skills'] || ''; this.search(); }); }
  search() { this.http.get<any[]>(`${this.api}?skills=${encodeURIComponent(this.query)}`).subscribe(cvs => this.cvs = cvs); }
  addCv() {
    const payload = { ...this.draft, skills: this.draft.skillsText.split(',').map((s: string) => s.trim()).filter(Boolean) };
    this.http.post<any>(this.api, payload).subscribe(() => {
      this.draft = { name:'', email:'', currentRole:'', company:'', skillsText:'', experience:0, cvText:'', interviewedEarlier:false, fileName:'', fileType:'', fileData:'' };
      this.search();
    });
  }
  onFile(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      this.draft.fileName = file.name;
      this.draft.fileType = file.type || file.name.split('.').pop();
      this.draft.fileData = String(reader.result || '');
      if (!this.draft.name) this.draft.name = file.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ');
    };
    reader.readAsDataURL(file);
  }
}

@Component({
  selector: 'app-recruiters',
  template: `
    <div class="page-container page-enter">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="page-title">Recruiter Performance</h1>
          <p class="text-sm" style="color:var(--text-3)">Leaderboard, placements &amp; pipeline health</p>
        </div>
        <div style="display:flex;gap:8px;">
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="period==='month'"   (click)="setPeriod('month')">Month</button>
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="period==='quarter'" (click)="setPeriod('quarter')">Quarter</button>
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="period==='year'"    (click)="setPeriod('year')">Year</button>
        </div>
      </div>
      <div class="rec-podium" *ngIf="recruiters.length >= 3">
        <div class="rec-podium-item rec-p2">
          <div class="rec-medal">🥈</div>
          <div class="rec-podium-name">{{ recruiters[1]?.name }}</div>
          <div class="rec-podium-stat">{{ recruiters[1]?.joinings ?? recruiters[1]?.placements ?? recruiters[1]?.selections }} placements</div>
          <div class="rec-podium-block" style="height:80px;background:#c0c0c0;opacity:.3;border-radius:6px 6px 0 0;margin-top:8px;"></div>
        </div>
        <div class="rec-podium-item rec-p1">
          <div class="rec-medal">🥇</div>
          <div class="rec-podium-name" style="font-size:16px;">{{ recruiters[0]?.name }}</div>
          <div class="rec-podium-stat">{{ recruiters[0]?.joinings ?? recruiters[0]?.placements ?? recruiters[0]?.selections }} placements</div>
          <div class="rec-podium-block" style="height:110px;background:var(--brand-violet-500);opacity:.2;border-radius:6px 6px 0 0;margin-top:8px;"></div>
        </div>
        <div class="rec-podium-item rec-p3">
          <div class="rec-medal">🥉</div>
          <div class="rec-podium-name">{{ recruiters[2]?.name }}</div>
          <div class="rec-podium-stat">{{ recruiters[2]?.joinings ?? recruiters[2]?.placements ?? recruiters[2]?.selections }} placements</div>
          <div class="rec-podium-block" style="height:55px;background:#cd7f32;opacity:.3;border-radius:6px 6px 0 0;margin-top:8px;"></div>
        </div>
      </div>
      <div class="card mb-6">
        <h3 class="card-title mb-4">Leaderboard</h3>
        <table style="width:100%;border-collapse:collapse;">
          <thead><tr style="border-bottom:2px solid var(--border);">
            <th style="padding:10px;text-align:left;font-size:12px;color:var(--text-3);">Rank</th>
            <th style="padding:10px;text-align:left;font-size:12px;color:var(--text-3);">Recruiter</th>
            <th style="padding:10px;text-align:center;font-size:12px;color:var(--text-3);">Submissions</th>
            <th style="padding:10px;text-align:center;font-size:12px;color:var(--text-3);">Selections</th>
            <th style="padding:10px;text-align:center;font-size:12px;color:var(--text-3);">Joinings</th>
            <th style="padding:10px;text-align:center;font-size:12px;color:var(--text-3);">Hit Rate</th>
          </tr></thead>
          <tbody>
            <tr *ngFor="let r of recruiters; let i = index" style="border-bottom:1px solid var(--border);">
              <td style="padding:12px 10px;">
                <span class="rank-badge-r"
                  [style.background]="i===0?'rgba(251,191,36,.2)':i===1?'rgba(192,192,192,.2)':i===2?'rgba(205,127,50,.2)':'var(--surface-alt)'"
                  [style.color]="i===0?'#b45309':i===1?'#6b7280':i===2?'#92400e':'var(--text-3)'">{{ i + 1 }}</span>
              </td>
              <td style="padding:12px 10px;"><div style="font-weight:600;">{{ r.name }}</div><div style="font-size:12px;color:var(--text-3);">{{ r.role }}</div></td>
              <td style="padding:12px 10px;text-align:center;">{{ r.submissions ?? '—' }}</td>
              <td style="padding:12px 10px;text-align:center;">{{ r.selections ?? r.offers ?? '—' }}</td>
              <td style="padding:12px 10px;text-align:center;font-weight:700;">{{ r.joinings ?? r.placements ?? '—' }}</td>
              <td style="padding:12px 10px;text-align:center;">
                <span style="padding:2px 10px;border-radius:20px;font-size:12px;font-weight:700;"
                  [style.background]="(r.selectionRatio??r.acceptanceRate??0)>=30?'#d1fae5':'#fef3c7'"
                  [style.color]="(r.selectionRatio??r.acceptanceRate??0)>=30?'#065f46':'#92400e'">
                  {{ r.selectionRatio ?? r.acceptanceRate ?? 0 }}%
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="card" *ngIf="attentionItems.length">
        <h3 class="card-title mb-4">Attention Needed</h3>
        <div style="display:flex;flex-direction:column;gap:10px;">
          <div *ngFor="let item of attentionItems" style="display:flex;align-items:center;gap:12px;padding:12px 14px;background:rgba(251,146,60,.05);border-left:3px solid #f97316;border-radius:0 8px 8px 0;">
            <span style="font-size:18px;">⚠️</span>
            <div style="flex:1;"><div style="font-weight:600;font-size:13px;">{{ item.title }}</div><div style="font-size:12px;color:var(--text-3);">{{ item.description }}</div></div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`.rec-podium{display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;margin-bottom:24px;align-items:flex-end}.rec-podium-item{text-align:center;background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px 12px 0}.rec-medal{font-size:36px;margin-bottom:8px}.rec-podium-name{font-weight:700;font-size:14px}.rec-podium-stat{font-size:12px;color:var(--text-3);margin-top:4px}.rank-badge-r{display:inline-block;padding:3px 10px;border-radius:6px;font-weight:700;font-size:13px}`]
})
export class RecruitersPageComponent implements OnInit {
  recruiters: any[] = [];
  period: 'month' | 'quarter' | 'year' = 'month';
  attentionItems: { title: string; description: string }[] = [];
  constructor(private http: HttpClient) {}
  ngOnInit() { this.load(); }
  load() {
    this.http.get<any[]>(`${environment.apiUrl}/api/recruiters`).subscribe(data => {
      this.recruiters = [...data].sort((a, b) => (b.joinings ?? b.placements ?? b.selections ?? 0) - (a.joinings ?? a.placements ?? a.selections ?? 0));
      this.buildAttentionItems();
    });
  }
  setPeriod(p: 'month' | 'quarter' | 'year') { this.period = p; this.load(); }
  buildAttentionItems() {
    const items: { title: string; description: string }[] = [];
    const low = this.recruiters.filter(r => (r.selectionRatio ?? r.acceptanceRate ?? 100) < 20);
    if (low.length) items.push({ title: `${low[0].name} has low hit rate`, description: `${low[0].selectionRatio ?? low[0].acceptanceRate ?? 0}% — investigation recommended` });
    const top = this.recruiters[0];
    if (top) items.push({ title: `${top.name} is leading this ${this.period}`, description: `${top.joinings ?? top.placements ?? top.selections} placements — consider recognition` });
    this.attentionItems = items;
  }
}

@Component({
  selector: 'app-dropout',
  template: `
    <div class="page-container page-enter">
      <div class="flex justify-between items-center mb-6">
        <div><h1 class="page-title">Dropout Predictor</h1><p class="text-sm" style="color:var(--text-3)">AI-powered candidate dropout risk analysis</p></div>
      </div>
      <div class="dp-overview-grid">
        <div class="card dp-donut-card">
          <div style="font-size:13px;font-weight:600;color:var(--text-3);margin-bottom:8px;">At-Risk Candidates</div>
          <svg viewBox="0 0 120 120" width="140" height="140" style="display:block;margin:0 auto;">
            <circle cx="60" cy="60" r="48" fill="none" stroke="#e5e7eb" stroke-width="14"/>
            <circle cx="60" cy="60" r="48" fill="none" stroke="#ef4444" stroke-width="14"
              [attr.stroke-dasharray]="((atRiskCount/(totalCandidates||1))*301.6)+' 301.6'"
              stroke-dashoffset="75.4" transform="rotate(-90 60 60)" stroke-linecap="round"/>
            <text x="60" y="56" text-anchor="middle" font-size="20" font-weight="800" fill="#ef4444">{{ atRiskCount }}</text>
            <text x="60" y="72" text-anchor="middle" font-size="10" fill="#9ca3af">of {{ totalCandidates }}</text>
          </svg>
          <div style="text-align:center;margin-top:8px;font-size:13px;color:var(--text-3);">{{ totalCandidates ? ((atRiskCount/totalCandidates)*100 | number:'1.0-0') : 0 }}% at risk</div>
        </div>
        <div class="card" style="flex:1;min-width:0;">
          <h3 class="card-title mb-4">Risk Distribution</h3>
          <div style="display:flex;flex-direction:column;gap:12px;">
            <div *ngFor="let d of riskDistribution" style="display:grid;grid-template-columns:140px 1fr 40px;gap:10px;align-items:center;">
              <div style="font-size:12px;font-weight:600;" [style.color]="d.color">{{ d.label }}</div>
              <div style="height:20px;background:var(--surface-alt);border-radius:4px;overflow:hidden;"><div [style.width.%]="d.percentage" [style.background]="d.color" style="height:100%;border-radius:4px;transition:width .4s;"></div></div>
              <div style="font-weight:700;text-align:right;" [style.color]="d.color">{{ d.count }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="card">
        <h3 class="card-title mb-4">High-Risk Candidates</h3>
        <div style="display:flex;flex-direction:column;gap:12px;">
          <div *ngFor="let c of atRiskCandidates" class="dp-candidate-card">
            <div class="dp-card-top">
              <div><div style="font-weight:700;font-size:14px;">{{ c.firstName ? c.firstName+' '+c.lastName : c.name }}</div><div style="font-size:12px;color:var(--text-3);">{{ c.stage }} · {{ c.currentCompany || c.currentTitle || '' }}</div></div>
              <span class="dp-risk-pill" [style.background]="getRiskColor(c.dropoutRisk)+'1a'" [style.color]="getRiskColor(c.dropoutRisk)" [style.border-color]="getRiskColor(c.dropoutRisk)">{{ c.dropoutRisk }}% · {{ getRiskLabel(c.dropoutRisk) }}</span>
            </div>
            <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:8px;"><span *ngFor="let f of getRiskFactors(c)" style="font-size:11px;background:var(--surface-alt);padding:2px 8px;border-radius:4px;color:var(--text-3);">{{ f }}</span></div>
            <div style="margin-top:8px;font-size:12px;color:var(--text-3);">{{ c.dropoutRisk >= 70 ? 'Immediate recruiter follow-up recommended.' : 'Monitor closely — risk is elevated.' }}</div>
          </div>
          <div *ngIf="!atRiskCandidates.length" style="text-align:center;padding:40px;color:var(--text-3);">No high-risk candidates found.</div>
        </div>
      </div>
    </div>
  `,
  styles: [`.dp-overview-grid{display:flex;gap:20px;margin-bottom:24px}.dp-donut-card{min-width:180px;text-align:center}.dp-candidate-card{padding:14px 16px;background:var(--surface);border:1px solid var(--border);border-radius:10px}.dp-card-top{display:flex;justify-content:space-between;align-items:flex-start;gap:12px}.dp-risk-pill{padding:4px 12px;border-radius:20px;font-size:12px;font-weight:700;border:1px solid;white-space:nowrap}`]
})
export class DropoutPageComponent implements OnInit {
  allCandidates: any[] = [];
  atRiskCandidates: any[] = [];
  atRiskCount = 0; totalCandidates = 0;
  riskDistribution = [
    { label:'Critical (80%+)', count:0, percentage:0, color:'#ef4444' },
    { label:'High (60–79%)',   count:0, percentage:0, color:'#f97316' },
    { label:'Medium (40–59%)', count:0, percentage:0, color:'#eab308' },
    { label:'Low (<40%)',      count:0, percentage:0, color:'#22c55e' },
  ];
  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.http.get<any[]>(`${environment.apiUrl}/api/candidates`).subscribe(data => {
      this.allCandidates = data; this.totalCandidates = data.length;
      this.atRiskCandidates = data.filter(c => (c.dropoutRisk ?? 0) >= 40).sort((a, b) => b.dropoutRisk - a.dropoutRisk);
      this.atRiskCount = this.atRiskCandidates.length;
      this.updateDistribution();
    });
  }
  updateDistribution() {
    const all = this.allCandidates; const total = all.length || 1;
    this.riskDistribution = [
      { label:'Critical (80%+)', count:all.filter(c => c.dropoutRisk >= 80).length, percentage:0, color:'#ef4444' },
      { label:'High (60–79%)',   count:all.filter(c => c.dropoutRisk >= 60 && c.dropoutRisk < 80).length, percentage:0, color:'#f97316' },
      { label:'Medium (40–59%)', count:all.filter(c => c.dropoutRisk >= 40 && c.dropoutRisk < 60).length, percentage:0, color:'#eab308' },
      { label:'Low (<40%)',      count:all.filter(c => (c.dropoutRisk ?? 0) < 40).length, percentage:0, color:'#22c55e' },
    ];
    this.riskDistribution.forEach(d => d.percentage = Math.round((d.count / total) * 100));
  }
  getRiskColor(risk: number) { return risk >= 80 ? '#ef4444' : risk >= 60 ? '#f97316' : risk >= 40 ? '#eab308' : '#22c55e'; }
  getRiskLabel(risk: number) { return risk >= 80 ? 'Critical' : risk >= 60 ? 'High' : risk >= 40 ? 'Medium' : 'Low'; }
  getRiskFactors(c: any): string[] {
    const f: string[] = [];
    if ((c.dropoutRisk ?? 0) >= 80) f.push('Very high risk');
    if ((c.matchScore ?? 100) < 60) f.push('Poor JD match');
    if (c.stage) f.push(`Stage: ${c.stage}`);
    return f.length ? f : ['Risk score elevated'];
  }
}

@Component({
  selector: 'app-tool',
  template: `
    <section class="stack-page">
      <div class="card form-card">
        <h3>{{ title }}</h3>
        <label class="upload-box" *ngIf="needsJd"><span>{{ jdFile?.fileName || 'Upload JD (.pdf, .docx)' }}</span><input type="file" [accept]="allowedTypes" (change)="onUpload($event, 'jd')"></label>
        <textarea class="textarea" *ngIf="needsJd" [(ngModel)]="jdText" placeholder="Or type / paste JD here"></textarea>
        <label class="upload-box" *ngIf="needsResume"><span>{{ resumeFile?.fileName || 'Upload resume' }}</span><input type="file" [accept]="allowedTypes" (change)="onUpload($event, 'resume')"></label>
        <textarea class="textarea" *ngIf="needsResume" [(ngModel)]="resumeText" placeholder="Or paste resume text here"></textarea>
        <textarea class="textarea" *ngIf="!needsJd && !needsResume" [(ngModel)]="input" [placeholder]="placeholder"></textarea>
        <button class="btn btn-primary" (click)="analyze()">Analyze</button>
      </div>
      <div class="card" *ngIf="result"><h3>Result</h3><pre>{{ result | json }}</pre></div>
    </section>
  `
})
export class GenericToolComponent {
  title = 'AI Assistant'; placeholder = 'Paste CV, JD, or skills here...';
  input = ''; jdText = ''; resumeText = ''; jdFile: any = null; resumeFile: any = null;
  allowedTypes = '.pdf,.docx,.doc,.jpg,.png'; needsJd = false; needsResume = false; result: any;
  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.route.url.subscribe(url => {
      const path = url.map(x => x.path).join('/');
      this.title = path.includes('jd-checker') ? 'JD Checker' : path.includes('competency-ranker') ? 'Competency Ranker' : 'AI Assistant';
      this.needsJd = this.title !== 'AI Assistant'; this.needsResume = false;
    });
  }
  analyze() {
    this.http.post(`${environment.apiUrl}/api/ai/analyze`, { type: this.title, text: this.input, jdText: this.jdText, resumeText: this.resumeText }).subscribe(r => this.result = r);
  }
  onUpload(event: Event, target: 'jd' | 'resume') {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const payload = { fileName: file.name, fileType: file.type, fileData: String(reader.result || '') };
      if (target === 'jd') this.jdFile = payload; else this.resumeFile = payload;
    };
    reader.readAsDataURL(file);
  }
}

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard',          component: DashboardComponent },
  { path: 'recruiters',         component: RecruitersPageComponent },
  { path: 'cv-database',        component: CvDatabaseComponent },
  { path: 'dropout-predictor',  component: DropoutPageComponent },
  { path: 'competency-ranker',  component: GenericToolComponent },
  { path: 'jd-checker',         component: GenericToolComponent },
  { path: 'users',              component: UsersAdminComponent },
  { path: '', loadChildren: () => import('./features.module').then(m => m.FeaturesModule) },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    RecruitersPageComponent,
    CvDatabaseComponent,
    DropoutPageComponent,
    GenericToolComponent,
    UsersAdminComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
    CurrencyPipe, DecimalPipe, DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
