import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface ReviewRecord {
  id: string; employee: string; empId: string; reviewer: string; dept: string;
  ratings: { [competency: string]: number }; overall: number; status: string; cycle: string;
}

@Component({
  selector: 'app-performance-reviews',
  template: `
    <div class="page-container page-enter">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="page-title">Performance Reviews</h1>
          <p style="color:var(--text-3);font-size:13px;">Annual · Mid-Year · Competency Rating · Bell Curve</p>
        </div>
        <div style="display:flex;gap:8px;">
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='reviews'" (click)="tab='reviews'">Reviews</button>
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='form'" (click)="tab='form'">Review Form</button>
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='bellcurve'" (click)="tab='bellcurve'">Bell Curve</button>
        </div>
      </div>

      <!-- Summary KPI Row -->
      <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:16px;margin-bottom:20px;">
        <div class="kpi-card">
          <div class="kpi-icon-box" style="background:rgba(107,77,240,.1);color:#6b4df0;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <div class="kpi-val" style="color:#6b4df0;">{{reviews.length}}</div>
          <div class="kpi-lbl">Total Reviews</div>
          <div class="kpi-sub">This cycle</div>
        </div>
        <div *ngFor="let s of statusSummary" class="kpi-card">
          <div class="kpi-icon-box" [style.background]="s.color+'1a'" [style.color]="s.color">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </div>
          <div class="kpi-val" [style.color]="s.color">{{s.count}}</div>
          <div class="kpi-lbl">{{s.label}}</div>
          <div class="kpi-sub">{{s.count === 1 ? 'review' : 'reviews'}}</div>
        </div>
      </div>

      <!-- Cycle Selector -->
      <div class="card" style="display:flex;align-items:center;gap:16px;margin-bottom:24px;flex-wrap:wrap;">
        <div>
          <label style="font-size:12px;font-weight:600;color:var(--text-3);">Review Cycle</label>
          <select class="select" [(ngModel)]="activeCycle" style="margin-top:4px;min-width:220px;">
            <option *ngFor="let c of cycles" [value]="c">{{c}}</option>
          </select>
        </div>
        <div style="margin-top:18px;">
          <button class="btn btn-primary btn-sm" (click)="showCycleForm=!showCycleForm">+ New Cycle</button>
        </div>
      </div>

      <!-- New Cycle Form -->
      <div *ngIf="showCycleForm" class="card" style="max-width:480px;margin-bottom:16px;">
        <h4 style="font-weight:700;margin-bottom:12px;">Create Review Cycle</h4>
        <div style="display:flex;flex-direction:column;gap:10px;">
          <input class="input" placeholder="Cycle name (e.g. Annual Review 2026)" [(ngModel)]="cycleForm.name">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
            <input class="input" type="date" [(ngModel)]="cycleForm.startDate" title="Start date">
            <input class="input" type="date" [(ngModel)]="cycleForm.endDate" title="End date">
          </div>
          <div *ngIf="cycleError" style="padding:8px 12px;background:#fee2e2;border-radius:6px;color:#991b1b;font-size:13px;">{{cycleError}}</div>
          <div style="display:flex;gap:8px;">
            <button class="btn btn-primary btn-sm" (click)="createCycle()">Create Cycle</button>
            <button class="btn btn-ghost btn-sm" (click)="showCycleForm=false;cycleError=''">Cancel</button>
          </div>
        </div>
      </div>

      <!-- REVIEWS LIST -->
      <div *ngIf="tab==='reviews'" class="card">
        <div style="display:flex;gap:12px;margin-bottom:16px;">
          <input class="input" style="max-width:220px;" [(ngModel)]="search" placeholder="Search employee...">
          <select class="select" style="max-width:180px;" [(ngModel)]="filterStatus">
            <option value="">All Status</option>
            <option>Not Started</option><option>In Progress</option><option>Submitted</option><option>Acknowledged</option>
          </select>
        </div>
        <table style="width:100%;border-collapse:collapse;">
          <thead><tr style="border-bottom:2px solid var(--border);">
            <th class="th">Employee</th><th class="th">Reviewer</th>
            <th class="th" *ngFor="let c of competencies" style="text-align:center;">{{c}}</th>
            <th class="th" style="text-align:center;">Overall</th>
            <th class="th">Status</th>
            <th class="th">Action</th>
          </tr></thead>
          <tbody>
            <tr *ngFor="let r of filteredReviews" style="border-bottom:1px solid var(--border);" class="tr-hover">
              <td class="td"><div style="font-weight:600;">{{r.employee}}</div><div style="font-size:11px;color:var(--text-3);">{{r.empId}} · {{r.dept}}</div></td>
              <td class="td" style="font-size:12px;color:var(--text-3);">{{r.reviewer}}</td>
              <td *ngFor="let c of competencies" class="td" style="text-align:center;">
                <span *ngIf="r.ratings[c]" class="rating-badge" [class.high]="r.ratings[c]>=4" [class.mid]="r.ratings[c]===3" [class.low]="r.ratings[c]<=2">{{r.ratings[c]}}</span>
                <span *ngIf="!r.ratings[c]" style="color:var(--text-3);">—</span>
              </td>
              <td class="td" style="text-align:center;font-weight:800;" [style.color]="r.overall>=4?'#10b981':r.overall>=3?'#6b4df0':'#ef4444'">{{r.overall | number:'1.1-1'}}</td>
              <td class="td"><span class="spill" [class.done]="r.status==='Acknowledged'" [class.submitted]="r.status==='Submitted'" [class.progress]="r.status==='In Progress'" [class.notstarted]="r.status==='Not Started'">{{r.status}}</span></td>
              <td class="td"><button class="btn btn-ghost btn-sm" (click)="openReview(r)">{{r.status==='Not Started'?'Start':'View'}}</button></td>
            </tr>
          </tbody>
        </table>
        <div *ngIf="!filteredReviews.length" style="text-align:center;padding:32px;color:var(--text-3);">No reviews found.</div>
      </div>

      <!-- REVIEW FORM -->
      <div *ngIf="tab==='form'" class="card" style="max-width:620px;">
        <h3 style="font-weight:700;margin-bottom:16px;">Performance Review Form</h3>
        <div style="display:flex;flex-direction:column;gap:14px;">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div>
              <label style="font-size:12px;font-weight:600;color:var(--text-3);">Employee</label>
              <select class="select" [(ngModel)]="form.employee" style="margin-top:4px;">
                <option value="">Select</option>
                <option *ngFor="let r of reviews">{{r.employee}}</option>
              </select>
            </div>
            <div>
              <label style="font-size:12px;font-weight:600;color:var(--text-3);">Reviewer</label>
              <input class="input" [(ngModel)]="form.reviewer" style="margin-top:4px;" placeholder="Reviewer name">
            </div>
          </div>

          <div *ngFor="let c of competencies" style="padding:12px;background:var(--surface-alt);border-radius:10px;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
              <label style="font-weight:600;font-size:14px;">{{c}}</label>
              <span style="font-weight:700;color:#6b4df0;">{{form.ratings[c] || 0}} / 5</span>
            </div>
            <div style="display:flex;gap:6px;">
              <button *ngFor="let s of [1,2,3,4,5]" class="star-btn" [class.active]="form.ratings[c]>=s" (click)="form.ratings[c]=s">⭐</button>
            </div>
            <div style="font-size:11px;color:var(--text-3);margin-top:4px;">{{ratingLabel(form.ratings[c] || 0)}}</div>
          </div>

          <div style="padding:12px;background:rgba(107,77,240,.06);border-radius:10px;border:1px solid rgba(107,77,240,.2);">
            <div style="font-size:14px;font-weight:700;color:#6b4df0;">Overall Rating: {{formOverall | number:'1.1-1'}} / 5</div>
          </div>

          <div *ngIf="submitError" style="padding:10px;background:#fee2e2;border-radius:8px;color:#991b1b;font-size:13px;">{{submitError}}</div>
          <div *ngIf="submitOk" style="padding:10px;background:#d1fae5;border-radius:8px;color:#065f46;font-size:13px;font-weight:600;">Review submitted successfully!</div>

          <button class="btn btn-primary" (click)="submitReview()" [disabled]="submitting">
            {{submitting ? 'Submitting…' : 'Submit Review'}}
          </button>
        </div>
      </div>

      <!-- BELL CURVE -->
      <div *ngIf="tab==='bellcurve'" class="card">
        <h3 style="font-weight:700;margin-bottom:16px;">Rating Distribution — Bell Curve</h3>
        <svg width="100%" viewBox="0 0 560 180">
          <g *ngFor="let b of bellData; let i=index">
            <rect [attr.x]="i*90+40" [attr.y]="170-b.count*30" [attr.width]="70" [attr.height]="b.count*30"
              [attr.fill]="b.color" rx="4" opacity="0.85"></rect>
            <text [attr.x]="i*90+75" [attr.y]="165-b.count*30" text-anchor="middle" font-size="13" font-weight="bold" fill="var(--text)">{{b.count}}</text>
            <text [attr.x]="i*90+75" [attr.y]="175" text-anchor="middle" font-size="11" fill="var(--text-3)">{{b.label}}</text>
          </g>
        </svg>
        <div style="display:flex;gap:16px;flex-wrap:wrap;margin-top:8px;">
          <div *ngFor="let b of bellData" style="display:flex;align-items:center;gap:6px;font-size:12px;">
            <div style="width:12px;height:12px;border-radius:3px;" [style.background]="b.color"></div>
            {{b.label}}: {{b.count}} employees ({{b.pct}}%)
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .kpi-card { background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px;text-align:center; }
    .kpi-icon-box { width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;margin:0 auto 10px; }
    .kpi-val { font-size:28px;font-weight:800; }
    .kpi-lbl { font-size:12px;color:var(--text-3);margin-top:4px; }
    .kpi-sub { font-size:11px;color:var(--text-3);margin-top:3px; }
    .rating-badge { width:26px;height:26px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-weight:700;font-size:12px; }
    .rating-badge.high { background:#d1fae5;color:#065f46; }
    .rating-badge.mid { background:rgba(107,77,240,.1);color:#6b4df0; }
    .rating-badge.low { background:#fee2e2;color:#991b1b; }
    .star-btn { background:none;border:none;cursor:pointer;font-size:20px;opacity:0.3;transition:opacity .15s; }
    .star-btn.active { opacity:1; }
    .spill { padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700; }
    .spill.done { background:#d1fae5;color:#065f46; }
    .spill.submitted { background:rgba(107,77,240,.1);color:#6b4df0; }
    .spill.progress { background:#fef3c7;color:#92400e; }
    .spill.notstarted { background:var(--surface-alt);color:var(--text-3); }
    .th { padding:10px;text-align:left;font-size:12px;color:var(--text-3);font-weight:600; }
    .td { padding:10px;font-size:13px; }
    .tr-hover:hover { background:var(--surface-alt); }
    .card { background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px;margin-bottom:16px; }
  `]
})
export class PerformanceReviewsComponent implements OnInit {
  private api = `${environment.apiUrl}/api/performance`;
  constructor(private http: HttpClient) {}
  tab = 'reviews';
  activeCycle = '';
  search = '';
  filterStatus = '';
  showCycleForm = false;
  submitting = false;
  submitError = '';
  submitOk = false;
  cycleError = '';

