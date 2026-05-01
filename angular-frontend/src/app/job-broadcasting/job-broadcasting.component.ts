import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface BroadcastChannel {
  id: string;
  name: string;
  logo: string;
  color: string;
  active: boolean;
  lastPosted: string | null;
  status: string;
}

@Component({
  selector: 'app-job-broadcasting',
  template: `
    <section class="stack-page">

      <!-- Requisition selector bar -->
      <div class="card" style="padding:20px 24px;margin-bottom:20px;">
        <div style="display:flex;align-items:center;gap:20px;flex-wrap:wrap;">
          <div style="flex:1;min-width:220px;">
            <div style="font-size:11px;font-weight:700;color:var(--text-3);text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px;">Requisition</div>
            <select class="select" [(ngModel)]="selectedReqId" (ngModelChange)="onReqChange()">
              <option value="">— Select a requisition —</option>
              <option *ngFor="let r of requisitions" [value]="r.id">{{ r.title }} · {{ r.department }}</option>
            </select>
          </div>
          <div *ngIf="selectedReq" style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;">
            <span class="chip" [style.background]="priorityBg(selectedReq.priority)" [style.color]="priorityFg(selectedReq.priority)">
              {{ selectedReq.priority }}
            </span>
            <span class="chip" style="background:#f0f9ff;color:#0369a1;">{{ selectedReq.department }}</span>
            <span style="font-size:13px;color:var(--text-3);">{{ selectedReq.headcount }} position(s)</span>
          </div>
        </div>
      </div>

      <!-- Main content: channels + history -->
      <div class="grid grid-cols-2 gap-6" *ngIf="selectedReqId; else emptyState">

        <!-- Channel toggles -->
        <div class="card" style="padding:24px;">
          <h3 style="margin:0 0 4px;">Broadcast Channels</h3>
          <p style="font-size:13px;color:var(--text-3);margin:0 0 20px;">
            Enable channels and click Broadcast to publish this job.
          </p>

          <div *ngFor="let ch of channels"
               class="channel-row"
               [class.channel-active]="ch.active">
            <div class="channel-logo" [style.background]="ch.color + '1a'" [style.color]="ch.color">
              {{ ch.logo }}
            </div>
            <div class="channel-info">
              <div style="font-weight:600;font-size:14px;">{{ ch.name }}</div>
              <div style="font-size:12px;color:var(--text-3);margin-top:2px;">
                <ng-container *ngIf="ch.lastPosted; else neverPosted">
                  Last posted {{ ch.lastPosted | date:'dd MMM yyyy, HH:mm' }}
                </ng-container>
                <ng-template #neverPosted>Never posted</ng-template>
              </div>
            </div>
            <span class="status-badge"
                  [style.background]="statusBg(ch.status)"
                  [style.color]="statusFg(ch.status)">
              {{ ch.status }}
            </span>
            <mat-slide-toggle [(ngModel)]="ch.active" color="primary"></mat-slide-toggle>
          </div>

          <div style="margin-top:24px;display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
            <button class="btn btn-primary"
                    (click)="broadcast()"
                    [disabled]="broadcasting || activeChannelCount === 0"
                    style="min-width:180px;">
              <ng-container *ngIf="!broadcasting">
                📢 Broadcast to {{ activeChannelCount }}
                {{ activeChannelCount === 1 ? 'Channel' : 'Channels' }}
              </ng-container>
              <ng-container *ngIf="broadcasting">Broadcasting…</ng-container>
            </button>
            <span *ngIf="activeChannelCount === 0" style="font-size:13px;color:var(--text-3);">
              Enable at least one channel
            </span>
            <span *ngIf="broadcastOk" style="font-size:13px;font-weight:600;color:#10b981;">
              ✓ Broadcast sent!
            </span>
          </div>
        </div>

        <!-- Broadcast history -->
        <div class="card" style="padding:24px;">
          <h3 style="margin:0 0 20px;">Broadcast History</h3>

          <div *ngIf="!broadcastHistory.length" style="text-align:center;padding:48px 0;color:var(--text-3);">
            <div style="font-size:40px;margin-bottom:10px;">📡</div>
            <div style="font-weight:500;">No broadcasts yet</div>
            <div style="font-size:13px;margin-top:4px;">This requisition hasn't been published to any channel.</div>
          </div>

          <div *ngFor="let h of broadcastHistory" class="history-entry">
            <div style="font-size:12px;color:var(--text-3);margin-bottom:8px;">
              {{ h.broadcastAt | date:'dd MMM yyyy, HH:mm' }}
            </div>
            <div style="display:flex;flex-wrap:wrap;gap:6px;">
              <span *ngFor="let chId of h.channels"
                    class="chip"
                    [style.background]="channelColor(chId) + '1a'"
                    [style.color]="channelColor(chId)">
                {{ channelLabel(chId) }}
              </span>
            </div>
          </div>

          <!-- Live now summary -->
          <div *ngIf="postedChannels.length" style="margin-top:20px;border-top:1px solid var(--border);padding-top:16px;">
            <div style="font-size:11px;font-weight:700;color:var(--text-3);text-transform:uppercase;letter-spacing:.06em;margin-bottom:12px;">
              Currently Live
            </div>
            <div *ngFor="let ch of postedChannels"
                 style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid var(--border);">
              <span style="font-weight:600;font-size:13px;" [style.color]="ch.color">{{ ch.name }}</span>
              <span style="font-size:12px;color:var(--text-3);">{{ ch.lastPosted | date:'dd MMM' }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty / no requisition selected -->
      <ng-template #emptyState>
        <div class="card" style="text-align:center;padding:80px 24px;color:var(--text-3);">
          <div style="font-size:52px;margin-bottom:16px;">📢</div>
          <h3 style="margin:0 0 8px;color:var(--text);">Select a Requisition to Start Broadcasting</h3>
          <p style="margin:0;font-size:14px;">
            Choose an approved requisition above to configure and launch multi-channel job posting.
          </p>
        </div>
      </ng-template>

    </section>
  `,
  styles: [`
    .channel-row {
      display: flex; align-items: center; gap: 14px;
      padding: 14px 16px; border-radius: 8px; margin-bottom: 10px;
      border: 1.5px solid var(--border); transition: border-color .15s, background .15s;
    }
    .channel-row.channel-active { border-color: var(--brand); background: #f8f7ff; }
    .channel-logo {
      width: 42px; height: 42px; border-radius: 8px; flex-shrink: 0;
      display: flex; align-items: center; justify-content: center;
      font-weight: 700; font-size: 13px;
    }
    .channel-info { flex: 1; min-width: 0; }
    .status-badge {
      padding: 3px 10px; border-radius: 20px; font-size: 11px;
      font-weight: 700; white-space: nowrap;
    }
    .history-entry {
      padding: 12px 0; border-bottom: 1px solid var(--border);
    }
    .history-entry:last-child { border-bottom: none; }
  `]
})
export class JobBroadcastingComponent implements OnInit {

