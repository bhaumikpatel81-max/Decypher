import { Component, OnInit } from '@angular/core';
import { AIService } from '../services/ai.service';
import { CandidateService, Candidate } from '../services/candidate.service';

@Component({ selector: 'app-dropout-predictor',
  template: `
    <div class="dropout-container page-enter">
      <div class="page-header">
        <div>
          <h1 class="page-title">Dropout Predictor</h1>
          <div class="page-breadcrumb">AI Tools • Predict Candidate Dropout Risk</div>
        </div>
      </div>

      <!-- Risk Overview -->
      <div class="risk-overview">
        <div class="risk-card">
          <div class="risk-label">At-Risk Candidates</div>
          <div class="risk-value">{{ atRiskCount }}</div>
          <div class="risk-chart">
            <svg viewBox="0 0 100 100" width="120" height="120">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" stroke-width="8"/>
              <circle cx="50" cy="50" r="45" fill="none" stroke="#ef4444" stroke-width="8" 
                [style.stroke-dasharray]="(atRiskCount / totalCandidates * 100) + ', 100'" 
                transform="rotate(-90 50 50)"/>
              <text x="50" y="55" text-anchor="middle" font-size="24" font-weight="700">
                {{ (atRiskCount / totalCandidates * 100) | number: '1.0-0' }}%
              </text>
            </svg>
          </div>
        </div>
      </div>

      <!-- Risk Distribution -->
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Risk Distribution</h3>
        </div>
        <div class="distribution-bars">
          <div class="dist-item" *ngFor="let dist of riskDistribution">
            <div class="dist-label">{{ dist.label }}</div>
            <div class="dist-bar">
              <div class="dist-fill" [style.width.%]="dist.percentage"></div>
            </div>
            <div class="dist-value">{{ dist.count }}</div>
          </div>
        </div>
      </div>

      <!-- At-Risk Candidates List -->
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">High-Risk Candidates</h3>
        </div>
        <div class="candidates-list">
          <div class="candidate-card" *ngFor="let candidate of atRiskCandidates" (click)="selectCandidate(candidate)">
            <div class="candidate-header">
              <div class="candidate-name">{{ candidate.name }}</div>
              <div class="risk-badge" [class.risk-critical]="candidate.dropoutRisk >= 80"
                [class.risk-high]="candidate.dropoutRisk >= 60 && candidate.dropoutRisk < 80"
                [class.risk-medium]="candidate.dropoutRisk < 60">
                {{ candidate.dropoutRisk }}% risk
              </div>
            </div>
            <div class="candidate-meta">
              <span>{{ candidate.currentTitle }}</span>
              <span>•</span>
              <span>{{ candidate.requiredSkills.join(', ') }}</span>
            </div>
            <div class="risk-factors">
              <div class="risk-factor" *ngFor="let factor of getRiskFactors(candidate)">
                {{ factor }}
              </div>
            </div>
            <button class="btn btn-primary btn-sm" (click)="viewDetails(candidate, $event)">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dropout-container { padding: 24px; }
    .risk-overview { display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 24px;
      margin-bottom: 32px; }
    .risk-card { background: linear-gradient(135deg, rgba(239, 68, 68, 0.05), rgba(239, 68, 68, 0.02));
      border: 1px solid rgba(239, 68, 68, 0.2);
      border-radius: 8px;
      padding: 24px;
      text-align: center; }
    .risk-label { font-size: 14px;
      color: var(--gray-600);
      margin-bottom: 8px; }
    .risk-value { font-size: 32px;
      font-weight: 700;
      color: var(--red-600);
      margin-bottom: 16px; }
    .distribution-bars { display: flex;
      flex-direction: column;
      gap: 16px; }
    .dist-item { display: grid;
      grid-template-columns: 100px 1fr 60px;
      gap: 12px;
      align-items: center; }
    .dist-label { font-size: 12px;
      font-weight: 600; }
    .dist-bar { height: 24px;
      background: var(--gray-100);
      border-radius: 4px;
      overflow: hidden; }
    .dist-fill { height: 100%;
      background: var(--red-500);
      transition: width 0.3s; }
    .dist-value { text-align: right;
      font-weight: 600; }
    .candidates-list { display: grid;
      gap: 16px; }
    .candidate-card { padding: 16px;
      background: var(--white);
      border: 1px solid var(--gray-200);
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s; }
    .candidate-card:hover { border-color: var(--violet-300);
      box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    .candidate-header { display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px; }
    .candidate-name { font-weight: 600;
      font-size: 14px; }
    .risk-badge { padding: 4px 8px;
      border-radius: 4px;
      font-size: 11px;
      font-weight: 600; }
    .risk-critical { background: rgba(239, 68, 68, 0.1); color: var(--red-700); }
    .risk-high { background: rgba(251, 146, 60, 0.1); color: var(--orange-700); }
    .risk-medium { background: rgba(251, 191, 36, 0.1); color: var(--yellow-700); }
    .risk-factors { display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin: 8px 0; }
    .risk-factor { font-size: 11px;
      background: var(--gray-100);
      padding: 2px 6px;
      border-radius: 3px; }
  `] })
export class DropoutPredictorComponent implements OnInit { atRiskCandidates: Candidate[] = [];
  atRiskCount = 0;
  totalCandidates = 0;
  riskDistribution = [
    { label: 'Critical (80%+)', count: 0, percentage: 0 },
    { label: 'High (60-79%)', count: 0, percentage: 0 },
    { label: 'Medium (40-59%)', count: 0, percentage: 0 },
    { label: 'Low (<40%)', count: 0, percentage: 0 }
  ];

  constructor(
    private candidateService: CandidateService,
    private aiService: AIService
  ) {}

  ngOnInit(): void { this.loadAtRiskCandidates(); }

  loadAtRiskCandidates(): void { const tenantId = this.getTenantId();
    this.candidateService.getHighRiskCandidates(tenantId, 50).subscribe({ next: (candidates) => { this.atRiskCandidates = candidates;
        this.atRiskCount = candidates.length;
        this.updateRiskDistribution(); },
      error: (error) => console.error('Failed to load at-risk candidates', error) }); }

  updateRiskDistribution(): void { this.riskDistribution = [
      { label: 'Critical (80%+)', count: this.atRiskCandidates.filter(c => c.dropoutRisk >= 80).length, percentage: 0 },
      { label: 'High (60-79%)', count: this.atRiskCandidates.filter(c => c.dropoutRisk >= 60 && c.dropoutRisk < 80).length, percentage: 0 },
      { label: 'Medium (40-59%)', count: this.atRiskCandidates.filter(c => c.dropoutRisk >= 40 && c.dropoutRisk < 60).length, percentage: 0 },
      { label: 'Low (<40%)', count: this.atRiskCandidates.filter(c => c.dropoutRisk < 40).length, percentage: 0 }
    ];
    const total = this.riskDistribution.reduce((sum, d) => sum + d.count, 0);
    this.riskDistribution.forEach(d => { d.percentage = total > 0 ? (d.count / total) * 100 : 0; }); }

  getRiskFactors(candidate: Candidate): string[] { const factors: string[] = [];
    if (candidate.dropoutRisk > 80) factors.push('Very high risk');
    if (candidate.matchScore < 60) factors.push('Poor JD match');
    factors.push(`${candidate.dropoutRisk}% risk score`);
    return factors; }

  selectCandidate(candidate: Candidate): void { console.log('Selected candidate:', candidate); }

  viewDetails(candidate: Candidate, event: Event): void { event.stopPropagation();
    console.log('View details for:', candidate); }

  private getTenantId(): string { return localStorage.getItem('tenantId') || 'default'; } }

