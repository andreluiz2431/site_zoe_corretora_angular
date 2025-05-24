import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { QuoteService } from '../../core/services/quote.service';

@Component({
  selector: 'app-quote',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']
})
export class QuoteComponent implements OnInit {
  quoteForm: FormGroup;
  insuranceTypes: string[] = [];
  submitted = false;
  loading = false;
  
  constructor(
    private fb: FormBuilder,
    private quoteService: QuoteService,
    private route: ActivatedRoute
  ) {
    this.quoteForm = this.fb.group({
      // Personal Information
      personalInfo: this.fb.group({
        name: ['', [Validators.required]],
        cpf: ['', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/)]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required]]
      }),
      
      // Address
      address: this.fb.group({
        street: ['', Validators.required],
        number: ['', Validators.required],
        complement: [''],
        neighborhood: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zipCode: ['', [Validators.required, Validators.pattern(/^\d{5}\-\d{3}$/)]]
      }),
      
      // Insurance Details
      insuranceDetails: this.fb.group({
        insuranceType: ['', Validators.required],
        insuredValue: [null],
        additionalInfo: ['']
      }),
      
      // Vehicle Details (conditional for auto insurance)
      vehicleDetails: this.fb.group({
        make: [''],
        model: [''],
        year: [null],
        licensePlate: ['']
      }),
      
      // Property Details (conditional for home insurance)
      propertyDetails: this.fb.group({
        propertyType: [''],
        constructionYear: [null],
        squareMeters: [null]
      })
    });
  }

  ngOnInit(): void {
    this.quoteService.getInsuranceTypes().subscribe(types => {
      this.insuranceTypes = types;
      
      // Check if there's a type parameter in the URL
      this.route.queryParams.subscribe(params => {
        if (params['tipo']) {
          const tipo = this.capitalizeFirstLetter(params['tipo']);
          // If the type exists in our list, select it
          if (this.insuranceTypes.includes(tipo)) {
            this.quoteForm.get('insuranceDetails.insuranceType')?.setValue(tipo);
            this.updateFormValidation(tipo);
          }
        }
      });
    });
    
    // Listen for insurance type changes to update form validation
    this.quoteForm.get('insuranceDetails.insuranceType')?.valueChanges.subscribe(
      value => this.updateFormValidation(value)
    );
  }
  
  capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }
  
  updateFormValidation(insuranceType: string): void {
    const vehicleDetailsGroup = this.quoteForm.get('vehicleDetails');
    const propertyDetailsGroup = this.quoteForm.get('propertyDetails');
    
    // Reset validations
    vehicleDetailsGroup?.get('make')?.clearValidators();
    vehicleDetailsGroup?.get('model')?.clearValidators();
    vehicleDetailsGroup?.get('year')?.clearValidators();
    
    propertyDetailsGroup?.get('propertyType')?.clearValidators();
    propertyDetailsGroup?.get('constructionYear')?.clearValidators();
    propertyDetailsGroup?.get('squareMeters')?.clearValidators();
    
    // Apply validations based on insurance type
    if (insuranceType === 'Auto') {
      vehicleDetailsGroup?.get('make')?.setValidators([Validators.required]);
      vehicleDetailsGroup?.get('model')?.setValidators([Validators.required]);
      vehicleDetailsGroup?.get('year')?.setValidators([Validators.required]);
    } else if (insuranceType === 'Residencial') {
      propertyDetailsGroup?.get('propertyType')?.setValidators([Validators.required]);
      propertyDetailsGroup?.get('constructionYear')?.setValidators([Validators.required]);
      propertyDetailsGroup?.get('squareMeters')?.setValidators([Validators.required]);
    }
    
    // Update form controls
    vehicleDetailsGroup?.get('make')?.updateValueAndValidity();
    vehicleDetailsGroup?.get('model')?.updateValueAndValidity();
    vehicleDetailsGroup?.get('year')?.updateValueAndValidity();
    
    propertyDetailsGroup?.get('propertyType')?.updateValueAndValidity();
    propertyDetailsGroup?.get('constructionYear')?.updateValueAndValidity();
    propertyDetailsGroup?.get('squareMeters')?.updateValueAndValidity();
  }

  onSubmit(): void {
    if (this.quoteForm.valid) {
      this.loading = true;
      
      // Prepare data for submission
      const formValues = this.quoteForm.value;
      const quoteRequest = {
        ...formValues.personalInfo,
        address: formValues.address,
        ...formValues.insuranceDetails,
        vehicleDetails: formValues.vehicleDetails,
        propertyDetails: formValues.propertyDetails,
        submittedAt: new Date()
      };
      
      this.quoteService.submitQuoteRequest(quoteRequest).subscribe({
        next: () => {
          this.submitted = true;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error submitting quote request', error);
          this.loading = false;
          // Handle error (could display error message)
        }
      });
    } else {
      this.markFormGroupTouched(this.quoteForm);
    }
  }
  
  // Helper method to mark all form controls as touched
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      
      if ((control as FormGroup).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }
  
  // Reset the form
  resetForm(): void {
    this.quoteForm.reset();
    this.submitted = false;
  }
  
  // Helper method to check if control is invalid and touched
  isInvalid(controlName: string, formGroupName: string): boolean {
    const control = this.quoteForm.get(`${formGroupName}.${controlName}`);
    return control ? (control.invalid && (control.dirty || control.touched)) : false;
  }
}