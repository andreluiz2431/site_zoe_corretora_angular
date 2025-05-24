import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

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
    loadComponent: () => import('./pages/quote/quote.component').then(m => m.QuoteComponent) 
  },
  { 
    path: 'consorcios', 
    loadComponent: () => import('./pages/consortium/consortium.component').then(m => m.ConsortiumComponent) 
  },
  { 
    path: 'cliente', 
    loadComponent: () => import('./pages/client-area/client-area.component').then(m => m.ClientAreaComponent),
    canActivate: [authGuard]
  },
  { 
    path: 'login', 
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) 
  },
  { 
    path: '**', 
    loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent) 
  }
];