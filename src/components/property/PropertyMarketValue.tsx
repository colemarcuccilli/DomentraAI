import React from 'react';
import { Property } from '../../types/property';

interface PropertyMarketValueProps {
  property: Property;
}

/**
 * PropertyMarketValue - A component that displays market analysis and comps
 * to justify the investment, providing data-driven confidence for lending decisions.
 */
const PropertyMarketValue: React.FC<PropertyMarketValueProps> = ({ property }) => {
  // Mock comparable properties data
  const comps = [
    {
      address: '456 Oak Street',
      price: property.arv - 50000,
      sqft: property.squareFeet - 200,
      pricePerSqft: Math.round((property.arv - 50000) / (property.squareFeet - 200)),
      soldDate: '2 months ago',
      distance: '0.3 miles'
    },
    {
      address: '789 Maple Avenue',
      price: property.arv + 150000,
      sqft: property.squareFeet + 300,
      pricePerSqft: Math.round((property.arv + 150000) / (property.squareFeet + 300)),
      soldDate: '1 month ago',
      distance: '0.5 miles'
    },
    {
      address: '321 Pine Road',
      price: property.arv - 100000,
      sqft: property.squareFeet - 100,
      pricePerSqft: Math.round((property.arv - 100000) / (property.squareFeet - 100)),
      soldDate: '3 months ago',
      distance: '0.7 miles'
    }
  ];
  
  // Calculate average price per sqft from comps
  const avgPricePerSqft = Math.round(
    comps.reduce((sum, comp) => sum + comp.pricePerSqft, 0) / comps.length
  );
  
  return (
    <section id="market-value" className="py-6 border-b border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Market Value</h2>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Market Analysis</h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Comps in {property.city}'s {property.neighborhood?.name || 'area'} show renovated {property.propertyType.toLowerCase()}s selling for 
            <span className="font-semibold text-blue-600 dark:text-blue-400"> ${(property.arv - 150000).toLocaleString()}</span> to 
            <span className="font-semibold text-blue-600 dark:text-blue-400"> ${(property.arv + 150000).toLocaleString()}</span>, 
            supporting an ARV of <span className="font-semibold text-blue-600 dark:text-blue-400">${property.arv.toLocaleString()}</span>. 
            {property.city}'s robust housing market and high demand for {property.yearBuilt < 1950 ? 'historical' : 'modern'} properties 
            ensure strong returns for lenders backing this deal.
          </p>
        </div>
        
        {/* Market Trends */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Market Trends</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="text-sm text-gray-500 dark:text-gray-400">Average Price/Sqft</div>
              <div className="text-xl font-semibold text-blue-600 dark:text-blue-400">${avgPricePerSqft}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">Based on recent sales</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="text-sm text-gray-500 dark:text-gray-400">Market Appreciation</div>
              <div className="text-xl font-semibold text-blue-600 dark:text-blue-400">5.8% <span className="text-sm">annually</span></div>
              <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">Last 12 months</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="text-sm text-gray-500 dark:text-gray-400">Days on Market</div>
              <div className="text-xl font-semibold text-blue-600 dark:text-blue-400">18 <span className="text-sm">days</span></div>
              <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">Area average</div>
            </div>
          </div>
        </div>
        
        {/* Comparable Properties */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Comparable Properties</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Address</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Price</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Sqft</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Price/Sqft</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Sold Date</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Distance</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {comps.map((comp, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{comp.address}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">${comp.price.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{comp.sqft.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">${comp.pricePerSqft}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{comp.soldDate}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{comp.distance}</td>
                  </tr>
                ))}
                <tr className="bg-blue-50 dark:bg-blue-900/20">
                  <td className="px-4 py-3 text-sm font-medium text-blue-600 dark:text-blue-400">Subject Property (ARV)</td>
                  <td className="px-4 py-3 text-sm font-medium text-blue-600 dark:text-blue-400">${property.arv.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm font-medium text-blue-600 dark:text-blue-400">{property.squareFeet.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm font-medium text-blue-600 dark:text-blue-400">${Math.round(property.arv / property.squareFeet)}</td>
                  <td className="px-4 py-3 text-sm font-medium text-blue-600 dark:text-blue-400">After Rehab</td>
                  <td className="px-4 py-3 text-sm font-medium text-blue-600 dark:text-blue-400">-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyMarketValue; 