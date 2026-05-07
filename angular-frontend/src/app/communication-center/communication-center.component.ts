import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface MsgTemplate {
  id: string;
  name: string;
  subject?: string;
  body: string;
  variables: string[];
}

@Component({
  selector: 'app-communication-center',
  template: `
    <section class="stack-page">
      <div class="grid grid-cols-2 gap-6">

        <!-- ── LEFT: Compose ── -->
        <div class="card" style="padding:24px;">
          <h3 style="margin:0 0 4px;">Compose Message</h3>
          <p style="font-size:13px;color:var(--text-3);margin:0 0 20px;">
            Select a channel, pick a template, choose recipients and send.
          </p>

          <!-- Channel tabs -->
          <div class="channel-tabs">
            <button class="ch-tab" [class.active]="activeTab==='email'"
                    (click)="switchTab('email')">
              ✉️ Email
            </button>
            <button class="ch-tab" [class.active]="activeTab==='sms'"
                    (click)="switchTab('sms')">
              💬 SMS
            </button>
            <button class="ch-tab" [class.active]="activeTab==='whatsapp'"
                    (click)="switchTab('whatsapp')">
              📱 WhatsApp
            </button>
          </div>

          <!-- Template picker -->
          <div style="margin-bottom:14px;">
            <label class="field-label">Template</label>
            <select class="select" [(ngModel)]="selectedTemplateId" (ngModelChange)="onTemplateChange()">
              <option value="">— Select a template —</option>
              <option *ngFor="let t of activeTemplates" [value]="t.id">{{ t.name }}</option>
            </select>
          </div>

          <ng-container *ngIf="selectedTemplate">
            <!-- Subject (email only) -->
            <div *ngIf="activeTab==='email'" style="margin-bottom:14px;">
              <label class="field-label">Subject</label>
              <input class="input" [(ngModel)]="emailSubject">
            </div>

            <!-- Variable inputs -->
            <div *ngIf="selectedTemplate.variables.length" style="margin-bottom:14px;">
              <label class="field-label">Template Variables</label>
              <div *ngFor="let v of selectedTemplate.variables" style="margin-bottom:8px;">
                <div style="font-size:12px;color:var(--text-3);margin-bottom:3px;">
                  {{ '{{' + v + '}}' }}
                </div>
                <input class="input" [placeholder]="'Value for ' + v"
                       [(ngModel)]="variableValues[v]"
                       (ngModelChange)="refreshPreview()">
              </div>
            </div>

            <!-- Message preview -->
            <div style="margin-bottom:14px;">
              <label class="field-label">Preview</label>
              <div class="preview-box">{{ messagePreview }}</div>
            </div>
          </ng-container>

          <!-- Candidate selector -->
          <div style="margin-bottom:14px;">
            <label class="field-label">
              Recipients
              <span style="font-weight:400;color:var(--text-3);"> ({{ selectedIds.size }} selected)</span>
            </label>
            <input class="input" placeholder="Search candidates…"
                   [(ngModel)]="candidateSearch"
                   (input)="filterCandidates()"
                   style="margin-bottom:8px;">
            <div class="candidate-list">
              <label *ngFor="let c of filteredCandidates" class="cand-row"
                     [class.cand-selected]="selectedIds.has(c.id)">
                <input type="checkbox"
                       [checked]="selectedIds.has(c.id)"
                       (change)="toggleCandidate(c.id)">
                <div class="cand-info">
                  <span style="font-weight:600;">{{ c.firstName }} {{ c.lastName }}</span>
                  <span style="font-size:12px;color:var(--text-3);">
                    {{ activeTab === 'email' ? c.email : c.phone }}
                  </span>
                </div>
                <span class="chip chip-xs" style="background:#f1f5f9;color:#475569;">
                  {{ c.stage || c.currentRole }}
                </span>
              </label>
              <div *ngIf="!filteredCandidates.length"
                   style="text-align:center;color:var(--text-3);padding:16px;">
                No candidates found.
              </div>
            </div>
            <div style="display:flex;gap:8px;margin-top:8px;">
              <button class="btn btn-ghost btn-sm" (click)="selectAll()">Select all</button>
              <button class="btn btn-ghost btn-sm" (click)="clearAll()">Clear</button>
            </div>
          </div>

          <!-- Send button -->
          <div style="display:flex;align-items:center;gap:12px;margin-top:8px;flex-wrap:wrap;">
            <button class="btn btn-primary"
                    (click)="send()"
                    [disabled]="sending || !canSend"
                    style="min-width:180px;">
              <ng-container *ngIf="!sending">
                Send to {{ selectedIds.size }} Recipient{{ selectedIds.size === 1 ? '' : 's' }}
              </ng-container>
              <ng-container *ngIf="sending">Sending…</ng-container>
            </button>
            <span *ngIf="!canSend && !sending" style="font-size:13px;color:var(--text-3);">
              Select a template and at least one recipient
            </span>
            <span *ngIf="sendOk" style="font-size:13px;font-weight:600;color:#10b981;">
              ✓ Messages queued!
            </span>
            <span *ngIf="sendError" style="font-size:13px;color:#dc2626;">{{ sendError }}</span>
          </div>
        </div>

        <!-- ── RIGHT: Delivery History ── -->
        <div class="card" style="padding:24px;">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
            <h3 style="margin:0;">Delivery History</h3>
            <button class="btn btn-ghost btn-sm" (click)="loadHistory()">↻ Refresh</button>
          </div>

          <!-- Stats row -->
          <div class="stats-row" style="margin-bottom:20px;">
            <div class="stat-pill" style="background:#eff6ff;color:#1e40af;">
              <span class="stat-num">{{ statsByChannel('Email') }}</span>
              <span class="stat-lbl">Email</span>
            </div>
            <div class="stat-pill" style="background:#f0fdf4;color:#166534;">
              <span class="stat-num">{{ statsByChannel('SMS') }}</span>
              <span class="stat-lbl">SMS</span>
            </div>
            <div class="stat-pill" style="background:#fdf4ff;color:#6b21a8;">
              <span class="stat-num">{{ statsByChannel('WhatsApp') }}</span>
              <span class="stat-lbl">WhatsApp</span>
            </div>
          </div>

          <!-- Channel filter -->
          <div style="display:flex;gap:6px;margin-bottom:14px;flex-wrap:wrap;">
            <button class="btn btn-ghost btn-sm"
                    *ngFor="let f of ['All','Email','SMS','WhatsApp']"
                    [class.active]="historyFilter===f"
                    (click)="historyFilter=f">{{ f }}</button>
          </div>

          <!-- History list -->
          <div *ngIf="!filteredHistory.length"
               style="text-align:center;padding:48px 0;color:var(--text-3);">
            <div style="font-size:36px;margin-bottom:10px;">📭</div>
            <div style="font-weight:500;">No messages sent yet</div>
          </div>

          <div *ngFor="let h of filteredHistory" class="history-row">
            <div class="ch-badge" [class]="'ch-' + h.channel.toLowerCase()">
              {{ channelIcon(h.channel) }} {{ h.channel }}
            </div>
            <div class="history-detail">
              <div style="font-weight:600;font-size:13px;">{{ h.candidateName }}</div>
              <div style="font-size:12px;color:var(--text-3);">
                {{ h.recipientAddress }}
                <span *ngIf="h.subject"> · {{ h.subject }}</span>
              </div>
            </div>
            <div style="text-align:right;flex-shrink:0;">
              <span class="status-dot"
                    [style.background]="h.status === 'Sent' ? '#10b981' : h.status === 'Failed' ? '#dc2626' : '#f59e0b'">
              </span>
              <span style="font-size:11px;color:var(--text-3);">
                {{ h.sentAt | date:'dd MMM, HH:mm' }}
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  `,
  styles: [`
    .channel-tabs { display:flex; gap:8px; margin-bottom:20px; }
    .ch-tab {
      padding:8px 20px; border-radius:8px; border:1.5px solid var(--border);
      background:transparent; cursor:pointer; font-size:13px; font-weight:600;
      color:var(--text); transition:all .15s;
    }
    .ch-tab.active { background:var(--brand); color:#fff; border-color:var(--brand); }

    .field-label { display:block; font-size:11px; font-weight:700; color:var(--text-3); text-transform:uppercase; letter-spacing:.06em; margin-bottom:6px; }

    .preview-box {
      background:#f8f9fa; border:1px solid var(--border); border-radius:6px;
      padding:12px; font-size:13px; white-space:pre-wrap; color:var(--text);
      min-height:60px; max-height:120px; overflow-y:auto;
    }

    .candidate-list {
      border:1px solid var(--border); border-radius:8px;
      max-height:220px; overflow-y:auto;
    }
    .cand-row {
      display:flex; align-items:center; gap:10px; padding:10px 12px;
      border-bottom:1px solid var(--border); cursor:pointer;
      transition:background .1s;
    }
    .cand-row:last-child { border-bottom:none; }
    .cand-row:hover { background:#f8f7ff; }
    .cand-row.cand-selected { background:#f0efff; }
    .cand-info { flex:1; display:flex; flex-direction:column; gap:1px; }
    .chip-xs { padding:2px 7px; border-radius:10px; font-size:11px; white-space:nowrap; }

    .stats-row { display:flex; gap:10px; }
    .stat-pill {
      flex:1; display:flex; flex-direction:column; align-items:center;
      padding:10px 8px; border-radius:10px; gap:2px;
    }
    .stat-num { font-size:22px; font-weight:700; line-height:1; }
    .stat-lbl { font-size:11px; font-weight:600; opacity:.8; }

    .history-row {
      display:flex; align-items:center; gap:10px; padding:10px 0;
      border-bottom:1px solid var(--border); flex-wrap:wrap;
    }
    .history-row:last-child { border-bottom:none; }
    .history-detail { flex:1; min-width:0; }
    .ch-badge {
      padding:3px 9px; border-radius:12px; font-size:11px; font-weight:700; white-space:nowrap;
    }
    .ch-email     { background:#dbeafe; color:#1e40af; }
    .ch-sms       { background:#dcfce7; color:#166534; }
    .ch-whatsapp  { background:#f3e8ff; color:#6b21a8; }

    .status-dot {
      display:inline-block; width:8px; height:8px; border-radius:50%;
      margin-right:5px; vertical-align:middle;
    }
    .btn.active { background:var(--brand); color:#fff; }
  `]
})
export class CommunicationCenterComponent implements OnInit {

