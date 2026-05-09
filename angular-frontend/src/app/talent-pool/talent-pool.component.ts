import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-talent-pool',
  template: `
    <section class="stack-page">
      <mat-tab-group [(selectedIndex)]="activeTab" animationDuration="150ms">

        <!-- ── TAB 1: Analytics ── -->
        <mat-tab label="Analytics">
          <div style="padding-top:20px;">

            <div class="kpi-grid" style="margin-bottom:24px;">
              <article class="kpi-tile">
                <div class="kpi-lbl">Total in Pool</div>
                <div class="kpi-val">{{ entries.length }}</div>
                <div class="kpi-sub">Passive candidates</div>
              </article>
              <article class="kpi-tile">
                <div class="kpi-lbl">Active Nurturing</div>
                <div class="kpi-val" style="color:#10b981;">{{ activeNurtureCount }}</div>
                <div class="kpi-sub">Engaged this month</div>
              </article>
              <article class="kpi-tile">
                <div class="kpi-lbl">Duplicate Groups</div>
                <div class="kpi-val" style="color:#f59e0b;">{{ dupGroups.length }}</div>
                <div class="kpi-sub">Pending deduplication</div>
              </article>
              <article class="kpi-tile">
                <div class="kpi-lbl">Unique Tags</div>
                <div class="kpi-val" style="color:#7c3aed;">{{ uniqueTagCount }}</div>
                <div class="kpi-sub">Skill categories</div>
              </article>
            </div>

            <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px;">

              <!-- Nurture Status Donut -->
              <div class="c-card">
                <div class="c-title">Nurture Status</div>
                <div style="display:flex;align-items:center;gap:24px;flex-wrap:wrap;">
                  <svg viewBox="0 0 120 120" width="140" height="140">
                    <circle cx="60" cy="60" r="45" fill="none" stroke="#f1f5f9" stroke-width="16"/>
                    <circle cx="60" cy="60" r="45" fill="none" stroke="#10b981" stroke-width="16"
                      [attr.stroke-dasharray]="activeDash + ' 283'"
                      stroke-dashoffset="0" transform="rotate(-90 60 60)"/>
                    <circle cx="60" cy="60" r="45" fill="none" stroke="#7c3aed" stroke-width="16"
                      [attr.stroke-dasharray]="nurturingDash + ' 283'"
                      [attr.stroke-dashoffset]="-activeDash" transform="rotate(-90 60 60)"/>
                    <circle cx="60" cy="60" r="45" fill="none" stroke="#f59e0b" stroke-width="16"
                      [attr.stroke-dasharray]="coldDash + ' 283'"
                      [attr.stroke-dashoffset]="-(activeDash + nurturingDash)" transform="rotate(-90 60 60)"/>
                    <text x="60" y="55" text-anchor="middle" font-size="18" font-weight="700" fill="#1e293b">{{ entries.length }}</text>
                    <text x="60" y="70" text-anchor="middle" font-size="9" fill="#94a3b8">TOTAL</text>
                  </svg>
                  <div style="display:flex;flex-direction:column;gap:10px;">
                    <div *ngFor="let ns of nurtureStatusStats"
                         style="display:flex;align-items:center;gap:8px;font-size:12px;">
                      <span [style.background]="ns.color"
                            style="width:10px;height:10px;border-radius:2px;display:inline-block;flex-shrink:0;"></span>
                      {{ ns.label }} <b style="margin-left:4px;">{{ ns.count }}</b>
                    </div>
                    <div *ngIf="!entries.length" style="color:var(--text-3);font-size:12px;">No data yet</div>
                  </div>
                </div>
              </div>

              <!-- Top Tags Bar Chart -->
              <div class="c-card">
                <div class="c-title">Top Skills / Tags</div>
                <div *ngFor="let t of topTags" style="margin-bottom:14px;">
                  <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:5px;">
                    <span class="chip chip-brand" style="padding:2px 8px;font-size:11px;">{{ t.tag }}</span>
                    <b>{{ t.count }}</b>
                  </div>
                  <div style="height:8px;background:#f1f5f9;border-radius:4px;overflow:hidden;">
                    <div [style.width.%]="t.pct" style="height:100%;background:#7c3aed;border-radius:4px;transition:width .4s;"></div>
                  </div>
                </div>
                <div *ngIf="!topTags.length" style="color:var(--text-3);text-align:center;padding:20px;">
                  No tagged candidates yet
                </div>
              </div>
            </div>

            <!-- Trend Line -->
            <div class="c-card">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
                <span style="font-size:14px;font-weight:700;">Pool Growth Trend</span>
                <span style="font-size:12px;color:var(--text-3);">Last 6 months</span>
              </div>
              <svg viewBox="0 0 500 100" width="100%" height="100" style="overflow:visible;">
                <line x1="0" y1="33" x2="500" y2="33" stroke="#f1f5f9" stroke-width="1"/>
                <line x1="0" y1="66" x2="500" y2="66" stroke="#f1f5f9" stroke-width="1"/>
                <polyline [attr.points]="tpAreaPoints" fill="rgba(124,58,237,0.08)" stroke="none"/>
                <polyline [attr.points]="tpLinePoints" fill="none" stroke="#7c3aed" stroke-width="2.5"
                          stroke-linecap="round" stroke-linejoin="round"/>
                <circle *ngFor="let pt of tpDotPoints" [attr.cx]="pt.x" [attr.cy]="pt.y" r="4" fill="#7c3aed"/>
              </svg>
              <div style="display:flex;justify-content:space-between;margin-top:8px;">
                <span *ngFor="let m of tpMonths" style="font-size:11px;color:var(--text-3);">{{ m }}</span>
              </div>
            </div>
          </div>
        </mat-tab>

        <!-- ── TAB 2: Talent Pool ── -->
        <mat-tab label="Talent Pool">
          <div style="padding-top:20px;">
            <div class="card form-row" style="margin-bottom:0;">
              <input class="input" placeholder="Filter by tag…" [(ngModel)]="tagFilter" (keyup.enter)="load()">
              <button class="btn btn-secondary" (click)="load()">Filter</button>
              <button class="btn btn-primary" style="margin-left:auto;" (click)="showCampaign=!showCampaign">
                {{ showCampaign ? 'Cancel' : '+ New Campaign' }}
              </button>
            </div>

            <!-- Campaign Composer -->
            <div class="card form-card" *ngIf="showCampaign" style="margin-top:0;">
              <h3>Campaign Composer</h3>
              <input class="input" placeholder="Campaign name" [(ngModel)]="campaign.name">
              <input class="input" placeholder="Target tags (comma separated)" [(ngModel)]="campaign.tagsText">
              <input class="input" placeholder="Email subject" [(ngModel)]="campaign.subject">
              <textarea class="textarea" rows="4" placeholder="Message (use {{candidateName}} token)" [(ngModel)]="campaign.messageTemplate"></textarea>
              <button class="btn btn-primary" (click)="createCampaign()" [disabled]="savingCampaign">
                {{ savingCampaign ? 'Creating…' : 'Create & Send Campaign' }}
              </button>
            </div>

            <!-- Talent Pool Grid -->
            <div class="cards-grid">
              <article class="card candidate-card" *ngFor="let e of entries">
                <div class="candidate-head">
                  <div>
                    <h3>{{ e.candidateId | slice:0:8 }}…</h3>
                    <p>{{ e.nurtureStatus }}</p>
                  </div>
                </div>
                <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:8px;">
                  <span class="chip chip-brand" *ngFor="let t of e.tags">{{ t }}</span>
                </div>
                <div class="metric-line" style="margin-top:8px;">
                  <span>Last contacted</span>
                  <b>{{ e.lastContactedAt ? (e.lastContactedAt | date:'d MMM y') : 'Never' }}</b>
                </div>
              </article>
              <div *ngIf="!entries.length" style="grid-column:1/-1;text-align:center;color:var(--text-3);padding:40px;">
                No talent pool entries found.
              </div>
            </div>
          </div>
        </mat-tab>

        <!-- ── TAB 2: Duplicates ── -->
        <mat-tab>
          <ng-template mat-tab-label>
            Duplicates
            <span *ngIf="dupGroups.length" class="dup-badge">{{ dupGroups.length }}</span>
          </ng-template>
          <div style="padding-top:20px;">

            <!-- Toolbar -->
            <div class="card form-row" style="margin-bottom:16px;">
              <div style="font-size:13px;color:var(--text-3);flex:1;">
                {{ dupGroups.length }} potential duplicate group{{ dupGroups.length !== 1 ? 's' : '' }} detected
                <span style="margin-left:8px;font-size:11px;background:#fef3c7;color:#92400e;padding:2px 8px;border-radius:12px;font-weight:600;">
                  Based on email &amp; name similarity
                </span>
              </div>
              <button class="btn btn-secondary btn-sm" (click)="loadDuplicates()">Refresh</button>
            </div>

            <!-- Loading -->
            <div *ngIf="dupLoading" style="text-align:center;padding:60px;color:var(--text-3);">
              <div style="font-size:32px;margin-bottom:10px;">🔍</div>
              <div>Scanning for duplicates…</div>
            </div>

            <!-- No duplicates -->
            <div *ngIf="!dupLoading && !dupGroups.length"
                 style="text-align:center;padding:60px;color:var(--text-3);">
              <div style="font-size:48px;margin-bottom:12px;">✅</div>
              <div style="font-weight:500;">No duplicates detected</div>
              <div style="font-size:13px;margin-top:4px;">All candidates appear to be unique records.</div>
            </div>

            <!-- Duplicate groups -->
            <div *ngFor="let group of dupGroups; let gi = index" class="dup-group-card">
              <div class="dup-group-header">
                <div style="display:flex;align-items:center;gap:10px;">
                  <span class="dup-flag">⚠️ Duplicate Group {{ gi + 1 }}</span>
                  <span class="chip" style="background:#fef3c7;color:#92400e;font-size:11px;">
                    {{ group.matchReason }}
                  </span>
                </div>
                <div style="display:flex;gap:8px;">
                  <button class="btn btn-primary btn-sm"
                          (click)="mergeGroup(group)"
                          [disabled]="group.merging"
                          style="background:#7c3aed;border-color:#7c3aed;">
                    {{ group.merging ? 'Merging…' : '🔗 Merge' }}
                  </button>
                  <button class="btn btn-ghost btn-sm"
                          (click)="dismissGroup(group)"
                          [disabled]="group.dismissing">
                    {{ group.dismissing ? 'Dismissing…' : 'Dismiss' }}
                  </button>
                </div>
              </div>

              <!-- Candidates in group -->
              <div class="dup-candidates">
                <div *ngFor="let c of group.candidates; let ci = index" class="dup-candidate-row"
                     [class.dup-primary]="ci === 0">
                  <div class="dup-avatar" [style.background]="ci === 0 ? '#ede9fe' : '#f1f5f9'">
                    {{ (c.name || c.candidateName || '?') | slice:0:1 }}
                  </div>
                  <div style="flex:1;min-width:0;">
                    <div style="font-weight:600;font-size:13px;display:flex;align-items:center;gap:6px;">
                      {{ c.name || c.candidateName }}
                      <span *ngIf="ci === 0"
                            style="font-size:10px;background:#ede9fe;color:#7c3aed;padding:1px 6px;border-radius:8px;font-weight:700;">
                        PRIMARY
                      </span>
                    </div>
                    <div style="font-size:12px;color:var(--text-3);margin-top:2px;">
                      {{ c.email || '—' }}
                      <span *ngIf="c.phone"> · {{ c.phone }}</span>
                    </div>
                  </div>
                  <div style="text-align:right;flex-shrink:0;">
                    <div style="font-size:12px;font-weight:600;">{{ c.stage || c.currentRole || '—' }}</div>
                    <div style="font-size:11px;color:var(--text-3);margin-top:2px;">
                      {{ c.submissionDate || c.createdAt | date:'d MMM y' }}
                    </div>
                  </div>
                </div>
              </div>

              <div *ngIf="group.merged" style="color:#10b981;font-size:12px;font-weight:600;padding:8px 0 0;">
                ✓ Merged — primary record retained, duplicates removed.
              </div>
              <div *ngIf="group.dismissed" style="color:var(--text-3);font-size:12px;padding:8px 0 0;">
                Dismissed — will not appear again.
              </div>
            </div>

          </div>
        </mat-tab>

      </mat-tab-group>
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
    .dup-badge {
      display:inline-flex; align-items:center; justify-content:center;
      min-width:18px; height:18px; border-radius:9px;
      background:#ef4444; color:#fff; font-size:11px; font-weight:700;
      margin-left:6px; padding:0 5px;
    }
    .dup-group-card {
      background:var(--surface); border:1px solid var(--border);
      border-radius:12px; padding:16px 20px; margin-bottom:16px;
    }
    .dup-group-card:hover { border-color:#fbbf24; box-shadow:0 2px 8px rgba(251,191,36,.15); }
    .dup-group-header {
      display:flex; align-items:center; justify-content:space-between;
      margin-bottom:14px; gap:12px;
    }
    .dup-flag { font-size:13px; font-weight:700; color:#92400e; }
    .dup-candidates { display:flex; flex-direction:column; gap:1px; }
    .dup-candidate-row {
      display:flex; align-items:center; gap:12px; padding:10px 12px;
      border-radius:8px; border:1px solid var(--border);
      background:#fafafa; margin-bottom:6px;
    }
    .dup-primary { background:#faf5ff; border-color:#ddd6fe; }
    .dup-avatar {
      width:34px; height:34px; border-radius:50%;
      display:flex; align-items:center; justify-content:center;
      font-weight:700; font-size:14px; flex-shrink:0;
    }
  `]
})
export class TalentPoolComponent implements OnInit {
  activeTab = 0;

