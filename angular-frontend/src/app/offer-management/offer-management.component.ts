import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-offer-management',
  template: `
    <section class="stack-page">
      <mat-tab-group [(selectedIndex)]="activeTab" animationDuration="150ms">

        <!-- ── TAB 1: Analytics ── -->
        <mat-tab label="Analytics">
          <div style="padding-top:20px;">

            <div class="kpi-grid" style="margin-bottom:24px;">
              <article class="kpi-tile">
                <div class="kpi-label">Total Offers</div>
                <div class="kpi-value">{{ pending.length }}</div>
                <div class="kpi-meta">In pipeline</div>
              </article>
              <article class="kpi-tile">
                <div class="kpi-label">Accepted</div>
                <div class="kpi-value" style="color:#10b981;">{{ acceptedCount }}</div>
                <div class="kpi-meta">Candidates joining</div>
              </article>
              <article class="kpi-tile">
                <div class="kpi-label">Acceptance Rate</div>
                <div class="kpi-value" style="color:#7c3aed;">{{ acceptanceRate }}%</div>
                <div class="kpi-meta">Accepted vs decided</div>
              </article>
              <article class="kpi-tile">
                <div class="kpi-label">Total Value</div>
                <div class="kpi-value" style="font-size:22px;">{{ totalOfferValue | number:'1.0-0' }}</div>
                <div class="kpi-meta">Combined salary (INR)</div>
              </article>
            </div>

            <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px;">

              <!-- Status Donut -->
              <div class="card" style="padding:24px;">
                <h3 style="margin:0 0 20px;">Offer Status Mix</h3>
                <div style="display:flex;align-items:center;gap:24px;flex-wrap:wrap;">
                  <svg viewBox="0 0 120 120" width="140" height="140">
                    <circle cx="60" cy="60" r="45" fill="none" stroke="#f1f5f9" stroke-width="16"/>
                    <circle cx="60" cy="60" r="45" fill="none" stroke="#f59e0b" stroke-width="16"
                      [attr.stroke-dasharray]="draftDash + ' 283'"
                      stroke-dashoffset="0" transform="rotate(-90 60 60)"/>
                    <circle cx="60" cy="60" r="45" fill="none" stroke="#06b6d4" stroke-width="16"
                      [attr.stroke-dasharray]="sentDash + ' 283'"
                      [attr.stroke-dashoffset]="-draftDash" transform="rotate(-90 60 60)"/>
                    <circle cx="60" cy="60" r="45" fill="none" stroke="#10b981" stroke-width="16"
                      [attr.stroke-dasharray]="acceptedDash + ' 283'"
                      [attr.stroke-dashoffset]="-(draftDash + sentDash)" transform="rotate(-90 60 60)"/>
                    <circle cx="60" cy="60" r="45" fill="none" stroke="#ef4444" stroke-width="16"
                      [attr.stroke-dasharray]="declinedDash + ' 283'"
                      [attr.stroke-dashoffset]="-(draftDash + sentDash + acceptedDash)" transform="rotate(-90 60 60)"/>
                    <text x="60" y="55" text-anchor="middle" font-size="18" font-weight="700" fill="#1e293b">{{ acceptanceRate }}%</text>
                    <text x="60" y="70" text-anchor="middle" font-size="9" fill="#94a3b8">ACCEPT</text>
                  </svg>
                  <div style="display:flex;flex-direction:column;gap:10px;">
                    <div style="display:flex;align-items:center;gap:8px;font-size:12px;">
                      <span style="width:10px;height:10px;border-radius:2px;background:#f59e0b;display:inline-block;flex-shrink:0;"></span>
                      Draft <b style="margin-left:4px;">{{ draftCount }}</b>
                    </div>
                    <div style="display:flex;align-items:center;gap:8px;font-size:12px;">
                      <span style="width:10px;height:10px;border-radius:2px;background:#06b6d4;display:inline-block;flex-shrink:0;"></span>
                      Sent <b style="margin-left:4px;">{{ sentCount }}</b>
                    </div>
                    <div style="display:flex;align-items:center;gap:8px;font-size:12px;">
                      <span style="width:10px;height:10px;border-radius:2px;background:#10b981;display:inline-block;flex-shrink:0;"></span>
                      Accepted <b style="margin-left:4px;">{{ acceptedCount }}</b>
                    </div>
                    <div style="display:flex;align-items:center;gap:8px;font-size:12px;">
                      <span style="width:10px;height:10px;border-radius:2px;background:#ef4444;display:inline-block;flex-shrink:0;"></span>
                      Declined <b style="margin-left:4px;">{{ declinedCount }}</b>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Salary Buckets -->
              <div class="card" style="padding:24px;">
                <h3 style="margin:0 0 20px;">Salary Distribution</h3>
                <div *ngFor="let bucket of salaryBuckets" style="margin-bottom:14px;">
                  <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:5px;">
                    <span>{{ bucket.label }}</span><b>{{ bucket.count }}</b>
                  </div>
                  <div style="height:10px;background:#f1f5f9;border-radius:5px;overflow:hidden;">
                    <div [style.width.%]="bucket.pct" style="height:100%;background:#7c3aed;border-radius:5px;transition:width .4s;"></div>
                  </div>
                </div>
                <div *ngIf="!pending.length" style="color:var(--text-3);text-align:center;padding:20px;">
                  No offers yet
                </div>
              </div>
            </div>

            <!-- Trend Line -->
            <div class="card" style="padding:24px;">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
                <h3 style="margin:0;">Offer Pipeline Trend</h3>
                <span style="font-size:12px;color:var(--text-3);">Last 6 months</span>
              </div>
              <svg viewBox="0 0 500 100" width="100%" height="100" style="overflow:visible;">
                <line x1="0" y1="33" x2="500" y2="33" stroke="#f1f5f9" stroke-width="1"/>
                <line x1="0" y1="66" x2="500" y2="66" stroke="#f1f5f9" stroke-width="1"/>
                <polyline [attr.points]="offerAreaPoints" fill="rgba(16,185,129,0.08)" stroke="none"/>
                <polyline [attr.points]="offerLinePoints" fill="none" stroke="#10b981" stroke-width="2.5"
                          stroke-linecap="round" stroke-linejoin="round"/>
                <circle *ngFor="let pt of offerDotPoints" [attr.cx]="pt.x" [attr.cy]="pt.y" r="4" fill="#10b981"/>
              </svg>
              <div style="display:flex;justify-content:space-between;margin-top:8px;">
                <span *ngFor="let m of offerMonths" style="font-size:11px;color:var(--text-3);">{{ m }}</span>
              </div>
            </div>
          </div>
        </mat-tab>

        <!-- ── TAB 2: Manage ── -->
        <mat-tab label="Manage">
          <div style="padding-top:20px;">
            <div class="grid grid-cols-2 gap-6">
              <div class="card form-card">
                <h3>Create Offer</h3>
                <input class="input" placeholder="Candidate ID" [(ngModel)]="form.candidateId">
                <input class="input" placeholder="Job ID" [(ngModel)]="form.jobId">
                <div style="display:flex;gap:8px;">
                  <input class="input" placeholder="Salary" type="number" [(ngModel)]="form.salary" style="flex:1;">
                  <select class="select" [(ngModel)]="form.currency" style="flex:0 0 80px;">
                    <option>INR</option><option>GBP</option><option>USD</option><option>EUR</option>
                  </select>
                </div>
                <input class="input" type="date" placeholder="Start date" [(ngModel)]="form.startDate">
                <input class="input" type="date" placeholder="Offer expiry" [(ngModel)]="form.expiryDate">
                <button class="btn btn-primary" (click)="createOffer()" [disabled]="saving">
                  {{ saving ? 'Creating…' : 'Create Offer' }}
                </button>
                <div *ngIf="saveOk" style="color:#10b981;margin-top:8px;">Offer created!</div>
              </div>

              <div class="card">
                <h3>Pending Offers <span class="chip chip-brand" style="margin-left:8px;">{{ pending.length }}</span></h3>
                <div *ngFor="let o of pending" class="offer-row">
                  <div class="offer-info">
                    <b>{{ o.currency }} {{ o.salary | number }}</b>
                    <span style="font-size:12px;color:var(--text-3);">Expires {{ o.expiryDate | date:'d MMM y' }}</span>
                  </div>
                  <span class="chip" [style.background]="statusColour(o.status)">{{ o.status }}</span>
                  <button class="btn btn-ghost btn-sm" (click)="sendOffer(o.id)" *ngIf="o.status==='Draft'">Send</button>
                  <button class="btn btn-primary btn-sm" (click)="initiateOnboarding(o)"
                          *ngIf="o.status==='Accepted'" style="background:#10b981;border-color:#10b981;">
                    🚀 Onboard
                  </button>
                </div>
                <div *ngIf="!pending.length" style="color:var(--text-3);text-align:center;padding:20px;">
                  No pending offers.
                </div>
              </div>
            </div>
          </div>
        </mat-tab>

      </mat-tab-group>
    </section>
  `,
  styles: [`
    .offer-row { display:flex; align-items:center; gap:12px; padding:10px 0; border-bottom:1px solid var(--border); }
    .offer-info { flex:1; display:flex; flex-direction:column; gap:2px; }
  `]
})
export class OfferManagementComponent implements OnInit {
  activeTab = 0;
  pending: any[] = [];
  saving = false;
  saveOk = false;
  form = { candidateId: '', jobId: '', salary: 0, currency: 'INR', startDate: '', expiryDate: '', benefits: [] as any[] };

