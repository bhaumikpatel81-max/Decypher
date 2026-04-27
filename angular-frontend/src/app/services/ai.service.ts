import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface AIResponse {
  success: boolean;
  data: any;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AIService {
  private apiUrl = `${environment.apiUrl}/api/agenticai`;

  constructor(private http: HttpClient) {}

  scoreResume(resumeText: string, jobDescriptionText: string): Observable<AIResponse> {
    return this.http.post<AIResponse>(`${this.apiUrl}/score-resume`, {
      resumeText,
      jobDescriptionText
    });
  }

  matchCvJd(resumeText: string, jobDescriptionText: string): Observable<AIResponse> {
    return this.http.post<AIResponse>(`${this.apiUrl}/match-cv-jd`, {
      resumeText,
      jobDescriptionText
    });
  }

  generateQuestions(jobDescription: string, numberOfQuestions: number = 5): Observable<AIResponse> {
    return this.http.post<AIResponse>(`${this.apiUrl}/generate-questions`, {
      jobDescription,
      numberOfQuestions
    });
  }

  chatbot(message: string, context?: string): Observable<AIResponse> {
    return this.http.post<AIResponse>(`${this.apiUrl}/chatbot`, {
      message,
      context
    });
  }

  analyzeJobDescription(jobDescription: string): Observable<AIResponse> {
    return this.http.post<AIResponse>(`${this.apiUrl}/analyze-jd`, {
      jobDescription
    });
  }

  predictDropoutRisk(candidateData: any): Observable<AIResponse> {
    return this.http.post<AIResponse>(`${this.apiUrl}/predict-dropout`, candidateData);
  }

  rankCompetencies(candidates: any[]): Observable<AIResponse> {
    return this.http.post<AIResponse>(`${this.apiUrl}/rank-competencies`, {
      candidates
    });
  }
}
