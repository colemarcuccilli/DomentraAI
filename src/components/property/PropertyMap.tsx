import React from 'react';
import { Property } from '../../types/property';

interface PropertyMapProps {
  property: Property;
  isLoggedIn: boolean;
  onLogin: () => void;
}

/**
 * PropertyMap - A component that displays a map of the property location.
 * For logged-out users, it shows a blurred map with a login prompt.
 */
const PropertyMap: React.FC<PropertyMapProps> = ({ 
  property, 
  isLoggedIn,
  onLogin
}) => {
  // In a real application, we would use a mapping library like Google Maps, Mapbox, or Leaflet
  // For this example, we'll use a placeholder with conditional blurring
  
  // Get the map URL (in a real app, this would be a proper map integration)
  const getMapUrl = () => {
    // Use a placeholder map image from OpenStreetMap
    const lat = property.location?.latitude || 40.7128;
    const lng = property.location?.longitude || -74.0060;
    const zoom = 15;
    
    return `https://www.openstreetmap.org/export/embed.html?bbox=${lng-0.01}%2C${lat-0.01}%2C${lng+0.01}%2C${lat+0.01}&amp;layer=mapnik&amp;marker=${lat}%2C${lng}`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Location</h3>
      
      <div className="relative rounded-lg overflow-hidden" style={{ height: '300px' }}>
        {/* Map Container */}
        <div className={`w-full h-full ${!isLoggedIn ? 'blur-sm' : ''}`}>
          <iframe 
            width="100%" 
            height="100%" 
            frameBorder="0" 
            scrolling="no" 
            marginHeight={0} 
            marginWidth={0} 
            src={getMapUrl()} 
            style={{ border: 0 }}
            title="Property Location Map"
          />
        </div>
        
        {/* Address Display */}
        <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 p-3">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <div>
              {isLoggedIn ? (
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {property.address?.street}, {property.address?.city}, {property.address?.state} {property.address?.zipCode}
                </p>
              ) : (
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {property.city}, {property.state}
                  <span className="ml-1 text-gray-500 dark:text-gray-400">(Log in to see full address)</span>
                </p>
              )}
            </div>
          </div>
        </div>
        
        {/* Login Overlay for Logged-out Users */}
        {!isLoggedIn && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
            <div className="text-center p-4">
              <p className="text-white font-medium mb-3">Log in to view the exact location</p>
              <button
                onClick={onLogin}
                className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200"
              >
                Log In
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Neighborhood Info - Only visible to logged-in users */}
      {isLoggedIn && property.neighborhood && (
        <div className="mt-4">
          <h4 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-2">Neighborhood: {property.neighborhood.name}</h4>
          <div className="flex items-center mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">Safety Rating:</span>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg 
                  key={i} 
                  className={`w-4 h-4 ${
                    i < Math.floor(property.neighborhood?.safetyRating || property.neighborhood?.rating || 0) 
                      ? 'text-blue-400' 
                      : 'text-gray-300 dark:text-gray-600'
                  }`} 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {property.neighborhood.description}
          </p>
        </div>
      )}
    </div>
  );
};

export default PropertyMap; 