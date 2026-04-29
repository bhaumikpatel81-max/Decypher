import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-candidate-portal',
  template: `
    <section class="stack-page">
      <!-- Tabs -->
      <div class="card" style="display:flex;gap:0;padding:0;margin-bottom:0;overflow:hidden;border-radius:10px 10px 0 0;">
        <button class="tab-btn" [class.active]="tab==='jobs'" (click)="tab='jobs'">Public Job Listings</button>
        <button class="tab-btn" [class.active]="tab==='apply'" (click)="tab='apply'">Apply</button>
        <button class="tab-btn" [class.active]="tab==='incoming'" (click)="tab='incoming';loadIncoming()">Incoming Applications</button>
      </div>

      <!-- Job Listings -->
      <div *ngIf="tab==='jobs'" class="cards-grid" style="margin-top:16px;">
        <article class="card candidate-card" *ngFor="let job of jobs">
          <h3>{{ job.title }}</h3>
          <p>{{ job.department }} · {{ job.location }}</p>
          <div class="metric-line">
            <span>Posted</span><b>{{ job.createdAt | date:'d MMM y' }}</b>
          </div>
          <button class="btn btn-primary btn-sm" style="margin-top:8px;" (click)="applyTo(job)">Apply</button>
        </article>
        <div *ngIf="!jobs.length" style="grid-column:1/-1;text-align:center;color:var(--text-3);padding:40px;">
          No open positions at this time.
        </div>
      </div>

      <!-- Apply Form -->
      <div *ngIf="tab==='apply'" class="card" style="margin-top:16px;">
        <h3>Apply for a Position</h3>
        <input class="input" placeholder="Your name" [(ngModel)]="form.applicantName">
        <input class="input" placeholder="Your email" [(ngModel)]="form.applicantEmail" type="email">
        <input class="input" placeholder="Job ID" [(ngModel)]="form.jobId">
        <textarea class="textarea" placeholder="Cover letter…" [(ngModel)]="form.coverLetter" rows="6"></textarea>
        <button class="btn btn-primary" (click)="submit()" [disabled]="submitting">
          {{ submitting ? 'Submitting…' : 'Submit Application' }}
        </button>
        <div *ngIf="submitted" style="color:#10b981;margin-top:8px;">
          Application received! Reference: <strong>{{ submittedRef }}</strong>
        </div>
        <div *ngIf="submitError" style="color:#ef4444;margin-top:8px;">{{ submitError }}</div>
      </div>

      <!-- Incoming Applications (recruiter view) -->
      <div *ngIf="tab==='incoming'" class="card" style="margin-top:16px;">
        <h3>Incoming Portal Applications</h3>
        <table class="table">
          <thead><tr><th>Name</th><th>Email</th><th>Job ID</th><th>Status</th><th>Applied</th></tr></thead>
          <tbody>
            <tr *ngFor="let a of incoming">
              <td>{{ a.applicantName }}</td>
              <td>{{ a.applicantEmail }}</td>
              <td style="font-size:11px;">{{ a.jobId | slice:0:8 }}…</td>
              <td><span class="chip chip-brand">{{ a.status }}</span></td>
              <td>{{ a.appliedAt | date:'d MMM y' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  `,
  styles: [`
    .tab-btn { flex:1; padding:12px 16px; border:none; background:#f8fafc; cursor:pointer; font-weight:600; font-size:13px; color:var(--text-3); }
    .tab-btn.active { background:var(--brand); color:#fff; }
  `]
})
export class CandidatePortalComponent implements OnInit {
  tab = 'jobs';
  jobs: any[] = [];
  incoming: any[] = [];
  submitting = false;
  submitted = false;
  submittedRef = '';
  submitError = '';
  form = { applicantName: '', applicantEmail: '', jobId: '', coverLetter: '' };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>(`${environment.apiUrl}/api/candidate-portal/jobs`)
      .subscribe({ next: d => this.jobs = d, error: () => {} });
  }

  applyTo(job: any) {
    this.form.jobId = job.id;
    this.tab = 'apply';
  }

  submit() {
    this.submitting = true;
    this.submitError = '';
    this.http.post<any>(`${environment.apiUrl}/api/candidate-portal/apply`, this.form)
      .subscribe({
        next: r => { this.submitted = true; this.submittedRef = r.id; this.submitting = false; },
        error: err => { this.submitError = err?.error?.error ?? 'Submission failed'; this.submitting = false; }
      });
  }

  loadIncoming() {
    this.http.get<any[]>(`${environment.apiUrl}/api/candidate-portal/incoming`)
      .subscribe({ next: d => this.incoming = d, error: () => {} });
  }
}
