import React from 'react';

interface WelcomeScreenProps {
  onStart: () => void;
}

/**
 * WelcomeScreen - A breathtaking, mobile-first welcome component
 * that introduces users to the streamlined funding request creation process.
 */
const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="p-6 sm:p-10 flex flex-col items-center">
      {/* Header with gradient text */}
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
        Create a Funding Request
      </h1>
      
      {/* Welcome message */}
      <div className="text-center mb-8">
        <p className="text-xl text-gray-700 dark:text-gray-300 mb-4">
          List Your Vetted Funding Opportunity—Connect with Lenders on Domentra
        </p>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Complete the following steps to create your funding request. Your information will be verified by our team before being listed on the Matchmaking page.
        </p>
      </div>
      
      {/* Process overview */}
      <div className="w-full max-w-2xl bg-gray-50 dark:bg-gray-700/30 rounded-lg p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
          The Process:
        </h2>
        <ul className="space-y-3">
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 font-semibold text-sm">
              1
            </div>
            <span className="ml-3 text-gray-700 dark:text-gray-300">Property Details</span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 font-semibold text-sm">
              2
            </div>
            <span className="ml-3 text-gray-700 dark:text-gray-300">Funding Details</span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 font-semibold text-sm">
              3
            </div>
            <span className="ml-3 text-gray-700 dark:text-gray-300">Photos & Description</span>
          </li>
        </ul>
      </div>
      
      {/* Verification notice */}
      <div className="w-full max-w-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg p-4 mb-8">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              All funding requests undergo a verification process (1-3 business days) to ensure quality and protect our community. This includes contract review, financial projection validation, and property information verification.
            </p>
          </div>
        </div>
      </div>
      
      {/* Start button */}
      <button
        onClick={onStart}
        className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-md shadow-sm transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
      >
        Get Started
      </button>
    </div>
  );
};

export default WelcomeScreen; 