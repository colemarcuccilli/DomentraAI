import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

/**
 * Property interface defining the structure of property data
 */
interface PropertyData {
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
}

interface StellarPropertyCardProps {
  property: PropertyData;
  variant?: 'compact' | 'standard' | 'featured';
  onClick?: (property: PropertyData) => void;
}

/**
 * StellarPropertyCard - A breathtaking, mobile-first property card component
 * that showcases real estate listings with elegant animations, responsive design,
 * and intelligent information hierarchy. Features smooth hover effects,
 * image galleries, and accessibility compliance.
 */
const StellarPropertyCard: React.FC<StellarPropertyCardProps> = ({ 
  property, 
  variant = 'standard',
  onClick
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  
  const {
    id,
    title,
    address,
    city,
    state,
    zipCode,
    price,
    bedrooms,
    bathrooms,
    squareFeet,
    propertyType,
    imageUrls,
    roi,
    capRate
  } = property;
  
  // Format price with commas
  const formattedPrice = price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  });
  
  // Navigate through property images
  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => 
      prevIndex === imageUrls.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? imageUrls.length - 1 : prevIndex - 1
    );
  };
  
  // Handle card click
  const handleCardClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick(property);
    }
  };
  
  // Determine card classes based on variant
  const cardClasses = `
    card relative overflow-hidden transition-all duration-300
    ${variant === 'compact' ? 'max-w-xs' : variant === 'featured' ? 'max-w-2xl' : 'max-w-md'}
    ${isHovered ? 'transform hover:-translate-y-1 shadow-xl' : ''}
    ${variant === 'featured' ? 'border-2 border-primary-500' : ''}
    ${onClick ? 'cursor-pointer' : ''}
  `;
  
  // If onClick is provided, use a div instead of Link
  const CardWrapper = onClick ? 'div' : Link;
  const cardProps = onClick 
    ? { 
        className: cardClasses, 
        onClick: handleCardClick,
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
        'aria-label': `View details for ${title}`
      } 
    : {
        to: `/property/${id}`,
        className: cardClasses,
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
        'aria-label': `View details for ${title}`
      };
  
  return (
    // @ts-ignore - TypeScript doesn't like dynamic components with different props
    <CardWrapper {...cardProps}>
      {/* Property Image Gallery */}
      <div className="relative aspect-video overflow-hidden bg-gray-200 dark:bg-gray-700">
        {imageUrls.length > 0 ? (
          <img 
            src={imageUrls[currentImageIndex]} 
            alt={`${title} - Image ${currentImageIndex + 1}`}
            className="w-full h-full object-cover transition-transform duration-500 ease-in-out transform hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
        )}
        
        {/* Image navigation arrows */}
        {imageUrls.length > 1 && (
          <>
            <button 
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-1 transition-all duration-200"
              aria-label="Previous image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-1 transition-all duration-200"
              aria-label="Next image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
        
        {/* Property type badge */}
        <div className="absolute top-2 left-2 bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 text-xs font-bold px-2 py-1 rounded-md shadow-sm">
          {propertyType}
        </div>
        
        {/* Featured badge */}
        {variant === 'featured' && (
          <div className="absolute top-2 right-2 bg-primary-600 text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm">
            Featured
          </div>
        )}
        
        {/* Image counter */}
        {imageUrls.length > 1 && (
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-md">
            {currentImageIndex + 1}/{imageUrls.length}
          </div>
        )}
      </div>
      
      {/* Property Details */}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">
            {title}
          </h3>
          <span className="text-lg font-bold text-primary-600 dark:text-primary-400">
            {formattedPrice}
          </span>
        </div>
        
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 truncate">
          {address}, {city}, {state} {zipCode}
        </p>
        
        {/* Property Stats */}
        <div className="flex justify-between mt-4 text-sm text-gray-700 dark:text-gray-300">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>{bedrooms} {bedrooms === 1 ? 'Bed' : 'Beds'}</span>
          </div>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{bathrooms} {bathrooms === 1 ? 'Bath' : 'Baths'}</span>
          </div>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
            </svg>
            <span>{squareFeet.toLocaleString()} sqft</span>
          </div>
        </div>
        
        {/* Investment Metrics (only shown for featured or if available) */}
        {(variant === 'featured' || roi || capRate) && (
          <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between text-sm">
              {roi && (
                <div className="flex flex-col">
                  <span className="text-gray-600 dark:text-gray-400">ROI</span>
                  <span className="font-bold text-accent-600">{roi}%</span>
                </div>
              )}
              {capRate && (
                <div className="flex flex-col">
                  <span className="text-gray-600 dark:text-gray-400">Cap Rate</span>
                  <span className="font-bold text-accent-600">{capRate}%</span>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Call to action */}
        <div className={`mt-4 ${variant === 'compact' ? 'hidden' : 'block'}`}>
          <button 
            className="w-full btn-primary flex justify-center items-center"
            onClick={onClick ? (e) => {
              e.stopPropagation();
              onClick(property);
            } : undefined}
          >
            <span>View Details</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </CardWrapper>
  );
};

export default StellarPropertyCard; 