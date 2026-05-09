import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../environments/environment';

interface RevisionRecord {
  id: number; employee: string; empId: string; dept: string;
  currentCTC: number; proposedCTC: number; hike: number;
  reason: string; effectiveDate: string; status: string;
}

@Component({
  selector: 'app-compensation-planning',
  template: `
    <div class="page-container page-enter">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="page-title">Compensation Planning</h1>
          <p style="color:var(--text-3);font-size:13px;">Salary Revision · Budget · Approval Workflow</p>
        </div>
        <div style="display:flex;gap:8px;">
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='cycles'" (click)="tab='cycles'">Revision Cycles</button>
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='revise'" (click)="tab='revise'">Revise Salary</button>
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='summary'" (click)="tab='summary'">Summary</button>
        </div>
      </div>

      <!-- KPIs -->
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:24px;">
        <div class="kpi-card"><div class="kpi-val" style="color:#6b4df0;">{{budgetUsedPct | number:'1.1-1'}}%</div><div class="kpi-lbl">Budget Utilized</div></div>
        <div class="kpi-card"><div class="kpi-val" style="color:#10b981;">{{approvedRevisions}}</div><div class="kpi-lbl">Approved Revisions</div></div>
        <div class="kpi-card"><div class="kpi-val" style="color:#f59e0b;">{{pendingRevisions}}</div><div class="kpi-lbl">Pending Approval</div></div>
        <div class="kpi-card"><div class="kpi-val" style="color:#3b82f6;">{{avgHike | number:'1.1-1'}}%</div><div class="kpi-lbl">Avg Hike %</div></div>
      </div>

      <!-- Budget Progress -->
      <div class="card" style="margin-bottom:24px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
          <h4 style="font-weight:700;">Budget: {{activeCycle?.name}} ({{activeCycle?.budget}}% CTC increase allowed)</h4>
          <span style="font-size:13px;font-weight:600;color:#6b4df0;">₹{{budgetUsed | number}} / ₹{{budgetTotal | number}}</span>
        </div>
        <div style="background:var(--border);border-radius:6px;height:12px;">
          <div style="height:12px;border-radius:6px;transition:width .4s;background:linear-gradient(90deg,#6b4df0,#a78bfa);" [style.width.%]="budgetUsedPct"></div>
        </div>
        <div style="display:flex;justify-content:space-between;margin-top:6px;font-size:12px;color:var(--text-3);">
          <span>Utilized: ₹{{budgetUsed | number}}</span>
          <span>Remaining: ₹{{(budgetTotal-budgetUsed) | number}}</span>
        </div>
      </div>

      <!-- CYCLES -->
      <div *ngIf="tab==='cycles'">
        <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:16px;margin-bottom:24px;">
          <div *ngFor="let c of cycles" class="card" [style.border-color]="c.active?'#6b4df0':'var(--border)'">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
              <div>
                <div style="font-weight:800;font-size:16px;">{{c.name}}</div>
                <div style="font-size:12px;color:var(--text-3);">{{c.year}} · Budget: {{c.budget}}% hike</div>
              </div>
              <span class="spill" [class.active]="c.active" [class.closed]="!c.active">{{c.active?'Active':'Closed'}}</span>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;font-size:12px;">
              <div style="text-align:center;padding:8px;background:var(--surface-alt);border-radius:8px;"><div style="font-weight:700;color:#6b4df0;">{{c.eligible}}</div><div style="color:var(--text-3);">Eligible</div></div>
              <div style="text-align:center;padding:8px;background:var(--surface-alt);border-radius:8px;"><div style="font-weight:700;color:#10b981;">{{c.approved}}</div><div style="color:var(--text-3);">Approved</div></div>
              <div style="text-align:center;padding:8px;background:var(--surface-alt);border-radius:8px;"><div style="font-weight:700;color:#f59e0b;">{{c.pending}}</div><div style="color:var(--text-3);">Pending</div></div>
            </div>
          </div>
        </div>

        <!-- Create Cycle -->
        <div class="card" style="max-width:480px;">
          <h4 style="font-weight:700;margin-bottom:14px;">Create New Revision Cycle</h4>
          <div style="display:flex;flex-direction:column;gap:12px;">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
              <div><label style="font-size:12px;font-weight:600;color:var(--text-3);">Cycle Name</label><input class="input" [(ngModel)]="newCycle.name" style="margin-top:4px;" placeholder="Annual Review 2027"></div>
              <div><label style="font-size:12px;font-weight:600;color:var(--text-3);">Year</label><input class="input" [(ngModel)]="newCycle.year" style="margin-top:4px;" placeholder="2027"></div>
            </div>
            <div><label style="font-size:12px;font-weight:600;color:var(--text-3);">Budget % (max hike allowed)</label><input class="input" type="number" [(ngModel)]="newCycle.budget" style="margin-top:4px;"></div>
            <button class="btn btn-primary" (click)="createCycle()">Create Cycle</button>
          <div *ngIf="cycleMsg" style="padding:10px;background:#d1fae5;border-radius:8px;color:#065f46;font-size:13px;font-weight:600;">{{cycleMsg}}</div>
          </div>
        </div>
      </div>

      <!-- REVISE -->
      <div *ngIf="tab==='revise'" class="card" style="max-width:580px;">
        <h3 style="font-weight:700;margin-bottom:16px;">Salary Revision Form</h3>
        <div style="display:flex;flex-direction:column;gap:14px;">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div>
              <label style="font-size:12px;font-weight:600;color:var(--text-3);">Employee</label>
              <select class="select" [(ngModel)]="revForm.empId" (ngModelChange)="onEmpChange()" style="margin-top:4px;">
                <option value="">Select</option>
                <option *ngFor="let e of employees" [value]="e.empId">{{e.name}}</option>
              </select>
            </div>
            <div>
              <label style="font-size:12px;font-weight:600;color:var(--text-3);">Current CTC (₹/yr)</label>
              <input class="input" type="number" [(ngModel)]="revForm.currentCTC" (ngModelChange)="calcHike()" style="margin-top:4px;" readonly>
            </div>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div>
              <label style="font-size:12px;font-weight:600;color:var(--text-3);">Proposed CTC (₹/yr)</label>
              <input class="input" type="number" [(ngModel)]="revForm.proposedCTC" (ngModelChange)="calcHike()" style="margin-top:4px;">
            </div>
            <div>
              <label style="font-size:12px;font-weight:600;color:var(--text-3);">% Hike</label>
              <div class="input" style="margin-top:4px;font-weight:800;" [style.color]="revForm.hike>activeCycle.budget?'#ef4444':'#10b981'">{{revForm.hike | number:'1.1-1'}}%</div>
            </div>
          </div>
          <div>
            <label style="font-size:12px;font-weight:600;color:var(--text-3);">Reason for Revision</label>
            <textarea class="textarea" [(ngModel)]="revForm.reason" rows="3" style="margin-top:4px;width:100%;"></textarea>
          </div>
          <div>
            <label style="font-size:12px;font-weight:600;color:var(--text-3);">Effective Date</label>
            <input class="input" type="date" [(ngModel)]="revForm.effectiveDate" style="margin-top:4px;">
          </div>
          <div *ngIf="revForm.hike > activeCycle.budget" style="padding:10px;background:#fee2e2;border-radius:8px;color:#991b1b;font-size:13px;">⚠ Proposed hike exceeds budget limit of {{activeCycle.budget}}%</div>
          <button class="btn btn-primary" (click)="submitRevision()">Submit for Approval</button>
          <div *ngIf="revMsg" style="padding:10px;background:#d1fae5;border-radius:8px;color:#065f46;font-size:13px;font-weight:600;">{{revMsg}}</div>
        </div>
      </div>

      <!-- SUMMARY -->
      <div *ngIf="tab==='summary'" class="card">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
          <h3 style="font-weight:700;">Revision Summary Table</h3>
          <button class="btn btn-ghost btn-sm" (click)="exportRevisions()">Export</button>
        </div>
        <table style="width:100%;border-collapse:collapse;">
          <thead><tr style="border-bottom:2px solid var(--border);">
            <th class="th">Employee</th><th class="th">Current CTC</th><th class="th">Proposed CTC</th><th class="th">Hike %</th><th class="th">Effective</th><th class="th">Status</th><th class="th">Letter</th>
          </tr></thead>
          <tbody>
            <tr *ngFor="let r of revisions" style="border-bottom:1px solid var(--border);" class="tr-hover">
              <td class="td"><div style="font-weight:600;">{{r.employee}}</div><div style="font-size:11px;color:var(--text-3);">{{r.empId}} · {{r.dept}}</div></td>
              <td class="td">₹{{r.currentCTC | number}}</td>
              <td class="td" style="font-weight:600;color:#10b981;">₹{{r.proposedCTC | number}}</td>
              <td class="td"><span style="font-weight:700;" [style.color]="r.hike>15?'#6b4df0':'#10b981'">{{r.hike}}%</span></td>
              <td class="td">{{r.effectiveDate}}</td>
              <td class="td"><span class="spill" [class.approved2]="r.status==='Approved'" [class.pending2]="r.status==='Pending'" [class.rejected2]="r.status==='Rejected'">{{r.status}}</span></td>
              <td class="td"><button class="btn btn-ghost btn-sm" *ngIf="r.status==='Approved'" (click)="generateLetter(r)">Generate</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .kpi-card { background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px;text-align:center; }
    .kpi-val { font-size:28px;font-weight:800; }
    .kpi-lbl { font-size:12px;color:var(--text-3);margin-top:4px; }
    .spill { padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700; }
    .spill.active { background:rgba(107,77,240,.1);color:#6b4df0; }
    .spill.closed { background:var(--surface-alt);color:var(--text-3); }
    .spill.approved2 { background:#d1fae5;color:#065f46; }
    .spill.pending2 { background:#fef3c7;color:#92400e; }
    .spill.rejected2 { background:#fee2e2;color:#991b1b; }
    .th { padding:10px;text-align:left;font-size:12px;color:var(--text-3);font-weight:600; }
    .td { padding:10px;font-size:13px; }
    .tr-hover:hover { background:var(--surface-alt); }
    .card { background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px;margin-bottom:16px; }
    .textarea { padding:8px 12px;border:1px solid var(--border);border-radius:8px;background:var(--surface);color:var(--text);resize:vertical;font-family:inherit;font-size:14px; }
  `]
})
export class CompensationPlanningComponent implements OnInit {
  private api = `${environment.apiUrl}/api/payroll`;
  constructor(private http: HttpClient, private snack: MatSnackBar) {}
  tab = 'cycles';
  revMsg = '';
  cycleMsg = '';

