import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../environments/environment';

@Component({ selector: 'app-resume-parser',
  template: `
    <section class="stack-page">
      <div class="card form-card">
        <h3>Resume Parser</h3>
        <p style="color:var(--text-3);margin-bottom:16px;">Upload a resume file or paste text to extract structured candidate data using AI.</p>

        <!-- Upload Zone -->
        <div class="upload-zone"
          [class.dz-hover]="isDragOver"
          [class.dz-loaded]="!!selectedFile"
          (click)="fileInput.click()"
          (dragover)="onDragOver($event)"
          (dragleave)="isDragOver = false"
          (drop)="onDrop($event)">
          <input #fileInput type="file" style="display:none"
            accept=".pdf,.docx,.doc,.jpg,.jpeg,.png"
            (change)="onFileSelect($event)">

          <div *ngIf="!selectedFile" class="dz-idle">
            <div class="dz-icon">📎</div>
            <div class="dz-label">Drop file here or <span class="dz-link">browse</span></div>
            <div class="dz-hint">PDF · DOCX · DOC · JPG · PNG</div>
          </div>

          <div *ngIf="selectedFile" class="dz-file-info">
            <span class="dz-file-icon">{{ fileIcon }}</span>
            <div>
              <div style="font-weight:600;font-size:14px;">{{ selectedFile.name }}</div>
              <div style="font-size:12px;color:var(--text-3);">{{ fileSizeLabel }}</div>
            </div>
            <span *ngIf="extracting" class="dz-spinner">⏳ Extracting...</span>
            <span *ngIf="!extracting && cvText" style="color:#10b981;font-size:13px;margin-left:auto;">✔ Text ready</span>
            <button *ngIf="!extracting" class="dz-remove" (click)="clearFile($event)">✕</button>
          </div>
        </div>

        <div *ngIf="extractError" style="color:#ef4444;font-size:13px;margin-top:6px;">⚠ {{ extractError }}</div>

        <div class="or-divider"><span>or paste text below</span></div>

        <textarea class="textarea" rows="8" [(ngModel)]="cvText"
          placeholder="Paste CV / resume text here..."></textarea>

        <button class="btn btn-primary" (click)="parse()" [disabled]="parsing || extracting || !cvText.trim()" style="margin-top:12px;">
          <span *ngIf="!parsing">⚡ Parse Resume</span>
          <span *ngIf="parsing">🔄 Parsing...</span>
        </button>
        <div *ngIf="parseError" style="color:#ef4444;margin-top:8px;">{{ parseError }}</div>
      </div>

      <!-- Parsed Result -->
      <div class="card" *ngIf="result">
        <h3>Parsed Result</h3>

        <div class="candidate-head" style="margin-bottom:16px;">
          <div>
            <h3 style="margin:0;">{{ result.fullName }}</h3>
            <p style="margin:4px 0 0;color:var(--text-3);">{{ result.email }} &nbsp;·&nbsp; {{ result.phone }}</p>
          </div>
        </div>

        <p *ngIf="result.summary" style="margin-bottom:16px;">{{ result.summary }}</p>

        <div class="mb-4" *ngIf="result.skills?.length">
          <strong>Skills</strong>
          <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:8px;">
            <span class="chip chip-brand" *ngFor="let s of result.skills">{{ s }}</span>
          </div>
        </div>

        <div class="mb-4" *ngIf="result.experience?.length">
          <strong>Experience</strong>
          <div class="metric-line" *ngFor="let e of result.experience" style="flex-direction:column;align-items:flex-start;gap:2px;padding:8px 0;border-bottom:1px solid var(--border);">
            <b>{{ e.title }} &#64; {{ e.company }}</b>
            <span style="color:var(--text-3);font-size:12px;">{{ e.startDate }} – {{ e.endDate }}</span>
            <span style="font-size:13px;">{{ e.description }}</span>
          </div>
        </div>

        <div class="mb-4" *ngIf="result.educationHistory?.length">
          <strong>Education</strong>
          <div class="metric-line" *ngFor="let e of result.educationHistory">
            <span>{{ e.institution }}</span>
            <b>{{ e.degree }} {{ e.field }} ({{ e.graduationYear }})</b>
          </div>
        </div>

        <div *ngIf="result.certifications?.length">
          <strong>Certifications</strong>
          <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:8px;">
            <span class="chip" *ngFor="let c of result.certifications">{{ c }}</span>
          </div>
        </div>

        <div style="display:flex;gap:12px;margin-top:20px;align-items:center;">
          <button class="btn btn-primary" (click)="runScorecard()">Run AI Scorecard</button>
          <button class="btn btn-secondary" (click)="saveToDatabase()">Save to CV Database</button>
        </div>
      </div>
    </section>

    <style>
      .upload-zone { border: 2px dashed var(--border-strong);
        border-radius: 10px;
        padding: 24px;
        cursor: pointer;
        transition: border-color 0.2s, background 0.2s;
        background: var(--surface-alt);
        margin-bottom: 4px; }
      .upload-zone:hover, .upload-zone.dz-hover { border-color: var(--brand-violet-500);
        background: var(--brand-violet-50, #f4f1ff); }
      .upload-zone.dz-loaded { border-style: solid;
        border-color: var(--brand-violet-400);
        background: var(--brand-violet-50, #f4f1ff); }
      .dz-idle { text-align: center; }
      .dz-icon { font-size: 36px; margin-bottom: 8px; }
      .dz-label { font-size: 15px; color: var(--text-2); }
      .dz-link { color: var(--brand-violet-500); font-weight: 600; }
      .dz-hint { font-size: 12px; color: var(--text-3); margin-top: 4px; }
      .dz-file-info { display: flex; align-items: center; gap: 12px; }
      .dz-file-icon { font-size: 28px; }
      .dz-spinner { color: var(--text-3); font-size: 13px; margin-left: auto; }
      .dz-remove { margin-left: auto; background: none; border: none; cursor: pointer;
        font-size: 16px; color: var(--text-3); padding: 4px 8px; border-radius: 4px; }
      .dz-remove:hover { background: var(--n-100); color: var(--danger-500); }
      .or-divider { display: flex; align-items: center; gap: 12px;
        color: var(--text-3); font-size: 13px; margin: 14px 0 10px; }
      .or-divider::before, .or-divider::after { content: ''; flex: 1; height: 1px; background: var(--border); }
    </style>
  `
})
export class ResumeParserComponent { @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  cvText = '';
  parsing = false;
  result: any = null;
  parseError = '';

