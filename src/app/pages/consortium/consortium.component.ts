import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConsortiumService } from '../../core/services/consortium.service';
import { Consortium } from '../../core/models/consortium.model';
import { HeroBannerComponent } from '../../shared/components/hero-banner/hero-banner.component';

@Component({
  selector: 'app-consortium',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeroBannerComponent],
  templateUrl: './consortium.component.html',
  styleUrls: ['./consortium.component.css']
})
export class ConsortiumComponent implements OnInit {
  consortiumOptions: Consortium[] = [];
  infoRequestForm: FormGroup;
  selectedConsortium: Consortium | null = null;
  showForm = false;
  submitted = false;
  
  constructor(
    private consortiumService: ConsortiumService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.infoRequestForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      message: ['']
    });
  }
  
  ngOnInit(): void {
    this.loadConsortiumOptions();
    
    // Check if there's a consortium type in the URL
    this.route.queryParams.subscribe(params => {
      if (params['tipo']) {
        // Will be handled after loading the consortium options
        this.handleUrlParam(params['tipo']);
      }
    });
  }
  
  loadConsortiumOptions(): void {
    this.consortiumService.getConsortiumOptions().subscribe(options => {
      this.consortiumOptions = options;
      
      // Check for URL params after loading
      this.route.queryParams.subscribe(params => {
        if (params['tipo']) {
          this.handleUrlParam(params['tipo']);
        }
      });
    });
  }
  
  handleUrlParam(type: string): void {
    // Find consortium by type in the URL
    let typeMap: { [key: string]: string } = {
      'imobiliario': 'Consórcio Imobiliário',
      'veiculos': 'Consórcio de Veículos',
      'empresarial': 'Consórcio Empresarial'
    };
    
    const title = typeMap[type.toLowerCase()];
    if (title) {
      const foundOption = this.consortiumOptions.find(option => option.title === title);
      if (foundOption) {
        this.scrollToOption(foundOption);
      }
    }
  }
  
  scrollToOption(option: Consortium): void {
    setTimeout(() => {
      const element = document.getElementById(`consortium-${option.id}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  }
  
  requestInfo(consortium: Consortium): void {
    this.selectedConsortium = consortium;
    this.showForm = true;
    this.infoRequestForm.reset();
    
    // Scroll to form
    setTimeout(() => {
      const formElement = document.getElementById('info-request-form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }
  
  onSubmit(): void {
    if (this.infoRequestForm.valid && this.selectedConsortium) {
      const contactInfo = this.infoRequestForm.value;
      
      this.consortiumService.requestConsortiumInfo(this.selectedConsortium.id, contactInfo)
        .subscribe({
          next: () => {
            this.submitted = true;
          },
          error: (error) => {
            console.error('Error requesting consortium info', error);
          }
        });
    } else {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.infoRequestForm.controls).forEach(key => {
        const control = this.infoRequestForm.get(key);
        control?.markAsTouched();
      });
    }
  }
  
  resetForm(): void {
    this.infoRequestForm.reset();
    this.showForm = false;
    this.submitted = false;
    this.selectedConsortium = null;
  }
}