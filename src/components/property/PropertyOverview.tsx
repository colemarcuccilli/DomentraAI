import React from 'react';
import { Property } from '../../types/property';

interface PropertyOverviewProps {
  property: Property;
}

/**
 * PropertyOverview - A component that displays a concise summary of the property's
 * investment appeal, focusing on financial metrics to attract lenders.
 */
const PropertyOverview: React.FC<PropertyOverviewProps> = ({ property }) => {
  // Calculate investment metrics
  const rehabEstimate = property.arv - property.purchasePrice;
  const arvPercentage = Math.round((property.purchasePrice / property.arv) * 100);
  const potentialProfit = rehabEstimate * 0.5; // Simplified calculation for example
  
  return (
    <section id="overview" className="py-6 border-b border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Overview</h2>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          This {property.title} in {property.city}'s {property.neighborhood?.name || 'desirable neighborhood'} offers a lucrative fix-and-flip opportunity. 
          With a purchase price of <span className="font-semibold text-blue-600 dark:text-blue-400">${property.purchasePrice.toLocaleString()}</span> ({arvPercentage}% of ARV), 
          a <span className="font-semibold text-blue-600 dark:text-blue-400">${rehabEstimate.toLocaleString()}</span> rehab unlocks 
          a <span className="font-semibold text-blue-600 dark:text-blue-400">${property.arv.toLocaleString()}</span> ARV, 
          yielding a <span className="font-semibold text-blue-600 dark:text-blue-400">{property.roi}%</span> ROI 
          and <span className="font-semibold text-blue-600 dark:text-blue-400">${potentialProfit.toLocaleString()}</span> potential profit. 
          Low risk (Score: 80/100) makes it a lender's dream.
        </p>
        
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
            <div className="text-sm text-gray-500 dark:text-gray-400">Purchase Price</div>
            <div className="text-lg font-semibold text-blue-600 dark:text-blue-400">${property.purchasePrice.toLocaleString()}</div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
            <div className="text-sm text-gray-500 dark:text-gray-400">ARV</div>
            <div className="text-lg font-semibold text-blue-600 dark:text-blue-400">${property.arv.toLocaleString()}</div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
            <div className="text-sm text-gray-500 dark:text-gray-400">ROI</div>
            <div className="text-lg font-semibold text-blue-600 dark:text-blue-400">{property.roi}%</div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
            <div className="text-sm text-gray-500 dark:text-gray-400">Risk Score</div>
            <div className="text-lg font-semibold text-blue-600 dark:text-blue-400">80/100</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyOverview; 