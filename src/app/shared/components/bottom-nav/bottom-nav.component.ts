import { Component, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-bottom-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.css']
})
export class BottomNavComponent {
  isLoggedIn = false;
  isDarkTheme = false;
  isRotating = false;
  isProfileMenuOpen = false;

  constructor(
    private authService: AuthService,
    private themeService: ThemeService,
    private elementRef: ElementRef
  ) {
    this.authService.currentUser$.subscribe(user => {
      this.isLoggedIn = !!user;
    });

    this.themeService.currentTheme$.subscribe(theme => {
      this.isDarkTheme = theme === 'dark';
    });
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

  async logout(): Promise<void> {
    await this.authService.logout();
    this.closeProfileMenu();
  }

  onNavigationClick(): void {
    this.closeProfileMenu();
  }
} 