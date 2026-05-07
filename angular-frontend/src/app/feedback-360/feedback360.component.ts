import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-feedback-360',
  template: `
    <div class="page-container page-enter">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="page-title">360° Feedback</h1>
          <p style="color:var(--text-3);font-size:13px;">Multi-Rater · Aggregated Results · Blind Mode</p>
        </div>
        <div style="display:flex;gap:8px;">
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='requests'" (click)="tab='requests'">Requests</button>
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='form'" (click)="tab='form'">Give Feedback</button>
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='results'" (click)="tab='results'">Results</button>
        </div>
      </div>

      <!-- KPIs -->
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:24px;">
        <div class="kpi-card"><div class="kpi-val" style="color:#6b4df0;">{{requests.length}}</div><div class="kpi-lbl">Active Reviews</div></div>
        <div class="kpi-card"><div class="kpi-val" style="color:#10b981;">{{completedResponses}}</div><div class="kpi-lbl">Responses Received</div></div>
        <div class="kpi-card"><div class="kpi-val" style="color:#f59e0b;">{{pendingResponses}}</div><div class="kpi-lbl">Pending Responses</div></div>
        <div class="kpi-card">
          <div style="display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:4px;">
            <span style="font-size:12px;color:var(--text-3);">Blind Mode</span>
            <div class="toggle" [class.on]="blindMode" (click)="blindMode=!blindMode"><div class="toggle-knob"></div></div>
          </div>
          <div class="kpi-lbl">Anonymized</div>
        </div>
      </div>

      <!-- REQUESTS -->
      <div *ngIf="tab==='requests'">
        <!-- Create request -->
        <div class="card" style="max-width:560px;margin-bottom:24px;">
          <h4 style="font-weight:700;margin-bottom:14px;">Create 360 Review Request</h4>
          <div style="display:flex;flex-direction:column;gap:12px;">
            <div>
              <label style="font-size:12px;font-weight:600;color:var(--text-3);">Subject Employee</label>
              <select class="select" [(ngModel)]="newReq.subject" style="margin-top:4px;">
                <option value="">Select</option>
                <option *ngFor="let e of employees">{{e}}</option>
              </select>
            </div>
            <div>
              <label style="font-size:12px;font-weight:600;color:var(--text-3);">Select Reviewers</label>
              <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:6px;">
                <ng-container *ngFor="let e of employees">
                  <label *ngIf="e!==newReq.subject" style="display:flex;align-items:center;gap:4px;font-size:13px;cursor:pointer;">
                    <input type="checkbox" [checked]="newReq.reviewers.includes(e)" (change)="toggleReviewer(e)"> {{e}}
                  </label>
                </ng-container>
              </div>
            </div>
            <div>
              <label style="font-size:12px;font-weight:600;color:var(--text-3);">Due Date</label>
              <input class="input" type="date" [(ngModel)]="newReq.due" style="margin-top:4px;">
            </div>
            <button class="btn btn-primary" (click)="createRequest()">Send 360 Request</button>
          </div>
        </div>

        <!-- Existing Requests -->
        <div style="display:flex;flex-direction:column;gap:16px;">
          <div *ngFor="let r of requests" class="card">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
              <div>
                <div style="font-weight:700;font-size:15px;">360 Review: {{r.subject}}</div>
                <div style="font-size:12px;color:var(--text-3);">Due: {{r.due}}</div>
              </div>
              <div style="text-align:right;">
                <div style="font-weight:700;color:#6b4df0;">{{r.completed}}/{{r.reviewers.length}} completed</div>
                <div style="font-size:12px;color:var(--text-3);">responses</div>
              </div>
            </div>
            <div style="background:var(--border);border-radius:4px;height:6px;margin-bottom:12px;">
              <div style="height:6px;border-radius:4px;background:#6b4df0;" [style.width.%]="(r.completed/r.reviewers.length)*100"></div>
            </div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;">
              <div *ngFor="let rev of r.reviewers" style="display:flex;align-items:center;gap:6px;padding:4px 10px;border-radius:6px;font-size:12px;" [style.background]="rev.done?'#d1fae5':'var(--surface-alt)'" [style.color]="rev.done?'#065f46':'var(--text-3)'">
                <span>{{blindMode?'Anonymous':rev.name}}</span>
                <span>{{rev.done?'✓':'⏳'}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- FEEDBACK FORM -->
      <div *ngIf="tab==='form'" class="card" style="max-width:580px;">
        <h3 style="font-weight:700;margin-bottom:16px;">Give Feedback</h3>
        <div style="display:flex;flex-direction:column;gap:14px;">
          <div>
            <label style="font-size:12px;font-weight:600;color:var(--text-3);">Reviewing</label>
            <select class="select" [(ngModel)]="feedForm.subject" style="margin-top:4px;">
              <option value="">Select employee to review</option>
              <option *ngFor="let r of requests">{{r.subject}}</option>
            </select>
          </div>
          <div *ngFor="let cat of feedCategories" style="padding:12px;background:var(--surface-alt);border-radius:10px;">
            <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
              <label style="font-weight:600;font-size:13px;">{{cat}}</label>
              <span style="font-weight:700;color:#6b4df0;">{{feedForm.ratings[cat] || 0}} / 5</span>
            </div>
            <div style="display:flex;gap:6px;">
              <button *ngFor="let s of [1,2,3,4,5]" class="star-btn" [class.active]="feedForm.ratings[cat]>=s" (click)="feedForm.ratings[cat]=s">⭐</button>
            </div>
          </div>
          <div>
            <label style="font-size:12px;font-weight:600;color:var(--text-3);">Strengths</label>
            <textarea class="textarea" [(ngModel)]="feedForm.strengths" rows="3" placeholder="What does this person do well?" style="margin-top:4px;width:100%;"></textarea>
          </div>
          <div>
            <label style="font-size:12px;font-weight:600;color:var(--text-3);">Areas for Improvement</label>
            <textarea class="textarea" [(ngModel)]="feedForm.improvements" rows="3" placeholder="What could they improve?" style="margin-top:4px;width:100%;"></textarea>
          </div>
          <button class="btn btn-primary" (click)="submitFeedback()">Submit Feedback</button>
          <div *ngIf="feedMsg" style="padding:10px;background:#d1fae5;border-radius:8px;color:#065f46;font-size:13px;font-weight:600;">{{feedMsg}}</div>
        </div>
      </div>

      <!-- RESULTS -->
      <div *ngIf="tab==='results'">
        <div style="display:flex;gap:12px;margin-bottom:16px;">
          <select class="select" style="max-width:220px;" [(ngModel)]="selectedSubject">
            <option *ngFor="let r of requests">{{r.subject}}</option>
          </select>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;">
          <!-- Radar Chart SVG -->
          <div class="card">
            <h4 style="font-weight:700;margin-bottom:16px;">Aggregated Scores — {{selectedSubject}}</h4>
            <svg width="100%" viewBox="-120 -120 240 240">
              <g *ngFor="let cat of feedCategories; let i=index">
                <line x1="0" y1="0" [attr.x2]="90*Math.cos(i*72*Math.PI/180-Math.PI/2)" [attr.y2]="90*Math.sin(i*72*Math.PI/180-Math.PI/2)" stroke="var(--border)" stroke-width="1"></line>
                <text [attr.x]="105*Math.cos(i*72*Math.PI/180-Math.PI/2)" [attr.y]="105*Math.sin(i*72*Math.PI/180-Math.PI/2)" text-anchor="middle" font-size="9" fill="var(--text-3)" dominant-baseline="middle">{{cat.split(' ')[0]}}</text>
              </g>
              <circle cx="0" cy="0" r="18" fill="none" stroke="var(--border)" stroke-width="0.5"></circle>
              <circle cx="0" cy="0" r="36" fill="none" stroke="var(--border)" stroke-width="0.5"></circle>
              <circle cx="0" cy="0" r="54" fill="none" stroke="var(--border)" stroke-width="0.5"></circle>
              <circle cx="0" cy="0" r="72" fill="none" stroke="var(--border)" stroke-width="0.5"></circle>
              <circle cx="0" cy="0" r="90" fill="none" stroke="var(--border)" stroke-width="1"></circle>
              <polygon [attr.points]="radarPoints" fill="rgba(107,77,240,0.2)" stroke="#6b4df0" stroke-width="2"></polygon>
            </svg>
          </div>
          <!-- Score table -->
          <div class="card">
            <h4 style="font-weight:700;margin-bottom:16px;">Score Breakdown</h4>
            <div *ngFor="let cat of feedCategories" style="padding:10px 0;border-bottom:1px solid var(--border);">
              <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
                <span style="font-size:13px;">{{cat}}</span>
                <span style="font-weight:700;color:#6b4df0;">{{resultScores[cat] | number:'1.1-1'}} / 5</span>
              </div>
              <div style="background:var(--border);border-radius:3px;height:5px;">
                <div [style.width.%]="(resultScores[cat]/5)*100" style="height:5px;border-radius:3px;background:#6b4df0;transition:width .4s;"></div>
              </div>
            </div>
            <div style="margin-top:16px;padding:12px;background:rgba(107,77,240,.06);border-radius:8px;">
              <div style="font-weight:700;color:#6b4df0;font-size:16px;">Overall: {{avgResultScore | number:'1.2-2'}} / 5</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .kpi-card { background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px;text-align:center; }
    .kpi-val { font-size:28px;font-weight:800; }
    .kpi-lbl { font-size:12px;color:var(--text-3);margin-top:4px; }
    .toggle { width:44px;height:24px;border-radius:12px;background:var(--border);cursor:pointer;position:relative;transition:background .2s; }
    .toggle.on { background:#6b4df0; }
    .toggle-knob { width:20px;height:20px;border-radius:50%;background:#fff;position:absolute;top:2px;left:2px;transition:left .2s;box-shadow:0 1px 3px rgba(0,0,0,.2); }
    .toggle.on .toggle-knob { left:22px; }
    .star-btn { background:none;border:none;cursor:pointer;font-size:20px;opacity:0.3;transition:opacity .15s;padding:0; }
    .star-btn.active { opacity:1; }
    .card { background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px;margin-bottom:16px; }
    .textarea { padding:8px 12px;border:1px solid var(--border);border-radius:8px;background:var(--surface);color:var(--text);resize:vertical;font-family:inherit;font-size:14px; }
  `]
})
export class Feedback360Component implements OnInit {
  private api = `${environment.apiUrl}/api/performance`;
  constructor(private http: HttpClient) {}
  tab = 'requests';
  blindMode = true;
  feedMsg = '';
  selectedSubject = 'Arjun Mehta';
  Math = Math;

