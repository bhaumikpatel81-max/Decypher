import { Component, OnInit } from '@angular/core';

interface LeaveRequest {
  id: number; employee: string; empId: string; type: string;
  from: string; to: string; days: number; reason: string;
  status: string; appliedOn: string;
}

@Component({
  selector: 'app-leave-management',
  template: `
    <div class="page-container page-enter">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="page-title">Leave Management</h1>
          <p style="color:var(--text-3);font-size:13px;">Apply · Approve · Track · Calendar</p>
        </div>
        <div style="display:flex;gap:8px;">
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='apply'" (click)="tab='apply'">Apply Leave</button>
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='approvals'" (click)="tab='approvals'">Approvals</button>
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='calendar'" (click)="tab='calendar'">Calendar</button>
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='history'" (click)="tab='history'">History</button>
        </div>
      </div>

      <!-- Balance Cards -->
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:24px;">
        <div *ngFor="let b of balances" class="balance-card" [style.border-color]="b.color">
          <div style="font-size:11px;font-weight:700;color:var(--text-3);text-transform:uppercase;margin-bottom:6px;">{{b.type}}</div>
          <div style="font-size:28px;font-weight:800;" [style.color]="b.color">{{b.used}}</div>
          <div style="font-size:12px;color:var(--text-3);">used of {{b.total}} days</div>
          <div style="margin-top:8px;background:var(--border);border-radius:4px;height:4px;">
            <div style="height:4px;border-radius:4px;transition:width .4s;" [style.width.%]="(b.used/b.total)*100" [style.background]="b.color"></div>
          </div>
          <div style="font-size:11px;margin-top:4px;color:var(--text-3);">{{b.total - b.used}} remaining</div>
        </div>
      </div>

      <!-- APPLY -->
      <div *ngIf="tab==='apply'" class="card" style="max-width:620px;">
        <h3 style="font-weight:700;margin-bottom:16px;">New Leave Request</h3>
        <div style="display:flex;flex-direction:column;gap:14px;">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div>
              <label style="font-size:12px;font-weight:600;color:var(--text-3);">Employee</label>
              <select class="select" [(ngModel)]="form.employee" style="margin-top:4px;">
                <option value="">Select employee</option>
                <option *ngFor="let e of employees">{{e}}</option>
              </select>
            </div>
            <div>
              <label style="font-size:12px;font-weight:600;color:var(--text-3);">Leave Type</label>
              <select class="select" [(ngModel)]="form.type" style="margin-top:4px;">
                <option value="">Select type</option>
                <option>Annual Leave</option>
                <option>Sick Leave</option>
                <option>Casual Leave</option>
                <option>Maternity Leave</option>
                <option>Paternity Leave</option>
                <option>Compensatory Off</option>
              </select>
            </div>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div>
              <label style="font-size:12px;font-weight:600;color:var(--text-3);">From Date</label>
              <input class="input" type="date" [(ngModel)]="form.from" style="margin-top:4px;">
            </div>
            <div>
              <label style="font-size:12px;font-weight:600;color:var(--text-3);">To Date</label>
              <input class="input" type="date" [(ngModel)]="form.to" style="margin-top:4px;">
            </div>
          </div>
          <div>
            <label style="font-size:12px;font-weight:600;color:var(--text-3);">Reason</label>
            <textarea class="textarea" [(ngModel)]="form.reason" rows="3" placeholder="Brief reason for leave..." style="margin-top:4px;width:100%;"></textarea>
          </div>
          <div style="display:flex;gap:10px;">
            <button class="btn btn-primary" (click)="submitLeave()">Submit Request</button>
            <button class="btn btn-ghost" (click)="resetForm()">Clear</button>
          </div>
          <div *ngIf="successMsg" style="padding:10px 14px;background:#d1fae5;border-radius:8px;color:#065f46;font-size:13px;font-weight:600;">{{successMsg}}</div>
        </div>
      </div>

      <!-- APPROVALS -->
      <div *ngIf="tab==='approvals'">
        <h3 style="font-weight:700;margin-bottom:16px;">Pending Approvals ({{pendingLeaves.length}})</h3>
        <div style="display:flex;flex-direction:column;gap:12px;">
          <div *ngFor="let l of pendingLeaves" class="card" style="display:flex;align-items:center;justify-content:space-between;">
            <div style="display:flex;align-items:center;gap:16px;">
              <div class="avatar">{{l.employee[0]}}</div>
              <div>
                <div style="font-weight:700;font-size:14px;">{{l.employee}}</div>
                <div style="font-size:12px;color:var(--text-3);">{{l.type}} · {{l.from}} to {{l.to}} ({{l.days}} days)</div>
                <div style="font-size:12px;color:var(--text-3);">{{l.reason}}</div>
              </div>
            </div>
            <div style="display:flex;gap:8px;">
              <button class="btn btn-sm" style="background:#d1fae5;color:#065f46;border:1px solid #6ee7b7;" (click)="approveLeave(l)">Approve</button>
              <button class="btn btn-sm" style="background:#fee2e2;color:#991b1b;border:1px solid #fca5a5;" (click)="rejectLeave(l)">Reject</button>
            </div>
          </div>
          <div *ngIf="pendingLeaves.length===0" style="padding:32px;text-align:center;color:var(--text-3);">No pending approvals</div>
        </div>
      </div>

      <!-- CALENDAR -->
      <div *ngIf="tab==='calendar'" class="card">
        <h3 style="font-weight:700;margin-bottom:16px;">Leave Calendar — May 2026</h3>
        <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:4px;margin-bottom:8px;">
          <div *ngFor="let d of dayHeaders" style="text-align:center;font-size:11px;font-weight:700;color:var(--text-3);padding:4px;">{{d}}</div>
        </div>
        <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:4px;">
          <div *ngFor="let cell of calCells" class="cal-cell"
               [class.cal-weekend]="cell.isWeekend"
               [class.cal-leave]="cell.hasLeave"
               [class.cal-today]="cell.isToday">
            <div style="font-size:12px;font-weight:600;">{{cell.day || ''}}</div>
            <div *ngIf="cell.hasLeave" style="font-size:9px;color:#6b4df0;margin-top:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">{{cell.who}}</div>
          </div>
        </div>
        <div style="margin-top:16px;display:flex;gap:16px;flex-wrap:wrap;">
          <div *ngFor="let e of employees" style="display:flex;align-items:center;gap:6px;font-size:12px;">
            <div class="avatar" style="width:20px;height:20px;font-size:9px;">{{e[0]}}</div>{{e}}
          </div>
        </div>
      </div>

      <!-- HISTORY -->
      <div *ngIf="tab==='history'">
        <div style="display:flex;gap:12px;margin-bottom:16px;">
          <input class="input" style="max-width:220px;" placeholder="Search employee..." [(ngModel)]="search">
          <select class="select" style="max-width:160px;" [(ngModel)]="filterStatus">
            <option value="">All Status</option>
            <option>Approved</option><option>Rejected</option><option>Pending</option>
          </select>
        </div>
        <div class="card">
          <table style="width:100%;border-collapse:collapse;">
            <thead>
              <tr style="border-bottom:2px solid var(--border);">
                <th class="th">Employee</th><th class="th">Type</th><th class="th">From</th><th class="th">To</th>
                <th class="th">Days</th><th class="th">Applied On</th><th class="th">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let l of filteredHistory" style="border-bottom:1px solid var(--border);" class="tr-hover">
                <td class="td"><div style="font-weight:600;">{{l.employee}}</div><div style="font-size:11px;color:var(--text-3);">{{l.empId}}</div></td>
                <td class="td">{{l.type}}</td>
                <td class="td">{{l.from}}</td>
                <td class="td">{{l.to}}</td>
                <td class="td"><strong>{{l.days}}</strong></td>
                <td class="td" style="font-size:12px;color:var(--text-3);">{{l.appliedOn}}</td>
                <td class="td">
                  <span class="status-pill" [class.approved]="l.status==='Approved'" [class.rejected]="l.status==='Rejected'" [class.pending]="l.status==='Pending'">{{l.status}}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .balance-card { background:var(--surface); border:2px solid var(--border); border-radius:12px; padding:20px; transition:border-color .2s; }
    .avatar { width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#6b4df0,#a78bfa);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:14px;flex-shrink:0; }
    .th { padding:10px;text-align:left;font-size:12px;color:var(--text-3);font-weight:600; }
    .td { padding:12px 10px;font-size:13px; }
    .tr-hover:hover { background:var(--surface-alt); }
    .status-pill { padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700; }
    .status-pill.approved { background:#d1fae5;color:#065f46; }
    .status-pill.rejected { background:#fee2e2;color:#991b1b; }
    .status-pill.pending { background:#fef3c7;color:#92400e; }
    .cal-cell { min-height:56px;border:1px solid var(--border);border-radius:6px;padding:4px;font-size:13px; }
    .cal-weekend { background:var(--surface-alt); }
    .cal-leave { background:rgba(107,77,240,.08);border-color:#a78bfa; }
    .cal-today { border-color:#6b4df0;border-width:2px; }
    .textarea { width:100%;padding:8px 12px;border:1px solid var(--border);border-radius:8px;background:var(--surface);color:var(--text);resize:vertical;font-family:inherit;font-size:14px; }
    .card { background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px;margin-bottom:16px; }
  `]
})
export class LeaveManagementComponent implements OnInit {
  tab = 'apply';
  search = '';
  filterStatus = '';
  successMsg = '';

