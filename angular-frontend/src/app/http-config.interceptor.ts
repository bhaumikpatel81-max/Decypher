import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, timer } from 'rxjs';
import { catchError, retry, retryWhen, mergeMap } from 'rxjs/operators';
import { AuthService } from './services/auth.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Add auth token if available
    const token = this.authService.getToken();
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    // Add Content-Type for JSON requests only — skip FormData so the browser
    // can auto-set multipart/form-data with the correct boundary.
    if (!request.headers.has('Content-Type') && !(request.body instanceof FormData)) {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json'
        }
      });
    }

    // Never retry auth requests — fail immediately so the UI shows feedback right away
    const isAuthRequest = request.url.includes('/api/auth');

    return next.handle(request).pipe(
      retryWhen(errors =>
        errors.pipe(
          mergeMap((error, index) => {
            const isRetryable = !isAuthRequest &&
              ((error.status >= 500 && error.status < 600) || error.status === 0) &&
              index < 3;
            if (isRetryable) {
              const delayMs = Math.pow(2, index) * 1000;
              console.warn(`Retrying request (attempt ${index + 1}): ${request.url}`, { delayMs });
              return timer(delayMs);
            }
            return throwError(() => error);
          })
        )
      ),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Only logout when the token is absent or genuinely expired.
          // A 401 from a backend logic failure (e.g. user record not found) should not
          // destroy the session — the user would be trapped in a logout loop.
          if (this.isTokenMissingOrExpired()) {
            this.authService.logout();
          }
        }
        console.error('HTTP Error:', { status: error.status, message: error.message, url: error.url });
        return throwError(() => error);
      })
    );
  }

  private isTokenMissingOrExpired(): boolean {
    const token = this.authService.getToken();
    if (!token) return true;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp ? (Date.now() / 1000 >= payload.exp) : true;
    } catch {
      return true;
    }
  }
}
