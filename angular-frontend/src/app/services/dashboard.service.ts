import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface DashboardMetrics {
  totalCandidates: number;
  totalRequirements: number;
  totalVendors: number;
  selectionRate: number;
  pipelineVelocity: any;
  hiringFunnel: any;
  topVendors: any[];
  recruiterPerformance: any[];
  aiInsights: any[];
  recentActivity: any[];
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = `${environment.apiUrl}/api/dashboard`;

  constructor(private http: HttpClient) {}

  getDashboardMetrics(tenantId: string): Observable<DashboardMetrics> {
    return this.http.get<DashboardMetrics>(`${this.apiUrl}/metrics?tenantId=${tenantId}`);
  }

  getRecruiterPerformance(tenantId: string, month?: number, year?: number): Observable<any[]> {
    let url = `${this.apiUrl}/recruiter-performance?tenantId=${tenantId}`;
    if (month) url += `&month=${month}`;
    if (year) url += `&year=${year}`;
    return this.http.get<any[]>(url);
  }

  getPipelineVelocity(tenantId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/pipeline-velocity?tenantId=${tenantId}`);
  }

  getHiringFunnel(tenantId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/hiring-funnel?tenantId=${tenantId}`);
  }

  getRecentActivity(tenantId: string, limit: number = 10): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/recent-activity?tenantId=${tenantId}&limit=${limit}`);
  }
}
