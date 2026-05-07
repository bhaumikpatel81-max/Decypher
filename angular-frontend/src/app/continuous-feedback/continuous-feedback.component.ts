import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-continuous-feedback',
  template: `
    <div class="page-container page-enter">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="page-title">Continuous Feedback</h1>
          <p style="color:var(--text-3);font-size:13px;">Kudos · 1:1s · Mood · Feedback Wall</p>
        </div>
        <div style="display:flex;gap:8px;">
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='wall'" (click)="tab='wall'">Feedback Wall</button>
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='kudos'" (click)="tab='kudos'">Give Kudos</button>
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='11'" (click)="tab='11'">1:1 Meetings</button>
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='mood'" (click)="tab='mood'">Mood Check-in</button>
        </div>
      </div>

      <!-- KPIs -->
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:24px;">
        <div class="kpi-card"><div class="kpi-val" style="color:#6b4df0;">{{kudosList.length}}</div><div class="kpi-lbl">Kudos This Month</div></div>
        <div class="kpi-card"><div class="kpi-val" style="color:#10b981;">{{oneOnOnes.length}}</div><div class="kpi-lbl">1:1 Sessions</div></div>
        <div class="kpi-card"><div class="kpi-val" style="color:#f59e0b;">{{avgMood | number:'1.1-1'}}</div><div class="kpi-lbl">Avg Team Mood</div></div>
        <div class="kpi-card"><div class="kpi-val" style="color:#3b82f6;">{{moodCheckins.length}}</div><div class="kpi-lbl">Check-ins Today</div></div>
      </div>

      <!-- FEEDBACK WALL -->
      <div *ngIf="tab==='wall'">
        <h3 style="font-weight:700;margin-bottom:16px;">Kudos Wall 🎉</h3>
        <div *ngIf="!kudosList.length" style="text-align:center;padding:40px;color:var(--text-3);">No kudos yet. Be the first to recognize a colleague!</div>
        <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:16px;">
          <div *ngFor="let k of kudosList" class="kudos-card" [style.border-color]="kudosColor(k.type)">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;">
              <div style="display:flex;align-items:center;gap:8px;">
                <span style="font-size:24px;">{{kudosEmoji(k.type)}}</span>
                <div>
                  <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;" [style.color]="kudosColor(k.type)">{{k.type}}</div>
                  <div style="font-weight:700;font-size:14px;">{{k.to}}</div>
                </div>
              </div>
              <div style="font-size:11px;color:var(--text-3);">{{k.date}}</div>
            </div>
            <div style="font-size:13px;color:var(--text-3);font-style:italic;">"{{k.message}}"</div>
            <div style="font-size:12px;color:var(--text-3);margin-top:8px;">— {{k.from}}</div>
          </div>
        </div>
      </div>

      <!-- GIVE KUDOS -->
      <div *ngIf="tab==='kudos'" class="card" style="max-width:520px;">
        <h3 style="font-weight:700;margin-bottom:16px;">Give Kudos 🎉</h3>
        <div style="display:flex;flex-direction:column;gap:14px;">
          <div>
            <label style="font-size:12px;font-weight:600;color:var(--text-3);">To Employee</label>
            <select class="select" [(ngModel)]="kudosForm.to" style="margin-top:4px;">
              <option value="">Select colleague</option>
              <option *ngFor="let e of employees">{{e}}</option>
            </select>
          </div>
          <div>
            <label style="font-size:12px;font-weight:600;color:var(--text-3);">Kudos Type</label>
            <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin-top:6px;">
              <button *ngFor="let t of kudosTypes" class="kudos-type-btn" [class.selected]="kudosForm.type===t.name" (click)="kudosForm.type=t.name" [style.border-color]="kudosForm.type===t.name?t.color:'var(--border)'" [style.background]="kudosForm.type===t.name?t.color+'11':'var(--surface)'">
                <span>{{t.emoji}}</span><span style="font-weight:600;">{{t.name}}</span>
              </button>
            </div>
          </div>
          <div>
            <label style="font-size:12px;font-weight:600;color:var(--text-3);">Message</label>
            <textarea class="textarea" [(ngModel)]="kudosForm.message" rows="3" placeholder="Share why this person deserves kudos..." style="margin-top:4px;width:100%;"></textarea>
          </div>
          <div *ngIf="kudosError" style="padding:10px;background:#fee2e2;border-radius:8px;color:#991b1b;font-size:13px;">{{kudosError}}</div>
          <button class="btn btn-primary" (click)="sendKudos()">Send Kudos 🎉</button>
          <div *ngIf="kudosMsg" style="padding:10px;background:#d1fae5;border-radius:8px;color:#065f46;font-size:13px;font-weight:600;">{{kudosMsg}}</div>
        </div>
      </div>

      <!-- 1:1 MEETINGS -->
      <div *ngIf="tab==='11'">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;">
          <div class="card">
            <h4 style="font-weight:700;margin-bottom:14px;">Log 1:1 Meeting</h4>
            <div style="display:flex;flex-direction:column;gap:12px;">
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
                <div><label style="font-size:12px;font-weight:600;color:var(--text-3);">With</label><select class="select" [(ngModel)]="ooForm.with" style="margin-top:4px;"><option value="">Select</option><option *ngFor="let e of employees">{{e}}</option></select></div>
                <div><label style="font-size:12px;font-weight:600;color:var(--text-3);">Date</label><input class="input" type="date" [(ngModel)]="ooForm.date" style="margin-top:4px;"></div>
              </div>
              <div><label style="font-size:12px;font-weight:600;color:var(--text-3);">Agenda</label><input class="input" [(ngModel)]="ooForm.agenda" placeholder="Meeting agenda" style="margin-top:4px;"></div>
              <div><label style="font-size:12px;font-weight:600;color:var(--text-3);">Notes</label><textarea class="textarea" [(ngModel)]="ooForm.notes" rows="3" style="margin-top:4px;width:100%;"></textarea></div>
              <div><label style="font-size:12px;font-weight:600;color:var(--text-3);">Action Items</label><textarea class="textarea" [(ngModel)]="ooForm.actions" rows="2" placeholder="Next steps..." style="margin-top:4px;width:100%;"></textarea></div>
              <div *ngIf="meetingError" style="padding:10px;background:#fee2e2;border-radius:8px;color:#991b1b;font-size:13px;">{{meetingError}}</div>
              <button class="btn btn-primary" (click)="logMeeting()">Save Meeting</button>
            </div>
          </div>
          <div>
            <h4 style="font-weight:700;margin-bottom:14px;">1:1 History</h4>
            <div *ngIf="!oneOnOnes.length" style="text-align:center;padding:24px;color:var(--text-3);">No 1:1 meetings logged yet.</div>
            <div style="display:flex;flex-direction:column;gap:12px;">
              <div *ngFor="let m of oneOnOnes" class="card" style="padding:14px;">
                <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
                  <div style="font-weight:700;">With {{m.with}}</div>
                  <div style="font-size:12px;color:var(--text-3);">{{m.date}}</div>
                </div>
                <div style="font-size:12px;color:var(--text-3);">📌 {{m.agenda}}</div>
                <div style="font-size:12px;color:var(--text-3);margin-top:4px;">✅ {{m.actions}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- MOOD CHECK-IN -->
      <div *ngIf="tab==='mood'">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;">
          <div class="card">
            <h4 style="font-weight:700;margin-bottom:16px;">How are you feeling today?</h4>
            <div style="display:flex;gap:16px;justify-content:center;margin-bottom:20px;">
              <button *ngFor="let m of moods" class="mood-btn" [class.selected]="selectedMood===m.val" (click)="selectedMood=m.val" [title]="m.label">
                <span style="font-size:36px;">{{m.emoji}}</span>
                <span style="font-size:11px;color:var(--text-3);">{{m.label}}</span>
              </button>
            </div>
            <textarea class="textarea" [(ngModel)]="moodNote" rows="3" placeholder="Optional: Share what's on your mind..." style="width:100%;margin-bottom:12px;"></textarea>
            <button class="btn btn-primary" style="width:100%;" (click)="submitMood()">Submit Check-in</button>
            <div *ngIf="moodMsg" style="margin-top:10px;padding:10px;background:#d1fae5;border-radius:8px;color:#065f46;font-size:13px;font-weight:600;">{{moodMsg}}</div>
          </div>
          <div class="card">
            <h4 style="font-weight:700;margin-bottom:16px;">Team Mood — Today</h4>
            <div *ngIf="!moodCheckins.length" style="text-align:center;padding:24px;color:var(--text-3);">No mood check-ins today yet.</div>
            <div style="display:flex;flex-direction:column;gap:10px;">
              <div *ngFor="let c of moodCheckins" style="display:flex;align-items:center;justify-content:space-between;padding:10px;background:var(--surface-alt);border-radius:8px;">
                <div style="display:flex;align-items:center;gap:8px;">
                  <span style="font-size:22px;">{{moodEmoji(c.mood)}}</span>
                  <div>
                    <div style="font-weight:600;font-size:13px;">{{c.employee}}</div>
                    <div style="font-size:11px;color:var(--text-3);">{{c.note || 'No note'}}</div>
                  </div>
                </div>
                <span style="font-weight:700;font-size:16px;" [style.color]="moodColor(c.mood)">{{c.mood}}/5</span>
              </div>
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
    .kudos-card { background:var(--surface);border:2px solid var(--border);border-radius:12px;padding:16px;transition:border-color .2s; }
    .kudos-type-btn { display:flex;flex-direction:column;align-items:center;gap:4px;padding:12px;border:2px solid var(--border);border-radius:10px;background:var(--surface);cursor:pointer;font-size:12px;transition:all .15s; }
    .kudos-type-btn.selected { font-weight:700; }
    .mood-btn { display:flex;flex-direction:column;align-items:center;gap:4px;padding:10px;border:2px solid transparent;border-radius:12px;background:var(--surface-alt);cursor:pointer;transition:all .15s; }
    .mood-btn.selected { border-color:#6b4df0;background:rgba(107,77,240,.08); }
    .card { background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px;margin-bottom:16px; }
    .textarea { padding:8px 12px;border:1px solid var(--border);border-radius:8px;background:var(--surface);color:var(--text);resize:vertical;font-family:inherit;font-size:14px; }
  `]
})
export class ContinuousFeedbackComponent implements OnInit {
  private api = `${environment.apiUrl}/api/performance`;
  constructor(private http: HttpClient, private authService: AuthService) {}
  tab = 'wall';
  kudosMsg = '';
  kudosError = '';
  meetingError = '';
  moodNote = '';
  moodMsg = '';
  selectedMood = 0;

