import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-resume-parser',
  template: `
    <section class="stack-page">
      <!-- Upload -->
      <div class="card form-card">
        <h3>Resume Parser</h3>
        <p style="color:var(--text-3);margin-bottom:12px;">Paste CV text to extract structured candidate data using AI.</p>

        <textarea class="textarea" rows="10" [(ngModel)]="cvText"
          placeholder="Paste CV / resume text here (PDF/DOCX text)..."></textarea>

        <button class="btn btn-primary" (click)="parse()" [disabled]="parsing || !cvText.trim()">
          <span *ngIf="!parsing">⚡ Parse Resume</span>
          <span *ngIf="parsing">🔄 Parsing...</span>
        </button>
        <div *ngIf="error" style="color:#ef4444;margin-top:8px;">{{ error }}</div>
      </div>

      <!-- Parsed Result -->
      <div class="card" *ngIf="result">
        <h3>Parsed Result</h3>

        <!-- Identity -->
        <div class="candidate-head" style="margin-bottom:16px;">
          <div>
            <h3 style="margin:0;">{{ result.fullName }}</h3>
            <p style="margin:4px 0 0;color:var(--text-3);">{{ result.email }} &nbsp;·&nbsp; {{ result.phone }}</p>
          </div>
        </div>

        <p *ngIf="result.summary" style="margin-bottom:16px;">{{ result.summary }}</p>

        <!-- Skills -->
        <div class="mb-4" *ngIf="result.skills?.length">
          <strong>Skills</strong>
          <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:8px;">
            <span class="chip chip-brand" *ngFor="let s of result.skills">{{ s }}</span>
          </div>
        </div>

        <!-- Experience -->
        <div class="mb-4" *ngIf="result.experience?.length">
          <strong>Experience</strong>
          <div class="metric-line" *ngFor="let e of result.experience" style="flex-direction:column;align-items:flex-start;gap:2px;padding:8px 0;border-bottom:1px solid var(--border);">
            <b>{{ e.title }} &#64; {{ e.company }}</b>
            <span style="color:var(--text-3);font-size:12px;">{{ e.startDate }} – {{ e.endDate }}</span>
            <span style="font-size:13px;">{{ e.description }}</span>
          </div>
        </div>

        <!-- Education -->
        <div class="mb-4" *ngIf="result.educationHistory?.length">
          <strong>Education</strong>
          <div class="metric-line" *ngFor="let e of result.educationHistory">
            <span>{{ e.institution }}</span>
            <b>{{ e.degree }} {{ e.field }} ({{ e.graduationYear }})</b>
          </div>
        </div>

        <!-- Certifications -->
        <div *ngIf="result.certifications?.length">
          <strong>Certifications</strong>
          <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:8px;">
            <span class="chip" *ngFor="let c of result.certifications">{{ c }}</span>
          </div>
        </div>

        <!-- Actions -->
        <div style="display:flex;gap:12px;margin-top:20px;">
          <button class="btn btn-primary" (click)="runScorecard()">Run AI Scorecard</button>
          <button class="btn btn-secondary" (click)="saveToDatabase()">Save to CV Database</button>
        </div>
      </div>
    </section>
  `
})
export class ResumeParserComponent {
  cvText = '';
  parsing = false;
  result: any = null;
  error = '';

  constructor(private http: HttpClient, private router: Router) {}

  parse() {
    this.parsing = true;
    this.error = '';
    this.http.post<any>(`${environment.apiUrl}/api/resume-parser/parse`, { cvText: this.cvText })
      .subscribe({
        next: r => { this.result = r; this.parsing = false; },
        error: err => { this.error = err?.error?.error ?? 'Parse failed'; this.parsing = false; }
      });
  }

  runScorecard() {
    this.router.navigate(['/ai-scorecard'], { state: { resumeText: this.cvText } });
  }

  saveToDatabase() {
    if (!this.result) return;
    const payload = {
      name: this.result.fullName,
      email: this.result.email,
      skillsText: (this.result.skills ?? []).join(', '),
      cvText: this.cvText
    };
    this.http.post(`${environment.apiUrl}/api/cv-database`, payload)
      .subscribe({ next: () => alert('Saved to CV Database'), error: () => alert('Save failed') });
  }
}