  activeTab: 'email' | 'sms' | 'whatsapp' = 'email';

  candidates: any[] = [];
  filteredCandidates: any[] = [];
  candidateSearch = '';
  selectedIds = new Set<string>();

  sending = false;
  sendOk  = false;
  sendError = '';

  history: any[] = [];
  historyFilter = 'All';

  selectedTemplateId = '';
  selectedTemplate: MsgTemplate | null = null;
  emailSubject = '';
  variableValues: Record<string, string> = {};
  messagePreview = '';

  // Seeded fallbacks shown until API responds
  private fallbackEmail: MsgTemplate[] = [
    { id: 'et1', name: 'Interview Invite',    subject: 'Interview Invitation — {{company}}', body: 'Dear {{name}},\n\nWe are pleased to invite you for an interview at {{company}}.\n\nBest regards,\nHR Team', variables: ['name','company'] },
    { id: 'et2', name: 'Application Received', subject: 'We received your application',       body: 'Dear {{name}},\n\nThank you for applying. We will review your profile shortly.\n\nBest regards,\nHR Team', variables: ['name'] },
    { id: 'et3', name: 'Offer Letter',         subject: 'Job Offer from {{company}}',          body: 'Dear {{name}},\n\nWe are delighted to extend an offer. Please confirm by {{deadline}}.\n\nBest regards,\nHR Team', variables: ['name','company','deadline'] },
  ];
  private fallbackSms: MsgTemplate[] = [
    { id: 'st1', name: 'Interview Reminder', body: 'Hi {{name}}, your interview is on {{date}}. Reply YES to confirm.', variables: ['name','date'] },
    { id: 'st2', name: 'Status Update',      body: 'Hi {{name}}, your application status has been updated. Check the portal.', variables: ['name'] },
  ];
  private fallbackWhatsapp: MsgTemplate[] = [
    { id: 'wt1', name: 'Welcome Message',      body: 'Hi {{name}} 👋, welcome to {{company}}! Your application for *{{role}}* has been received.', variables: ['name','company','role'] },
    { id: 'wt2', name: 'Interview Schedule',   body: 'Hi {{name}}, your interview for *{{role}}* is on *{{date}}* at {{time}}.', variables: ['name','role','date','time'] },
  ];

