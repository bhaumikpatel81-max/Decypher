import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Vendor {
  id: string;
  name: string;
  email: string;
  phone: string;
  contactPerson: string;
  submissions: number;
  joinings: number;
  qualityScore: number;
  slaScore: number;
  status: string;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  private apiUrl = `${environment.apiUrl}/api/vendors`;

  constructor(private http: HttpClient) {}

  getAllVendors(tenantId: string): Observable<Vendor[]> {
    return this.http.get<Vendor[]>(`${this.apiUrl}?tenantId=${tenantId}`);
  }

  getVendorById(id: string): Observable<Vendor> {
    return this.http.get<Vendor>(`${this.apiUrl}/${id}`);
  }

  createVendor(vendor: Partial<Vendor>): Observable<Vendor> {
    return this.http.post<Vendor>(this.apiUrl, vendor);
  }

  updateVendor(id: string, vendor: Partial<Vendor>): Observable<Vendor> {
    return this.http.put<Vendor>(`${this.apiUrl}/${id}`, vendor);
  }

  deleteVendor(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getVendorPerformanceMetrics(tenantId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/performance-metrics?tenantId=${tenantId}`);
  }

  getVendorsByStatus(status: string, tenantId: string): Observable<Vendor[]> {
    let params = new HttpParams()
      .set('status', status)
      .set('tenantId', tenantId);
    return this.http.get<Vendor[]>(`${this.apiUrl}/by-status`, { params });
  }
}
