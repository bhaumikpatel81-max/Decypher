import { Component } from '@angular/core';

@Component({
  selector: 'app-org-chart',
  template: `
    <div class="page-container page-enter">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="page-title">Org Chart</h1>
          <p style="color:var(--text-3);font-size:13px;">Visual organisational hierarchy</p>
        </div>
        <div style="display:flex;gap:8px;">
          <input class="input" style="max-width:220px;" placeholder="Search employee..." [(ngModel)]="search">
          <select class="select" style="max-width:180px;" [(ngModel)]="filterDept" (change)="applyFilter()">
            <option value="">All Departments</option>
            <option *ngFor="let d of depts">{{d}}</option>
          </select>
        </div>
      </div>

      <!-- Stats row -->
      <div class="kpi-row mb-6">
        <div class="kpi-card" *ngFor="let k of kpis">
          <div class="kpi-val" [style.color]="k.color">{{k.val}}</div>
          <div class="kpi-lbl">{{k.lbl}}</div>
        </div>
      </div>

      <!-- Org Tree -->
      <div class="card" style="overflow-x:auto;padding:32px;">
        <div class="org-tree">
          <div *ngFor="let node of filteredTree" class="org-node-wrap">
            <div class="org-node" [class.highlighted]="search && nodeMatches(node)" (click)="toggleNode(node)">
              <div class="org-avatar" [style.background]="node.color">{{node.initials}}</div>
              <div class="org-name">{{node.name}}</div>
              <div class="org-role">{{node.role}}</div>
              <div class="org-dept">{{node.dept}}</div>
              <span class="org-count" *ngIf="node.reports?.length">{{node.reports.length}} reports</span>
            </div>
            <!-- Reports -->
            <div class="org-children" *ngIf="node.expanded && node.reports?.length">
              <div class="org-child" *ngFor="let r of node.reports">
                <div class="org-node org-node-sm">
                  <div class="org-avatar org-avatar-sm" [style.background]="r.color">{{r.initials}}</div>
                  <div class="org-name">{{r.name}}</div>
                  <div class="org-role">{{r.role}}</div>
                </div>
                <!-- Level 3 -->
                <div class="org-children" *ngIf="r.reports?.length">
                  <div class="org-child" *ngFor="let r2 of r.reports">
                    <div class="org-node org-node-xs">
                      <div class="org-avatar org-avatar-xs" [style.background]="r2.color">{{r2.initials}}</div>
                      <div class="org-name">{{r2.name}}</div>
                      <div class="org-role">{{r2.role}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .kpi-row { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; }
    .kpi-card { background:var(--surface); border:1px solid var(--border); border-radius:12px; padding:20px; text-align:center; }
    .kpi-val { font-size:32px; font-weight:800; }
    .kpi-lbl { font-size:12px; color:var(--text-3); margin-top:4px; }
    .org-tree { display:flex; flex-direction:column; gap:32px; min-width:700px; }
    .org-node-wrap { display:flex; flex-direction:column; align-items:center; }
    .org-node { display:flex; flex-direction:column; align-items:center; background:var(--surface); border:2px solid var(--border); border-radius:14px; padding:16px 20px; cursor:pointer; transition:all 150ms; min-width:160px; text-align:center; position:relative; }
    .org-node:hover { border-color:var(--brand-violet-400); box-shadow:0 4px 16px rgba(124,58,237,.12); }
    .org-node.highlighted { border-color:#f59e0b; box-shadow:0 0 0 3px rgba(245,158,11,.2); }
    .org-node-sm { padding:12px 16px; min-width:130px; border-radius:10px; }
    .org-node-xs { padding:8px 12px; min-width:110px; border-radius:8px; border-width:1px; }
    .org-avatar { width:52px; height:52px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:800; color:#fff; margin-bottom:8px; }
    .org-avatar-sm { width:38px; height:38px; font-size:13px; margin-bottom:6px; }
    .org-avatar-xs { width:28px; height:28px; font-size:10px; margin-bottom:4px; }
    .org-name { font-weight:700; font-size:13px; }
    .org-role { font-size:11px; color:var(--text-3); margin-top:2px; }
    .org-dept { font-size:10px; color:var(--brand-violet-400); margin-top:2px; font-weight:600; }
    .org-count { font-size:10px; background:rgba(124,58,237,.1); color:var(--brand-violet-500); border-radius:20px; padding:2px 8px; margin-top:6px; font-weight:700; }
    .org-children { display:flex; gap:20px; margin-top:24px; justify-content:center; position:relative; }
    .org-children::before { content:''; position:absolute; top:-12px; left:50%; width:2px; height:12px; background:var(--border); }
    .org-child { display:flex; flex-direction:column; align-items:center; position:relative; }
    .org-child::before { content:''; position:absolute; top:-12px; left:50%; width:2px; height:12px; background:var(--border); }
  `]
})
export class OrgChartComponent {
  search = ''; filterDept = '';
  depts = ['Engineering','HR','Finance','Sales','Marketing','Product'];
  colors = ['#6b4df0','#2563eb','#10b981','#f59e0b','#db2777','#0891b2','#7c3aed'];

  kpis = [
    { val: 8, lbl: 'Departments', color: '#6b4df0' },
    { val: 142, lbl: 'Total Employees', color: '#2563eb' },
    { val: 12, lbl: 'Team Leads', color: '#10b981' },
    { val: 3, lbl: 'C-Level', color: '#f59e0b' },
  ];

  tree: any[] = [
    { name:'Bhaumik Patel', role:'CEO', dept:'Leadership', initials:'BP', color:'#292966', expanded:true, reports:[
      { name:'Kavita Shah', role:'CHRO', dept:'HR', initials:'KS', color:'#6b4df0', reports:[
        { name:'Priya Sharma', role:'HR Manager', dept:'HR', initials:'PS', color:'#8b5cf6' },
        { name:'Rohan Desai', role:'TA Head', dept:'HR', initials:'RD', color:'#a78bfa' },
      ]},
      { name:'Arjun Mehta', role:'CTO', dept:'Engineering', initials:'AM', color:'#2563eb', reports:[
        { name:'Sneha Patel', role:'Eng Lead', dept:'Engineering', initials:'SP', color:'#3b82f6' },
        { name:'Vikram Singh', role:'Product Manager', dept:'Product', initials:'VS', color:'#60a5fa' },
      ]},
      { name:'Deepak Joshi', role:'CFO', dept:'Finance', initials:'DJ', color:'#059669', reports:[
        { name:'Rahul Gupta', role:'Finance Analyst', dept:'Finance', initials:'RG', color:'#10b981' },
      ]},
      { name:'Anjali Nair', role:'CMO', dept:'Marketing', initials:'AN', color:'#db2777', reports:[
        { name:'Karan Malhotra', role:'Marketing Lead', dept:'Marketing', initials:'KM', color:'#ec4899' },
      ]},
    ]},
  ];

  filteredTree: any[] = [];

  ngOnInit() { this.filteredTree = this.tree; }

  applyFilter() {
    if (!this.filterDept) { this.filteredTree = this.tree; return; }
    this.filteredTree = this.tree.map(n => ({ ...n, reports: (n.reports||[]).filter((r: any) => r.dept === this.filterDept) }));
  }

  nodeMatches(n: any): boolean {
    return this.search ? n.name.toLowerCase().includes(this.search.toLowerCase()) : false;
  }

  toggleNode(n: any) { n.expanded = !n.expanded; }
}
