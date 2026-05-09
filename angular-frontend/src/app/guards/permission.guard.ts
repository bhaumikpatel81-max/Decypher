import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class PermissionGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const user = this.auth.getCurrentUser();
    if (!user) { this.router.navigate(['/login']); return false; }

    const required = route.data?.['permission'] as string | undefined;
    if (!required) return true;

    const ok = this.auth.can(required);
    if (!ok) { this.router.navigate(['/dashboard']); return false; }
    return true;
  }
}
