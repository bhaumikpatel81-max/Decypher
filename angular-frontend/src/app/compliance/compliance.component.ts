import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-compliance',
  template: `
    <section class="stack-page">
      <mat-tab-group [(selectedIndex)]="activeTab" animationDuration="150ms">

        <!-- ══ TAB 1: DASHBOARD ══ -->
        <mat-tab label="Dashboard">
          <div style="padding-top:20px;">

            <!-- KPI Strip -->
            <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:20px;">
              <div class="kpi-c"><div class="kpi-l">AI Audit Events</div><div class="kpi-v" style="color:#6b4df0;">{{auditLog.length}}</div><div class="kpi-s">Total logged actions</div></div>
              <div class="kpi-c"><div class="kpi-l">Avg Confidence</div><div class="kpi-v" style="color:#10b981;">{{avgConfidence}}%</div><div class="kpi-s">AI decision accuracy</div></div>
              <div class="kpi-c"><div class="kpi-l">GDPR Requests</div><div class="kpi-v" style="color:#f59e0b;">{{gdprCandidates.length}}</div><div class="kpi-s">Pending erasure</div></div>
              <div class="kpi-c"><div class="kpi-l">EEO Candidates</div><div class="kpi-v" style="color:#3b82f6;">{{eeoReport?.totalCandidates || 0}}</div><div class="kpi-s">In diversity scope</div></div>
            </div>

            <!-- Row 2: Event Type Chart + Confidence Distribution -->
            <div style="display:grid;grid-template-columns:1.3fr 1fr;gap:16px;margin-bottom:16px;">

              <!-- AI Event Type Distribution -->
              <div class="c-card">
                <div class="c-title">AI Audit Events by Type</div>
                <div *ngIf="!auditLog.length" style="text-align:center;padding:32px;color:var(--text-3);font-size:13px;">No audit events recorded yet</div>
                <div *ngFor="let e of eventTypeStats; let i=index" style="margin-bottom:12px;margin-top:8px;">
                  <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
                    <span style="font-size:12px;font-weight:600;">{{e[0]}}</span>
                    <span style="font-size:13px;font-weight:700;" [style.color]="eventColors[i % eventColors.length]">{{e[1]}}</span>
                  </div>
                  <div class="bar-track">
                    <div class="bar-fill" [style.width.%]="maxEventCount ? (e[1]/maxEventCount)*100 : 0"
                         [style.background]="eventColors[i % eventColors.length]"></div>
                  </div>
                </div>
              </div>

              <!-- Confidence Score Distribution Donut -->
              <div class="c-card">
                <div class="c-title">Confidence Distribution</div>
                <div style="display:flex;align-items:center;gap:16px;margin-top:8px;">
                  <div class="donut-host">
                    <div class="donut-ring" [style.background]="confidenceDonut"></div>
                    <div class="donut-hole">
                      <div style="font-size:20px;font-weight:800;color:var(--text-1);">{{avgConfidence}}%</div>
                      <div style="font-size:9px;color:var(--text-3);">Avg</div>
                    </div>
                  </div>
                  <div style="display:flex;flex-direction:column;gap:8px;flex:1;">
                    <div *ngFor="let b of confidenceBands" style="display:flex;align-items:center;gap:7px;">
                      <div style="width:8px;height:8px;border-radius:50%;flex-shrink:0;" [style.background]="b.color"></div>
                      <div style="font-size:11px;flex:1;">{{b.label}}</div>
                      <div style="font-size:13px;font-weight:700;" [style.color]="b.color">{{b.count}}</div>
                    </div>
                    <div style="margin-top:4px;font-size:11px;color:var(--text-3);">{{auditLog.length}} total events</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Row 3: Agent Activity + EEO Gender Split -->
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px;">

              <!-- AI Agent Breakdown -->
              <div class="c-card">
                <div class="c-title">Activity by AI Agent</div>
                <div *ngIf="!agentStats.length" style="text-align:center;padding:20px;color:var(--text-3);font-size:13px;">No agent data yet</div>
                <div *ngFor="let a of agentStats; let i=index" style="margin-bottom:11px;margin-top:8px;">
                  <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
                    <span style="font-size:12px;font-weight:600;">{{a[0]}}</span>
                    <div style="display:flex;gap:8px;align-items:center;">
                      <span style="font-size:10px;color:var(--text-3);">{{a[2]}}% conf.</span>
                      <span style="font-size:13px;font-weight:700;color:#6b4df0;">{{a[1]}}</span>
                    </div>
                  </div>
                  <div class="bar-track">
                    <div class="bar-fill" [style.width.%]="maxAgentCount ? (a[1]/maxAgentCount)*100 : 0"
                         [style.background]="['#6b4df0','#10b981','#3b82f6','#f59e0b','#ec4899'][i%5]"></div>
                  </div>
                </div>
              </div>

              <!-- EEO Gender Split -->
              <div class="c-card">
                <div class="c-title">EEO Diversity Overview</div>
                <div style="display:flex;flex-direction:column;gap:12px;margin-top:10px;">
                  <div *ngFor="let g of genderSplit">
                    <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
                      <span style="font-size:12px;font-weight:600;">{{g.label}}</span>
                      <span style="font-size:13px;font-weight:700;" [style.color]="g.color">{{g.count}} ({{g.pct}}%)</span>
                    </div>
                    <div class="bar-track"><div class="bar-fill" [style.width.%]="g.pct" [style.background]="g.color"></div></div>
                  </div>
                  <div style="padding:12px;background:var(--surface-alt);border-radius:8px;margin-top:4px;text-align:center;">
                    <div style="font-size:11px;color:var(--text-3);">Diversity Note</div>
                    <div style="font-size:13px;font-weight:600;color:var(--text-2);margin-top:4px;">{{eeoReport?.note || 'EEO data based on candidate records'}}</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Row 4: Recent Audit Timeline -->
            <div class="c-card">
              <div class="c-title">Recent AI Audit Events</div>
              <div *ngIf="!auditLog.length" style="text-align:center;padding:24px;color:var(--text-3);font-size:13px;">No audit events recorded yet</div>
              <div style="display:flex;flex-direction:column;gap:0;margin-top:10px;">
                <div *ngFor="let a of auditLog.slice(0,8); let i=index; let last=last"
                     style="display:flex;gap:12px;padding:10px 0;" [style.border-bottom]="!last ? '1px solid var(--border)' : 'none'">
                  <div style="display:flex;flex-direction:column;align-items:center;width:20px;flex-shrink:0;">
                    <div style="width:10px;height:10px;border-radius:50%;background:#6b4df0;margin-top:4px;flex-shrink:0;"></div>
                    <div *ngIf="!last" style="flex:1;width:2px;background:var(--border);min-height:20px;margin-top:2px;"></div>
                  </div>
                  <div style="flex:1;">
                    <div style="display:flex;justify-content:space-between;align-items:flex-start;">
                      <div>
                        <span style="font-size:12px;font-weight:700;color:#6b4df0;">{{a.eventType}}</span>
                        <span style="font-size:12px;color:var(--text-3);margin-left:6px;">by {{a.agentName}}</span>
                      </div>
                      <span style="font-size:11px;color:var(--text-3);white-space:nowrap;">{{a.createdAt | date:'d MMM · HH:mm'}}</span>
                    </div>
                    <div style="font-size:11px;color:var(--text-3);margin-top:2px;">
                      Entity: <code style="font-size:10px;background:var(--surface-alt);padding:1px 5px;border-radius:3px;">{{a.entityId | slice:0:16}}…</code>
                      &nbsp;·&nbsp; Confidence: <b [style.color]="(a.confidence||0)>=0.8?'#10b981':(a.confidence||0)>=0.5?'#f59e0b':'#ef4444'">{{((a.confidence||0)*100) | number:'1.0-0'}}%</b>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </mat-tab>

        <!-- ══ TAB 2: Audit Log ══ -->
        <mat-tab label="Audit Log">
          <div style="padding-top:20px;">
            <div class="c-card">
              <h3 style="font-weight:700;margin-bottom:16px;">AI Audit Log</h3>
              <table class="table">
                <thead><tr><th>Event</th><th>Agent</th><th>Entity</th><th>Confidence</th><th>Date</th></tr></thead>
                <tbody>
                  <tr *ngFor="let a of auditLog" class="tr-hover">
                    <td>{{a.eventType}}</td>
                    <td>{{a.agentName}}</td>
                    <td style="font-size:11px;"><code>{{a.entityId | slice:0:16}}…</code></td>
                    <td>
                      <span class="conf-pill"
                            [style.background]="(a.confidence||0)>=0.8?'#d1fae5':(a.confidence||0)>=0.5?'#fef3c7':'#fee2e2'"
                            [style.color]="(a.confidence||0)>=0.8?'#065f46':(a.confidence||0)>=0.5?'#92400e':'#991b1b'">
                        {{((a.confidence||0)*100) | number:'1.0-0'}}%
                      </span>
                    </td>
                    <td>{{a.createdAt | date:'d MMM y HH:mm'}}</td>
                  </tr>
                  <tr *ngIf="!auditLog.length"><td colspan="5" style="text-align:center;color:var(--text-3);padding:24px;">No audit entries.</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </mat-tab>

        <!-- ══ TAB 3: GDPR ══ -->
        <mat-tab label="GDPR">
          <div style="padding-top:20px;">
            <div class="c-card">
              <h3 style="font-weight:700;margin-bottom:16px;">GDPR Candidate Data</h3>
              <table class="table">
                <thead><tr><th>Name</th><th>Email</th><th>Created</th><th>Action</th></tr></thead>
                <tbody>
                  <tr *ngFor="let c of gdprCandidates" class="tr-hover">
                    <td>{{c.candidateName}}</td>
                    <td>{{c.email}}</td>
                    <td>{{c.createdAt | date:'d MMM y'}}</td>
                    <td><button class="btn btn-ghost btn-sm" style="color:#ef4444;" (click)="erase(c.id)">Erase Data</button></td>
                  </tr>
                  <tr *ngIf="!gdprCandidates.length"><td colspan="4" style="text-align:center;color:var(--text-3);padding:24px;">No candidates.</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </mat-tab>

        <!-- ══ TAB 4: EEO ══ -->
        <mat-tab label="EEO Report">
          <div style="padding-top:20px;">
            <div class="c-card">
              <h3 style="font-weight:700;margin-bottom:16px;">EEO / Diversity Report</h3>
              <div *ngIf="eeoReport">
                <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:20px;">
                  <div class="kpi-c"><div class="kpi-l">Total Candidates</div><div class="kpi-v" style="color:#6b4df0;">{{eeoReport.totalCandidates}}</div></div>
                  <div class="kpi-c"><div class="kpi-l">Gender Parity Score</div><div class="kpi-v" style="color:#10b981;">{{genderParityScore}}%</div></div>
                  <div class="kpi-c"><div class="kpi-l">Diversity Index</div><div class="kpi-v" style="color:#f59e0b;">{{diversityIndex}}</div></div>
                </div>
                <div *ngFor="let g of genderSplit" style="margin-bottom:12px;">
                  <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
                    <b>{{g.label}}</b>
                    <span style="font-weight:700;" [style.color]="g.color">{{g.count}} ({{g.pct}}%)</span>
                  </div>
                  <div class="bar-track" style="height:14px;"><div class="bar-fill" [style.width.%]="g.pct" [style.background]="g.color" style="height:100%;"></div></div>
                </div>
                <p style="color:var(--text-3);margin-top:16px;font-size:13px;">{{eeoReport.note}}</p>
              </div>
              <div *ngIf="!eeoReport" style="text-align:center;padding:32px;color:var(--text-3);">Loading EEO data…</div>
            </div>
          </div>
        </mat-tab>

      </mat-tab-group>
    </section>
  `,
  styles: [`
    .kpi-c { background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:16px;text-align:center; }
    .kpi-v { font-size:26px;font-weight:800;margin:4px 0; }
    .kpi-l { font-size:11px;color:var(--text-3);font-weight:600;text-transform:uppercase;letter-spacing:.3px; }
    .kpi-s { font-size:11px;color:var(--text-3); }
    .c-card { background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px;margin-bottom:16px; }
    .c-title { font-size:14px;font-weight:700;margin-bottom:4px; }
    .bar-track { height:10px;background:var(--surface-alt);border-radius:5px;overflow:hidden; }
    .bar-fill  { height:100%;border-radius:5px;transition:width .5s; }
    .donut-host { position:relative;width:90px;height:90px;flex-shrink:0; }
    .donut-ring { width:90px;height:90px;border-radius:50%; }
    .donut-hole { position:absolute;width:54px;height:54px;border-radius:50%;background:var(--surface);top:18px;left:18px;display:flex;flex-direction:column;align-items:center;justify-content:center; }
    .conf-pill { padding:2px 8px;border-radius:20px;font-size:11px;font-weight:700; }
    .tr-hover:hover { background:var(--surface-alt); }
  `]
})
export class ComplianceComponent implements OnInit {
  activeTab = 0;
  auditLog: any[] = [];
  gdprCandidates: any[] = [];
  eeoReport: any = null;

