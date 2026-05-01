import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface Agent {
  name: string;
  icon: string;
  status: 'pending' | 'processing' | 'complete' | 'failed';
  statusText: string;
}

interface BehavioralSkill {
  key: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-ai-scorecard',
  templateUrl: './ai-scorecard.component.html',
  styleUrls: ['./ai-scorecard.component.css']
})
export class AIScorecardComponent {
  @ViewChild('jdFileInput')     jdFileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('resumeFileInput') resumeFileInput!: ElementRef<HTMLInputElement>;

  jdText = '';
  resumeText = '';
  isProcessing = false;
  results: any = null;
  errorMessage = '';

  // JD file upload
  jdFile: File | null = null;
  jdExtracting = false;
  jdExtractError = '';
  jdDragOver = false;

  // Resume file upload
  resumeFile: File | null = null;
  resumeExtracting = false;
  resumeExtractError = '';
  resumeDragOver = false;

  // Behavioral evidence expand/collapse state
  expandedEvidence: Record<string, boolean> = {};

  behavioralSkills: BehavioralSkill[] = [
    { key: 'problemSolving',   label: 'Problem Solving',   icon: '🧩' },
    { key: 'criticalThinking', label: 'Critical Thinking', icon: '🔬' },
    { key: 'ownership',        label: 'Ownership',         icon: '🎯' },
    { key: 'leadership',       label: 'Leadership',        icon: '👑' },
    { key: 'communication',    label: 'Communication',     icon: '💬' },
    { key: 'integrity',        label: 'Integrity',         icon: '🛡️' },
    { key: 'adaptability',     label: 'Adaptability',      icon: '🔄' },
    { key: 'collaboration',    label: 'Collaboration',     icon: '🤝' }
  ];

  agents: Agent[] = [
    { name: 'Parsing Agent',                 icon: '📄', status: 'pending', statusText: 'Waiting...' },
    { name: 'Matching Agent',                icon: '🔍', status: 'pending', statusText: 'Waiting...' },
    { name: 'Ranking Agent',                 icon: '📊', status: 'pending', statusText: 'Waiting...' },
    { name: 'Behavioral Intelligence Agent', icon: '🧠', status: 'pending', statusText: 'Waiting...' },
    { name: 'Explanation Agent',             icon: '💬', status: 'pending', statusText: 'Waiting...' },
    { name: 'Bias Detection Agent',          icon: '⚖️', status: 'pending', statusText: 'Waiting...' }
  ];

  constructor(private http: HttpClient) {}

  async runAIAgents(): Promise<void> {
    if (!this.jdText.trim() || !this.resumeText.trim()) {
      this.errorMessage = 'Please provide both Job Description and Resume text.';
      return;
    }

    this.isProcessing = true;
    this.results = null;
    this.errorMessage = '';
    this.expandedEvidence = {};
    this.resetAgents();

    for (let i = 0; i < this.agents.length; i++) {
      this.agents[i].status = 'processing';
      this.agents[i].statusText = 'Processing...';
      await this.delay(400);
    }

    try {
      const response: any = await this.http.post(
        `${environment.apiUrl}/api/aiagents/run-screening`,
        { jobDescription: this.jdText, resumeText: this.resumeText }
      ).toPromise();

      this.agents.forEach(a => { a.status = 'complete'; a.statusText = 'Complete'; });
      this.results = this.mapResults(response);

    } catch (err: any) {
      this.agents.forEach(a => {
        if (a.status === 'processing') { a.status = 'failed'; a.statusText = 'Failed'; }
      });
      this.errorMessage = err?.error?.error ?? 'AI processing failed. Please try again.';
    } finally {
      this.isProcessing = false;
    }
  }

