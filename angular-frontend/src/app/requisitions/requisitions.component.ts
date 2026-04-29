import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-requisitions',
  template: `
    <section class="stack-page">
      <div class="grid grid-cols-2 gap-6">
        <!-- Create Requisition -->
        <div class="card form-card">
          <h3>New Headcount Request</h3>
          <input class="input" placeholder="Job title" [(ngModel)]="form.title">
          <select class="select" [(ngModel)]="form.department">
            <option *ngFor="let d of departments">{{ d }}</option>
          </select>
          <input class="input" type="number" placeholder="Headcount" [(ngModel)]="form.headcount">
          <div style="display:flex;gap:8px;">
            <input class="input" type="number" placeholder="Min salary" [(ngModel)]="form.budgetMin" style="flex:1;">
            <input class="input" type="number" placeholder="Max salary" [(ngModel)]="form.budgetMax" style="flex:1;">
          </div>
          <select class="select" [(ngModel)]="form.priority">
            <option>Low</option><option>Medium</option><option>High</option><option>Critical</option>
          </select>
          <textarea class="textarea" rows="3" placeholder="Justification…" [(ngModel)]="form.justification"></textarea>
          <button class="btn btn-primary" (click)="create()" [disabled]="saving">
            {{ saving ? 'Submitting…' : 'Submit Request' }}
          </button>
          <div *ngIf="saveOk" style="color:#10b981;margin-top:8px;">Request submitted for approval.</div>
        </div>

        <!-- Requisition List -->
        <div class="card">
          <h3>Requisitions</h3>
          <div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap;">
            <button class="btn btn-ghost btn-sm" *ngFor="let s of statusFilters"
              [class.active]="statusFilter===s" (click)="statusFilter=s;load()">{{ s || 'All' }}</button>
          </div>
          <div *ngFor="let r of requisitions" class="req-row">
            <div class="req-info">
              <b>{{ r.title }}</b>
              <span style="font-size:12px;color:var(--text-3);">{{ r.department }} · {{ r.headcount }} position(s)</span>
            </div>
            <span class="chip" [style.background]="priorityColour(r.priority)">{{ r.priority }}</span>
            <span class="chip" [style.color]="statusTextColour(r.status)">{{ r.status }}</span>
            <div style="display:flex;gap:4px;" *ngIf="r.status==='Pending'">
              <button class="btn btn-primary btn-sm" (click)="approve(r.id)">Approve</button>
              <button class="btn btn-ghost btn-sm" (click)="reject(r.id)">Reject</button>
            </div>
          </div>
          <div *ngIf="!requisitions.length" style="color:var(--text-3);text-align:center;padding:20px;">No requisitions found.</div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .req-row { display:flex; align-items:center; gap:10px; padding:10px 0; border-bottom:1px solid var(--border); flex-wrap:wrap; }
    .req-info { flex:1; display:flex; flex-direction:column; gap:2px; }
    .btn.active { background:var(--brand); color:#fff; }
  `]
})
export class RequisitionsComponent implements OnInit {
  requisitions: any[] = [];
  saving = false;
  saveOk = false;
  statusFilter = '';
  statusFilters = ['', 'Pending', 'Approved', 'Rejected', 'Filled'];
  departments = ['Engineering', 'Design', 'Marketing', 'Sales', 'HR', 'Operations'];
  form = { title: '', department: 'Engineering', headcount: 1, budgetMin: null, budgetMax: null, priority: 'Medium', justification: '' };

  constructor(private http: HttpClient) {}

  ngOnInit() { this.load(); }

  load() {
    const q = this.statusFilter ? `?status=${this.statusFilter}` : '';
    this.http.get<any[]>(`${environment.apiUrl}/api/requisitions${q}`)
      .subscribe({ next: d => this.requisitions = d, error: () => {} });
  }

  create() {
    this.saving = true;
    this.http.post<any>(`${environment.apiUrl}/api/requisitions`, this.form)
      .subscribe({
        next: r => { this.requisitions = [r, ...this.requisitions]; this.saving = false; this.saveOk = true; },
        error: () => { this.saving = false; }
      });
  }

  approve(id: string) {
    this.http.put(`${environment.apiUrl}/api/requisitions/${id}/approve`, {})
      .subscribe({ next: () => this.load(), error: () => {} });
  }

  reject(id: string) {
    const reason = prompt('Rejection reason:');
    if (!reason) return;
    this.http.put(`${environment.apiUrl}/api/requisitions/${id}/reject`, { reason })
      .subscribe({ next: () => this.load(), error: () => {} });
  }

  priorityColour(p: string) { return p === 'Critical' ? '#fee2e2' : p === 'High' ? '#fef3c7' : '#f1f5f9'; }
  statusTextColour(s: string) { return s === 'Approved' ? '#065f46' : s === 'Rejected' ? '#991b1b' : 'var(--text)'; }
}