  readonly offerMonths = ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'];
  readonly offerTrend  = [3, 6, 4, 8, 10, 7];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() { this.loadPending(); }

  loadPending() {
    this.http.get<any[]>(`${environment.apiUrl}/api/offers/pending`)
      .subscribe({ next: d => this.pending = d, error: () => {} });
  }

  createOffer() {
    this.saving = true;
    this.http.post<any>(`${environment.apiUrl}/api/offers`, this.form)
      .subscribe({
        next: r => { this.pending = [...this.pending, r]; this.saving = false; this.saveOk = true; },
        error: () => { this.saving = false; }
      });
  }

  sendOffer(id: string) {
    this.http.put(`${environment.apiUrl}/api/offers/${id}/send`, {})
      .subscribe({ next: () => this.loadPending(), error: () => {} });
  }

  initiateOnboarding(offer: any) {
    this.http.post(`${environment.apiUrl}/api/onboarding`, {
      candidateId: offer.candidateId,
      candidateName: offer.candidateName || offer.candidateId,
      jobTitle: offer.jobTitle || '',
      offerId: offer.id,
      expectedStartDate: offer.startDate
    }).subscribe({
      next: () => this.router.navigate(['/onboarding']),
      error: () => this.router.navigate(['/onboarding'])
    });
  }

