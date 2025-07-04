import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-slides-socialmedias',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slides.socialmedias.component.html',
  styleUrls: ['./slides.socialmedias.component.css']
})
export class SlidesSocialmediasComponent {
  currentSlide = 0;
  slides = [0, 1, 2];
  autoSlideInterval: any;
  hideNavFooter = false;

  constructor() {
    this.startAutoSlide();
  }

  prevSlide() {
    this.currentSlide = this.currentSlide === 0 ? this.slides.length - 1 : this.currentSlide - 1;
    this.resetAutoSlide();
  }

  nextSlide() {
    this.currentSlide = this.currentSlide === this.slides.length - 1 ? 0 : this.currentSlide + 1;
    this.resetAutoSlide();
  }

  goToSlide(index: number) {
    this.currentSlide = index;
    this.resetAutoSlide();
  }

  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => this.nextSlide(), 5000);
  }

  resetAutoSlide() {
    clearInterval(this.autoSlideInterval);
    this.startAutoSlide();
  }

  ngOnDestroy() {
    clearInterval(this.autoSlideInterval);
  }

  toggleHide() {
    this.hideNavFooter = !this.hideNavFooter;
    // Esconde/exibe o footer global
    const footer = document.querySelector('app-footer, .site-footer');
    if (footer) {
      (footer as HTMLElement).style.display = this.hideNavFooter ? 'none' : '';
    }
    // Esconde/exibe a navbar global
    const navbar = document.querySelector('app-header, .site-header');
    if (navbar) {
      (navbar as HTMLElement).style.display = this.hideNavFooter ? 'none' : '';
    }
  }
}
