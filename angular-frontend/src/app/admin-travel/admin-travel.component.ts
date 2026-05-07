import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-admin-travel',
  template: `
    <div class="page-container page-enter">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="page-title">Administration & Travel</h1>
          <p style="color:var(--text-3);font-size:13px;">Travel requests · Advance management · Expense claims</p>
        </div>
        <div style="display:flex;gap:8px;">
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='requests'" (click)="tab='requests'">Travel Requests</button>
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='advances'" (click)="tab='advances'">Advances</button>
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='claims'" (click)="tab='claims'">Expense Claims</button>
          <button class="btn btn-ghost btn-sm" [class.btn-primary]="tab==='newRequest'" (click)="tab='newRequest'">+ New Request</button>
        </div>
      </div>

      <!-- KPIs -->
      <div style="display:grid;grid-template-columns:repeat(6,1fr);gap:16px;margin-bottom:24px;">
        <div class="kpi-card"><div class="kpi-val" style="color:#f59e0b;">{{stats.PendingRequests||0}}</div><div class="kpi-lbl">Pending Requests</div></div>
        <div class="kpi-card"><div class="kpi-val" style="color:#10b981;">{{stats.ApprovedRequests||0}}</div><div class="kpi-lbl">Approved</div></div>
        <div class="kpi-card"><div class="kpi-val" style="color:#6b4df0;">₹{{(stats.TotalBudgetUsed||0)|number:'1.0-0'}}</div><div class="kpi-lbl">Budget Used</div></div>
        <div class="kpi-card"><div class="kpi-val" style="color:#ef4444;">{{stats.PendingClaims||0}}</div><div class="kpi-lbl">Pending Claims</div></div>
        <div class="kpi-card"><div class="kpi-val" style="color:#2563eb;">{{stats.PendingAdvances||0}}</div><div class="kpi-lbl">Pending Advances</div></div>
        <div class="kpi-card"><div class="kpi-val" style="color:#6b4df0;">₹{{(stats.AvgTripCost||0)|number:'1.0-0'}}</div><div class="kpi-lbl">Avg Trip Cost</div></div>
      </div>

      <!-- TRAVEL REQUESTS -->
      <div *ngIf="tab==='requests'">
        <div style="display:flex;gap:12px;margin-bottom:16px;">
          <select class="select" style="max-width:160px;" [(ngModel)]="reqFilter" (change)="loadRequests()">
            <option value="">All Status</option>
            <option>Pending</option><option>Approved</option><option>Rejected</option><option>Completed</option>
          </select>
        </div>
        <div style="display:flex;flex-direction:column;gap:12px;">
          <div *ngFor="let r of requests" class="card" style="padding:16px;">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px;">
              <div>
                <div style="font-weight:700;font-size:15px;">{{r.destination}} — {{r.purpose}}</div>
                <div style="font-size:12px;color:var(--text-3);margin-top:2px;">
                  {{r.employeeName}} · {{r.requestNumber}} · {{r.travelType}} · {{r.transportMode}}
                </div>
                <div style="font-size:12px;color:var(--text-3);">
                  {{r.travelFromDate|date:'dd MMM'}} – {{r.travelToDate|date:'dd MMM yyyy'}}
                </div>
              </div>
              <div style="text-align:right;">
                <span class="status-chip" [class]="travelStatusClass(r.status)">{{r.status}}</span>
                <div style="font-weight:700;font-size:14px;margin-top:6px;">₹{{r.estimatedCost|number}}</div>
              </div>
            </div>
            <div style="display:flex;gap:8px;" *ngIf="r.status==='Pending'">
              <button class="btn btn-primary btn-sm" (click)="approveRequest(r)">Approve</button>
              <button class="btn btn-ghost btn-sm" style="color:#ef4444;" (click)="rejectRequest(r)">Reject</button>
            </div>
          </div>
          <div *ngIf="!requests.length" style="padding:40px;text-align:center;color:var(--text-3);">No travel requests found.</div>
        </div>
      </div>

      <!-- ADVANCE REQUESTS -->
      <div *ngIf="tab==='advances'">
        <div style="display:flex;gap:12px;margin-bottom:16px;">
          <select class="select" style="max-width:160px;" [(ngModel)]="advFilter" (change)="loadAdvances()">
            <option value="">All Status</option>
            <option>Pending</option><option>Approved</option><option>Disbursed</option><option>Settled</option>
          </select>
          <button class="btn btn-primary btn-sm" (click)="tab='newAdvance'">+ New Advance</button>
        </div>
        <div class="card" style="padding:0;overflow:hidden;">
          <table style="width:100%;border-collapse:collapse;">
            <thead style="background:var(--surface-alt);">
              <tr>
                <th class="th">Request #</th>
                <th class="th">Employee</th>
                <th class="th">Purpose</th>
                <th class="th">Amount</th>
                <th class="th">Status</th>
                <th class="th">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let a of advances" style="border-bottom:1px solid var(--border);">
                <td class="td" style="font-weight:700;color:#6b4df0;">{{a.requestNumber}}</td>
                <td class="td">{{a.employeeName}}</td>
                <td class="td" style="max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">{{a.purpose}}</td>
                <td class="td" style="font-weight:700;">₹{{a.amount|number}}</td>
                <td class="td"><span class="status-chip" [class]="travelStatusClass(a.status)">{{a.status}}</span></td>
                <td class="td">
                  <div style="display:flex;gap:4px;" *ngIf="a.status==='Pending'">
                    <button class="btn btn-primary btn-sm" (click)="approveAdvance(a)">Approve</button>
                    <button class="btn btn-ghost btn-sm" (click)="disburseAdvance(a)" *ngIf="a.status==='Approved'">Disburse</button>
                  </div>
                  <button class="btn btn-ghost btn-sm" (click)="disburseAdvance(a)" *ngIf="a.status==='Approved'">Disburse</button>
                  <button class="btn btn-ghost btn-sm" (click)="settleAdvance(a)" *ngIf="a.status==='Disbursed'">Settle</button>
                </td>
              </tr>
            </tbody>
          </table>
          <div *ngIf="!advances.length" style="padding:40px;text-align:center;color:var(--text-3);">No advance requests found.</div>
        </div>
      </div>

      <!-- EXPENSE CLAIMS -->
      <div *ngIf="tab==='claims'">
        <div style="display:flex;gap:12px;margin-bottom:16px;">
          <select class="select" style="max-width:160px;" [(ngModel)]="claimFilter" (change)="loadClaims()">
            <option value="">All Status</option>
            <option>Draft</option><option>Submitted</option><option>Approved</option><option>Rejected</option><option>Paid</option>
          </select>
          <button class="btn btn-primary btn-sm" (click)="tab='newClaim'">+ New Claim</button>
        </div>
        <div style="display:flex;flex-direction:column;gap:12px;">
          <div *ngFor="let c of claims" class="card" style="padding:16px;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
              <div>
                <div style="font-weight:700;">{{c.claimNumber}} — {{c.employeeName}}</div>
                <div style="font-size:12px;color:var(--text-3);">{{c.lineItems?.length||0}} items · Created {{c.createdAt|date:'dd MMM'}}</div>
              </div>
              <div style="text-align:right;">
                <span class="status-chip" [class]="travelStatusClass(c.status)">{{c.status}}</span>
                <div style="font-weight:800;color:#6b4df0;font-size:16px;margin-top:4px;">₹{{c.totalAmount|number}}</div>
              </div>
            </div>
            <div *ngIf="c.lineItems?.length" style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px;">
              <span *ngFor="let li of c.lineItems" style="font-size:11px;background:var(--surface-alt);padding:2px 8px;border-radius:4px;">
                {{li.category}}: ₹{{li.amount|number}}
              </span>
            </div>
            <div style="display:flex;gap:8px;" *ngIf="c.status==='Submitted'">
              <button class="btn btn-primary btn-sm" (click)="approveClaim(c)">Approve</button>
              <button class="btn btn-ghost btn-sm" style="color:#ef4444;" (click)="rejectClaim(c)">Reject</button>
            </div>
            <button class="btn btn-ghost btn-sm" *ngIf="c.status==='Approved'" (click)="payClaim(c)">Mark Paid</button>
          </div>
          <div *ngIf="!claims.length" style="padding:40px;text-align:center;color:var(--text-3);">No expense claims found.</div>
        </div>
      </div>

      <!-- NEW TRAVEL REQUEST FORM -->
      <div *ngIf="tab==='newRequest'" class="card" style="max-width:640px;">
        <h3 style="font-weight:700;margin-bottom:16px;">New Travel Request</h3>
        <div style="display:flex;flex-direction:column;gap:14px;">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div>
              <label class="lbl">Employee Name</label>
              <input class="input" [(ngModel)]="reqForm.employeeName" style="margin-top:4px;">
            </div>
            <div>
              <label class="lbl">Travel Type</label>
              <select class="select" [(ngModel)]="reqForm.travelType" style="margin-top:4px;">
                <option>Domestic</option><option>International</option>
              </select>
            </div>
          </div>
          <div>
            <label class="lbl">Destination</label>
            <input class="input" [(ngModel)]="reqForm.destination" placeholder="City / Country" style="margin-top:4px;">
          </div>
          <div>
            <label class="lbl">Purpose</label>
            <textarea class="textarea" [(ngModel)]="reqForm.purpose" rows="2" placeholder="Business purpose of travel" style="margin-top:4px;width:100%;"></textarea>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div>
              <label class="lbl">From Date</label>
              <input class="input" type="date" [(ngModel)]="reqForm.travelFromDate" style="margin-top:4px;">
            </div>
            <div>
              <label class="lbl">To Date</label>
              <input class="input" type="date" [(ngModel)]="reqForm.travelToDate" style="margin-top:4px;">
            </div>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div>
              <label class="lbl">Transport Mode</label>
              <select class="select" [(ngModel)]="reqForm.transportMode" style="margin-top:4px;">
                <option>Flight</option><option>Train</option><option>Bus</option><option>Car</option><option>Cab</option>
              </select>
            </div>
            <div>
              <label class="lbl">Estimated Cost (₹)</label>
              <input class="input" type="number" [(ngModel)]="reqForm.estimatedCost" style="margin-top:4px;">
            </div>
          </div>
          <div *ngIf="formMsg" [style.background]="formMsg.includes('success')?'#d1fae5':'#fee2e2'" style="padding:8px 12px;border-radius:8px;font-size:13px;font-weight:600;" [style.color]="formMsg.includes('success')?'#065f46':'#991b1b'">{{formMsg}}</div>
          <button class="btn btn-primary" (click)="submitRequest()">Submit Request</button>
        </div>
      </div>

      <!-- NEW ADVANCE FORM -->
      <div *ngIf="tab==='newAdvance'" class="card" style="max-width:500px;">
        <h3 style="font-weight:700;margin-bottom:16px;">New Advance Request</h3>
        <div style="display:flex;flex-direction:column;gap:14px;">
          <div>
            <label class="lbl">Employee Name</label>
            <input class="input" [(ngModel)]="advForm.employeeName" style="margin-top:4px;">
          </div>
          <div>
            <label class="lbl">Purpose</label>
            <textarea class="textarea" [(ngModel)]="advForm.purpose" rows="2" style="margin-top:4px;width:100%;"></textarea>
          </div>
          <div>
            <label class="lbl">Amount (₹)</label>
            <input class="input" type="number" [(ngModel)]="advForm.amount" style="margin-top:4px;">
          </div>
          <button class="btn btn-primary" (click)="submitAdvance()">Submit</button>
        </div>
      </div>

      <!-- NEW CLAIM FORM -->
      <div *ngIf="tab==='newClaim'" class="card" style="max-width:640px;">
        <h3 style="font-weight:700;margin-bottom:16px;">New Expense Claim</h3>
        <div style="display:flex;flex-direction:column;gap:14px;">
          <div>
            <label class="lbl">Employee Name</label>
            <input class="input" [(ngModel)]="claimForm.employeeName" style="margin-top:4px;">
          </div>
          <div>
            <label class="lbl" style="margin-bottom:8px;">Line Items</label>
            <div *ngFor="let li of claimForm.lineItems; let i=index" style="display:grid;grid-template-columns:130px 1fr 100px 32px;gap:8px;align-items:center;margin-bottom:6px;">
              <select class="select" [(ngModel)]="li.category">
                <option>Flight</option><option>Hotel</option><option>Meals</option><option>Transport</option><option>Misc</option>
              </select>
              <input class="input" [(ngModel)]="li.description" placeholder="Description">
              <input class="input" type="number" [(ngModel)]="li.amount" placeholder="₹">
              <button class="btn btn-ghost btn-sm" style="color:#ef4444;" (click)="removeLineItem(i)">✕</button>
            </div>
            <button class="btn btn-ghost btn-sm" (click)="addLineItem()">+ Add Item</button>
          </div>
          <div style="font-weight:700;font-size:16px;">Total: ₹{{totalClaimAmount|number}}</div>
          <button class="btn btn-primary" (click)="submitClaim()">Submit Claim</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .kpi-card { background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:16px;text-align:center; }
    .kpi-val { font-size:22px;font-weight:800; }
    .kpi-lbl { font-size:11px;color:var(--text-3);margin-top:4px; }
    .th { padding:10px 12px;text-align:left;font-size:11px;font-weight:700;color:var(--text-3);text-transform:uppercase;letter-spacing:.5px; }
    .td { padding:10px 12px;font-size:13px;vertical-align:middle; }
    .lbl { font-size:12px;font-weight:600;color:var(--text-3); }
    .status-chip { padding:2px 8px;border-radius:20px;font-size:11px;font-weight:700; }
    .status-pending,.status-draft { background:#fef3c7;color:#92400e; }
    .status-approved,.status-paid { background:#d1fae5;color:#065f46; }
    .status-rejected { background:#fee2e2;color:#991b1b; }
    .status-submitted { background:#dbeafe;color:#1d4ed8; }
    .status-disbursed { background:#ede9fe;color:#5b21b6; }
    .status-settled { background:#d1fae5;color:#065f46; }
    .status-completed { background:#d1fae5;color:#065f46; }
    .card { background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px; }
    .textarea { padding:8px 12px;border:1px solid var(--border);border-radius:8px;background:var(--surface);color:var(--text);resize:vertical;font-family:inherit;font-size:13px; }
  `]
})
export class AdminTravelComponent implements OnInit {
  private api = `${environment.apiUrl}/api/travel`;
  constructor(private http: HttpClient) {}

