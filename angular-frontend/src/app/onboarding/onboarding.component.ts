import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const CATEGORY_LABELS: Record<string, string> = {
  ITSetup:         'IT Setup',
  Documents:       'Documents',
  Orientation:     'Orientation',
  BackgroundCheck: 'Background Check',
  ESignature:      'E-Signature',
};

const CATEGORY_ICONS: Record<string, string> = {
  ITSetup:         '💻',
  Documents:       '📄',
  Orientation:     '🎯',
  BackgroundCheck: '🔍',
  ESignature:      '✍️',
};

@Component({
  selector: 'app-onboarding',
  template: `
    <section class="stack-page">
      <mat-tab-group [(selectedIndex)]="activeTab" animationDuration="150ms">

        <!-- ── TAB 1: Analytics ── -->
        <mat-tab label="Analytics">
          <div style="padding-top:20px;">

            <div class="kpi-grid" style="margin-bottom:24px;">
              <article class="kpi-tile">
                <div class="kpi-label">Total Onboarding</div>
                <div class="kpi-value">{{ records.length }}</div>
                <div class="kpi-meta">Active pipeline</div>
              </article>
              <article class="kpi-tile">
                <div class="kpi-label">Completed</div>
                <div class="kpi-value" style="color:#10b981;">{{ completedOnboarding }}</div>
                <div class="kpi-meta">Fully onboarded</div>
              </article>
              <article class="kpi-tile">
                <div class="kpi-label">In Progress</div>
                <div class="kpi-value" style="color:#f59e0b;">{{ inProgressOnboarding }}</div>
                <div class="kpi-meta">Currently onboarding</div>
              </article>
              <article class="kpi-tile">
                <div class="kpi-label">Completion Rate</div>
                <div class="kpi-value" style="color:#7c3aed;">{{ completionRate }}%</div>
                <div class="kpi-meta">Overall progress</div>
              </article>
            </div>

            <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px;">

              <!-- Status Donut -->
              <div class="card" style="padding:24px;">
                <h3 style="margin:0 0 20px;">Onboarding Status</h3>
                <div style="display:flex;align-items:center;gap:24px;flex-wrap:wrap;">
                  <svg viewBox="0 0 120 120" width="140" height="140">
                    <circle cx="60" cy="60" r="45" fill="none" stroke="#f1f5f9" stroke-width="16"/>
                    <circle cx="60" cy="60" r="45" fill="none" stroke="#10b981" stroke-width="16"
                      [attr.stroke-dasharray]="completedDash + ' 283'"
                      stroke-dashoffset="0" transform="rotate(-90 60 60)"/>
                    <circle cx="60" cy="60" r="45" fill="none" stroke="#f59e0b" stroke-width="16"
                      [attr.stroke-dasharray]="inProgressDash + ' 283'"
                      [attr.stroke-dashoffset]="-completedDash" transform="rotate(-90 60 60)"/>
                    <circle cx="60" cy="60" r="45" fill="none" stroke="#e2e8f0" stroke-width="16"
                      [attr.stroke-dasharray]="notStartedDash + ' 283'"
                      [attr.stroke-dashoffset]="-(completedDash + inProgressDash)" transform="rotate(-90 60 60)"/>
                    <text x="60" y="55" text-anchor="middle" font-size="18" font-weight="700" fill="#1e293b">{{ completionRate }}%</text>
                    <text x="60" y="70" text-anchor="middle" font-size="9" fill="#94a3b8">COMPLETE</text>
                  </svg>
                  <div style="display:flex;flex-direction:column;gap:10px;">
                    <div style="display:flex;align-items:center;gap:8px;font-size:12px;">
                      <span style="width:10px;height:10px;border-radius:2px;background:#10b981;display:inline-block;flex-shrink:0;"></span>
                      Completed <b style="margin-left:4px;">{{ completedOnboarding }}</b>
                    </div>
                    <div style="display:flex;align-items:center;gap:8px;font-size:12px;">
                      <span style="width:10px;height:10px;border-radius:2px;background:#f59e0b;display:inline-block;flex-shrink:0;"></span>
                      In Progress <b style="margin-left:4px;">{{ inProgressOnboarding }}</b>
                    </div>
                    <div style="display:flex;align-items:center;gap:8px;font-size:12px;">
                      <span style="width:10px;height:10px;border-radius:2px;background:#e2e8f0;border:1px solid #cbd5e1;display:inline-block;flex-shrink:0;"></span>
                      Not Started <b style="margin-left:4px;">{{ notStartedOnboarding }}</b>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Category Completion Bars -->
              <div class="card" style="padding:24px;">
                <h3 style="margin:0 0 20px;">Completion by Category</h3>
                <div *ngFor="let c of categoryCompletion" style="margin-bottom:14px;">
                  <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:5px;">
                    <span>{{ catIcon(c.cat) }} {{ c.label }}</span><b>{{ c.pct }}%</b>
                  </div>
                  <div style="height:10px;background:#f1f5f9;border-radius:5px;overflow:hidden;">
                    <div [style.width.%]="c.pct"
                         [style.background]="c.pct >= 80 ? '#10b981' : c.pct >= 50 ? '#f59e0b' : '#ef4444'"
                         style="height:100%;border-radius:5px;transition:width .4s;"></div>
                  </div>
                </div>
                <div *ngIf="!records.length" style="color:var(--text-3);text-align:center;padding:20px;">
                  No onboarding records yet
                </div>
              </div>
            </div>

            <!-- Trend -->
            <div class="card" style="padding:24px;">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
                <h3 style="margin:0;">Onboarding Volume Trend</h3>
                <span style="font-size:12px;color:var(--text-3);">Last 6 months</span>
              </div>
              <svg viewBox="0 0 500 100" width="100%" height="100" style="overflow:visible;">
                <line x1="0" y1="33" x2="500" y2="33" stroke="#f1f5f9" stroke-width="1"/>
                <line x1="0" y1="66" x2="500" y2="66" stroke="#f1f5f9" stroke-width="1"/>
                <polyline [attr.points]="obAreaPts" fill="rgba(16,185,129,0.08)" stroke="none"/>
                <polyline [attr.points]="obLinePts" fill="none" stroke="#10b981" stroke-width="2.5"
                          stroke-linecap="round" stroke-linejoin="round"/>
                <circle *ngFor="let pt of obDotPts" [attr.cx]="pt.x" [attr.cy]="pt.y" r="4" fill="#10b981"/>
              </svg>
              <div style="display:flex;justify-content:space-between;margin-top:8px;">
                <span *ngFor="let m of obMonths" style="font-size:11px;color:var(--text-3);">{{ m }}</span>
              </div>
            </div>
          </div>
        </mat-tab>

        <!-- ── TAB 2: Pipeline ── -->
        <mat-tab label="Pipeline">
          <div style="padding-top:20px;">
      <div class="grid grid-cols-2 gap-6">

        <!-- LEFT: Candidate list -->
        <div class="card" style="padding:24px;">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;">
            <h3 style="margin:0;">Onboarding Pipeline</h3>
            <button class="btn btn-primary btn-sm" (click)="showInitiate=!showInitiate">
              {{ showInitiate ? 'Cancel' : '+ Initiate' }}
            </button>
          </div>

          <!-- Initiate form -->
          <div *ngIf="showInitiate" class="card" style="padding:16px;margin-bottom:16px;background:#f8f7ff;">
            <div style="font-weight:600;margin-bottom:12px;">Initiate Onboarding</div>
            <input class="input" placeholder="Candidate ID" [(ngModel)]="initForm.candidateId" style="margin-bottom:8px;">
            <input class="input" placeholder="Candidate Name" [(ngModel)]="initForm.candidateName" style="margin-bottom:8px;">
            <input class="input" placeholder="Job Title" [(ngModel)]="initForm.jobTitle" style="margin-bottom:8px;">
            <input class="input" placeholder="Offer ID (optional)" [(ngModel)]="initForm.offerId" style="margin-bottom:8px;">
            <input class="input" type="date" [(ngModel)]="initForm.expectedStartDate" style="margin-bottom:12px;">
            <button class="btn btn-primary" (click)="initiate()" [disabled]="initiating">
              {{ initiating ? 'Initiating…' : 'Start Onboarding' }}
            </button>
          </div>

          <!-- Records list -->
          <div *ngFor="let r of records"
               class="onboard-row"
               [class.selected]="selectedRecord?.id === r.id"
               (click)="select(r)">
            <div class="avatar-circle" [style.background]="statusBg(r.overallStatus)">
              {{ r.candidateName | slice:0:1 }}
            </div>
            <div style="flex:1;min-width:0;">
              <div style="font-weight:600;font-size:14px;">{{ r.candidateName }}</div>
              <div style="font-size:12px;color:var(--text-3);">{{ r.jobTitle }}</div>
            </div>
            <div style="text-align:right;flex-shrink:0;">
              <span class="status-badge"
                    [style.background]="statusBg(r.overallStatus)"
                    [style.color]="statusFg(r.overallStatus)">
                {{ r.overallStatus }}
              </span>
              <div style="font-size:11px;color:var(--text-3);margin-top:3px;">
                {{ completedCount(r) }}/{{ r.items?.length || 0 }} done
              </div>
            </div>
          </div>

          <div *ngIf="!records.length && !showInitiate"
               style="text-align:center;padding:48px 0;color:var(--text-3);">
            <div style="font-size:36px;margin-bottom:10px;">🚀</div>
            <div>No onboarding records yet.</div>
            <div style="font-size:13px;margin-top:4px;">
              Click "+ Initiate" or use the button in Offer Management.
            </div>
          </div>
        </div>

        <!-- RIGHT: Checklist detail -->
        <div class="card" style="padding:24px;" *ngIf="selectedRecord; else noSelection">
          <div style="margin-bottom:20px;">
            <h3 style="margin:0 0 4px;">{{ selectedRecord.candidateName }}</h3>
            <div style="font-size:13px;color:var(--text-3);">
              {{ selectedRecord.jobTitle }}
              <span *ngIf="selectedRecord.expectedStartDate">
                · Start: {{ selectedRecord.expectedStartDate | date:'dd MMM yyyy' }}
              </span>
            </div>
          </div>

          <!-- Progress bar -->
          <div style="margin-bottom:20px;">
            <div style="display:flex;justify-content:space-between;font-size:12px;color:var(--text-3);margin-bottom:6px;">
              <span>Progress</span>
              <span>{{ completedCount(selectedRecord) }} / {{ selectedRecord.items?.length || 0 }} tasks</span>
            </div>
            <div style="height:6px;background:#f1f5f9;border-radius:4px;overflow:hidden;">
              <div style="height:100%;background:var(--brand);border-radius:4px;transition:width .3s;"
                   [style.width]="progressPct(selectedRecord) + '%'"></div>
            </div>
          </div>

          <!-- Category groups -->
          <div *ngFor="let cat of categories">
            <div *ngIf="itemsForCat(selectedRecord, cat).length">
              <div class="cat-header">
                {{ catIcon(cat) }} {{ catLabel(cat) }}
              </div>
              <div *ngFor="let item of itemsForCat(selectedRecord, cat)" class="checklist-row">
                <div class="check-icon"
                     [style.background]="item.status === 'Complete' ? '#10b981' : item.status === 'InProgress' ? '#f59e0b' : '#e2e8f0'"
                     (click)="cycleStatus(item)">
                  <span *ngIf="item.status === 'Complete'" style="color:#fff;font-size:12px;">✓</span>
                  <span *ngIf="item.status === 'InProgress'" style="color:#fff;font-size:10px;">●</span>
                </div>
                <div style="flex:1;">
                  <div style="font-size:13px;font-weight:500;">{{ item.title }}</div>
                  <div style="font-size:11px;color:var(--text-3);">
                    <span [style.color]="statusFg(item.status)">{{ item.status }}</span>
                    <span *ngIf="item.completedAt"> · {{ item.completedAt | date:'dd MMM' }}</span>
                  </div>
                </div>

                <!-- E-signature mock -->
                <div *ngIf="item.requiresSignature" style="display:flex;gap:6px;align-items:center;">
                  <span *ngIf="item.signed"
                        style="font-size:11px;color:#10b981;font-weight:600;">✓ Signed</span>
                  <button *ngIf="!item.signed"
                          class="btn btn-ghost btn-sm"
                          (click)="mockSign(item)"
                          style="font-size:12px;border-color:#7c3aed;color:#7c3aed;">
                    ✍️ Sign
                  </button>
                </div>

                <select class="select" style="width:110px;padding:4px 8px;font-size:12px;"
                        [(ngModel)]="item.status"
                        (ngModelChange)="updateItem(item)">
                  <option>Pending</option>
                  <option>InProgress</option>
                  <option>Complete</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <ng-template #noSelection>
          <div class="card" style="display:flex;align-items:center;justify-content:center;
                                   min-height:300px;color:var(--text-3);text-align:center;padding:40px;">
            <div>
              <div style="font-size:48px;margin-bottom:12px;">📋</div>
              <div style="font-weight:500;">Select a candidate to view their onboarding checklist</div>
            </div>
          </div>
        </ng-template>

      </div>
          </div>
        </mat-tab>

      </mat-tab-group>
    </section>
  `,
  styles: [`
    .onboard-row {
      display:flex; align-items:center; gap:12px; padding:12px 8px;
      border-radius:8px; cursor:pointer; transition:background .1s; margin-bottom:4px;
    }
    .onboard-row:hover { background:#f8f7ff; }
    .onboard-row.selected { background:#f0efff; border-left:3px solid var(--brand); padding-left:6px; }
    .avatar-circle {
      width:38px; height:38px; border-radius:50%; display:flex; align-items:center;
      justify-content:center; font-weight:700; font-size:15px; flex-shrink:0;
    }
    .status-badge { padding:3px 10px; border-radius:20px; font-size:11px; font-weight:700; }
    .cat-header {
      font-size:11px; font-weight:700; color:var(--text-3); text-transform:uppercase;
      letter-spacing:.06em; margin:16px 0 8px; padding-bottom:6px;
      border-bottom:1px solid var(--border);
    }
    .checklist-row {
      display:flex; align-items:center; gap:10px; padding:8px 0;
      border-bottom:1px solid var(--border);
    }
    .checklist-row:last-child { border-bottom:none; }
    .check-icon {
      width:24px; height:24px; border-radius:50%; display:flex; align-items:center;
      justify-content:center; cursor:pointer; flex-shrink:0; transition:background .15s;
    }
  `]
})
export class OnboardingComponent implements OnInit {
  activeTab = 0;

