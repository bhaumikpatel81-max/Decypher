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

export interface ModulePerm {
  moduleKey: string;
  canRead: boolean;
  canWrite: boolean;
  canDelete: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = `${environment.apiUrl}/api/auth`;
  private readonly currentUserSubject = new BehaviorSubject<CurrentUser | null>(this.getStoredUser());

  currentUser$ = this.currentUserSubject.asObservable();

  private myPermissions: ModulePerm[] = [];
  private isUnrestricted = false;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<{ token: string; refreshToken?: string; user: CurrentUser }> {
    return this.http.post<{ token: string; refreshToken?: string; user: CurrentUser }>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(result => {
        this.setSession(result.token, result.user, result.refreshToken);
        this.loadMyPermissions();
      })
    );
  }

  guestLogin(): Observable<{ token: string; refreshToken?: string; user: CurrentUser }> {
    return this.http.post<{ token: string; refreshToken?: string; user: CurrentUser }>(`${this.apiUrl}/guest`, {}).pipe(
      tap(result => {
        this.setSession(result.token, result.user, result.refreshToken);
        this.loadMyPermissions();
      })
    );
  }

  loadMyPermissions(): void {
    this.http.get<{ role: string; isUnrestricted: boolean; permissions: ModulePerm[] }>(
      `${environment.apiUrl}/api/permissions/my-permissions`
    ).subscribe({
      next: res => {
        this.isUnrestricted = res.isUnrestricted;
        this.myPermissions = res.permissions ?? [];
      },
      error: () => {
        this.isUnrestricted = false;
        this.myPermissions = [];
      }
    });
  }

  hasPermission(moduleKey: string, action: 'read' | 'write' | 'delete' = 'read'): boolean {
    if (this.isUnrestricted) return true;
    const perm = this.myPermissions.find(p => p.moduleKey === moduleKey);
    if (!perm) return false;
    if (action === 'read') return perm.canRead;
    if (action === 'write') return perm.canWrite;
    return perm.canDelete;
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
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
      this.http.post(`${this.apiUrl}/logout`, { refreshToken }).subscribe({ error: () => {} });
    }
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('refresh_token');
    this.myPermissions = [];
    this.isUnrestricted = false;
    this.currentUserSubject.next(null);
  }

  private setSession(token: string, user: CurrentUser, refreshToken?: string): void {
    localStorage.setItem('authToken', token);
    localStorage.setItem('currentUser', JSON.stringify(user));
    if (refreshToken) localStorage.setItem('refresh_token', refreshToken);
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
