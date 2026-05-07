import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface Employee {
  id: string; name: string; role: string;
  shifts: { [day: string]: string };
}

@Component({
  selector: 'app-shift-management',
  template: `
    <div class="page-container page-enter">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="page-title">Shift Management</h1>
          <p style="color:var(--text-3);font-size:13px;">Roster · Assign · Swap · Track</p>
        </div>
        <div style="display:flex;gap:8px;">
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='roster'" (click)="tab='roster'">Roster</button>
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='assign'" (click)="tab='assign'">Assign Shift</button>
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='swap'" (click)="tab='swap'">Swap Requests</button>
        </div>
      </div>

      <!-- Shift Type Legend -->
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:24px;">
        <div *ngFor="let s of shiftTypes" class="shift-legend-card" [style.border-color]="s.color">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
            <div style="width:12px;height:12px;border-radius:3px;" [style.background]="s.color"></div>
            <span style="font-weight:700;font-size:13px;">{{s.name}}</span>
          </div>
          <div style="font-size:12px;color:var(--text-3);">{{s.hours}}</div>
          <div style="font-size:22px;font-weight:800;margin-top:6px;" [style.color]="s.color">{{s.count}}</div>
          <div style="font-size:11px;color:var(--text-3);">employees today</div>
        </div>
      </div>

      <!-- ROSTER -->
      <div *ngIf="tab==='roster'" class="card" style="overflow-x:auto;">
        <h3 style="font-weight:700;margin-bottom:16px;">Weekly Roster — Week of May 4, 2026</h3>
        <table style="width:100%;border-collapse:collapse;min-width:700px;">
          <thead>
            <tr style="border-bottom:2px solid var(--border);">
              <th class="th" style="min-width:160px;">Employee</th>
              <th *ngFor="let d of days" class="th" style="text-align:center;">{{d}}</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let emp of employees" style="border-bottom:1px solid var(--border);" class="tr-hover">
              <td class="td">
                <div style="font-weight:600;font-size:13px;">{{emp.name}}</div>
                <div style="font-size:11px;color:var(--text-3);">{{emp.role}}</div>
              </td>
              <td *ngFor="let d of days" class="td" style="text-align:center;">
                <span class="shift-badge" [style.background]="shiftColor(emp.shifts[d])+'22'" [style.color]="shiftColor(emp.shifts[d])">
                  {{emp.shifts[d] || 'OFF'}}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- ASSIGN -->
      <div *ngIf="tab==='assign'" class="card" style="max-width:520px;">
        <h3 style="font-weight:700;margin-bottom:16px;">Assign Shift</h3>
        <div style="display:flex;flex-direction:column;gap:14px;">
          <div>
            <label style="font-size:12px;font-weight:600;color:var(--text-3);">Employee</label>
            <select class="select" [(ngModel)]="assignForm.empId" style="margin-top:4px;">
              <option value="">Select employee</option>
              <option *ngFor="let e of employees" [value]="e.id">{{e.name}}</option>
            </select>
          </div>
          <div>
            <label style="font-size:12px;font-weight:600;color:var(--text-3);">Week Starting</label>
            <input class="input" type="date" [(ngModel)]="assignForm.week" style="margin-top:4px;">
          </div>
          <div>
            <label style="font-size:12px;font-weight:600;color:var(--text-3);">Shift</label>
            <select class="select" [(ngModel)]="assignForm.shift" style="margin-top:4px;">
              <option value="">Select shift</option>
              <option *ngFor="let s of shiftTypes" [value]="s.code">{{s.name}} ({{s.hours}})</option>
            </select>
          </div>
          <div>
            <label style="font-size:12px;font-weight:600;color:var(--text-3);">Apply to Days</label>
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:6px;">
              <label *ngFor="let d of days" style="display:flex;align-items:center;gap:4px;font-size:13px;cursor:pointer;">
                <input type="checkbox" [checked]="assignForm.selectedDays.includes(d)" (change)="toggleDay(d)"> {{d}}
              </label>
            </div>
          </div>
          <button class="btn btn-primary" (click)="assignShift()">Assign Shift</button>
          <div *ngIf="assignMsg" style="padding:10px;background:#d1fae5;border-radius:8px;color:#065f46;font-size:13px;font-weight:600;">{{assignMsg}}</div>
        </div>
      </div>

      <!-- SWAP -->
      <div *ngIf="tab==='swap'">
        <h3 style="font-weight:700;margin-bottom:16px;">Shift Swap Requests</h3>
        <div style="display:flex;flex-direction:column;gap:12px;">
          <div *ngFor="let sw of swapRequests" class="card" style="display:flex;align-items:center;justify-content:space-between;">
            <div>
              <div style="font-weight:700;font-size:14px;">{{sw.empA}} ↔ {{sw.empB}}</div>
              <div style="font-size:12px;color:var(--text-3);margin-top:4px;">{{sw.empA}} ({{sw.shiftA}}) wants to swap with {{sw.empB}} ({{sw.shiftB}}) on {{sw.date}}</div>
              <div style="font-size:12px;color:var(--text-3);">Reason: {{sw.reason}}</div>
            </div>
            <div style="display:flex;flex-direction:column;align-items:flex-end;gap:8px;">
              <span class="status-pill" [class.approved]="sw.status==='Approved'" [class.pending]="sw.status==='Pending'" [class.rejected]="sw.status==='Rejected'">{{sw.status}}</span>
              <div *ngIf="sw.status==='Pending'" style="display:flex;gap:6px;">
                <button class="btn btn-sm" style="background:#d1fae5;color:#065f46;" (click)="sw.status='Approved'">Approve</button>
                <button class="btn btn-sm" style="background:#fee2e2;color:#991b1b;" (click)="sw.status='Rejected'">Reject</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .shift-legend-card { background:var(--surface);border:2px solid var(--border);border-radius:12px;padding:16px;transition:border-color .2s; }
    .shift-badge { padding:3px 8px;border-radius:6px;font-size:11px;font-weight:700;white-space:nowrap; }
    .th { padding:10px;text-align:left;font-size:12px;color:var(--text-3);font-weight:600; }
    .td { padding:10px;font-size:13px; }
    .tr-hover:hover { background:var(--surface-alt); }
    .status-pill { padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700; }
    .status-pill.approved { background:#d1fae5;color:#065f46; }
    .status-pill.pending { background:#fef3c7;color:#92400e; }
    .status-pill.rejected { background:#fee2e2;color:#991b1b; }
    .card { background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px;margin-bottom:16px; }
  `]
})
export class ShiftManagementComponent implements OnInit {
  private api = `${environment.apiUrl}/api/attendance`;
  constructor(private http: HttpClient) {}
  tab = 'roster';
  assignMsg = '';