  records: any[] = [];
  selectedRecord: any = null;
  showInitiate = false;
  initiating = false;

  initForm = { candidateId: '', candidateName: '', jobTitle: '', offerId: '', expectedStartDate: '' };

  readonly categories = ['ITSetup', 'Documents', 'Orientation', 'BackgroundCheck', 'ESignature'];

  // Analytics
  readonly obMonths    = ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'];
  readonly obTrendData = [2, 4, 7, 11, 8, 14];

  get completedOnboarding()  { return this.records.filter(r => r.overallStatus === 'Completed').length; }
  get inProgressOnboarding() { return this.records.filter(r => r.overallStatus === 'InProgress').length; }
  get notStartedOnboarding() { return this.records.filter(r => r.overallStatus === 'NotStarted' || !r.overallStatus).length; }
  get completionRate() {
    return this.records.length ? Math.round(this.completedOnboarding / this.records.length * 100) : 0;
  }
  private obDash(n: number) { return Math.round((n / (this.records.length || 1)) * 283); }
  get completedDash()  { return this.obDash(this.completedOnboarding); }
  get inProgressDash() { return this.obDash(this.inProgressOnboarding); }
  get notStartedDash() { return this.obDash(this.notStartedOnboarding); }

  get categoryCompletion(): {cat: string, label: string, pct: number}[] {
    return this.categories.map(cat => {
      const items: any[] = [];
      this.records.forEach(r => (r.items || []).filter((i: any) => i.category === cat).forEach((i: any) => items.push(i)));
      const done = items.filter(i => i.status === 'Complete').length;
      return { cat, label: CATEGORY_LABELS[cat] || cat, pct: items.length ? Math.round(done / items.length * 100) : 0 };
    });
  }

