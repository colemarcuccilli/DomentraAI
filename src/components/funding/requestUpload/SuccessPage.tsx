import React from 'react';
import { useNavigate } from 'react-router-dom';

interface SuccessPageProps {
  requestId?: string;
  onViewDashboard?: () => void;
  onCreateNew?: () => void;
}

/**
 * SuccessPage - A breathtaking, mobile-first component
 * that displays a success message after a funding request
 * has been successfully submitted.
 */
const SuccessPage: React.FC<SuccessPageProps> = ({ 
  requestId, 
  onViewDashboard, 
  onCreateNew 
}) => {
  const navigate = useNavigate();

  // Handle dashboard navigation
  const handleDashboardClick = () => {
    if (onViewDashboard) {
      onViewDashboard();
    } else {
      navigate('/dashboard');
    }
  };

  // Handle view requests navigation
  const handleViewRequestsClick = () => {
    navigate('/my-requests');
  };

  // Handle create new request
  const handleCreateNewClick = () => {
    if (onCreateNew) {
      onCreateNew();
    } else {
      navigate('/create-request');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 sm:p-10 text-center">
      {/* Success Icon */}
      <div className="w-24 h-24 mb-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
        <svg 
          className="w-12 h-12 text-green-600 dark:text-green-400" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M5 13l4 4L19 7" 
          />
        </svg>
      </div>
      
      {/* Success Message */}
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        Funding Request Submitted!
      </h1>
      
      <div className="max-w-md mb-8">
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
          Your funding request has been successfully submitted and is now pending verification.
          {requestId && (
            <span className="block mt-2 text-sm font-medium">
              Request ID: <span className="font-mono">{requestId}</span>
            </span>
          )}
        </p>
        
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Our team will review your request within 1-3 business days. You'll receive email notifications about the status of your request.
        </p>
        
        {/* Timeline */}
        <div className="relative border-l-2 border-primary-500 pl-6 py-2 mb-8 text-left">
          <div className="mb-6 relative">
            <div className="absolute -left-[25px] mt-1.5 w-4 h-4 rounded-full bg-primary-500"></div>
            <h3 className="text-md font-medium text-gray-900 dark:text-white">Verification</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Our team verifies your information (1-3 business days)
            </p>
          </div>
          
          <div className="mb-6 relative">
            <div className="absolute -left-[25px] mt-1.5 w-4 h-4 rounded-full bg-gray-300 dark:bg-gray-600"></div>
            <h3 className="text-md font-medium text-gray-900 dark:text-white">Listing</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Your request is listed on the marketplace
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute -left-[25px] mt-1.5 w-4 h-4 rounded-full bg-gray-300 dark:bg-gray-600"></div>
            <h3 className="text-md font-medium text-gray-900 dark:text-white">Funding</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Investors review and fund your request
            </p>
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleDashboardClick}
          className="px-6 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Return to Dashboard
        </button>
        
        <button
          onClick={handleViewRequestsClick}
          className="px-6 py-3 bg-primary-600 border border-transparent rounded-md shadow-sm text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          View My Requests
        </button>

        <button
          onClick={handleCreateNewClick}
          className="px-6 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Create Another Request
        </button>
      </div>
      
      {/* Support Information */}
      <div className="mt-12 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg max-w-md">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
          Need assistance?
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Contact our support team at <a href="mailto:support@domentra.com" className="text-primary-600 dark:text-primary-400 hover:underline">support@domentra.com</a> or call us at (555) 123-4567.
        </p>
      </div>
    </div>
  );
};

export default SuccessPage; 