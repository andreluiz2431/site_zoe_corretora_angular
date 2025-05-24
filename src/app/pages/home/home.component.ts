import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeroBannerComponent } from '../../shared/components/hero-banner/hero-banner.component';
import { FeatureCardComponent } from '../../shared/components/feature-card/feature-card.component';
import { TestimonialComponent } from '../../shared/components/testimonial/testimonial.component';
import { QuickQuoteComponent } from '../../shared/components/quick-quote/quick-quote.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    FormsModule,
    HeroBannerComponent,
    FeatureCardComponent,
    TestimonialComponent,
    QuickQuoteComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  insuranceTypes = [
    {
      title: 'Seguro Auto',
      description: 'Proteção completa para seu veículo contra roubo, furto, colisão e muito mais.',
      icon: '🚗',
      link: '/cotacao?tipo=auto'
    },
    {
      title: 'Seguro Residencial',
      description: 'Proteja seu lar contra incêndio, roubo, danos elétricos e responsabilidade civil.',
      icon: '🏠',
      link: '/cotacao?tipo=residencial'
    },
    {
      title: 'Seguro de Vida',
      description: 'Garanta a segurança financeira da sua família em qualquer eventualidade.',
      icon: '❤️',
      link: '/cotacao?tipo=vida'
    },
    {
      title: 'Seguro Empresarial',
      description: 'Soluções completas para proteger seu negócio e patrimônio empresarial.',
      icon: '🏢',
      link: '/cotacao?tipo=empresarial'
    }
  ];
  
  consortiumTypes = [
    {
      title: 'Consórcio Imobiliário',
      description: 'Realize o sonho da casa própria com parcelas que cabem no seu orçamento.',
      icon: '🏡',
      link: '/consorcios?tipo=imobiliario'
    },
    {
      title: 'Consórcio de Veículos',
      description: 'Adquira seu carro, moto ou caminhão sem juros e com parcelas acessíveis.',
      icon: '🚘',
      link: '/consorcios?tipo=veiculos'
    },
    {
      title: 'Consórcio Empresarial',
      description: 'Expanda seu negócio sem comprometer o fluxo de caixa da sua empresa.',
      icon: '📈',
      link: '/consorcios?tipo=empresarial'
    }
  ];
  
  testimonials = [
    {
      name: 'João Silva',
      photo: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      text: 'Economizei mais de 30% no seguro do meu carro graças à consultoria especializada da Seguro & Consórcio. Recomendo a todos!',
      role: 'Cliente de Seguro Auto'
    },
    {
      name: 'Maria Oliveira',
      photo: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      text: 'Consegui realizar o sonho da casa própria através do consórcio. O processo foi muito mais simples do que eu imaginava.',
      role: 'Cliente de Consórcio Imobiliário'
    },
    {
      name: 'Carlos Santos',
      photo: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      text: 'O atendimento personalizado fez toda a diferença. Encontraram a solução perfeita para as necessidades da minha empresa.',
      role: 'Cliente de Seguro Empresarial'
    }
  ];
}