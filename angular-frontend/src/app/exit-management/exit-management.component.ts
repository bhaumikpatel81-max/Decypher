import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-exit-management',
  template: `
    <div class="page-container page-enter">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="page-title">Exit Management</h1>
          <p style="color:var(--text-3);font-size:13px;">Offboarding workflows, clearances & full & final settlement</p>
        </div>
        <button class="btn btn-primary btn-sm" (click)="showForm=!showForm">+ Initiate Exit</button>
      </div>

      <!-- KPIs -->
      <div class="kpi-row mb-6">
        <div class="kpi-card" *ngFor="let k of kpis">
          <div class="kpi-val" [style.color]="k.color">{{k.val}}</div>
          <div class="kpi-lbl">{{k.lbl}}</div>
        </div>
      </div>

      <!-- Initiate Exit form -->
      <div class="card mb-6" *ngIf="showForm">
        <h3 style="font-weight:700;margin-bottom:16px;">Initiate Exit Process</h3>
        <div class="form-grid-3">
          <input class="input" placeholder="Employee Name" [(ngModel)]="draft.employee">
          <input class="input" placeholder="Employee ID" [(ngModel)]="draft.empId">
          <input class="input" placeholder="Designation" [(ngModel)]="draft.designation">
          <input class="input" placeholder="Department" [(ngModel)]="draft.department">
          <input class="input" type="date" [(ngModel)]="draft.lastDay" title="Last working day">
          <select class="select" [(ngModel)]="draft.exitType">
            <option>Resignation</option><option>Termination</option><option>Retirement</option><option>Contract End</option><option>Abandonment</option>
          </select>
          <textarea class="textarea" placeholder="Exit reason / remarks" [(ngModel)]="draft.reason" style="grid-column:1/-1;height:70px;"></textarea>
        </div>
        <div *ngIf="initiateError" style="margin-top:8px;padding:8px 12px;background:#fee2e2;border-radius:6px;color:#991b1b;font-size:13px;">{{initiateError}}</div>
        <div style="display:flex;gap:8px;margin-top:12px;">
          <button class="btn btn-primary" (click)="initiateExit()">Initiate</button>
          <button class="btn btn-ghost" (click)="showForm=false;initiateError=''">Cancel</button>
        </div>
      </div>
      <div *ngIf="reminderMsg" style="margin-bottom:12px;padding:10px 16px;background:#d1fae5;border-radius:8px;color:#065f46;font-size:13px;font-weight:600;">{{reminderMsg}}</div>

      <mat-tab-group>
        <mat-tab label="Active Exits ({{activeExits.length}})">
          <div style="padding:16px 0;">
            <div class="exit-card" *ngFor="let ex of activeExits">
              <div class="exit-header">
                <div>
                  <div style="font-weight:700;font-size:15px;">{{ex.employee}}</div>
                  <div style="font-size:12px;color:var(--text-3);">{{ex.designation}} · {{ex.department}} · Last day: {{ex.lastDay}}</div>
                </div>
                <div style="display:flex;align-items:center;gap:8px;">
                  <span class="exit-type-badge">{{ex.exitType}}</span>
                  <span class="stage-badge" [class]="'stage-'+ex.stage.toLowerCase().replace(' ','-')">{{ex.stage}}</span>
                </div>
              </div>
              <!-- Clearance checklist -->
              <div class="clearance-grid">
                <div class="clearance-item" *ngFor="let c of ex.clearances" (click)="toggleClearance(ex, c)">
                  <div class="clearance-check" [class.done]="c.done">{{c.done?'✓':'○'}}</div>
                  <div>
                    <div style="font-size:12px;font-weight:600;">{{c.dept}}</div>
                    <div style="font-size:11px;color:var(--text-3);">{{c.done?'Cleared':'Pending'}}</div>
                  </div>
                </div>
              </div>
              <div style="display:flex;justify-content:space-between;align-items:center;margin-top:12px;">
                <div style="font-size:12px;color:var(--text-3);">Clearance: {{completedClearances(ex)}}/{{ex.clearances.length}}</div>
                <div style="display:flex;gap:8px;">
                  <button class="btn btn-ghost btn-sm" (click)="sendReminder(ex)">Send Reminder</button>
                  <button class="btn btn-primary btn-sm" (click)="completeExit(ex)" [disabled]="completedClearances(ex)<ex.clearances.length">Mark Complete</button>
                </div>
              </div>
            </div>
          </div>
        </mat-tab>
        <mat-tab label="Completed ({{completedExits.length}})">
          <div style="padding:16px 0;">
            <div class="exit-card" style="opacity:.75;" *ngFor="let ex of completedExits">
              <div class="exit-header">
                <div>
                  <div style="font-weight:700;">{{ex.employee}}</div>
                  <div style="font-size:12px;color:var(--text-3);">{{ex.designation}} · Last day: {{ex.lastDay}}</div>
                </div>
                <span class="stage-badge stage-completed">Completed ✓</span>
              </div>
              <div style="font-size:12px;color:var(--text-3);margin-top:8px;">{{ex.exitType}} · All clearances done</div>
            </div>
          </div>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  styles: [`
    .kpi-row { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; }
    .kpi-card { background:var(--surface); border:1px solid var(--border); border-radius:12px; padding:20px; text-align:center; }
    .kpi-val { font-size:32px; font-weight:800; }
    .kpi-lbl { font-size:12px; color:var(--text-3); margin-top:4px; }
    .form-grid-3 { display:grid; grid-template-columns:repeat(3,1fr); gap:10px; }
    .exit-card { background:var(--surface); border:1px solid var(--border); border-radius:12px; padding:20px; margin-bottom:16px; }
    .exit-header { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:16px; }
    .exit-type-badge { padding:3px 10px; border-radius:20px; font-size:11px; font-weight:700; background:#e0e7ff; color:#3730a3; }
    .stage-badge { padding:3px 10px; border-radius:20px; font-size:11px; font-weight:700; background:#fef3c7; color:#92400e; }
    .stage-badge.stage-completed { background:#d1fae5; color:#065f46; }
    .stage-badge.stage-clearance { background:#e0e7ff; color:#3730a3; }
    .clearance-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(130px,1fr)); gap:8px; }
    .clearance-item { display:flex; align-items:center; gap:8px; padding:8px 10px; border:1px solid var(--border); border-radius:8px; cursor:pointer; transition:all 150ms; }
    .clearance-item:hover { background:var(--surface-alt); }
    .clearance-check { width:24px; height:24px; border-radius:50%; border:2px solid var(--border); display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:700; flex-shrink:0; }
    .clearance-check.done { background:#10b981; color:#fff; border-color:#10b981; }
  `]
})
export class ExitManagementComponent implements OnInit {
  private api = `${environment.apiUrl}/api/employees`;
  constructor(private http: HttpClient) {}
  showForm = false;
  initiateError = '';
  reminderMsg = '';
  draft: any = { employee:'', empId:'', designation:'', department:'', lastDay:'', exitType:'Resignation', reason:'' };
  kpis = [
    { val:3, lbl:'Active Exits', color:'#f59e0b' },
    { val:1, lbl:'Awaiting Clearance', color:'#ef4444' },
    { val:18, lbl:'Completed This Year', color:'#10b981' },
    { val:94, lbl:'Avg Days to Close', color:'#6b4df0' },
  ];

  exits: any[] = [];

  get activeExits() { return this.exits.filter(e => e.stage !== 'Completed'); }
  get completedExits() { return this.exits.filter(e => e.stage === 'Completed'); }

  ngOnInit() { this.loadExits(); }

  loadExits() {
    this.http.get<any[]>(`${this.api}/exits`).subscribe(data => {
      this.exits = (data || []).map(e => ({
        id: e.id, employee: e.employeeName || '', empId: e.employeeCode || '',
        designation: e.designation || '', department: e.department || '',
        lastDay: e.lastWorkingDate?.slice(0,10) || '', exitType: e.exitType || 'Resignation',
        stage: e.status || 'Initiated',
        clearances: (e.checklistItems || []).map((item: any) => ({ id: item.id, dept: item.itemName, done: item.isCompleted }))
      }));
      const active = this.exits.filter(e => e.stage !== 'Completed').length;
      this.kpis[0].val = active;
      this.kpis[1].val = this.exits.filter(e => e.stage === 'Initiated' || e.stage === 'Pending').length;
      this.kpis[2].val = this.exits.filter(e => e.stage === 'Completed').length;
      const completed = this.exits.filter(e => e.stage === 'Completed' && e.initiatedDate && e.lastDay);
      if (completed.length) {
        const totalDays = completed.reduce((sum: number, e: any) => {
          const days = Math.abs((new Date(e.lastDay).getTime() - new Date(e.initiatedDate).getTime()) / 86400000);
          return sum + (isNaN(days) ? 0 : days);
        }, 0);
        this.kpis[3].val = Math.round(totalDays / completed.length) || 0;
      }
    });
  }

  initiateExit() {
    if (!this.draft.employee) return;
    const payload = {
      employeeName: this.draft.employee, employeeCode: this.draft.empId,
      designation: this.draft.designation, department: this.draft.department,
      lastWorkingDate: this.draft.lastDay, exitType: this.draft.exitType, reason: this.draft.reason
    };
    this.http.post<any>(`${this.api}/exits`, payload).subscribe({
      next: () => { this.loadExits(); this.draft = { employee:'', empId:'', designation:'', department:'', lastDay:'', exitType:'Resignation', reason:'' }; this.showForm = false; },
      error: err => { this.initiateError = err?.error?.message || 'Failed to initiate exit'; }
    });
  }

  completedClearances(ex: any): number { return (ex.clearances || []).filter((c: any) => c.done).length; }

  toggleClearance(ex: any, c: any) {
    this.http.patch(`${this.api}/exits/checklist/${c.id}`, { isCompleted: !c.done }).subscribe({
      next: () => { c.done = !c.done; if (this.completedClearances(ex) >= ex.clearances.length) ex.stage = 'Clearance'; }
    });
  }

  completeExit(ex: any) {
    this.http.patch(`${this.api}/exits/${ex.id}/status`, { status: 'Completed' }).subscribe({
      next: () => { ex.stage = 'Completed'; this.loadExits(); }
    });
  }

  sendReminder(ex: any) { this.reminderMsg = `Reminder sent to pending departments for ${ex.employee}`; setTimeout(() => { this.reminderMsg = ''; }, 3000); }
}
