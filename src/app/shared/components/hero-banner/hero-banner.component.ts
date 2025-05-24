import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hero-banner',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './hero-banner.component.html',
  styleUrls: ['./hero-banner.component.css']
})
export class HeroBannerComponent {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() ctaText = '';
  @Input() ctaLink = '';
  @Input() imageUrl = '';
  @Input() secondaryCtaText = '';
  @Input() secondaryCtaLink = '';
}