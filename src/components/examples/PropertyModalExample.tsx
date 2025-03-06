import React, { useState } from 'react';
import { Property } from '../../types/property';
import PropertyDetailModal from '../modals/PropertyDetailModal';
import { mockProperties } from '../../data/mockProperties';

/**
 * PropertyModalExample - A component that demonstrates how to use the PropertyDetailModal
 * with both logged-in and logged-out states.
 */
const PropertyModalExample: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Sample property for demonstration
  const sampleProperty = mockProperties[0];
  
  const handleOpenModal = (property: Property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
  const handleLogin = () => {
    setIsLoggedIn(true);
    // In a real app, this would redirect to login page or open login modal
    alert('In a real app, this would open a login modal or redirect to login page');
  };
  
  const handleRequestFunding = () => {
    // In a real app, this would open a funding request form
    alert('Opening funding request form...');
  };
  
  const handleSaveProperty = () => {
    // In a real app, this would save the property to user's favorites
    alert('Property saved to favorites!');
  };
  
  const handleShareProperty = () => {
    // In a real app, this would open a share dialog
    alert('Opening share dialog...');
  };
  
  const handleContactSeller = () => {
    // In a real app, this would open a contact form
    alert('Opening contact form...');
  };
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Property Modal Example</h1>
      
      <div className="flex flex-col space-y-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Login Status</h2>
          <div className="flex items-center">
            <span className="mr-4">Currently: {isLoggedIn ? 'Logged In' : 'Logged Out'}</span>
            <button
              onClick={() => setIsLoggedIn(!isLoggedIn)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
              {isLoggedIn ? 'Log Out' : 'Log In'}
            </button>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Sample Property</h2>
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="md:w-1/4 mb-4 md:mb-0 md:mr-4">
              <img 
                src={sampleProperty.imageUrls[0]} 
                alt={sampleProperty.title} 
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
            <div className="md:w-3/4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{sampleProperty.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{sampleProperty.city}, {sampleProperty.state}</p>
              <p className="text-lg font-bold text-blue-600 dark:text-blue-400 mt-2">${sampleProperty.price.toLocaleString()}</p>
              <p className="text-gray-700 dark:text-gray-300 mt-2 line-clamp-2">{sampleProperty.description}</p>
              <button
                onClick={() => handleOpenModal(sampleProperty)}
                className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                View Property Details
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Property Detail Modal */}
      {selectedProperty && (
        <PropertyDetailModal
          property={selectedProperty}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          isLoggedIn={isLoggedIn}
          onLogin={handleLogin}
          onRequestFunding={handleRequestFunding}
          onSaveProperty={handleSaveProperty}
          onShareProperty={handleShareProperty}
          onContactSeller={handleContactSeller}
        />
      )}
    </div>
  );
};

export default PropertyModalExample; 