import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface Agent {
  name: string;
  icon: string;
  status: 'pending' | 'processing' | 'complete' | 'failed';
  statusText: string;
}

@Component({
  selector: 'app-ai-scorecard',
  templateUrl: './ai-scorecard.component.html'
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

  agents: Agent[] = [
    { name: 'Parsing Agent',        icon: '📄', status: 'pending', statusText: 'Waiting...' },
    { name: 'Matching Agent',       icon: '🔍', status: 'pending', statusText: 'Waiting...' },
    { name: 'Ranking Agent',        icon: '📊', status: 'pending', statusText: 'Waiting...' },
    { name: 'Explanation Agent',    icon: '💬', status: 'pending', statusText: 'Waiting...' },
    { name: 'Bias Detection Agent', icon: '⚖️', status: 'pending', statusText: 'Waiting...' }
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
    const ranking     = r.rankingResult?.data ?? {};
    const explanation = r.explanationResult?.data ?? {};
    const bias        = r.biasDetectionResult?.data ?? {};
    const matching    = r.matchingResult?.data ?? {};

    const cvJdMatchScore = matching.matchPercentage ?? 0;
    const competencyScore = ranking.breakdown?.skillsMatch ?? 0;
    const biasScore = bias.overallBiasFreeScore ?? 1;
    const dropoutRisk = ranking.breakdown?.dropoutRisk ?? 0;

    return {
      overallScore:        ranking.overallScore ?? 0,
      cvJdMatchScore,
      competencyScore,
      biasRiskLevel:   biasScore >= 0.9 ? 'Low' : biasScore >= 0.7 ? 'Medium' : 'High',
      dropoutRiskLevel: dropoutRisk < 40 ? 'Low' : dropoutRisk < 70 ? 'Medium' : 'High',
      matchedSkills:   matching.matchedSkills ?? [],
      missingSkills:   matching.missingSkills ?? [],
      confidence:      r.rankingResult?.confidence ?? 0,
      requiresHumanReview: r.requiresHumanReview,
      humanReviewReason:   r.humanReviewReason,
      breakdown:       ranking.breakdown ?? {},
      explanation:     explanation.explanation ?? 'No explanation generated.',
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
        next: r  => { onText(r.text); onDone(); },
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

  exportResults(): void {
    const blob = new Blob([JSON.stringify(this.results, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `ai-scorecard-${Date.now()}.json`;
    a.click();
  }

  private resetAgents() {
    this.agents.forEach(a => { a.status = 'pending'; a.statusText = 'Waiting...'; });
  }
  private delay(ms: number) { return new Promise(r => setTimeout(r, ms)); }
}
