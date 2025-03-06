import React from 'react';
import { FundingRequest } from '../FundingRequestCard';

interface MarketDetailsProps {
  request: FundingRequest;
}

/**
 * MarketDetails - A breathtaking, mobile-first component
 * for displaying market details with elegant typography and layout.
 */
const MarketDetails: React.FC<MarketDetailsProps> = ({ request }) => {
  const {
    marketDescription,
    neighborhoodDescription,
    arvMin,
    arvMax,
    arv
  } = request;
  
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
        Market Analysis
      </h3>
      
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Market Overview</h4>
        <p className="text-gray-600 dark:text-gray-400">{marketDescription}</p>
      </div>
      
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Neighborhood</h4>
        <p className="text-gray-600 dark:text-gray-400">{neighborhoodDescription}</p>
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Comparable Sales Range</h4>
        <div className="flex items-center justify-between">
          <span className="text-gray-600 dark:text-gray-400">${arvMin.toLocaleString()}</span>
          <div className="flex-1 mx-4">
            <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
              <div 
                className="absolute h-4 w-4 top-1/2 -translate-y-1/2 bg-primary-600 dark:bg-primary-500 rounded-full"
                style={{ 
                  left: `${((arv - arvMin) / (arvMax - arvMin)) * 100}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              ></div>
            </div>
          </div>
          <span className="text-gray-600 dark:text-gray-400">${arvMax.toLocaleString()}</span>
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">Projected ARV</p>
          <p className="text-xl font-bold text-primary-600 dark:text-primary-400">${arv.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default MarketDetails; 