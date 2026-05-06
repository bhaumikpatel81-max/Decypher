import { Component, OnInit } from '@angular/core';

interface KeyResult {
  text: string; target: number; current: number; unit: string;
}

interface OKR {
  id: number; objective: string; owner: string; dept: string;
  quarter: string; year: number; status: string;
  keyResults: KeyResult[];
}

@Component({
  selector: 'app-goals-okr',
  template: `
    <div class="page-container page-enter">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="page-title">Goals & OKRs</h1>
          <p style="color:var(--text-3);font-size:13px;">Org → Team → Individual Alignment</p>
        </div>
        <div style="display:flex;gap:8px;">
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='view'" (click)="tab='view'">OKR Tree</button>
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='create'" (click)="tab='create'">Create OKR</button>
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='update'" (click)="tab='update'">Update Progress</button>
        </div>
      </div>

      <!-- Filters -->
      <div style="display:flex;gap:12px;margin-bottom:24px;">
        <select class="select" style="max-width:160px;" [(ngModel)]="filterOwner">
          <option value="">All Owners</option>
          <option *ngFor="let o of owners">{{o}}</option>
        </select>
        <select class="select" style="max-width:140px;" [(ngModel)]="filterQuarter">
          <option value="">All Quarters</option>
          <option>Q1</option><option>Q2</option><option>Q3</option><option>Q4</option>
        </select>
        <select class="select" style="max-width:160px;" [(ngModel)]="filterStatus">
          <option value="">All Status</option>
          <option>On Track</option><option>At Risk</option><option>Achieved</option><option>Not Started</option>
        </select>
      </div>

      <!-- KPIs -->
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:24px;">
        <div class="kpi-card"><div class="kpi-val" style="color:#6b4df0;">{{allOKRs.length}}</div><div class="kpi-lbl">Total OKRs</div></div>
        <div class="kpi-card"><div class="kpi-val" style="color:#10b981;">{{achievedCount}}</div><div class="kpi-lbl">Achieved</div></div>
        <div class="kpi-card"><div class="kpi-val" style="color:#f59e0b;">{{atRiskCount}}</div><div class="kpi-lbl">At Risk</div></div>
        <div class="kpi-card"><div class="kpi-val" style="color:#3b82f6;">{{avgProgress | number:'1.0-0'}}%</div><div class="kpi-lbl">Avg Progress</div></div>
      </div>

      <!-- OKR TREE -->
      <div *ngIf="tab==='view'">
        <div *ngFor="let level of levels" style="margin-bottom:24px;">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
            <div class="level-badge" [style.background]="level.color+'22'" [style.color]="level.color">{{level.label}}</div>
            <div style="height:2px;flex:1;background:var(--border);"></div>
          </div>
          <div style="display:flex;flex-direction:column;gap:12px;margin-left:{{level.indent}}px;">
            <div *ngFor="let okr of filteredOKRs(level.depts)" class="okr-card">
              <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px;">
                <div style="flex:1;">
                  <div style="font-weight:700;font-size:15px;margin-bottom:4px;">{{okr.objective}}</div>
                  <div style="font-size:12px;color:var(--text-3);">{{okr.owner}} · {{okr.dept}} · {{okr.quarter}} {{okr.year}}</div>
                </div>
                <span class="status-chip" [class]="chipClass(okr.status)">{{okr.status}}</span>
              </div>
              <div style="display:flex;flex-direction:column;gap:8px;">
                <div *ngFor="let kr of okr.keyResults" style="padding:8px 12px;background:var(--surface-alt);border-radius:8px;">
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
                    <span style="font-size:13px;">{{kr.text}}</span>
                    <span style="font-size:12px;font-weight:700;color:#6b4df0;">{{kr.current}}/{{kr.target}} {{kr.unit}}</span>
                  </div>
                  <div style="background:var(--border);border-radius:3px;height:5px;">
                    <div [style.width.%]="Math.min((kr.current/kr.target)*100,100)" [style.background]="(kr.current/kr.target)>=1?'#10b981':(kr.current/kr.target)>=0.7?'#6b4df0':'#f59e0b'" style="height:5px;border-radius:3px;transition:width .4s;"></div>
                  </div>
                  <div style="font-size:11px;color:var(--text-3);margin-top:3px;">{{((kr.current/kr.target)*100)|number:'1.0-0'}}% complete</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- CREATE OKR -->
      <div *ngIf="tab==='create'" class="card" style="max-width:600px;">
        <h3 style="font-weight:700;margin-bottom:16px;">Create New OKR</h3>
        <div style="display:flex;flex-direction:column;gap:14px;">
          <div>
            <label style="font-size:12px;font-weight:600;color:var(--text-3);">Objective</label>
            <input class="input" [(ngModel)]="newOKR.objective" placeholder="What do you want to achieve?" style="margin-top:4px;">
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div>
              <label style="font-size:12px;font-weight:600;color:var(--text-3);">Owner</label>
              <select class="select" [(ngModel)]="newOKR.owner" style="margin-top:4px;">
                <option value="">Select</option>
                <option *ngFor="let o of owners">{{o}}</option>
              </select>
            </div>
            <div>
              <label style="font-size:12px;font-weight:600;color:var(--text-3);">Department</label>
              <select class="select" [(ngModel)]="newOKR.dept" style="margin-top:4px;">
                <option value="">Select</option>
                <option>Company</option><option>Engineering</option><option>HR</option><option>Sales</option><option>Operations</option>
              </select>
            </div>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div>
              <label style="font-size:12px;font-weight:600;color:var(--text-3);">Quarter</label>
              <select class="select" [(ngModel)]="newOKR.quarter" style="margin-top:4px;">
                <option>Q1</option><option>Q2</option><option>Q3</option><option>Q4</option>
              </select>
            </div>
            <div>
              <label style="font-size:12px;font-weight:600;color:var(--text-3);">Year</label>
              <input class="input" type="number" [(ngModel)]="newOKR.year" style="margin-top:4px;">
            </div>
          </div>
          <div>
            <label style="font-size:12px;font-weight:600;color:var(--text-3);">Key Results</label>
            <div style="display:flex;flex-direction:column;gap:8px;margin-top:6px;">
              <div *ngFor="let kr of newOKR.keyResults; let i=index" style="display:grid;grid-template-columns:1fr 80px 80px;gap:8px;">
                <input class="input" [(ngModel)]="kr.text" placeholder="Key result description">
                <input class="input" type="number" [(ngModel)]="kr.target" placeholder="Target">
                <input class="input" [(ngModel)]="kr.unit" placeholder="Unit">
              </div>
            </div>
            <button class="btn btn-ghost btn-sm" style="margin-top:8px;" (click)="addKR()">+ Add Key Result</button>
          </div>
          <button class="btn btn-primary" (click)="createOKR()">Create OKR</button>
        </div>
      </div>

      <!-- UPDATE PROGRESS -->
      <div *ngIf="tab==='update'">
        <div style="display:flex;flex-direction:column;gap:16px;">
          <div *ngFor="let okr of allOKRs" class="card">
            <div style="font-weight:700;font-size:15px;margin-bottom:12px;">{{okr.objective}}</div>
            <div *ngFor="let kr of okr.keyResults" style="margin-bottom:12px;">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
                <span style="font-size:13px;">{{kr.text}}</span>
                <span style="font-size:12px;font-weight:700;color:#6b4df0;">{{kr.current}} / {{kr.target}} {{kr.unit}}</span>
              </div>
              <input type="range" [min]="0" [max]="kr.target" [(ngModel)]="kr.current" style="width:100%;">
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .kpi-card { background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px;text-align:center; }
    .kpi-val { font-size:28px;font-weight:800; }
    .kpi-lbl { font-size:12px;color:var(--text-3);margin-top:4px; }
    .level-badge { padding:4px 12px;border-radius:6px;font-size:12px;font-weight:700; }
    .okr-card { background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:16px; }
    .status-chip { padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;flex-shrink:0;margin-left:8px; }
    .status-chip.ontrack { background:#d1fae5;color:#065f46; }
    .status-chip.atrisk { background:#fef3c7;color:#92400e; }
    .status-chip.achieved { background:rgba(107,77,240,.1);color:#6b4df0; }
    .status-chip.notstarted { background:var(--surface-alt);color:var(--text-3); }
    .card { background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px;margin-bottom:16px; }
  `]
})
export class GoalsOkrComponent implements OnInit {
  tab = 'view';
  filterOwner = '';
  filterQuarter = '';
  filterStatus = '';
  Math = Math;

