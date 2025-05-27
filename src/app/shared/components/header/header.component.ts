import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ThemeService } from '../../../core/services/theme.service';
import { AuthService } from '../../../core/services/auth.service';

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
  private scrollListener: any;

  constructor(
    private themeService: ThemeService,
    private authService: AuthService
  ) {
    this.themeService.currentTheme$.subscribe(theme => {
      this.isDarkTheme = theme === 'dark';
    });
    
    this.authService.currentUser$.subscribe(user => {
      this.isLoggedIn = !!user;
    });
  }

  ngOnInit() {
    // Fecha o menu ao rolar a página
    this.scrollListener = this.onWindowScroll.bind(this);
    window.addEventListener('scroll', this.scrollListener);

    // Fecha o menu ao clicar fora
    document.addEventListener('click', (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.site-header')) {
        this.closeMenu();
      }
    });
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scrollListener);
  }

  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth > 768) {
      this.closeMenu();
    }
  }

  private onWindowScroll() {
    if (window.scrollY > 50) {
      this.closeMenu();
    }
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  async logout(): Promise<void> {
    await this.authService.logout();
    this.closeMenu();
  }
}