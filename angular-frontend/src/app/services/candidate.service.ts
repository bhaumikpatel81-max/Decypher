import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  currentTitle: string;
  requiredSkills: string[];
  dropoutRisk: number;
  matchScore: number;
  status: string;
  stage: string;
  vendorId: string;
  requirementId: string;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  private apiUrl = `${environment.apiUrl}/api/candidates`;

  constructor(private http: HttpClient) {}

  getAllCandidates(tenantId: string): Observable<Candidate[]> {
    return this.http.get<Candidate[]>(`${this.apiUrl}?tenantId=${tenantId}`);
  }

  getCandidateById(id: string): Observable<Candidate> {
    return this.http.get<Candidate>(`${this.apiUrl}/${id}`);
  }

  createCandidate(candidate: Partial<Candidate>): Observable<Candidate> {
    return this.http.post<Candidate>(this.apiUrl, candidate);
  }

  updateCandidate(id: string, candidate: Partial<Candidate>): Observable<Candidate> {
    return this.http.put<Candidate>(`${this.apiUrl}/${id}`, candidate);
  }

  deleteCandidate(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getCandidatesByStage(stage: string, tenantId: string): Observable<Candidate[]> {
    let params = new HttpParams()
      .set('stage', stage)
      .set('tenantId', tenantId);
    return this.http.get<Candidate[]>(`${this.apiUrl}/by-stage`, { params });
  }

  getHighRiskCandidates(tenantId: string, threshold: number = 70): Observable<Candidate[]> {
    let params = new HttpParams()
      .set('tenantId', tenantId)
      .set('threshold', threshold.toString());
    return this.http.get<Candidate[]>(`${this.apiUrl}/high-risk`, { params });
  }

  getCandidatesByStageCounts(tenantId: string): Observable<{ [stage: string]: number }> {
    return this.http.get<{ [stage: string]: number }>(`${this.apiUrl}/stage-counts?tenantId=${tenantId}`);
  }
}