  requisitions: any[] = [];
  selectedReqId = '';
  broadcasting = false;
  broadcastOk = false;
  broadcastHistory: any[] = [];

  channels: BroadcastChannel[] = [
    { id: 'linkedin',  name: 'LinkedIn',             logo: 'in', color: '#0077b5', active: false, lastPosted: null, status: 'Draft' },
    { id: 'naukri',    name: 'Naukri',                logo: 'N',  color: '#ff7555', active: false, lastPosted: null, status: 'Draft' },
    { id: 'indeed',    name: 'Indeed',                logo: 'In', color: '#2164f3', active: false, lastPosted: null, status: 'Draft' },
    { id: 'internal',  name: 'Internal Career Page',  logo: '🏢', color: '#292966', active: false, lastPosted: null, status: 'Draft' },
    { id: 'referral',  name: 'Employee Referral',     logo: '👥', color: '#10b981', active: false, lastPosted: null, status: 'Draft' },
  ];

  private readonly meta: Record<string, { name: string; color: string }> = {
    linkedin: { name: 'LinkedIn',             color: '#0077b5' },
    naukri:   { name: 'Naukri',               color: '#ff7555' },
    indeed:   { name: 'Indeed',               color: '#2164f3' },
    internal: { name: 'Internal Career Page', color: '#292966' },
    referral: { name: 'Employee Referral',    color: '#10b981' },
  };

  constructor(private http: HttpClient) {}

  ngOnInit() { this.loadRequisitions(); }

  loadRequisitions() {
    this.http.get<any[]>(`${environment.apiUrl}/api/requisitions`)
      .subscribe({
        next: items => {
          this.requisitions = items;
          if (items.length) { this.selectedReqId = items[0].id; this.loadStatus(); }
        },
        error: () => {}
      });
  }

  onReqChange() { this.broadcastHistory = []; this.resetChannels(); this.loadStatus(); }

  loadStatus() {
    if (!this.selectedReqId) return;
    this.http.get<any>(`${environment.apiUrl}/api/requisitions/${this.selectedReqId}/broadcast-status`)
      .subscribe({
        next: d => {
          this.broadcastHistory = d.history || [];
          this.channels.forEach(ch => {
            const entry = (d.channels || []).find((c: any) => c.channelId === ch.id);
            if (entry) {
              ch.active    = true;
              ch.lastPosted = entry.lastPosted;
              ch.status    = entry.status || 'Posted';
            } else {
              ch.active = false; ch.lastPosted = null; ch.status = 'Draft';
            }
          });
        },
        error: () => this.resetChannels()
      });
  }

  broadcast() {
    const selected = this.channels.filter(c => c.active).map(c => c.id);
    if (!selected.length) return;
    this.broadcasting = true;
    this.http.post(
      `${environment.apiUrl}/api/requisitions/${this.selectedReqId}/broadcast`,
      { channels: selected }
    ).subscribe({
      next: () => {
        this.broadcasting = false;
        this.broadcastOk = true;
        this.loadStatus();
        setTimeout(() => this.broadcastOk = false, 3000);
      },
      error: () => { this.broadcasting = false; }
    });
  }

  get selectedReq()      { return this.requisitions.find(r => r.id === this.selectedReqId); }
  get activeChannelCount() { return this.channels.filter(c => c.active).length; }
  get postedChannels()   { return this.channels.filter(c => c.status === 'Posted'); }

  channelLabel(id: string) { return this.meta[id]?.name  || id; }
  channelColor(id: string) { return this.meta[id]?.color || '#6b7280'; }

  statusFg(s: string) { return s === 'Posted' ? '#065f46' : s === 'Expired' ? '#991b1b' : '#374151'; }
  statusBg(s: string) { return s === 'Posted' ? '#d1fae5' : s === 'Expired' ? '#fee2e2' : '#f3f4f6'; }

  priorityFg(p: string) { return p === 'Critical' ? '#991b1b' : p === 'High' ? '#92400e' : '#1e3a5f'; }
  priorityBg(p: string) { return p === 'Critical' ? '#fee2e2' : p === 'High' ? '#fef3c7' : '#eff6ff'; }

  private resetChannels() {
    this.channels.forEach(c => { c.active = false; c.lastPosted = null; c.status = 'Draft'; });
  }
}