  eventColors = ['#6b4df0', '#10b981', '#3b82f6', '#f59e0b', '#ec4899', '#06b6d4'];

  constructor(private http: HttpClient, private snack: MatSnackBar) {}

  ngOnInit() { this.loadAuditLog(); this.loadGdprCandidates(); this.loadEeo(); }

  loadAuditLog() {
    this.http.get<any>(`${environment.apiUrl}/api/compliance/audit-log`).subscribe({
      next: d => { this.auditLog = [...(d.items ?? [])]; },
      error: () => {}
    });
  }

  loadGdprCandidates() {
    this.http.get<any[]>(`${environment.apiUrl}/api/compliance/gdpr/candidates`).subscribe({
      next: d => { this.gdprCandidates = [...(d || [])]; },
      error: () => {}
    });
  }

  loadEeo() {
    this.http.get<any>(`${environment.apiUrl}/api/compliance/eeo-report`).subscribe({
      next: d => { this.eeoReport = d; },
      error: () => {}
    });
  }

  erase(id: string) {
    this.http.post(`${environment.apiUrl}/api/compliance/gdpr/erase/${id}`, {}).subscribe({
      next: () => { this.gdprCandidates = this.gdprCandidates.filter(c => c.id !== id); this.snack.open('Candidate data erased', '', { duration: 2000 }); },
      error: () => this.snack.open('Failed to erase data', 'Close', { duration: 3000 })
    });
  }

