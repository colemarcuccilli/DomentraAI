import React from 'react';
import { Property } from '../../types/property';

interface PropertyInvestmentDetailsProps {
  property: Property;
}

/**
 * PropertyInvestmentDetails - A component that displays investment-specific information
 * about a property, such as ARV, purchase price, ROI, cap rate, and risk score.
 */
const PropertyInvestmentDetails: React.FC<PropertyInvestmentDetailsProps> = ({ property }) => {
  // Calculate rehab estimate (difference between ARV and purchase price)
  const rehabEstimate = property.arv - property.purchasePrice;
  
  // Calculate potential profit
  const potentialProfit = property.arv - property.purchasePrice - rehabEstimate;
  
  // Calculate risk score (mock calculation - in a real app this would be more sophisticated)
  const riskScore = Math.min(100, Math.max(0, Math.round(
    (property.arv / property.purchasePrice) * 50 + 
    (property.neighborhood?.rating || 3) * 10
  )));
  
  // Determine risk level
  const getRiskLevel = (score: number) => {
    if (score >= 80) return { label: 'Low Risk', color: 'text-green-500' };
    if (score >= 60) return { label: 'Moderate Risk', color: 'text-yellow-500' };
    return { label: 'High Risk', color: 'text-red-500' };
  };
  
  const riskLevel = getRiskLevel(riskScore);

  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Investment Potential</h3>
      
      {/* Key Investment Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        <div className="bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm">
          <div className="text-sm text-gray-500 dark:text-gray-400">Purchase Price</div>
          <div className="text-lg font-semibold text-gray-900 dark:text-white">${property.purchasePrice.toLocaleString()}</div>
        </div>
        
        <div className="bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm">
          <div className="text-sm text-gray-500 dark:text-gray-400">ARV</div>
          <div className="text-lg font-semibold text-gray-900 dark:text-white">${property.arv.toLocaleString()}</div>
        </div>
        
        <div className="bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm">
          <div className="text-sm text-gray-500 dark:text-gray-400">Rehab Estimate</div>
          <div className="text-lg font-semibold text-gray-900 dark:text-white">${rehabEstimate.toLocaleString()}</div>
        </div>
        
        {property.roi !== undefined && (
          <div className="bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm">
            <div className="text-sm text-gray-500 dark:text-gray-400">ROI</div>
            <div className="text-lg font-semibold text-gray-900 dark:text-white">{property.roi}%</div>
          </div>
        )}
        
        {property.capRate !== undefined && (
          <div className="bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm">
            <div className="text-sm text-gray-500 dark:text-gray-400">Cap Rate</div>
            <div className="text-lg font-semibold text-gray-900 dark:text-white">{property.capRate}%</div>
          </div>
        )}
        
        <div className="bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm">
          <div className="text-sm text-gray-500 dark:text-gray-400">Potential Profit</div>
          <div className="text-lg font-semibold text-gray-900 dark:text-white">${potentialProfit.toLocaleString()}</div>
        </div>
      </div>
      
      {/* Risk Score */}
      <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Risk Score</h4>
          <div className={`text-sm font-medium ${riskLevel.color}`}>{riskLevel.label}</div>
        </div>
        
        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
          <div 
            className={`h-2.5 rounded-full ${
              riskScore >= 80 ? 'bg-green-500' : 
              riskScore >= 60 ? 'bg-yellow-500' : 
              'bg-red-500'
            }`} 
            style={{ width: `${riskScore}%` }}
          ></div>
        </div>
        
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          Score: {riskScore}/100
        </div>
      </div>
      
      {/* Market Insights */}
      {property.neighborhood && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Market Insights</h4>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <p>{property.neighborhood.description}</p>
            <div className="mt-2 flex items-center">
              <span className="text-gray-500 dark:text-gray-400 mr-2">Neighborhood Rating:</span>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i} 
                    className={`w-4 h-4 ${
                      i < Math.floor(property.neighborhood?.rating || 0) 
                        ? 'text-yellow-400' 
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
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyInvestmentDetails; 