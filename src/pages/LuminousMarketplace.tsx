import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import LuminousSearchBar from '../components/LuminousSearchBar';
import StellarPropertyCard from '../components/StellarPropertyCard';
import EtherealEscrowButton from '../components/EtherealEscrowButton';
import DreamscapeMatchmaking from '../components/DreamscapeMatchmaking';
import CelestialPropertyDetails from '../components/CelestialPropertyDetails';

/**
 * Mock property data for demonstration
 */
const mockProperties = [
  {
    id: 'prop-1',
    title: 'Elegant Victorian Home',
    address: '123 Maple Street',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94110',
    price: 1250000,
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 2800,
    propertyType: 'Single Family',
    yearBuilt: 1915,
    description: 'Beautiful Victorian home with modern updates, hardwood floors, and a spacious backyard.',
    imageUrls: [
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750',
      'https://images.unsplash.com/photo-1494526585095-c41746248156',
    ],
    isFeatured: true,
    roi: 12.5,
    capRate: 5.8,
    features: ['Modern design', 'Renovated kitchen', 'Hardwood floors'],
    status: 'forSale',
  },
  {
    id: 'prop-2',
    title: 'Modern Downtown Loft',
    address: '456 Urban Avenue',
    city: 'Chicago',
    state: 'IL',
    zipCode: '60611',
    price: 850000,
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1800,
    propertyType: 'Condo',
    yearBuilt: 2010,
    description: 'Sleek downtown loft with floor-to-ceiling windows, gourmet kitchen, and building amenities.',
    imageUrls: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2',
    ],
    roi: 8.2,
    capRate: 4.5,
    features: ['Modern design', 'Renovated kitchen', 'Hardwood floors'],
    status: 'forSale',
  },
  {
    id: 'prop-3',
    title: 'Suburban Family Home',
    address: '789 Oak Drive',
    city: 'Austin',
    state: 'TX',
    zipCode: '78704',
    price: 675000,
    bedrooms: 4,
    bathrooms: 3.5,
    squareFeet: 3200,
    propertyType: 'Single Family',
    yearBuilt: 2005,
    description: 'Spacious family home in a quiet neighborhood with excellent schools and a large backyard.',
    imageUrls: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6',
      'https://images.unsplash.com/photo-1576941089067-2de3c901e126',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a',
    ],
    roi: 9.7,
    capRate: 5.2,
    features: ['Modern design', 'Renovated kitchen', 'Hardwood floors'],
    status: 'forSale',
  },
  {
    id: 'prop-4',
    title: 'Beachfront Luxury Villa',
    address: '101 Ocean View',
    city: 'Miami',
    state: 'FL',
    zipCode: '33139',
    price: 3200000,
    bedrooms: 5,
    bathrooms: 5.5,
    squareFeet: 4500,
    propertyType: 'Luxury',
    yearBuilt: 2018,
    description: 'Stunning beachfront villa with panoramic ocean views, infinity pool, and smart home features.',
    imageUrls: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750',
      'https://images.unsplash.com/photo-1494526585095-c41746248156',
    ],
    isFeatured: true,
    roi: 15.3,
    capRate: 6.1,
    features: ['Modern design', 'Renovated kitchen', 'Hardwood floors'],
    status: 'forSale',
  },
  {
    id: 'prop-5',
    title: 'Mountain Retreat Cabin',
    address: '555 Pine Trail',
    city: 'Aspen',
    state: 'CO',
    zipCode: '81611',
    price: 1450000,
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 2200,
    propertyType: 'Cabin',
    yearBuilt: 2000,
    description: 'Cozy mountain cabin with stunning views, stone fireplace, and proximity to ski resorts.',
    imageUrls: [
      'https://images.unsplash.com/photo-1542718610-a1d656d1884c',
      'https://images.unsplash.com/photo-1520608760-eff2c38b06d0',
      'https://images.unsplash.com/photo-1506974210756-8e1b8985d348',
    ],
    roi: 11.8,
    capRate: 5.5,
    features: ['Modern design', 'Renovated kitchen', 'Hardwood floors'],
    status: 'forSale',
  },
  {
    id: 'prop-6',
    title: 'Historic Brownstone',
    address: '222 Heritage Lane',
    city: 'Boston',
    state: 'MA',
    zipCode: '02116',
    price: 1850000,
    bedrooms: 3,
    bathrooms: 2.5,
    squareFeet: 2400,
    propertyType: 'Townhouse',
    yearBuilt: 1890,
    description: 'Beautifully restored historic brownstone with original details and modern conveniences.',
    imageUrls: [
      'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea',
    ],
    roi: 10.2,
    capRate: 4.9,
    features: ['Modern design', 'Renovated kitchen', 'Hardwood floors'],
    status: 'forSale',
  },
];

// Import PropertyData type from StellarPropertyCard
type PropertyData = {
  id: string;
  title: string;
  address: string;
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
  isFeatured?: boolean;
  roi?: number;
  capRate?: number;
};

// Define Property interface to match CelestialPropertyDetails requirements
interface Property extends PropertyData {
  features: string[];
  status: 'forSale' | 'pending' | 'sold';
  neighborhood?: string;
  schools?: { name: string; rating: number; distance: number }[];
  nearbyAmenities?: { name: string; distance: number }[];
  taxInfo?: { annualAmount: number; lastAssessedValue: number };
  sellerInfo?: { name: string; contactInfo: string; agentName?: string };
}

