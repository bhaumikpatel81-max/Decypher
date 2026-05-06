import { Component, OnInit } from '@angular/core';

interface TrainingSession {
  id: number; name: string; type: string; trainer: string;
  date: string; venue: string; capacity: number; enrolled: number;
  status: 'Upcoming' | 'Completed' | 'In Progress'; attended?: boolean;
}

@Component({
  selector: 'app-training-calendar',
  template: `
    <div class="page-container page-enter">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="page-title">Training Calendar</h1>
          <p style="color:var(--text-3);font-size:13px;">Sessions · Register · Attendance · Mini Calendar</p>
        </div>
        <div style="display:flex;gap:8px;">
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='list'" (click)="tab='list'">Sessions</button>
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='calendar'" (click)="tab='calendar'">Calendar</button>
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='create'" (click)="tab='create'">Create Session</button>
        </div>
      </div>

      <!-- KPIs -->
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:24px;">
        <div class="kpi-card"><div class="kpi-val" style="color:#6b4df0;">{{sessions.length}}</div><div class="kpi-lbl">Total Sessions</div></div>
        <div class="kpi-card"><div class="kpi-val" style="color:#10b981;">{{upcoming}}</div><div class="kpi-lbl">Upcoming</div></div>
        <div class="kpi-card"><div class="kpi-val" style="color:#f59e0b;">{{totalEnrolled}}</div><div class="kpi-lbl">Total Enrollments</div></div>
        <div class="kpi-card"><div class="kpi-val" style="color:#3b82f6;">{{completed}}</div><div class="kpi-lbl">Completed</div></div>
      </div>

      <!-- SESSION LIST -->
      <div *ngIf="tab==='list'">
        <div style="display:flex;gap:12px;margin-bottom:16px;">
          <input class="input" style="max-width:220px;" [(ngModel)]="search" placeholder="Search sessions...">
          <select class="select" style="max-width:160px;" [(ngModel)]="filterStatus">
            <option value="">All Status</option>
            <option>Upcoming</option><option>In Progress</option><option>Completed</option>
          </select>
        </div>
        <div style="display:flex;flex-direction:column;gap:12px;">
          <div *ngFor="let s of filteredSessions" class="session-card" [class.past]="s.status==='Completed'">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;">
              <div style="flex:1;">
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
                  <span class="type-badge" [class]="s.type.toLowerCase().replace(' ','-')">{{s.type}}</span>
                  <span class="status-chip" [class.upcoming]="s.status==='Upcoming'" [class.completed]="s.status==='Completed'" [class.inprog]="s.status==='In Progress'">{{s.status}}</span>
                </div>
                <div style="font-weight:700;font-size:16px;margin-bottom:4px;">{{s.name}}</div>
                <div style="font-size:12px;color:var(--text-3);">🎓 {{s.trainer}} · 📅 {{s.date}} · 📍 {{s.venue}}</div>
              </div>
              <div style="text-align:right;margin-left:16px;">
                <div style="font-size:14px;font-weight:700;color:#6b4df0;">{{s.enrolled}} / {{s.capacity}}</div>
                <div style="font-size:11px;color:var(--text-3);">seats filled</div>
                <div style="margin-top:8px;display:flex;gap:6px;justify-content:flex-end;">
                  <button class="btn btn-primary btn-sm" *ngIf="s.status==='Upcoming' && s.enrolled<s.capacity" (click)="register(s)">Register</button>
                  <button class="btn btn-ghost btn-sm" *ngIf="s.status==='Completed'" (click)="markAttendance(s)">{{s.attended?'✓ Attended':'Mark Attendance'}}</button>
                </div>
              </div>
            </div>
            <div style="margin-top:10px;background:var(--border);border-radius:4px;height:4px;">
              <div style="height:4px;border-radius:4px;" [style.width.%]="(s.enrolled/s.capacity)*100" [style.background]="(s.enrolled/s.capacity)>0.9?'#ef4444':'#6b4df0'"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- CALENDAR -->
      <div *ngIf="tab==='calendar'" class="card">
        <h3 style="font-weight:700;margin-bottom:16px;">May 2026 — Training Sessions</h3>
        <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:4px;margin-bottom:8px;">
          <div *ngFor="let d of ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']" style="text-align:center;font-size:11px;font-weight:700;color:var(--text-3);padding:4px;">{{d}}</div>
        </div>
        <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:4px;">
          <div *ngFor="let cell of calCells" class="cal-cell" [class.has-training]="cell.sessions.length>0" [class.today]="cell.day===6">
            <div style="font-size:12px;font-weight:600;">{{cell.day || ''}}</div>
            <div *ngFor="let s of cell.sessions" style="font-size:9px;color:#6b4df0;margin-top:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" [title]="s">{{s}}</div>
          </div>
        </div>
        <div style="margin-top:16px;display:flex;gap:12px;flex-wrap:wrap;font-size:12px;">
          <div style="display:flex;align-items:center;gap:6px;"><div style="width:12px;height:12px;border-radius:3px;background:rgba(107,77,240,.15);border:1px solid #6b4df0;"></div>Training Day</div>
          <div style="display:flex;align-items:center;gap:6px;"><div style="width:12px;height:12px;border-radius:3px;border:2px solid #6b4df0;"></div>Today</div>
        </div>
      </div>

      <!-- CREATE -->
      <div *ngIf="tab==='create'" class="card" style="max-width:580px;">
        <h3 style="font-weight:700;margin-bottom:16px;">Create Training Session</h3>
        <div style="display:flex;flex-direction:column;gap:14px;">
          <div>
            <label style="font-size:12px;font-weight:600;color:var(--text-3);">Session Name</label>
            <input class="input" [(ngModel)]="newSession.name" placeholder="Training session title" style="margin-top:4px;">
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div>
              <label style="font-size:12px;font-weight:600;color:var(--text-3);">Type</label>
              <select class="select" [(ngModel)]="newSession.type" style="margin-top:4px;">
                <option>Technical Workshop</option><option>Soft Skills</option><option>Compliance</option><option>Leadership</option><option>Product Training</option>
              </select>
            </div>
            <div>
              <label style="font-size:12px;font-weight:600;color:var(--text-3);">Trainer</label>
              <input class="input" [(ngModel)]="newSession.trainer" style="margin-top:4px;">
            </div>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div>
              <label style="font-size:12px;font-weight:600;color:var(--text-3);">Date</label>
              <input class="input" type="date" [(ngModel)]="newSession.date" style="margin-top:4px;">
            </div>
            <div>
              <label style="font-size:12px;font-weight:600;color:var(--text-3);">Capacity</label>
              <input class="input" type="number" [(ngModel)]="newSession.capacity" style="margin-top:4px;" min="1">
            </div>
          </div>
          <div>
            <label style="font-size:12px;font-weight:600;color:var(--text-3);">Venue / Link</label>
            <input class="input" [(ngModel)]="newSession.venue" placeholder="Office Room 201 or https://meet.google.com/..." style="margin-top:4px;">
          </div>
          <button class="btn btn-primary" (click)="createSession()">Create Session</button>
          <div *ngIf="msg" style="padding:10px;background:#d1fae5;border-radius:8px;color:#065f46;font-size:13px;font-weight:600;">{{msg}}</div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .kpi-card { background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px;text-align:center; }
    .kpi-val { font-size:28px;font-weight:800; }
    .kpi-lbl { font-size:12px;color:var(--text-3);margin-top:4px; }
    .session-card { background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:16px;transition:border-color .2s; }
    .session-card.past { opacity:0.8; }
    .type-badge { padding:2px 8px;border-radius:6px;font-size:11px;font-weight:600;background:rgba(107,77,240,.1);color:#6b4df0; }
    .status-chip { padding:2px 8px;border-radius:20px;font-size:11px;font-weight:700; }
    .status-chip.upcoming { background:rgba(107,77,240,.1);color:#6b4df0; }
    .status-chip.completed { background:#d1fae5;color:#065f46; }
    .status-chip.inprog { background:#fef3c7;color:#92400e; }
    .cal-cell { min-height:60px;border:1px solid var(--border);border-radius:6px;padding:4px; }
    .cal-cell.has-training { background:rgba(107,77,240,.08);border-color:#a78bfa; }
    .cal-cell.today { border:2px solid #6b4df0; }
    .card { background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px;margin-bottom:16px; }
  `]
})
export class TrainingCalendarComponent implements OnInit {
  tab = 'list';
  search = '';
  filterStatus = '';
  msg = '';
  calCells: any[] = [];

