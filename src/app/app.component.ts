import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { ThemeService } from './core/services/theme.service';
import { BottomNavComponent } from './shared/components/bottom-nav/bottom-nav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent, BottomNavComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isDarkTheme = false;

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.themeService.currentTheme$.subscribe(theme => {
      this.isDarkTheme = theme === 'dark';
    });
  }
}