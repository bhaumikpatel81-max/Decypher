import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  private api = `${environment.apiUrl}/api/settings`;

  constructor(private http: HttpClient) {}

  updateProfile(data: any): Observable<any> {
    return this.http.put(`${this.api}/profile`, data);
  }

  updateCompany(data: any): Observable<any> {
    return this.http.put(`${this.api}/company`, data);
  }

  getTeamMembers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/team`);
  }

  updatePlatformSettings(data: any): Observable<any> {
    return this.http.put(`${this.api}/platform`, data);
  }
}
