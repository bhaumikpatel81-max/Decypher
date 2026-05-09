import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-interview-scheduler',
  template: `
    <section class="stack-page">
      <mat-tab-group [(selectedIndex)]="activeTab" animationDuration="150ms">

        <!-- ── TAB 1: Analytics ── -->
        <mat-tab label="Analytics">
          <div style="padding-top:20px;">

            <div class="kpi-grid" style="margin-bottom:24px;">
              <article class="kpi-tile">
                <div class="kpi-label">Total Scheduled</div>
                <div class="kpi-value">{{ interviews.length }}</div>
                <div class="kpi-meta">All interview slots</div>
              </article>
              <article class="kpi-tile">
                <div class="kpi-label">Completed</div>
                <div class="kpi-value" style="color:#10b981;">{{ completedCount }}</div>
                <div class="kpi-meta">Interviews done</div>
              </article>
              <article class="kpi-tile">
                <div class="kpi-label">Upcoming</div>
                <div class="kpi-value" style="color:#7c3aed;">{{ scheduledCount }}</div>
                <div class="kpi-meta">Still pending</div>
              </article>
              <article class="kpi-tile">
                <div class="kpi-label">Completion Rate</div>
                <div class="kpi-value" style="color:#06b6d4;">{{ completionRate }}%</div>
                <div class="kpi-meta">Vs total booked</div>
              </article>
            </div>

            <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px;">

              <!-- Type Bar Chart -->
              <div class="card" style="padding:24px;">
                <h3 style="margin:0 0 20px;">By Interview Type</h3>
                <div style="margin-bottom:18px;">
                  <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:6px;">
                    <span>📞 Phone</span><b>{{ phoneCount }}</b>
                  </div>
                  <div style="height:12px;background:#f1f5f9;border-radius:6px;overflow:hidden;">
                    <div [style.width.%]="phoneCount * 100 / maxType" style="height:100%;background:#7c3aed;border-radius:6px;transition:width .4s;"></div>
                  </div>
                </div>
                <div style="margin-bottom:18px;">
                  <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:6px;">
                    <span>📹 Video</span><b>{{ videoCount }}</b>
                  </div>
                  <div style="height:12px;background:#f1f5f9;border-radius:6px;overflow:hidden;">
                    <div [style.width.%]="videoCount * 100 / maxType" style="height:100%;background:#06b6d4;border-radius:6px;transition:width .4s;"></div>
                  </div>
                </div>
                <div>
                  <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:6px;">
                    <span>🏢 Onsite</span><b>{{ onsiteCount }}</b>
                  </div>
                  <div style="height:12px;background:#f1f5f9;border-radius:6px;overflow:hidden;">
                    <div [style.width.%]="onsiteCount * 100 / maxType" style="height:100%;background:#10b981;border-radius:6px;transition:width .4s;"></div>
                  </div>
                </div>
                <div *ngIf="!interviews.length" style="color:var(--text-3);text-align:center;padding:16px;">
                  No interviews scheduled yet
                </div>
              </div>

              <!-- Status Donut -->
              <div class="card" style="padding:24px;">
                <h3 style="margin:0 0 20px;">Status Breakdown</h3>
                <div style="display:flex;align-items:center;gap:24px;flex-wrap:wrap;">
                  <svg viewBox="0 0 120 120" width="140" height="140">
                    <circle cx="60" cy="60" r="45" fill="none" stroke="#f1f5f9" stroke-width="16"/>
                    <circle cx="60" cy="60" r="45" fill="none" stroke="#7c3aed" stroke-width="16"
                      [attr.stroke-dasharray]="scheduledDash + ' 283'"
                      stroke-dashoffset="0" transform="rotate(-90 60 60)"/>
                    <circle cx="60" cy="60" r="45" fill="none" stroke="#10b981" stroke-width="16"
                      [attr.stroke-dasharray]="completedDash + ' 283'"
                      [attr.stroke-dashoffset]="-scheduledDash" transform="rotate(-90 60 60)"/>
                    <circle cx="60" cy="60" r="45" fill="none" stroke="#ef4444" stroke-width="16"
                      [attr.stroke-dasharray]="cancelledDash + ' 283'"
                      [attr.stroke-dashoffset]="-(scheduledDash + completedDash)" transform="rotate(-90 60 60)"/>
                    <text x="60" y="55" text-anchor="middle" font-size="16" font-weight="700" fill="#1e293b">{{ completionRate }}%</text>
                    <text x="60" y="70" text-anchor="middle" font-size="9" fill="#94a3b8">DONE</text>
                  </svg>
                  <div style="display:flex;flex-direction:column;gap:10px;">
                    <div style="display:flex;align-items:center;gap:8px;font-size:12px;">
                      <span style="width:10px;height:10px;border-radius:2px;background:#7c3aed;display:inline-block;flex-shrink:0;"></span>
                      Scheduled <b style="margin-left:4px;">{{ scheduledCount }}</b>
                    </div>
                    <div style="display:flex;align-items:center;gap:8px;font-size:12px;">
                      <span style="width:10px;height:10px;border-radius:2px;background:#10b981;display:inline-block;flex-shrink:0;"></span>
                      Completed <b style="margin-left:4px;">{{ completedCount }}</b>
                    </div>
                    <div style="display:flex;align-items:center;gap:8px;font-size:12px;">
                      <span style="width:10px;height:10px;border-radius:2px;background:#ef4444;display:inline-block;flex-shrink:0;"></span>
                      Cancelled <b style="margin-left:4px;">{{ cancelledCount }}</b>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Volume Trend Line -->
            <div class="card" style="padding:24px;">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
                <h3 style="margin:0;">Interview Volume Trend</h3>
                <span style="font-size:12px;color:var(--text-3);">Last 6 months</span>
              </div>
              <svg viewBox="0 0 500 100" width="100%" height="100" style="overflow:visible;">
                <line x1="0" y1="33" x2="500" y2="33" stroke="#f1f5f9" stroke-width="1"/>
                <line x1="0" y1="66" x2="500" y2="66" stroke="#f1f5f9" stroke-width="1"/>
                <polyline [attr.points]="ivAreaPoints" fill="rgba(124,58,237,0.08)" stroke="none"/>
                <polyline [attr.points]="ivLinePoints" fill="none" stroke="#7c3aed" stroke-width="2.5"
                          stroke-linecap="round" stroke-linejoin="round"/>
                <circle *ngFor="let pt of ivDotPoints" [attr.cx]="pt.x" [attr.cy]="pt.y" r="4" fill="#7c3aed"/>
              </svg>
              <div style="display:flex;justify-content:space-between;margin-top:8px;">
                <span *ngFor="let m of ivMonths" style="font-size:11px;color:var(--text-3);">{{ m }}</span>
              </div>
            </div>
          </div>
        </mat-tab>

        <!-- ── TAB 2: Schedule ── -->
        <mat-tab label="Schedule">
          <div style="padding-top:20px;">
            <div class="grid grid-cols-2 gap-6">
              <div class="card form-card">
                <h3>Schedule Interview</h3>
                <input class="input" placeholder="Candidate ID" [(ngModel)]="form.candidateId">
                <input class="input" placeholder="Job ID" [(ngModel)]="form.jobId">
                <select class="select" [(ngModel)]="form.type">
                  <option>Phone</option><option>Video</option><option>Onsite</option>
                </select>
                <input class="input" type="datetime-local" [(ngModel)]="form.scheduledAt">
                <input class="input" placeholder="Meeting link (Zoom / Teams)" [(ngModel)]="form.meetingLink">
                <textarea class="textarea" placeholder="Notes" [(ngModel)]="form.notes" rows="3"></textarea>
                <button class="btn btn-primary" (click)="schedule()" [disabled]="saving">
                  {{ saving ? 'Scheduling…' : 'Schedule Interview' }}
                </button>
                <div *ngIf="saveOk" style="color:#10b981;margin-top:8px;">Interview scheduled!</div>
                <div *ngIf="saveErr" style="color:#ef4444;margin-top:8px;">{{ saveErr }}</div>
              </div>
              <div class="card">
                <h3>Upcoming Interviews</h3>
                <div *ngFor="let i of interviews" class="interview-item">
                  <div class="interview-type-badge">{{ i.type }}</div>
                  <div class="interview-detail">
                    <b>{{ i.scheduledAt | date:'d MMM y, HH:mm' }}</b>
                    <span style="color:var(--text-3);font-size:12px;">Candidate: {{ i.candidateId | slice:0:8 }}…</span>
                  </div>
                  <span class="chip" [class.chip-brand]="i.status==='Scheduled'">{{ i.status }}</span>
                </div>
                <div *ngIf="!interviews.length" style="color:var(--text-3);text-align:center;padding:20px;">
                  No upcoming interviews.
                </div>
              </div>
            </div>
          </div>
        </mat-tab>

      </mat-tab-group>
    </section>
  `,
  styles: [`
    .interview-item { display:flex; align-items:center; gap:12px; padding:10px 0; border-bottom:1px solid var(--border); }
    .interview-type-badge { background:var(--brand-bg); color:var(--brand); border-radius:6px; padding:4px 8px; font-size:11px; font-weight:700; }
    .interview-detail { flex:1; display:flex; flex-direction:column; gap:2px; }
  `]
})
export class InterviewSchedulerComponent implements OnInit {
  activeTab = 0;
  interviews: any[] = [];
  saving = false;
  saveOk = false;
  saveErr = '';
  form = { candidateId: '', jobId: '', type: 'Video', scheduledAt: '', meetingLink: '', notes: '', recruiterIds: [] as any[] };

