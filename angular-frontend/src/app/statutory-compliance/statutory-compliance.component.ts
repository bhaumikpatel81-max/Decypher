import { Component, OnInit } from '@angular/core';
@Component({ selector: 'app-statutory-compliance', template: `
<div class="page-container page-enter">
  <div class="flex justify-between items-center mb-6">
    <div><h1 class="page-title">Statutory Compliance</h1><p style="color:var(--text-3);font-size:13px;">PF · ESI · PT · TDS · LWF — filing tracker & alerts</p></div>
    <button class="btn btn-primary btn-sm" (click)="showUpload=!showUpload">+ Upload Challan</button>
  </div>
  <div class="kpi-row mb-6">
    <div class="kpi-card" *ngFor="let k of kpis"><div class="kpi-val" [style.color]="k.color">{{k.val}}</div><div class="kpi-lbl">{{k.lbl}}</div></div>
  </div>
  <div class="card mb-4" *ngIf="showUpload">
    <h3 style="font-weight:700;margin-bottom:12px;">Upload Challan</h3>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;">
      <select class="select" [(ngModel)]="draft.type"><option *ngFor="let c of compTypes">{{c}}</option></select>
      <input class="input" type="month" [(ngModel)]="draft.month">
      <input class="input" placeholder="Amount (₹)" [(ngModel)]="draft.amount">
      <input class="input" placeholder="Reference No." [(ngModel)]="draft.ref">
    </div>
    <div style="display:flex;gap:8px;margin-top:10px;">
      <button class="btn btn-primary" (click)="upload()">Upload</button>
      <button class="btn btn-ghost" (click)="showUpload=false">Cancel</button>
    </div>
  </div>
  <div class="comp-grid mb-6">
    <div class="comp-card" *ngFor="let c of compStatus" [class.filed]="c.status==='Filed'" [class.overdue]="c.status==='Overdue'" [class.pending]="c.status==='Pending'">
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <div style="font-size:18px;font-weight:800;">{{c.type}}</div>
        <span class="status-dot" [class.filed]="c.status==='Filed'" [class.overdue]="c.status==='Overdue'">{{c.status}}</span>
      </div>
      <div style="font-size:12px;color:var(--text-3);margin-top:6px;">Due: {{c.dueDate}} · Last filed: {{c.lastFiled}}</div>
      <div style="font-size:14px;font-weight:700;margin-top:8px;">₹{{c.amount}}</div>
      <div style="margin-top:8px;display:flex;gap:6px;">
        <button class="btn btn-ghost btn-sm">View</button>
        <button class="btn btn-primary btn-sm" *ngIf="c.status!=='Filed'" (click)="markFiled(c)">Mark Filed</button>
      </div>
    </div>
  </div>
  <div class="card">
    <h3 style="font-weight:700;margin-bottom:12px;">Filing History</h3>
    <table style="width:100%;border-collapse:collapse;">
      <thead><tr style="border-bottom:2px solid var(--border);">
        <th class="th">Type</th><th class="th">Month</th><th class="th">Amount</th><th class="th">Filed On</th><th class="th">Ref No.</th><th class="th">Status</th>
      </tr></thead>
      <tbody>
        <tr *ngFor="let h of history" style="border-bottom:1px solid var(--border);">
          <td class="td">{{h.type}}</td><td class="td">{{h.month}}</td><td class="td">₹{{h.amount}}</td><td class="td">{{h.filedOn}}</td><td class="td" style="font-family:monospace;font-size:12px;">{{h.ref}}</td>
          <td class="td"><span class="status-dot filed">Filed</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>`, styles:[`.kpi-row{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}.kpi-card{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px;text-align:center}.kpi-val{font-size:28px;font-weight:800}.kpi-lbl{font-size:12px;color:var(--text-3);margin-top:4px}.comp-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.comp-card{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px}.comp-card.filed{border-color:#10b981;background:rgba(16,185,129,.03)}.comp-card.overdue{border-color:#ef4444;background:rgba(239,68,68,.03)}.status-dot{padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;background:#fef3c7;color:#92400e}.status-dot.filed{background:#d1fae5;color:#065f46}.status-dot.overdue{background:#fee2e2;color:#991b1b}.th{padding:10px;text-align:left;font-size:12px;color:var(--text-3);font-weight:600}.td{padding:10px;border-bottom:1px solid var(--border);font-size:13px}`] })
export class StatutoryComplianceComponent implements OnInit {
  showUpload=false;
  compTypes=['PF','ESI','PT','TDS','LWF'];
  draft:any={type:'PF',month:'',amount:'',ref:''};
  kpis=[{val:'5/6',lbl:'Filed This Month',color:'#10b981'},{val:1,lbl:'Overdue',color:'#ef4444'},{val:'₹8.4L',lbl:'Total Paid (Apr)',color:'#6b4df0'},{val:3,lbl:'Due This Week',color:'#f59e0b'}];
  compStatus:any[]=[
    {type:'PF',dueDate:'15 May 2026',lastFiled:'15 Apr 2026',amount:'4,82,350',status:'Pending'},
    {type:'ESI',dueDate:'15 May 2026',lastFiled:'15 Apr 2026',amount:'1,24,800',status:'Pending'},
    {type:'PT',dueDate:'30 May 2026',lastFiled:'30 Apr 2026',amount:'28,600',status:'Filed'},
    {type:'TDS',dueDate:'07 May 2026',lastFiled:'07 Apr 2026',amount:'2,16,450',status:'Overdue'},
    {type:'LWF',dueDate:'30 Jun 2026',lastFiled:'30 Dec 2025',amount:'8,400',status:'Filed'},
  ];
  history:any[]=[
    {type:'PF',month:'Apr 2026',amount:'4,82,350',filedOn:'15 Apr 2026',ref:'PF2604A1234'},
    {type:'ESI',month:'Apr 2026',amount:'1,24,800',filedOn:'15 Apr 2026',ref:'ESI2604B5678'},
    {type:'TDS',month:'Mar 2026',amount:'2,08,900',filedOn:'07 Apr 2026',ref:'TDS2603C9012'},
    {type:'PT',month:'Apr 2026',amount:'28,600',filedOn:'30 Apr 2026',ref:'PT2604D3456'},
  ];
  ngOnInit(){}
  upload(){if(!this.draft.month||!this.draft.amount)return;this.history.unshift({...this.draft,filedOn:new Date().toLocaleDateString('en-GB'),ref:this.draft.type+Date.now()});this.markFiled(this.compStatus.find(c=>c.type===this.draft.type));this.showUpload=false;}
  markFiled(c:any){if(c)c.status='Filed';}
}
