import { Component, OnInit } from '@angular/core';
@Component({ selector: 'app-audit-trail', template: `
<div class="page-container page-enter">
  <div class="flex justify-between items-center mb-6">
    <div><h1 class="page-title">Audit Trail</h1><p style="color:var(--text-3);font-size:13px;">Complete activity log across all modules</p></div>
    <button class="btn btn-ghost btn-sm" (click)="export()">Export CSV</button>
  </div>
  <div class="kpi-row mb-6">
    <div class="kpi-card" *ngFor="let k of kpis"><div class="kpi-val" [style.color]="k.color">{{k.val}}</div><div class="kpi-lbl">{{k.lbl}}</div></div>
  </div>
  <div class="card mb-4" style="display:flex;gap:10px;flex-wrap:wrap;padding:12px 16px;">
    <input class="input" style="max-width:200px;" placeholder="Search user/action..." [(ngModel)]="search">
    <select class="select" style="max-width:160px;" [(ngModel)]="filterModule">
      <option value="">All Modules</option>
      <option *ngFor="let m of modules">{{m}}</option>
    </select>
    <select class="select" style="max-width:160px;" [(ngModel)]="filterSeverity">
      <option value="">All Severity</option><option>Info</option><option>Warning</option><option>Critical</option>
    </select>
    <input class="input" type="date" [(ngModel)]="fromDate" style="max-width:150px;" title="From">
    <input class="input" type="date" [(ngModel)]="toDate" style="max-width:150px;" title="To">
  </div>
  <div class="card">
    <table style="width:100%;border-collapse:collapse;">
      <thead><tr style="border-bottom:2px solid var(--border);">
        <th class="th">Timestamp</th><th class="th">User</th><th class="th">Module</th>
        <th class="th">Action</th><th class="th">Details</th><th class="th">IP</th><th class="th">Severity</th>
      </tr></thead>
      <tbody>
        <tr *ngFor="let l of filtered" class="tr-row" [class.critical-row]="l.severity==='Critical'">
          <td class="td" style="font-size:11px;white-space:nowrap;">{{l.ts}}</td>
          <td class="td"><div style="font-weight:600;font-size:12px;">{{l.user}}</div><div style="font-size:11px;color:var(--text-3);">{{l.role}}</div></td>
          <td class="td"><span class="mod-badge">{{l.module}}</span></td>
          <td class="td" style="font-size:13px;">{{l.action}}</td>
          <td class="td" style="font-size:12px;color:var(--text-3);max-width:260px;">{{l.details}}</td>
          <td class="td" style="font-size:11px;font-family:monospace;">{{l.ip}}</td>
          <td class="td"><span class="sev-badge" [class.sev-info]="l.severity==='Info'" [class.sev-warn]="l.severity==='Warning'" [class.sev-crit]="l.severity==='Critical'">{{l.severity}}</span></td>
        </tr>
      </tbody>
    </table>
    <div *ngIf="!filtered.length" style="text-align:center;padding:32px;color:var(--text-3);">No logs match filter.</div>
  </div>
</div>`, styles: [`.kpi-row{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}.kpi-card{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px;text-align:center}.kpi-val{font-size:28px;font-weight:800}.kpi-lbl{font-size:12px;color:var(--text-3);margin-top:4px}.th{padding:10px;text-align:left;font-size:12px;color:var(--text-3);font-weight:600}.td{padding:10px;border-bottom:1px solid var(--border);font-size:13px}.tr-row:hover{background:var(--surface-alt)}.critical-row{background:rgba(239,68,68,.03)}.mod-badge{padding:2px 8px;border-radius:20px;font-size:11px;font-weight:600;background:rgba(107,77,240,.1);color:#6b4df0}.sev-badge{padding:2px 8px;border-radius:20px;font-size:11px;font-weight:700}.sev-info{background:#e0e7ff;color:#3730a3}.sev-warn{background:#fef3c7;color:#92400e}.sev-crit{background:#fee2e2;color:#991b1b}`] })
export class AuditTrailComponent implements OnInit {
  search='';filterModule='';filterSeverity='';fromDate='';toDate='';
  modules=['Employee Directory','Payroll','Attendance','Compliance','User Management','Leave','Performance','Recruitment'];
  kpis=[{val:247,lbl:'Actions Today',color:'#6b4df0'},{val:8,lbl:'Critical Events',color:'#ef4444'},{val:23,lbl:'Unique Users',color:'#10b981'},{val:3,lbl:'Failed Logins',color:'#f59e0b'}];
  logs:any[]=[
    {ts:'2026-05-06 09:02:11',user:'Priya Sharma',role:'HR Manager',module:'Employee Directory',action:'Created employee',details:'Added EMP012 – Ravi Kumar, Designation: Sr. Analyst',ip:'192.168.1.45',severity:'Info'},
    {ts:'2026-05-06 09:15:33',user:'Bhaumik Patel',role:'SuperAdmin',module:'User Management',action:'Role changed',details:'Changed role of arjun.m from Recruiter to TeamLead',ip:'192.168.1.1',severity:'Critical'},
    {ts:'2026-05-06 09:48:20',user:'Rohan Desai',role:'Recruiter',module:'Recruitment',action:'Pipeline updated',details:'Moved Sneha Joshi from Screening to Interview stage',ip:'192.168.1.67',severity:'Info'},
    {ts:'2026-05-06 10:05:44',user:'Kavita Shah',role:'CHRO',module:'Payroll',action:'Payroll locked',details:'Locked payroll for April 2026 — 142 employees processed',ip:'192.168.1.23',severity:'Warning'},
    {ts:'2026-05-06 10:22:09',user:'Anjali Nair',role:'HR Manager',module:'Leave',action:'Leave approved',details:'Approved 3-day leave for Vikram Singh (EMP005)',ip:'192.168.1.55',severity:'Info'},
    {ts:'2026-05-06 11:00:01',user:'Unknown',role:'—',module:'User Management',action:'Failed login',details:'3 failed login attempts from IP 203.45.67.89',ip:'203.45.67.89',severity:'Critical'},
    {ts:'2026-05-06 11:30:18',user:'Deepak Joshi',role:'Finance',module:'Compliance',action:'Challan uploaded',details:'PF challan for April 2026 uploaded – ₹4,82,350',ip:'192.168.1.34',severity:'Info'},
    {ts:'2026-05-06 12:15:55',user:'Priya Sharma',role:'HR Manager',module:'Performance',action:'Review submitted',details:'Performance review submitted for EMP003 – Rahul Gupta, Rating: 4.2',ip:'192.168.1.45',severity:'Info'},
    {ts:'2026-05-06 13:02:40',user:'Bhaumik Patel',role:'SuperAdmin',module:'Employee Directory',action:'Employee deleted',details:'Removed EMP008 – Divya Reddy (exit process completed)',ip:'192.168.1.1',severity:'Critical'},
    {ts:'2026-05-06 14:45:12',user:'Arjun Mehta',role:'TeamLead',module:'Attendance',action:'OT approved',details:'Approved 3hrs OT for Karan Malhotra on 2026-05-05',ip:'192.168.1.78',severity:'Info'},
  ];
  ngOnInit(){}
  get filtered(){return this.logs.filter(l=>{
    const qs=this.search.toLowerCase();
    return(!qs||l.user.toLowerCase().includes(qs)||l.action.toLowerCase().includes(qs)||l.details.toLowerCase().includes(qs))&&(!this.filterModule||l.module===this.filterModule)&&(!this.filterSeverity||l.severity===this.filterSeverity);
  });}
  export(){alert('Audit log exported as audit_trail_'+new Date().toISOString().slice(0,10)+'.csv');}
}