  get draftCount()    { return this.pending.filter(o => o.status === 'Draft').length; }
  get sentCount()     { return this.pending.filter(o => o.status === 'Sent').length; }
  get acceptedCount() { return this.pending.filter(o => o.status === 'Accepted').length; }
  get declinedCount() { return this.pending.filter(o => o.status === 'Declined').length; }
  get totalOfferValue() { return this.pending.reduce((s, o) => s + (o.salary || 0), 0); }
  get acceptanceRate() {
    const d = this.acceptedCount + this.declinedCount;
    return d ? Math.round(this.acceptedCount / d * 100) : 0;
  }

  private dash(n: number) { return Math.round((n / (this.pending.length || 1)) * 283); }
  get draftDash()    { return this.dash(this.draftCount); }
  get sentDash()     { return this.dash(this.sentCount); }
  get acceptedDash() { return this.dash(this.acceptedCount); }
  get declinedDash() { return this.dash(this.declinedCount); }

  get salaryBuckets(): {label: string, count: number, pct: number}[] {
    const ranges = [
      { label: '< 5 LPA',    min: 0,       max: 500000 },
      { label: '5–10 LPA',   min: 500000,  max: 1000000 },
      { label: '10–20 LPA',  min: 1000000, max: 2000000 },
      { label: '20–50 LPA',  min: 2000000, max: 5000000 },
      { label: '> 50 LPA',   min: 5000000, max: Infinity },
    ];
    const counts = ranges.map(r => this.pending.filter(o => (o.salary||0) >= r.min && (o.salary||0) < r.max).length);
    const max = Math.max(...counts, 1);
    return ranges.map((r, i) => ({ label: r.label, count: counts[i], pct: Math.round(counts[i] / max * 100) }));
  }

  get offerLinePoints(): string {
    const pts = this.offerTrend, max = Math.max(...pts, 1), step = 500 / (pts.length - 1);
    return pts.map((v, i) => `${i * step},${90 - (v / max) * 80}`).join(' ');
  }
  get offerAreaPoints(): string {
    const pts = this.offerTrend, max = Math.max(...pts, 1), step = 500 / (pts.length - 1);
    const line = pts.map((v, i) => `${i * step},${90 - (v / max) * 80}`).join(' ');
    return `0,90 ${line} 500,90`;
  }
  get offerDotPoints(): {x: number, y: number}[] {
    const pts = this.offerTrend, max = Math.max(...pts, 1), step = 500 / (pts.length - 1);
    return pts.map((v, i) => ({ x: i * step, y: 90 - (v / max) * 80 }));
  }

  statusColour(s: string) {
    return s === 'Accepted' ? '#d1fae5' : s === 'Declined' ? '#fee2e2' : '#fef3c7';
  }
}