  owners = ['Satish Menon (CEO)', 'Priya Sharma (HR)', 'Arjun Mehta (Engg)', 'Ananya Iyer (Ops)', 'Kiran Desai (Analyst)'];

  levels = [
    { label: 'Company OKRs', depts: ['Company'], color: '#6b4df0', indent: 0 },
    { label: 'Department OKRs', depts: ['Engineering', 'HR', 'Sales'], color: '#10b981', indent: 24 },
    { label: 'Individual OKRs', depts: ['Individual'], color: '#f59e0b', indent: 48 },
  ];

  allOKRs: OKR[] = [
    { id: 1, objective: 'Achieve 40% revenue growth', owner: 'Satish Menon (CEO)', dept: 'Company', quarter: 'Q2', year: 2026, status: 'On Track', keyResults: [{ text: 'Annual recurring revenue', target: 50, current: 32, unit: '₹Cr' }, { text: 'New enterprise clients', target: 15, current: 10, unit: 'clients' }, { text: 'Customer NPS score', target: 65, current: 58, unit: 'points' }] },
    { id: 2, objective: 'Launch 5 new product modules', owner: 'Arjun Mehta (Engg)', dept: 'Engineering', quarter: 'Q2', year: 2026, status: 'On Track', keyResults: [{ text: 'Modules shipped', target: 5, current: 3, unit: 'modules' }, { text: 'Test coverage', target: 80, current: 72, unit: '%' }] },
    { id: 3, objective: 'Reduce employee attrition to below 10%', owner: 'Priya Sharma (HR)', dept: 'HR', quarter: 'Q2', year: 2026, status: 'At Risk', keyResults: [{ text: 'Attrition rate', target: 10, current: 13, unit: '%' }, { text: 'Engagement score', target: 80, current: 68, unit: '%' }, { text: 'New hire 90-day retention', target: 95, current: 88, unit: '%' }] },
    { id: 4, objective: 'Improve sales pipeline 3x', owner: 'Ananya Iyer (Ops)', dept: 'Sales', quarter: 'Q2', year: 2026, status: 'On Track', keyResults: [{ text: 'Qualified leads', target: 120, current: 95, unit: 'leads' }, { text: 'Conversion rate', target: 25, current: 18, unit: '%' }] },
    { id: 5, objective: 'Complete AWS certification', owner: 'Kiran Desai (Analyst)', dept: 'Individual', quarter: 'Q2', year: 2026, status: 'Achieved', keyResults: [{ text: 'Modules completed', target: 12, current: 12, unit: 'modules' }, { text: 'Practice tests passed', target: 5, current: 5, unit: 'tests' }] },
  ];

