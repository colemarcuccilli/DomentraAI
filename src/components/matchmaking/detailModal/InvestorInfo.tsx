import React from 'react';
import { FundingRequest } from '../FundingRequestCard';

interface InvestorInfoProps {
  request: FundingRequest;
}

/**
 * InvestorInfo - A breathtaking, mobile-first component
 * for displaying investor information with elegant typography and verification badges.
 */
const InvestorInfo: React.FC<InvestorInfoProps> = ({ request }) => {
  const {
    investorName,
    investorCompany,
    investorVerified,
    investorYearsInBusiness,
    investorCompletedDeals,
    investorRating
  } = request;
  
  return (
    <div className="mb-6">
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Investor</p>
      <div className="flex items-center">
        <p className="text-lg font-medium text-gray-900 dark:text-white">{investorName}</p>
        {investorVerified && (
          <div className="ml-2 text-green-500 dark:text-green-400 tooltip" data-tip="Domentra Verified">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
            </svg>
          </div>
        )}
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400">{investorCompany}</p>
      
      <div className="mt-2 grid grid-cols-3 gap-2">
        <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
          <p className="text-sm font-medium text-gray-900 dark:text-white">{investorYearsInBusiness} years</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">In Business</p>
        </div>
        <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
          <p className="text-sm font-medium text-gray-900 dark:text-white">{investorCompletedDeals}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Deals (12mo)</p>
        </div>
        <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
          <div className="flex items-center justify-center">
            <p className="text-sm font-medium text-gray-900 dark:text-white">{investorRating}</p>
            <svg className="w-4 h-4 text-yellow-400 ml-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Rating</p>
        </div>
      </div>
    </div>
  );
};

export default InvestorInfo; 