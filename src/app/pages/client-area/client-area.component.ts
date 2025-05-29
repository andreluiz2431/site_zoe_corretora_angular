import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../core/models/user.model';
import { BaseModalComponent } from '../../shared/components/modals/base-modal/base-modal.component';
import { ListModalComponent } from '../../shared/components/modals/list-modal/list-modal.component';
import { DetailModalComponent } from '../../shared/components/modals/detail-modal/detail-modal.component';
import { Subscription } from 'rxjs';

interface Policy {
  id: string;
  type: string;
  startDate: string;
  endDate: string;
  premium: number;
  status: string;
}

interface Quote {
  id: string;
  date: string;
  type: string;
  status: string;
  details: string;
}

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  date: string;
}

@Component({
  selector: 'app-client-area',
  standalone: true,
  imports: [
    CommonModule,
    BaseModalComponent,
    ListModalComponent,
    DetailModalComponent
  ],
  templateUrl: './client-area.component.html',
  styleUrls: ['./client-area.component.css']
})
export class ClientAreaComponent implements OnInit, OnDestroy {
  // Modal states
  showPoliciesModal = false;
  showQuotesModal = false;
  showDocumentsModal = false;
  showPolicyDetailsModal = false;
  showQuoteDetailsModal = false;

  // Selected items for details
  selectedPolicy?: Policy;
  selectedQuote?: Quote;

  user: User | null = null;
  private userSubscription?: Subscription;
  
  // Mock data for quotes and policies
  quotes: Quote[] = [
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
  
  policies: Policy[] = [
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
  
  documents: Document[] = [
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
    this.userSubscription = this.authService.currentUser$.subscribe(
      user => this.user = user
    );
  }

  ngOnInit(): void {
    this.resetModalStates();
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  // Reset all modal states
  private resetModalStates(): void {
    this.showPoliciesModal = false;
    this.showQuotesModal = false;
    this.showDocumentsModal = false;
    this.showPolicyDetailsModal = false;
    this.showQuoteDetailsModal = false;
    this.selectedPolicy = undefined;
    this.selectedQuote = undefined;
  }

  // Modal open handlers
  openPoliciesModal(): void {
    this.showPoliciesModal = true;
  }

  openQuotesModal(): void {
    this.showQuotesModal = true;
  }

  openDocumentsModal(): void {
    this.showDocumentsModal = true;
  }

  openPolicyDetails(policy: Policy): void {
    this.selectedPolicy = policy;
    this.showPolicyDetailsModal = true;
  }

  openQuoteDetails(quote: Quote): void {
    this.selectedQuote = quote;
    this.showQuoteDetailsModal = true;
  }

  // Modal close handlers
  onClosePoliciesModal(): void {
    this.showPoliciesModal = false;
  }

  onCloseQuotesModal(): void {
    this.showQuotesModal = false;
  }

  onCloseDocumentsModal(): void {
    this.showDocumentsModal = false;
  }

  onClosePolicyDetailsModal(): void {
    this.showPolicyDetailsModal = false;
    this.selectedPolicy = undefined;
  }

  onCloseQuoteDetailsModal(): void {
    this.showQuoteDetailsModal = false;
    this.selectedQuote = undefined;
  }

  // Search and pagination handlers
  onSearch(term: string): void {
    console.log('Searching for:', term);
    // Implementar lógica de busca
  }

  onPageChange(page: number): void {
    console.log('Page changed to:', page);
    // Implementar lógica de paginação
  }

  // Document actions
  downloadDocument(doc: Document): void {
    console.log('Downloading document:', doc.name);
    // Implementar lógica de download
  }
}