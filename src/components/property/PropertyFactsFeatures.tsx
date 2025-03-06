import React from 'react';
import { Property } from '../../types/property';

interface PropertyFactsFeaturesProps {
  property: Property;
}

/**
 * PropertyFactsFeatures - A component that displays property features reframed
 * for investment value, focusing on how features translate to profit.
 */
const PropertyFactsFeatures: React.FC<PropertyFactsFeaturesProps> = ({ property }) => {
  // Investment-focused feature descriptions
  const featureDescriptions: Record<string, string> = {
    'Modern design': 'Sleek updates boost resale appeal.',
    'Renovated kitchen': 'High-end finishes increase ARV significantly.',
    'Hardwood floors': 'Durable and desirable, adding value for buyers.',
    'Original crown molding': 'Historical charm attracts premium offers.',
    'Bay windows': 'Unique feature enhances marketability.',
    'Spacious backyard': 'Expands lot value and future resale potential.',
    'Garage parking': 'Rare in the area, justifies higher ARV.',
    'Central heating': 'Low maintenance costs improve ROI.'
  };
  
  return (
    <section id="facts-features" className="py-6 border-b border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Facts & Features</h2>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
        {/* Property Basics */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Property Basics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Property Type</div>
              <div className="font-medium text-gray-900 dark:text-white">{property.propertyType}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Year Built</div>
              <div className="font-medium text-gray-900 dark:text-white">{property.yearBuilt}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Square Feet</div>
              <div className="font-medium text-gray-900 dark:text-white">{property.squareFeet.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Lot Size</div>
              <div className="font-medium text-gray-900 dark:text-white">{property.lotSize ? property.lotSize.toLocaleString() : 'N/A'} sqft</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Bedrooms</div>
              <div className="font-medium text-gray-900 dark:text-white">{property.bedrooms}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Bathrooms</div>
              <div className="font-medium text-gray-900 dark:text-white">{property.bathrooms}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Price per Sqft</div>
              <div className="font-medium text-gray-900 dark:text-white">${Math.round(property.price / property.squareFeet)}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Status</div>
              <div className="font-medium text-gray-900 dark:text-white capitalize">{property.status}</div>
            </div>
          </div>
        </div>
        
        {/* Investment Features */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Investment Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {property.features.map((feature, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <div className="font-medium text-blue-600 dark:text-blue-400 mb-1">{feature}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {featureDescriptions[feature] || 'Adds value to the property.'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyFactsFeatures; 