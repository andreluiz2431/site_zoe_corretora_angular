export interface QuoteRequest {
  // Personal information
  name: string;
  cpf: string;
  email: string;
  phone: string;
  address: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  
  // Insurance details
  insuranceType: string;
  insuredValue?: number;
  additionalInfo?: string;
  
  // For auto insurance
  vehicleDetails?: {
    make?: string;
    model?: string;
    year?: number;
    licensePlate?: string;
  };
  
  // For home insurance
  propertyDetails?: {
    propertyType?: string;
    constructionYear?: number;
    squareMeters?: number;
  };
  
  // Submission metadata
  submittedAt: Date;
}