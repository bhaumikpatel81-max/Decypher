import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Component({ selector: 'app-campus-connect', template: `
<div class="page-container page-enter">
  <div class="flex justify-between items-center mb-6">
    <div><h1 class="page-title">Campus Connect</h1><p style="color:var(--text-3);font-size:13px;">Manage campus recruitment drives, PPTs & offer tracking</p></div>
    <button class="btn btn-primary btn-sm" (click)="showForm=!showForm">+ New Campus Drive</button>
  </div>
  <div class="kpi-row mb-6">
    <div class="kpi-card" *ngFor="let k of kpis"><div class="kpi-val" [style.color]="k.color">{{k.val}}</div><div class="kpi-lbl">{{k.lbl}}</div></div>
  </div>
  <div class="card mb-4" *ngIf="showForm">
    <h3 style="font-weight:700;margin-bottom:12px;">New Campus Drive</h3>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;">
      <input class="input" placeholder="College / University" [(ngModel)]="draft.college">
      <input class="input" placeholder="City" [(ngModel)]="draft.city">
      <input class="input" type="date" [(ngModel)]="draft.driveDate" title="Drive date">
      <input class="input" type="date" [(ngModel)]="draft.pptDate" title="Pre-placement talk date">
      <input class="input" placeholder="Roles (comma separated)" [(ngModel)]="draft.roles">
      <input class="input" type="number" placeholder="Target hires" [(ngModel)]="draft.target">
      <select class="select" [(ngModel)]="draft.mode"><option>Offline</option><option>Online</option><option>Hybrid</option></select>
      <select class="select" [(ngModel)]="draft.status"><option>Planning</option><option>Active</option><option>Completed</option></select>
    </div>
    <div style="margin-top:10px;display:flex;gap:8px;">
      <button class="btn btn-primary" (click)="addDrive()">Add Drive</button>
      <button class="btn btn-ghost" (click)="showForm=false">Cancel</button>
    </div>
  </div>
  <div class="drives-grid">
    <div class="drive-card" *ngFor="let d of drives">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;">
        <div>
          <div style="font-weight:700;font-size:15px;">{{d.college}}</div>
          <div style="font-size:12px;color:var(--text-3);">📍 {{d.city}} · {{d.mode}}</div>
        </div>
        <span class="status-badge" [class.active]="d.status==='Active'" [class.done]="d.status==='Completed'">{{d.status}}</span>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin:12px 0;font-size:12px;">
        <div><span style="color:var(--text-3);">PPT:</span> {{d.pptDate}}</div>
        <div><span style="color:var(--text-3);">Drive:</span> {{d.driveDate}}</div>
        <div><span style="color:var(--text-3);">Roles:</span> {{d.roles}}</div>
        <div><span style="color:var(--text-3);">Target:</span> {{d.target}} hires</div>
      </div>
      <div style="background:var(--surface-alt);border-radius:8px;padding:10px;font-size:12px;">
        <div style="display:flex;justify-content:space-between;margin-bottom:4px;"><span>Registered</span><strong>{{d.registered}}</strong></div>
        <div style="display:flex;justify-content:space-between;margin-bottom:4px;"><span>Appeared</span><strong>{{d.appeared}}</strong></div>
        <div style="display:flex;justify-content:space-between;margin-bottom:4px;"><span>Selected</span><strong>{{d.selected}}</strong></div>
        <div style="display:flex;justify-content:space-between;"><span>Offers Accepted</span><strong style="color:#10b981;">{{d.accepted}}</strong></div>
      </div>
      <button class="btn btn-ghost btn-sm" style="margin-top:10px;width:100%;" (click)="viewDrive(d)">View Details</button>
    </div>
  </div>
</div>`, styles:[`.kpi-row{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}.kpi-card{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px;text-align:center}.kpi-val{font-size:28px;font-weight:800}.kpi-lbl{font-size:12px;color:var(--text-3);margin-top:4px}.drives-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:20px}.drive-card{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px}.status-badge{padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;background:#fef3c7;color:#92400e}.status-badge.active{background:#dbeafe;color:#1e40af}.status-badge.done{background:#d1fae5;color:#065f46}`] })
export class CampusConnectComponent implements OnInit {
  private api = `${environment.apiUrl}/api/branding`;
  constructor(private http: HttpClient) {}
  showForm=false;draft:any={college:'',city:'',driveDate:'',pptDate:'',roles:'',target:10,mode:'Offline',status:'Planning'};
  kpis=[{val:8,lbl:'Drives This Year',color:'#6b4df0'},{val:142,lbl:'Offers Made',color:'#2563eb'},{val:118,lbl:'Offers Accepted',color:'#10b981'},{val:'83%',lbl:'Acceptance Rate',color:'#f59e0b'}];
  drives:any[]=[
    {college:'IIT Ahmedabad',city:'Ahmedabad',driveDate:'2026-03-15',pptDate:'2026-03-10',roles:'Software Engineer, Data Analyst',target:20,mode:'Offline',status:'Completed',registered:180,appeared:162,selected:28,accepted:24},
    {college:'MICA',city:'Ahmedabad',driveDate:'2026-04-02',pptDate:'2026-03-28',roles:'Marketing Manager, Brand Analyst',target:10,mode:'Hybrid',status:'Completed',registered:95,appeared:88,selected:14,accepted:11},
    {college:'NIRMA University',city:'Ahmedabad',driveDate:'2026-05-20',pptDate:'2026-05-15',roles:'Full-Stack Developer, QA Engineer',target:15,mode:'Online',status:'Active',registered:210,appeared:0,selected:0,accepted:0},
    {college:'VNSGU',city:'Surat',driveDate:'2026-06-05',pptDate:'2026-06-01',roles:'HR Executive, Finance Analyst',target:8,mode:'Offline',status:'Planning',registered:0,appeared:0,selected:0,accepted:0},
  ];
  ngOnInit(){}
  addDrive(){if(!this.draft.college)return;this.drives.unshift({...this.draft,registered:0,appeared:0,selected:0,accepted:0});this.draft={college:'',city:'',driveDate:'',pptDate:'',roles:'',target:10,mode:'Offline',status:'Planning'};this.showForm=false;}
  viewDrive(d:any){alert(`Drive details: ${d.college}\nRegistered: ${d.registered}\nSelected: ${d.selected}\nAccepted: ${d.accepted}`);}
}
