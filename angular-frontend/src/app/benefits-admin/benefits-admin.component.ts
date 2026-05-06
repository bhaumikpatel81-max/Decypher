import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-benefits-admin',
  template: `
    <div class="page-container page-enter">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="page-title">Benefits Administration</h1>
          <p style="color:var(--text-3);font-size:13px;">Catalogue · Enrollment · Flex Points · Claims</p>
        </div>
        <div style="display:flex;gap:8px;">
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='catalogue'" (click)="tab='catalogue'">Benefits Catalogue</button>
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='enroll'" (click)="tab='enroll'">Enrollment</button>
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='flex'" (click)="tab='flex'">Flex Points</button>
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='claims'" (click)="tab='claims'">Claims History</button>
        </div>
      </div>

      <!-- KPIs -->
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:24px;">
        <div class="kpi-card"><div class="kpi-val" style="color:#6b4df0;">{{benefits.length}}</div><div class="kpi-lbl">Total Benefits</div></div>
        <div class="kpi-card"><div class="kpi-val" style="color:#10b981;">₹{{totalBenefitCost | number}}</div><div class="kpi-lbl">Monthly Cost</div></div>
        <div class="kpi-card"><div class="kpi-val" style="color:#f59e0b;">{{totalEnrolled}}</div><div class="kpi-lbl">Total Enrollments</div></div>
        <div class="kpi-card"><div class="kpi-val" style="color:#3b82f6;">{{claimsHistory.length}}</div><div class="kpi-lbl">Claims This Month</div></div>
      </div>

      <!-- CATALOGUE -->
      <div *ngIf="tab==='catalogue'">
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;">
          <div *ngFor="let b of benefits" class="benefit-card">
            <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
              <div class="benefit-icon">{{b.icon}}</div>
              <div>
                <div style="font-weight:700;font-size:15px;">{{b.name}}</div>
                <div style="font-size:12px;color:var(--text-3);">{{b.category}}</div>
              </div>
            </div>
            <div style="font-size:13px;color:var(--text-3);margin-bottom:12px;">{{b.description}}</div>
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <div>
                <div style="font-size:11px;color:var(--text-3);">Monthly Cost</div>
                <div style="font-weight:700;color:#6b4df0;">₹{{b.cost | number}}</div>
              </div>
              <div>
                <div style="font-size:11px;color:var(--text-3);">Enrolled</div>
                <div style="font-weight:700;color:#10b981;">{{b.enrolled}} / {{employees.length}}</div>
              </div>
            </div>
            <div style="margin-top:10px;background:var(--border);border-radius:4px;height:4px;">
              <div style="height:4px;border-radius:4px;background:#6b4df0;" [style.width.%]="(b.enrolled/employees.length)*100"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- ENROLLMENT -->
      <div *ngIf="tab==='enroll'">
        <div style="display:flex;gap:12px;margin-bottom:16px;">
          <select class="select" style="max-width:220px;" [(ngModel)]="selectedEmpId">
            <option value="">Filter by Employee</option>
            <option *ngFor="let e of employees" [value]="e.id">{{e.name}}</option>
          </select>
        </div>
        <div class="card" style="overflow-x:auto;">
          <table style="width:100%;border-collapse:collapse;min-width:700px;">
            <thead><tr style="border-bottom:2px solid var(--border);">
              <th class="th">Employee</th>
              <th class="th" *ngFor="let b of benefits" style="text-align:center;">{{b.icon}} {{b.name}}</th>
            </tr></thead>
            <tbody>
              <tr *ngFor="let e of filteredEmployees" style="border-bottom:1px solid var(--border);" class="tr-hover">
                <td class="td"><div style="font-weight:600;">{{e.name}}</div><div style="font-size:11px;color:var(--text-3);">{{e.role}}</div></td>
                <td *ngFor="let b of benefits" class="td" style="text-align:center;">
                  <input type="checkbox" [checked]="isEnrolled(e.id, b.id)" (change)="toggleEnrollment(e.id, b.id)" style="width:16px;height:16px;cursor:pointer;">
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- FLEX POINTS -->
      <div *ngIf="tab==='flex'">
        <p style="color:var(--text-3);font-size:13px;margin-bottom:16px;">Each employee has 1000 flex points/year to allocate across benefits</p>
        <div style="display:flex;flex-direction:column;gap:16px;">
          <div *ngFor="let e of employees" class="card">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
              <div style="display:flex;align-items:center;gap:10px;">
                <div class="avatar">{{e.name[0]}}</div>
                <div>
                  <div style="font-weight:700;">{{e.name}}</div>
                  <div style="font-size:12px;color:var(--text-3);">{{e.role}}</div>
                </div>
              </div>
              <div style="text-align:right;">
                <div style="font-weight:700;color:#6b4df0;">{{e.pointsUsed}} / 1000 pts</div>
                <div style="font-size:12px;color:var(--text-3);">{{1000-e.pointsUsed}} remaining</div>
              </div>
            </div>
            <div style="background:var(--border);border-radius:4px;height:8px;margin-bottom:12px;">
              <div style="height:8px;border-radius:4px;" [style.width.%]="(e.pointsUsed/1000)*100" [style.background]="e.pointsUsed>900?'#ef4444':'#6b4df0'"></div>
            </div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;">
              <div *ngFor="let f of e.flexAllocations" style="padding:4px 10px;border-radius:6px;font-size:12px;background:rgba(107,77,240,.08);color:#6b4df0;font-weight:600;">
                {{f.benefit}}: {{f.points}}pts
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- CLAIMS -->
      <div *ngIf="tab==='claims'" class="card">
        <h3 style="font-weight:700;margin-bottom:16px;">Benefits Claims History</h3>
        <table style="width:100%;border-collapse:collapse;">
          <thead><tr style="border-bottom:2px solid var(--border);">
            <th class="th">Employee</th><th class="th">Benefit</th><th class="th">Amount</th><th class="th">Date</th><th class="th">Status</th>
          </tr></thead>
          <tbody>
            <tr *ngFor="let c of claimsHistory" style="border-bottom:1px solid var(--border);" class="tr-hover">
              <td class="td"><strong>{{c.employee}}</strong></td>
              <td class="td">{{c.benefit}}</td>
              <td class="td" style="font-weight:700;color:#6b4df0;">₹{{c.amount | number}}</td>
              <td class="td">{{c.date}}</td>
              <td class="td"><span class="spill" [class.approved]="c.status==='Approved'" [class.pending]="c.status==='Pending'">{{c.status}}</span></td>
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
    .benefit-card { background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px; }
    .benefit-icon { width:44px;height:44px;border-radius:12px;background:rgba(107,77,240,.1);display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0; }
    .avatar { width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#6b4df0,#a78bfa);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:14px;flex-shrink:0; }
    .th { padding:10px;text-align:left;font-size:12px;color:var(--text-3);font-weight:600; }
    .td { padding:10px;font-size:13px; }
    .tr-hover:hover { background:var(--surface-alt); }
    .spill { padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700; }
    .spill.approved { background:#d1fae5;color:#065f46; }
    .spill.pending { background:#fef3c7;color:#92400e; }
    .card { background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px;margin-bottom:16px; }
  `]
})
export class BenefitsAdminComponent implements OnInit {
  tab = 'catalogue';
  selectedEmpId = '';

