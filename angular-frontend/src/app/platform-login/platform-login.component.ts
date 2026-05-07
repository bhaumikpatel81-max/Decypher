import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-platform-login',
  template: `
    <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;background:var(--bg,#0f0f14);">
      <div style="width:380px;background:var(--surface,#1a1a24);border:1px solid var(--border,#2a2a3a);border-radius:16px;padding:40px;">
        <div style="text-align:center;margin-bottom:32px;">
          <div style="font-size:32px;margin-bottom:8px;">🔐</div>
          <h2 style="margin:0;font-size:20px;font-weight:700;">Platform Admin</h2>
          <p style="margin:8px 0 0;font-size:13px;color:var(--text-3,#888);">Decypher Super Admin Console</p>
        </div>

        <div *ngIf="error" style="background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.3);color:#ef4444;border-radius:8px;padding:10px 14px;font-size:13px;margin-bottom:16px;">
          {{error}}
        </div>

        <div style="display:flex;flex-direction:column;gap:14px;">
          <input class="input" type="email" placeholder="Super admin email" [(ngModel)]="email" (keyup.enter)="login()">
          <input class="input" type="password" placeholder="Password" [(ngModel)]="password" (keyup.enter)="login()">
          <button class="btn btn-primary" [disabled]="loading" (click)="login()" style="width:100%;">
            {{loading ? 'Signing in…' : 'Sign in to Platform Console'}}
          </button>
        </div>

        <p style="text-align:center;margin-top:24px;font-size:12px;color:var(--text-3,#666);">
          Not a platform admin? <a routerLink="/" style="color:var(--brand-violet-400,#8b5cf6);">Go to tenant login</a>
        </p>
      </div>
    </div>
  `
})
export class PlatformLoginComponent {
  email = '';
  password = '';
  loading = false;
  error = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    if (!this.email || !this.password) { this.error = 'Email and password required.'; return; }
    this.loading = true; this.error = '';
    this.http.post<any>(`${environment.apiUrl}/api/platform/auth/login`, { email: this.email, password: this.password })
      .subscribe({
        next: res => {
          localStorage.setItem('platform_token', res.token);
          localStorage.setItem('platform_user', JSON.stringify(res.user));
          this.router.navigate(['/platform']);
        },
        error: err => {
          this.error = err.error?.error ?? 'Login failed.';
          this.loading = false;
        }
      });
  }
}