  employees: any[] = [];
  cycles: any[] = [];
  revisions: RevisionRecord[] = [];

  newCycle = { name: '', year: '', budget: 10 };
  revForm = { empId: '', currentCTC: 0, proposedCTC: 0, hike: 0, reason: '', effectiveDate: '' };

  get activeCycle() { return this.cycles.find(c => c.active) || this.cycles[0] || { name: '', budget: 12 }; }
  get budgetTotal() { return this.revisions.reduce((s, r) => s + r.currentCTC * ((this.activeCycle?.budget || 12) / 100), 0); }
  get budgetUsed() { return this.revisions.filter(r => r.status !== 'Rejected').reduce((s, r) => s + (r.proposedCTC - r.currentCTC), 0); }
  get budgetUsedPct() { return this.budgetTotal ? Math.min((this.budgetUsed / this.budgetTotal) * 100, 100) : 0; }
  get approvedRevisions() { return this.revisions.filter(r => r.status === 'Approved').length; }
  get pendingRevisions() { return this.revisions.filter(r => r.status === 'Pending').length; }
  get avgHike() { const a = this.revisions.filter(r => r.status === 'Approved'); return a.length ? a.reduce((s, r) => s + r.hike, 0) / a.length : 0; }

  ngOnInit() { this.loadRevisions(); this.loadEmployees(); }

