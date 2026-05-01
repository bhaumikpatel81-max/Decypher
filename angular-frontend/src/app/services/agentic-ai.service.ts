import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AgenticAIService {
  private base = `${environment.apiUrl}/api/agenticai`;

  constructor(private http: HttpClient) {}

  async autoMatch(jobDescription: string): Promise<{ topMatches: any[] }> {
    const res: any = await firstValueFrom(
      this.http.post(`${this.base}/auto-match`, { jobDescription })
    );
    const matches = res?.data?.topMatches ?? res?.topMatches ?? res?.data ?? [];
    return { topMatches: Array.isArray(matches) ? matches : [] };
  }

  async analyzeMatch(jobDescription: string, resumeText: string): Promise<any> {
    const res: any = await firstValueFrom(
      this.http.post(`${this.base}/match-cv-jd`, { resumeText, jobDescriptionText: jobDescription })
    );
    const d = res?.data ?? res ?? {};
    return {
      overallScore:    d.matchPercentage ?? d.overallScore ?? 0,
      recommendation:  d.recommendation  ?? 'Review',
      strengths:       d.matchedSkills   ?? d.strengths    ?? [],
      concerns:        d.missingSkills   ?? d.concerns     ?? [],
      interviewTopics: d.interviewTopics ?? d.suggestedTopics ?? [],
    };
  }

  async generateQuestions(request: {
    candidateName: string;
    jobTitle: string;
    experience: number;
    skills: string[];
  }): Promise<any> {
    const jobDescription = `Role: ${request.jobTitle}. Required Skills: ${request.skills.join(', ')}. Experience: ${request.experience} years.`;
    const res: any = await firstValueFrom(
      this.http.post(`${this.base}/generate-questions`, {
        jobDescription,
        candidateName: request.candidateName,
        numberOfQuestions: 15,
      })
    );
    const d = res?.data ?? {};
    if (d.technicalQuestions) return d;
    const normalize = (arr: any[], difficulty: string) =>
      (arr ?? []).map((q: any) => typeof q === 'string'
        ? { questionText: q, difficulty, expectedAnswer: '', followUp: '' }
        : { questionText: q.question ?? q.questionText ?? '', difficulty: q.difficulty ?? difficulty, expectedAnswer: q.expectedAnswer ?? '', followUp: q.followUp ?? '' });
    const all = d.questions ?? d.items ?? [];
    const size = Math.ceil(all.length / 4) || 1;
    return {
      technicalQuestions:   normalize(all.slice(0, size),         'Medium'),
      behavioralQuestions:  normalize(all.slice(size, size * 2),  'Medium'),
      situationalQuestions: normalize(all.slice(size * 2, size * 3), 'Hard'),
      customQuestions:      normalize(all.slice(size * 3),        'Easy'),
    };
  }

  async chat(message: string, context: string = ''): Promise<string> {
    const res: any = await firstValueFrom(
      this.http.post(`${this.base}/chatbot`, { message, context })
    );
    return res?.data?.reply ?? res?.data?.message ?? res?.message ?? 'Thank you for your message!';
  }
}