  private mapResults(r: any) {
    const ranking    = r.rankingResult?.data ?? {};
    const expRaw     = r.explanationResult?.data ?? {};
    const bias       = r.biasDetectionResult?.data ?? {};
    const matching   = r.matchingResult?.data ?? {};
    const behavData  = r.behavioralResult?.data;

    const cvJdMatchScore  = matching.matchPercentage ?? 0;
    const competencyScore = ranking.breakdown?.skillsMatch ?? 0;
    const biasScore       = bias.overallBiasFreeScore ?? 1;
    const dropoutRisk     = ranking.breakdown?.dropoutRisk ?? 0;

    const behavioral = behavData ? {
      scores:     behavData.behavioralScores ?? {},
      evidence:   behavData.evidence ?? {},
      summary:    behavData.summary ?? '',
      confidence: behavData.confidence ?? 0
    } : null;

    // Support both structured (new) and legacy flat-string explanation
    const isStructured = !!expRaw.overallAssessment;
    const explanationData = isStructured ? {
      overallAssessment:       expRaw.overallAssessment       ?? '',
      keyStrengths:            expRaw.keyStrengths            ?? [],
      skillGaps:               expRaw.skillGaps               ?? [],
      experienceFit:           expRaw.experienceFit           ?? '',
      educationFit:            expRaw.educationFit            ?? '',
      behavioralSummary:       expRaw.behavioralSummary       ?? '',
      riskFactors:             expRaw.riskFactors             ?? [],
      recommendation:          expRaw.recommendation          ?? '',
      recommendationRationale: expRaw.recommendationRationale ?? ''
    } : {
      overallAssessment:       expRaw.explanation ?? 'No explanation generated.',
      keyStrengths:            [] as string[],
      skillGaps:               [] as string[],
      experienceFit:           '',
      educationFit:            '',
      behavioralSummary:       '',
      riskFactors:             [] as string[],
      recommendation:          '',
      recommendationRationale: ''
    };

    return {
      overallScore:        ranking.overallScore ?? 0,
      cvJdMatchScore,
      competencyScore,
      behavioral,
      biasRiskLevel:       biasScore >= 0.9 ? 'Low' : biasScore >= 0.7 ? 'Medium' : 'High',
      dropoutRiskLevel:    dropoutRisk < 40  ? 'Low' : dropoutRisk < 70 ? 'Medium' : 'High',
      matchedSkills:       matching.matchedSkills ?? [],
      missingSkills:       matching.missingSkills ?? [],
      confidence:          r.rankingResult?.confidence ?? 0,
      requiresHumanReview: r.requiresHumanReview,
      humanReviewReason:   r.humanReviewReason,
      breakdown:           ranking.breakdown ?? {},
      explanationData,
      biasScore,
      biasChecks: [
        { passed: !bias.genderBias?.detected,   label: 'Gender Bias',   detail: bias.genderBias?.details   ?? '—' },
        { passed: !bias.locationBias?.detected, label: 'Location Bias', detail: bias.locationBias?.details ?? '—' },
        { passed: !bias.collegeBias?.detected,  label: 'College Bias',  detail: bias.collegeBias?.details  ?? '—' },
        { passed: !bias.ageBias?.detected,      label: 'Age Bias',      detail: bias.ageBias?.details      ?? '—' }
      ],
      modelVersion:  r.explanationResult?.modelVersion  ?? '—',
      promptVersion: r.explanationResult?.promptVersion ?? '—',
      timestamp:     r.timestamp
    };
  }

  // ── Behavioral Intelligence helpers ──────────────────────────

  toggleEvidence(key: string): void {
    this.expandedEvidence[key] = !this.expandedEvidence[key];
  }

  /** SVG polygon points for the score shape */
  getRadarPoints(scores: any): string {
    if (!scores) return '';
    return this.behavioralSkills.map((skill, i) => {
      const { x, y } = this.polarToCartesian(i, (scores[skill.key] ?? 50) / 100);
      return `${x},${y}`;
    }).join(' ');
  }

  /** SVG polygon points for a background ring (0–1 fraction of max) */
  getRadarBackground(fraction: number): string {
    return Array.from({ length: 8 }, (_, i) => {
      const { x, y } = this.polarToCartesian(i, fraction);
      return `${x},${y}`;
    }).join(' ');
  }

  /** SVG axis line endpoints (from center to outer vertex) */
  getRadarAxes(): { x2: number, y2: number }[] {
    return Array.from({ length: 8 }, (_, i) => {
      const { x, y } = this.polarToCartesian(i, 1);
      return { x2: x, y2: y };
    });
  }

  /** SVG dot positions for individual skill scores */
  getBehavioralRadarDots(scores: any): { x: number, y: number }[] {
    if (!scores) return [];
    return this.behavioralSkills.map((skill, i) =>
      this.polarToCartesian(i, (scores[skill.key] ?? 50) / 100)
    );
  }

  /** Returns archetype title, description, and accent color from top skills */
  getBehavioralArchetype(scores: any): { title: string, description: string, color: string } {
    if (!scores) return { title: 'Evaluating...', description: '', color: '#6b7280' };
    const entries = Object.entries(scores as Record<string, number>);
    const top3    = new Set(entries.sort((a, b) => b[1] - a[1]).slice(0, 3).map(p => p[0]));

    if (top3.has('leadership') && top3.has('ownership'))
      return { title: 'Visionary Leader',      description: 'Drives teams with clarity and accountability',        color: '#7c3aed' };
    if (top3.has('problemSolving') && top3.has('criticalThinking'))
      return { title: 'Analytical Innovator',  description: 'Tackles complexity with systematic thinking',         color: '#0891b2' };
    if (top3.has('collaboration') && top3.has('communication'))
      return { title: 'Trusted Collaborator',  description: 'Builds bridges with reliability and empathy',         color: '#059669' };
    if (top3.has('ownership') && top3.has('adaptability'))
      return { title: 'Accountable Achiever',  description: 'Takes charge and delivers in dynamic environments',   color: '#d97706' };
    if (top3.has('adaptability') && top3.has('criticalThinking'))
      return { title: 'Strategic Adapter',     description: 'Evolves with change while staying analytically sharp', color: '#db2777' };
    if (top3.has('integrity'))
      return { title: 'Principled Executor',   description: 'Consistent, trustworthy, and dependable',             color: '#16a34a' };
    return   { title: 'Versatile Professional', description: 'Balanced across multiple behavioral dimensions',      color: '#6b7280' };
  }

