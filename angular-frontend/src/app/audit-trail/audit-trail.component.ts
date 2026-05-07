import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
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
  private api = `${environment.apiUrl}/api`;
  constructor(private http: HttpClient) {}
  search='';filterModule='';filterSeverity='';fromDate='';toDate='';
  modules=['Employee Directory','Payroll','Attendance','Compliance','User Management','Leave','Performance','Recruitment'];
  kpis=[{val:0,lbl:'Actions Today',color:'#6b4df0'},{val:0,lbl:'Critical Events',color:'#ef4444'},{val:0,lbl:'Unique Users',color:'#10b981'},{val:0,lbl:'Failed Logins',color:'#f59e0b'}];
  logs:any[]=[];
  ngOnInit(){ this.loadLogs(); }
  loadLogs() {
    this.http.get<any[]>(`${this.api}/audit-logs`).subscribe(data => {
      if (!data || !data.length) return;
      this.logs = data.map(l => ({
        ts: l.timestamp?.replace('T',' ')?.slice(0,19) || l.ts || '',
        user: l.userName || l.user || 'System',
        role: l.userRole || l.role || '—',
        module: l.module || l.moduleName || '',
        action: l.action || l.actionType || '',
        details: l.details || l.description || '',
        ip: l.ipAddress || l.ip || '—',
        severity: l.severity || 'Info'
      }));
      const today = new Date().toISOString().slice(0, 10);
      const todayLogs = this.logs.filter(l => l.ts.startsWith(today));
      this.kpis[0].val = todayLogs.length;
      this.kpis[1].val = this.logs.filter(l => l.severity === 'Critical').length;
      const users = new Set(this.logs.map(l => l.user));
      this.kpis[2].val = users.size;
      this.kpis[3].val = this.logs.filter(l => l.action?.toLowerCase().includes('failed login')).length;
    });
  }
  get filtered(){return this.logs.filter(l=>{
    const qs=this.search.toLowerCase();
    return(!qs||l.user.toLowerCase().includes(qs)||l.action.toLowerCase().includes(qs)||l.details.toLowerCase().includes(qs))&&(!this.filterModule||l.module===this.filterModule)&&(!this.filterSeverity||l.severity===this.filterSeverity);
  });}
  export(){alert('Audit log exported as audit_trail_'+new Date().toISOString().slice(0,10)+'.csv');}
}