  benefits = [
    { id: 'b1', name: 'Health Insurance', category: 'Insurance', icon: '🏥', description: 'Comprehensive family floater health cover ₹5L', cost: 2500, enrolled: 8 },
    { id: 'b2', name: 'Life Insurance', category: 'Insurance', icon: '🛡️', description: 'Term life insurance 10x annual CTC', cost: 800, enrolled: 7 },
    { id: 'b3', name: 'Meal Card', category: 'Allowance', icon: '🍽️', description: 'Sodexo meal card ₹2200/month', cost: 2200, enrolled: 6 },
    { id: 'b4', name: 'Gym Membership', category: 'Wellness', icon: '💪', description: 'CultFit or local gym subscription', cost: 1000, enrolled: 4 },
    { id: 'b5', name: 'Learning Budget', category: 'Development', icon: '📚', description: '₹25,000/year for courses & certifications', cost: 2083, enrolled: 6 },
    { id: 'b6', name: 'WFH Allowance', category: 'Allowance', icon: '🏠', description: 'Work from home internet & equipment stipend', cost: 1500, enrolled: 5 },
  ];

  employees = [
    { id: 'EMP001', name: 'Arjun Mehta', role: 'Sr. Developer', pointsUsed: 750, flexAllocations: [{ benefit: 'Health', points: 300 }, { benefit: 'Learning', points: 250 }, { benefit: 'WFH', points: 200 }] },
    { id: 'EMP002', name: 'Priya Sharma', role: 'HR Manager', pointsUsed: 920, flexAllocations: [{ benefit: 'Health', points: 300 }, { benefit: 'Meal', points: 220 }, { benefit: 'Gym', points: 400 }] },
    { id: 'EMP003', name: 'Rahul Gupta', role: 'DevOps', pointsUsed: 600, flexAllocations: [{ benefit: 'Health', points: 300 }, { benefit: 'Learning', points: 300 }] },
    { id: 'EMP004', name: 'Sneha Patel', role: 'QA Lead', pointsUsed: 550, flexAllocations: [{ benefit: 'Health', points: 300 }, { benefit: 'WFH', points: 250 }] },
    { id: 'EMP005', name: 'Vikram Singh', role: 'Support', pointsUsed: 400, flexAllocations: [{ benefit: 'Health', points: 300 }, { benefit: 'Meal', points: 100 }] },
    { id: 'EMP006', name: 'Ananya Iyer', role: 'Business Analyst', pointsUsed: 800, flexAllocations: [{ benefit: 'Health', points: 300 }, { benefit: 'Life', points: 200 }, { benefit: 'Learning', points: 300 }] },
    { id: 'EMP007', name: 'Kiran Desai', role: 'Data Analyst', pointsUsed: 680, flexAllocations: [{ benefit: 'Health', points: 300 }, { benefit: 'Learning', points: 380 }] },
    { id: 'EMP008', name: 'Rohan Nair', role: 'Network Admin', pointsUsed: 480, flexAllocations: [{ benefit: 'Health', points: 300 }, { benefit: 'WFH', points: 180 }] },
  ];

