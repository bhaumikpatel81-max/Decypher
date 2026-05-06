import { Component, OnInit } from '@angular/core';
@Component({ selector: 'app-talent-community', template: `
<div class="page-container page-enter">
  <div class="flex justify-between items-center mb-6">
    <div><h1 class="page-title">Talent Community</h1><p style="color:var(--text-3);font-size:13px;">Pre-registered candidates interested in your organisation</p></div>
    <button class="btn btn-primary btn-sm" (click)="showAlert=!showAlert">📧 Send Job Alert</button>
  </div>
  <div class="kpi-row mb-6">
    <div class="kpi-card" *ngFor="let k of kpis"><div class="kpi-val" [style.color]="k.color">{{k.val}}</div><div class="kpi-lbl">{{k.lbl}}</div></div>
  </div>
  <div class="card mb-4" *ngIf="showAlert">
    <h3 style="font-weight:700;margin-bottom:12px;">Send Job Alert</h3>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;">
      <select class="select" [(ngModel)]="alert.segment"><option value="">All Community</option><option *ngFor="let s of segments">{{s}}</option></select>
      <input class="input" placeholder="Job title / role" [(ngModel)]="alert.role">
      <input class="input" placeholder="Location" [(ngModel)]="alert.location">
      <textarea class="textarea" style="grid-column:1/-1;height:70px;" placeholder="Message to candidates..." [(ngModel)]="alert.message"></textarea>
    </div>
    <div style="margin-top:10px;display:flex;gap:8px;">
      <button class="btn btn-primary" (click)="sendAlert()">Send to {{alert.segment||'All'}} ({{targetCount}} candidates)</button>
      <button class="btn btn-ghost" (click)="showAlert=false">Cancel</button>
    </div>
  </div>
  <div class="card mb-4" style="display:flex;gap:10px;flex-wrap:wrap;padding:12px 16px;">
    <input class="input" style="max-width:220px;" placeholder="Search name, skill, role..." [(ngModel)]="search">
    <select class="select" style="max-width:160px;" [(ngModel)]="filterSeg"><option value="">All Segments</option><option *ngFor="let s of segments">{{s}}</option></select>
  </div>
  <div class="card">
    <table style="width:100%;border-collapse:collapse;">
      <thead><tr style="border-bottom:2px solid var(--border);">
        <th class="th">Candidate</th><th class="th">Skills</th><th class="th">Desired Role</th><th class="th">Location</th><th class="th">Segment</th><th class="th">Joined</th><th class="th">Actions</th>
      </tr></thead>
      <tbody>
        <tr *ngFor="let c of filtered" style="border-bottom:1px solid var(--border);">
          <td class="td"><div style="font-weight:600;">{{c.name}}</div><div style="font-size:11px;color:var(--text-3);">{{c.email}}</div></td>
          <td class="td"><span *ngFor="let s of c.skills" class="skill-chip">{{s}}</span></td>
          <td class="td">{{c.role}}</td><td class="td">{{c.location}}</td>
          <td class="td"><span class="seg-badge">{{c.segment}}</span></td>
          <td class="td" style="font-size:12px;">{{c.joined}}</td>
          <td class="td"><button class="btn btn-ghost btn-sm" (click)="match(c)">Match Jobs</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>`, styles:[`.kpi-row{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}.kpi-card{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px;text-align:center}.kpi-val{font-size:28px;font-weight:800}.kpi-lbl{font-size:12px;color:var(--text-3);margin-top:4px}.th{padding:10px;text-align:left;font-size:12px;color:var(--text-3);font-weight:600}.td{padding:10px;border-bottom:1px solid var(--border);font-size:13px}.skill-chip{display:inline-block;padding:1px 6px;background:rgba(107,77,240,.08);color:#6b4df0;border-radius:4px;font-size:10px;margin:1px}.seg-badge{padding:2px 8px;border-radius:20px;font-size:11px;font-weight:600;background:#e0e7ff;color:#3730a3}`] })
export class TalentCommunityComponent implements OnInit {
  search='';filterSeg='';showAlert=false;
  segments=['Technology','Product','Sales','HR','Finance','Leadership'];
  alert:any={segment:'',role:'',location:'',message:''};
  kpis=[{val:284,lbl:'Community Size',color:'#6b4df0'},{val:42,lbl:'New This Month',color:'#10b981'},{val:'8.4%',lbl:'Conversion Rate',color:'#f59e0b'},{val:24,lbl:'Hired from Community',color:'#2563eb'}];
  members:any[]=[
    {name:'Amit Joshi',email:'amit.j@gmail.com',skills:['React','Node.js','AWS'],role:'Sr. Developer',location:'Ahmedabad',segment:'Technology',joined:'2026-03-12'},
    {name:'Neha Verma',email:'neha.v@gmail.com',skills:['Python','ML','SQL'],role:'Data Scientist',location:'Bangalore',segment:'Technology',joined:'2026-04-01'},
    {name:'Sanjay Mehta',email:'sanjay.m@gmail.com',skills:['Sales','CRM','B2B'],role:'Sales Manager',location:'Mumbai',segment:'Sales',joined:'2026-02-18'},
    {name:'Ritu Sharma',email:'ritu.s@gmail.com',skills:['HRBP','Recruitment','L&D'],role:'HR Manager',location:'Delhi',segment:'HR',joined:'2026-03-28'},
    {name:'Kiran Patel',email:'kiran.p@gmail.com',skills:['Angular','TypeScript','UX'],role:'Frontend Engineer',location:'Ahmedabad',segment:'Technology',joined:'2026-04-15'},
    {name:'Pooja Nair',email:'pooja.n@gmail.com',skills:['Finance','FP&A','Excel'],role:'Finance Analyst',location:'Remote',segment:'Finance',joined:'2026-01-05'},
  ];
  ngOnInit(){}
  get filtered(){return this.members.filter(c=>(!this.search||(c.name+c.skills.join('')+c.role).toLowerCase().includes(this.search.toLowerCase()))&&(!this.filterSeg||c.segment===this.filterSeg));}
  get targetCount(){return this.alert.segment?this.members.filter(c=>c.segment===this.alert.segment).length:this.members.length;}
  sendAlert(){alert(`Job alert sent to ${this.targetCount} candidates in ${this.alert.segment||'All'} segment for "${this.alert.role||'General Roles'}"`);this.showAlert=false;}
  match(c:any){alert(`Matching open requisitions for ${c.name} (${c.skills.join(', ')}) — 3 matching roles found`);}
}