  // Talent Pool tab
  entries: any[] = [];
  tagFilter = '';
  showCampaign = false;
  savingCampaign = false;
  campaign = { name: '', tagsText: '', subject: '', messageTemplate: '' };

  // Duplicates tab
  dupGroups: any[] = [];
  dupLoading = false;

  // Analytics
  readonly tpMonths    = ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'];
  readonly tpTrendData = [8, 14, 19, 26, 31, 42];

  get activeNurtureCount()  { return this.entries.filter(e => e.nurtureStatus === 'Active').length; }
  get uniqueTagCount() {
    const tags = new Set<string>();
    this.entries.forEach(e => (e.tags || []).forEach((t: string) => tags.add(t)));
    return tags.size;
  }
  get nurtureStatusStats(): {label: string, count: number, color: string}[] {
    const statusMap: Record<string, string> = {
      Active: '#10b981', Nurturing: '#7c3aed', Cold: '#f59e0b', Unresponsive: '#94a3b8'
    };
    const counts: Record<string, number> = {};
    this.entries.forEach(e => {
      const s = e.nurtureStatus || 'Unknown';
      counts[s] = (counts[s] || 0) + 1;
    });
    return Object.entries(counts).map(([label, count]) => ({ label, count, color: statusMap[label] || '#cbd5e1' }));
  }
  private statusDash(status: string) {
    const c = this.entries.filter(e => e.nurtureStatus === status).length;
    return Math.round((c / (this.entries.length || 1)) * 283);
  }
  get activeDash()    { return this.statusDash('Active'); }
  get nurturingDash() { return this.statusDash('Nurturing'); }
  get coldDash()      { return this.statusDash('Cold'); }