  employees: string[] = [];

  kudosTypes = [
    { name: 'Innovation', emoji: '💡', color: '#f59e0b' },
    { name: 'Teamwork', emoji: '🤝', color: '#10b981' },
    { name: 'Leadership', emoji: '🚀', color: '#6b4df0' },
    { name: 'Customer Focus', emoji: '🎯', color: '#3b82f6' },
  ];

  moods = [
    { val: 1, emoji: '😞', label: 'Poor' }, { val: 2, emoji: '😕', label: 'Low' },
    { val: 3, emoji: '😐', label: 'Okay' }, { val: 4, emoji: '😊', label: 'Good' },
    { val: 5, emoji: '😄', label: 'Great' },
  ];

  kudosList: any[] = [];
  oneOnOnes: any[] = [];
  moodCheckins: any[] = [];

  kudosForm = { to: '', type: '', message: '' };
  ooForm = { with: '', date: '', agenda: '', notes: '', actions: '' };

  get avgMood() {
    if (!this.moodCheckins.length) return 0;
    return this.moodCheckins.reduce((s, m) => s + m.mood, 0) / this.moodCheckins.length;
  }

  kudosColor(type: string) { return this.kudosTypes.find(t => t.name === type)?.color || '#6b4df0'; }
  kudosEmoji(type: string) { return this.kudosTypes.find(t => t.name === type)?.emoji || '🎉'; }
  moodEmoji(val: number) { return this.moods.find(m => m.val === val)?.emoji || '😐'; }
  moodColor(val: number) { return val >= 4 ? '#10b981' : val === 3 ? '#f59e0b' : '#ef4444'; }

