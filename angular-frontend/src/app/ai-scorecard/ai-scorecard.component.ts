import { Component } from '@angular/core';
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
  jdText = '';
  resumeText = '';
  isProcessing = false;
  results: any = null;
  errorMessage = '';

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

    return {
      overallScore:        ranking.overallScore ?? 0,
      matchPercentage:     matching.matchPercentage ?? 0,
      confidence:          r.rankingResult?.confidence ?? 0,
      requiresHumanReview: r.requiresHumanReview,
      humanReviewReason:   r.humanReviewReason,
      breakdown:           ranking.breakdown ?? {},
      explanation:         explanation.explanation ?? 'No explanation generated.',
      biasScore:           bias.overallBiasFreeScore ?? 1,
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