  emailTemplates: MsgTemplate[] = [...this.fallbackEmail];
  smsTemplates:   MsgTemplate[] = [...this.fallbackSms];
  whatsappTemplates: MsgTemplate[] = [...this.fallbackWhatsapp];

  get activeTemplates(): MsgTemplate[] {
    return this.activeTab === 'email' ? this.emailTemplates
         : this.activeTab === 'sms'   ? this.smsTemplates
         : this.whatsappTemplates;
  }

  loadTemplates() {
    this.http.get<any[]>(`${environment.apiUrl}/api/communications/templates`).subscribe({
      next: data => {
        const email     = data.filter(t => t.channel === 'email'    || t.type === 'email');
        const sms       = data.filter(t => t.channel === 'sms'      || t.type === 'sms');
        const whatsapp  = data.filter(t => t.channel === 'whatsapp' || t.type === 'whatsapp');
        if (email.length)    this.emailTemplates    = email.map(this.mapTemplate);
        if (sms.length)      this.smsTemplates      = sms.map(this.mapTemplate);
        if (whatsapp.length) this.whatsappTemplates = whatsapp.map(this.mapTemplate);
      },
      error: () => { /* keep fallbacks */ }
    });
  }

  private mapTemplate(t: any): MsgTemplate {
    return {
      id: t.id ?? t.templateId,
      name: t.name ?? t.title,
      subject: t.subject,
      body: t.body ?? t.content ?? '',
      variables: t.variables ?? t.placeholders ?? []
    };
  }

