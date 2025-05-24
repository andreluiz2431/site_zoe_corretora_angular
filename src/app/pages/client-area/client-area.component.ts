import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-client-area',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client-area.component.html',
  styleUrls: ['./client-area.component.css']
})
export class ClientAreaComponent {
  user: User | null = null;
  
  // Mock data for quotes and policies
  quotes = [
    {
      id: '1001',
      date: '2023-05-15',
      type: 'Auto',
      status: 'Em análise',
      details: 'Seguro para Honda Civic 2020'
    },
    {
      id: '1002',
      date: '2023-06-02',
      type: 'Residencial',
      status: 'Aprovado',
      details: 'Seguro residencial para apartamento'
    }
  ];
  
  policies = [
    {
      id: 'A12345',
      type: 'Auto',
      startDate: '2023-01-10',
      endDate: '2024-01-10',
      premium: 1200,
      status: 'Ativo'
    },
    {
      id: 'R45678',
      type: 'Residencial',
      startDate: '2022-11-05',
      endDate: '2023-11-05',
      premium: 850,
      status: 'Ativo'
    }
  ];
  
  documents = [
    {
      id: 'DOC001',
      name: 'Apólice - Seguro Auto',
      type: 'PDF',
      size: '1.2 MB',
      date: '2023-01-15'
    },
    {
      id: 'DOC002',
      name: 'Contrato - Seguro Residencial',
      type: 'PDF',
      size: '0.8 MB',
      date: '2022-11-10'
    },
    {
      id: 'DOC003',
      name: 'Manual do Segurado',
      type: 'PDF',
      size: '2.5 MB',
      date: '2023-01-20'
    }
  ];
  
  constructor(private authService: AuthService) {
    this.user = this.authService.getCurrentUser();
  }
}