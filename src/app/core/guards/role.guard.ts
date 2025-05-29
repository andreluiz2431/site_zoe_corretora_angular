import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, take } from 'rxjs/operators';

export const roleGuard = (allowedRoles: string[]): CanActivateFn => {
  return (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.currentUser$.pipe(
      take(1),
      map(user => {
        if (!user) {
          // Usuário não está autenticado
          const returnUrl = state.url;
          return router.createUrlTree(['/login'], { queryParams: { returnUrl } });
        }

        // Verifica se o usuário tem pelo menos uma das roles permitidas
        const hasRequiredRole = allowedRoles.some(role => user.roles.includes(role));
        
        if (hasRequiredRole) {
          return true;
        }

        // Usuário não tem permissão - redireciona para página de acesso negado
        return router.createUrlTree(['/acesso-negado']);
      })
    );
  };
}; 