  get obLinePts(): string {
    const pts = this.obTrendData, max = Math.max(...pts, 1), step = 500 / (pts.length - 1);
    return pts.map((v, i) => `${i * step},${90 - (v / max) * 80}`).join(' ');
  }
  get obAreaPts(): string {
    const pts = this.obTrendData, max = Math.max(...pts, 1), step = 500 / (pts.length - 1);
    const line = pts.map((v, i) => `${i * step},${90 - (v / max) * 80}`).join(' ');
    return `0,90 ${line} 500,90`;
  }
  get obDotPts(): {x: number, y: number}[] {
    const pts = this.obTrendData, max = Math.max(...pts, 1), step = 500 / (pts.length - 1);
    return pts.map((v, i) => ({ x: i * step, y: 90 - (v / max) * 80 }));
  }

  constructor(private http: HttpClient) {}

  ngOnInit() { this.load(); }

  load() {
    this.http.get<any[]>(`${environment.apiUrl}/api/onboarding`)
      .subscribe({ next: d => { this.records = d; if (d.length && !this.selectedRecord) this.selectedRecord = d[0]; }, error: () => {} });
  }

  select(r: any) { this.selectedRecord = r; }

  initiate() {
    if (!this.initForm.candidateId || !this.initForm.candidateName) return;
    this.initiating = true;
    this.http.post<any>(`${environment.apiUrl}/api/onboarding`, this.initForm)
      .subscribe({
        next: r => {
          this.records = [r, ...this.records.filter(x => x.id !== r.id)];
          this.selectedRecord = r;
          this.showInitiate = false;
          this.initiating = false;
          this.initForm = { candidateId: '', candidateName: '', jobTitle: '', offerId: '', expectedStartDate: '' };
        },
        error: () => { this.initiating = false; }
      });
  }

