import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({ selector: 'app-jd-generator',
  templateUrl: './jd-generator.component.html'
})
export class JdGeneratorComponent { form = { jobTitle: '',
    department: '',
    requiredSkillsText: '',
    minYearsExperience: 2,
    maxYearsExperience: 5,
    employmentType: 'Full-time',
    additionalContext: '' };

  isGenerating = false;
  result: any = null;
  errorMessage = '';

  employmentTypes = ['Full-time', 'Part-time', 'Contract', 'Remote', 'Hybrid', 'Internship'];

  constructor(private http: HttpClient) {}

  generate(): void { if (!this.form.jobTitle.trim()) { this.errorMessage = 'Job Title is required.';
      return; }

    this.isGenerating = true;
    this.result = null;
    this.errorMessage = '';

    const payload = { jobTitle: this.form.jobTitle,
      department: this.form.department,
      requiredSkills: this.form.requiredSkillsText
        .split(',')
        .map(s => s.trim())
        .filter(Boolean),
      minYearsExperience: this.form.minYearsExperience,
      maxYearsExperience: this.form.maxYearsExperience,
      employmentType: this.form.employmentType,
      additionalContext: this.form.additionalContext || null };

    this.http.post<any>(`${environment.apiUrl}/api/aiagents/generate-jd`, payload)
      .subscribe({ next: res => { this.result = res;
          this.isGenerating = false; },
        error: err => { this.errorMessage = err?.error?.error ?? 'JD generation failed. Please try again.';
          this.isGenerating = false; } }); }

  copyToClipboard(): void { if (!this.result?.data) return;
    const d = this.result.data;
    const text = [
      `# ${d.title}`,
      `\n## Overview\n${d.overview}`,
      `\n## Responsibilities\n${d.responsibilities.map((r: string) => `• ${r}`).join('\n')}`,
      `\n## Requirements\n${d.requirements.map((r: string) => `• ${r}`).join('\n')}`,
      d.niceToHave?.length ? `\n## Nice to Have\n${d.niceToHave.map((r: string) => `• ${r}`).join('\n')}` : '',
      d.benefits?.length   ? `\n## Benefits\n${d.benefits.map((r: string) => `• ${r}`).join('\n')}`    : '',
      `\n**Employment Type:** ${d.employmentType}`,
      `**Experience:** ${d.experienceRange}`
    ].join('\n');

    navigator.clipboard.writeText(text); }

  reset(): void { this.result = null;
    this.errorMessage = '';
    this.form = { jobTitle: '', department: '', requiredSkillsText: '',
      minYearsExperience: 2, maxYearsExperience: 5,
      employmentType: 'Full-time', additionalContext: '' }; }
}

