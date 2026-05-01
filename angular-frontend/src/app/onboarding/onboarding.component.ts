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

  records: any[] = [];
  selectedRecord: any = null;
  showInitiate = false;
  initiating = false;

  initForm = { candidateId: '', candidateName: '', jobTitle: '', offerId: '', expectedStartDate: '' };

  readonly categories = ['ITSetup', 'Documents', 'Orientation', 'BackgroundCheck', 'ESignature'];

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
