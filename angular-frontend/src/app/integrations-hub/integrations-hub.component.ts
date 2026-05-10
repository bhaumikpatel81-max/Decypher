import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface Integration { id: string;
  name: string;
  logo: string;
  description: string;
  category: string;
  connected: boolean;
  apiKey?: string;
  webhookUrl?: string;
  lastSync?: string;
}

@Component({ selector: 'app-integrations-hub',
  template: `
    <section class="stack-page">
      <div class="grid grid-cols-2 gap-6">

        <!-- LEFT: Integration cards by category -->
        <div>
          <!-- Category filter -->
          <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px;">
            <button *ngFor="let cat of categories"
                    class="btn btn-sm"
                    [class.btn-primary]="activeCategory === cat"
                    [class.btn-ghost]="activeCategory !== cat"
                    (click)="activeCategory = cat">
              {{ cat }}
            </button>
          </div>

          <!-- Summary chips -->
          <div style="display:flex;gap:8px;margin-bottom:16px;">
            <span style="padding:4px 12px;background:#d1fae5;color:#065f46;border-radius:16px;font-size:12px;font-weight:700;">
              {{ connectedCount }} Connected
            </span>
            <span style="padding:4px 12px;background:#f3f4f6;color:#374151;border-radius:16px;font-size:12px;font-weight:700;">
              {{ integrations.length - connectedCount }} Available
            </span>
          </div>

          <!-- Cards -->
          <div *ngFor="let intg of filtered" class="intg-card"
               [class.intg-connected]="intg.connected"
               (click)="select(intg)">
            <div class="intg-logo">{{ intg.logo }}</div>
            <div style="flex:1;min-width:0;">
              <div style="font-weight:700;font-size:14px;display:flex;align-items:center;gap:8px;">
                {{ intg.name }}
                <span *ngIf="intg.connected"
                      style="font-size:10px;background:#d1fae5;color:#065f46;padding:1px 6px;border-radius:8px;font-weight:700;">
                  CONNECTED
                </span>
              </div>
              <div style="font-size:12px;color:var(--text-3);margin-top:2px;">{{ intg.description }}</div>
              <div style="font-size:11px;color:var(--text-3);margin-top:4px;">
                <span style="background:var(--surface-alt);padding:1px 6px;border-radius:6px;">{{ intg.category }}</span>
                <span *ngIf="intg.lastSync" style="margin-left:8px;">
                  Last sync: {{ intg.lastSync | date:'d MMM, h:mm a' }}
                </span>
              </div>
            </div>
            <div style="flex-shrink:0;">
              <mat-slide-toggle
                [checked]="intg.connected"
                (change)="toggleConnect(intg, $event)"
                color="primary"
                (click)="$event.stopPropagation()">
              </mat-slide-toggle>
            </div>
          </div>
        </div>

        <!-- RIGHT: Config panel -->
        <div *ngIf="selected; else noSel" class="card" style="padding:24px;height:fit-content;position:sticky;top:20px;">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px;">
            <div class="intg-logo-lg">{{ selected.logo }}</div>
            <div>
              <h3 style="margin:0 0 2px;">{{ selected.name }}</h3>
              <div style="font-size:12px;color:var(--text-3);">{{ selected.description }}</div>
            </div>
          </div>

          <div *ngIf="selected.connected" style="background:#d1fae5;border-radius:8px;padding:10px 14px;margin-bottom:16px;font-size:13px;color:#065f46;font-weight:600;">
            ✓ Integration active
            <span *ngIf="selected.lastSync"> · Synced {{ selected.lastSync | date:'d MMM, h:mm a' }}</span>
          </div>
          <div *ngIf="!selected.connected" style="background:#fef3c7;border-radius:8px;padding:10px 14px;margin-bottom:16px;font-size:13px;color:#92400e;">
            ⚠ Not connected — enter credentials below and toggle on.
          </div>

          <!-- Config fields -->
          <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:20px;">
            <div>
              <label style="font-size:11px;font-weight:700;color:var(--text-3);display:block;margin-bottom:4px;">API KEY / TOKEN</label>
              <div style="display:flex;gap:8px;">
                <input class="input" style="flex:1;font-family:monospace;font-size:13px;"
                       [type]="showKey ? 'text' : 'password'"
                       [placeholder]="selected.connected ? '••••••••••••' : 'Paste API key…'"
                       [(ngModel)]="configDraft.apiKey">
                <button class="btn btn-ghost btn-sm" (click)="showKey = !showKey">
                  {{ showKey ? '🙈' : '👁' }}
                </button>
              </div>
            </div>
            <div>
              <label style="font-size:11px;font-weight:700;color:var(--text-3);display:block;margin-bottom:4px;">WEBHOOK URL <span style="font-weight:400;">(optional)</span></label>
              <input class="input" placeholder="https://your-app.com/webhook" [(ngModel)]="configDraft.webhookUrl">
            </div>
          </div>

          <div style="display:flex;gap:8px;">
            <button class="btn btn-primary" style="flex:1;" (click)="saveConfig()" [disabled]="saving">
              {{ saving ? 'Saving…' : '💾 Save Configuration' }}
            </button>
            <button *ngIf="selected.connected" class="btn btn-ghost btn-sm"
                    style="color:#ef4444;border-color:#ef4444;"
                    (click)="disconnect()" [disabled]="saving">
              Disconnect
            </button>
          </div>

          <div *ngIf="saveOk" style="color:#10b981;font-size:13px;font-weight:600;margin-top:10px;">
            ✓ Configuration saved.
          </div>

          <!-- Docs link -->
          <div style="margin-top:20px;padding-top:16px;border-top:1px solid var(--border);font-size:12px;color:var(--text-3);">
            📖 For setup instructions, see the {{ selected.name }} documentation.
          </div>
        </div>

        <ng-template #noSel>
          <div class="card" style="display:flex;align-items:center;justify-content:center;
                                   min-height:200px;color:var(--text-3);text-align:center;padding:40px;">
            <div>
              <div style="font-size:48px;margin-bottom:12px;">🔌</div>
              <div style="font-weight:500;">Select an integration to configure</div>
            </div>
          </div>
        </ng-template>

      </div>
    </section>
  `,
  styles: [`
    .intg-card { display:flex; align-items:center; gap:14px; padding:14px 16px;
      background:var(--surface); border:1px solid var(--border); border-radius:10px;
      cursor:pointer; margin-bottom:10px; transition:border-color .15s, box-shadow .15s; }
    .intg-card:hover { border-color:var(--brand); box-shadow:0 2px 8px rgba(124,58,237,.1); }
    .intg-connected { border-color:#86efac; background:#f0fdf4; }
    .intg-logo { font-size:28px; width:44px; height:44px; border-radius:10px;
      background:var(--surface-alt); display:flex; align-items:center;
      justify-content:center; flex-shrink:0; }
    .intg-logo-lg { font-size:36px; width:56px; height:56px; border-radius:12px;
      background:var(--surface-alt); display:flex; align-items:center;
      justify-content:center; flex-shrink:0; }
  `]
})
export class IntegrationsHubComponent implements OnInit { integrations: Integration[] = [
    { id: 'linkedin',    name: 'LinkedIn Jobs',      logo: '🔷', description: 'Post jobs and source candidates from LinkedIn',          category: 'Job Boards',     connected: false },
    { id: 'naukri',     name: 'Naukri',             logo: '🟧', description: 'India\'s largest job portal for candidate sourcing',      category: 'Job Boards',     connected: false },
    { id: 'indeed',     name: 'Indeed',             logo: '🔵', description: 'Publish job listings and receive applications',           category: 'Job Boards',     connected: false },
    { id: 'workday',    name: 'Workday HRMS',       logo: '🏢', description: 'Sync employee data and onboarding records',              category: 'HRMS',           connected: false },
    { id: 'greythr',    name: 'greytHR',            logo: '🟢', description: 'Push joiner data to payroll and leave management',       category: 'HRMS',           connected: false },
    { id: 'zoom',       name: 'Zoom',               logo: '📹', description: 'Auto-create Zoom links for scheduled interviews',        category: 'Video',          connected: false },
    { id: 'teams',      name: 'Microsoft Teams',    logo: '🟪', description: 'Send interview invites and join links via Teams',        category: 'Video',          connected: false },
    { id: 'docusign',   name: 'DocuSign',           logo: '✍️',  description: 'Send and track offer letters and NDAs via e-signature',  category: 'E-Signature',    connected: false },
    { id: 'slack',      name: 'Slack',              logo: '💬', description: 'Send hiring alerts and approval requests to Slack',      category: 'Collaboration',  connected: false },
    { id: 'bgv',        name: 'AuthBridge BGV',     logo: '🔍', description: 'Trigger background verification directly from Decypher', category: 'Compliance',     connected: false },
  ];