  employees = ['Arjun Mehta', 'Priya Sharma', 'Rahul Gupta', 'Sneha Patel', 'Vikram Singh', 'Ananya Iyer'];

  balances = [
    { type: 'Annual Leave', used: 6, total: 18, color: '#6b4df0' },
    { type: 'Sick Leave', used: 2, total: 10, color: '#10b981' },
    { type: 'Casual Leave', used: 3, total: 8, color: '#f59e0b' },
    { type: 'Maternity Leave', used: 0, total: 180, color: '#ec4899' },
  ];

  form = { employee: '', type: '', from: '', to: '', reason: '' };

  dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  calCells: any[] = [];

  leaveRequests: LeaveRequest[] = [
    { id: 1, employee: 'Arjun Mehta', empId: 'EMP001', type: 'Annual Leave', from: '2026-05-10', to: '2026-05-12', days: 3, reason: 'Family trip', status: 'Pending', appliedOn: '2026-05-02' },
    { id: 2, employee: 'Priya Sharma', empId: 'EMP002', type: 'Sick Leave', from: '2026-05-06', to: '2026-05-07', days: 2, reason: 'Fever and rest', status: 'Approved', appliedOn: '2026-05-05' },
    { id: 3, employee: 'Rahul Gupta', empId: 'EMP003', type: 'Casual Leave', from: '2026-05-15', to: '2026-05-15', days: 1, reason: 'Personal work', status: 'Pending', appliedOn: '2026-05-04' },
    { id: 4, employee: 'Sneha Patel', empId: 'EMP004', type: 'Annual Leave', from: '2026-04-21', to: '2026-04-25', days: 5, reason: 'Vacation', status: 'Approved', appliedOn: '2026-04-10' },
    { id: 5, employee: 'Vikram Singh', empId: 'EMP005', type: 'Casual Leave', from: '2026-05-08', to: '2026-05-08', days: 1, reason: 'Bank work', status: 'Rejected', appliedOn: '2026-05-03' },
    { id: 6, employee: 'Ananya Iyer', empId: 'EMP006', type: 'Sick Leave', from: '2026-05-20', to: '2026-05-22', days: 3, reason: 'Medical procedure', status: 'Pending', appliedOn: '2026-05-05' },
  ];

