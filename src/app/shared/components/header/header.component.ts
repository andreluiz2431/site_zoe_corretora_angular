import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { ThemeService } from '../../../core/services/theme.service';
import { AuthService } from '../../../core/services/auth.service';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

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

  // Rotas que contêm banner
  private routesWithBanner = ['/', '/sobre', '/colaboradores', '/consorcios'];
  private subscriptions: Subscription[] = [];

  constructor(
    private themeService: ThemeService,
    private authService: AuthService,
    private router: Router
  ) {
    this.subscriptions.push(
      this.themeService.currentTheme$.subscribe(theme => {
        this.isDarkTheme = theme === 'dark';
      }),
      
      this.authService.currentUser$.subscribe(user => {
        this.isLoggedIn = !!user;
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

  async logout(): Promise<void> {
    await this.authService.logout();
    this.closeMenu();
  }
}