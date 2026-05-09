import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface KeyResult {
  id?: string; text: string; target: number; current: number; unit: string;
}

interface OKR {
  id: string; objective: string; owner: string; dept: string;
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
            <div *ngFor="let okr of filteredOKRs(level.type)" class="okr-card">
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
          <div *ngIf="createError" style="padding:8px 12px;background:#fee2e2;border-radius:6px;color:#991b1b;font-size:13px;">{{createError}}</div>
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
              <input type="range" [min]="0" [max]="kr.target" [(ngModel)]="kr.current" (change)="updateKeyResultProgress(kr)" style="width:100%;">
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
  private api = `${environment.apiUrl}/api/performance`;
  tab = 'view';
  filterOwner = '';
  filterQuarter = '';
  filterStatus = '';
  Math = Math;
  summary: any = {};
  owners: string[] = [];

  levels = [
    { label: 'Company OKRs', type: 'Company', color: '#6b4df0', indent: 0 },
    { label: 'Department OKRs', type: 'Team', color: '#10b981', indent: 24 },
    { label: 'Individual OKRs', type: 'Individual', color: '#f59e0b', indent: 48 },
  ];

  allOKRs: OKR[] = [];
  newOKR: any = { objective: '', owner: '', dept: '', quarter: 'Q2', year: new Date().getFullYear(), keyResults: [{ text: '', target: 100, unit: '%' }] };

  constructor(private http: HttpClient) {}

  get achievedCount() { return this.allOKRs.filter(o => o.status === 'Achieved').length; }
  get atRiskCount() { return this.allOKRs.filter(o => o.status === 'At Risk').length; }
  get avgProgress() {
    let total = 0, count = 0;
    this.allOKRs.forEach(o => o.keyResults.forEach(kr => { total += (kr.current / kr.target) * 100; count++; }));
    return count ? Math.round(total / count) : 0;
  }

  filteredOKRs(type: string): OKR[] {
    return this.allOKRs.filter(o => {
      const matchType = !type || o.dept === type;
      const matchOwner = !this.filterOwner || o.owner === this.filterOwner;
      const matchQ = !this.filterQuarter || o.quarter === this.filterQuarter;
      const matchStatus = !this.filterStatus || o.status === this.filterStatus;
      return matchType && matchOwner && matchQ && matchStatus;
    });
  }

  chipClass(status: string) { return { 'On Track': 'ontrack', 'At Risk': 'atrisk', 'Achieved': 'achieved', 'Not Started': 'notstarted' }[status] || ''; }
  addKR() { this.newOKR.keyResults.push({ text: '', target: 100, unit: '%' }); }

  ngOnInit() { this.loadGoals(); this.loadSummary(); }

  loadGoals() {
    this.http.get<any[]>(`${this.api}/goals`).subscribe(data => {
      this.allOKRs = (data || []).map(g => ({
        id: g.id, objective: g.title, owner: g.ownerName || '', dept: g.type || 'Individual',
        quarter: g.quarter ? `Q${g.quarter}` : 'Q1', year: g.year || new Date().getFullYear(),
        status: g.status, keyResults: (g.keyResults || []).map((kr: any) => ({
          id: kr.id, text: kr.title, target: kr.targetValue || 100, current: kr.currentValue || 0, unit: kr.unit || '%'
        }))
      }));
      this.owners = [...new Set(this.allOKRs.map(o => o.owner))];
    });
  }

  loadSummary() {
    this.http.get<any>(`${this.api}/goals/summary`).subscribe(s => { this.summary = s || {}; });
  }

  createError = '';

  createOKR() {
    if (!this.newOKR.objective) { this.createError = 'Objective is required.'; return; }
    this.createError = '';
    const quarterNum = parseInt((this.newOKR.quarter || 'Q2').replace('Q', ''));
    const payload = {
      title: this.newOKR.objective, type: this.newOKR.dept || 'Individual',
      year: this.newOKR.year, quarter: quarterNum,
      keyResults: this.newOKR.keyResults.map((kr: any) => ({ title: kr.text, targetValue: kr.target, unit: kr.unit }))
    };
    this.http.post<any>(`${this.api}/goals`, payload).subscribe({
      next: () => { this.loadGoals(); this.loadSummary(); this.newOKR = { objective: '', owner: '', dept: '', quarter: 'Q2', year: new Date().getFullYear(), keyResults: [{ text: '', target: 100, unit: '%' }] }; this.tab = 'view'; },
      error: () => {}
    });
  }

  updateKeyResultProgress(kr: KeyResult) {
    if (!kr.id) return;
    this.http.patch(`${this.api}/goals/key-results/${kr.id}/progress`, { progress: kr.current, notes: null }).subscribe();
  }
}
