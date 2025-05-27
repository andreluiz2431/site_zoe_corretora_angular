import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface BannerSlide {
  imageUrl: string;
  title: string;
  subtitle: string;
  ctaText?: string;
  ctaLink?: string;
}

@Component({
  selector: 'app-hero-banner',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './hero-banner.component.html',
  styleUrls: ['./hero-banner.component.css']
})
export class HeroBannerComponent implements OnInit, OnDestroy {
  currentSlide = 0;
  private intervalId: any;

  slides: BannerSlide[] = [
    {
      imageUrl: '../../../../assets/images/banner/seguros.png',
      title: 'Seguros para Todos os Momentos',
      subtitle: 'Proteja o que importa com as melhores coberturas do mercado',
      ctaText: 'Fazer Cotação',
      ctaLink: '/cotacao'
    },
    {
      imageUrl: 'assets/images/banner/consorcio.png',
      title: 'Consórcio que Cabe no seu Bolso',
      subtitle: 'Realize seus sonhos com parcelas que cabem no seu orçamento',
      ctaText: 'Simular Agora',
      ctaLink: '/consorcio'
    },
    {
      imageUrl: 'assets/images/banner/familia.png',
      title: 'Proteção para sua Família',
      subtitle: 'Seguros personalizados para garantir o futuro de quem você ama',
      ctaText: 'Saiba Mais',
      ctaLink: '/sobre'
    }
  ];

  ngOnInit() {
    this.startSlideshow();
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  startSlideshow() {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 5000); // Troca de slide a cada 5 segundos
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  previousSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }

  pauseSlideshow() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  resumeSlideshow() {
    this.startSlideshow();
  }
}