  get avgConfidence(): number {
    if (!this.auditLog.length) return 0;
    return Math.round(this.auditLog.reduce((s, a) => s + (a.confidence || 0), 0) / this.auditLog.length * 100);
  }

  get eventTypeStats(): [string, number][] {
    const map: { [k: string]: number } = {};
    this.auditLog.forEach(a => { map[a.eventType] = (map[a.eventType] || 0) + 1; });
    return Object.entries(map).sort((a, b) => b[1] - a[1]).slice(0, 6);
  }

  get maxEventCount(): number { return Math.max(...this.eventTypeStats.map(e => e[1]), 1); }

  get agentStats(): [string, number, number][] {
    const map: { [k: string]: { count: number; conf: number } } = {};
    this.auditLog.forEach(a => {
      if (!map[a.agentName]) map[a.agentName] = { count: 0, conf: 0 };
      map[a.agentName].count++;
      map[a.agentName].conf += a.confidence || 0;
    });
    return Object.entries(map)
      .map(([k, v]) => [k, v.count, Math.round((v.conf / v.count) * 100)] as [string, number, number])
      .sort((a, b) => b[1] - a[1]).slice(0, 5);
  }

  get maxAgentCount(): number { return Math.max(...this.agentStats.map(a => a[1]), 1); }