  newOKR: any = { objective: '', owner: '', dept: '', quarter: 'Q2', year: 2026, keyResults: [{ text: '', target: 100, unit: '%' }] };

  get achievedCount() { return this.allOKRs.filter(o => o.status === 'Achieved').length; }
  get atRiskCount() { return this.allOKRs.filter(o => o.status === 'At Risk').length; }
  get avgProgress() {
    let total = 0, count = 0;
    this.allOKRs.forEach(o => o.keyResults.forEach(kr => { total += (kr.current / kr.target) * 100; count++; }));
    return count ? total / count : 0;
  }

  filteredOKRs(depts: string[]): OKR[] {
    return this.allOKRs.filter(o => {
      const matchDept = depts.includes(o.dept);
      const matchOwner = !this.filterOwner || o.owner === this.filterOwner;
      const matchQ = !this.filterQuarter || o.quarter === this.filterQuarter;
      const matchStatus = !this.filterStatus || o.status === this.filterStatus;
      return matchDept && matchOwner && matchQ && matchStatus;
    });
  }

  chipClass(status: string) { return { 'On Track': 'ontrack', 'At Risk': 'atrisk', 'Achieved': 'achieved', 'Not Started': 'notstarted' }[status] || ''; }

  addKR() { this.newOKR.keyResults.push({ text: '', target: 100, unit: '%' }); }

  createOKR() {
    if (!this.newOKR.objective || !this.newOKR.owner) { alert('Fill objective and owner'); return; }
    this.allOKRs.push({ id: Date.now(), ...this.newOKR, status: 'Not Started', keyResults: this.newOKR.keyResults.map((kr: any) => ({ ...kr, current: 0 })) });
    alert('OKR created');
    this.newOKR = { objective: '', owner: '', dept: '', quarter: 'Q2', year: 2026, keyResults: [{ text: '', target: 100, unit: '%' }] };
  }

  ngOnInit() {}
}