  employees = ['Arjun Mehta', 'Priya Sharma', 'Rahul Gupta', 'Sneha Patel', 'Vikram Singh', 'Ananya Iyer'];
  feedCategories = ['Communication', 'Collaboration', 'Technical Skills', 'Leadership', 'Problem Solving'];

  requests: any[] = [];

  newReq = { subject: '', reviewers: [] as string[], due: '' };

  feedForm: any = { subject: '', ratings: {}, strengths: '', improvements: '' };

  resultScores: { [k: string]: number } = { Communication: 4.2, Collaboration: 4.5, 'Technical Skills': 4.8, Leadership: 3.9, 'Problem Solving': 4.4 };

  get completedResponses() { return this.requests.reduce((s, r) => s + r.completed, 0); }
  get pendingResponses() { return this.requests.reduce((s, r) => s + (r.reviewers.length - r.completed), 0); }
  get avgResultScore() { const vals = Object.values(this.resultScores); return vals.reduce((a, b) => a + b, 0) / vals.length; }

  get radarPoints(): string {
    return this.feedCategories.map((cat, i) => {
      const score = this.resultScores[cat] || 0;
      const angle = i * 72 * Math.PI / 180 - Math.PI / 2;
      const r = (score / 5) * 90;
      return `${r * Math.cos(angle)},${r * Math.sin(angle)}`;
    }).join(' ');
  }

