import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-requisitions',
  template: `
    <section class="stack-page">
      <mat-tab-group [(selectedIndex)]="activeTab" animationDuration="150ms">

        <!-- ── TAB 1: Analytics ── -->
        <mat-tab label="Analytics">
          <div style="padding-top:20px;">

            <div class="kpi-grid" style="margin-bottom:24px;">
              <article class="kpi-tile">
                <div class="kpi-lbl">Total Requisitions</div>
                <div class="kpi-val">{{ requisitions.length }}</div>
                <div class="kpi-sub">All requests</div>
              </article>
              <article class="kpi-tile">
                <div class="kpi-lbl">Pending Approval</div>
                <div class="kpi-val" style="color:#f59e0b;">{{ pendingCount }}</div>
                <div class="kpi-sub">Awaiting decision</div>
              </article>
              <article class="kpi-tile">
                <div class="kpi-lbl">Approved</div>
                <div class="kpi-val" style="color:#10b981;">{{ approvedCount }}</div>
                <div class="kpi-sub">Ready to hire</div>
              </article>
              <article class="kpi-tile">
                <div class="kpi-lbl">Filled</div>
                <div class="kpi-val" style="color:#7c3aed;">{{ filledCount }}</div>
                <div class="kpi-sub">Positions closed</div>
              </article>
            </div>

            <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px;">

              <!-- Status Donut -->
              <div class="c-card">
                <div class="c-title">Status Distribution</div>
                <div style="display:flex;align-items:center;gap:24px;flex-wrap:wrap;">
                  <svg viewBox="0 0 120 120" width="140" height="140">
                    <circle cx="60" cy="60" r="45" fill="none" stroke="#f1f5f9" stroke-width="16"/>
                    <circle cx="60" cy="60" r="45" fill="none" stroke="#f59e0b" stroke-width="16"
                      [attr.stroke-dasharray]="pendingDash + ' 283'"
                      stroke-dashoffset="0" transform="rotate(-90 60 60)"/>
                    <circle cx="60" cy="60" r="45" fill="none" stroke="#10b981" stroke-width="16"
                      [attr.stroke-dasharray]="approvedDash + ' 283'"
                      [attr.stroke-dashoffset]="-pendingDash" transform="rotate(-90 60 60)"/>
                    <circle cx="60" cy="60" r="45" fill="none" stroke="#7c3aed" stroke-width="16"
                      [attr.stroke-dasharray]="filledDash + ' 283'"
                      [attr.stroke-dashoffset]="-(pendingDash + approvedDash)" transform="rotate(-90 60 60)"/>
                    <text x="60" y="55" text-anchor="middle" font-size="18" font-weight="700" fill="#1e293b">{{ requisitions.length }}</text>
                    <text x="60" y="70" text-anchor="middle" font-size="10" fill="#94a3b8">TOTAL</text>
                  </svg>
                  <div style="display:flex;flex-direction:column;gap:10px;">
                    <div style="display:flex;align-items:center;gap:8px;font-size:13px;">
                      <span style="width:10px;height:10px;border-radius:50%;background:#f59e0b;display:inline-block;flex-shrink:0;"></span>
                      Pending <b style="margin-left:4px;">{{ pendingCount }}</b>
                    </div>
                    <div style="display:flex;align-items:center;gap:8px;font-size:13px;">
                      <span style="width:10px;height:10px;border-radius:50%;background:#10b981;display:inline-block;flex-shrink:0;"></span>
                      Approved <b style="margin-left:4px;">{{ approvedCount }}</b>
                    </div>
                    <div style="display:flex;align-items:center;gap:8px;font-size:13px;">
                      <span style="width:10px;height:10px;border-radius:50%;background:#7c3aed;display:inline-block;flex-shrink:0;"></span>
                      Filled <b style="margin-left:4px;">{{ filledCount }}</b>
                    </div>
                    <div style="display:flex;align-items:center;gap:8px;font-size:13px;">
                      <span style="width:10px;height:10px;border-radius:50%;background:#ef4444;display:inline-block;flex-shrink:0;"></span>
                      Rejected <b style="margin-left:4px;">{{ rejectedCount }}</b>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Department Bar Chart -->
              <div class="c-card">
                <div class="c-title">By Department</div>
                <div *ngFor="let d of deptStats" style="margin-bottom:14px;">
                  <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:5px;">
                    <span>{{ d.dept }}</span><b>{{ d.count }}</b>
                  </div>
                  <div style="height:8px;background:#f1f5f9;border-radius:4px;overflow:hidden;">
                    <div [style.width.%]="d.pct" style="height:100%;background:#7c3aed;border-radius:4px;transition:width .4s;"></div>
                  </div>
                </div>
                <div *ngIf="!deptStats.length" style="color:var(--text-3);text-align:center;padding:20px;">
                  No requisitions yet
                </div>
              </div>
            </div>

            <!-- Monthly Trend Line -->
            <div class="c-card">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
                <span style="font-size:14px;font-weight:700;">Requisition Trend</span>
                <span style="font-size:12px;color:var(--text-3);">Last 6 months</span>
              </div>
              <svg viewBox="0 0 500 100" width="100%" height="100" style="overflow:visible;">
                <line x1="0" y1="33" x2="500" y2="33" stroke="#f1f5f9" stroke-width="1"/>
                <line x1="0" y1="66" x2="500" y2="66" stroke="#f1f5f9" stroke-width="1"/>
                <polyline [attr.points]="reqAreaPoints" fill="rgba(124,58,237,0.08)" stroke="none"/>
                <polyline [attr.points]="reqLinePoints" fill="none" stroke="#7c3aed" stroke-width="2.5"
                          stroke-linecap="round" stroke-linejoin="round"/>
                <circle *ngFor="let pt of reqDotPoints" [attr.cx]="pt.x" [attr.cy]="pt.y" r="4" fill="#7c3aed"/>
              </svg>
              <div style="display:flex;justify-content:space-between;margin-top:8px;">
                <span *ngFor="let m of reqMonths" style="font-size:11px;color:var(--text-3);">{{ m }}</span>
              </div>
            </div>

            <!-- Priority × Status Pivot -->
            <div class="c-card">
              <div class="c-title">Priority × Status Pivot</div>
              <table class="table">
                <thead>
                  <tr>
                    <th>Priority</th>
                    <th *ngFor="let s of pivotStatuses">{{ s }}</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let row of priorityPivot">
                    <td>
                      <span class="chip" [style.background]="priorityColour(row.priority)">{{ row.priority }}</span>
                    </td>
                    <td *ngFor="let s of pivotStatuses">{{ row.counts[s] || 0 }}</td>
                    <td><b>{{ row.total }}</b></td>
                  </tr>
                  <tr *ngIf="!priorityPivot.length">
                    <td [attr.colspan]="pivotStatuses.length + 2" style="text-align:center;color:var(--text-3);padding:20px;">
                      No data yet
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </mat-tab>

        <!-- ── TAB 2: Manage ── -->
        <mat-tab label="Manage">
          <div style="padding-top:20px;">
            <div class="grid grid-cols-2 gap-6">
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
                    <button class="btn btn-ghost btn-sm" (click)="openReject(r.id)">Reject</button>
                  </div>
                </div>
                <div *ngIf="!requisitions.length" style="color:var(--text-3);text-align:center;padding:20px;">
                  No requisitions found.
                </div>
              </div>
            </div>
          </div>
        </mat-tab>

      </mat-tab-group>

      <!-- Reject Dialog -->
      <div *ngIf="showRejectDialog" style="position:fixed;inset:0;background:rgba(0,0,0,.4);z-index:1000;display:flex;align-items:center;justify-content:center;">
        <div style="background:var(--surface);border-radius:14px;padding:28px;max-width:400px;width:90%;">
          <h3 style="font-weight:700;margin:0 0 16px;">Reject Requisition</h3>
          <textarea class="textarea" placeholder="Reason for rejection (required)" [(ngModel)]="rejectReason" style="height:80px;margin-bottom:12px;"></textarea>
          <div style="display:flex;gap:8px;">
            <button class="btn btn-primary btn-sm" (click)="confirmReject()" [disabled]="!rejectReason.trim()">Confirm Reject</button>
            <button class="btn btn-ghost btn-sm" (click)="showRejectDialog=false">Cancel</button>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .kpi-tile  { background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:16px;text-align:center; }
    .kpi-val   { font-size:26px;font-weight:800;margin:4px 0; }
    .kpi-lbl   { font-size:11px;color:var(--text-3);font-weight:600;text-transform:uppercase;letter-spacing:.3px; }
    .kpi-sub   { font-size:11px;color:var(--text-3); }
    .c-card    { background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px;margin-bottom:16px; }
    .c-title   { font-size:14px;font-weight:700;margin-bottom:14px; }
    .bar-track { height:10px;background:var(--surface-alt);border-radius:5px;overflow:hidden; }
    .bar-fill  { height:100%;border-radius:5px;transition:width .5s; }
    .num-chip  { padding:2px 8px;border-radius:20px;font-size:11px;font-weight:700; }
    .req-row { display:flex; align-items:center; gap:10px; padding:10px 0; border-bottom:1px solid var(--border); flex-wrap:wrap; }
    .req-info { flex:1; display:flex; flex-direction:column; gap:2px; }
    .btn.active { background:var(--brand); color:#fff; }
  `]
})
export class RequisitionsComponent implements OnInit {
  activeTab = 0;
  requisitions: any[] = [];
  saving = false;
  saveOk = false;
  statusFilter = '';
  statusFilters = ['', 'Pending', 'Approved', 'Rejected', 'Filled'];
  departments = ['Engineering', 'Design', 'Marketing', 'Sales', 'HR', 'Operations'];
  form: any = { title: '', department: 'Engineering', headcount: 1, budgetMin: null, budgetMax: null, priority: 'Medium', justification: '' };

