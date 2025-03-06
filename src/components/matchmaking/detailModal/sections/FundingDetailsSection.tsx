import React from 'react';
import { FundingRequest } from '../../FundingRequestCard';
import { formatLengthOfFunding } from '../utils/formatters';

interface FundingDetailsSectionProps {
  request: FundingRequest;
}

/**
 * FundingDetailsSection - A component for displaying funding details
 * with elegant typography and layout.
 */
const FundingDetailsSection: React.FC<FundingDetailsSectionProps> = ({ request }) => {
  const {
    amount,
    fundingType,
    exitStrategy,
    lengthOfFunding,
    timeRemaining,
    purchasePrice,
    arv
  } = request;
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Funding Details</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Funding Type</p>
          <p className="text-lg font-medium text-gray-900 dark:text-white">{fundingType}</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Amount Requested</p>
          <p className="text-lg font-medium text-gray-900 dark:text-white">${amount.toLocaleString()}</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Exit Strategy</p>
          <p className="text-lg font-medium text-gray-900 dark:text-white">{exitStrategy}</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Length of Funding</p>
          <p className="text-lg font-medium text-gray-900 dark:text-white">{formatLengthOfFunding(lengthOfFunding)}</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Time Remaining</p>
          <p className="text-lg font-medium text-gray-900 dark:text-white">{timeRemaining} days</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Purchase Price</p>
          <p className="text-lg font-medium text-gray-900 dark:text-white">${purchasePrice.toLocaleString()}</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">After Repair Value</p>
          <p className="text-lg font-medium text-gray-900 dark:text-white">${arv.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default FundingDetailsSection; 