  private get userId(): string {
    return this.authService.getCurrentUser()?.id || '';
  }

  ngOnInit() {
    this.loadFeedback();
    this.loadEmployees();
    this.loadMeetings();
    this.loadMoods();
  }

  loadFeedback() {
    if (!this.userId) return;
    this.http.get<any[]>(`${this.api}/continuous-feedback/${this.userId}`).subscribe(data => {
      this.kudosList = (data || []).map(f => ({
        id: f.id, from: f.giverName || f.fromEmployeeName || 'Colleague',
        to: f.recipientName || f.toEmployeeName || '',
        type: f.category || f.tag || f.feedbackType || 'Teamwork',
        message: f.message || f.content || '',
        date: f.createdAt ? new Date(f.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : ''
      }));
    });
  }

  loadMeetings() {
    if (!this.userId) return;
    this.http.get<any[]>(`${this.api}/continuous-feedback/${this.userId}/meetings`).subscribe(data => {
      this.oneOnOnes = (data || []).map(m => ({
        id: m.id, with: m.withEmployeeName || m.participantName || '',
        date: m.meetingDate?.slice(0, 10) || '',
        agenda: m.agenda || '', notes: m.notes || '',
        actions: m.actionItems || ''
      }));
    });
  }

  loadMoods() {
    if (!this.userId) return;
    const today = new Date().toISOString().slice(0, 10);
    this.http.get<any[]>(`${this.api}/continuous-feedback/${this.userId}/moods?date=${today}`).subscribe(data => {
      this.moodCheckins = (data || []).map(c => ({
        id: c.id, employee: c.employeeName || 'Colleague',
        mood: c.moodScore || c.mood || 3, note: c.note || ''
      }));
    });
  }

  loadEmployees() {
    this.http.get<any[]>(`${environment.apiUrl}/api/employees`).subscribe(data => {
      this.employees = (data || []).map(e => `${e.firstName} ${e.lastName}`.trim()).filter(Boolean);
    });
  }

  sendKudos() {
    if (!this.kudosForm.to || !this.kudosForm.type) {
      this.kudosError = 'Please select a recipient and kudos type.';
      return;
    }
    this.kudosError = '';
    const payload = {
      toEmployeeName: this.kudosForm.to,
      tag: this.kudosForm.type,
      content: this.kudosForm.message,
      feedbackType: 'Kudos'
    };
    this.http.post<any>(`${this.api}/continuous-feedback`, payload).subscribe({
      next: res => {
        this.kudosList.unshift({
          id: res.id, from: 'Me', to: this.kudosForm.to,
          type: this.kudosForm.type, message: this.kudosForm.message,
          date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
        });
        this.kudosMsg = `Kudos sent to ${this.kudosForm.to}!`;
        this.kudosForm = { to: '', type: '', message: '' };
        setTimeout(() => this.kudosMsg = '', 3000);
      },
      error: () => {
        this.kudosList.unshift({
          from: 'Me', to: this.kudosForm.to, type: this.kudosForm.type,
          message: this.kudosForm.message,
          date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
        });
        this.kudosMsg = `Kudos sent to ${this.kudosForm.to}!`;
        this.kudosForm = { to: '', type: '', message: '' };
        setTimeout(() => this.kudosMsg = '', 3000);
      }
    });
  }

  logMeeting() {
    if (!this.ooForm.with) {
      this.meetingError = 'Please select a person for the 1:1 meeting.';
      return;
    }
    this.meetingError = '';
    const payload = {
      participantName: this.ooForm.with,
      meetingDate: this.ooForm.date,
      agenda: this.ooForm.agenda,
      notes: this.ooForm.notes,
      actionItems: this.ooForm.actions
    };
    this.http.post<any>(`${this.api}/continuous-feedback/${this.userId}/meetings`, payload).subscribe({
      next: res => {
        this.oneOnOnes.unshift({ id: res.id, ...this.ooForm });
        this.ooForm = { with: '', date: '', agenda: '', notes: '', actions: '' };
      },
      error: () => {
        this.oneOnOnes.unshift({ ...this.ooForm });
        this.ooForm = { with: '', date: '', agenda: '', notes: '', actions: '' };
      }
    });
  }

  submitMood() {
    if (!this.selectedMood) {
      this.moodMsg = '';
      return;
    }
    const payload = { moodScore: this.selectedMood, note: this.moodNote };
    this.http.post<any>(`${this.api}/continuous-feedback/${this.userId}/moods`, payload).subscribe({
      next: () => {
        this.moodCheckins.unshift({ employee: 'Me', mood: this.selectedMood, note: this.moodNote });
        this.moodMsg = 'Mood check-in submitted!';
        this.selectedMood = 0;
        this.moodNote = '';
        setTimeout(() => this.moodMsg = '', 3000);
      },
      error: () => {
        this.moodCheckins.unshift({ employee: 'Me', mood: this.selectedMood, note: this.moodNote });
        this.moodMsg = 'Mood check-in submitted!';
        this.selectedMood = 0;
        this.moodNote = '';
        setTimeout(() => this.moodMsg = '', 3000);
      }
    });
  }
}
