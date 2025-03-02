import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import EtherealEscrowButton from './EtherealEscrowButton';

/**
 * Property interface defining the structure of property data
 */
interface Property {
  id: string;
  title: string;
  address: string;
  price: number;
  imageUrls: string[];
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  description: string;
  features: string[];
  yearBuilt: number;
  propertyType: string;
  status: 'forSale' | 'pending' | 'sold';
  roi?: number;
  neighborhood?: string;
  schools?: { name: string; rating: number; distance: number }[];
  nearbyAmenities?: { name: string; distance: number }[];
  taxInfo?: { annualAmount: number; lastAssessedValue: number };
  sellerInfo?: { name: string; contactInfo: string; agentName?: string };
}

/**
 * Props for the CelestialPropertyDetails component
 */
interface CelestialPropertyDetailsProps {
  property: Property;
  onClose: () => void;
}

/**
 * CelestialPropertyDetails - A breathtaking, mobile-first component that displays
 * detailed information about a property with stunning visuals and interactive elements.
 */
const CelestialPropertyDetails: React.FC<CelestialPropertyDetailsProps> = ({ property, onClose }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'location' | 'financials'>('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [similarProperties, setSimilarProperties] = useState<Property[]>([]);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  
  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Mock similar properties data would be loaded here
      setSimilarProperties([]);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Format currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  // Handle image navigation
  const nextImage = () => {
    setActiveImageIndex((prevIndex) => 
      prevIndex === property.imageUrls.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prevImage = () => {
    setActiveImageIndex((prevIndex) => 
      prevIndex === 0 ? property.imageUrls.length - 1 : prevIndex - 1
    );
  };
  
  // Calculate monthly mortgage payment (simplified)
  const calculateMortgage = (): number => {
    const principal = property.price * 0.8; // 20% down payment
    const interestRate = 0.045 / 12; // 4.5% annual rate, monthly
    const numberOfPayments = 30 * 12; // 30-year mortgage
    
    const mortgage = principal * (interestRate * Math.pow(1 + interestRate, numberOfPayments)) / 
                    (Math.pow(1 + interestRate, numberOfPayments) - 1);
    
    return Math.round(mortgage);
  };
  
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-24 h-24 border-t-4 border-b-4 border-primary-500 rounded-full animate-spin"></div>
          <p className="mt-4 text-white text-xl">Loading celestial property details...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 overflow-y-auto z-50">
      <div className="min-h-screen py-8 px-4 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-6xl overflow-hidden relative">
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-gray-800 dark:bg-gray-700 text-white rounded-full p-2 hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors duration-200"
            aria-label="Close property details"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className={`flex flex-col ${!isMobile ? 'md:flex-row' : ''}`}>
            {/* Property images */}
            <div className={`${!isMobile ? 'md:w-1/2' : 'w-full'} relative`}>
              <div className="relative aspect-video">
                <img 
                  src={property.imageUrls[activeImageIndex]} 
                  alt={`${property.title} - Image ${activeImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
                
                {/* Image navigation */}
                <div className="absolute inset-0 flex items-center justify-between px-4">
                  <button 
                    onClick={prevImage}
                    className="bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition-opacity duration-200"
                    aria-label="Previous image"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button 
                    onClick={nextImage}
                    className="bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition-opacity duration-200"
                    aria-label="Next image"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
                
                {/* Image counter */}
                <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white text-sm px-3 py-1 rounded-full">
                  {activeImageIndex + 1} / {property.imageUrls.length}
                </div>
                
                {/* Property status badge */}
                <div className="absolute top-4 left-4">
                  {property.status === 'forSale' && (
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      For Sale
                    </span>
                  )}
                  {property.status === 'pending' && (
                    <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Pending
                    </span>
                  )}
                  {property.status === 'sold' && (
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Sold
                    </span>
                  )}
                </div>
              </div>
              
              {/* Thumbnail gallery */}
              {property.imageUrls.length > 1 && (
                <div className="flex overflow-x-auto py-2 px-1 space-x-2 bg-gray-100 dark:bg-gray-900">
                  {property.imageUrls.map((url, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded overflow-hidden border-2 ${
                        activeImageIndex === index 
                          ? 'border-primary-500' 
                          : 'border-transparent'
                      }`}
                    >
                      <img 
                        src={url} 
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Property details */}
            <div className={`${!isMobile ? 'md:w-1/2' : 'w-full'} p-6`}>
              <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {property.title}
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  {property.address}
                </p>
                <div className="flex items-center">
                  <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                    {formatCurrency(property.price)}
                  </p>
                  {property.roi && (
                    <span className="ml-3 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-2 py-1 rounded text-sm font-medium">
                      {property.roi}% ROI
                    </span>
                  )}
                </div>
              </div>
              
              {/* Property highlights */}
              <div className="flex flex-wrap mb-6 border-b border-gray-200 dark:border-gray-700 pb-6">
                <div className="w-1/3 flex flex-col items-center mb-4">
                  <span className="text-gray-500 dark:text-gray-400 text-sm">Beds</span>
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">{property.bedrooms}</span>
                </div>
                <div className="w-1/3 flex flex-col items-center mb-4">
                  <span className="text-gray-500 dark:text-gray-400 text-sm">Baths</span>
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">{property.bathrooms}</span>
                </div>
                <div className="w-1/3 flex flex-col items-center mb-4">
                  <span className="text-gray-500 dark:text-gray-400 text-sm">Sq Ft</span>
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">{property.squareFeet.toLocaleString()}</span>
                </div>
                <div className="w-1/3 flex flex-col items-center">
                  <span className="text-gray-500 dark:text-gray-400 text-sm">Type</span>
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">{property.propertyType}</span>
                </div>
                <div className="w-1/3 flex flex-col items-center">
                  <span className="text-gray-500 dark:text-gray-400 text-sm">Year Built</span>
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">{property.yearBuilt}</span>
                </div>
                <div className="w-1/3 flex flex-col items-center">
                  <span className="text-gray-500 dark:text-gray-400 text-sm">$/Sq Ft</span>
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    ${Math.round(property.price / property.squareFeet)}
                  </span>
                </div>
              </div>
              
              {/* Tabs navigation */}
              <div className="mb-6">
                <div className="flex border-b border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`py-2 px-4 text-sm font-medium ${
                      activeTab === 'overview'
                        ? 'text-primary-600 border-b-2 border-primary-600 dark:text-primary-400 dark:border-primary-400'
                        : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab('features')}
                    className={`py-2 px-4 text-sm font-medium ${
                      activeTab === 'features'
                        ? 'text-primary-600 border-b-2 border-primary-600 dark:text-primary-400 dark:border-primary-400'
                        : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    Features
                  </button>
                  <button
                    onClick={() => setActiveTab('location')}
                    className={`py-2 px-4 text-sm font-medium ${
                      activeTab === 'location'
                        ? 'text-primary-600 border-b-2 border-primary-600 dark:text-primary-400 dark:border-primary-400'
                        : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    Location
                  </button>
                  <button
                    onClick={() => setActiveTab('financials')}
                    className={`py-2 px-4 text-sm font-medium ${
                      activeTab === 'financials'
                        ? 'text-primary-600 border-b-2 border-primary-600 dark:text-primary-400 dark:border-primary-400'
                        : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    Financials
                  </button>
                </div>
                
                {/* Tab content */}
                <div className="py-4">
                  {activeTab === 'overview' && (
                    <div>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        {property.description}
                      </p>
                      {property.sellerInfo && (
                        <div className="mt-4 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Seller Information</h3>
                          <p className="text-gray-700 dark:text-gray-300">
                            <span className="font-medium">Contact:</span> {property.sellerInfo.name}
                          </p>
                          <p className="text-gray-700 dark:text-gray-300">
                            <span className="font-medium">Email/Phone:</span> {property.sellerInfo.contactInfo}
                          </p>
                          {property.sellerInfo.agentName && (
                            <p className="text-gray-700 dark:text-gray-300">
                              <span className="font-medium">Agent:</span> {property.sellerInfo.agentName}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                  
                  {activeTab === 'features' && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Property Features</h3>
                      <ul className="grid grid-cols-2 gap-2">
                        {property.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                            <svg className="h-5 w-5 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {activeTab === 'location' && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Neighborhood: {property.neighborhood || 'N/A'}</h3>
                      
                      {property.schools && property.schools.length > 0 && (
                        <div className="mb-4">
                          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Nearby Schools</h4>
                          <ul className="space-y-2">
                            {property.schools.map((school, index) => (
                              <li key={index} className="flex justify-between items-center">
                                <span className="text-gray-700 dark:text-gray-300">{school.name}</span>
                                <div className="flex items-center">
                                  <div className="flex mr-2">
                                    {[...Array(5)].map((_, i) => (
                                      <svg 
                                        key={i}
                                        className={`w-4 h-4 ${i < Math.round(school.rating) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                                        fill="currentColor" 
                                        viewBox="0 0 20 20"
                                      >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                      </svg>
                                    ))}
                                  </div>
                                  <span className="text-sm text-gray-500 dark:text-gray-400">{school.distance} mi</span>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {property.nearbyAmenities && property.nearbyAmenities.length > 0 && (
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Nearby Amenities</h4>
                          <ul className="space-y-2">
                            {property.nearbyAmenities.map((amenity, index) => (
                              <li key={index} className="flex justify-between">
                                <span className="text-gray-700 dark:text-gray-300">{amenity.name}</span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">{amenity.distance} mi</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {/* Placeholder for map */}
                      <div className="mt-4 bg-gray-200 dark:bg-gray-700 rounded-lg h-48 flex items-center justify-center">
                        <p className="text-gray-500 dark:text-gray-400">Interactive map would be displayed here</p>
                      </div>
                    </div>
                  )}
                  
                  {activeTab === 'financials' && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Financial Details</h3>
                      
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-4">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">Estimated Monthly Payment</h4>
                        <p className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                          {formatCurrency(calculateMortgage())}
                          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">/mo</span>
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Based on 30-year fixed rate mortgage with 20% down payment and 4.5% interest rate.
                        </p>
                      </div>
                      
                      {property.taxInfo && (
                        <div className="mb-4">
                          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Property Taxes</h4>
                          <div className="flex justify-between">
                            <span className="text-gray-700 dark:text-gray-300">Annual Amount</span>
                            <span className="font-medium text-gray-900 dark:text-white">{formatCurrency(property.taxInfo.annualAmount)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-700 dark:text-gray-300">Last Assessed Value</span>
                            <span className="font-medium text-gray-900 dark:text-white">{formatCurrency(property.taxInfo.lastAssessedValue)}</span>
                          </div>
                        </div>
                      )}
                      
                      {property.roi && (
                        <div className="mb-4">
                          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Investment Potential</h4>
                          <div className="flex justify-between">
                            <span className="text-gray-700 dark:text-gray-300">Estimated ROI</span>
                            <span className="font-medium text-green-600 dark:text-green-400">{property.roi}%</span>
                          </div>
                          <div className="mt-2 bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                            <div 
                              className="bg-green-600 h-2.5 rounded-full" 
                              style={{ width: `${Math.min(property.roi * 5, 100)}%` }}
                            ></div>
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                            Based on current market trends and comparable properties in the area.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="btn-primary flex-1 py-3">
                  Contact Seller
                </button>
                <EtherealEscrowButton propertyId={property.id} propertyPrice={property.price} />
                <button className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg px-4 py-3 transition-colors duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
                <button className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg px-4 py-3 transition-colors duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CelestialPropertyDetails; 