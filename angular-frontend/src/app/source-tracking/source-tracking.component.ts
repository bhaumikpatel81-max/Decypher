import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-source-tracking',
  template: `
    <section class="stack-page">
      <!-- UTM Link Generator -->
      <div class="card form-card">
        <h3>UTM Tracking Link Generator</h3>
        <div style="display:flex;gap:8px;">
          <input class="input" placeholder="Base job URL" [(ngModel)]="baseUrl" style="flex:1;">
          <select class="select" [(ngModel)]="utmSource" style="flex:0 0 150px;">
            <option>LinkedIn</option><option>Indeed</option><option>Referral</option><option>Portal</option><option>Agency</option>
          </select>
          <button class="btn btn-secondary" (click)="generateLink()">Generate</button>
        </div>
        <div *ngIf="generatedLink" style="background:#f8fafc;padding:10px;border-radius:8px;font-size:12px;word-break:break-all;margin-top:8px;">
          {{ generatedLink }}
        </div>
      </div>

      <!-- Summary Table -->
      <div class="card">
        <h3>Application Source Summary</h3>
        <table class="table">
          <thead>
            <tr>
              <th>Source</th><th>Applicants</th><th>Interviews</th>
              <th>Offers</th><th>Hires</th><th>Conversion %</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let row of summary">
              <td><strong>{{ row.source }}</strong></td>
              <td>{{ row.applicants }}</td>
              <td>{{ row.interviews }}</td>
              <td>{{ row.offers }}</td>
              <td>{{ row.hires }}</td>
              <td>{{ row.conversionPct | number:'1.1-1' }}%</td>
            </tr>
            <tr *ngIf="!summary.length">
              <td colspan="6" style="text-align:center;color:var(--text-3)">No source data yet.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  `
})
export class SourceTrackingComponent implements OnInit {
  summary: any[] = [];
  baseUrl = '';
  utmSource = 'LinkedIn';
  generatedLink = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>(`${environment.apiUrl}/api/source-tracking/summary`)
      .subscribe({ next: d => this.summary = d, error: () => {} });
  }

  generateLink() {
    if (!this.baseUrl.trim()) return;
    const sep = this.baseUrl.includes('?') ? '&' : '?';
    this.generatedLink = `${this.baseUrl}${sep}utm_source=${encodeURIComponent(this.utmSource)}&utm_medium=job_post&utm_campaign=decypher`;
  }
}
