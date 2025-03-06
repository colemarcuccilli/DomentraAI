import React from 'react';
import { FundingRequest } from '../../FundingRequestCard';

interface InvestorInfoSectionProps {
  request: FundingRequest;
}

/**
 * InvestorInfoSection - A component for displaying investor information
 * with elegant typography and layout.
 */
const InvestorInfoSection: React.FC<InvestorInfoSectionProps> = ({ request }) => {
  const {
    investorName,
    investorCompany,
    investorVerified,
    investorYearsInBusiness,
    investorCompletedDeals,
    investorRating
  } = request;
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Investor Information</h3>
      
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-400">
          {investorName.charAt(0)}
        </div>
        <div className="ml-3">
          <p className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
            {investorName}
            {investorVerified && (
              <span className="ml-1 text-blue-500 dark:text-blue-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
              </span>
            )}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{investorCompany}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-6">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Years in Business</p>
          <p className="text-lg font-medium text-gray-900 dark:text-white">{investorYearsInBusiness}</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Completed Deals</p>
          <p className="text-lg font-medium text-gray-900 dark:text-white">{investorCompletedDeals}</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Rating</p>
          <div className="flex items-center">
            <p className="text-lg font-medium text-gray-900 dark:text-white mr-1">{investorRating}</p>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg 
                  key={i} 
                  className={`w-4 h-4 ${i < Math.floor(investorRating) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} 
                  fill="currentColor" 
                  viewBox="0 0 20 20" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestorInfoSection; 