  selectedFile: File | null = null;
  extracting = false;
  extractError = '';
  isDragOver = false;

  constructor(private http: HttpClient, private router: Router, private snack: MatSnackBar) {}

  get fileIcon(): string { const ext = this.selectedFile?.name.split('.').pop()?.toLowerCase() ?? '';
    return ({ pdf: '📄', docx: '📝', doc: '📝', jpg: '🖼️', jpeg: '🖼️', png: '🖼️' } as any)[ext] ?? '📎'; }

  get fileSizeLabel(): string { if (!this.selectedFile) return '';
    const kb = this.selectedFile.size / 1024;
    return kb > 1024 ? `${(kb / 1024).toFixed(1)} MB` : `${Math.round(kb)} KB`; }

  onDragOver(event: DragEvent) { event.preventDefault();
    this.isDragOver = true; }

  onDrop(event: DragEvent) { event.preventDefault();
    this.isDragOver = false;
    const file = event.dataTransfer?.files[0];
    if (file) this.extractFromFile(file); }

  onFileSelect(event: Event) { const file = (event.target as HTMLInputElement).files?.[0];
    if (file) this.extractFromFile(file); }

  clearFile(event: MouseEvent) { event.stopPropagation();
    this.selectedFile = null;
    this.cvText = '';
    this.extractError = '';
    if (this.fileInput?.nativeElement) this.fileInput.nativeElement.value = ''; }

  extractFromFile(file: File) { this.selectedFile = file;
    this.extracting = true;
    this.extractError = '';
    this.cvText = '';

    const reader = new FileReader();
    reader.onload = () => { const base64 = (reader.result as string).split(',')[1];
      this.http.post<{ text: string }>(`${environment.apiUrl}/api/resume-parser/extract-text`, { fileData: base64,
        fileName: file.name,
        mimeType: file.type }).subscribe({ next: r => { this.cvText = r.text; this.extracting = false; },
        error: err => { this.extractError = err?.error?.error ?? 'Failed to extract text from file';
          this.extracting = false; } }); };
    reader.readAsDataURL(file); }

  parse() { this.parsing = true;
    this.parseError = '';
    this.http.post<any>(`${environment.apiUrl}/api/resume-parser/parse`, { cvText: this.cvText })
      .subscribe({ next: r => { this.result = r; this.parsing = false; },
        error: err => { this.parseError = err?.error?.error ?? 'Parse failed'; this.parsing = false; } }); }

  runScorecard() { this.router.navigate(['/ai-scorecard'], { state: { resumeText: this.cvText } }); }

  saveToDatabase() { if (!this.result) return;
    const payload = { name: this.result.fullName,
      email: this.result.email,
      skillsText: (this.result.skills ?? []).join(', '),
      cvText: this.cvText };
    this.http.post(`${environment.apiUrl}/api/cv-database`, payload).subscribe({ next: () => this.snack.open('Saved to CV Database', '', { duration: 2000 }),
      error: () => this.snack.open('Failed to save to CV Database', 'Close', { duration: 3000 }) }); }
}

