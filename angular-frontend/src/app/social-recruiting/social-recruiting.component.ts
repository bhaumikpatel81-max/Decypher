import { Component, OnInit } from '@angular/core';
@Component({ selector: 'app-social-recruiting', template: `
<div class="page-container page-enter">
  <div class="flex justify-between items-center mb-6">
    <div><h1 class="page-title">Social Recruiting</h1><p style="color:var(--text-3);font-size:13px;">Post jobs to multiple channels · Track applications & cost per hire</p></div>
  </div>
  <div class="kpi-row mb-6">
    <div class="kpi-card" *ngFor="let k of kpis"><div class="kpi-val" [style.color]="k.color">{{k.val}}</div><div class="kpi-lbl">{{k.lbl}}</div></div>
  </div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;">
    <div style="display:flex;flex-direction:column;gap:16px;">
      <div class="card">
        <h3 style="font-weight:700;margin-bottom:12px;">Post a Job</h3>
        <select class="select" [(ngModel)]="post.job" style="margin-bottom:8px;"><option value="">Select open requisition</option><option *ngFor="let j of jobs" [value]="j">{{j}}</option></select>
        <div class="channel-list">
          <div *ngFor="let c of channels" class="channel-row" [class.connected]="c.connected">
            <div style="display:flex;align-items:center;gap:10px;">
              <span style="font-size:22px;">{{c.icon}}</span>
              <div><div style="font-weight:600;font-size:13px;">{{c.name}}</div><div style="font-size:11px;color:var(--text-3);">{{c.connected?'Connected':'Not connected'}}</div></div>
            </div>
            <div style="display:flex;align-items:center;gap:8px;">
              <span *ngIf="!c.connected" style="font-size:11px;color:#f59e0b;">⚠ Setup required</span>
              <mat-slide-toggle [(ngModel)]="c.selected" [disabled]="!c.connected"></mat-slide-toggle>
            </div>
          </div>
        </div>
        <button class="btn btn-primary" style="margin-top:12px;width:100%;" (click)="postJob()" [disabled]="!post.job">Post to Selected Channels</button>
      </div>
      <div class="card">
        <h3 style="font-weight:700;margin-bottom:12px;">Channel Performance</h3>
        <div *ngFor="let c of channels" style="display:grid;grid-template-columns:120px 1fr 60px;gap:8px;align-items:center;margin-bottom:10px;">
          <div style="display:flex;align-items:center;gap:6px;font-size:12px;font-weight:600;">{{c.icon}} {{c.name}}</div>
          <div style="height:16px;background:var(--surface-alt);border-radius:4px;overflow:hidden;">
            <div [style.width.%]="(c.applications/maxApps)*100" [style.background]="c.color" style="height:100%;border-radius:4px;transition:width .4s;"></div>
          </div>
          <div style="font-size:12px;font-weight:700;text-align:right;">{{c.applications}}</div>
        </div>
      </div>
    </div>
    <div class="card">
      <h3 style="font-weight:700;margin-bottom:12px;">Cost Per Hire by Channel</h3>
      <table style="width:100%;border-collapse:collapse;">
        <thead><tr style="border-bottom:2px solid var(--border);"><th class="th">Channel</th><th class="th">Apps</th><th class="th">Hires</th><th class="th">Spend (₹)</th><th class="th">CPH (₹)</th></tr></thead>
        <tbody>
          <tr *ngFor="let c of channels" style="border-bottom:1px solid var(--border);">
            <td class="td">{{c.icon}} {{c.name}}</td>
            <td class="td">{{c.applications}}</td>
            <td class="td">{{c.hires}}</td>
            <td class="td">{{c.spend|number}}</td>
            <td class="td"><span [style.color]="c.cph<5000?'#10b981':c.cph<10000?'#f59e0b':'#ef4444'" style="font-weight:700;">₹{{c.cph|number}}</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>`, styles:[`.kpi-row{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}.kpi-card{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px;text-align:center}.kpi-val{font-size:28px;font-weight:800}.kpi-lbl{font-size:12px;color:var(--text-3);margin-top:4px}.channel-list{display:flex;flex-direction:column;gap:8px}.channel-row{display:flex;justify-content:space-between;align-items:center;padding:10px 12px;border:1px solid var(--border);border-radius:10px}.channel-row.connected{border-color:rgba(16,185,129,.4)}.th{padding:10px;text-align:left;font-size:12px;color:var(--text-3);font-weight:600}.td{padding:10px;border-bottom:1px solid var(--border);font-size:13px}`] })
export class SocialRecruitingComponent implements OnInit {
  post:any={job:''};
  jobs=['Sr. Angular Developer','HR Business Partner','Product Manager','Data Analyst','Sales Manager'];
  channels:any[]=[
    {name:'LinkedIn',icon:'💼',color:'#0a66c2',connected:true,selected:true,applications:142,hires:18,spend:45000,cph:2500},
    {name:'Naukri',icon:'🟠',color:'#f97316',connected:true,selected:true,applications:98,hires:12,spend:18000,cph:1500},
    {name:'Indeed',icon:'🔵',color:'#2564f4',connected:true,selected:false,applications:76,hires:8,spend:12000,cph:1500},
    {name:'Monster',icon:'🟢',color:'#5b2d8e',connected:false,selected:false,applications:34,hires:3,spend:8000,cph:2667},
    {name:'Twitter/X',icon:'🐦',color:'#000',connected:false,selected:false,applications:18,hires:1,spend:5000,cph:5000},
  ];
  kpis=[{val:368,lbl:'Total Applications',color:'#6b4df0'},{val:42,lbl:'Total Hires',color:'#10b981'},{val:'₹2,095',lbl:'Avg Cost Per Hire',color:'#f59e0b'},{val:5,lbl:'Active Channels',color:'#2563eb'}];
  ngOnInit(){}
  get maxApps(){return Math.max(...this.channels.map(c=>c.applications));}
  postJob(){const sel=this.channels.filter(c=>c.selected&&c.connected);alert(`"${this.post.job}" posted to: ${sel.map(c=>c.name).join(', ')||'no channels selected'}`);}
}
