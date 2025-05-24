import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TeamMember } from '../models/team-member.model';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  getTeamMembers(): Observable<TeamMember[]> {
    // This is mock data - would be replaced with API call
    return of([
      {
        id: '1',
        name: 'Ana Silva',
        position: 'Diretora Executiva',
        bio: 'Com mais de 20 anos de experiência no mercado de seguros, Ana lidera nossa equipe com expertise e dedicação para garantir que nossos clientes recebam o melhor atendimento possível.',
        photoUrl: 'https://images.pexels.com/photos/5952647/pexels-photo-5952647.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        specialties: ['Seguros Corporativos', 'Gestão de Riscos', 'Planejamento Estratégico']
      },
      {
        id: '2',
        name: 'Carlos Oliveira',
        position: 'Especialista em Seguros de Vida',
        bio: 'Carlos é nosso especialista em seguros de vida e previdência, ajudando famílias a planejarem seu futuro financeiro com segurança e tranquilidade.',
        photoUrl: 'https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        specialties: ['Seguros de Vida', 'Previdência Privada', 'Planejamento Sucessório']
      },
      {
        id: '3',
        name: 'Mariana Costa',
        position: 'Consultora de Seguros Auto',
        bio: 'Especializada em seguros para automóveis, Mariana encontra as melhores opções do mercado para garantir que seu veículo esteja protegido em qualquer situação.',
        photoUrl: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        specialties: ['Seguros Auto', 'Proteção Veicular', 'Assistência 24h']
      },
      {
        id: '4',
        name: 'Roberto Mendes',
        position: 'Especialista em Consórcios',
        bio: 'Roberto é nosso expert em consórcios, auxiliando clientes a realizarem seus sonhos de aquisição de bens sem os altos juros de financiamentos convencionais.',
        photoUrl: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        specialties: ['Consórcios Imobiliários', 'Consórcios de Veículos', 'Planejamento Financeiro']
      }
    ]);
  }
}