  get topTags(): {tag: string, count: number, pct: number}[] {
    const counts: Record<string, number> = {};
    this.entries.forEach(e => (e.tags || []).forEach((t: string) => { counts[t] = (counts[t] || 0) + 1; }));
    const max = Math.max(...Object.values(counts), 1);
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 6)
      .map(([tag, count]) => ({ tag, count, pct: Math.round((count / max) * 100) }));
  }

  get tpLinePoints(): string {
    const pts = this.tpTrendData, max = Math.max(...pts, 1), step = 500 / (pts.length - 1);
    return pts.map((v, i) => `${i * step},${90 - (v / max) * 80}`).join(' ');
  }
  get tpAreaPoints(): string {
    const pts = this.tpTrendData, max = Math.max(...pts, 1), step = 500 / (pts.length - 1);
    const line = pts.map((v, i) => `${i * step},${90 - (v / max) * 80}`).join(' ');
    return `0,90 ${line} 500,90`;
  }
  get tpDotPoints(): {x: number, y: number}[] {
    const pts = this.tpTrendData, max = Math.max(...pts, 1), step = 500 / (pts.length - 1);
    return pts.map((v, i) => ({ x: i * step, y: 90 - (v / max) * 80 }));
  }

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.load();
    this.loadDuplicates();
  }

  load() {
    const params = this.tagFilter ? `?tag=${encodeURIComponent(this.tagFilter)}` : '';
    this.http.get<any[]>(`${environment.apiUrl}/api/talent-pool${params}`)
      .subscribe({ next: d => this.entries = d, error: () => {} });
  }

  createCampaign() {
    this.savingCampaign = true;
    const payload = {
      ...this.campaign,
      targetTags: this.campaign.tagsText.split(',').map(t => t.trim()).filter(Boolean)
    };
    this.http.post<any>(`${environment.apiUrl}/api/talent-pool/campaigns`, payload)
      .subscribe({
        next: r => {
          this.http.post(`${environment.apiUrl}/api/talent-pool/campaigns/${r.id}/send`, {}).subscribe();
          this.savingCampaign = false;
          this.showCampaign = false;
        },
        error: () => { this.savingCampaign = false; }
      });
  }

  loadDuplicates() {
    this.dupLoading = true;
    this.http.get<any[]>(`${environment.apiUrl}/api/candidates/duplicates`)
      .subscribe({
        next: d => { this.dupGroups = d.map(g => ({ ...g, merging: false, dismissing: false, merged: false, dismissed: false })); this.dupLoading = false; },
        error: () => { this.dupLoading = false; }
      });
  }

  mergeGroup(group: any) {
    group.merging = true;
    const primaryId = group.candidates[0].id;
    const duplicateIds = group.candidates.slice(1).map((c: any) => c.id);
    this.http.post(`${environment.apiUrl}/api/candidates/merge`, { primaryId, duplicateIds })
      .subscribe({
        next: () => { group.merging = false; group.merged = true; },
        error: () => { group.merging = false; }
      });
  }

  dismissGroup(group: any) {
    group.dismissing = true;
    const candidateIds = group.candidates.map((c: any) => c.id);
    this.http.post(`${environment.apiUrl}/api/candidates/dismiss-duplicate`, { candidateIds })
      .subscribe({
        next: () => { group.dismissing = false; group.dismissed = true; },
        error: () => { group.dismissing = false; }
      });
  }
}