  loadRevisions() {
    this.http.get<any[]>(`${this.api}/compensation/reviews`).subscribe({
      next: data => {
        this.revisions = [...(data || []).map(r => ({
          id: r.id, employee: r.employeeName || '', empId: r.employeeCode || '', dept: r.department || '',
          currentCTC: r.currentCTC || 0, proposedCTC: r.proposedCTC || 0, hike: r.hikePercentage || 0,
          reason: r.reason || '', effectiveDate: r.effectiveDate?.slice(0, 10) || '', status: r.status || 'Pending'
        }))];
      },
      error: () => this.snack.open('Failed to load revision data', 'Close', { duration: 3000 })
    });
  }

  loadEmployees() {
    this.http.get<any[]>(`${environment.apiUrl}/api/employees`).subscribe({
      next: data => {
        this.employees = [...(data || []).map(e => ({
          empId: e.employeeCode || e.id, name: `${e.firstName} ${e.lastName}`.trim(),
          dept: e.department || '', ctc: e.salary || 0
        }))];
      },
      error: () => {}
    });
  }

  onEmpChange() {
    const emp = this.employees.find(e => e.empId === this.revForm.empId);
    if (emp) { this.revForm.currentCTC = emp.ctc; this.revForm.proposedCTC = 0; this.revForm.hike = 0; }
  }