  newSession = { name: '', type: 'Technical Workshop', trainer: '', date: '', capacity: 20, venue: '' };

  sessions: TrainingSession[] = [
    { id: 1, name: 'Angular 17 Advanced Workshop', type: 'Technical Workshop', trainer: 'Arjun Mehta', date: '2026-05-12', venue: 'Conference Room A', capacity: 15, enrolled: 12, status: 'Upcoming' },
    { id: 2, name: 'POSH Awareness Training', type: 'Compliance', trainer: 'Priya Sharma', date: '2026-05-08', venue: 'Online (Zoom)', capacity: 50, enrolled: 48, status: 'Upcoming' },
    { id: 3, name: 'Leadership Fundamentals', type: 'Leadership', trainer: 'External Trainer', date: '2026-04-28', venue: 'Boardroom', capacity: 10, enrolled: 9, status: 'Completed', attended: false },
    { id: 4, name: 'AWS Cloud Practitioner', type: 'Technical Workshop', trainer: 'Rahul Gupta', date: '2026-04-20', venue: 'Lab Room 2', capacity: 12, enrolled: 10, status: 'Completed', attended: true },
    { id: 5, name: 'Effective Communication', type: 'Soft Skills', trainer: 'External Trainer', date: '2026-05-20', venue: 'Online (Teams)', capacity: 30, enrolled: 22, status: 'Upcoming' },
    { id: 6, name: 'Product Demo Training', type: 'Product Training', trainer: 'Ananya Iyer', date: '2026-05-15', venue: 'Conference Room B', capacity: 20, enrolled: 18, status: 'Upcoming' },
    { id: 7, name: 'Agile & Scrum Fundamentals', type: 'Technical Workshop', trainer: 'Arjun Mehta', date: '2026-04-10', venue: 'Online (Zoom)', capacity: 25, enrolled: 24, status: 'Completed', attended: true },
    { id: 8, name: 'Data Privacy & GDPR', type: 'Compliance', trainer: 'Priya Sharma', date: '2026-05-25', venue: 'Conference Room A', capacity: 30, enrolled: 15, status: 'Upcoming' },
  ];

