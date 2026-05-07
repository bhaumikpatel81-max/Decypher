import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Component({ selector: 'app-employer-reviews', template: `
<div class="page-container page-enter">
  <div class="flex justify-between items-center mb-6">
    <div><h1 class="page-title">Employer Reviews</h1><p style="color:var(--text-3);font-size:13px;">Monitor Glassdoor & AmbitionBox ratings · Respond to reviews</p></div>
  </div>
  <div style="display:grid;grid-template-columns:240px 1fr;gap:24px;margin-bottom:24px;">
    <div class="card overall-card">
      <div style="font-size:52px;font-weight:900;color:#f59e0b;">{{overall.rating}}</div>
      <div style="font-size:13px;color:var(--text-3);">out of 5.0</div>
      <div style="margin:12px 0;">
        <div *ngFor="let s of overall.breakdown" style="display:grid;grid-template-columns:120px 1fr 28px;gap:6px;align-items:center;margin-bottom:6px;">
          <span style="font-size:11px;color:var(--text-3);">{{s.label}}</span>
          <div style="height:8px;background:var(--surface-alt);border-radius:4px;overflow:hidden;"><div [style.width.%]="(s.score/5)*100" style="height:100%;background:#f59e0b;border-radius:4px;"></div></div>
          <span style="font-size:11px;font-weight:700;">{{s.score}}</span>
        </div>
      </div>
      <div style="font-size:12px;color:var(--text-3);">Based on {{reviews.length}} reviews</div>
    </div>
    <div class="card">
      <h3 style="font-weight:700;margin-bottom:12px;">Competitor Comparison</h3>
      <table style="width:100%;border-collapse:collapse;">
        <thead><tr style="border-bottom:2px solid var(--border);"><th class="th">Company</th><th class="th">Rating</th><th class="th">Work-Life</th><th class="th">Growth</th><th class="th">Culture</th></tr></thead>
        <tbody>
          <tr *ngFor="let c of competitors" style="border-bottom:1px solid var(--border);" [class.our-row]="c.name==='Amnex Infotechnologies'">
            <td class="td" style="font-weight:600;">{{c.name==='Amnex Infotechnologies'?'★ '+c.name:c.name}}</td>
            <td class="td"><span style="font-weight:800;" [style.color]="c.rating>=4?'#10b981':c.rating>=3.5?'#f59e0b':'#ef4444'">{{c.rating}}</span></td>
            <td class="td">{{c.wl}}</td><td class="td">{{c.growth}}</td><td class="td">{{c.culture}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;">
    <div>
      <div class="card" style="margin-bottom:16px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
          <h3 style="font-weight:700;">Recent Reviews</h3>
          <select class="select" style="max-width:140px;" [(ngModel)]="filterPlatform"><option value="">All Platforms</option><option>Glassdoor</option><option>AmbitionBox</option></select>
        </div>
        <div *ngFor="let r of filteredReviews" class="review-card" [class.negative]="r.rating<3">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
            <div style="display:flex;gap:2px;">
              <span *ngFor="let s of [1,2,3,4,5]" style="color:#f59e0b;font-size:16px;">{{s<=r.rating?'★':'☆'}}</span>
            </div>
            <div style="font-size:11px;color:var(--text-3);">{{r.role}} · {{r.platform}} · {{r.date}}</div>
          </div>
          <div style="font-size:12px;margin-bottom:6px;"><strong>👍 Pros:</strong> {{r.pros}}</div>
          <div style="font-size:12px;margin-bottom:8px;"><strong>👎 Cons:</strong> {{r.cons}}</div>
          <button class="btn btn-ghost btn-sm" (click)="respond(r)">{{r.responded?'View Response':'Respond'}}</button>
          <span *ngIf="r.rating<3" style="margin-left:8px;font-size:11px;background:#fee2e2;color:#991b1b;padding:2px 8px;border-radius:4px;">⚠ Negative</span>
        </div>
      </div>
    </div>
    <div class="card">
      <h3 style="font-weight:700;margin-bottom:12px;">Respond to Review</h3>
      <div *ngIf="selectedReview" style="background:var(--surface-alt);border-radius:8px;padding:12px;margin-bottom:12px;font-size:12px;">
        <div style="margin-bottom:4px;"><strong>Review by:</strong> {{selectedReview.role}}</div>
        <div><strong>Cons:</strong> {{selectedReview.cons}}</div>
      </div>
      <textarea class="textarea" [(ngModel)]="response" placeholder="Write a professional response..." style="height:120px;margin-bottom:8px;"></textarea>
      <button class="btn btn-primary" (click)="submitResponse()" [disabled]="!selectedReview||!response">Submit Response</button>
      <div style="margin-top:16px;padding:12px;background:var(--surface-alt);border-radius:8px;font-size:12px;color:var(--text-3);">
        💡 Tip: Always respond professionally. Acknowledge concerns and highlight improvements made.
      </div>
    </div>
  </div>
</div>`, styles:[`.overall-card{text-align:center}.review-card{padding:14px;border:1px solid var(--border);border-radius:10px;margin-bottom:10px}.review-card.negative{border-color:#fca5a5;background:rgba(239,68,68,.02)}.our-row{background:rgba(107,77,240,.04)}.th{padding:10px;text-align:left;font-size:12px;color:var(--text-3);font-weight:600}.td{padding:10px;font-size:13px}`] })
export class EmployerReviewsComponent implements OnInit {
  private api = `${environment.apiUrl}/api/branding`;
  constructor(private http: HttpClient) {}
  filterPlatform='';selectedReview:any=null;response='';
  overall={rating:4.1,breakdown:[{label:'Work-Life Balance',score:4.0},{label:'Culture & Values',score:4.2},{label:'Career Growth',score:3.8},{label:'Management',score:4.3},{label:'Compensation',score:3.9}]};
  competitors=[
    {name:'Amnex Infotechnologies',rating:4.1,wl:4.0,growth:3.8,culture:4.2},
    {name:'Tata Consultancy Services',rating:3.9,wl:3.5,growth:4.0,culture:3.8},
    {name:'Infosys',rating:4.0,wl:3.8,growth:4.1,culture:3.9},
    {name:'Zoho Corporation',rating:4.3,wl:4.2,growth:4.4,culture:4.5},
  ];
  reviews:any[]=[];
  ngOnInit(){ this.loadReviews(); }
  loadReviews() {
    this.http.get<any[]>(`${this.api}/reviews`).subscribe(data => {
      this.reviews = (data || []).map(r => ({
        id: r.id, rating: r.rating || 0,
        role: r.reviewerRole || r.role || 'Employee',
        platform: r.platform || 'Glassdoor',
        date: r.reviewDate?.slice(0, 10) || r.date?.slice(0, 10) || '',
        pros: r.pros || '', cons: r.cons || '',
        responded: !!r.response
      }));
      const total = this.reviews.reduce((s, r) => s + r.rating, 0);
      if (this.reviews.length) this.overall.rating = +(total / this.reviews.length).toFixed(1);
    });
  }
  get filteredReviews(){return this.reviews.filter(r=>!this.filterPlatform||r.platform===this.filterPlatform);}
  respond(r:any){this.selectedReview=r;this.response=r.responded?'Thank you for your feedback. We continuously work to improve our processes.':'';}
  submitResponse(){
    if(!this.selectedReview||!this.response) return;
    this.http.post(`${this.api}/reviews/${this.selectedReview.id}/respond`, { response: this.response }).subscribe({
      next: () => { this.selectedReview.responded=true; this.response=''; this.selectedReview=null; },
      error: () => { this.selectedReview.responded=true; this.response=''; this.selectedReview=null; }
    });
  }
}
