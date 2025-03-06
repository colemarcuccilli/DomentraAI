import React from 'react';
import { FundingRequest } from '../FundingRequestCard';

interface PropertyHeaderProps {
  request: FundingRequest;
}

/**
 * PropertyHeader - A breathtaking, mobile-first header component
 * for displaying property information with elegant typography and layout.
 */
const PropertyHeader: React.FC<PropertyHeaderProps> = ({ request }) => {
  const {
    fundingType,
    propertyAddress,
    city,
    state,
    amount,
    projectedReturn,
    riskScore,
    riskScoreValue
  } = request;
  
  // Risk score color
  const getRiskScoreColor = (score: string) => {
    switch (score) {
      case 'Low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'High':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };
  
  return (
    <div className="mb-6">
      <div className="flex items-center mb-2">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 mr-2">
          {fundingType}
        </span>
        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskScoreColor(riskScore)}`}>
          {riskScore} Risk ({riskScoreValue}/100)
        </div>
      </div>
      
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
        {propertyAddress}
      </h2>
      
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
        {city}, {state}
      </p>
      
      <div className="flex flex-wrap items-center gap-4 mb-2">
        <div className="flex flex-col">
          <span className="text-sm text-gray-500 dark:text-gray-400">Funding Amount</span>
          <span className="text-2xl font-bold text-gray-900 dark:text-white">${amount.toLocaleString()}</span>
        </div>
        
        <div className="flex flex-col">
          <span className="text-sm text-gray-500 dark:text-gray-400">Offered Return</span>
          <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">{projectedReturn}%</span>
        </div>
      </div>
    </div>
  );
};

export default PropertyHeader; 