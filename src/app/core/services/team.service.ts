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
        name: 'Adir Alexandre Bibiano',
        position: 'Diretor Executivo',
        bio: 'Com mais de X anos de experiência no mercado de seguros, Adir Alexandre nossa equipe com expertise e dedicação para garantir que nossos clientes recebam o melhor atendimento possível.',
        photoUrl: 'https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        specialties: ['Seguros Corporativos', 'Gestão de Riscos', 'Planejamento Estratégico']
      },
      {
        id: '2',
        name: 'Zoé Fernandes',
        position: 'Especialista em Seguros',
        bio: 'Carlos é nosso especialista em seguros, ajudando famílias a planejarem seu futuro com segurança e tranquilidade.',
        photoUrl: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        specialties: ['Seguros de Vida', 'Seguros de Auto', 'Seguros Empresariais']
      },
      {
        id: '3',
        name: 'Lidiane Nardon',
        position: 'Consultora de Seguros',
        bio: 'Lidiane nossa consultora de seguros, auxiliando nossos clientes a escolherem o seguro certo, alinhando suas necessidades e objetivos.',
        photoUrl: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        specialties: ['Seguros Auto', 'Proteção Veicular', 'Assistência 24h']
      },
      {
        id: '4',
        name: 'Daniele Garcia',
        position: 'Diretora de Marketing',
        bio: 'Daniele nossa diretora de marketing, formando um planejamento e execução de estratégias de marketing para aumentar a visibilidade e alcance das informações até os clientes.',
        photoUrl: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        specialties: ['Campanhas de Marketing', 'E-mail Marketing', 'Redes Sociais']
      }
    ]);
  }
}