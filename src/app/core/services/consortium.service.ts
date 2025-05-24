import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Consortium } from '../models/consortium.model';

@Injectable({
  providedIn: 'root'
})
export class ConsortiumService {
  getConsortiumOptions(): Observable<Consortium[]> {
    // This is mock data - would be replaced with API call
    return of([
      {
        id: '1',
        title: 'Consórcio Imobiliário',
        description: 'Realize o sonho da casa própria com parcelas que cabem no seu bolso.',
        minValue: 100000,
        maxValue: 1000000,
        minTerm: 60,
        maxTerm: 200,
        image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        benefits: [
          'Parcelas menores que financiamento',
          'Sem juros, apenas taxa de administração',
          'Use o FGTS para pagar parcelas',
          'Escolha o imóvel após contemplação'
        ]
      },
      {
        id: '2',
        title: 'Consórcio de Veículos',
        description: 'Seu carro novo com parcelas que cabem no orçamento.',
        minValue: 30000,
        maxValue: 300000,
        minTerm: 24,
        maxTerm: 80,
        image: 'https://images.pexels.com/photos/1383834/pexels-photo-1383834.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        benefits: [
          'Parcelas até 50% menores que financiamento',
          'Sem entrada, sem juros',
          'Contemplação por sorteio ou lance',
          'Mais de 70% de chance de contemplação nos primeiros 12 meses'
        ]
      },
      {
        id: '3',
        title: 'Consórcio Empresarial',
        description: 'Expanda seu negócio sem comprometer o fluxo de caixa.',
        minValue: 50000,
        maxValue: 5000000,
        minTerm: 36,
        maxTerm: 150,
        image: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        benefits: [
          'Planejamento financeiro empresarial',
          'Capital para expansão sem endividamento',
          'Taxas administrativas reduzidas',
          'Possibilidade de utilizar em imóveis, veículos ou maquinário'
        ]
      }
    ]);
  }
  
  requestConsortiumInfo(consortiumId: string, contactInfo: any): Observable<boolean> {
    // This is a mock implementation - would be replaced with API call
    console.log('Consortium info requested:', consortiumId, contactInfo);
    return of(true);
  }
}