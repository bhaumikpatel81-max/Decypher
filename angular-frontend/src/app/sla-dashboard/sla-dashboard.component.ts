import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface SlaTrack { id: string;
  requirementId: string;
  stage: string;
  stageStartDate: string;
  stageEndDate: string | null;
  daysInStage: number;
  targetDays: number;
  status: 'OnTrack' | 'Warning' | 'Overdue';
  predictedCompletionDate: string | null;
  predictionConfidence: number;
  tenantId: string;
  updatedAt: string;
}

@Component({ selector: 'app-sla-dashboard',
  templateUrl: './sla-dashboard.component.html',
  styles: [`
    .sla-text-muted { color: var(--text-3); }
    .sla-error-override { border-color: var(--sla-overdue) !important; background: rgba(239,68,68,0.08) !important; color: var(--sla-overdue) !important; }
    .sla-score-on-track { color: var(--sla-on-track); }
    .sla-score-warning { color: var(--sla-warning); }
    .sla-score-overdue { color: var(--sla-overdue); }
    .sla-empty-text { color: var(--text-3); padding: 40px 0; display: block; }
    .sla-progress-col { min-width: 120px; }
  `]
})
export class SlaDashboardComponent implements OnInit { tracks: SlaTrack[] = [];
  loading = true;
  error = '';

  get onTrackCount()  { return this.tracks.filter(t => t.status === 'OnTrack').length; }
  get warningCount()  { return this.tracks.filter(t => t.status === 'Warning').length; }
  get overdueCount()  { return this.tracks.filter(t => t.status === 'Overdue').length; }

  constructor(private http: HttpClient) {}

  ngOnInit(): void { this.load(); }

  load(): void { this.loading = true;
    this.http.get<SlaTrack[]>(`${environment.apiUrl}/api/aiagents/sla-dashboard`)
      .subscribe({ next:  data => { this.tracks = data; this.loading = false; },
        error: () => { this.error = 'Failed to load SLA data.'; this.loading = false; } }); }

  getSlaClass(status: string): string { return status === 'OnTrack' ? 'on-track' : status === 'Warning' ? 'warning' : 'overdue'; }

  getSlaEmoji(status: string): string { return status === 'OnTrack' ? '✅' : status === 'Warning' ? '⚠️' : '🔴'; }

  slaProgress(t: SlaTrack): number { return Math.min(Math.round((t.daysInStage / t.targetDays) * 100), 100); }
}

