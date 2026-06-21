import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  private router = inject(Router);
  private authService = inject(AuthService);

  canActivate(route: ActivatedRouteSnapshot) {
    if (!this.authService.isAuthenticated()) {
      this.router.navigateByUrl('/login');
      return false;
    }

    const requiredRoles = route.data?.['roles'] as Array<'admin' | 'project_admin' | 'member'> | undefined;
    if (requiredRoles && !this.authService.hasAnyRole(requiredRoles)) {
      this.router.navigateByUrl('/');
      return false;
    }

    return true;
  }
}