  getBehavioralScoreClass(score: number): string {
    return score >= 75 ? 'bscore-high' : score >= 50 ? 'bscore-mid' : 'bscore-low';
  }

  getBehavioralBarColor(score: number): string {
    return score >= 75 ? 'linear-gradient(90deg,#10b981,#34d399)'
         : score >= 50 ? 'linear-gradient(90deg,#f59e0b,#fbbf24)'
         :               'linear-gradient(90deg,#ef4444,#f87171)';
  }

  getBehavioralAverage(scores: any): number {
    if (!scores) return 0;
    const vals = Object.values(scores) as number[];
    return vals.length ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) : 0;
  }

  private polarToCartesian(index: number, fraction: number): { x: number, y: number } {
    const cx = 100, cy = 100, maxR = 75;
    const angle = (index * 45 - 90) * Math.PI / 180;
    const r = fraction * maxR;
    return { x: +((cx + r * Math.cos(angle)).toFixed(2)), y: +((cy + r * Math.sin(angle)).toFixed(2)) };
  }

  // ── Existing helpers ─────────────────────────────────────────

  private fileIconFor(file: File): string {
    const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
    return ({ pdf: '📄', docx: '📝', doc: '📝', jpg: '🖼️', jpeg: '🖼️', png: '🖼️' } as any)[ext] ?? '📎';
  }

  get jdFileIcon()     { return this.jdFile     ? this.fileIconFor(this.jdFile)     : ''; }
  get resumeFileIcon() { return this.resumeFile ? this.fileIconFor(this.resumeFile) : ''; }

  private extractFile(file: File, onText: (t: string) => void, onError: (e: string) => void, onDone: () => void) {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(',')[1];
      this.http.post<{ text: string }>(`${environment.apiUrl}/api/resume-parser/extract-text`, {
        fileData: base64, fileName: file.name, mimeType: file.type
      }).subscribe({
        next:  r   => { onText(r.text); onDone(); },
        error: err => { onError(err?.error?.error ?? 'Extraction failed'); onDone(); }
      });
    };
    reader.readAsDataURL(file);
  }

  onJdFileSelect(e: Event) {
    const f = (e.target as HTMLInputElement).files?.[0];
    if (f) this.loadJdFile(f);
  }
  onJdDrop(e: DragEvent) {
    e.preventDefault(); this.jdDragOver = false;
    const f = e.dataTransfer?.files[0];
    if (f) this.loadJdFile(f);
  }
  loadJdFile(file: File) {
    this.jdFile = file; this.jdExtracting = true; this.jdExtractError = ''; this.jdText = '';
    this.extractFile(file, t => this.jdText = t, e => this.jdExtractError = e, () => this.jdExtracting = false);
  }
  clearJdFile(e: MouseEvent) {
    e.stopPropagation();
    this.jdFile = null; this.jdText = ''; this.jdExtractError = '';
    if (this.jdFileInput?.nativeElement) this.jdFileInput.nativeElement.value = '';
  }

  onResumeFileSelect(e: Event) {
    const f = (e.target as HTMLInputElement).files?.[0];
    if (f) this.loadResumeFile(f);
  }
  onResumeDrop(e: DragEvent) {
    e.preventDefault(); this.resumeDragOver = false;
    const f = e.dataTransfer?.files[0];
    if (f) this.loadResumeFile(f);
  }
  loadResumeFile(file: File) {
    this.resumeFile = file; this.resumeExtracting = true; this.resumeExtractError = ''; this.resumeText = '';
    this.extractFile(file, t => this.resumeText = t, e => this.resumeExtractError = e, () => this.resumeExtracting = false);
  }
  clearResumeFile(e: MouseEvent) {
    e.stopPropagation();
    this.resumeFile = null; this.resumeText = ''; this.resumeExtractError = '';
    if (this.resumeFileInput?.nativeElement) this.resumeFileInput.nativeElement.value = '';
  }

  getGaugeColour(score: number): string {
    return score >= 70 ? '#10b981' : score >= 40 ? '#f59e0b' : '#ef4444';
  }

  getRiskClass(level: string): string {
    return level === 'Low' ? 'risk-low' : level === 'Medium' ? 'risk-medium' : 'risk-high';
  }

  getConfidenceClass(c: number): string { return c >= 0.8 ? 'high' : c >= 0.6 ? 'medium' : 'low'; }
  getConfidenceLabel(c: number): string {
    return c >= 0.8 ? 'High Confidence' : c >= 0.6 ? 'Medium Confidence' : 'Low Confidence — Human Review Required';
  }
  getBiasClass(s: number): string { return s >= 0.9 ? 'safe' : s >= 0.7 ? 'warning' : 'alert'; }

  exportPdf(): void {
    window.print();
  }

  getRecommendationClass(rec: string): string {
    return rec === 'SHORTLIST' ? 'rec-shortlist' : rec === 'REVIEW' ? 'rec-review' : rec === 'REJECT' ? 'rec-reject' : 'rec-unknown';
  }

  private resetAgents() {
    this.agents.forEach(a => { a.status = 'pending'; a.statusText = 'Waiting...'; });
  }
  private delay(ms: number) { return new Promise(r => setTimeout(r, ms)); }
}