  tab = 'requests';
  stats: any = {};
  requests: any[] = [];
  advances: any[] = [];
  claims: any[] = [];
  reqFilter = '';
  advFilter = '';
  claimFilter = '';
  formMsg = '';

  reqForm: any = { employeeName: '', travelType: 'Domestic', destination: '', purpose: '', travelFromDate: '', travelToDate: '', transportMode: 'Flight', estimatedCost: 0 };
  advForm: any = { employeeName: '', purpose: '', amount: 0 };
  claimForm: any = { employeeName: '', lineItems: [{ category: 'Flight', description: '', amount: 0 }] };

  get totalClaimAmount() { return this.claimForm.lineItems.reduce((s: number, l: any) => s + (l.amount || 0), 0); }

  ngOnInit() { this.loadStats(); this.loadRequests(); this.loadAdvances(); this.loadClaims(); }

  loadStats() { this.http.get<any>(`${this.api}/stats`).subscribe(d => { this.stats = d || {}; }); }

  loadRequests() {
    const params: any = {};
    if (this.reqFilter) params.status = this.reqFilter;
    this.http.get<any[]>(`${this.api}/requests`, { params }).subscribe(d => { this.requests = d || []; });
  }

  loadAdvances() {
    const params: any = {};
    if (this.advFilter) params.status = this.advFilter;
    this.http.get<any[]>(`${this.api}/advances`, { params }).subscribe(d => { this.advances = d || []; });
  }