  calcHike() {
    if (this.revForm.currentCTC > 0 && this.revForm.proposedCTC > 0)
      this.revForm.hike = Math.round(((this.revForm.proposedCTC - this.revForm.currentCTC) / this.revForm.currentCTC) * 1000) / 10;
  }

  submitRevision() {
    if (!this.revForm.empId || !this.revForm.proposedCTC) { this.snack.open('Fill all required fields', 'Close', { duration: 3000 }); return; }
    const emp = this.employees.find(e => e.empId === this.revForm.empId);
    const payload = { employeeCode: this.revForm.empId, employeeName: emp?.name, department: emp?.dept, currentCTC: this.revForm.currentCTC, proposedCTC: this.revForm.proposedCTC, hikePercentage: this.revForm.hike, reason: this.revForm.reason, effectiveDate: this.revForm.effectiveDate };
    this.http.post<any>(`${this.api}/compensation/reviews`, payload).subscribe({
      next: res => {
        this.revisions = [...this.revisions, { id: res.id, employee: emp?.name || '', empId: this.revForm.empId, dept: emp?.dept || '', currentCTC: this.revForm.currentCTC, proposedCTC: this.revForm.proposedCTC, hike: this.revForm.hike, reason: this.revForm.reason, effectiveDate: this.revForm.effectiveDate, status: 'Pending' }];
        this.snack.open('Revision submitted for approval', '', { duration: 2000 });
        this.revForm = { empId: '', currentCTC: 0, proposedCTC: 0, hike: 0, reason: '', effectiveDate: '' };
      },
      error: err => this.snack.open(err?.error?.message || 'Failed to submit revision', 'Close', { duration: 3000 })
    });
  }

  createCycle() {
    if (!this.newCycle.name) { this.snack.open('Enter a cycle name', 'Close', { duration: 3000 }); return; }
    const payload = { name: this.newCycle.name, year: +this.newCycle.year || new Date().getFullYear(), budgetPercentage: this.newCycle.budget };
    this.http.post<any>(`${this.api}/compensation/cycles`, payload).subscribe({
      next: res => {
        this.cycles = [...this.cycles, { name: res.name || this.newCycle.name, year: res.year || this.newCycle.year, budget: res.budgetPercentage || this.newCycle.budget, eligible: 0, approved: 0, pending: 0, active: true }];
        this.snack.open('Revision cycle created', '', { duration: 2000 });
        this.newCycle = { name: '', year: '', budget: 10 };
      },
      error: () => {
        this.cycles = [...this.cycles, { name: this.newCycle.name, year: +this.newCycle.year, budget: this.newCycle.budget, eligible: 0, approved: 0, pending: 0, active: true }];
        this.snack.open('Cycle saved locally — backend sync pending', '', { duration: 3000 });
        this.newCycle = { name: '', year: '', budget: 10 };
      }
    });
  }

  generateLetter(r: RevisionRecord) {
    window.open(`${this.api}/compensation/reviews/${r.id}/letter`, '_blank');
  }

  exportRevisions() {
    window.open(`${this.api}/compensation/reviews/export/excel`, '_blank');
  }
}
