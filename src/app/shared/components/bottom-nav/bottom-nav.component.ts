import { Component, ElementRef, HostListener, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ThemeService } from '../../../core/services/theme.service';
import { RoleService } from '../../../core/services/role.service';
import { User } from '../../../core/models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bottom-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.css']
})
export class BottomNavComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  isDarkTheme = false;
  isRotating = false;
  isProfileMenuOpen = false;
  private authSubscription?: Subscription;
  currentUser: User | null = null;

  constructor(
    private authService: AuthService,
    private themeService: ThemeService,
    private elementRef: ElementRef,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.user$.subscribe((user: User | null) => {
      this.isLoggedIn = !!user;
      this.currentUser = user;
    });

    this.themeService.currentTheme$.subscribe(theme => {
      this.isDarkTheme = theme === 'dark';
    });
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    // Verifica se o clique foi fora do componente
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.closeProfileMenu();
    }
  }

  toggleTheme(): void {
    this.isRotating = true;
    setTimeout(() => {
      this.isRotating = false;
    }, 500);
    this.themeService.toggleTheme();
  }

  toggleProfileMenu(event: Event): void {
    event.stopPropagation(); // Impede que o clique se propague para o document
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  closeProfileMenu(): void {
    this.isProfileMenuOpen = false;
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.closeProfileMenu();
      },
      error: (error) => {
        console.error('Erro ao fazer logout:', error);
      }
    });
  }

  onNavigationClick(): void {
    this.closeProfileMenu();
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

  getAreaLink(): { text: string; route: string } {
    if (!this.currentUser) {
      return { text: 'Área do Cliente', route: '/cliente' };
    }

    if (this.roleService.hasRole(this.currentUser, 'SUPER_ADMIN') || 
        this.roleService.hasRole(this.currentUser, 'ADMIN')) {
      return { text: 'Área Administrativa', route: '/admin' };
    }

    return { text: 'Área do Cliente', route: '/cliente' };
  }
} 