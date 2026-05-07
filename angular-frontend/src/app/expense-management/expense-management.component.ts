import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface Expense {
  id: number; employee: string; empId: string; category: string;
  amount: number; date: string; description: string; status: string;
}

@Component({
  selector: 'app-expense-management',
  template: `
    <div class="page-container page-enter">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="page-title">Expense Management</h1>
          <p style="color:var(--text-3);font-size:13px;">Claims · Approvals · Category Tracking</p>
        </div>
        <div style="display:flex;gap:8px;">
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='claim'" (click)="tab='claim'">New Claim</button>
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='pending'" (click)="tab='pending'">Pending</button>
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='history'" (click)="tab='history'">History</button>
        </div>
      </div>

      <!-- KPIs -->
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:24px;">
        <div class="kpi-card"><div class="kpi-val" style="color:#6b4df0;">₹{{totalClaims | number}}</div><div class="kpi-lbl">Total Claims This Month</div></div>
        <div class="kpi-card"><div class="kpi-val" style="color:#10b981;">₹{{approvedAmount | number}}</div><div class="kpi-lbl">Approved</div></div>
        <div class="kpi-card"><div class="kpi-val" style="color:#f59e0b;">{{pendingExpenses.length}}</div><div class="kpi-lbl">Pending Approval</div></div>
        <div class="kpi-card"><div class="kpi-val" style="color:#3b82f6;">{{expenses.length}}</div><div class="kpi-lbl">Total Claims</div></div>
      </div>

      <!-- Category Chart -->
      <div class="card" style="margin-bottom:24px;">
        <h3 style="font-weight:700;margin-bottom:16px;">Spend by Category</h3>
        <div style="display:flex;gap:16px;align-items:flex-end;height:120px;">
          <div *ngFor="let c of categoryStats" style="display:flex;flex-direction:column;align-items:center;gap:4px;flex:1;">
            <div style="font-size:11px;font-weight:600;color:#6b4df0;">₹{{c.total | number}}</div>
            <div style="width:100%;border-radius:4px 4px 0 0;transition:height .4s;" [style.height.px]="(c.total/maxCatVal)*90" [style.background]="c.color"></div>
            <div style="font-size:10px;color:var(--text-3);text-align:center;">{{c.name}}</div>
          </div>
        </div>
      </div>

      <!-- NEW CLAIM -->
      <div *ngIf="tab==='claim'" class="card" style="max-width:560px;">
        <h3 style="font-weight:700;margin-bottom:16px;">Submit Expense Claim</h3>
        <div style="display:flex;flex-direction:column;gap:14px;">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div>
              <label style="font-size:12px;font-weight:600;color:var(--text-3);">Employee</label>
              <select class="select" [(ngModel)]="form.employee" style="margin-top:4px;">
                <option value="">Select</option>
                <option *ngFor="let e of employees">{{e.name}}</option>
              </select>
            </div>
            <div>
              <label style="font-size:12px;font-weight:600;color:var(--text-3);">Category</label>
              <select class="select" [(ngModel)]="form.category" style="margin-top:4px;">
                <option value="">Select</option>
                <option *ngFor="let c of categories">{{c}}</option>
              </select>
            </div>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div>
              <label style="font-size:12px;font-weight:600;color:var(--text-3);">Amount (₹)</label>
              <input class="input" type="number" [(ngModel)]="form.amount" style="margin-top:4px;" placeholder="0.00">
            </div>
            <div>
              <label style="font-size:12px;font-weight:600;color:var(--text-3);">Date</label>
              <input class="input" type="date" [(ngModel)]="form.date" style="margin-top:4px;">
            </div>
          </div>
          <div>
            <label style="font-size:12px;font-weight:600;color:var(--text-3);">Description</label>
            <textarea class="textarea" [(ngModel)]="form.description" rows="3" placeholder="Describe the expense..." style="margin-top:4px;width:100%;"></textarea>
          </div>
          <div>
            <label style="font-size:12px;font-weight:600;color:var(--text-3);">Receipt</label>
            <div style="margin-top:4px;padding:24px;border:2px dashed var(--border);border-radius:8px;text-align:center;color:var(--text-3);cursor:pointer;" (click)="uploadReceipt()">
              📎 Click to upload receipt (JPG, PDF, PNG)
            </div>
          </div>
          <button class="btn btn-primary" (click)="submitClaim()">Submit Claim</button>
          <div *ngIf="msg" style="padding:10px;background:#d1fae5;border-radius:8px;color:#065f46;font-size:13px;font-weight:600;">{{msg}}</div>
        </div>
      </div>

      <!-- PENDING -->
      <div *ngIf="tab==='pending'">
        <h3 style="font-weight:700;margin-bottom:16px;">Pending Approvals ({{pendingExpenses.length}})</h3>
        <div style="display:flex;flex-direction:column;gap:12px;">
          <div *ngFor="let e of pendingExpenses" class="card" style="display:flex;align-items:center;justify-content:space-between;">
            <div style="display:flex;align-items:center;gap:16px;">
              <div class="cat-icon">{{catIcon(e.category)}}</div>
              <div>
                <div style="font-weight:700;font-size:14px;">{{e.employee}} <span style="font-size:12px;color:var(--text-3);">({{e.empId}})</span></div>
                <div style="font-size:12px;color:var(--text-3);">{{e.category}} · {{e.date}}</div>
                <div style="font-size:12px;color:var(--text-3);">{{e.description}}</div>
              </div>
            </div>
            <div style="display:flex;flex-direction:column;align-items:flex-end;gap:8px;">
              <div style="font-size:20px;font-weight:800;color:#6b4df0;">₹{{e.amount | number}}</div>
              <div style="display:flex;gap:6px;">
                <button class="btn btn-sm" style="background:#d1fae5;color:#065f46;" (click)="approve(e)">Approve</button>
                <button class="btn btn-sm" style="background:#fee2e2;color:#991b1b;" (click)="reject(e)">Reject</button>
              </div>
            </div>
          </div>
          <div *ngIf="pendingExpenses.length===0" style="text-align:center;padding:32px;color:var(--text-3);">No pending claims</div>
        </div>
      </div>

      <!-- HISTORY -->
      <div *ngIf="tab==='history'">
        <div style="display:flex;gap:12px;margin-bottom:16px;">
          <input class="input" style="max-width:220px;" placeholder="Search..." [(ngModel)]="search">
          <select class="select" style="max-width:150px;" [(ngModel)]="filterCat">
            <option value="">All Categories</option>
            <option *ngFor="let c of categories">{{c}}</option>
          </select>
          <select class="select" style="max-width:150px;" [(ngModel)]="filterStatus">
            <option value="">All Status</option>
            <option>Approved</option><option>Rejected</option><option>Pending</option>
          </select>
        </div>
        <div class="card">
          <table style="width:100%;border-collapse:collapse;">
            <thead><tr style="border-bottom:2px solid var(--border);">
              <th class="th">Employee</th><th class="th">Category</th><th class="th">Amount</th><th class="th">Date</th><th class="th">Description</th><th class="th">Status</th>
            </tr></thead>
            <tbody>
              <tr *ngFor="let e of filteredExpenses" style="border-bottom:1px solid var(--border);" class="tr-hover">
                <td class="td"><strong>{{e.employee}}</strong><div style="font-size:11px;color:var(--text-3);">{{e.empId}}</div></td>
                <td class="td"><span>{{catIcon(e.category)}} {{e.category}}</span></td>
                <td class="td" style="font-weight:700;color:#6b4df0;">₹{{e.amount | number}}</td>
                <td class="td">{{e.date}}</td>
                <td class="td" style="font-size:12px;color:var(--text-3);">{{e.description}}</td>
                <td class="td"><span class="spill" [class.approved]="e.status==='Approved'" [class.pending]="e.status==='Pending'" [class.rejected]="e.status==='Rejected'">{{e.status}}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .kpi-card { background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px;text-align:center; }
    .kpi-val { font-size:26px;font-weight:800; }
    .kpi-lbl { font-size:12px;color:var(--text-3);margin-top:4px; }
    .cat-icon { width:42px;height:42px;border-radius:10px;background:rgba(107,77,240,.1);display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0; }
    .th { padding:10px;text-align:left;font-size:12px;color:var(--text-3);font-weight:600; }
    .td { padding:10px;font-size:13px; }
    .tr-hover:hover { background:var(--surface-alt); }
    .spill { padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700; }
    .spill.approved { background:#d1fae5;color:#065f46; }
    .spill.pending { background:#fef3c7;color:#92400e; }
    .spill.rejected { background:#fee2e2;color:#991b1b; }
    .card { background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px;margin-bottom:16px; }
    .textarea { padding:8px 12px;border:1px solid var(--border);border-radius:8px;background:var(--surface);color:var(--text);resize:vertical;font-family:inherit;font-size:14px; }
  `]
})
export class ExpenseManagementComponent implements OnInit {
  private api = `${environment.apiUrl}/api/payroll`;
  constructor(private http: HttpClient) {}
  tab = 'claim';
  search = '';
  filterCat = '';
  filterStatus = '';
  msg = '';

