import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-talent-pool',
  template: `
    <section class="stack-page">
      <mat-tab-group [(selectedIndex)]="activeTab" animationDuration="150ms">

        <!-- ── TAB 1: Talent Pool ── -->
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
