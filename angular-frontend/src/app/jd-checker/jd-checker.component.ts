import { Component } from '@angular/core';
import { AIService } from '../services/ai.service';

@Component({
  selector: 'app-jd-checker',
  template: `
    <div class="checker-container page-enter">
      <div class="page-header">
        <h1 class="page-title">JD Checker</h1>
        <div class="page-breadcrumb">AI Tools • Analyze & Optimize Job Descriptions</div>
      </div>

      <div class="card">
        <textarea [(ngModel)]="jobDescription" placeholder="Paste job description to analyze..." 
          class="textarea" rows="12"></textarea>
        <button (click)="analyzeJd()" class="btn btn-primary" [disabled]="isLoading">
          {{ isLoading ? 'Analyzing...' : 'Analyze JD' }}
        </button>
      </div>

      <div *ngIf="analysis" class="analysis-results">
        <div class="analysis-card">
          <h3>Title & Keywords</h3>
          <p>{{ analysis.title }}</p>
          <div class="tags">
            <span class="tag" *ngFor="let kw of analysis.keywords">{{ kw }}</span>
          </div>
        </div>

        <div class="analysis-card">
          <h3>Required Skills</h3>
          <ul>
            <li *ngFor="let skill of analysis.requiredSkills">{{ skill }}</li>
          </ul>
        </div>

        <div class="analysis-card">
          <h3>Recommendations</h3>
          <div class="recommendations">
            <div class="rec-item" *ngFor="let rec of analysis.recommendations">
              <div class="rec-icon">💡</div>
              <div class="rec-text">{{ rec }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .checker-container { padding: 24px; }
    .card { margin: 24px 0; padding: 20px; background: var(--white); border: 1px solid var(--gray-200); border-radius: 8px; }
    .textarea { width: 100%; padding: 12px; border: 1px solid var(--gray-200); border-radius: 4px; font-family: monospace; margin-bottom: 12px; }
    .analysis-results { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px; margin-top: 24px; }
    .analysis-card { padding: 16px; background: var(--white); border: 1px solid var(--gray-200); border-radius: 8px; }
    .tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px; }
    .tag { padding: 4px 12px; background: var(--violet-100); color: var(--violet-700); border-radius: 12px; font-size: 12px; font-weight: 600; }
    .recommendations { display: flex; flex-direction: column; gap: 12px; }
    .rec-item { display: flex; gap: 8px; }
    .rec-icon { font-size: 18px; }
  `]
})
export class JdCheckerComponent {
  jobDescription = '';
  analysis: any = null;
  isLoading = false;

  constructor(private aiService: AIService) {}

  analyzeJd(): void {
    if (!this.jobDescription) {
      alert('Please enter a job description');
      return;
    }

    this.isLoading = true;
    this.aiService.analyzeJobDescription(this.jobDescription).subscribe({
      next: (response) => {
        this.analysis = response.data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Analysis failed', error);
        this.isLoading = false;
      }
    });
  }
}
