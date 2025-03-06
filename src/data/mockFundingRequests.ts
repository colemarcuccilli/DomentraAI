import { FundingRequest } from '../components/matchmaking/FundingRequestCard';

export const mockFundingRequests: FundingRequest[] = [
  {
    id: 'fr-001',
    propertyAddress: '123 Maple Avenue',
    city: 'Fort Wayne',
    state: 'IN',
    amount: 175000,
    projectedReturn: 15.5,
    riskScore: 'Low',
    fundingType: 'Bridge/Gap',
    investorName: 'Michael Johnson',
    investorVerified: true,
    projectedReturnsVerified: true,
    timeRemaining: 14,
    imageUrl: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    
    // Additional properties for detailed view
    riskScoreValue: 85,
    lengthOfFunding: 90, // 90 days
    exitStrategy: 'Fix n Flip',
    potentialLenderProfit: 27125, // 15.5% of $175,000
    
    // Property details
    propertyType: 'Single Family Home',
    currentCondition: 'Needs minor updates',
    rehabCost: 150000,
    lotSize: 5000, // sqft
    buildingSize: 1800, // sqft
    structuralIntegrity: 'Solid foundation, minimal risks for renovation',
    
    // Market details
    marketDescription: "Fort Wayne's real estate market is stable, with renovated single-family homes in this area selling for $300,000–$350,000. The property's ARV of $325,000, backed by strong comps, ensures a reliable exit strategy for lenders funding this deal.",
    arvMin: 300000,
    arvMax: 350000,
    arv: 325000,
    
    // Neighborhood details
    neighborhoodDescription: "Located in Fort Wayne, IN, this property sits in a growing area with rising demand for fix-and-flip investments. Proximity to urban amenities and economic development drives property values, ensuring strong resale potential for lenders.",
    
    // Investor details
    investorCompany: 'Golden Gate Investments',
    investorYearsInBusiness: 8,
    investorCompletedDeals: 25,
    investorRating: 4.8,
    
    // Investment details
    purchasePrice: 150000,
    potentialInvestorProfit: 50000,
    
    // Additional images
    additionalImages: [
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
    ],
    
    // Available documents
    availableDocuments: ['Purchase Contract', 'Construction Plans', 'Zoning Docs']
  },
  {
    id: 'fr-002',
    propertyAddress: '456 Oak Street',
    city: 'Columbus',
    state: 'OH',
    amount: 85000,
    projectedReturn: 12.8,
    riskScore: 'Low',
    fundingType: 'EMD',
    investorName: 'Sarah Williams',
    investorVerified: true,
    projectedReturnsVerified: false,
    timeRemaining: 7,
    imageUrl: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    
    // Additional properties for detailed view
    riskScoreValue: 88,
    lengthOfFunding: 30, // 30 days
    exitStrategy: 'Property Purchase',
    potentialLenderProfit: 10880, // 12.8% of $85,000
    
    // Property details
    propertyType: 'Single Family Home',
    currentCondition: 'Move-in ready, minimal updates needed',
    rehabCost: 50000,
    lotSize: 4200, // sqft
    buildingSize: 1500, // sqft
    structuralIntegrity: 'Clear title, no zoning issues',
    
    // Market details
    marketDescription: "Columbus's real estate market is growing, with similar homes selling for $150,000–$180,000. The property's ARV of $165,000, backed by strong comps, ensures a reliable exit for lenders funding this EMD.",
    arvMin: 150000,
    arvMax: 180000,
    arv: 165000,
    
    // Neighborhood details
    neighborhoodDescription: "Located in Columbus, OH, this property is in a stable, up-and-coming area with strong rental and resale demand. Economic growth supports high property values for lenders.",
    
    // Investor details
    investorCompany: 'Midwest Realty',
    investorYearsInBusiness: 7,
    investorCompletedDeals: 20,
    investorRating: 4.9,
    
    // Investment details
    purchasePrice: 80000,
    potentialInvestorProfit: 30000,
    
    // Additional images
    additionalImages: [
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
    ],
    
    // Available documents
    availableDocuments: ['Purchase Contract', 'Zoning Docs']
  },
  {
    id: 'fr-003',
    propertyAddress: '789 Pine Road',
    city: 'Indianapolis',
    state: 'IN',
    amount: 320000,
    projectedReturn: 18.2,
    riskScore: 'Medium',
    fundingType: 'Private Money Loan',
    investorName: 'David Chen',
    investorVerified: true,
    projectedReturnsVerified: true,
    timeRemaining: 21,
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    
    // Additional properties for detailed view
    riskScoreValue: 83,
    lengthOfFunding: 180, // 6 months
    exitStrategy: 'Fix n Flip',
    potentialLenderProfit: 58240, // 18.2% of $320,000
    
    // Property details
    propertyType: 'Single Family Home',
    currentCondition: 'Requires extensive rehab',
    rehabCost: 250000,
    lotSize: 6500, // sqft
    buildingSize: 2000, // sqft
    structuralIntegrity: 'Needs foundation work, but plans are solid',
    
    // Market details
    marketDescription: "Indianapolis's real estate market is strong, with renovated homes in this area selling for $600,000–$700,000. The property's ARV of $650,000, backed by comps, ensures a lucrative exit for lenders funding this deal.",
    arvMin: 600000,
    arvMax: 700000,
    arv: 650000,
    
    // Neighborhood details
    neighborhoodDescription: "Located in Indianapolis, IN, this property is in a high-demand area with growing economic activity. Proximity to urban centers drives property values, ensuring strong resale potential for lenders.",
    
    // Investor details
    investorCompany: 'Indy Investments',
    investorYearsInBusiness: 9,
    investorCompletedDeals: 30,
    investorRating: 4.7,
    
    // Investment details
    purchasePrice: 100000,
    potentialInvestorProfit: 180000,
    
    // Additional images
    additionalImages: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
    ],
    
    // Available documents
    availableDocuments: ['Purchase Contract', 'Construction Plans', 'Zoning Docs']
  },
  {
    id: 'fr-004',
    propertyAddress: '101 Elm Court',
    city: 'Louisville',
    state: 'KY',
    amount: 145000,
    projectedReturn: 14.3,
    riskScore: 'Low',
    fundingType: 'Private Money Loan',
    investorName: 'Jennifer Lopez',
    investorVerified: false,
    projectedReturnsVerified: true,
    timeRemaining: 10,
    imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    
    // Additional properties for detailed view
    riskScoreValue: 87,
    lengthOfFunding: 365, // 12 months
    exitStrategy: 'Fix n Flip',
    potentialLenderProfit: 20735, // 14.3% of $145,000
    
    // Property details
    propertyType: 'Single Family Home',
    currentCondition: 'Needs moderate updates',
    rehabCost: 100000,
    lotSize: 4800, // sqft
    buildingSize: 1600, // sqft
    structuralIntegrity: 'Stable, minor repairs required',
    
    // Market details
    marketDescription: "Louisville's real estate market is steady, with renovated homes in this area selling for $250,000–$300,000. The property's ARV of $275,000, backed by comps, ensures a reliable exit for lenders funding this deal.",
    arvMin: 250000,
    arvMax: 300000,
    arv: 275000,
    
    // Neighborhood details
    neighborhoodDescription: "Located in Louisville, KY, this property is in a growing area with strong demand for fix-and-flip investments. Economic stability supports high property values for lenders.",
    
    // Investor details
    investorCompany: 'Bluegrass Capital',
    investorYearsInBusiness: 6,
    investorCompletedDeals: 22,
    investorRating: 4.9,
    
    // Investment details
    purchasePrice: 75000,
    potentialInvestorProfit: 60000,
    
    // Additional images
    additionalImages: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
    ],
    
    // Available documents
    availableDocuments: ['Purchase Contract', 'Construction Plans', 'Zoning Docs']
  },
  {
    id: 'fr-005',
    propertyAddress: '222 Birch Lane',
    city: 'Cincinnati',
    state: 'OH',
    amount: 450000,
    projectedReturn: 20.5,
    riskScore: 'High',
    fundingType: 'Double Close',
    investorName: 'Robert Smith',
    investorVerified: true,
    projectedReturnsVerified: true,
    timeRemaining: 30,
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    
    // Additional properties for detailed view
    riskScoreValue: 78,
    lengthOfFunding: 270, // 9 months
    exitStrategy: 'Fix n Flip',
    potentialLenderProfit: 92250, // 20.5% of $450,000
    
    // Property details
    propertyType: 'Single Family Home',
    currentCondition: 'Requires extensive rehab',
    rehabCost: 350000,
    lotSize: 7000, // sqft
    buildingSize: 2500, // sqft
    structuralIntegrity: 'Needs significant repairs, higher risk for construction',
    
    // Market details
    marketDescription: "Cincinnati's real estate market is competitive, with renovated homes in this area selling for $800,000–$950,000. The property's ARV of $900,000, backed by comps, offers a lucrative exit for lenders funding this deal, despite higher risk.",
    arvMin: 800000,
    arvMax: 950000,
    arv: 900000,
    
    // Neighborhood details
    neighborhoodDescription: "Located in Cincinnati, OH, this property is in a high-demand area with strong economic growth. Proximity to urban centers drives property values, but market volatility adds risk for lenders.",
    
    // Investor details
    investorCompany: 'River City Funding',
    investorYearsInBusiness: 10,
    investorCompletedDeals: 28,
    investorRating: 4.6,
    
    // Investment details
    purchasePrice: 200000,
    potentialInvestorProfit: 300000,
    
    // Additional images
    additionalImages: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
    ],
    
    // Available documents
    availableDocuments: ['Purchase Contract', 'Construction Plans', 'Zoning Docs']
  },
  {
    id: 'fr-006',
    propertyAddress: '333 Cedar Drive',
    city: 'Nashville',
    state: 'TN',
    amount: 210000,
    projectedReturn: 16.7,
    riskScore: 'Medium',
    fundingType: 'Bridge/Gap',
    investorName: 'Amanda Wilson',
    investorVerified: true,
    projectedReturnsVerified: false,
    timeRemaining: 18,
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    
    // Additional properties for detailed view
    riskScoreValue: 83,
    lengthOfFunding: 730, // 24 months
    exitStrategy: 'Rental Income',
    potentialLenderProfit: 35070, // 16.7% of $210,000
    
    // Property details
    propertyType: 'Multi-Family Home',
    currentCondition: 'Move-in ready, minor updates',
    rehabCost: 50000,
    lotSize: 5200, // sqft
    buildingSize: 2200, // sqft
    structuralIntegrity: 'Stable, suitable for rental units',
    
    // Market details
    marketDescription: "Nashville's real estate market is booming, with rental properties in this area valued at $300,000–$350,000. The property's ARV of $325,000, backed by comps, ensures stable rental income for lenders funding this deal.",
    arvMin: 300000,
    arvMax: 350000,
    arv: 325000,
    
    // Neighborhood details
    neighborhoodDescription: "Located in Nashville, TN, this property is in a high-demand rental area with strong economic growth. Proximity to music venues and urban centers drives rental demand, ensuring steady cash flow for lenders.",
    
    // Investor details
    investorCompany: 'Music City Properties',
    investorYearsInBusiness: 6,
    investorCompletedDeals: 18,
    investorRating: 4.8,
    
    // Investment details
    purchasePrice: 115000,
    potentialInvestorProfit: 160000, // Long-term rental income
    
    // Additional images
    additionalImages: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
    ],
    
    // Available documents
    availableDocuments: ['Purchase Contract', 'Rental Projections', 'Zoning Docs']
  },
  {
    id: 'fr-007',
    propertyAddress: '444 Walnut Avenue',
    city: 'Chicago',
    state: 'IL',
    amount: 275000,
    projectedReturn: 17.9,
    riskScore: 'Medium',
    fundingType: 'Double Close',
    investorName: 'Thomas Brown',
    investorVerified: false,
    projectedReturnsVerified: true,
    timeRemaining: 12,
    imageUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    
    // Additional properties for detailed view
    riskScoreValue: 82,
    lengthOfFunding: 60, // 60 days
    exitStrategy: 'Quick Resale',
    potentialLenderProfit: 49225, // 17.9% of $275,000
    
    // Property details
    propertyType: 'Single Family Home',
    currentCondition: 'Needs minor updates',
    rehabCost: 75000,
    lotSize: 4500, // sqft
    buildingSize: 1700, // sqft
    structuralIntegrity: 'Clear title, ready for double closing',
    
    // Market details
    marketDescription: "Chicago's real estate market is robust, with similar homes selling for $400,000–$450,000. The property's ARV of $425,000, backed by comps, ensures a reliable exit for lenders funding this deal.",
    arvMin: 400000,
    arvMax: 450000,
    arv: 425000,
    
    // Neighborhood details
    neighborhoodDescription: "Located in Chicago, IL, this property is in a high-demand area with strong economic growth. Proximity to urban centers drives resale values, supporting quick flips for lenders.",
    
    // Investor details
    investorCompany: 'Windy City Ventures',
    investorYearsInBusiness: 7,
    investorCompletedDeals: 24,
    investorRating: 4.7,
    
    // Investment details
    purchasePrice: 150000,
    potentialInvestorProfit: 100000,
    
    // Additional images
    additionalImages: [
      'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
    ],
    
    // Available documents
    availableDocuments: ['Purchase Contract', 'Resale Agreement', 'Zoning Docs']
  },
  {
    id: 'fr-008',
    propertyAddress: '555 Spruce Street',
    city: 'Detroit',
    state: 'MI',
    amount: 95000,
    projectedReturn: 22.3,
    riskScore: 'High',
    fundingType: 'Double Close',
    investorName: 'Jessica Taylor',
    investorVerified: true,
    projectedReturnsVerified: true,
    timeRemaining: 25,
    imageUrl: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    
    // Additional properties for detailed view
    riskScoreValue: 75,
    lengthOfFunding: 365, // 12 months
    exitStrategy: 'Fix n Flip',
    potentialLenderProfit: 21185, // 22.3% of $95,000
    
    // Property details
    propertyType: 'Single Family Home',
    currentCondition: 'Requires extensive rehab',
    rehabCost: 300000,
    lotSize: 5800, // sqft
    buildingSize: 1900, // sqft
    structuralIntegrity: 'Needs significant repairs, higher risk for construction',
    
    // Market details
    marketDescription: "Detroit's real estate market is recovering, with renovated homes in this area selling for $400,000–$500,000. The property's ARV of $450,000, backed by comps, offers a lucrative exit for lenders funding this deal, despite higher risk.",
    arvMin: 400000,
    arvMax: 500000,
    arv: 450000,
    
    // Neighborhood details
    neighborhoodDescription: "Located in Detroit, MI, this property is in a revitalizing area with growing demand. Economic recovery drives property values, but market volatility adds risk for lenders.",
    
    // Investor details
    investorCompany: 'Motor City Funding',
    investorYearsInBusiness: 5,
    investorCompletedDeals: 15,
    investorRating: 4.5,
    
    // Investment details
    purchasePrice: 80000,
    potentialInvestorProfit: 70000,
    
    // Additional images
    additionalImages: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
    ],
    
    // Available documents
    availableDocuments: ['Purchase Contract', 'Construction Plans', 'Zoning Docs']
  }
];

// AI-suggested funding requests based on user preferences
export const aiSuggestedFundingRequests: FundingRequest[] = [
  mockFundingRequests[0],
  mockFundingRequests[2],
  mockFundingRequests[5]
]; 