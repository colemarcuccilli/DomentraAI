import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Property } from '../types/property';
import { mockProperties } from '../data/mockProperties';

const PropertyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Find property in mock data
        const foundProperty = mockProperties.find(p => p.id === id);
        if (foundProperty) {
          setProperty(foundProperty);
        } else {
          // Property not found
          navigate('/marketplace');
        }
      } catch (error) {
        console.error('Error fetching property:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchProperty();
    }
  }, [id, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-primary-600">Loading property details...</div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Property not found</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        {/* Property Header */}
        <div className="relative">
          <img 
            src={property.images[0]} 
            alt={property.title} 
            className="w-full h-64 object-cover sm:h-96"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-6">
            <h1 className="text-2xl font-bold text-white sm:text-3xl">{property.title}</h1>
            <p className="text-white/90 mt-2">{property.address}</p>
            <div className="mt-2 flex items-center">
              <span className="text-white font-bold text-xl">${property.price.toLocaleString()}</span>
              {property.isForSale && (
                <span className="ml-2 px-2 py-1 bg-green-500 text-white text-xs rounded-full">For Sale</span>
              )}
            </div>
          </div>
        </div>
        
        {/* Property Details */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-2">
              <h2 className="text-xl font-semibold mb-4">Property Details</h2>
              <p className="text-gray-700 mb-6">{property.description}</p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-500 text-sm">Property Type</p>
                  <p className="font-medium">{property.propertyType}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-500 text-sm">Bedrooms</p>
                  <p className="font-medium">{property.bedrooms}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-500 text-sm">Bathrooms</p>
                  <p className="font-medium">{property.bathrooms}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-500 text-sm">Square Feet</p>
                  <p className="font-medium">{property.squareFeet.toLocaleString()}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-500 text-sm">Year Built</p>
                  <p className="font-medium">{property.yearBuilt}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-500 text-sm">Lot Size</p>
                  <p className="font-medium">{property.lotSize.toLocaleString()} sqft</p>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold mb-3">Features</h3>
              <ul className="grid grid-cols-2 gap-2 mb-6">
                {property.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-semibold mb-4">Contact Agent</h3>
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-gray-300 mr-3"></div>
                  <div>
                    <p className="font-medium">{property.agent.name}</p>
                    <p className="text-gray-500 text-sm">{property.agent.company}</p>
                  </div>
                </div>
                <button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-md transition-colors duration-200">
                  Contact Agent
                </button>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Investment Potential</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-gray-500 text-sm">Estimated ROI</p>
                    <p className="font-medium text-green-600">{property.investmentDetails?.estimatedROI}%</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Cap Rate</p>
                    <p className="font-medium">{property.investmentDetails?.capRate}%</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Monthly Rental Income</p>
                    <p className="font-medium">${property.investmentDetails?.monthlyRentalIncome.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail; 