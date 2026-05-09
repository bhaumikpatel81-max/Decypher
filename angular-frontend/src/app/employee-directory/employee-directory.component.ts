import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-employee-directory',
  template: `
    <div class="page-container page-enter">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="page-title">Employee Directory</h1>
          <p style="color:var(--text-3);font-size:13px;">{{ filtered.length }} employees · {{ departments.length }} departments</p>
        </div>
        <div style="display:flex;gap:8px;">
          <button class="btn btn-ghost btn-sm" [class.active-view]="view==='grid'" (click)="view='grid'">Grid</button>
          <button class="btn btn-ghost btn-sm" [class.active-view]="view==='list'" (click)="view='list'">List</button>
          <button class="btn btn-primary btn-sm" (click)="showForm=!showForm">+ Add Employee</button>
        </div>
      </div>

      <!-- Add form -->
      <div class="card mb-6" *ngIf="showForm">
        <h3 style="font-weight:700;margin-bottom:16px;">New Employee</h3>
        <div class="form-grid-4">
          <input class="input" placeholder="First name" [(ngModel)]="draft.firstName">
          <input class="input" placeholder="Last name" [(ngModel)]="draft.lastName">
          <input class="input" placeholder="Email" [(ngModel)]="draft.email">
          <input class="input" placeholder="Phone" [(ngModel)]="draft.phone">
          <input class="input" placeholder="Employee ID" [(ngModel)]="draft.empId">
          <input class="input" placeholder="Designation" [(ngModel)]="draft.designation">
          <select class="select" [(ngModel)]="draft.department">
            <option value="">Select department</option>
            <option *ngFor="let d of departments">{{d}}</option>
          </select>
          <select class="select" [(ngModel)]="draft.location">
            <option value="">Location</option>
            <option *ngFor="let l of locations">{{l}}</option>
            <option value="Other">Other</option>
          </select>
          <input class="input" placeholder="Reporting Manager" [(ngModel)]="draft.manager">
          <input class="input" type="date" [(ngModel)]="draft.doj" title="Date of Joining">
          <select class="select" [(ngModel)]="draft.employmentType">
            <option>Full-Time</option><option>Part-Time</option><option>Contract</option><option>Intern</option>
          </select>
          <select class="select" [(ngModel)]="draft.status">
            <option>Active</option><option>On Leave</option><option>Inactive</option>
          </select>
        </div>
        <div style="display:flex;gap:8px;margin-top:12px;align-items:center;">
          <button class="btn btn-primary" (click)="addEmployee()">Save Employee</button>
          <button class="btn btn-ghost" (click)="showForm=false">Cancel</button>
          <span *ngIf="saveError" style="font-size:13px;color:#991b1b;font-weight:600;">{{saveError}}</span>
        </div>
      </div>

      <!-- Filters -->
      <div class="card mb-6" style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
        <input class="input" style="max-width:260px;" placeholder="Search by name, ID, role..." [(ngModel)]="search" (input)="applyFilter()">
        <select class="select" style="max-width:180px;" [(ngModel)]="filterDept" (change)="applyFilter()">
          <option value="">All Departments</option>
          <option *ngFor="let d of departments">{{d}}</option>
        </select>
        <select class="select" style="max-width:160px;" [(ngModel)]="filterStatus" (change)="applyFilter()">
          <option value="">All Status</option>
          <option>Active</option><option>On Leave</option><option>Inactive</option>
        </select>
        <select class="select" style="max-width:160px;" [(ngModel)]="filterLocation" (change)="applyFilter()">
          <option value="">All Locations</option>
          <option *ngFor="let l of locations">{{l}}</option>
        </select>
      </div>

      <!-- Grid View -->
      <div class="emp-grid" *ngIf="view==='grid'">
        <div class="emp-card" *ngFor="let e of filtered" (click)="select(e)" [class.selected]="selected?.empId===e.empId">
          <div class="emp-avatar" [style.background]="e.avatarColor">{{e.initials}}</div>
          <div style="font-weight:700;font-size:14px;margin-top:8px;">{{e.firstName}} {{e.lastName}}</div>
          <div style="font-size:12px;color:var(--text-3);">{{e.designation}}</div>
          <div style="font-size:11px;color:var(--text-3);margin-top:2px;">{{e.department}}</div>
          <span class="status-pill" [class.active]="e.status==='Active'" [class.leave]="e.status==='On Leave'" [class.inactive]="e.status==='Inactive'">{{e.status}}</span>
          <div style="font-size:11px;color:var(--text-3);margin-top:6px;">📍 {{e.location}}</div>
        </div>
      </div>

      <!-- List View -->
      <div class="card" *ngIf="view==='list'">
        <table style="width:100%;border-collapse:collapse;">
          <thead>
            <tr style="border-bottom:2px solid var(--border);">
              <th class="th">Employee</th><th class="th">ID</th><th class="th">Department</th>
              <th class="th">Designation</th><th class="th">Location</th><th class="th">DOJ</th><th class="th">Status</th><th class="th">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let e of filtered" class="tr-row" (click)="select(e)">
              <td class="td">
                <div style="display:flex;align-items:center;gap:10px;">
                  <div class="emp-avatar-sm" [style.background]="e.avatarColor">{{e.initials}}</div>
                  <div>
                    <div style="font-weight:600;font-size:13px;">{{e.firstName}} {{e.lastName}}</div>
                    <div style="font-size:11px;color:var(--text-3);">{{e.email}}</div>
                  </div>
                </div>
              </td>
              <td class="td">{{e.empId}}</td>
              <td class="td">{{e.department}}</td>
              <td class="td">{{e.designation}}</td>
              <td class="td">{{e.location}}</td>
              <td class="td">{{e.doj}}</td>
              <td class="td"><span class="status-pill" [class.active]="e.status==='Active'" [class.leave]="e.status==='On Leave'" [class.inactive]="e.status==='Inactive'">{{e.status}}</span></td>
              <td class="td">
                <button class="btn btn-ghost btn-sm" (click)="select(e);$event.stopPropagation()">View</button>
                <button class="btn btn-ghost btn-sm" style="color:#ef4444;margin-left:4px;" (click)="remove(e);$event.stopPropagation()">Remove</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Employee Detail Panel -->
      <div class="detail-panel" *ngIf="selected">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
          <h3 style="font-weight:700;">Employee Profile</h3>
          <button class="btn btn-ghost btn-sm" (click)="selected=null">✕ Close</button>
        </div>
        <div style="display:flex;align-items:center;gap:16px;margin-bottom:20px;">
          <div class="emp-avatar-lg" [style.background]="selected.avatarColor">{{selected.initials}}</div>
          <div>
            <div style="font-size:20px;font-weight:800;">{{selected.firstName}} {{selected.lastName}}</div>
            <div style="color:var(--text-3);font-size:13px;">{{selected.designation}} · {{selected.department}}</div>
            <span class="status-pill" [class.active]="selected.status==='Active'">{{selected.status}}</span>
          </div>
        </div>
        <div class="detail-grid">
          <div class="detail-item"><span class="detail-label">Employee ID</span><span>{{selected.empId}}</span></div>
          <div class="detail-item"><span class="detail-label">Email</span><span>{{selected.email}}</span></div>
          <div class="detail-item"><span class="detail-label">Phone</span><span>{{selected.phone}}</span></div>
          <div class="detail-item"><span class="detail-label">Location</span><span>{{selected.location}}</span></div>
          <div class="detail-item"><span class="detail-label">Manager</span><span>{{selected.manager}}</span></div>
          <div class="detail-item"><span class="detail-label">Date of Joining</span><span>{{selected.doj}}</span></div>
          <div class="detail-item"><span class="detail-label">Employment Type</span><span>{{selected.employmentType}}</span></div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .form-grid-4 { display:grid; grid-template-columns:repeat(4,1fr); gap:10px; }
    .emp-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(180px,1fr)); gap:16px; margin-bottom:24px; }
    .emp-card { background:var(--surface); border:1px solid var(--border); border-radius:12px; padding:20px 16px; text-align:center; cursor:pointer; transition:all 150ms; }
    .emp-card:hover,.emp-card.selected { border-color:var(--brand-violet-400); box-shadow:0 4px 16px rgba(124,58,237,.12); }
    .emp-avatar { width:64px; height:64px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:20px; font-weight:800; color:#fff; margin:0 auto; }
    .emp-avatar-sm { width:36px; height:36px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:13px; font-weight:800; color:#fff; flex-shrink:0; }
    .emp-avatar-lg { width:80px; height:80px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:28px; font-weight:800; color:#fff; flex-shrink:0; }
    .status-pill { display:inline-block; padding:2px 10px; border-radius:20px; font-size:11px; font-weight:700; margin-top:6px; background:#f3f4f6; color:#6b7280; }
    .status-pill.active { background:#d1fae5; color:#065f46; }
    .status-pill.leave { background:#fef3c7; color:#92400e; }
    .status-pill.inactive { background:#fee2e2; color:#991b1b; }
    .th { padding:10px; text-align:left; font-size:12px; color:var(--text-3); font-weight:600; }
    .td { padding:12px 10px; border-bottom:1px solid var(--border); font-size:13px; }
    .tr-row { cursor:pointer; } .tr-row:hover { background:var(--surface-alt); }
    .active-view { background:var(--brand-violet-500)!important; color:#fff!important; }
    .detail-panel { background:var(--surface); border:1px solid var(--border); border-radius:14px; padding:24px; margin-top:20px; }
    .detail-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:12px; }
    .detail-item { display:flex; flex-direction:column; gap:2px; }
    .detail-label { font-size:11px; color:var(--text-3); font-weight:600; text-transform:uppercase; letter-spacing:.05em; }
  `]
})
export class EmployeeDirectoryComponent implements OnInit {
  private api = `${environment.apiUrl}/api/employees`;
  view: 'grid' | 'list' = 'grid';
  showForm = false;
  saveError = '';
  loading = false;
  search = ''; filterDept = ''; filterStatus = ''; filterLocation = '';
  selected: any = null;
  departments: string[] = [];
  locations: string[] = [];
  colors = ['#6b4df0','#2563eb','#10b981','#f59e0b','#db2777','#0891b2','#7c3aed','#059669','#dc2626','#8b5cf6'];

