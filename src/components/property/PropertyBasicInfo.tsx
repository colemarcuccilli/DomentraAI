import React from 'react';
import { Property } from '../../types/property';

interface PropertyBasicInfoProps {
  property: Property;
}

/**
 * PropertyBasicInfo - A component that displays the basic information about a property
 * such as bedrooms, bathrooms, square footage, property type, year built, and lot size.
 */
const PropertyBasicInfo: React.FC<PropertyBasicInfoProps> = ({ property }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Property Details</h3>
      
      {/* Key Stats */}
      <div className="flex flex-wrap gap-x-6 gap-y-2 text-gray-700 dark:text-gray-300">
        <div className="flex items-center">
          <svg className="w-5 h-5 mr-1 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span>{property.bedrooms} {property.bedrooms === 1 ? 'bed' : 'beds'}</span>
        </div>
        <div className="flex items-center">
          <svg className="w-5 h-5 mr-1 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{property.bathrooms} {property.bathrooms === 1 ? 'bath' : 'baths'}</span>
        </div>
        <div className="flex items-center">
          <svg className="w-5 h-5 mr-1 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
          </svg>
          <span>{property.squareFeet.toLocaleString()} sqft</span>
        </div>
      </div>
      
      {/* Additional Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500 dark:text-gray-400">Property Type</span>
          <span className="text-gray-900 dark:text-white font-medium">{property.propertyType}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 dark:text-gray-400">Year Built</span>
          <span className="text-gray-900 dark:text-white font-medium">{property.yearBuilt}</span>
        </div>
        {property.taxInfo && (
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">Property Taxes ({property.taxInfo.year})</span>
            <span className="text-gray-900 dark:text-white font-medium">${property.taxInfo.annualAmount.toLocaleString()}/yr</span>
          </div>
        )}
        {property.neighborhood && (
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">Neighborhood</span>
            <span className="text-gray-900 dark:text-white font-medium">{property.neighborhood.name}</span>
          </div>
        )}
      </div>
      
      {/* Features */}
      {property.features && property.features.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Features</h4>
          <div className="flex flex-wrap gap-2">
            {property.features.map((feature, index) => (
              <span 
                key={index} 
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyBasicInfo; 