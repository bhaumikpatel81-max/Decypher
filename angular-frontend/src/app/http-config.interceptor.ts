import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, timer, BehaviorSubject, EMPTY } from 'rxjs';
import { catchError, filter, switchMap, take, mergeMap } from 'rxjs/operators';
import { retryWhen } from 'rxjs/operators';
import { AuthService } from './services/auth.service';
import { environment } from '../environments/environment';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshDone$ = new BehaviorSubject<boolean>(false);

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.getToken();
    if (token) {
      request = this.addBearer(request, token);
    }

    if (!request.headers.has('Content-Type') && !(request.body instanceof FormData)) {
      request = request.clone({ setHeaders: { 'Content-Type': 'application/json' } });
    }

    const isAuthRequest = request.url.includes('/api/auth') || request.url.includes('/api/platform/auth');

    return next.handle(request).pipe(
      retryWhen(errors =>
        errors.pipe(
          mergeMap((error, index) => {
            const isRetryable = !isAuthRequest &&
              ((error.status >= 500 && error.status < 600) || error.status === 0) &&
              index < 3;
            if (isRetryable) return timer(Math.pow(2, index) * 1000);
            return throwError(() => error);
          })
        )
      ),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && !isAuthRequest) {
          return this.handle401(request, next);
        }
        return throwError(() => error);
      })
    );
  }

  private handle401(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      this.authService.logout();
      return EMPTY;
    }

    if (this.isRefreshing) {
      // Queue until refresh completes
      return this.refreshDone$.pipe(
        filter(done => done),
        take(1),
        switchMap(() => {
          const newToken = this.authService.getToken();
          return newToken ? next.handle(this.addBearer(request, newToken)) : EMPTY;
        })
      );
    }

    this.isRefreshing = true;
    this.refreshDone$.next(false);

    return new Observable(observer => {
      fetch(`${environment.apiUrl}/api/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken })
      })
        .then(r => r.ok ? r.json() : Promise.reject(r))
        .then((data: any) => {
          localStorage.setItem('authToken', data.token);
          if (data.refreshToken) localStorage.setItem('refresh_token', data.refreshToken);
          this.isRefreshing = false;
          this.refreshDone$.next(true);
          next.handle(this.addBearer(request, data.token)).subscribe({
            next: v => observer.next(v),
            error: e => observer.error(e),
            complete: () => observer.complete()
          });
        })
        .catch(() => {
          this.isRefreshing = false;
          this.authService.logout();
          observer.complete();
        });
    });
  }

  private addBearer(req: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
    return req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }
}