  categories = ['Travel', 'Meal', 'Accommodation', 'Equipment', 'Other'];

  employees: any[] = [];

  form = { employee: '', category: '', amount: 0, date: '', description: '' };

  expenses: Expense[] = [];

  categoryStats: { name: string; total: number; color: string }[] = [];

  private catColors: { [k: string]: string } = { Travel: '#6b4df0', Accommodation: '#10b981', Equipment: '#3b82f6', Meal: '#f59e0b', Other: '#ec4899' };

  get maxCatVal() { return Math.max(...this.categoryStats.map(c => c.total), 1); }
  get totalClaims() { return this.expenses.reduce((s, e) => s + e.amount, 0); }
  get approvedAmount() { return this.expenses.filter(e => e.status === 'Approved').reduce((s, e) => s + e.amount, 0); }
  get pendingExpenses() { return this.expenses.filter(e => e.status === 'Pending'); }
  get filteredExpenses() {
    return this.expenses.filter(e =>
      (!this.search || e.employee.toLowerCase().includes(this.search.toLowerCase())) &&
      (!this.filterCat || e.category === this.filterCat) &&
      (!this.filterStatus || e.status === this.filterStatus)
    );
  }

  catIcon(cat: string): string {
    const m: { [k: string]: string } = { Travel: '✈️', Meal: '🍽️', Accommodation: '🏨', Equipment: '💻', Other: '📦' };
    return m[cat] || '📦';
  }