  loadClaims() {
    const params: any = {};
    if (this.claimFilter) params.status = this.claimFilter;
    this.http.get<any[]>(`${this.api}/claims`, { params }).subscribe(d => { this.claims = d || []; });
  }

  approveRequest(r: any) { this.patchRequest(r.id, 'Approved'); }
  rejectRequest(r: any) { this.patchRequest(r.id, 'Rejected'); }
  patchRequest(id: string, status: string) {
    this.http.patch(`${this.api}/requests/${id}/status`, { status }).subscribe({
      next: () => { this.loadRequests(); this.loadStats(); },
      error: () => { const r = this.requests.find(x => x.id === id); if (r) r.status = status; }
    });
  }

  approveAdvance(a: any) { this.patchAdvance(a.id, 'Approved'); }
  disburseAdvance(a: any) { this.patchAdvance(a.id, 'Disbursed'); }
  settleAdvance(a: any) { this.patchAdvance(a.id, 'Settled'); }
  patchAdvance(id: string, status: string) {
    this.http.patch(`${this.api}/advances/${id}/status`, { status }).subscribe({
      next: () => { this.loadAdvances(); this.loadStats(); },
      error: () => { const a = this.advances.find(x => x.id === id); if (a) a.status = status; }
    });
  }

  approveClaim(c: any) { this.patchClaim(c.id, 'Approved'); }
  rejectClaim(c: any) { this.patchClaim(c.id, 'Rejected'); }
  payClaim(c: any) { this.patchClaim(c.id, 'Paid'); }
  patchClaim(id: string, status: string) {
    this.http.patch(`${this.api}/claims/${id}/status`, { status }).subscribe({
      next: () => { this.loadClaims(); this.loadStats(); },
      error: () => { const c = this.claims.find(x => x.id === id); if (c) c.status = status; }
    });
  }