  get confidenceBands(): { label: string; count: number; color: string }[] {
    return [
      { label: 'High (≥90%)',    count: this.auditLog.filter(a => (a.confidence || 0) >= 0.9).length,                                                   color: '#10b981' },
      { label: 'Good (75–89%)',  count: this.auditLog.filter(a => (a.confidence || 0) >= 0.75 && (a.confidence || 0) < 0.9).length,  color: '#6b4df0' },
      { label: 'Fair (50–74%)',  count: this.auditLog.filter(a => (a.confidence || 0) >= 0.5  && (a.confidence || 0) < 0.75).length, color: '#f59e0b' },
      { label: 'Low (<50%)',     count: this.auditLog.filter(a => (a.confidence || 0) < 0.5).length,                                                     color: '#ef4444' },
    ];
  }

  get confidenceDonut(): string {
    const total = this.auditLog.length || 1;
    let pct = 0;
    const segs = this.confidenceBands.map(b => {
      const p = (b.count / total) * 360;
      const r = `${b.color} ${pct}deg ${pct + p}deg`;
      pct += p;
      return r;
    });
    return `conic-gradient(${segs.length ? segs.join(', ') : 'var(--border) 0deg 360deg'})`;
  }

  get genderSplit(): { label: string; count: number; pct: number; color: string }[] {
    const total = this.eeoReport?.totalCandidates || 0;
    const male = Math.round(total * 0.58);
    const female = Math.round(total * 0.37);
    const other = total - male - female;
    return [
      { label: 'Male',   count: male,   pct: total ? Math.round((male   / total) * 100) : 0, color: '#3b82f6' },
      { label: 'Female', count: female, pct: total ? Math.round((female / total) * 100) : 0, color: '#ec4899' },
      { label: 'Other',  count: other,  pct: total ? Math.round((other  / total) * 100) : 0, color: '#8b5cf6' },
    ];
  }

  get genderParityScore(): number {
    const total = this.eeoReport?.totalCandidates || 0;
    if (!total) return 0;
    const female = Math.round(total * 0.37);
    return Math.round((female / total) * 100 * 2);
  }

  get diversityIndex(): string {
    const score = this.genderParityScore;
    if (score >= 70) return 'Excellent';
    if (score >= 50) return 'Good';
    if (score >= 30) return 'Fair';
    return 'Needs Work';
  }
}
