import React from 'react';
import { Property } from '../../types/property';

interface PropertyNeighborhoodProps {
  property: Property;
}

/**
 * PropertyNeighborhood - A component that displays investment-relevant neighborhood
 * highlights, emphasizing factors that boost ARV and ROI.
 */
const PropertyNeighborhood: React.FC<PropertyNeighborhoodProps> = ({ property }) => {
  // Mock neighborhood data
  const neighborhoodData = {
    walkScore: 85,
    transitScore: 78,
    crimeRate: 'Low',
    schoolRating: 8.2,
    amenities: [
      'Restaurants and Cafes',
      'Shopping Centers',
      'Parks and Recreation',
      'Public Transportation',
      'Cultural Attractions'
    ],
    economicTrends: {
      propertyValueGrowth: '6.2%',
      rentalYield: '4.8%',
      vacancyRate: '2.1%'
    }
  };
  
  return (
    <section id="neighborhood" className="py-6 border-b border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Neighborhood</h2>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
        {/* Neighborhood Overview */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Neighborhood Overview</h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            The {property.neighborhood?.name || 'surrounding area'} offers proximity to top dining, shopping, and cultural attractions, 
            driving property demand. With a safety rating of {property.neighborhood?.safetyRating || 4.2}/5 and strong economic indicators, 
            this location is ideal for high-value resale or rental income. The neighborhood's {neighborhoodData.propertyValueGrowth} annual 
            property value growth outpaces the city average, making it a prime investment target.
          </p>
        </div>
        
        {/* Neighborhood Ratings */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Neighborhood Ratings</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="text-sm text-gray-500 dark:text-gray-400">Walk Score</div>
              <div className="text-xl font-semibold text-blue-600 dark:text-blue-400">{neighborhoodData.walkScore}/100</div>
              <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">Very Walkable</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="text-sm text-gray-500 dark:text-gray-400">Transit Score</div>
              <div className="text-xl font-semibold text-blue-600 dark:text-blue-400">{neighborhoodData.transitScore}/100</div>
              <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">Excellent Transit</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="text-sm text-gray-500 dark:text-gray-400">Crime Rate</div>
              <div className="text-xl font-semibold text-blue-600 dark:text-blue-400">{neighborhoodData.crimeRate}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">Below City Average</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="text-sm text-gray-500 dark:text-gray-400">School Rating</div>
              <div className="text-xl font-semibold text-blue-600 dark:text-blue-400">{neighborhoodData.schoolRating}/10</div>
              <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">Above Average</div>
            </div>
          </div>
        </div>
        
        {/* Economic Indicators */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Economic Indicators</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="text-sm text-gray-500 dark:text-gray-400">Property Value Growth</div>
              <div className="text-xl font-semibold text-blue-600 dark:text-blue-400">{neighborhoodData.economicTrends.propertyValueGrowth}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">Annual (Last 5 Years)</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="text-sm text-gray-500 dark:text-gray-400">Rental Yield</div>
              <div className="text-xl font-semibold text-blue-600 dark:text-blue-400">{neighborhoodData.economicTrends.rentalYield}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">Average for Area</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="text-sm text-gray-500 dark:text-gray-400">Vacancy Rate</div>
              <div className="text-xl font-semibold text-blue-600 dark:text-blue-400">{neighborhoodData.economicTrends.vacancyRate}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">Below City Average</div>
            </div>
          </div>
        </div>
        
        {/* Neighborhood Map */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Neighborhood Map</h3>
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden h-64">
            {/* In a real app, this would be an interactive map */}
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-gray-500 dark:text-gray-400">Interactive neighborhood map would be displayed here</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
            {neighborhoodData.amenities.map((amenity, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 p-2 rounded text-center">
                <span className="text-sm text-gray-700 dark:text-gray-300">{amenity}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyNeighborhood; 