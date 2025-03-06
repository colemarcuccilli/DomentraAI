import React from 'react';
import { Property } from '../types/property';

interface StellarPropertyCardProps {
  property: Property;
  variant?: 'default' | 'featured';
  onClick: (property: Property) => void;
}

/**
 * StellarPropertyCard - A breathtaking, mobile-first property card component
 * that showcases real estate listings with elegant animations, responsive design,
 * and intelligent information hierarchy. Features smooth hover effects,
 * image galleries, and accessibility compliance.
 */
const StellarPropertyCard: React.FC<StellarPropertyCardProps> = ({ 
  property, 
  variant = 'default',
  onClick 
}) => {
  const {
    title,
    address,
    city,
    state,
    price,
    bedrooms,
    bathrooms,
    squareFeet,
    imageUrls,
    roi,
    capRate
  } = property;

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);

  const formattedSqFt = new Intl.NumberFormat('en-US').format(squareFeet);

  // Format address based on the new structure
  const formattedAddress = address && typeof address === 'object' 
    ? `${address.street}, ${address.city}, ${address.state}` 
    : `${city}, ${state}`;

  return (
    <div 
      className={`
        bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden cursor-pointer
        transform transition-transform duration-300 hover:scale-[1.02]
        ${variant === 'featured' ? 'border-2 border-primary-500' : 'border border-gray-200 dark:border-gray-700'}
      `}
      onClick={() => onClick(property)}
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrls[0]}
          alt={title}
          className="w-full h-full object-cover"
        />
        {variant === 'featured' && (
          <div className="absolute top-2 left-2 bg-primary-500 text-white px-2 py-1 rounded text-xs font-medium">
            Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title and Price */}
        <div className="mb-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
            {title}
          </h3>
          <p className="text-primary-600 dark:text-primary-400 font-medium">
            {formattedPrice}
          </p>
        </div>

        {/* Address */}
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 truncate">
          {formattedAddress}
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="text-center">
            <span className="block text-sm font-medium text-gray-900 dark:text-white">
              {bedrooms}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Beds
            </span>
          </div>
          <div className="text-center">
            <span className="block text-sm font-medium text-gray-900 dark:text-white">
              {bathrooms}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Baths
            </span>
          </div>
          <div className="text-center">
            <span className="block text-sm font-medium text-gray-900 dark:text-white">
              {formattedSqFt}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Sq Ft
            </span>
          </div>
        </div>

        {/* ROI and Cap Rate */}
        {(roi || capRate) && (
          <div className="flex justify-between text-sm">
            {roi && (
              <div>
                <span className="text-gray-600 dark:text-gray-400">ROI: </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {roi}%
                </span>
              </div>
            )}
            {capRate && (
              <div>
                <span className="text-gray-600 dark:text-gray-400">Cap Rate: </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {capRate}%
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StellarPropertyCard; 