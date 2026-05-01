import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-video-interviews',
  template: `
    <section class="stack-page">
      <div class="grid grid-cols-2 gap-6">

        <!-- LEFT: Create / Manage -->
        <div style="display:flex;flex-direction:column;gap:16px;">

          <!-- Question Builder -->
          <div class="card" style="padding:24px;">
            <h3 style="margin:0 0 16px;">Create Video Interview</h3>

            <div style="margin-bottom:12px;">
              <label style="font-size:12px;font-weight:600;color:var(--text-3);display:block;margin-bottom:4px;">Candidate</label>
              <select class="select" [(ngModel)]="form.candidateId" (ngModelChange)="onCandidateChange()">
                <option value="">— Select candidate —</option>
                <option *ngFor="let c of candidates" [value]="c.id">
                  {{ c.firstName }} {{ c.lastName }} · {{ c.email }}
                </option>
              </select>
            </div>

            <div style="margin-bottom:12px;">
              <label style="font-size:12px;font-weight:600;color:var(--text-3);display:block;margin-bottom:4px;">Job Title</label>
              <input class="input" placeholder="e.g. Senior Frontend Engineer" [(ngModel)]="form.jobTitle">
            </div>

            <div style="margin-bottom:12px;">
              <label style="font-size:12px;font-weight:600;color:var(--text-3);display:block;margin-bottom:4px;">Response Deadline</label>
              <input class="input" type="date" [(ngModel)]="form.deadline">
            </div>

            <div style="margin-bottom:16px;">
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
                <label style="font-size:12px;font-weight:600;color:var(--text-3);">
                  Interview Questions <span style="font-weight:400;">({{ form.questions.length }}/5)</span>
                </label>
                <button class="btn btn-ghost btn-sm"
                        *ngIf="form.questions.length < 5"
                        (click)="addQuestion()"
                        style="font-size:12px;">+ Add</button>
              </div>
              <div *ngFor="let q of form.questions; let qi = index" class="question-row">
                <span class="q-num">Q{{ qi + 1 }}</span>
                <input class="input" style="flex:1;"
                       [placeholder]="'e.g. ' + questionHints[qi]"
                       [(ngModel)]="form.questions[qi]">
                <button class="btn btn-ghost btn-sm" (click)="removeQuestion(qi)"
                        style="color:#ef4444;border-color:#ef4444;padding:4px 8px;">✕</button>
              </div>
              <div *ngIf="!form.questions.length"
                   style="font-size:13px;color:var(--text-3);text-align:center;padding:16px;
                          border:2px dashed var(--border);border-radius:8px;">
                Click "+ Add" to add interview questions (max 5)
              </div>
            </div>

            <button class="btn btn-primary" style="width:100%;"
                    (click)="generateLink()"
                    [disabled]="generating || !form.candidateId || !form.questions.length">
              {{ generating ? 'Generating…' : '🔗 Generate Interview Link' }}
            </button>

            <!-- Generated link -->
            <div *ngIf="generatedLink" class="link-box">
              <div style="font-size:11px;font-weight:700;color:var(--text-3);margin-bottom:6px;">INTERVIEW LINK GENERATED</div>
              <div style="font-family:monospace;font-size:12px;word-break:break-all;color:#7c3aed;margin-bottom:8px;">
                {{ generatedLink }}
              </div>
              <button class="btn btn-ghost btn-sm" (click)="copyLink()" style="font-size:12px;">
                {{ copied ? '✓ Copied' : '📋 Copy Link' }}
              </button>
            </div>
          </div>

          <!-- Interview List -->
          <div class="card" style="padding:24px;">
            <h3 style="margin:0 0 16px;">Active Interviews</h3>
            <div *ngFor="let inv of interviews" class="inv-row" (click)="selectInterview(inv)">
              <div style="flex:1;min-width:0;">
                <div style="font-weight:600;font-size:13px;">{{ inv.candidateName }}</div>
                <div style="font-size:11px;color:var(--text-3);">{{ inv.jobTitle }}</div>
              </div>
              <div style="text-align:right;">
                <span class="status-chip"
                      [style.background]="statusBg(inv.status)"
                      [style.color]="statusFg(inv.status)">
                  {{ inv.status }}
                </span>
                <div style="font-size:11px;color:var(--text-3);margin-top:3px;">
                  {{ inv.responses?.length || 0 }}/{{ inv.questionCount }} responses
                </div>
              </div>
            </div>
            <div *ngIf="!interviews.length"
                 style="text-align:center;padding:30px;color:var(--text-3);">
              No video interviews yet.
            </div>
          </div>
        </div>

        <!-- RIGHT: Response Viewer -->
        <div class="card" style="padding:24px;" *ngIf="selected; else noSelection">
          <div style="margin-bottom:20px;">
            <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;">
              <div>
                <h3 style="margin:0 0 4px;">{{ selected.candidateName }}</h3>
                <div style="font-size:13px;color:var(--text-3);">{{ selected.jobTitle }}</div>
              </div>
              <span class="status-chip"
                    [style.background]="statusBg(selected.status)"
                    [style.color]="statusFg(selected.status)">
                {{ selected.status }}
              </span>
            </div>

            <!-- Progress bar -->
            <div style="margin-top:16px;">
              <div style="display:flex;justify-content:space-between;font-size:12px;color:var(--text-3);margin-bottom:6px;">
                <span>Responses received</span>
                <span>{{ selected.responses?.length || 0 }} / {{ selected.questions?.length || 0 }}</span>
              </div>
              <div style="height:6px;background:#f1f5f9;border-radius:4px;overflow:hidden;">
                <div style="height:100%;background:#db2777;border-radius:4px;transition:width .3s;"
                     [style.width]="responsePct() + '%'"></div>
              </div>
            </div>
          </div>

          <!-- Questions & Responses -->
          <div *ngFor="let q of selected.questions; let qi = index" class="q-response-card">
            <div class="q-label">Q{{ qi + 1 }} · {{ q }}</div>

            <div *ngIf="getResponse(qi) as resp; else noResp">
              <!-- Mock video player -->
              <div class="mock-video">
                <div class="play-btn">▶</div>
                <div style="font-size:12px;color:#fff;margin-top:8px;">
                  {{ resp.duration || '0:32' }} · Recorded {{ resp.recordedAt | date:'d MMM, h:mm a' }}
                </div>
              </div>
              <!-- Transcript -->
              <div *ngIf="resp.transcript" style="margin-top:10px;padding:10px 12px;background:#f8f7ff;border-radius:6px;">
                <div style="font-size:11px;font-weight:700;color:var(--text-3);margin-bottom:4px;">AI TRANSCRIPT</div>
                <div style="font-size:12px;color:var(--text-2);line-height:1.6;">{{ resp.transcript }}</div>
              </div>
              <!-- Sentiment -->
              <div style="display:flex;gap:8px;margin-top:8px;">
                <span style="font-size:11px;padding:2px 8px;border-radius:10px;background:#d1fae5;color:#065f46;font-weight:600;">
                  {{ resp.sentiment || 'Confident' }}
                </span>
                <span style="font-size:11px;padding:2px 8px;border-radius:10px;background:#ede9fe;color:#5b21b6;font-weight:600;">
                  Score: {{ resp.aiScore || 78 }}/100
                </span>
              </div>
            </div>

            <ng-template #noResp>
              <div style="font-size:12px;color:var(--text-3);padding:12px;text-align:center;
                          border:2px dashed var(--border);border-radius:6px;margin-top:8px;">
                Awaiting candidate response…
              </div>
            </ng-template>
          </div>

          <div *ngIf="!selected.questions?.length"
               style="text-align:center;color:var(--text-3);padding:40px;">
            No questions attached to this interview.
          </div>
        </div>

        <ng-template #noSelection>
          <div class="card" style="display:flex;align-items:center;justify-content:center;
                                   min-height:300px;color:var(--text-3);text-align:center;padding:40px;">
            <div>
              <div style="font-size:48px;margin-bottom:12px;">🎥</div>
              <div style="font-weight:500;">Select an interview to review responses</div>
            </div>
          </div>
        </ng-template>

      </div>
    </section>
  `,
  styles: [`
    .question-row {
      display:flex; align-items:center; gap:8px; margin-bottom:8px;
    }
    .q-num {
      font-size:11px; font-weight:700; color:var(--text-3);
      min-width:24px; text-align:center;
    }
    .link-box {
      margin-top:16px; padding:14px 16px;
      background:#faf5ff; border:1px solid #ddd6fe; border-radius:8px;
    }
    .inv-row {
      display:flex; align-items:center; gap:12px; padding:10px 8px;
      border-radius:8px; cursor:pointer; margin-bottom:4px; transition:background .1s;
    }
    .inv-row:hover { background:#f8f7ff; }
    .status-chip {
      padding:3px 10px; border-radius:16px; font-size:11px; font-weight:700;
    }
    .q-response-card {
      padding:14px; background:var(--surface-alt); border-radius:8px;
      margin-bottom:12px; border:1px solid var(--border);
    }
    .q-label {
      font-size:12px; font-weight:700; color:var(--text-2); margin-bottom:10px;
    }
    .mock-video {
      background:#1e1b4b; border-radius:8px; padding:24px;
      display:flex; flex-direction:column; align-items:center; justify-content:center;
      min-height:80px;
    }
    .play-btn {
      width:36px; height:36px; border-radius:50%; background:rgba(255,255,255,.2);
      display:flex; align-items:center; justify-content:center;
      color:#fff; font-size:14px; cursor:pointer;
    }
  `]
})
export class VideoInterviewsComponent implements OnInit {
  candidates: any[] = [];
  interviews: any[] = [];
  selected: any = null;
  generating = false;
  generatedLink = '';
  copied = false;

