import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-offer-management',
  template: `
    <section class="stack-page">
      <div class="grid grid-cols-2 gap-6">
        <!-- Create Offer -->
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

        <!-- Pending Offers -->
        <div class="card">
          <h3>Pending Offers <span class="chip chip-brand" style="margin-left:8px;">{{ pending.length }}</span></h3>
          <div *ngFor="let o of pending" class="offer-row">
            <div class="offer-info">
              <b>{{ o.currency }} {{ o.salary | number }}</b>
              <span style="font-size:12px;color:var(--text-3);">Expires {{ o.expiryDate | date:'d MMM y' }}</span>
            </div>
            <span class="chip" [style.background]="statusColour(o.status)">{{ o.status }}</span>
            <button class="btn btn-ghost btn-sm" (click)="sendOffer(o.id)" *ngIf="o.status==='Draft'">Send</button>
          </div>
          <div *ngIf="!pending.length" style="color:var(--text-3);text-align:center;padding:20px;">
            No pending offers.
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .offer-row { display:flex; align-items:center; gap:12px; padding:10px 0; border-bottom:1px solid var(--border); }
    .offer-info { flex:1; display:flex; flex-direction:column; gap:2px; }
  `]
})
export class OfferManagementComponent implements OnInit {
  pending: any[] = [];
  saving = false;
  saveOk = false;
  form = { candidateId: '', jobId: '', salary: 0, currency: 'INR', startDate: '', expiryDate: '', benefits: [] };

  constructor(private http: HttpClient) {}

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

  statusColour(s: string) {
    return s === 'Accepted' ? '#d1fae5' : s === 'Declined' ? '#fee2e2' : '#fef3c7';
  }
}
