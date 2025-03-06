export interface Property {
  id: string;
  title: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  city: string;
  state: string;
  zipCode: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  propertyType: string;
  yearBuilt: number;
  description: string;
  imageUrls: string[];
  features: string[];
  status: 'active' | 'pending' | 'sold';
  isFeatured?: boolean;
  roi?: number;
  capRate?: number;
  arv: number;
  purchasePrice: number;
  neighborhood?: {
    name: string;
    rating: number;
    description: string;
    safetyRating?: number;
  };
  schools?: {
    name: string;
    rating: number;
    distance: number;
  }[];
  nearbyAmenities?: string[];
  taxInfo?: {
    annualAmount: number;
    year: number;
  };
  sellerInfo?: {
    name: string;
    contact: string;
    type: 'owner' | 'agent' | 'bank';
  };
  location?: {
    latitude: number;
    longitude: number;
  };
  seller?: {
    name: string;
    company?: string;
    phone?: string;
    email?: string;
    image?: string;
  };
  listedDate?: string;
  lotSize?: number;
}

export interface Borrower {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  experience: number;
  completedProjects: number;
  creditScore: number;
  rating: number;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  documents?: {
    type: string;
    url: string;
    verified: boolean;
  }[];
}

export interface FundingRequest {
  id: string;
  title: string;
  amount: number;
  term: number;
  rate: number;
  type: 'Bridge' | 'Construction' | 'EMD' | 'Crowdfunding' | 'Private Money';
  description: string;
  property: Property;
  borrower: Borrower;
  status: 'active' | 'funded' | 'closed';
  isFeatured?: boolean;
  collateral?: {
    type: string;
    value: number;
    description: string;
  };
  timeline?: {
    submitted: string;
    deadline: string;
    milestones: {
      date: string;
      description: string;
    }[];
  };
  documents?: {
    type: string;
    url: string;
    required: boolean;
  }[];
} 