  categories = ['All', 'Job Boards', 'HRMS', 'Video', 'E-Signature', 'Collaboration', 'Compliance'];
  activeCategory = 'All';
  selected: Integration | null = null;
  configDraft = { apiKey: '', webhookUrl: '' };
  showKey = false;
  saving = false;
  saveOk = false;

  constructor(private http: HttpClient) {}

  ngOnInit() { this.http.get<any[]>(`${environment.apiUrl}/api/integrations`)
      .subscribe({ next: configs => { configs.forEach(cfg => { const intg = this.integrations.find(i => i.id === cfg.id);
            if (intg) { intg.connected = cfg.connected; intg.lastSync = cfg.lastSync; } }); },
        error: () => {} }); }

  get filtered(): Integration[] { return this.activeCategory === 'All'
      ? this.integrations
      : this.integrations.filter(i => i.category === this.activeCategory); }

  get connectedCount(): number { return this.integrations.filter(i => i.connected).length; }

  select(intg: Integration) { this.selected = intg;
    this.configDraft = { apiKey: intg.apiKey || '', webhookUrl: intg.webhookUrl || '' };
    this.saveOk = false;
    this.showKey = false; }

  toggleConnect(intg: Integration, event: any) { intg.connected = event.checked;
    if (!intg.connected) { intg.lastSync = undefined; }
    this.persistConfig(intg); }

  saveConfig() { if (!this.selected) return;
    this.saving = true;
    this.selected.apiKey = this.configDraft.apiKey;
    this.selected.webhookUrl = this.configDraft.webhookUrl;
    if (this.configDraft.apiKey) { this.selected.connected = true; this.selected.lastSync = new Date().toISOString(); }
    this.persistConfig(this.selected, () => { this.saving = false; this.saveOk = true; }); }

  disconnect() { if (!this.selected) return;
    this.selected.connected = false;
    this.selected.apiKey = '';
    this.selected.lastSync = undefined;
    this.persistConfig(this.selected); }

  private persistConfig(intg: Integration, cb?: () => void) { this.http.post(`${environment.apiUrl}/api/integrations/${intg.id}`, { connected: intg.connected, apiKey: intg.apiKey, webhookUrl: intg.webhookUrl }).subscribe({ next: () => cb && cb(), error: () => { this.saving = false; cb && cb(); } }); }
}