  get pendingLeaves() { return this.leaveRequests.filter(l => l.status === 'Pending'); }

  get filteredHistory() {
    return this.leaveRequests.filter(l => {
      const matchSearch = !this.search || l.employee.toLowerCase().includes(this.search.toLowerCase());
      const matchStatus = !this.filterStatus || l.status === this.filterStatus;
      return matchSearch && matchStatus;
    });
  }

  ngOnInit() {
    this.buildCalendar();
  }

  buildCalendar() {
    const firstDay = new Date(2026, 4, 1).getDay();
    const daysInMonth = 31;
    const leaveDays: { [key: number]: string } = { 10: 'Arjun', 11: 'Arjun', 12: 'Arjun', 6: 'Priya', 7: 'Priya', 20: 'Ananya', 21: 'Ananya', 22: 'Ananya' };
    for (let i = 0; i < firstDay; i++) this.calCells.push({ day: '', isWeekend: false, hasLeave: false });
    for (let d = 1; d <= daysInMonth; d++) {
      const dow = (firstDay + d - 1) % 7;
      this.calCells.push({ day: d, isWeekend: dow === 0 || dow === 6, hasLeave: !!leaveDays[d], who: leaveDays[d] || '', isToday: d === 6 });
    }
  }

  submitLeave() {
    if (!this.form.employee || !this.form.type || !this.form.from || !this.form.to) { alert('Please fill all required fields'); return; }
    const from = new Date(this.form.from), to = new Date(this.form.to);
    const days = Math.ceil((to.getTime() - from.getTime()) / 86400000) + 1;
    this.leaveRequests.unshift({ id: Date.now(), employee: this.form.employee, empId: 'EMP00X', type: this.form.type, from: this.form.from, to: this.form.to, days, reason: this.form.reason, status: 'Pending', appliedOn: new Date().toISOString().slice(0, 10) });
    this.successMsg = `Leave request submitted for ${this.form.employee} (${days} days)`;
    this.resetForm();
    setTimeout(() => this.successMsg = '', 3000);
  }

  resetForm() { this.form = { employee: '', type: '', from: '', to: '', reason: '' }; }

  approveLeave(l: LeaveRequest) { l.status = 'Approved'; }
  rejectLeave(l: LeaveRequest) { l.status = 'Rejected'; }
}