  ivMonths: string[] = [];
  ivTrend: number[] = [0, 0, 0, 0, 0, 0];

  constructor(private http: HttpClient, private snack: MatSnackBar) {}

  ngOnInit() { this.loadInterviews(); }

  loadInterviews() {
    this.http.get<any[]>(`${environment.apiUrl}/api/interviews`).subscribe({
      next: data => {
        this.interviews = [...(data || []).map(i => ({
          id: i.id, type: i.interviewType || i.type || 'Video',
          scheduledAt: i.scheduledAt || i.scheduledDate || '',
          candidateId: i.candidateId || '',
          status: i.status || 'Scheduled',
          meetingLink: i.meetingLink || ''
        }))];
        this.buildTrend();
      },
      error: () => this.snack.open('Failed to load interviews', 'Close', { duration: 3000 })
    });
  }

  private buildTrend() {
    const now = new Date();
    const months: string[] = [];
    const counts: number[] = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push(d.toLocaleString('default', { month: 'short' }));
      const ym = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      counts.push(this.interviews.filter(iv => (iv.scheduledAt || '').slice(0, 7) === ym).length);
    }
    this.ivMonths = months;
    this.ivTrend = counts;
  }

  schedule() {
    this.saving = true; this.saveOk = false; this.saveErr = '';
    this.http.post<any>(`${environment.apiUrl}/api/interviews`, this.form)
      .subscribe({
        next: r => { this.interviews = [r, ...this.interviews]; this.saving = false; this.saveOk = true; },
        error: (err: any) => { this.saveErr = err?.error?.error ?? 'Failed to schedule'; this.saving = false; }
      });
  }

  get phoneCount()     { return this.interviews.filter(i => i.type === 'Phone').length; }
  get videoCount()     { return this.interviews.filter(i => i.type === 'Video').length; }
  get onsiteCount()    { return this.interviews.filter(i => i.type === 'Onsite').length; }
  get scheduledCount() { return this.interviews.filter(i => i.status === 'Scheduled').length; }
  get completedCount() { return this.interviews.filter(i => i.status === 'Completed').length; }
  get cancelledCount() { return this.interviews.filter(i => i.status === 'Cancelled').length; }
  get maxType()        { return Math.max(this.phoneCount, this.videoCount, this.onsiteCount, 1); }
  get completionRate() {
    return this.interviews.length ? Math.round(this.completedCount / this.interviews.length * 100) : 0;
  }

  private dash(n: number) { return Math.round((n / (this.interviews.length || 1)) * 283); }
  get scheduledDash()  { return this.dash(this.scheduledCount); }
  get completedDash()  { return this.dash(this.completedCount); }
  get cancelledDash()  { return this.dash(this.cancelledCount); }

  get ivLinePoints(): string {
    const pts = this.ivTrend, max = Math.max(...pts, 1), step = 500 / (pts.length - 1);
    return pts.map((v, i) => `${i * step},${90 - (v / max) * 80}`).join(' ');
  }
  get ivAreaPoints(): string {
    const pts = this.ivTrend, max = Math.max(...pts, 1), step = 500 / (pts.length - 1);
    const line = pts.map((v, i) => `${i * step},${90 - (v / max) * 80}`).join(' ');
    return `0,90 ${line} 500,90`;
  }
  get ivDotPoints(): {x: number, y: number}[] {
    const pts = this.ivTrend, max = Math.max(...pts, 1), step = 500 / (pts.length - 1);
    return pts.map((v, i) => ({ x: i * step, y: 90 - (v / max) * 80 }));
  }
}
