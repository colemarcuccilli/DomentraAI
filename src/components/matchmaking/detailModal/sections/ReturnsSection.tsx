import React from 'react';
import { FundingRequest } from '../../FundingRequestCard';

interface ReturnsSectionProps {
  request: FundingRequest;
}

/**
 * ReturnsSection - A component for displaying returns information
 * with elegant typography and layout.
 */
const ReturnsSection: React.FC<ReturnsSectionProps> = ({ request }) => {
  const {
    projectedReturn,
    projectedReturnsVerified,
    potentialLenderProfit,
    potentialInvestorProfit
  } = request;
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Returns</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Offered Return</p>
          <div className="flex items-center">
            <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">{projectedReturn}%</p>
            {projectedReturnsVerified && (
              <div className="ml-2 text-blue-500 dark:text-blue-400 tooltip" data-tip="Offered Returns Verified">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                </svg>
              </div>
            )}
          </div>
        </div>
        
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Potential Lender Profit</p>
          <p className="text-lg font-medium text-gray-900 dark:text-white">${potentialLenderProfit.toLocaleString()}</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Potential Investor Profit</p>
          <p className="text-lg font-medium text-gray-900 dark:text-white">${potentialInvestorProfit.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default ReturnsSection; 