  days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  shiftTypes = [
    { name: 'Morning', code: 'MOR', hours: '06:00 – 14:00', color: '#f59e0b', count: 3 },
    { name: 'General', code: 'GEN', hours: '09:00 – 18:00', color: '#6b4df0', count: 4 },
    { name: 'Evening', code: 'EVE', hours: '14:00 – 22:00', color: '#10b981', count: 2 },
    { name: 'Night', code: 'NGT', hours: '22:00 – 06:00', color: '#3b82f6', count: 1 },
  ];

  employees: Employee[] = [];

  assignForm = { empId: '', week: '', shift: '', selectedDays: [] as string[] };

  swapRequests: any[] = [];

  ngOnInit() { this.loadAssignments(); }

  loadAssignments() {
    this.http.get<any[]>(`${this.api}/shifts/assignments`).subscribe(data => {
      const empMap: { [id: string]: Employee } = {};
      (data || []).forEach(a => {
        if (!empMap[a.employeeId]) {
          empMap[a.employeeId] = { id: a.employeeId, name: a.employeeName || '', role: a.designation || '', shifts: {} };
        }
        const dayAbbr = new Date(a.date).toLocaleDateString('en-US', { weekday: 'short' }).slice(0, 3);
        empMap[a.employeeId].shifts[dayAbbr] = a.shiftCode || '';
      });
      this.employees = Object.values(empMap);
      if (!this.employees.length) this.loadEmployeesFallback();
    });
  }

  loadEmployeesFallback() {
    this.http.get<any[]>(`${environment.apiUrl}/api/employees`).subscribe(data => {
      this.employees = (data || []).map(e => ({
        id: e.employeeCode || e.id, name: `${e.firstName} ${e.lastName}`.trim(),
        role: e.designation || '', shifts: {}
      }));
    });
  }

  shiftColor(code: string): string {
    const map: { [k: string]: string } = { MOR: '#f59e0b', GEN: '#6b4df0', EVE: '#10b981', NGT: '#3b82f6' };
    return map[code] || '#94a3b8';
  }

  toggleDay(d: string) {
    const i = this.assignForm.selectedDays.indexOf(d);
    if (i > -1) this.assignForm.selectedDays.splice(i, 1);
    else this.assignForm.selectedDays.push(d);
  }

  assignShift() {
    if (!this.assignForm.empId || !this.assignForm.shift || !this.assignForm.selectedDays.length) { alert('Select employee, shift and days'); return; }
    const payload = { employeeId: this.assignForm.empId, shiftCode: this.assignForm.shift, weekStart: this.assignForm.week, days: this.assignForm.selectedDays };
    this.http.post(`${this.api}/shifts/assign`, payload).subscribe({
      next: () => {
        const emp = this.employees.find(e => e.id === this.assignForm.empId);
        if (emp) this.assignForm.selectedDays.forEach(d => emp.shifts[d] = this.assignForm.shift);
        this.assignMsg = `Shift ${this.assignForm.shift} assigned for ${this.assignForm.selectedDays.join(', ')}`;
        setTimeout(() => this.assignMsg = '', 3000);
      },
      error: err => alert(err?.error?.message || 'Failed to assign shift')
    });
  }
}