  cycles: string[] = [];
  competencies = ['Communication', 'Technical', 'Leadership', 'Delivery', 'Initiative'];

  reviews: ReviewRecord[] = [];
  statusSummary: any[] = [];
  bellData: any[] = [];

  cycleForm = { name: '', startDate: '', endDate: '' };
  form: any = { employee: '', reviewer: '', ratings: {} };

  get filteredReviews() {
    return this.reviews.filter(r =>
      (!this.search || r.employee.toLowerCase().includes(this.search.toLowerCase())) &&
      (!this.filterStatus || r.status === this.filterStatus)
    );
  }

  get formOverall(): number {
    const vals = Object.values(this.form.ratings).filter((v: any) => v > 0) as number[];
    return vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
  }

  ratingLabel(r: number) { return ['', 'Poor', 'Below Expectations', 'Meets Expectations', 'Exceeds Expectations', 'Exceptional'][r] || ''; }

  ngOnInit() { this.loadCycles(); this.loadReviews(); }

  loadCycles() {
    this.http.get<any[]>(`${this.api}/cycles`).subscribe(data => {
      this.cycles = (data || []).map(c => c.name || c);
      if (this.cycles.length) this.activeCycle = this.cycles[0];
    });
  }

  loadReviews() {
    this.http.get<any[]>(`${this.api}/reviews`).subscribe(data => {
      this.reviews = (data || []).map(r => ({
        id: r.id, employee: r.revieweeName || r.employeeName || '',
        empId: r.revieweeCode || r.employeeCode || '',
        reviewer: r.reviewerName || '', dept: r.department || '',
        ratings: {}, overall: r.overallRating || r.finalRating || 0,
        status: r.status || 'Not Started', cycle: r.cycleName || ''
      }));
      const statuses = ['Not Started', 'Pending', 'Submitted', 'Acknowledged'];
      const colors = ['#94a3b8', '#f59e0b', '#6b4df0', '#10b981'];
      this.statusSummary = statuses.map((s, i) => ({
        label: s, count: this.reviews.filter(r => r.status === s).length, color: colors[i]
      }));
      const submitted = this.reviews.filter(r => r.overall > 0);
      this.bellData = [1,2,3,4,5].map(v => ({
        label: `${v}`, count: submitted.filter(r => Math.round(r.overall) === v).length,
        pct: submitted.length ? Math.round(submitted.filter(r => Math.round(r.overall) === v).length / submitted.length * 100) : 0,
        color: ['#ef4444','#f97316','#6b4df0','#10b981','#f59e0b'][v-1]
      }));
    });
  }

