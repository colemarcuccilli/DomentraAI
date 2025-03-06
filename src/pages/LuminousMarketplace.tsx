import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import StellarPropertyCard from '../components/StellarPropertyCard';
import PropertyDetailModal from '../components/modals/PropertyDetailModal';
import { Property } from '../types/property';
import { mockProperties } from '../data/mockProperties';

type PropertyType = 'all' | 'single-family' | 'multi-family' | 'commercial' | 'land';
type SortOption = 'newest' | 'price-high-low' | 'price-low-high';

const LuminousMarketplace: React.FC = () => {
  const [activePropertyType, setActivePropertyType] = useState<PropertyType>('all');
  const [activeSortOption, setActiveSortOption] = useState<SortOption>('newest');
  
  const [properties, setProperties] = useState<Property[]>(mockProperties);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const isMobile = useMediaQuery({ maxWidth: 768 });
  
  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Handle property type change
  const handlePropertyTypeChange = (type: string) => {
    setActivePropertyType(type as PropertyType);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 300);
  };

  // Handle sort change
  const handleSortChange = (option: string) => {
    setActiveSortOption(option as SortOption);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 300);
  };

  // Get filtered properties
  const getFilteredProperties = () => {
    let filtered = [...properties];
    
    // Filter by property type
    if (activePropertyType !== 'all') {
      filtered = filtered.filter(p => p.propertyType.toLowerCase().includes(activePropertyType));
    }
    
    // Sort properties
    filtered = sortItems(filtered);
    
    return filtered;
  };

  // Sort items based on active sort option
  const sortItems = (items: Property[]) => {
    switch (activeSortOption) {
      case 'price-high-low':
        return [...items].sort((a, b) => b.price - a.price);
      case 'price-low-high':
        return [...items].sort((a, b) => a.price - b.price);
      case 'newest':
      default:
        // Assuming newer items are at the beginning of the array
        return items;
    }
  };

  // Get featured properties
  const getFeaturedProperties = () => {
    const filteredProperties = getFilteredProperties();
    return filteredProperties.filter(property => property.isFeatured);
  };

  const featuredProperties = getFeaturedProperties();
  const filteredProperties = getFilteredProperties();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Modals */}
      {selectedProperty && (
        <PropertyDetailModal 
          property={selectedProperty} 
          isOpen={!!selectedProperty}
          onClose={() => setSelectedProperty(null)}
          isLoggedIn={true} // You can set this based on your authentication state
          onLogin={() => console.log('Login clicked')}
          onRequestFunding={() => console.log('Request funding:', selectedProperty)}
          onSaveProperty={() => console.log('Save property:', selectedProperty)}
          onShareProperty={() => console.log('Share property:', selectedProperty)}
          onContactSeller={() => console.log('Contact seller:', selectedProperty)}
        />
      )}
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-36">
        {/* Featured Section */}
        {featuredProperties.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Featured Funding Opportunities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredProperties.map((property) => (
                <div key={property.id} className="animate-fade-in">
                  <StellarPropertyCard 
                    property={property} 
                    variant="featured" 
                    onClick={(property: Property) => setSelectedProperty(property)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Properties */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            {activePropertyType === 'all' ? 'All Funding Opportunities' : `${activePropertyType.replace('-', ' ')} Funding Opportunities`}
          </h2>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="animate-pulse bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                  <div className="h-48 bg-gray-300 dark:bg-gray-700"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></div>
                    <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-full mt-4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProperties.map((property) => (
                <div key={property.id} className="animate-fade-in">
                  <StellarPropertyCard 
                    property={property} 
                    onClick={(property: Property) => setSelectedProperty(property)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">No funding opportunities found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LuminousMarketplace; 