/**
 * LuminousMarketplace - A breathtaking, mobile-first marketplace page
 * that showcases real estate properties with elegant animations, responsive design,
 * and intelligent information hierarchy. Features AI-driven matchmaking,
 * secure escrow integration, and accessibility compliance.
 */
const LuminousMarketplace: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>(
    mockProperties.map(property => ({
      ...property,
      features: property.features || ['Modern design', 'Renovated kitchen', 'Hardwood floors'],
      status: property.status || 'forSale'
    })) as Property[]
  );
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'buy' | 'fund'>('buy');
  const [showMatchmaking, setShowMatchmaking] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  
  const isMobile = useMediaQuery({ maxWidth: 768 });
  
  // Simulate loading properties
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Featured properties
  const featuredProperties = properties.filter(property => property.isFeatured);
  
  // Type assertion helper function - moved inside component
  const handlePropertySelect = (property: PropertyData) => {
    // Convert PropertyData to Property with required fields
    const fullProperty: Property = {
      ...property,
      features: (property as any).features || ['Modern design', 'Renovated kitchen', 'Hardwood floors'],
      status: (property as any).status || 'forSale'
    };
    setSelectedProperty(fullProperty);
  };

  // Handle closing property details modal
  const handleClosePropertyDetails = () => {
    setSelectedProperty(null);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Property Details Modal */}
      {selectedProperty && (
        <CelestialPropertyDetails 
          property={selectedProperty} 
          onClose={handleClosePropertyDetails} 
        />
      )}
      
      {/* Hero Section */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-700 opacity-90 z-0"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560518883-ce09059eeffa')] bg-cover bg-center mix-blend-overlay z-0"></div>
        
        <div className="container-fluid relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 animate-fade-in">
              Discover Your Perfect Investment Property
            </h1>
            <p className="text-lg md:text-xl text-white opacity-90 mb-8 animate-fade-in">
              Browse thousands of investment properties or find funding for your next real estate project.
            </p>
            
            {/* Tab Navigation */}
            <div className="inline-flex rounded-md shadow-sm mb-8 animate-fade-in" role="group">
              <button
                type="button"
                className={`px-5 py-2.5 text-sm font-medium rounded-l-lg ${
                  activeTab === 'buy'
                    ? 'bg-white text-primary-700'
                    : 'bg-primary-700 text-white hover:bg-primary-800'
                }`}
                onClick={() => {
                  setActiveTab('buy');
                  setShowMatchmaking(false);
                }}
                aria-pressed={activeTab === 'buy'}
              >
                Buy Properties
              </button>
              <button
                type="button"
                className={`px-5 py-2.5 text-sm font-medium rounded-r-lg ${
                  activeTab === 'fund'
                    ? 'bg-white text-primary-700'
                    : 'bg-primary-700 text-white hover:bg-primary-800'
                }`}
                onClick={() => {
                  setActiveTab('fund');
                  setShowMatchmaking(true);
                }}
                aria-pressed={activeTab === 'fund'}
              >
                Find Funding
              </button>
            </div>
            
            {/* Search Bar */}
            <div className="animate-slide-up">
              <LuminousSearchBar />
            </div>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="container-fluid">
          {activeTab === 'buy' ? (
            <>
              {/* Featured Properties */}
              {featuredProperties.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    Featured Properties
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {featuredProperties.map(property => (
                      <div key={property.id} className="animate-fade-in">
                        <StellarPropertyCard 
                          property={property} 
                          variant="featured" 
                          onClick={handlePropertySelect}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* All Properties */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  All Properties
                </h2>
                
                {isLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[...Array(6)].map((_, index) => (
                      <div key={index} className="animate-pulse bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                        <div className="h-48 bg-gray-300 dark:bg-gray-700"></div>
                        <div className="p-4">
                          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
                          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></div>
                          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></div>
                          <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-full mt-4"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {properties.map(property => (
                      <div key={property.id} className="animate-fade-in">
                        <StellarPropertyCard 
                          property={property} 
                          onClick={handlePropertySelect}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Escrow CTA */}
              <div className="mt-16 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <div className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between">
                  <div className="mb-6 md:mb-0 md:mr-6">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      Secure Your Investment with Escrow
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
                      Our integrated escrow service provides peace of mind for both buyers and sellers. Protect your transaction with our secure, transparent process.
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <EtherealEscrowButton 
                      propertyId="example" 
                      propertyPrice={1000000} 
                      variant="accent" 
                      size="lg" 
                    />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Funding Section */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Find Funding for Your Real Estate Project
                </h2>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden p-6 md:p-8 mb-8">
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Our AI-powered matchmaking system connects you with the perfect lender for your specific project. Get matched with private lenders who specialize in your investment strategy.
                  </p>
                  
                  {!showMatchmaking ? (
                    <div className="text-center">
                      <button
                        onClick={() => setShowMatchmaking(true)}
                        className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
                      >
                        Start Matchmaking
                      </button>
                    </div>
                  ) : (
                    <div className="animate-fade-in">
                      <DreamscapeMatchmaking />
                    </div>
                  )}
                </div>
              </div>
              
              {/* Funding Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden p-6">
                  <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Fast Funding</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Get funding in as little as 7 days with our streamlined process and dedicated lender network.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden p-6">
                  <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Secure Transactions</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Our integrated escrow service ensures your funding is secure and transparent from start to finish.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden p-6">
                  <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">AI-Powered Matching</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Our proprietary algorithm matches you with lenders who specialize in your specific investment strategy.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default LuminousMarketplace; 