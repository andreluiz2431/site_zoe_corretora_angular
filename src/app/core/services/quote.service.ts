import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { QuoteRequest } from '../models/quote-request.model';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  submitQuoteRequest(quoteRequest: QuoteRequest): Observable<boolean> {
    // This is a mock implementation
    // In a real app, this would make an HTTP request to a backend service
    console.log('Quote request submitted:', quoteRequest);
    
    // Simulate a successful submission after a delay
    return of(true);
  }
  
  getInsuranceTypes(): Observable<string[]> {
    // Mock data - would come from an API in production
    return of([
      'Auto',
      'Residencial',
      'Vida',
      'Empresarial',
      'Viagem',
      'Saúde'
    ]);
  }
}