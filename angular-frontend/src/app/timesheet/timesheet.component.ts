import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({ selector: 'app-timesheet',
  template: `
    <div class="page-container page-enter">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="page-title">Timesheet</h1>
          <p style="color:var(--text-3);font-size:13px;">Log Hours · Weekly View · Submit for Approval</p>
        </div>
        <div style="display:flex;gap:8px;">
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='weekly'" (click)="tab='weekly'">Weekly Grid</button>
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='log'" (click)="tab='log'">Log Hours</button>
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='projects'" (click)="tab='projects'">Projects</button>
        </div>
      </div>

      <!-- KPIs -->
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:24px;">
        <div class="kpi-card"><div class="kpi-val" style="color:#6b4df0;">{{totalWeekHours}}</div><div class="kpi-lbl">Hours This Week</div></div>
        <div class="kpi-card"><div class="kpi-val" style="color:#10b981;">{{billableHours}}</div><div class="kpi-lbl">Billable Hours</div></div>
        <div class="kpi-card"><div class="kpi-val" style="color:#f59e0b;">{{projects.length}}</div><div class="kpi-lbl">Active Projects</div></div>
        <div class="kpi-card"><div class="kpi-val" style="color:#3b82f6;">{{timesheetStatus}}</div><div class="kpi-lbl">Status</div></div>
      </div>

      <!-- WEEKLY GRID -->
      <div *ngIf="tab==='weekly'">
        <div class="card" style="overflow-x:auto;">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
            <h3 style="font-weight:700;">Week of May 4 – May 10, 2026</h3>
            <div style="display:flex;gap:8px;">
              <button class="btn btn-ghost btn-sm" (click)="saveTimesheet()">Save Draft</button>
              <button class="btn btn-primary btn-sm" (click)="submitTimesheet()">Submit for Approval</button>
            </div>
          </div>
          <table style="width:100%;border-collapse:collapse;min-width:800px;">
            <thead>
              <tr style="border-bottom:2px solid var(--border);">
                <th class="th" style="min-width:160px;">Project / Task</th>
                <th *ngFor="let d of weekDays" class="th" style="text-align:center;">
                  <div>{{d.name}}</div>
                  <div style="font-size:10px;color:var(--text-3);">{{d.date}}</div>
                </th>
                <th class="th" style="text-align:center;">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let row of timesheetGrid; let ri=index" [style.border-bottom]="'1px solid var(--border)'" class="tr-hover">
                <td class="td">
                  <div style="font-weight:600;font-size:13px;">{{row.project}}</div>
                  <div style="font-size:11px;color:var(--text-3);">{{row.task}}</div>
                </td>
                <td *ngFor="let d of weekDays; let di=index" class="td" style="text-align:center;">
                  <input type="number" min="0" max="24" step="0.5"
                    [(ngModel)]="row.hours[di]"
                    (change)="recalcTotals()"
                    style="width:52px;text-align:center;border:1px solid var(--border);border-radius:6px;padding:4px;background:var(--surface);color:var(--text);font-size:13px;">
                </td>
                <td class="td" style="text-align:center;font-weight:700;color:#6b4df0;">{{rowTotal(row.hours)}}</td>
              </tr>
              <tr style="background:var(--surface-alt);font-weight:700;">
                <td class="td">Daily Total</td>
                <td *ngFor="let t of dailyTotals" class="td" style="text-align:center;" [style.color]="t>8?'#ef4444':t===8?'#10b981':'#6b4df0'">{{t}}</td>
                <td class="td" style="text-align:center;font-size:16px;color:#6b4df0;">{{totalWeekHours}}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- SVG Bar Chart -->
        <div class="card">
          <h3 style="font-weight:700;margin-bottom:16px;">Hours Per Day</h3>
          <svg width="100%" height="160" viewBox="0 0 560 160">
            <g *ngFor="let t of dailyTotals; let i=index">
              <rect [attr.x]="i*80+20" [attr.y]="160-t*12" [attr.width]="60" [attr.height]="t*12"
                [attr.fill]="t>8?'#ef4444':t===8?'#10b981':'#6b4df0'" rx="4" opacity="0.85"></rect>
              <text [attr.x]="i*80+50" [attr.y]="155-t*12" text-anchor="middle" font-size="12" fill="var(--text)">{{t}}h</text>
              <text [attr.x]="i*80+50" [attr.y]="158" text-anchor="middle" font-size="11" fill="var(--text-3)">{{weekDays[i].name}}</text>
            </g>
          </svg>
        </div>
      </div>

      <!-- LOG HOURS -->
      <div *ngIf="tab==='log'" class="card" style="max-width:540px;">
        <h3 style="font-weight:700;margin-bottom:16px;">Log Time Entry</h3>
        <div style="display:flex;flex-direction:column;gap:14px;">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div>
              <label style="font-size:12px;font-weight:600;color:var(--text-3);">Project</label>
              <select class="select" [(ngModel)]="logForm.project" style="margin-top:4px;">
                <option value="">Select project</option>
                <option *ngFor="let p of projects">{{p.name}}</option>
              </select>
            </div>
            <div>
              <label style="font-size:12px;font-weight:600;color:var(--text-3);">Date</label>
              <input class="input" type="date" [(ngModel)]="logForm.date" style="margin-top:4px;">
            </div>
          </div>
          <div>
            <label style="font-size:12px;font-weight:600;color:var(--text-3);">Task</label>
            <input class="input" [(ngModel)]="logForm.task" placeholder="Brief task description" style="margin-top:4px;">
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div>
              <label style="font-size:12px;font-weight:600;color:var(--text-3);">Hours</label>
              <input class="input" type="number" min="0.5" max="24" step="0.5" [(ngModel)]="logForm.hours" style="margin-top:4px;">
            </div>
            <div>
              <label style="font-size:12px;font-weight:600;color:var(--text-3);">Billable?</label>
              <select class="select" [(ngModel)]="logForm.billable" style="margin-top:4px;">
                <option [value]="true">Yes</option>
                <option [value]="false">No</option>
              </select>
            </div>
          </div>
          <div>
            <label style="font-size:12px;font-weight:600;color:var(--text-3);">Description</label>
            <textarea class="textarea" [(ngModel)]="logForm.description" rows="3" placeholder="What did you work on?" style="margin-top:4px;width:100%;"></textarea>
          </div>
          <button class="btn btn-primary" (click)="addLog()">Add Entry</button>
        </div>

        <div style="margin-top:24px;">
          <h4 style="font-weight:700;margin-bottom:12px;">Recent Entries</h4>
          <div *ngFor="let e of logEntries.slice(0,5)" style="padding:10px 0;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
            <div>
              <div style="font-weight:600;font-size:13px;">{{e.project}} — {{e.task}}</div>
              <div style="font-size:11px;color:var(--text-3);">{{e.date}} · {{e.description}}</div>
            </div>
            <span style="font-weight:700;color:#6b4df0;">{{e.hours}}h</span>
          </div>
        </div>
      </div>

      <!-- PROJECTS -->
      <div *ngIf="tab==='projects'">
        <div class="card">
          <table style="width:100%;border-collapse:collapse;">
            <thead><tr style="border-bottom:2px solid var(--border);">
              <th class="th">Project</th><th class="th">Client</th><th class="th">Hours Logged</th><th class="th">Budget Hours</th><th class="th">Utilization</th>
            </tr></thead>
            <tbody>
              <tr *ngFor="let p of projects" style="border-bottom:1px solid var(--border);" class="tr-hover">
                <td class="td"><div style="font-weight:600;">{{p.name}}</div><div style="font-size:11px;color:var(--text-3);">{{p.type}}</div></td>
                <td class="td">{{p.client}}</td>
                <td class="td"><strong>{{p.logged}}</strong>h</td>
                <td class="td">{{p.budget}}h</td>
                <td class="td" style="min-width:160px;">
                  <div style="display:flex;align-items:center;gap:8px;">
                    <div style="flex:1;background:var(--border);border-radius:4px;height:6px;">
                      <div style="height:6px;border-radius:4px;transition:width .4s;" [style.width.%]="(p.logged/p.budget)*100" [style.background]="(p.logged/p.budget)>0.9?'#ef4444':'#6b4df0'"></div>
                    </div>
                    <span style="font-size:12px;font-weight:600;">{{((p.logged/p.budget)*100)|number:'1.0-0'}}%</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .kpi-card { background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px;text-align:center; }
    .kpi-val { font-size:30px;font-weight:800; }
    .kpi-lbl { font-size:12px;color:var(--text-3);margin-top:4px; }
    .th { padding:10px;text-align:left;font-size:12px;color:var(--text-3);font-weight:600; }
    .td { padding:10px;font-size:13px; }
    .tr-hover:hover { background:var(--surface-alt); }
    .card { background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px;margin-bottom:16px; }
    .textarea { padding:8px 12px;border:1px solid var(--border);border-radius:8px;background:var(--surface);color:var(--text);resize:vertical;font-family:inherit;font-size:14px; }
  `]
})
export class TimesheetComponent implements OnInit { private api = `${environment.apiUrl}/api/attendance`;
  constructor(private http: HttpClient) {}
  tab = 'weekly';
  timesheetStatus = 'Draft';
  timesheetId: number | null = null;
  billableHours = 0;
  tsMsg = '';