  form = {
    candidateId: '',
    candidateName: '',
    jobTitle: '',
    deadline: '',
    questions: [] as string[]
  };

  readonly questionHints = [
    'Tell me about yourself and your background.',
    'Describe a challenging project you worked on.',
    'Why are you interested in this role?',
    'What are your key technical strengths?',
    'Where do you see yourself in 3 years?'
  ];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>(`${environment.apiUrl}/api/candidates`)
      .subscribe({ next: d => this.candidates = d, error: () => {} });
    this.loadInterviews();
  }

  loadInterviews() {
    this.http.get<any[]>(`${environment.apiUrl}/api/interviews/video`)
      .subscribe({ next: d => { this.interviews = d; if (d.length && !this.selected) this.selected = d[0]; }, error: () => {} });
  }

  onCandidateChange() {
    const c = this.candidates.find(x => x.id === this.form.candidateId);
    this.form.candidateName = c ? `${c.firstName} ${c.lastName}`.trim() : '';
  }

  addQuestion() {
    if (this.form.questions.length < 5) this.form.questions.push('');
  }

  removeQuestion(i: number) {
    this.form.questions.splice(i, 1);
  }

  generateLink() {
    if (!this.form.candidateId || !this.form.questions.length) return;
    this.generating = true;
    this.http.post<any>(`${environment.apiUrl}/api/interviews/video-link`, {
      candidateId: this.form.candidateId,
      candidateName: this.form.candidateName,
      jobTitle: this.form.jobTitle,
      deadline: this.form.deadline,
      questions: this.form.questions.filter(q => q.trim())
    }).subscribe({
      next: r => {
        this.generatedLink = r.link;
        this.generating = false;
        this.loadInterviews();
      },
      error: () => { this.generating = false; }
    });
  }

  copyLink() {
    navigator.clipboard?.writeText(this.generatedLink).then(() => {
      this.copied = true;
      setTimeout(() => this.copied = false, 2000);
    });
  }

  selectInterview(inv: any) {
    this.http.get<any>(`${environment.apiUrl}/api/interviews/video-responses/${inv.id}`)
      .subscribe({ next: d => this.selected = d, error: () => this.selected = inv });
  }

  getResponse(questionIndex: number): any {
    return (this.selected?.responses || []).find((r: any) => r.questionIndex === questionIndex);
  }

  responsePct(): number {
    const total = this.selected?.questions?.length || 0;
    const done = this.selected?.responses?.length || 0;
    return total ? Math.round((done / total) * 100) : 0;
  }

  statusBg(s: string): string {
    return s === 'Completed' ? '#d1fae5' : s === 'Partial' ? '#fef3c7' : s === 'Sent' ? '#dbeafe' : '#f3f4f6';
  }

  statusFg(s: string): string {
    return s === 'Completed' ? '#065f46' : s === 'Partial' ? '#92400e' : s === 'Sent' ? '#1d4ed8' : '#374151';
  }
}
