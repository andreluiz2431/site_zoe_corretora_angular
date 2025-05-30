import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { RoleService } from '../services/role.service';
import { RoleType } from '../models/role.types';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private roleService: RoleService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.user$.pipe(
      take(1),
      map(user => {
        if (!user) {
          this.router.navigate(['/login'], {
            queryParams: { returnUrl: state.url }
          });
          return false;
        }

        // Verifica se a rota requer roles específicas
        const requiredRoles = route.data['roles'] as RoleType[];
        if (requiredRoles && requiredRoles.length > 0) {
          const hasRequiredRole = requiredRoles.some(role => 
            this.roleService.hasRole(user, role)
          );

          if (!hasRequiredRole) {
            // Redireciona para página de acesso negado ou home
            this.router.navigate(['/acesso-negado']);
            return false;
          }
        }

        return true;
      })
    );
  }
}