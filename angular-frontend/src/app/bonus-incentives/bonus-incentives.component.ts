import { Component, OnInit } from '@angular/core';

interface BonusRecord {
  id: number; employee: string; empId: string; type: string;
  amount: number; reason: string; date: string; rating: number; status: string;
}

@Component({
  selector: 'app-bonus-incentives',
  template: `
    <div class="page-container page-enter">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="page-title">Bonus & Incentives</h1>
          <p style="color:var(--text-3);font-size:13px;">Performance · Festival · Referral · Spot Awards</p>
        </div>
        <div style="display:flex;gap:8px;">
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='add'" (click)="tab='add'">Add Bonus</button>
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='approvals'" (click)="tab='approvals'">Approvals</button>
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='history'" (click)="tab='history'">History</button>
        </div>
      </div>

      <!-- KPIs -->
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:24px;">
        <div class="kpi-card"><div class="kpi-val" style="color:#6b4df0;">₹{{totalDisbursed | number}}</div><div class="kpi-lbl">Total Disbursed (YTD)</div></div>
        <div class="kpi-card"><div class="kpi-val" style="color:#10b981;">{{approvedCount}}</div><div class="kpi-lbl">Approved This Year</div></div>
        <div class="kpi-card"><div class="kpi-val" style="color:#f59e0b;">{{pendingCount}}</div><div class="kpi-lbl">Pending Approval</div></div>
        <div class="kpi-card"><div class="kpi-val" style="color:#3b82f6;">₹{{avgBonus | number:'1.0-0'}}</div><div class="kpi-lbl">Average Bonus</div></div>
      </div>

      <!-- Bonus Type Cards -->
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:24px;">
        <div *ngFor="let t of bonusTypes" class="bonus-type-card" [style.border-color]="t.color">
          <div style="font-size:24px;margin-bottom:6px;">{{t.icon}}</div>
          <div style="font-weight:700;font-size:13px;">{{t.name}}</div>
          <div style="font-size:12px;color:var(--text-3);margin-top:4px;">{{t.count}} this year</div>
          <div style="font-weight:700;margin-top:4px;" [style.color]="t.color">₹{{t.total | number}}</div>
        </div>
      </div>

      <!-- ADD BONUS -->
      <div *ngIf="tab==='add'" class="card" style="max-width:560px;">
        <h3 style="font-weight:700;margin-bottom:16px;">New Bonus / Award</h3>
        <div style="display:flex;flex-direction:column;gap:14px;">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div>
              <label style="font-size:12px;font-weight:600;color:var(--text-3);">Employee</label>
              <select class="select" [(ngModel)]="form.employee" style="margin-top:4px;">
                <option value="">Select</option>
                <option *ngFor="let e of employees">{{e}}</option>
              </select>
            </div>
            <div>
              <label style="font-size:12px;font-weight:600;color:var(--text-3);">Bonus Type</label>
              <select class="select" [(ngModel)]="form.type" style="margin-top:4px;">
                <option value="">Select</option>
                <option *ngFor="let t of bonusTypes">{{t.name}}</option>
              </select>
            </div>
          </div>

          <!-- Performance Rating for Performance Bonus -->
          <div *ngIf="form.type==='Performance Bonus'">
            <label style="font-size:12px;font-weight:600;color:var(--text-3);">Performance Rating</label>
            <div style="display:flex;gap:8px;margin-top:6px;">
              <span *ngFor="let s of [1,2,3,4,5]" style="font-size:28px;cursor:pointer;" (click)="form.rating=s" [style.opacity]="s<=form.rating?1:0.3">⭐</span>
            </div>
            <div *ngIf="form.rating>0" style="font-size:13px;color:#6b4df0;font-weight:600;margin-top:4px;">Rating: {{form.rating}}/5 → Suggested: ₹{{suggestedBonus | number}}</div>
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div>
              <label style="font-size:12px;font-weight:600;color:var(--text-3);">Amount (₹)</label>
              <input class="input" type="number" [(ngModel)]="form.amount" style="margin-top:4px;">
            </div>
            <div>
              <label style="font-size:12px;font-weight:600;color:var(--text-3);">Date</label>
              <input class="input" type="date" [(ngModel)]="form.date" style="margin-top:4px;">
            </div>
          </div>
          <div>
            <label style="font-size:12px;font-weight:600;color:var(--text-3);">Reason / Description</label>
            <textarea class="textarea" [(ngModel)]="form.reason" rows="3" style="margin-top:4px;width:100%;"></textarea>
          </div>
          <button class="btn btn-primary" (click)="submitBonus()">Submit for Approval</button>
          <div *ngIf="msg" style="padding:10px;background:#d1fae5;border-radius:8px;color:#065f46;font-size:13px;font-weight:600;">{{msg}}</div>
        </div>
      </div>

      <!-- APPROVALS -->
      <div *ngIf="tab==='approvals'">
        <h3 style="font-weight:700;margin-bottom:16px;">Pending Bonus Approvals</h3>
        <div style="display:flex;flex-direction:column;gap:12px;">
          <div *ngFor="let b of pendingBonuses" class="card" style="display:flex;align-items:center;justify-content:space-between;">
            <div>
              <div style="font-weight:700;font-size:14px;">{{b.employee}} <span style="font-size:12px;font-weight:400;color:var(--text-3);">({{b.empId}})</span></div>
              <div style="font-size:12px;color:var(--text-3);">{{b.type}} · {{b.date}}</div>
              <div style="font-size:12px;color:var(--text-3);">{{b.reason}}</div>
              <div *ngIf="b.rating>0" style="margin-top:4px;">
                <span *ngFor="let s of [1,2,3,4,5]" [style.opacity]="s<=b.rating?1:0.3">⭐</span>
              </div>
            </div>
            <div style="display:flex;flex-direction:column;align-items:flex-end;gap:8px;">
              <div style="font-size:22px;font-weight:800;color:#6b4df0;">₹{{b.amount | number}}</div>
              <div style="display:flex;gap:6px;">
                <button class="btn btn-sm" style="background:#d1fae5;color:#065f46;" (click)="b.status='Approved'">Approve</button>
                <button class="btn btn-sm" style="background:#fee2e2;color:#991b1b;" (click)="b.status='Rejected'">Reject</button>
              </div>
            </div>
          </div>
          <div *ngIf="pendingBonuses.length===0" style="text-align:center;padding:32px;color:var(--text-3);">No pending approvals</div>
        </div>
      </div>

      <!-- HISTORY -->
      <div *ngIf="tab==='history'" class="card">
        <h3 style="font-weight:700;margin-bottom:16px;">Bonus History</h3>
        <table style="width:100%;border-collapse:collapse;">
          <thead><tr style="border-bottom:2px solid var(--border);">
            <th class="th">Employee</th><th class="th">Type</th><th class="th">Amount</th><th class="th">Rating</th><th class="th">Date</th><th class="th">Status</th>
          </tr></thead>
          <tbody>
            <tr *ngFor="let b of bonuses" style="border-bottom:1px solid var(--border);" class="tr-hover">
              <td class="td"><strong>{{b.employee}}</strong><div style="font-size:11px;color:var(--text-3);">{{b.empId}}</div></td>
              <td class="td"><span class="type-badge">{{b.type}}</span></td>
              <td class="td" style="font-weight:700;color:#6b4df0;">₹{{b.amount | number}}</td>
              <td class="td">
                <span *ngIf="b.rating>0">
                  <span *ngFor="let s of [1,2,3,4,5]" [style.opacity]="s<=b.rating?1:0.3" style="font-size:12px;">⭐</span>
                </span>
                <span *ngIf="b.rating===0" style="color:var(--text-3);">—</span>
              </td>
              <td class="td">{{b.date}}</td>
              <td class="td"><span class="spill" [class.approved]="b.status==='Approved'" [class.pending]="b.status==='Pending'" [class.rejected]="b.status==='Rejected'">{{b.status}}</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .kpi-card { background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px;text-align:center; }
    .kpi-val { font-size:26px;font-weight:800; }
    .kpi-lbl { font-size:12px;color:var(--text-3);margin-top:4px; }
    .bonus-type-card { background:var(--surface);border:2px solid var(--border);border-radius:12px;padding:16px;text-align:center; }
    .type-badge { padding:2px 8px;border-radius:6px;font-size:11px;font-weight:600;background:rgba(107,77,240,.1);color:#6b4df0; }
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
export class BonusIncentivesComponent implements OnInit {
  tab = 'add';
  msg = '';

  employees = ['Arjun Mehta', 'Priya Sharma', 'Rahul Gupta', 'Sneha Patel', 'Vikram Singh', 'Ananya Iyer', 'Kiran Desai', 'Rohan Nair'];

  bonusTypes = [
    { name: 'Performance Bonus', icon: '🏆', color: '#6b4df0', count: 8, total: 480000 },
    { name: 'Festival Bonus', icon: '🎉', color: '#f59e0b', count: 8, total: 160000 },
    { name: 'Referral Bonus', icon: '🤝', color: '#10b981', count: 3, total: 60000 },
    { name: 'Spot Award', icon: '⭐', color: '#3b82f6', count: 5, total: 50000 },
  ];

  form = { employee: '', type: '', amount: 0, reason: '', date: '', rating: 0 };

  bonuses: BonusRecord[] = [
    { id: 1, employee: 'Arjun Mehta', empId: 'EMP001', type: 'Performance Bonus', amount: 90000, reason: 'Outstanding delivery on HRMS project', date: '2026-04-30', rating: 5, status: 'Approved' },
    { id: 2, employee: 'Priya Sharma', empId: 'EMP002', type: 'Performance Bonus', amount: 70000, reason: 'HR digitization initiative', date: '2026-04-30', rating: 4, status: 'Approved' },
    { id: 3, employee: 'Rahul Gupta', empId: 'EMP003', type: 'Spot Award', amount: 15000, reason: 'Zero-downtime migration', date: '2026-03-15', rating: 0, status: 'Approved' },
    { id: 4, employee: 'Sneha Patel', empId: 'EMP004', type: 'Festival Bonus', amount: 20000, reason: 'Diwali bonus 2025', date: '2025-11-01', rating: 0, status: 'Approved' },
    { id: 5, employee: 'Vikram Singh', empId: 'EMP005', type: 'Referral Bonus', amount: 20000, reason: 'Referred Kiran Desai', date: '2026-01-15', rating: 0, status: 'Approved' },
    { id: 6, employee: 'Ananya Iyer', empId: 'EMP006', type: 'Performance Bonus', amount: 80000, reason: 'Client retention impact', date: '2026-04-30', rating: 5, status: 'Pending' },
    { id: 7, employee: 'Kiran Desai', empId: 'EMP007', type: 'Spot Award', amount: 10000, reason: 'Data pipeline automation', date: '2026-02-20', rating: 0, status: 'Approved' },
    { id: 8, employee: 'Rohan Nair', empId: 'EMP008', type: 'Performance Bonus', amount: 50000, reason: 'Network uptime 99.98%', date: '2026-04-30', rating: 4, status: 'Pending' },
  ];

  get totalDisbursed() { return this.bonuses.filter(b => b.status === 'Approved').reduce((s, b) => s + b.amount, 0); }
  get approvedCount() { return this.bonuses.filter(b => b.status === 'Approved').length; }
  get pendingCount() { return this.bonuses.filter(b => b.status === 'Pending').length; }
  get avgBonus() { const a = this.bonuses.filter(b => b.status === 'Approved'); return a.length ? a.reduce((s, b) => s + b.amount, 0) / a.length : 0; }
  get pendingBonuses() { return this.bonuses.filter(b => b.status === 'Pending'); }
  get suggestedBonus() { const base = 80000; return Math.round(base * this.form.rating / 5 / 1000) * 1000; }

  ngOnInit() {}

  submitBonus() {
    if (!this.form.employee || !this.form.type) { alert('Fill all required fields'); return; }
    this.bonuses.unshift({ id: Date.now(), employee: this.form.employee, empId: 'EMP00X', type: this.form.type, amount: this.form.amount, reason: this.form.reason, date: this.form.date, rating: this.form.rating, status: 'Pending' });
    this.msg = `Bonus submitted for ${this.form.employee}`;
    this.form = { employee: '', type: '', amount: 0, reason: '', date: '', rating: 0 };
    setTimeout(() => this.msg = '', 3000);
  }
}