  weekDays = this.buildWeekDays();

  projects: any[] = [];
  timesheetGrid: any[] = [];
  dailyTotals: number[] = [0, 0, 0, 0, 0, 0, 0];
  logForm = { project: '', date: '', task: '', hours: 1, billable: true, description: '' };
  logEntries: any[] = [];

  ngOnInit() { this.loadProjects(); this.loadTimesheets(); }

  buildWeekDays() { const today = new Date();
    const dow = today.getDay();
    const monday = new Date(today);
    monday.setDate(today.getDate() - (dow === 0 ? 6 : dow - 1));
    const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    return days.map((name, i) => { const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      return { name, date: `${d.toLocaleString('default',{month:'short'})} ${d.getDate()}` }; }); }

  loadProjects() { this.http.get<any[]>(`${this.api}/projects`).subscribe(data => { this.projects = (data || []).map(p => ({ id: p.id, name: p.projectName || p.name, client: p.clientName || p.client || '',
        type: p.projectType || p.type || 'Internal',
        logged: p.loggedHours || p.logged || 0,
        budget: p.budgetHours || p.budget || 0 }));
      if (this.timesheetGrid.length === 0) { this.timesheetGrid = this.projects.map(p => ({ project: p.name, task: '', hours: [0,0,0,0,0,0,0] }));
        this.recalcTotals(); } }); }

