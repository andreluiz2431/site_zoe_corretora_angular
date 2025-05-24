import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { QuoteService } from '../../../core/services/quote.service';

@Component({
  selector: 'app-quick-quote',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './quick-quote.component.html',
  styleUrls: ['./quick-quote.component.css']
})
export class QuickQuoteComponent implements OnInit {
  insuranceTypes: string[] = [];
  selectedType: string = '';
  name: string = '';
  email: string = '';
  phone: string = '';
  submitted: boolean = false;

  constructor(private quoteService: QuoteService) {}

  ngOnInit(): void {
    this.quoteService.getInsuranceTypes().subscribe(types => {
      this.insuranceTypes = types;
      if (types.length > 0) {
        this.selectedType = types[0];
      }
    });
  }

  onSubmit(): void {
    if (this.name && this.email && this.phone && this.selectedType) {
      // In a real app, this would submit to a service
      console.log('Quick quote submitted:', {
        name: this.name,
        email: this.email,
        phone: this.phone,
        insuranceType: this.selectedType
      });
      
      this.submitted = true;
      
      // Reset form after delay
      setTimeout(() => {
        this.resetForm();
      }, 3000);
    }
  }
  
  resetForm(): void {
    this.name = '';
    this.email = '';
    this.phone = '';
    if (this.insuranceTypes.length > 0) {
      this.selectedType = this.insuranceTypes[0];
    } else {
      this.selectedType = '';
    }
    this.submitted = false;
  }
}