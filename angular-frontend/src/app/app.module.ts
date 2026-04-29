import { Component, NgModule, OnInit, Pipe, PipeTransform } from '@angular/core';
import { BrowserModule, DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule, Routes } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CurrencyPipe, DecimalPipe, DatePipe } from '@angular/common';
import { BudgetComponent } from './budget/budget.component';
import { ImportCenterComponent } from './import-center/import-center.component';
import { InternalJobPostingsComponent } from './internal-job-postings/internal-job-postings.component';
import { ReportsComponent } from './reports/reports.component';

import { AppComponent } from './app.component';
import { HttpConfigInterceptor } from './http-config.interceptor';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VendorsComponent } from './vendors/vendors.component';
import { AIScorecardComponent } from './ai-scorecard/ai-scorecard.component';
import { SlaDashboardComponent } from './sla-dashboard/sla-dashboard.component';
import { JdGeneratorComponent } from './jd-generator/jd-generator.component';
import { ResumeParserComponent } from './resume-parser/resume-parser.component';
import { PipelineBoardComponent } from './pipeline-board/pipeline-board.component';
import { CandidatePortalComponent } from './candidate-portal/candidate-portal.component';
import { InterviewSchedulerComponent } from './interview-scheduler/interview-scheduler.component';
import { OfferManagementComponent } from './offer-management/offer-management.component';
import { TalentPoolComponent } from './talent-pool/talent-pool.component';
import { RequisitionsComponent } from './requisitions/requisitions.component';
import { SourceTrackingComponent } from './source-tracking/source-tracking.component';
import { ComplianceComponent } from './compliance/compliance.component';
import { environment } from '../environments/environment';

@Pipe({ name: 'safeHtml' })
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(value: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}

@Pipe({ name: 'timeAgo' })
export class TimeAgoPipe implements PipeTransform {
  transform(value: Date | string): string {
    const date = new Date(value);
    const seconds = Math.max(0, Math.floor((Date.now() - date.getTime()) / 1000));
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  }
}

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

  load() {
    this.http.get<any[]>(this.api).subscribe(users => this.users = users);
  }

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
          <input type="checkbox" [(ngModel)]="draft.interviewedEarlier">
          Interviewed earlier
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
  draft: any = { name: '', email: '', currentRole: '', company: '', skillsText: '', experience: 0, cvText: '', interviewedEarlier: false, fileName: '', fileType: '', fileData: '' };
  private api = `${environment.apiUrl}/api/cv-database`;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.query = params['skills'] || '';
      this.search();
    });
  }

  search() {
    this.http.get<any[]>(`${this.api}?skills=${encodeURIComponent(this.query)}`).subscribe(cvs => this.cvs = cvs);
  }

  addCv() {
    const payload = {
      ...this.draft,
      skills: this.draft.skillsText.split(',').map((skill: string) => skill.trim()).filter(Boolean)
    };
    this.http.post<any>(this.api, payload).subscribe(() => {
      this.draft = { name: '', email: '', currentRole: '', company: '', skillsText: '', experience: 0, cvText: '', interviewedEarlier: false, fileName: '', fileType: '', fileData: '' };
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
      if (!this.draft.name) {
        this.draft.name = file.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ');
      }
    };
    reader.readAsDataURL(file);
  }
}

@Component({
  selector: 'app-recruiters',
  template: `
    <section class="cards-grid">
      <article class="card candidate-card" *ngFor="let recruiter of recruiters">
        <div class="candidate-head">
          <div><h3>{{ recruiter.name }}</h3><p>{{ recruiter.role }}</p></div>
          <strong>{{ recruiter.joinings }} joins</strong>
        </div>
        <div class="metric-line"><span>Submissions</span><b>{{ recruiter.submissions }}</b></div>
        <div class="metric-line"><span>Selections</span><b>{{ recruiter.selections }}</b></div>
        <div class="metric-line"><span>Selection Ratio</span><b>{{ recruiter.selectionRatio }}%</b></div>
      </article>
    </section>
  `
})
export class RecruitersPageComponent implements OnInit {
  recruiters: any[] = [];
  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.http.get<any[]>(`${environment.apiUrl}/api/recruiters`).subscribe(data => this.recruiters = data);
  }
}

@Component({
  selector: 'app-dropout',
  template: `
    <section class="stack-page">
      <div class="cards-grid">
        <article class="card candidate-card" *ngFor="let item of candidates">
          <div class="candidate-head">
            <div><h3>{{ item.firstName }} {{ item.lastName }}</h3><p>{{ item.stage }} - {{ item.currentCompany }}</p></div>
            <strong [class.risk-high]="item.dropoutRisk >= 70">{{ item.dropoutRisk }}%</strong>
          </div>
          <p>{{ item.dropoutRisk >= 70 ? 'Immediate recruiter follow-up recommended.' : 'Risk level is currently manageable.' }}</p>
        </article>
      </div>
    </section>
  `
})
export class DropoutPageComponent implements OnInit {
  candidates: any[] = [];
  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.http.get<any[]>(`${environment.apiUrl}/api/candidates`).subscribe(data => this.candidates = data);
  }
}

