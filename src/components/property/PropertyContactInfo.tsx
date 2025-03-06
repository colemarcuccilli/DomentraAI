import React from 'react';
import { Property } from '../../types/property';

interface PropertyContactInfoProps {
  property: Property;
  isLoggedIn: boolean;
  onLogin: () => void;
}

/**
 * PropertyContactInfo - A component that displays contact information for the property
 * seller or agent. For logged-out users, it shows limited information with a login prompt.
 */
const PropertyContactInfo: React.FC<PropertyContactInfoProps> = ({
  property,
  isLoggedIn,
  onLogin
}) => {
  // Use seller data from property or fallback to default values
  const seller = {
    name: property.seller?.name || property.sellerInfo?.name || "Property Owner",
    company: property.seller?.company || "Real Estate Company",
    phone: property.seller?.phone || property.sellerInfo?.contact || "(555) 123-4567",
    email: property.seller?.email || "contact@realestate.com",
    image: property.seller?.image || "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Contact Information</h3>
      
      <div className="flex items-center">
        {/* Seller/Agent Image */}
        <div className="mr-4">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
            {isLoggedIn ? (
              <img 
                src={seller.image} 
                alt={seller.name} 
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
        
        {/* Seller/Agent Details */}
        <div>
          <h4 className="text-md font-medium text-gray-800 dark:text-gray-200">
            {isLoggedIn ? seller.name : "Property Contact"}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {isLoggedIn ? seller.company : "Log in to see details"}
          </p>
        </div>
      </div>
      
      {/* Contact Details - Only visible to logged-in users */}
      {isLoggedIn ? (
        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm">
            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="text-gray-700 dark:text-gray-300">{seller.phone}</span>
          </div>
          
          <div className="flex items-center text-sm">
            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="text-gray-700 dark:text-gray-300">{seller.email}</span>
          </div>
          
          <div className="flex items-center text-sm">
            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-gray-700 dark:text-gray-300">Listed {property.listedDate ? new Date(property.listedDate).toLocaleDateString() : "Recently"}</span>
          </div>
        </div>
      ) : (
        <div className="mt-4">
          <button
            onClick={onLogin}
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200 flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            Log in to contact seller
          </button>
        </div>
      )}
    </div>
  );
};

export default PropertyContactInfo; 