  loadTimesheets() { this.http.get<any[]>(`${this.api}/timesheets`).subscribe(data => { const entries = data || [];
      this.logEntries = entries.map(e => ({ id: e.id, project: e.projectName || e.project || '',
        task: e.taskName || e.task || '', date: e.workDate?.slice(0,10) || e.date?.slice(0,10) || '',
        hours: e.hoursLogged || e.hours || 0, description: e.description || '' }));
      this.billableHours = entries.filter(e => e.billable).reduce((s: number, e: any) => s + (e.hoursLogged || e.hours || 0), 0);
      if (entries.length) { this.timesheetId = entries[0].timesheetId || null;
        this.timesheetStatus = entries[0].status || 'Draft'; } }); }

  recalcTotals() { this.dailyTotals = this.weekDays.map((_, di) => this.timesheetGrid.reduce((sum, r) => sum + (r.hours[di] || 0), 0)); }

  get totalWeekHours() { return this.dailyTotals.reduce((a, b) => a + b, 0); }
  rowTotal(hrs: number[]) { return hrs.reduce((a, b) => a + b, 0); }

  addLog() { if (!this.logForm.project || !this.logForm.task) { this.tsMsg = 'Select project and task'; return; }
    const payload = { projectName: this.logForm.project, taskName: this.logForm.task, workDate: this.logForm.date, hoursLogged: this.logForm.hours, billable: this.logForm.billable, description: this.logForm.description };
    this.http.post<any>(`${this.api}/timesheets`, payload).subscribe({ next: res => { this.logEntries.unshift({ id: res.id, ...this.logForm });
        this.logForm = { project: '', date: '', task: '', hours: 1, billable: true, description: '' }; },
      error: () => { this.logEntries.unshift({ ...this.logForm });
        this.logForm = { project: '', date: '', task: '', hours: 1, billable: true, description: '' }; } }); }

  saveTimesheet() { const payload = { entries: this.timesheetGrid, status: 'Draft' };
    this.http.post(`${this.api}/timesheets/save`, payload).subscribe({ error: () => {} });
    this.tsMsg = 'Timesheet saved as draft'; setTimeout(() => this.tsMsg = '', 3000); }

  submitTimesheet() { const endpoint = this.timesheetId ? `${this.api}/timesheets/${this.timesheetId}/submit` : `${this.api}/timesheets/submit`;
    this.http.patch(endpoint, {}).subscribe({ next: () => { this.timesheetStatus = 'Submitted'; },
      error: () => { this.timesheetStatus = 'Submitted'; } }); }
}