  get upcoming() { return this.sessions.filter(s => s.status === 'Upcoming').length; }
  get completed() { return this.sessions.filter(s => s.status === 'Completed').length; }
  get totalEnrolled() { return this.sessions.reduce((s, t) => s + t.enrolled, 0); }

  get filteredSessions() {
    return this.sessions.filter(s =>
      (!this.search || s.name.toLowerCase().includes(this.search.toLowerCase())) &&
      (!this.filterStatus || s.status === this.filterStatus)
    );
  }

  ngOnInit() { this.buildCalendar(); }

  buildCalendar() {
    const firstDay = new Date(2026, 4, 1).getDay();
    const trainingDays: { [day: number]: string[] } = {
      8: ['POSH Training'], 12: ['Angular WS'], 15: ['Product Demo'],
      20: ['Communication'], 25: ['Data Privacy'],
    };
    for (let i = 0; i < firstDay; i++) this.calCells.push({ day: '', sessions: [] });
    for (let d = 1; d <= 31; d++) this.calCells.push({ day: d, sessions: trainingDays[d] || [] });
  }

  register(s: TrainingSession) { s.enrolled = Math.min(s.enrolled + 1, s.capacity); alert(`Registered for ${s.name}`); }
  markAttendance(s: TrainingSession) { s.attended = true; alert(`Attendance marked for ${s.name}`); }

  createSession() {
    if (!this.newSession.name || !this.newSession.date) { alert('Fill required fields'); return; }
    this.sessions.unshift({ id: Date.now(), ...this.newSession, enrolled: 0, status: 'Upcoming' });
    this.msg = `Session "${this.newSession.name}" created`;
    this.newSession = { name: '', type: 'Technical Workshop', trainer: '', date: '', capacity: 20, venue: '' };
    setTimeout(() => this.msg = '', 3000);
  }
}