  reqMonths: string[] = [];
  reqTrendData: number[] = [0, 0, 0, 0, 0, 0];

  private buildTrend(items: any[], dateField: string) {
    const now = new Date(), months: string[] = [], counts: number[] = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push(d.toLocaleString('default', { month: 'short' }));
      const ym = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      counts.push(items.filter(x => (x[dateField] || '').slice(0, 7) === ym).length);
    }
    this.reqMonths = months; this.reqTrendData = counts;
  }
  readonly pivotStatuses = ['Pending', 'Approved', 'Filled', 'Rejected'];

  constructor(private http: HttpClient) {}

  ngOnInit() { this.load(); }

  load() {
    const q = this.statusFilter ? `?status=${this.statusFilter}` : '';
    this.http.get<any[]>(`${environment.apiUrl}/api/requisitions${q}`)
      .subscribe({ next: d => { this.requisitions = d; this.buildTrend(d, 'createdAt'); }, error: () => {} });
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

  rejectId = '';
  rejectReason = '';
  showRejectDialog = false;

  openReject(id: string) { this.rejectId = id; this.rejectReason = ''; this.showRejectDialog = true; }

  confirmReject() {
    if (!this.rejectReason.trim()) return;
    this.http.put(`${environment.apiUrl}/api/requisitions/${this.rejectId}/reject`, { reason: this.rejectReason })
      .subscribe({ next: () => { this.showRejectDialog = false; this.load(); }, error: () => { this.showRejectDialog = false; } });
  }

  get pendingCount()  { return this.requisitions.filter(r => r.status === 'Pending').length; }
  get approvedCount() { return this.requisitions.filter(r => r.status === 'Approved').length; }
  get filledCount()   { return this.requisitions.filter(r => r.status === 'Filled').length; }
  get rejectedCount() { return this.requisitions.filter(r => r.status === 'Rejected').length; }

  private pctDash(count: number) { return Math.round((count / (this.requisitions.length || 1)) * 283); }
  get pendingDash()  { return this.pctDash(this.pendingCount); }
  get approvedDash() { return this.pctDash(this.approvedCount); }
  get filledDash()   { return this.pctDash(this.filledCount); }

  get deptStats(): {dept: string, count: number, pct: number}[] {
    const counts: Record<string, number> = {};
    this.requisitions.forEach(r => { counts[r.department] = (counts[r.department] || 0) + 1; });
    const max = Math.max(...Object.values(counts), 1);
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 6)
      .map(([dept, count]) => ({ dept, count, pct: Math.round((count / max) * 100) }));
  }

  get priorityPivot(): {priority: string, counts: Record<string, number>, total: number}[] {
    return ['Critical', 'High', 'Medium', 'Low'].map(priority => {
      const rows = this.requisitions.filter(r => r.priority === priority);
      const counts: Record<string, number> = {};
      this.pivotStatuses.forEach(s => { counts[s] = rows.filter(r => r.status === s).length; });
      return { priority, counts, total: rows.length };
    }).filter(r => r.total > 0);
  }

  get reqLinePoints(): string {
    const pts = this.reqTrendData;
    const max = Math.max(...pts, 1);
    const step = 500 / (pts.length - 1);
    return pts.map((v, i) => `${i * step},${90 - (v / max) * 80}`).join(' ');
  }
  get reqAreaPoints(): string {
    const pts = this.reqTrendData;
    const max = Math.max(...pts, 1);
    const step = 500 / (pts.length - 1);
    const line = pts.map((v, i) => `${i * step},${90 - (v / max) * 80}`).join(' ');
    return `0,90 ${line} 500,90`;
  }
  get reqDotPoints(): {x: number, y: number}[] {
    const pts = this.reqTrendData;
    const max = Math.max(...pts, 1);
    const step = 500 / (pts.length - 1);
    return pts.map((v, i) => ({ x: i * step, y: 90 - (v / max) * 80 }));
  }

  priorityColour(p: string) { return p === 'Critical' ? '#fee2e2' : p === 'High' ? '#fef3c7' : '#f1f5f9'; }
  statusTextColour(s: string) { return s === 'Approved' ? '#065f46' : s === 'Rejected' ? '#991b1b' : 'var(--text)'; }
}