@Component({
  selector: 'app-tool',
  template: `
    <section class="stack-page">
      <div class="card form-card">
        <h3>{{ title }}</h3>
        <label class="upload-box" *ngIf="needsJd">
          <span>{{ jdFile?.fileName || 'Upload JD (.pdf, .docx, .doc, .jpg, .png)' }}</span>
          <input type="file" [accept]="allowedTypes" (change)="onUpload($event, 'jd')">
        </label>
        <textarea class="textarea" *ngIf="needsJd" [(ngModel)]="jdText" placeholder="Or type / paste JD here"></textarea>

        <label class="upload-box" *ngIf="needsResume">
          <span>{{ resumeFile?.fileName || 'Upload resume (.pdf, .docx, .doc, .jpg, .png)' }}</span>
          <input type="file" [accept]="allowedTypes" (change)="onUpload($event, 'resume')">
        </label>
        <textarea class="textarea" *ngIf="needsResume" [(ngModel)]="resumeText" placeholder="Or paste resume text here"></textarea>

        <textarea class="textarea" *ngIf="!needsJd && !needsResume" [(ngModel)]="input" [placeholder]="placeholder"></textarea>
        <button class="btn btn-primary" (click)="analyze()">Analyze</button>
      </div>
      <div class="card" *ngIf="result">
        <h3>Result</h3>
        <pre>{{ result | json }}</pre>
      </div>
    </section>
  `
})
export class GenericToolComponent {
  title = 'AI Assistant';
  placeholder = 'Paste CV, JD, or skills here...';
  input = '';
  jdText = '';
  resumeText = '';
  jdFile: any = null;
  resumeFile: any = null;
  allowedTypes = '.pdf,.docx,.doc,.jpg,.png';
  needsJd = false;
  needsResume = false;
  result: any;
  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.route.url.subscribe(url => {
      const path = url.map(x => x.path).join('/');
      this.title = path.includes('jd-checker') ? 'JD Checker'
        : path.includes('cv-jd-matcher') ? 'CV-JD Matcher'
        : path.includes('competency-ranker') ? 'Competency Ranker'
        : 'AI Assistant';
      this.needsJd = this.title === 'JD Checker' || this.title === 'CV-JD Matcher' || this.title === 'Competency Ranker';
      this.needsResume = this.title === 'CV-JD Matcher';
    });
  }
  analyze() {
    this.http.post(`${environment.apiUrl}/api/ai/analyze`, {
      type: this.title,
      text: this.input,
      jdText: this.jdText,
      resumeText: this.resumeText,
      jdFile: this.jdFile,
      resumeFile: this.resumeFile
    })
      .subscribe(result => this.result = result);
  }

  onUpload(event: Event, target: 'jd' | 'resume') {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const payload = { fileName: file.name, fileType: file.type || file.name.split('.').pop(), fileData: String(reader.result || '') };
      if (target === 'jd') this.jdFile = payload;
      if (target === 'resume') this.resumeFile = payload;
    };
    reader.readAsDataURL(file);
  }
}

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  // Core
  { path: 'dashboard',            component: DashboardComponent },
  { path: 'vendors',              component: VendorsComponent },
  { path: 'recruiters',           component: RecruitersPageComponent },
  { path: 'cv-database',          component: CvDatabaseComponent },
  { path: 'pipeline-board',       component: PipelineBoardComponent },
  { path: 'requisitions',         component: RequisitionsComponent },
  { path: 'candidate-portal',     component: CandidatePortalComponent },
  { path: 'interview-scheduler',  component: InterviewSchedulerComponent },
  { path: 'offer-management',     component: OfferManagementComponent },
  { path: 'talent-pool',          component: TalentPoolComponent },
  { path: 'source-tracking',      component: SourceTrackingComponent },
  { path: 'sla-dashboard',        component: SlaDashboardComponent },
  // AI Tools
  { path: 'resume-parser',        component: ResumeParserComponent },
  { path: 'ai-scorecard',         component: AIScorecardComponent },
  { path: 'dropout-predictor',    component: DropoutPageComponent },
  { path: 'competency-ranker',    component: GenericToolComponent },
  { path: 'jd-checker',           component: GenericToolComponent },
  { path: 'jd-generator',         component: JdGeneratorComponent },
  // Budget Module
  { path: 'budget',               component: BudgetComponent },
  // Import Center
  { path: 'import-center',        component: ImportCenterComponent },
  // Internal Job Postings
  { path: 'internal-job-postings', component: InternalJobPostingsComponent },
  // Reports
  { path: 'reports',              component: ReportsComponent },
  // Admin
  { path: 'users',                component: UsersAdminComponent },
  { path: 'compliance',           component: ComplianceComponent },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    VendorsComponent,
    RecruitersPageComponent,
    CvDatabaseComponent,
    DropoutPageComponent,
    GenericToolComponent,
    UsersAdminComponent,
    SafeHtmlPipe,
    TimeAgoPipe,
    AIScorecardComponent,
    SlaDashboardComponent,
    JdGeneratorComponent,
    // New ATS modules
    ResumeParserComponent,
    PipelineBoardComponent,
    CandidatePortalComponent,
    InterviewSchedulerComponent,
    OfferManagementComponent,
    TalentPoolComponent,
    RequisitionsComponent,
    SourceTrackingComponent,
    ComplianceComponent,
    BudgetComponent,
    ImportCenterComponent,
    InternalJobPostingsComponent,
    ReportsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatMenuModule,
    MatDividerModule,
    MatTabsModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatDialogModule,
    MatSidenavModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
    CurrencyPipe, DecimalPipe, DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
