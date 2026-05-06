import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skill-gap',
  template: `
    <div class="page-container page-enter">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="page-title">Skill Gap Analysis</h1>
          <p style="color:var(--text-3);font-size:13px;">Role Requirements · Self Assessment · Gap Heatmap · Course Recommendations</p>
        </div>
        <div style="display:flex;gap:8px;">
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='matrix'" (click)="tab='matrix'">Skill Matrix</button>
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='heatmap'" (click)="tab='heatmap'">Gap Heatmap</button>
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='recommend'" (click)="tab='recommend'">Recommendations</button>
        </div>
      </div>

      <!-- Filters -->
      <div style="display:flex;gap:12px;margin-bottom:16px;">
        <select class="select" style="max-width:180px;" [(ngModel)]="filterRole">
          <option value="">All Roles</option>
          <option *ngFor="let r of roles">{{r}}</option>
        </select>
        <select class="select" style="max-width:180px;" [(ngModel)]="filterDept">
          <option value="">All Depts</option>
          <option *ngFor="let d of depts">{{d}}</option>
        </select>
      </div>

      <!-- KPIs -->
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:24px;">
        <div class="kpi-card"><div class="kpi-val" style="color:#ef4444;">{{criticalGaps}}</div><div class="kpi-lbl">Critical Gaps</div></div>
        <div class="kpi-card"><div class="kpi-val" style="color:#f59e0b;">{{moderateGaps}}</div><div class="kpi-lbl">Moderate Gaps</div></div>
        <div class="kpi-card"><div class="kpi-val" style="color:#10b981;">{{noGaps}}</div><div class="kpi-lbl">Skills Met</div></div>
        <div class="kpi-card"><div class="kpi-val" style="color:#6b4df0;">{{avgGapScore | number:'1.1-1'}}</div><div class="kpi-lbl">Avg Gap Score</div></div>
      </div>

      <!-- SKILL MATRIX -->
      <div *ngIf="tab==='matrix'" class="card" style="overflow-x:auto;">
        <h3 style="font-weight:700;margin-bottom:16px;">Employee Skill Assessment (Self-rated 1-5)</h3>
        <table style="width:100%;border-collapse:collapse;min-width:900px;">
          <thead>
            <tr style="border-bottom:2px solid var(--border);">
              <th class="th" style="min-width:160px;">Employee</th>
              <th *ngFor="let s of skills" class="th" style="text-align:center;font-size:11px;">{{s}}</th>
            </tr>
            <tr style="border-bottom:1px dashed var(--border);background:var(--surface-alt);">
              <td class="td" style="font-size:11px;color:var(--text-3);font-weight:600;">Required (by role)</td>
              <td *ngFor="let req of requiredBySkill" class="td" style="text-align:center;font-size:11px;font-weight:700;color:#6b4df0;">{{req}}</td>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let e of employees" style="border-bottom:1px solid var(--border);" class="tr-hover">
              <td class="td">
                <div style="font-weight:600;font-size:13px;">{{e.name}}</div>
                <div style="font-size:11px;color:var(--text-3);">{{e.role}}</div>
              </td>
              <td *ngFor="let s of skills; let i=index" class="td" style="text-align:center;">
                <div class="skill-cell" [class.gap-critical]="getGap(e,s)<-1" [class.gap-moderate]="getGap(e,s)===-1" [class.gap-none]="getGap(e,s)>=0">
                  <span style="font-weight:700;">{{e.skills[s] || 0}}</span>
                  <span style="font-size:10px;opacity:.7;">/5</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div style="margin-top:12px;display:flex;gap:16px;font-size:12px;">
          <div style="display:flex;align-items:center;gap:6px;"><div style="width:14px;height:14px;border-radius:3px;background:#fee2e2;border:1px solid #fca5a5;"></div>Critical Gap (≥2)</div>
          <div style="display:flex;align-items:center;gap:6px;"><div style="width:14px;height:14px;border-radius:3px;background:#fef3c7;border:1px solid #fde68a;"></div>Moderate Gap (1)</div>
          <div style="display:flex;align-items:center;gap:6px;"><div style="width:14px;height:14px;border-radius:3px;background:#d1fae5;border:1px solid #6ee7b7;"></div>Met or Exceeded</div>
        </div>
      </div>

      <!-- HEATMAP -->
      <div *ngIf="tab==='heatmap'" class="card" style="overflow-x:auto;">
        <h3 style="font-weight:700;margin-bottom:16px;">Gap Heatmap (Required − Current)</h3>
        <table style="width:100%;border-collapse:collapse;min-width:900px;">
          <thead><tr style="border-bottom:2px solid var(--border);">
            <th class="th">Employee</th>
            <th *ngFor="let s of skills" class="th" style="text-align:center;font-size:11px;">{{s}}</th>
            <th class="th" style="text-align:center;">Avg Gap</th>
          </tr></thead>
          <tbody>
            <tr *ngFor="let e of employees" style="border-bottom:1px solid var(--border);">
              <td class="td"><strong>{{e.name}}</strong><div style="font-size:11px;color:var(--text-3);">{{e.role}}</div></td>
              <td *ngFor="let s of skills" class="td" style="text-align:center;padding:6px;">
                <div class="heat-cell" [style.background]="heatColor(getGap(e,s))" [style.color]="getGap(e,s)<0?'#fff':'#065f46'">
                  {{getGap(e,s) > 0 ? '+'+getGap(e,s) : getGap(e,s)}}
                </div>
              </td>
              <td class="td" style="text-align:center;font-weight:700;" [style.color]="avgGap(e)<0?'#ef4444':'#10b981'">{{avgGap(e) | number:'1.1-1'}}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- RECOMMENDATIONS -->
      <div *ngIf="tab==='recommend'">
        <div style="display:flex;flex-direction:column;gap:16px;">
          <div *ngFor="let e of employees" class="card">
            <div style="font-weight:700;font-size:15px;margin-bottom:12px;">{{e.name}} <span style="font-size:12px;color:var(--text-3);font-weight:400;">— {{e.role}}</span></div>
            <div style="display:flex;flex-direction:column;gap:8px;">
              <div *ngFor="let s of gapSkills(e)" style="display:flex;align-items:center;justify-content:space-between;padding:10px;background:var(--surface-alt);border-radius:8px;">
                <div>
                  <div style="font-size:13px;font-weight:600;color:#ef4444;">Gap: {{s.skill}} (Current: {{s.current}}, Required: {{s.required}})</div>
                  <div style="font-size:12px;color:var(--text-3);">Recommended: {{courseFor(s.skill)}}</div>
                </div>
                <button class="btn btn-primary btn-sm" (click)="enrollInCourse(s.skill, e.name)">Enroll</button>
              </div>
              <div *ngIf="gapSkills(e).length===0" style="font-size:13px;color:#10b981;font-weight:600;">✓ No significant gaps — all required skills met</div>
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
    .skill-cell { width:40px;height:32px;border-radius:6px;display:flex;align-items:center;justify-content:center;gap:2px;font-size:13px;margin:auto; }
    .skill-cell.gap-critical { background:#fee2e2;color:#991b1b; }
    .skill-cell.gap-moderate { background:#fef3c7;color:#92400e; }
    .skill-cell.gap-none { background:#d1fae5;color:#065f46; }
    .heat-cell { width:44px;height:32px;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;margin:auto; }
    .th { padding:10px;text-align:left;font-size:12px;color:var(--text-3);font-weight:600; }
    .td { padding:8px;font-size:13px; }
    .tr-hover:hover { background:var(--surface-alt); }
    .card { background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px;margin-bottom:16px; }
  `]
})
export class SkillGapComponent implements OnInit {
  tab = 'matrix';
  filterRole = '';
  filterDept = '';

