import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ThemeService } from '../../../core/services/theme.service';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { User } from '../../../core/models/user.model';
import { RoleService } from '../../../core/services/role.service';
import { RoleType } from '../../../core/models/role.types';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isMenuOpen = false;
  isDarkTheme = false;
  isLoggedIn = false;
  isRotating = false;
  isTransparent = false;
  hasBanner = false;
  currentUser: User | null = null;

  // Rotas que contêm banner
  private routesWithBanner = ['/', '/sobre', '/colaboradores', '/consorcios'];
  private subscriptions: Subscription[] = [];

  constructor(
    private authService: AuthService,
    private themeService: ThemeService,
    private router: Router,
    private roleService: RoleService
  ) {
    this.subscriptions.push(
      this.authService.user$.subscribe((user: User | null) => {
        this.isLoggedIn = !!user;
        this.currentUser = user;
      }),

      this.themeService.currentTheme$.subscribe(theme => {
        this.isDarkTheme = theme === 'dark';
      }),

      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(() => {
        this.checkIfPageHasBanner();
        this.checkHeaderTransparency();
      })
    );
  }

  ngOnInit() {
    this.checkIfPageHasBanner();
    this.checkHeaderTransparency();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private checkIfPageHasBanner() {
    this.hasBanner = this.routesWithBanner.includes(this.router.url);
  }

  @HostListener('window:scroll')
  checkHeaderTransparency() {
    if (!this.hasBanner) {
      this.isTransparent = false;
      return;
    }

    const bannerHeight = 600; // Altura do banner em pixels
    const scrollPosition = window.scrollY;
    this.isTransparent = scrollPosition < bannerHeight;
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  toggleTheme(): void {
    this.isRotating = true;
    setTimeout(() => {
      this.isRotating = false;
    }, 500);
    this.themeService.toggleTheme();
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.closeMenu();
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Erro ao fazer logout:', error);
      }
    });
  }

  getUserRoleInfo(): { icon: string; color: string; label: string } {
    if (!this.currentUser) {
      return { icon: '', color: '', label: '' };
    }

    if (this.roleService.hasRole(this.currentUser, 'SUPER_ADMIN')) {
      return { icon: 'security', color: '#FF4081', label: 'Super Admin' };
    }
    if (this.roleService.hasRole(this.currentUser, 'ADMIN')) {
      return { icon: 'admin_panel_settings', color: '#7C4DFF', label: 'Admin' };
    }
    if (this.roleService.hasRole(this.currentUser, 'CORRETOR')) {
      return { icon: 'business_center', color: '#00BCD4', label: 'Corretor' };
    }
    return { icon: 'person', color: '#4CAF50', label: 'Cliente' };
  }
}