import React, { useEffect, useState, useRef } from 'react';
import { Property } from '../../types/property';
import PropertyImageGallery from '../property/PropertyImageGallery';
import PropertyScrollNav from '../property/PropertyScrollNav';
import PropertyOverview from '../property/PropertyOverview';
import PropertyFactsFeatures from '../property/PropertyFactsFeatures';
import PropertyMarketValue from '../property/PropertyMarketValue';
import PropertyNeighborhood from '../property/PropertyNeighborhood';
import PropertyInvestmentOpportunity from '../property/PropertyInvestmentOpportunity';
import PropertyMap from '../property/PropertyMap';

interface PropertyDetailModalProps {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
  isLoggedIn: boolean;
  onLogin: () => void;
  onRequestFunding?: () => void;
  onSaveProperty?: () => void;
  onShareProperty?: () => void;
  onContactSeller?: () => void;
}

/**
 * PropertyDetailModal - A comprehensive modal for displaying property details.
 * Shows different content based on whether the user is logged in or not.
 * Includes a scroll-based navigation that appears when scrolling past the photos.
 */
const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  isOpen,
  onClose,
  isLoggedIn,
  onLogin,
  onRequestFunding = () => {},
  onSaveProperty = () => {},
  onShareProperty = () => {},
  onContactSeller = () => {}
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);
  
  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'overview',
        'facts-features',
        'market-value',
        'neighborhood',
        'investment-opportunity'
      ];
      
      // Find the section that is currently in view
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && modalRef.current) {
          const rect = element.getBoundingClientRect();
          const modalRect = modalRef.current.getBoundingClientRect();
          const offsetTop = rect.top - modalRect.top;
          
          if (offsetTop <= 100 && offsetTop + rect.height > 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    const modalElement = modalRef.current;
    if (modalElement) {
      modalElement.addEventListener('scroll', handleScroll);
      return () => {
        modalElement.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div 
          ref={modalRef}
          className={`property-modal-content relative bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-7xl w-full max-h-[90vh] overflow-y-auto ${
            isFullScreen ? 'h-[90vh]' : ''
          }`}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Scroll-based Navigation */}
          <PropertyScrollNav 
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
          
          {/* Header Section with Title, Address, Price and Property Details */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-col md:flex-row">
              {/* Title, Address, Price */}
              <div className="md:w-1/2">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{property.title}</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {typeof property.address === 'object' 
                    ? `${property.address.street}, ${property.address.city}, ${property.address.state}` 
                    : `${property.city}, ${property.state}`}
                </p>
                <div className="mt-2 flex items-center">
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">${property.price.toLocaleString()}</span>
                  {isLoggedIn && (
                    <span className="ml-2 px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs font-medium rounded">
                      {property.status === 'active' ? 'Active' : property.status === 'pending' ? 'Pending' : 'Sold'}
                    </span>
                  )}
                </div>
              </div>
              
              {/* Property Details Boxes */}
              <div className="md:w-1/2 mt-4 md:mt-0">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded">
                  <div className="bg-white dark:bg-gray-700 p-3 flex items-center">
                    <svg className="w-5 h-5 text-gray-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {property.propertyType === 'Luxury' ? 'Single Family Residence' : property.propertyType}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-700 p-3 flex items-center">
                    <svg className="w-5 h-5 text-gray-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {property.bedrooms} beds, {property.bathrooms} baths
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-700 p-3 flex items-center">
                    <svg className="w-5 h-5 text-gray-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        Built in {property.yearBuilt}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-700 p-3 flex items-center">
                    <svg className="w-5 h-5 text-gray-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                    </svg>
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {property.lotSize ? `${property.lotSize.toLocaleString()} sqft lot` : `-- sqft lot`}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-700 p-3 flex items-center">
                    <svg className="w-5 h-5 text-gray-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                    </svg>
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {property.squareFeet.toLocaleString()} sqft building
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-700 p-3 flex items-center">
                    <svg className="w-5 h-5 text-gray-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        ${Math.round(property.price / property.squareFeet)}/sqft
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="p-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
              {/* Left Column - Images */}
              <div id="property-photo-gallery" className="lg:col-span-7">
                <PropertyImageGallery 
                  images={property.imageUrls}
                  activeIndex={activeImageIndex}
                  onIndexChange={setActiveImageIndex}
                  onToggleFullScreen={() => setIsFullScreen(!isFullScreen)}
                  isFullScreen={isFullScreen}
                  isLoggedIn={isLoggedIn}
                />
                
                {/* Agent/Seller Info */}
                {isLoggedIn && (
                  <div className="mt-4 bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center">
                      <div className="mr-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                          {property.seller?.image ? (
                            <img 
                              src={property.seller.image} 
                              alt={property.seller.name || "Property Owner"} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-300 dark:bg-gray-600">
                              <svg className="w-8 h-8 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-md font-medium text-gray-800 dark:text-gray-200">
                          {property.seller?.name || property.sellerInfo?.name || "Property Owner"}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {property.seller?.company || "Property Seller"}
                        </p>
                        <button
                          onClick={onContactSeller}
                          className="mt-2 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                        >
                          Contact Seller
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Action Buttons - Horizontal Row */}
                <div className="mt-4 flex flex-wrap gap-3">
                  {isLoggedIn ? (
                    <>
                      <button
                        onClick={onRequestFunding}
                        className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200 flex items-center justify-center"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Write Offer
                      </button>
                      
                      <button
                        onClick={onSaveProperty}
                        className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium rounded-lg transition duration-200 flex items-center justify-center"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                        Save
                      </button>
                      
                      <button
                        onClick={onShareProperty}
                        className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium rounded-lg transition duration-200 flex items-center justify-center"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                        Share
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={onLogin}
                        className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200 flex items-center justify-center"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                        Log in to see full details
                      </button>
                      
                      <button
                        onClick={onShareProperty}
                        className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium rounded-lg transition duration-200 flex items-center justify-center"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                        Share Property
                      </button>
                    </>
                  )}
                </div>
              </div>
              
              {/* Right Column - Investment Details */}
              <div className="lg:col-span-5">
                {isLoggedIn ? (
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Investment Potential</h3>
                    
                    {/* Key Investment Metrics */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                      <div className="bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm">
                        <div className="text-sm text-gray-500 dark:text-gray-400">Purchase Price</div>
                        <div className="text-lg font-semibold text-blue-600 dark:text-blue-400">${property.purchasePrice.toLocaleString()}</div>
                      </div>
                      
                      <div className="bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm">
                        <div className="text-sm text-gray-500 dark:text-gray-400">ARV</div>
                        <div className="text-lg font-semibold text-blue-600 dark:text-blue-400">${property.arv.toLocaleString()}</div>
                      </div>
                      
                      <div className="bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm">
                        <div className="text-sm text-gray-500 dark:text-gray-400">Rehab Estimate</div>
                        <div className="text-lg font-semibold text-blue-600 dark:text-blue-400">${(property.arv - property.purchasePrice).toLocaleString()}</div>
                      </div>
                      
                      {property.roi !== undefined && (
                        <div className="bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm">
                          <div className="text-sm text-gray-500 dark:text-gray-400">ROI</div>
                          <div className="text-lg font-semibold text-blue-600 dark:text-blue-400">{property.roi}%</div>
                        </div>
                      )}
                      
                      <div className="bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm">
                        <div className="text-sm text-gray-500 dark:text-gray-400">Purchase % of ARV</div>
                        <div className="text-lg font-semibold text-blue-600 dark:text-blue-400">{Math.round((property.purchasePrice / property.arv) * 100)}%</div>
                      </div>
                      
                      <div className="bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm">
                        <div className="text-sm text-gray-500 dark:text-gray-400">Potential Profit</div>
                        <div className="text-lg font-semibold text-blue-600 dark:text-blue-400">${((property.arv - property.purchasePrice) * 0.5).toLocaleString()}</div>
                      </div>
                    </div>
                    
                    {/* Risk Score */}
                    <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Risk Score</h4>
                        <div className="text-sm font-medium text-green-500">Low Risk</div>
                      </div>
                      
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                        <div 
                          className="h-2.5 rounded-full bg-green-500" 
                          style={{ width: '80%' }}
                        ></div>
                      </div>
                      
                      <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                        Score: 80/100
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Investment Potential</h3>
                    <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                      <p className="text-blue-700 dark:text-blue-300 font-medium text-center">
                        Log in to see investment details, ROI calculations, and risk analysis!
                      </p>
                      <button
                        onClick={onLogin}
                        className="mt-3 w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200"
                      >
                        Log In
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Content Sections */}
            {isLoggedIn ? (
              <div className="space-y-6">
                <div id="overview">
                  <PropertyOverview property={property} />
                </div>
                <div id="facts-features">
                  <PropertyFactsFeatures property={property} />
                </div>
                <div id="market-value">
                  <PropertyMarketValue property={property} />
                </div>
                <div id="neighborhood">
                  <PropertyNeighborhood property={property} />
                </div>
                <div id="investment-opportunity">
                  <PropertyInvestmentOpportunity property={property} />
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 text-center">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Want to see the full investment potential?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
                  Log in to view detailed investment analysis, market comps, neighborhood data, and funding options.
                </p>
                <button
                  onClick={onLogin}
                  className="py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200"
                >
                  Log In to See Full Details
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailModal; 