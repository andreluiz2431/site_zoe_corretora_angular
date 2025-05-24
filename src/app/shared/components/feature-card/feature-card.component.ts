import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-feature-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './feature-card.component.html',
  styleUrls: ['./feature-card.component.css']
})
export class FeatureCardComponent {
  @Input() title = '';
  @Input() description = '';
  @Input() icon = '';
  @Input() link = '';
  @Input() isGold = false;
}