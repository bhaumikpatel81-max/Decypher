import { Component } from '@angular/core';
import { AIService } from '../services/ai.service';

@Component({
  selector: 'app-cv-jd-matcher',
  template: `
    <div class="matcher-container page-enter">
      <div class="page-header">
        <h1 class="page-title">CV-JD Matcher</h1>
        <div class="page-breadcrumb">AI Tools • Match Resumes to Job Descriptions</div>
      </div>

      <div class="matcher-inputs">
        <textarea [(ngModel)]="resumeText" placeholder="Paste resume here..." 
          class="textarea" rows="8"></textarea>
        <textarea [(ngModel)]="jdText" placeholder="Paste job description here..." 
          class="textarea" rows="8"></textarea>
      </div>

      <button (click)="matchCvJd()" class="btn btn-primary" [disabled]="isLoading">
        <svg *ngIf="!isLoading" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
        </svg>
        {{ isLoading ? 'Analyzing...' : 'Match CV to JD' }}
      </button>

      <div *ngIf="matchResult" class="result-card">
        <div class="match-score">
          <div class="score-label">Match Score</div>
          <div class="score-value">{{ matchResult.matchScore }}%</div>
          <div class="score-bar">
            <div class="score-fill" [style.width.%]="matchResult.matchScore"></div>
          </div>
        </div>
        <div class="match-details">
          <div *ngFor="let detail of matchResult.details" class="detail-item">
            <div class="detail-label">{{ detail.label }}</div>
            <div class="detail-value">{{ detail.value }}</div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .matcher-container { padding: 24px; }
    .matcher-inputs { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 24px 0; }
    @media (max-width: 768px) { .matcher-inputs { grid-template-columns: 1fr; } }
    .textarea { width: 100%; padding: 12px; border: 1px solid var(--gray-200); border-radius: 4px; font-family: monospace; }
    .result-card { margin-top: 24px; padding: 20px; background: var(--white); border: 1px solid var(--gray-200); border-radius: 8px; }
    .match-score { text-align: center; margin-bottom: 24px; }
    .score-value { font-size: 36px; font-weight: 700; color: var(--violet-600); }
    .score-bar { height: 8px; background: var(--gray-200); border-radius: 4px; margin-top: 12px; }
    .score-fill { height: 100%; background: var(--violet-600); border-radius: 4px; }
    .match-details { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; }
    .detail-item { padding: 12px; background: var(--gray-50); border-radius: 4px; }
    .detail-label { font-size: 12px; color: var(--gray-600); margin-bottom: 4px; }
    .detail-value { font-weight: 600; }
  `]
})
export class CvJdMatcherComponent {
  resumeText = '';
  jdText = '';
  matchResult: any = null;
  isLoading = false;

  constructor(private aiService: AIService) {}

  matchCvJd(): void {
    if (!this.resumeText || !this.jdText) {
      alert('Please enter both resume and job description');
      return;
    }

    this.isLoading = true;
    this.aiService.matchCvJd(this.resumeText, this.jdText).subscribe({
      next: (response) => {
        this.matchResult = response.data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Matching failed', error);
        this.isLoading = false;
      }
    });
  }
}