  employees: any[] = [];
  filtered: any[] = [];

  draft: any = { firstName:'', lastName:'', email:'', phone:'', employeeCode:'', designation:'', department:'', location:'', doj:'', employmentType:'Full-Time', status:'Active' };

  constructor(private http: HttpClient) {}

  ngOnInit() { this.loadEmployees(); }

  loadEmployees() {
    this.loading = true;
    const params: any = {};
    if (this.filterDept) params['department'] = this.filterDept;
    if (this.filterStatus) params['status'] = this.filterStatus;
    if (this.search) params['search'] = this.search;
    this.http.get<any[]>(this.api, { params }).subscribe({
      next: data => {
        this.employees = (data || []).map(e => this.decorate(e));
        this.filtered = this.employees;
        this.loading = false;
        // Derive dropdown options from loaded data
        this.departments = [...new Set(this.employees.map(e => e.department).filter(Boolean))].sort();
        this.locations   = [...new Set(this.employees.map(e => e.location).filter(Boolean))].sort();
      },
      error: () => { this.loading = false; }
    });
  }

  decorate(e: any) {
    const first = e.firstName || e.fullName?.split(' ')[0] || '?';
    const last = e.lastName || e.fullName?.split(' ')[1] || '';
    e.initials = (first[0] + (last[0] || '')).toUpperCase();
    e.empId = e.employeeCode || e.id;
    e.avatarColor = this.colors[(e.employeeCode || '').charCodeAt((e.employeeCode || 'A').length - 1) % this.colors.length];
    e.doj = e.dateOfJoining ? new Date(e.dateOfJoining).toISOString().slice(0, 10) : '';
    return e;
  }

