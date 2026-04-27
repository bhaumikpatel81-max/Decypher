import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface CurrentUser {
  id: string;
  fullName: string;
  email: string;
  role: string;
  initials: string;
  access: string[];
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = `${environment.apiUrl}/api/auth`;
  private readonly currentUserSubject = new BehaviorSubject<CurrentUser | null>(this.getStoredUser());

  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<{ token: string; user: CurrentUser }> {
    return this.http.post<{ token: string; user: CurrentUser }>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(result => this.setSession(result.token, result.user))
    );
  }

  guestLogin(): Observable<{ token: string; user: CurrentUser }> {
    return this.http.post<{ token: string; user: CurrentUser }>(`${this.apiUrl}/guest`, {}).pipe(
      tap(result => this.setSession(result.token, result.user))
    );
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  getCurrentUser(): CurrentUser | null {
    return this.currentUserSubject.value;
  }

  can(accessKey: string): boolean {
    const user = this.currentUserSubject.value;
    return !!user && (user.role === 'SuperAdmin' || user.access.includes(accessKey));
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  private setSession(token: string, user: CurrentUser): void {
    localStorage.setItem('authToken', token);
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('tenantId', '11111111-1111-1111-1111-111111111111');
    this.currentUserSubject.next(user);
  }

  private getStoredUser(): CurrentUser | null {
    const raw = localStorage.getItem('currentUser');
    if (!raw) return null;

    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }
}
