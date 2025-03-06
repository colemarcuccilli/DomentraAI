import React from 'react';
import { FundingRequest } from './FundingRequestCard';

interface AIMatchmakingSuggestionsProps {
  suggestions: FundingRequest[];
  onViewDeal: (request: FundingRequest) => void;
}

/**
 * AIMatchmakingSuggestions - A breathtaking, mobile-first component
 * for displaying AI-driven funding opportunity suggestions with elegant animations.
 */
const AIMatchmakingSuggestions: React.FC<AIMatchmakingSuggestionsProps> = ({
  suggestions,
  onViewDeal
}) => {
  if (!suggestions || suggestions.length === 0) return null;
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6">
      <h2 className="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-4 flex items-center">
        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
        </svg>
        Top Picks for You
      </h2>
      
      <div className="space-y-3">
        {suggestions.map((suggestion) => (
          <div 
            key={suggestion.id}
            className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
            onClick={() => onViewDeal(suggestion)}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0 hidden sm:block">
                <img 
                  src={suggestion.imageUrl} 
                  alt={suggestion.propertyAddress} 
                  className="w-12 h-12 rounded-md object-cover"
                />
              </div>
              <div className="ml-0 sm:ml-3 flex-1">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      {suggestion.city}, {suggestion.state}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {suggestion.fundingType} • ${suggestion.amount.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-primary-600 dark:text-primary-400">{suggestion.projectedReturn}% ROI</span>
                  </div>
                </div>
                <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                  Matches your investment criteria—{suggestion.timeRemaining} days left to fund
                </p>
              </div>
            </div>
            <div className="mt-2 flex justify-end">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onViewDeal(suggestion);
                }}
                className="text-xs text-primary-600 dark:text-primary-400 font-medium hover:text-primary-700 dark:hover:text-primary-300"
              >
                View now →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIMatchmakingSuggestions; 