  submitRequest() {
    if (!this.reqForm.employeeName || !this.reqForm.destination) { this.formMsg = 'Employee name and destination are required'; return; }
    this.http.post<any>(`${this.api}/requests`, this.reqForm).subscribe({
      next: () => { this.formMsg = 'Travel request submitted successfully'; this.loadRequests(); this.loadStats(); setTimeout(() => { this.formMsg = ''; this.tab = 'requests'; }, 2000); },
      error: () => { this.formMsg = 'Failed to submit request'; }
    });
  }

  submitAdvance() {
    if (!this.advForm.employeeName || !this.advForm.amount) return;
    this.http.post<any>(`${this.api}/advances`, this.advForm).subscribe({
      next: () => { this.loadAdvances(); this.loadStats(); this.tab = 'advances'; },
      error: () => { this.tab = 'advances'; }
    });
  }

  submitClaim() {
    if (!this.claimForm.employeeName) return;
    const payload = { ...this.claimForm, totalAmount: this.totalClaimAmount, status: 'Submitted' };
    this.http.post<any>(`${this.api}/claims`, payload).subscribe({
      next: () => { this.loadClaims(); this.loadStats(); this.tab = 'claims'; },
      error: () => { this.tab = 'claims'; }
    });
  }

  addLineItem() { this.claimForm.lineItems.push({ category: 'Misc', description: '', amount: 0 }); }
  removeLineItem(i: number) { this.claimForm.lineItems.splice(i, 1); }

  travelStatusClass(status: string) {
    return 'status-' + (status || '').toLowerCase().replace(' ', '');
  }
}