  updateItem(item: any) {
    this.http.patch(`${environment.apiUrl}/api/onboarding/${item.id}/item`,
      { status: item.status, notes: item.notes, signed: item.signed })
      .subscribe({ next: () => this.refreshRecord(), error: () => {} });
  }

  cycleStatus(item: any) {
    item.status = item.status === 'Pending' ? 'InProgress' : item.status === 'InProgress' ? 'Complete' : 'Pending';
    this.updateItem(item);
  }

  mockSign(item: any) {
    item.signed = true;
    item.status = 'Complete';
    this.updateItem(item);
  }

  refreshRecord() {
    if (!this.selectedRecord) return;
    this.http.get<any>(`${environment.apiUrl}/api/onboarding/${this.selectedRecord.candidateId}`)
      .subscribe({ next: r => { this.selectedRecord = r; const i = this.records.findIndex(x => x.id === r.id); if (i >= 0) this.records[i] = r; }, error: () => {} });
  }

  itemsForCat(r: any, cat: string): any[] { return (r.items || []).filter((i: any) => i.category === cat); }
  completedCount(r: any): number { return (r.items || []).filter((i: any) => i.status === 'Complete').length; }
  progressPct(r: any): number {
    const total = (r.items || []).length;
    return total ? Math.round(this.completedCount(r) / total * 100) : 0;
  }

  catLabel(cat: string): string { return CATEGORY_LABELS[cat] || cat; }
  catIcon(cat: string): string  { return CATEGORY_ICONS[cat] || '📌'; }

  statusFg(s: string): string { return s === 'Complete' ? '#065f46' : s === 'InProgress' ? '#92400e' : '#374151'; }
  statusBg(s: string): string { return s === 'Complete' ? '#d1fae5' : s === 'InProgress' ? '#fef3c7' : '#f3f4f6'; }
}
