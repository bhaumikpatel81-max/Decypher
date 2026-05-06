import { Component, OnInit } from '@angular/core';

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
            <option>Ahmedabad HQ</option><option>Mumbai</option><option>Delhi</option><option>Bangalore</option><option>Remote</option>
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
        <div style="display:flex;gap:8px;margin-top:12px;">
          <button class="btn btn-primary" (click)="addEmployee()">Save Employee</button>
          <button class="btn btn-ghost" (click)="showForm=false">Cancel</button>
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
          <option>Ahmedabad HQ</option><option>Mumbai</option><option>Delhi</option><option>Bangalore</option><option>Remote</option>
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
  view: 'grid' | 'list' = 'grid';
  showForm = false;
  search = ''; filterDept = ''; filterStatus = ''; filterLocation = '';
  selected: any = null;
  departments = ['Engineering','HR','Finance','Sales','Marketing','Operations','Legal','Product'];
  colors = ['#6b4df0','#2563eb','#10b981','#f59e0b','#db2777','#0891b2','#7c3aed','#059669','#dc2626','#8b5cf6'];

  employees: any[] = [
    { empId:'EMP001', firstName:'Arjun', lastName:'Mehta', email:'arjun.m@amnex.com', phone:'9876543210', designation:'Sr. Engineer', department:'Engineering', location:'Ahmedabad HQ', manager:'Rohan Shah', doj:'2021-03-15', employmentType:'Full-Time', status:'Active' },
    { empId:'EMP002', firstName:'Priya', lastName:'Sharma', email:'priya.s@amnex.com', phone:'9876543211', designation:'HR Manager', department:'HR', location:'Ahmedabad HQ', manager:'Kavita Patel', doj:'2020-07-01', employmentType:'Full-Time', status:'Active' },
    { empId:'EMP003', firstName:'Rahul', lastName:'Gupta', email:'rahul.g@amnex.com', phone:'9876543212', designation:'Finance Analyst', department:'Finance', location:'Mumbai', manager:'Deepak Joshi', doj:'2022-01-10', employmentType:'Full-Time', status:'Active' },
    { empId:'EMP004', firstName:'Sneha', lastName:'Patel', email:'sneha.p@amnex.com', phone:'9876543213', designation:'Sales Executive', department:'Sales', location:'Delhi', manager:'Arjun Mehta', doj:'2023-04-05', employmentType:'Full-Time', status:'On Leave' },
    { empId:'EMP005', firstName:'Vikram', lastName:'Singh', email:'vikram.s@amnex.com', phone:'9876543214', designation:'Product Manager', department:'Product', location:'Bangalore', manager:'Priya Sharma', doj:'2019-11-20', employmentType:'Full-Time', status:'Active' },
    { empId:'EMP006', firstName:'Anjali', lastName:'Nair', email:'anjali.n@amnex.com', phone:'9876543215', designation:'UX Designer', department:'Product', location:'Remote', manager:'Vikram Singh', doj:'2022-09-12', employmentType:'Full-Time', status:'Active' },
    { empId:'EMP007', firstName:'Karan', lastName:'Malhotra', email:'karan.m@amnex.com', phone:'9876543216', designation:'Legal Counsel', department:'Legal', location:'Mumbai', manager:'Sneha Patel', doj:'2021-06-01', employmentType:'Full-Time', status:'Active' },
    { empId:'EMP008', firstName:'Divya', lastName:'Reddy', email:'divya.r@amnex.com', phone:'9876543217', designation:'Marketing Lead', department:'Marketing', location:'Bangalore', manager:'Rahul Gupta', doj:'2020-02-14', employmentType:'Full-Time', status:'Inactive' },
  ];
  filtered: any[] = [];

  draft: any = { firstName:'', lastName:'', email:'', phone:'', empId:'', designation:'', department:'', location:'', manager:'', doj:'', employmentType:'Full-Time', status:'Active' };

  ngOnInit() { this.employees.forEach(e => this.decorate(e)); this.applyFilter(); }

  decorate(e: any) {
    e.initials = (e.firstName[0] + e.lastName[0]).toUpperCase();
    e.avatarColor = this.colors[e.empId.charCodeAt(e.empId.length-1) % this.colors.length];
  }

  applyFilter() {
    this.filtered = this.employees.filter(e => {
      const q = this.search.toLowerCase();
      const matchSearch = !q || (e.firstName+' '+e.lastName+e.empId+e.designation).toLowerCase().includes(q);
      const matchDept = !this.filterDept || e.department === this.filterDept;
      const matchStatus = !this.filterStatus || e.status === this.filterStatus;
      const matchLoc = !this.filterLocation || e.location === this.filterLocation;
      return matchSearch && matchDept && matchStatus && matchLoc;
    });
  }

  addEmployee() {
    if (!this.draft.firstName || !this.draft.empId) return;
    const e = { ...this.draft };
    this.decorate(e);
    this.employees.unshift(e);
    this.applyFilter();
    this.draft = { firstName:'', lastName:'', email:'', phone:'', empId:'', designation:'', department:'', location:'', manager:'', doj:'', employmentType:'Full-Time', status:'Active' };
    this.showForm = false;
  }

  select(e: any) { this.selected = this.selected?.empId === e.empId ? null : e; }
  remove(e: any) { this.employees = this.employees.filter(x => x.empId !== e.empId); this.applyFilter(); if (this.selected?.empId === e.empId) this.selected = null; }
}
