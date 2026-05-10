import { Component } from '@angular/core';
import { AIService } from '../services/ai.service';

@Component({ selector: 'app-competency-ranker',
  template: `
    <div class="ranker-container page-enter">
      <div class="page-header">
        <h1 class="page-title">Competency Ranker</h1>
        <div class="page-breadcrumb">AI Tools • Rank Candidates by Competencies</div>
      </div>

      <div class="card">
        <textarea [(ngModel)]="candidateData" placeholder="Paste candidate list (JSON format)" 
          class="textarea" rows="10"></textarea>
        <button (click)="rankCompetencies()" class="btn btn-primary" [disabled]="isLoading">
          {{ isLoading ? 'Ranking...' : 'Rank by Competencies' }}
        </button>
        <div *ngIf="parseError" style="margin-top:8px;padding:8px 12px;background:#fee2e2;border-radius:6px;color:#991b1b;font-size:13px;">{{parseError}}</div>
      </div>

      <div *ngIf="rankedCandidates" class="results-card">
        <table class="table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Competency Score</th>
              <th>Top Skills</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let candidate of rankedCandidates; let i = index">
              <td>{{ i + 1 }}</td>
              <td>{{ candidate.name }}</td>
              <td>
                <div class="score-badge">{{ candidate.score }}%</div>
              </td>
              <td>{{ candidate.topSkills.join(', ') }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .ranker-container { padding: 24px; }
    .card { margin: 24px 0; padding: 20px; background: var(--white); border: 1px solid var(--gray-200); border-radius: 8px; }
    .textarea { width: 100%; padding: 12px; border: 1px solid var(--gray-200); border-radius: 4px; font-family: monospace; margin-bottom: 12px; }
    .results-card { margin-top: 24px; }
    .score-badge { padding: 4px 12px; background: var(--violet-100); color: var(--violet-700); border-radius: 4px; font-weight: 600; }
  `] })
export class CompetencyRankerComponent { candidateData = '';
  rankedCandidates: any[] = [];
  isLoading = false;
  parseError = '';

  constructor(private aiService: AIService) {}

  rankCompetencies(): void { try { const candidates = JSON.parse(this.candidateData);
      this.isLoading = true;
      this.aiService.rankCompetencies(candidates).subscribe({ next: (response) => { this.rankedCandidates = response.data;
          this.isLoading = false; },
        error: (error) => { console.error('Ranking failed', error);
          this.isLoading = false; } }); } catch (e) { this.parseError = 'Invalid JSON format — paste a valid JSON array'; } } }

