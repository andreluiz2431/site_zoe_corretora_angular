import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroBannerComponent } from '../../shared/components/hero-banner/hero-banner.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, HeroBannerComponent],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  milestones = [
    {
      year: '2005',
      title: 'Fundação',
      description: 'Início das operações focadas exclusivamente em seguros de automóveis.'
    },
    {
      year: '2008',
      title: 'Expansão',
      description: 'Ampliação da atuação para incluir seguros residenciais e de vida.'
    },
    {
      year: '2012',
      title: 'Incorporação de Consórcios',
      description: 'Início da oferta de consórcios de veículos e imóveis.'
    },
    {
      year: '2015',
      title: 'Prêmio Excelência',
      description: 'Reconhecimento como uma das melhores corretoras de seguros do país.'
    },
    {
      year: '2018',
      title: 'Transformação Digital',
      description: 'Implementação de plataforma online para cotações e atendimento digital.'
    },
    {
      year: '2022',
      title: 'Expansão Nacional',
      description: 'Abertura de novos escritórios em capitais estratégicas do Brasil.'
    }
  ];
  
  partners = [
    {
      name: 'Seguradora Alfa',
      logo: 'https://via.placeholder.com/150x80?text=Logo+1'
    },
    {
      name: 'Consórcios Beta',
      logo: 'https://via.placeholder.com/150x80?text=Logo+2'
    },
    {
      name: 'Proteção Total',
      logo: 'https://via.placeholder.com/150x80?text=Logo+3'
    },
    {
      name: 'Seguros Premium',
      logo: 'https://via.placeholder.com/150x80?text=Logo+4'
    },
    {
      name: 'Consórcios Elite',
      logo: 'https://via.placeholder.com/150x80?text=Logo+5'
    },
    {
      name: 'Segurança Máxima',
      logo: 'https://via.placeholder.com/150x80?text=Logo+6'
    }
  ];
}