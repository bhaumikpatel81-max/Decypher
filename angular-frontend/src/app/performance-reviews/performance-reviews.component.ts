import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface ReviewRecord {
  id: number; employee: string; empId: string; reviewer: string; dept: string;
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

      <!-- Cycle Selector -->
      <div class="card" style="display:flex;align-items:center;gap:16px;margin-bottom:24px;flex-wrap:wrap;">
        <div>
          <label style="font-size:12px;font-weight:600;color:var(--text-3);">Review Cycle</label>
          <select class="select" [(ngModel)]="activeCycle" style="margin-top:4px;min-width:220px;">
            <option *ngFor="let c of cycles">{{c}}</option>
          </select>
        </div>
        <div style="margin-top:18px;">
          <button class="btn btn-primary btn-sm" (click)="createCycle()">+ New Cycle</button>
        </div>
        <div style="margin-left:auto;display:grid;grid-template-columns:repeat(4,1fr);gap:12px;">
          <div *ngFor="let s of statusSummary" style="text-align:center;padding:8px 16px;background:var(--surface-alt);border-radius:8px;">
            <div style="font-weight:700;font-size:18px;" [style.color]="s.color">{{s.count}}</div>
            <div style="font-size:11px;color:var(--text-3);">{{s.label}}</div>
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

          <button class="btn btn-primary" (click)="submitReview()">Submit Review</button>
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
  activeCycle = 'Annual Review 2026';
  search = '';
  filterStatus = '';

  cycles = ['Annual Review 2026', 'Mid-Year 2025', 'Annual Review 2025'];
  competencies = ['Communication', 'Technical', 'Leadership', 'Delivery', 'Initiative'];

  reviews: ReviewRecord[] = [
    { id: 1, employee: 'Arjun Mehta', empId: 'EMP001', reviewer: 'Satish Menon', dept: 'Engineering', ratings: { Communication: 4, Technical: 5, Leadership: 4, Delivery: 5, Initiative: 4 }, overall: 4.4, status: 'Submitted', cycle: 'Annual Review 2026' },
    { id: 2, employee: 'Priya Sharma', empId: 'EMP002', reviewer: 'Satish Menon', dept: 'HR', ratings: { Communication: 5, Technical: 4, Leadership: 5, Delivery: 4, Initiative: 5 }, overall: 4.6, status: 'Acknowledged', cycle: 'Annual Review 2026' },
    { id: 3, employee: 'Rahul Gupta', empId: 'EMP003', reviewer: 'Arjun Mehta', dept: 'DevOps', ratings: { Communication: 3, Technical: 5, Leadership: 3, Delivery: 4, Initiative: 4 }, overall: 3.8, status: 'Submitted', cycle: 'Annual Review 2026' },
    { id: 4, employee: 'Sneha Patel', empId: 'EMP004', reviewer: 'Arjun Mehta', dept: 'QA', ratings: { Communication: 4, Technical: 4, Leadership: 3, Delivery: 5, Initiative: 3 }, overall: 3.8, status: 'In Progress', cycle: 'Annual Review 2026' },
    { id: 5, employee: 'Vikram Singh', empId: 'EMP005', reviewer: 'Priya Sharma', dept: 'Support', ratings: { Communication: 4, Technical: 3, Leadership: 3, Delivery: 4, Initiative: 3 }, overall: 3.4, status: 'In Progress', cycle: 'Annual Review 2026' },
    { id: 6, employee: 'Ananya Iyer', empId: 'EMP006', reviewer: 'Satish Menon', dept: 'Business', ratings: { Communication: 5, Technical: 4, Leadership: 5, Delivery: 5, Initiative: 5 }, overall: 4.8, status: 'Acknowledged', cycle: 'Annual Review 2026' },
    { id: 7, employee: 'Kiran Desai', empId: 'EMP007', reviewer: 'Ananya Iyer', dept: 'Analytics', ratings: {}, overall: 0, status: 'Not Started', cycle: 'Annual Review 2026' },
    { id: 8, employee: 'Rohan Nair', empId: 'EMP008', reviewer: 'Arjun Mehta', dept: 'Infrastructure', ratings: {}, overall: 0, status: 'Not Started', cycle: 'Annual Review 2026' },
  ];

  statusSummary = [
    { label: 'Not Started', count: 2, color: '#94a3b8' },
    { label: 'In Progress', count: 2, color: '#f59e0b' },
    { label: 'Submitted', count: 2, color: '#6b4df0' },
    { label: 'Acknowledged', count: 2, color: '#10b981' },
  ];

  bellData = [
    { label: '1 (Poor)', count: 0, pct: 0, color: '#ef4444' },
    { label: '2 (Below)', count: 0, pct: 0, color: '#f97316' },
    { label: '3 (Meets)', count: 2, pct: 25, color: '#6b4df0' },
    { label: '4 (Exceeds)', count: 4, pct: 50, color: '#10b981' },
    { label: '5 (Exceptional)', count: 2, pct: 25, color: '#f59e0b' },
  ];

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

  ngOnInit() {}

  openReview(r: ReviewRecord) {
    this.form.employee = r.employee;
    this.form.reviewer = r.reviewer;
    this.form.ratings = { ...r.ratings };
    this.tab = 'form';
  }

  submitReview() {
    if (!this.form.employee) { alert('Select employee'); return; }
    const r = this.reviews.find(r => r.employee === this.form.employee);
    if (r) { r.ratings = { ...this.form.ratings }; r.overall = this.formOverall; r.status = 'Submitted'; }
    alert('Review submitted');
    this.form = { employee: '', reviewer: '', ratings: {} };
    this.tab = 'reviews';
  }

  createCycle() { alert('New review cycle created'); }
}
