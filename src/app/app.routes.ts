import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) 
  },
  { 
    path: 'sobre', 
    loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent) 
  },
  { 
    path: 'colaboradores', 
    loadComponent: () => import('./pages/team/team.component').then(m => m.TeamComponent) 
  },
  { 
    path: 'cotacao', 
    loadComponent: () => import('./pages/quote/quote.component').then(m => m.QuoteComponent),
    canActivate: [AuthGuard],
    data: { roles: ['CLIENTE', 'CORRETOR', 'ADMIN', 'SUPER_ADMIN'] }
  },
  { 
    path: 'consorcios', 
    loadComponent: () => import('./pages/consortium/consortium.component').then(m => m.ConsortiumComponent) 
  },
  { 
    path: 'cliente', 
    loadComponent: () => import('./pages/client-area/client-area.component').then(m => m.ClientAreaComponent),
    canActivate: [AuthGuard],
    data: { roles: ['CLIENTE', 'ADMIN', 'SUPER_ADMIN'] }
  },
  { 
    path: 'admin', 
    loadComponent: () => import('./pages/admin/admin.component').then(m => m.AdminComponent),
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN', 'SUPER_ADMIN'] }
  },
  { 
    path: 'login', 
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) 
  },
  { 
    path: 'acesso-negado', 
    loadComponent: () => import('./pages/acesso-negado').then(m => m.AcessoNegadoComponent) 
  },
  {
    path: 'admin/usuarios',
    loadComponent: () => import('./pages/admin/users/user-management.component').then(m => m.UserManagementComponent),
    canActivate: [AuthGuard],
    data: { roles: ['SUPER_ADMIN', 'ADMIN'] }
  },
  { 
    path: '**', 
    loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent) 
  }
];