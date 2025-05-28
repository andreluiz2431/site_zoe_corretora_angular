import { Component } from '@angular/core';
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

  constructor(
    private authService: AuthService,
    private themeService: ThemeService
  ) {
    this.authService.currentUser$.subscribe(user => {
      this.isLoggedIn = !!user;
    });

    this.themeService.currentTheme$.subscribe(theme => {
      this.isDarkTheme = theme === 'dark';
    });
  }

  toggleTheme(): void {
    this.isRotating = true;
    setTimeout(() => {
      this.isRotating = false;
    }, 500);
    this.themeService.toggleTheme();
  }
} 