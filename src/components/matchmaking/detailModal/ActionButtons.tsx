import React from 'react';
import { FundingRequest } from '../FundingRequestCard';

interface ActionButtonsProps {
  request: FundingRequest;
  onFundDeal: (request: FundingRequest) => void;
  onContactInvestor: (request: FundingRequest) => void;
  onSaveDeal: (request: FundingRequest) => void;
  onShareDeal: (request: FundingRequest) => void;
}

/**
 * ActionButtons - A breathtaking, mobile-first component
 * for displaying action buttons with elegant animations and hover effects.
 */
const ActionButtons: React.FC<ActionButtonsProps> = ({
  request,
  onFundDeal,
  onContactInvestor,
  onSaveDeal,
  onShareDeal
}) => {
  return (
    <div className="mb-8">
      {/* Primary Actions */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <button
          onClick={() => onFundDeal(request)}
          className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-md transition-all duration-200 flex items-center justify-center shadow-sm hover:shadow transform hover:-translate-y-0.5"
        >
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Fund Deal
        </button>
        <button
          onClick={() => onContactInvestor(request)}
          className="bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-md transition-all duration-200 flex items-center justify-center shadow-sm hover:shadow transform hover:-translate-y-0.5"
        >
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          Contact Investor
        </button>
      </div>
      
      {/* Secondary Actions */}
      <div className="flex justify-between">
        <a 
          href="#" 
          className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium flex items-center"
        >
          <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          View Verified Contracts
        </a>
        
        <div className="flex space-x-2">
          <button
            onClick={() => onSaveDeal(request)}
            className="inline-flex items-center justify-center p-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="Save Deal"
          >
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
          <button
            onClick={() => onShareDeal(request)}
            className="inline-flex items-center justify-center p-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="Share Deal"
          >
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActionButtons; 