  roles = ['Sr. Developer', 'DevOps Engineer', 'QA Lead', 'HR Manager', 'Data Analyst'];
  depts = ['Engineering', 'HR', 'Operations'];
  skills = ['Angular', 'Node.js', 'AWS', 'SQL', 'Leadership', 'Communication', 'Agile', 'DevOps', 'Python', 'Data Analysis'];

  requiredBySkill = [4, 3, 3, 4, 3, 4, 4, 2, 3, 3];

  employees = [
    { name: 'Arjun Mehta', role: 'Sr. Developer', dept: 'Engineering', skills: { Angular: 5, 'Node.js': 4, AWS: 3, SQL: 4, Leadership: 3, Communication: 4, Agile: 4, DevOps: 2, Python: 2, 'Data Analysis': 2 } },
    { name: 'Rahul Gupta', role: 'DevOps Engineer', dept: 'Engineering', skills: { Angular: 2, 'Node.js': 3, AWS: 5, SQL: 3, Leadership: 2, Communication: 3, Agile: 4, DevOps: 5, Python: 3, 'Data Analysis': 2 } },
    { name: 'Sneha Patel', role: 'QA Lead', dept: 'Engineering', skills: { Angular: 3, 'Node.js': 2, AWS: 2, SQL: 4, Leadership: 3, Communication: 5, Agile: 5, DevOps: 1, Python: 2, 'Data Analysis': 3 } },
    { name: 'Priya Sharma', role: 'HR Manager', dept: 'HR', skills: { Angular: 1, 'Node.js': 1, AWS: 1, SQL: 3, Leadership: 5, Communication: 5, Agile: 3, DevOps: 1, Python: 1, 'Data Analysis': 3 } },
    { name: 'Kiran Desai', role: 'Data Analyst', dept: 'Operations', skills: { Angular: 2, 'Node.js': 2, AWS: 3, SQL: 5, Leadership: 2, Communication: 4, Agile: 3, DevOps: 2, Python: 5, 'Data Analysis': 5 } },
    { name: 'Vikram Singh', role: 'Sr. Developer', dept: 'Engineering', skills: { Angular: 3, 'Node.js': 3, AWS: 2, SQL: 3, Leadership: 2, Communication: 3, Agile: 3, DevOps: 2, Python: 2, 'Data Analysis': 1 } },
  ];

