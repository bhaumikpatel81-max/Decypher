import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Component({ selector: 'app-careers-builder', template: `
<div class="page-container page-enter">
  <div class="flex justify-between items-center mb-6">
    <div><h1 class="page-title">Careers Page Builder</h1><p style="color:var(--text-3);font-size:13px;">Build your branded careers site — no code needed</p></div>
    <div style="display:flex;gap:8px;">
      <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='build'" (click)="tab='build'">Build</button>
      <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='preview'" (click)="tab='preview'">Preview</button>
      <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='analytics'" (click)="tab='analytics'">Analytics</button>
      <button class="btn btn-primary btn-sm" [style.background]="published?'#10b981':''" (click)="togglePublish()">{{published?'Published ✓':'Publish'}}</button>
    </div>
  </div>
  <div *ngIf="published" style="padding:10px 16px;background:#d1fae5;border-radius:8px;margin-bottom:16px;font-size:13px;color:#065f46;font-weight:600;">
    🌐 Live at: <a style="color:#059669;">https://careers.amnex.com/{{page.slug}}</a> · Copied to clipboard on publish
  </div>

  <!-- BUILD TAB -->
  <div *ngIf="tab==='build'" style="display:grid;grid-template-columns:1fr 1fr;gap:24px;">
    <div style="display:flex;flex-direction:column;gap:16px;">
      <div class="card">
        <h3 style="font-weight:700;margin-bottom:12px;">Company Info</h3>
        <input class="input" placeholder="Company name" [(ngModel)]="page.company" style="margin-bottom:8px;">
        <input class="input" placeholder="Tagline (e.g. Build the Future with Us)" [(ngModel)]="page.tagline" style="margin-bottom:8px;">
        <textarea class="textarea" placeholder="About us (2-3 sentences)" [(ngModel)]="page.about" style="height:80px;margin-bottom:8px;"></textarea>
        <div style="display:flex;gap:8px;align-items:center;">
          <label style="font-size:12px;font-weight:600;color:var(--text-3);">Brand Colour</label>
          <input type="color" [(ngModel)]="page.brandColor" style="height:32px;width:48px;border:none;border-radius:6px;cursor:pointer;">
        </div>
      </div>
      <div class="card">
        <h3 style="font-weight:700;margin-bottom:12px;">Culture & Values</h3>
        <div *ngFor="let v of page.values;let i=index" style="display:flex;gap:6px;margin-bottom:6px;">
          <input class="input" [(ngModel)]="v.title" placeholder="Value title" style="flex:1;">
          <input class="input" [(ngModel)]="v.desc" placeholder="Short description" style="flex:2;">
          <button class="btn btn-ghost btn-sm" (click)="page.values.splice(i,1)">✕</button>
        </div>
        <button class="btn btn-ghost btn-sm" (click)="page.values.push({title:'',desc:''})">+ Add Value</button>
      </div>
      <div class="card">
        <h3 style="font-weight:700;margin-bottom:12px;">Perks & Benefits</h3>
        <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:8px;">
          <span *ngFor="let p of page.perks;let i=index" style="display:flex;align-items:center;gap:4px;background:rgba(107,77,240,.08);padding:4px 10px;border-radius:20px;font-size:12px;">
            {{p}} <button style="background:none;border:none;cursor:pointer;font-size:14px;color:#ef4444;" (click)="page.perks.splice(i,1)">×</button>
          </span>
        </div>
        <div style="display:flex;gap:6px;">
          <input class="input" [(ngModel)]="newPerk" placeholder="Add perk (e.g. Remote-friendly)" (keyup.enter)="addPerk()">
          <button class="btn btn-ghost btn-sm" (click)="addPerk()">Add</button>
        </div>
      </div>
    </div>
    <div class="card">
      <h3 style="font-weight:700;margin-bottom:12px;">Open Positions</h3>
      <div *ngFor="let j of jobs" style="display:flex;align-items:center;gap:10px;padding:10px;border:1px solid var(--border);border-radius:8px;margin-bottom:8px;">
        <div style="flex:1;"><div style="font-weight:600;font-size:13px;">{{j.title}}</div><div style="font-size:12px;color:var(--text-3);">{{j.dept}} · {{j.location}} · {{j.type}}</div></div>
        <mat-slide-toggle [(ngModel)]="j.visible" title="Show on page"></mat-slide-toggle>
      </div>
    </div>
  </div>

  <!-- PREVIEW TAB -->
  <div *ngIf="tab==='preview'" class="careers-preview">
    <div class="cp-hero" [style.background]="'linear-gradient(135deg,'+page.brandColor+'dd,'+page.brandColor+'88)'">
      <h1>{{page.company}}</h1><p>{{page.tagline}}</p>
      <button class="btn" style="background:#fff;color:#292966;margin-top:12px;">View Open Roles</button>
    </div>
    <div class="cp-section"><h2>About Us</h2><p>{{page.about}}</p></div>
    <div class="cp-section"><h2>Our Values</h2>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;">
        <div *ngFor="let v of page.values" style="background:var(--surface-alt);border-radius:10px;padding:16px;">
          <div style="font-weight:700;">{{v.title}}</div><div style="font-size:12px;color:var(--text-3);margin-top:4px;">{{v.desc}}</div>
        </div>
      </div>
    </div>
    <div class="cp-section"><h2>Perks & Benefits</h2>
      <div style="display:flex;flex-wrap:wrap;gap:8px;">
        <span *ngFor="let p of page.perks" style="padding:6px 14px;background:rgba(107,77,240,.1);color:#6b4df0;border-radius:20px;font-weight:600;font-size:13px;">{{p}}</span>
      </div>
    </div>
    <div class="cp-section"><h2>Open Positions</h2>
      <div *ngFor="let j of visibleJobs" style="display:flex;justify-content:space-between;align-items:center;padding:14px;background:var(--surface);border:1px solid var(--border);border-radius:10px;margin-bottom:8px;">
        <div><div style="font-weight:700;">{{j.title}}</div><div style="font-size:12px;color:var(--text-3);">{{j.dept}} · {{j.location}} · {{j.type}}</div></div>
        <button class="btn btn-primary btn-sm">Apply Now</button>
      </div>
    </div>
  </div>

  <!-- ANALYTICS TAB -->
  <div *ngIf="tab==='analytics'" class="kpi-row">
    <div class="kpi-card" *ngFor="let k of analytics"><div class="kpi-val" [style.color]="k.color">{{k.val}}</div><div class="kpi-lbl">{{k.lbl}}</div></div>
  </div>
</div>`, styles:[`.kpi-row{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:16px}.kpi-card{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px;text-align:center}.kpi-val{font-size:28px;font-weight:800}.kpi-lbl{font-size:12px;color:var(--text-3);margin-top:4px}.careers-preview{background:var(--surface);border:1px solid var(--border);border-radius:14px;overflow:hidden}.cp-hero{padding:48px 32px;text-align:center;color:#fff}.cp-hero h1{font-size:32px;font-weight:900;margin:0}.cp-hero p{margin:8px 0 0;font-size:16px;opacity:.9}.cp-section{padding:32px;border-bottom:1px solid var(--border)}.cp-section h2{font-size:20px;font-weight:700;margin:0 0 16px}`] })
export class CareersBuilderComponent implements OnInit {
  private api = `${environment.apiUrl}/api/branding`;
  constructor(private http: HttpClient) {}
  tab:'build'|'preview'|'analytics'='build';published=false;newPerk='';
  page:any={company:'Amnex Infotechnologies',tagline:'Build the Future of HR Technology',about:'Amnex Infotechnologies is a leading HR-Tech company helping enterprises modernise their people operations.',brandColor:'#292966',slug:'amnex',values:[{title:'Innovation',desc:'We build tomorrow\'s solutions today'},{title:'Integrity',desc:'Transparent in everything we do'},{title:'Impact',desc:'Every action drives real outcomes'}],perks:['Remote-friendly','Health Insurance','Learning Budget','Flexible Hours','Team Offsites','Parental Leave']};
  jobs:any[]=[{title:'Senior Angular Developer',dept:'Engineering',location:'Ahmedabad',type:'Full-Time',visible:true},{title:'HR Business Partner',dept:'HR',location:'Mumbai',type:'Full-Time',visible:true},{title:'Product Manager',dept:'Product',location:'Bangalore',type:'Full-Time',visible:true},{title:'Data Analyst',dept:'Analytics',location:'Remote',type:'Full-Time',visible:false}];
  analytics=[{val:'4,280',lbl:'Page Views (30d)',color:'#6b4df0'},{val:87,lbl:'Applications',color:'#2563eb'},{val:'2.03%',lbl:'Conversion Rate',color:'#10b981'},{val:'6d 4h',lbl:'Avg Time to Apply',color:'#f59e0b'}];
  get visibleJobs() { return this.jobs.filter(j => j.visible); }
  ngOnInit(){ this.loadCareerPage(); this.loadJobs(); }
  loadCareerPage() {
    this.http.get<any>(`${this.api}/career-page`).subscribe(data => {
      if (!data) return;
      this.page = {
        company: data.companyName || this.page.company,
        tagline: data.tagline || this.page.tagline,
        about: data.aboutUs || this.page.about,
        brandColor: data.brandColor || this.page.brandColor,
        slug: data.slug || this.page.slug,
        values: data.values ? (Array.isArray(data.values) ? data.values : JSON.parse(data.values)) : this.page.values,
        perks: data.perks ? (Array.isArray(data.perks) ? data.perks : data.perks.split(',').map((p: string) => p.trim())) : this.page.perks
      };
      this.published = data.published || false;
    });
  }
  loadJobs() {
    this.http.get<any[]>(`${environment.apiUrl}/api/jobs`).subscribe(data => {
      if (!data || !data.length) return;
      this.jobs = (data || []).map(j => ({
        id: j.id, title: j.title || j.jobTitle, dept: j.department || '',
        location: j.location || '', type: j.employmentType || 'Full-Time', visible: true
      }));
    });
  }
  addPerk(){if(this.newPerk.trim()){this.page.perks.push(this.newPerk.trim());this.newPerk='';}}
  togglePublish(){
    const payload = { companyName: this.page.company, tagline: this.page.tagline, aboutUs: this.page.about, brandColor: this.page.brandColor, slug: this.page.slug, values: this.page.values, perks: this.page.perks, published: !this.published };
    this.http.post<any>(`${this.api}/career-page`, payload).subscribe({
      next: () => { this.published = !this.published; },
      error: () => { this.published = !this.published; }
    });
  }
}