  ngOnInit() { this.loadRequests(); this.loadEmployees(); }

  loadRequests() {
    this.http.get<any[]>(`${this.api}/feedback/requests`).subscribe(data => {
      this.requests = (data || []).map(r => ({
        id: r.id, subject: r.requesteeName || r.subject,
        due: r.dueDate?.slice(0,10) || '',
        completed: r.responses?.length || 0,
        reviewers: [{ name: r.reviewerName || '', done: r.status === 'Completed' }]
      }));
    });
  }

  loadEmployees() {
    this.http.get<any[]>(`${environment.apiUrl}/api/employees`).subscribe(data => {
      this.employees = (data || []).map(e => `${e.firstName} ${e.lastName}`.trim());
    });
  }

  toggleReviewer(e: string) {
    const idx = this.newReq.reviewers.indexOf(e);
    if (idx > -1) this.newReq.reviewers.splice(idx, 1);
    else this.newReq.reviewers.push(e);
  }

  createRequest() {
    if (!this.newReq.subject || this.newReq.reviewers.length === 0) { alert('Select subject and reviewers'); return; }
    this.requests.push({ subject: this.newReq.subject, due: this.newReq.due, completed: 0, reviewers: this.newReq.reviewers.map(n => ({ name: n, done: false })) });
    alert('360 review request sent');
    this.newReq = { subject: '', reviewers: [], due: '' };
  }

  submitFeedback() {
    if (!this.feedForm.subject) { alert('Select employee to review'); return; }
    this.feedMsg = 'Feedback submitted successfully';
    this.feedForm = { subject: '', ratings: {}, strengths: '', improvements: '' };
    setTimeout(() => this.feedMsg = '', 3000);
  }
}