  ngOnInit() { this.loadExpenses(); this.loadEmployees(); }

  loadExpenses() {
    this.http.get<any[]>(`${this.api}/expenses`).subscribe(data => {
      this.expenses = (data || []).map(e => ({
        id: e.id, employee: e.employeeName || '', empId: e.employeeCode || '',
        category: e.category, amount: e.amount, date: e.expenseDate?.slice(0, 10) || '',
        description: e.description, status: e.status
      }));
      this.recomputeCategoryStats();
    });
  }

  loadEmployees() {
    this.http.get<any[]>(`${environment.apiUrl}/api/employees`).subscribe(data => {
      this.employees = (data || []).map(e => ({ name: `${e.firstName} ${e.lastName}`.trim(), empId: e.employeeCode || '' }));
    });
  }

  recomputeCategoryStats() {
    const totals: { [k: string]: number } = {};
    this.expenses.forEach(e => { totals[e.category] = (totals[e.category] || 0) + e.amount; });
    this.categoryStats = Object.entries(totals).map(([name, total]) => ({ name, total, color: this.catColors[name] || '#94a3b8' }));
  }

  submitClaim() {
    if (!this.form.employee || !this.form.category || !this.form.amount) { alert('Fill all required fields'); return; }
    const emp = this.employees.find(e => e.name === this.form.employee);
    const payload = {
      employeeName: this.form.employee, employeeCode: emp?.empId || '',
      category: this.form.category, amount: this.form.amount,
      expenseDate: this.form.date, description: this.form.description
    };
    this.http.post<any>(`${this.api}/expenses`, payload).subscribe({
      next: res => {
        this.expenses.unshift({ id: res.id, employee: this.form.employee, empId: emp?.empId || '', category: this.form.category, amount: this.form.amount, date: this.form.date, description: this.form.description, status: 'Pending' });
        this.recomputeCategoryStats();
        this.msg = `Expense claim of ₹${this.form.amount} submitted`;
        this.form = { employee: '', category: '', amount: 0, date: '', description: '' };
        setTimeout(() => this.msg = '', 3000);
      },
      error: err => alert(err?.error?.message || 'Failed to submit claim')
    });
  }

  approve(e: Expense) {
    this.http.patch(`${this.api}/expenses/${e.id}/status`, { status: 'Approved' }).subscribe({ next: () => { e.status = 'Approved'; } });
  }
  reject(e: Expense) {
    this.http.patch(`${this.api}/expenses/${e.id}/status`, { status: 'Rejected' }).subscribe({ next: () => { e.status = 'Rejected'; } });
  }
  uploadReceipt() { alert('Receipt upload triggered'); }
}
