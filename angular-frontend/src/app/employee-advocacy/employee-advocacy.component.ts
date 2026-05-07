import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Component({ selector: 'app-employee-advocacy', template: `
<div class="page-container page-enter">
  <div class="flex justify-between items-center mb-6">
    <div><h1 class="page-title">Employee Advocacy</h1><p style="color:var(--text-3);font-size:13px;">Amplify employer brand through employee social sharing</p></div>
  </div>
  <div class="kpi-row mb-6">
    <div class="kpi-card" *ngFor="let k of kpis"><div class="kpi-val" [style.color]="k.color">{{k.val}}</div><div class="kpi-lbl">{{k.lbl}}</div></div>
  </div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;">
    <div style="display:flex;flex-direction:column;gap:16px;">
      <div class="card">
        <h3 style="font-weight:700;margin-bottom:12px;">Share a Job Opening</h3>
        <select class="select" [(ngModel)]="shareJob" style="margin-bottom:8px;"><option value="">Select job to share</option><option *ngFor="let j of jobs" [value]="j">{{j}}</option></select>
        <div style="margin-bottom:8px;"><label style="font-size:12px;font-weight:600;color:var(--text-3);">Channels</label>
          <div style="display:flex;gap:8px;margin-top:6px;">
            <label *ngFor="let c of channels" style="display:flex;align-items:center;gap:4px;font-size:12px;cursor:pointer;">
              <input type="checkbox" [(ngModel)]="c.checked"> {{c.icon}} {{c.name}}
            </label>
          </div>
        </div>
        <textarea class="textarea" [(ngModel)]="shareMsg" placeholder="Add a personal message..." style="height:70px;margin-bottom:8px;"></textarea>
        <button class="btn btn-primary" (click)="share()" [disabled]="!shareJob">Share & Earn Points</button>
      </div>
      <div class="card">
        <h3 style="font-weight:700;margin-bottom:12px;">Leaderboard</h3>
        <div *ngFor="let e of leaderboard;let i=index" style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid var(--border);">
          <div class="rank-num" [class.gold]="i===0" [class.silver]="i===1" [class.bronze]="i===2">{{i+1}}</div>
          <div class="emp-av" [style.background]="e.color">{{e.initials}}</div>
          <div style="flex:1;"><div style="font-weight:600;font-size:13px;">{{e.name}}</div><div style="font-size:11px;color:var(--text-3);">{{e.shares}} shares · {{e.clicks}} clicks · {{e.hires}} hires</div></div>
          <div style="font-weight:800;color:#6b4df0;">{{e.points}} pts</div>
        </div>
      </div>
    </div>
    <div class="card">
      <h3 style="font-weight:700;margin-bottom:12px;">Share Activity</h3>
      <div *ngFor="let a of activity" style="display:flex;gap:10px;padding:10px 0;border-bottom:1px solid var(--border);">
        <div class="emp-av" [style.background]="a.color">{{a.initials}}</div>
        <div style="flex:1;"><div style="font-size:13px;"><strong>{{a.name}}</strong> shared <em>{{a.job}}</em> on {{a.channel}}</div>
          <div style="font-size:11px;color:var(--text-3);margin-top:2px;">{{a.clicks}} clicks · {{a.date}}</div></div>
        <div style="font-size:11px;font-weight:700;color:#10b981;" *ngIf="a.hired">→ Hired!</div>
      </div>
    </div>
  </div>
</div>`, styles:[`.kpi-row{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}.kpi-card{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px;text-align:center}.kpi-val{font-size:28px;font-weight:800}.kpi-lbl{font-size:12px;color:var(--text-3);margin-top:4px}.rank-num{width:28px;height:28px;border-radius:50%;background:var(--surface-alt);display:flex;align-items:center;justify-content:center;font-weight:800;font-size:12px;flex-shrink:0}.rank-num.gold{background:#fef3c7;color:#92400e}.rank-num.silver{background:#f3f4f6;color:#374151}.rank-num.bronze{background:#fde68a;color:#78350f}.emp-av{width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;color:#fff;flex-shrink:0}`] })
export class EmployeeAdvocacyComponent implements OnInit {
  private api = `${environment.apiUrl}/api`;
  constructor(private http: HttpClient) {}
  shareJob=''; shareMsg='';
  jobs: string[] = [];
  channels=[{name:'LinkedIn',icon:'💼',checked:true},{name:'Twitter',icon:'🐦',checked:false},{name:'WhatsApp',icon:'💬',checked:false}];
  kpis:any[]=[{val:0,lbl:'Total Shares',color:'#6b4df0'},{val:0,lbl:'Total Clicks',color:'#2563eb'},{val:0,lbl:'Hires via Advocacy',color:'#10b981'},{val:'₹0',lbl:'Avg Cost per Hire',color:'#f59e0b'}];
  leaderboard: any[] = [];
  activity: any[] = [];

  ngOnInit() { this.loadAdvocacy(); this.loadJobs(); }

  loadAdvocacy() {
    this.http.get<any>(`${this.api}/branding/advocacy`).subscribe(data => {
      if (!data) return;
      this.leaderboard = data.leaderboard || [];
      this.activity = data.activity || [];
      const avgCph = data.hiresViaAdvocacy ? Math.round((data.totalClicks * 50) / data.hiresViaAdvocacy) : 0;
      this.kpis = [
        { val: data.totalShares, lbl: 'Total Shares', color: '#6b4df0' },
        { val: data.totalClicks, lbl: 'Total Clicks', color: '#2563eb' },
        { val: data.hiresViaAdvocacy, lbl: 'Hires via Advocacy', color: '#10b981' },
        { val: `₹${avgCph.toLocaleString()}`, lbl: 'Avg Cost per Hire', color: '#f59e0b' },
      ];
    });
  }

  loadJobs() {
    this.http.get<any[]>(`${this.api}/jobs`).subscribe(data => { this.jobs = (data || []).map(j => j.title); });
  }

  share() {
    if (!this.shareJob) return;
    const ch = this.channels.filter(c => c.checked).map(c => c.name);
    this.http.post(`${this.api}/branding/advocacy/share`, { job: this.shareJob, channels: ch, message: this.shareMsg }).subscribe();
    if (this.leaderboard.length) this.leaderboard[0].shares++;
    this.shareJob = ''; this.shareMsg = '';
  }
}