  enrollments: { [empId: string]: string[] } = {
    EMP001: ['b1', 'b2', 'b5', 'b6'], EMP002: ['b1', 'b2', 'b3', 'b4'],
    EMP003: ['b1', 'b5'], EMP004: ['b1', 'b6'], EMP005: ['b1', 'b3'],
    EMP006: ['b1', 'b2', 'b5'], EMP007: ['b1', 'b5'], EMP008: ['b1', 'b6'],
  };

  claimsHistory = [
    { employee: 'Arjun Mehta', benefit: 'Health Insurance', amount: 18500, date: '2026-04-12', status: 'Approved' },
    { employee: 'Priya Sharma', benefit: 'Learning Budget', amount: 12000, date: '2026-04-15', status: 'Approved' },
    { employee: 'Ananya Iyer', benefit: 'Gym Membership', amount: 8000, date: '2026-05-01', status: 'Pending' },
    { employee: 'Rahul Gupta', benefit: 'WFH Allowance', amount: 4500, date: '2026-05-03', status: 'Pending' },
    { employee: 'Sneha Patel', benefit: 'Meal Card', amount: 2200, date: '2026-04-30', status: 'Approved' },
  ];

  get totalBenefitCost() { return this.benefits.reduce((s, b) => s + b.cost * b.enrolled, 0); }
  get totalEnrolled() { return Object.values(this.enrollments).reduce((s, arr) => s + arr.length, 0); }
  get filteredEmployees() { return this.selectedEmpId ? this.employees.filter(e => e.id === this.selectedEmpId) : this.employees; }

  isEnrolled(empId: string, benefitId: string): boolean { return (this.enrollments[empId] || []).includes(benefitId); }

  toggleEnrollment(empId: string, benefitId: string) {
    if (!this.enrollments[empId]) this.enrollments[empId] = [];
    const idx = this.enrollments[empId].indexOf(benefitId);
    if (idx > -1) this.enrollments[empId].splice(idx, 1);
    else this.enrollments[empId].push(benefitId);
    const b = this.benefits.find(b => b.id === benefitId);
    if (b) b.enrolled = this.employees.filter(e => (this.enrollments[e.id] || []).includes(benefitId)).length;
  }

  ngOnInit() {}
}