  applyFilter() { this.loadEmployees(); }

  addEmployee() {
    if (!this.draft.firstName) return;
    const payload = {
      firstName: this.draft.firstName,
      lastName: this.draft.lastName,
      email: this.draft.email,
      phone: this.draft.phone,
      designation: this.draft.designation,
      department: this.draft.department,
      location: this.draft.location,
      dateOfJoining: this.draft.doj || new Date().toISOString(),
      employmentType: this.draft.employmentType,
      status: this.draft.status
    };
    this.http.post<any>(this.api, payload).subscribe({
      next: emp => {
        this.employees.unshift(this.decorate(emp));
        this.filtered = this.employees;
        this.draft = { firstName:'', lastName:'', email:'', phone:'', employeeCode:'', designation:'', department:'', location:'', doj:'', employmentType:'Full-Time', status:'Active' };
        this.showForm = false;
      },
      error: err => { this.saveError = err?.error?.message || 'Failed to save employee'; setTimeout(() => this.saveError = '', 4000); }
    });
  }

  select(e: any) { this.selected = this.selected?.id === e.id ? null : e; }

  remove(e: any) {
    if (!confirm(`Remove ${e.firstName} ${e.lastName}?`)) return;
    this.http.delete(`${this.api}/${e.id}`).subscribe({
      next: () => {
        this.employees = this.employees.filter(x => x.id !== e.id);
        this.filtered = this.employees;
        if (this.selected?.id === e.id) this.selected = null;
      }
    });
  }
}
