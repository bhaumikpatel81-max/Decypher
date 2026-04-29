import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-compliance',
  template: `
    <section class="stack-page">
      <!-- Tabs -->
      <div class="card" style="display:flex;gap:0;padding:0;margin-bottom:0;overflow:hidden;border-radius:10px 10px 0 0;">
        <button class="tab-btn" [class.active]="tab==='audit'" (click)="tab='audit';loadAuditLog()">Audit Log</button>
        <button class="tab-btn" [class.active]="tab==='gdpr'" (click)="tab='gdpr';loadGdprCandidates()">GDPR Candidates</button>
        <button class="tab-btn" [class.active]="tab==='eeo'" (click)="tab='eeo';loadEeo()">EEO Report</button>
      </div>

      <!-- Audit Log -->
      <div *ngIf="tab==='audit'" class="card" style="margin-top:0;border-radius:0 0 10px 10px;">
        <h3>AI Audit Log</h3>
        <table class="table">
          <thead><tr><th>Event</th><th>Agent</th><th>Entity</th><th>Confidence</th><th>Date</th></tr></thead>
          <tbody>
            <tr *ngFor="let a of auditLog">
              <td>{{ a.eventType }}</td>
              <td>{{ a.agentName }}</td>
              <td style="font-size:11px;">{{ a.entityId | slice:0:12 }}…</td>
              <td>{{ (a.confidence * 100) | number:'1.0-0' }}%</td>
              <td>{{ a.createdAt | date:'d MMM y HH:mm' }}</td>
            </tr>
            <tr *ngIf="!auditLog.length">
              <td colspan="5" style="text-align:center;color:var(--text-3)">No audit entries.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- GDPR Candidates -->
      <div *ngIf="tab==='gdpr'" class="card" style="margin-top:0;border-radius:0 0 10px 10px;">
        <h3>GDPR Candidate Data</h3>
        <table class="table">
          <thead><tr><th>Name</th><th>Email</th><th>Created</th><th>Action</th></tr></thead>
          <tbody>
            <tr *ngFor="let c of gdprCandidates">
              <td>{{ c.candidateName }}</td>
              <td>{{ c.email }}</td>
              <td>{{ c.createdAt | date:'d MMM y' }}</td>
              <td>
                <button class="btn btn-ghost btn-sm" style="color:#ef4444;"
                  (click)="erase(c.id)">Erase</button>
              </td>
            </tr>
            <tr *ngIf="!gdprCandidates.length">
              <td colspan="4" style="text-align:center;color:var(--text-3)">No candidates.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- EEO Report -->
      <div *ngIf="tab==='eeo'" class="card" style="margin-top:0;border-radius:0 0 10px 10px;">
        <h3>EEO / Diversity Report</h3>
        <div *ngIf="eeoReport">
          <div class="metric-line"><span>Total Candidates</span><b>{{ eeoReport.totalCandidates }}</b></div>
          <p style="color:var(--text-3);margin-top:12px;font-size:13px;">{{ eeoReport.note }}</p>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .tab-btn { flex:1; padding:12px 16px; border:none; background:#f8fafc; cursor:pointer; font-weight:600; font-size:13px; color:var(--text-3); }
    .tab-btn.active { background:var(--brand); color:#fff; }
  `]
})
export class ComplianceComponent implements OnInit {
  tab = 'audit';
  auditLog: any[] = [];
  gdprCandidates: any[] = [];
  eeoReport: any = null;

  constructor(private http: HttpClient) {}

  ngOnInit() { this.loadAuditLog(); }

  loadAuditLog() {
    this.http.get<any>(`${environment.apiUrl}/api/compliance/audit-log`)
      .subscribe({ next: d => this.auditLog = d.items ?? [], error: () => {} });
  }

  loadGdprCandidates() {
    this.http.get<any[]>(`${environment.apiUrl}/api/compliance/gdpr/candidates`)
      .subscribe({ next: d => this.gdprCandidates = d, error: () => {} });
  }

  loadEeo() {
    this.http.get<any>(`${environment.apiUrl}/api/compliance/eeo-report`)
      .subscribe({ next: d => this.eeoReport = d, error: () => {} });
  }

  erase(id: string) {
    if (!confirm('Permanently erase this candidate\'s personal data?')) return;
    this.http.post(`${environment.apiUrl}/api/compliance/gdpr/erase/${id}`, {})
      .subscribe({ next: () => this.loadGdprCandidates(), error: () => {} });
  }
}
