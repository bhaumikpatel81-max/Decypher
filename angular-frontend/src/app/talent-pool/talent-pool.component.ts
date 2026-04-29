import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-talent-pool',
  template: `
    <section class="stack-page">
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
    </section>
  `
})
export class TalentPoolComponent implements OnInit {
  entries: any[] = [];
  tagFilter = '';
  showCampaign = false;
  savingCampaign = false;
  campaign = { name: '', tagsText: '', subject: '', messageTemplate: '' };

  constructor(private http: HttpClient) {}

  ngOnInit() { this.load(); }

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
}
