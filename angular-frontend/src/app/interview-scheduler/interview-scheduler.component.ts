import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-interview-scheduler',
  template: `
    <section class="stack-page">
      <div class="grid grid-cols-2 gap-6">
        <!-- Schedule Form -->
        <div class="card form-card">
          <h3>Schedule Interview</h3>
          <input class="input" placeholder="Candidate ID" [(ngModel)]="form.candidateId">
          <input class="input" placeholder="Job ID" [(ngModel)]="form.jobId">
          <select class="select" [(ngModel)]="form.type">
            <option>Phone</option><option>Video</option><option>Onsite</option>
          </select>
          <input class="input" type="datetime-local" [(ngModel)]="form.scheduledAt">
          <input class="input" placeholder="Meeting link (Zoom / Teams)" [(ngModel)]="form.meetingLink">
          <textarea class="textarea" placeholder="Notes" [(ngModel)]="form.notes" rows="3"></textarea>
          <button class="btn btn-primary" (click)="schedule()" [disabled]="saving">
            {{ saving ? 'Scheduling…' : 'Schedule Interview' }}
          </button>
          <div *ngIf="saveOk" style="color:#10b981;margin-top:8px;">Interview scheduled!</div>
          <div *ngIf="saveErr" style="color:#ef4444;margin-top:8px;">{{ saveErr }}</div>
        </div>

        <!-- Interview List -->
        <div class="card">
          <h3>Upcoming Interviews</h3>
          <div *ngFor="let i of interviews" class="interview-item">
            <div class="interview-type-badge">{{ i.type }}</div>
            <div class="interview-detail">
              <b>{{ i.scheduledAt | date:'d MMM y, HH:mm' }}</b>
              <span style="color:var(--text-3);font-size:12px;">Candidate: {{ i.candidateId | slice:0:8 }}…</span>
            </div>
            <span class="chip" [class.chip-brand]="i.status==='Scheduled'">{{ i.status }}</span>
          </div>
          <div *ngIf="!interviews.length" style="color:var(--text-3);text-align:center;padding:20px;">
            No upcoming interviews.
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .interview-item { display:flex; align-items:center; gap:12px; padding:10px 0; border-bottom:1px solid var(--border); }
    .interview-type-badge { background:var(--brand-bg); color:var(--brand); border-radius:6px; padding:4px 8px; font-size:11px; font-weight:700; }
    .interview-detail { flex:1; display:flex; flex-direction:column; gap:2px; }
  `]
})
export class InterviewSchedulerComponent implements OnInit {
  interviews: any[] = [];
  saving = false;
  saveOk = false;
  saveErr = '';
  form = { candidateId: '', jobId: '', type: 'Video', scheduledAt: '', meetingLink: '', notes: '', recruiterIds: [] };

  constructor(private http: HttpClient) {}

  ngOnInit() { this.loadInterviews(); }

  loadInterviews() {
    // Load recent interviews via the upcoming board
  }

  schedule() {
    this.saving = true; this.saveOk = false; this.saveErr = '';
    this.http.post<any>(`${environment.apiUrl}/api/interviews`, this.form)
      .subscribe({
        next: r => { this.interviews = [r, ...this.interviews]; this.saving = false; this.saveOk = true; },
        error: err => { this.saveErr = err?.error?.error ?? 'Failed to schedule'; this.saving = false; }
      });
  }
}