  get filteredHistory() {
    return this.historyFilter === 'All'
      ? this.history
      : this.history.filter(h => h.channel === this.historyFilter);
  }

  get canSend(): boolean {
    return !!this.selectedTemplateId && this.selectedIds.size > 0;
  }

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadCandidates();
    this.loadHistory();
    this.loadTemplates();
  }

  loadCandidates() {
    this.http.get<any[]>(`${environment.apiUrl}/api/candidates`)
      .subscribe({
        next: d => { this.candidates = d; this.filteredCandidates = d; },
        error: () => {}
      });
  }

  loadHistory() {
    this.http.get<any[]>(`${environment.apiUrl}/api/notifications/history`)
      .subscribe({ next: d => this.history = d, error: () => {} });
  }

  switchTab(tab: 'email' | 'sms' | 'whatsapp') {
    this.activeTab = tab;
    this.selectedTemplateId = '';
    this.selectedTemplate = null;
    this.variableValues = {};
    this.messagePreview = '';
    this.emailSubject = '';
  }

  onTemplateChange() {
    this.selectedTemplate = this.activeTemplates.find(t => t.id === this.selectedTemplateId) || null;
    if (!this.selectedTemplate) return;
    this.emailSubject = this.selectedTemplate.subject || '';
    this.variableValues = {};
    this.selectedTemplate.variables.forEach(v => this.variableValues[v] = '');
    this.refreshPreview();
  }

  refreshPreview() {
    if (!this.selectedTemplate) return;
    let text = this.selectedTemplate.body;
    for (const [key, val] of Object.entries(this.variableValues)) {
      text = text.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), val || `{{${key}}}`);
    }
    this.messagePreview = text;
  }

  filterCandidates() {
    const q = this.candidateSearch.toLowerCase();
    this.filteredCandidates = q
      ? this.candidates.filter(c =>
          `${c.firstName} ${c.lastName}`.toLowerCase().includes(q) ||
          (c.email || '').toLowerCase().includes(q) ||
          (c.phone || '').includes(q))
      : this.candidates;
  }

  toggleCandidate(id: string) {
    if (this.selectedIds.has(id)) this.selectedIds.delete(id);
    else this.selectedIds.add(id);
    // trigger change detection on Set
    this.selectedIds = new Set(this.selectedIds);
  }

  selectAll() { this.selectedIds = new Set(this.filteredCandidates.map(c => c.id)); }
  clearAll()  { this.selectedIds = new Set(); }

  send() {
    if (!this.canSend) return;
    this.sending = true;
    this.sendError = '';
    const ids = Array.from(this.selectedIds);
    let req: any;
    let url: string;

    if (this.activeTab === 'email') {
      url = `${environment.apiUrl}/api/notifications/email`;
      req = { candidateIds: ids, templateId: this.selectedTemplateId, subject: this.emailSubject, body: this.messagePreview };
    } else if (this.activeTab === 'sms') {
      url = `${environment.apiUrl}/api/notifications/sms`;
      req = { candidateIds: ids, message: this.messagePreview };
    } else {
      url = `${environment.apiUrl}/api/notifications/whatsapp`;
      req = { candidateIds: ids, templateId: this.selectedTemplateId, variables: this.variableValues };
    }

    this.http.post(url, req).subscribe({
      next: () => {
        this.sending = false;
        this.sendOk   = true;
        this.clearAll();
        this.loadHistory();
        setTimeout(() => this.sendOk = false, 3000);
      },
      error: (e: any) => {
        this.sending   = false;
        this.sendError = e?.error?.error || 'Send failed. Please try again.';
      }
    });
  }

  statsByChannel(ch: string): number {
    return this.history.filter(h => h.channel === ch).length;
  }

  channelIcon(ch: string): string {
    return ch === 'Email' ? '✉️' : ch === 'SMS' ? '💬' : '📱';
  }
}

interface MsgTemplate {
  id: string;
  name: string;
  subject?: string;
  body: string;
  variables: string[];
}
