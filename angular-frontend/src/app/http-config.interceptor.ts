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

    return next.handle(request).pipe(
      // Retry with exponential backoff for 5xx errors and timeouts
      retryWhen(errors =>
        errors.pipe(
          mergeMap((error, index) => {
            // Only retry on 5xx errors or timeouts (status 0)
            if ((error.status >= 500 && error.status < 600) || error.status === 0) {
              if (index < 3) {
                const delayMs = Math.pow(2, index) * 1000; // 1s, 2s, 4s
                console.warn(`Retrying request (attempt ${index + 1}): ${request.url}`, { delayMs });
                return timer(delayMs);
              }
            }
            return throwError(() => error);
          })
        )
      ),
      catchError((error: HttpErrorResponse) => {
        // Handle 401 - redirect to login
        if (error.status === 401) {
          this.authService.logout();
        }

        // Log error
        console.error('HTTP Error:', {
          status: error.status,
          message: error.message,
          url: error.url
        });

        return throwError(() => error);
      })
    );
  }
}