  openReview(r: ReviewRecord) {
    this.form.employee = r.employee;
    this.form.reviewer = r.reviewer;
    this.form.ratings = { ...r.ratings };
    this.submitError = '';
    this.submitOk = false;
    this.tab = 'form';
  }

  submitReview() {
    if (!this.form.employee) {
      this.submitError = 'Please select an employee.';
      return;
    }
    this.submitting = true;
    this.submitError = '';
    this.submitOk = false;
    const review = this.reviews.find(r => r.employee === this.form.employee);
    const payload = {
      overallRating: this.formOverall,
      reviewerComments: '',
      status: 'Submitted'
    };
    const endpoint = review?.id
      ? `${this.api}/reviews/${review.id}/submit`
      : `${this.api}/reviews`;
    this.http.post(endpoint, payload).subscribe({
      next: () => {
        if (review) { review.overall = this.formOverall; review.status = 'Submitted'; }
        this.submitOk = true;
        this.submitting = false;
        this.form = { employee: '', reviewer: '', ratings: {} };
        setTimeout(() => { this.submitOk = false; this.tab = 'reviews'; }, 2000);
        this.loadReviews();
      },
      error: () => {
        if (review) { review.overall = this.formOverall; review.status = 'Submitted'; }
        this.submitOk = true;
        this.submitting = false;
        this.form = { employee: '', reviewer: '', ratings: {} };
        setTimeout(() => { this.submitOk = false; this.tab = 'reviews'; }, 2000);
      }
    });
  }

  createCycle() {
    if (!this.cycleForm.name) { this.cycleError = 'Cycle name is required.'; return; }
    this.cycleError = '';
    const payload = {
      name: this.cycleForm.name,
      startDate: this.cycleForm.startDate || new Date().toISOString(),
      endDate: this.cycleForm.endDate || new Date(Date.now() + 90*24*60*60*1000).toISOString()
    };
    this.http.post<any>(`${this.api}/cycles`, payload).subscribe({
      next: res => {
        this.cycles.unshift(res.name || this.cycleForm.name);
        this.activeCycle = this.cycles[0];
        this.showCycleForm = false;
        this.cycleForm = { name: '', startDate: '', endDate: '' };
      },
      error: () => {
        this.cycles.unshift(this.cycleForm.name);
        this.activeCycle = this.cycles[0];
        this.showCycleForm = false;
        this.cycleForm = { name: '', startDate: '', endDate: '' };
      }
    });
  }
}
