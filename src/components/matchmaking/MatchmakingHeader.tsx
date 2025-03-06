import React from 'react';
import { Link } from 'react-router-dom';

/**
 * MatchmakingHeader - A breathtaking, mobile-first header component
 * for the Matchmaking page with elegant typography and call-to-action.
 */
const MatchmakingHeader: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 md:p-6 mb-6">
      <h1 className="text-2xl md:text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
        Matchmaking: Vetted Funding Opportunities for Lenders
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-4 md:mb-6 max-w-3xl">
        Explore high-ROI deals with verified investors—backed by Domentra's standards and offered returns
      </p>
      <div className="flex flex-wrap gap-3">
        <Link 
          to="/marketplace"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
        >
          Explore Deals
        </Link>
        <Link 
          to="/help"
          className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
        >
          How It Works
        </Link>
      </div>
    </div>
  );
};

export default MatchmakingHeader; 