  courseMap: { [skill: string]: string } = {
    Angular: 'Angular Advanced Patterns', 'Node.js': 'Node.js Microservices', AWS: 'AWS Solutions Architect',
    SQL: 'Advanced SQL for Analytics', Leadership: 'Leadership Essentials', Communication: 'Effective Communication',
    Agile: 'Agile & Scrum Master', DevOps: 'DevOps Engineering Bootcamp', Python: 'Python for Data Analysis', 'Data Analysis': 'Business Intelligence with Power BI',
  };

  getGap(e: any, skill: string): number {
    const idx = this.skills.indexOf(skill);
    const required = this.requiredBySkill[idx] || 0;
    return (e.skills[skill] || 0) - required;
  }

  avgGap(e: any): number {
    const gaps = this.skills.map(s => this.getGap(e, s));
    return gaps.reduce((a, b) => a + b, 0) / gaps.length;
  }

  gapSkills(e: any) {
    return this.skills.filter(s => this.getGap(e, s) < 0).map(s => ({ skill: s, current: e.skills[s] || 0, required: this.requiredBySkill[this.skills.indexOf(s)] }));
  }

  heatColor(gap: number): string {
    if (gap <= -2) return '#dc2626';
    if (gap === -1) return '#f59e0b';
    if (gap === 0) return '#10b981';
    return '#6b4df0';
  }

  courseFor(skill: string) { return this.courseMap[skill] || 'Related Course'; }

  get criticalGaps() { let c = 0; this.employees.forEach(e => this.skills.forEach(s => { if (this.getGap(e, s) <= -2) c++; })); return c; }
  get moderateGaps() { let c = 0; this.employees.forEach(e => this.skills.forEach(s => { if (this.getGap(e, s) === -1) c++; })); return c; }
  get noGaps() { let c = 0; this.employees.forEach(e => this.skills.forEach(s => { if (this.getGap(e, s) >= 0) c++; })); return c; }
  get avgGapScore() { let g = 0, c = 0; this.employees.forEach(e => this.skills.forEach(s => { g += this.getGap(e, s); c++; })); return c ? g / c : 0; }

  ngOnInit() {}

  enrollInCourse(skill: string, emp: string) { alert(`${emp} enrolled in "${this.courseFor(skill)}"`); }
}
