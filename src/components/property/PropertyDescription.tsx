import React, { useState } from 'react';
import { Property } from '../../types/property';

interface PropertyDescriptionProps {
  property: Property;
  isLoggedIn: boolean;
}

/**
 * PropertyDescription - A component that displays the property description
 * with an expandable/collapsible feature. For logged-out users, it shows
 * a truncated version with a login prompt.
 */
const PropertyDescription: React.FC<PropertyDescriptionProps> = ({ 
  property, 
  isLoggedIn 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Determine if description should be truncated
  const shouldTruncate = !isLoggedIn || (property.description?.length > 300 && !isExpanded);
  
  // Get the display description based on login state and expansion state
  const getDisplayDescription = () => {
    if (!property.description) return "No description available.";
    
    if (shouldTruncate) {
      if (!isLoggedIn) {
        // For logged-out users, show only first 150 characters
        return property.description.substring(0, 150) + "...";
      } else {
        // For logged-in users with collapsed view
        return property.description.substring(0, 300) + "...";
      }
    }
    
    // Full description for expanded view
    return property.description;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Description</h3>
      
      <div className="text-gray-700 dark:text-gray-300 text-sm">
        <p className="whitespace-pre-line">{getDisplayDescription()}</p>
        
        {!isLoggedIn && (
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
            <p className="text-blue-700 dark:text-blue-300 font-medium">
              Log in to view the full property description and details.
            </p>
          </div>
        )}
        
        {isLoggedIn && property.description && property.description.length > 300 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-sm focus:outline-none"
          >
            {isExpanded ? "Show Less" : "Read More"}
          </button>
        )}
      </div>
      
      {/* Property Features Section - Only visible to logged-in users */}
      {isLoggedIn && property.features && property.features.length > 0 && (
        <div className="mt-4">
          <h4 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-2">Features</h4>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {property.features.map((feature, index) => (
              <li key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PropertyDescription; 