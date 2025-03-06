import React, { useState } from 'react';

interface UnifiedSearchProps {
  onSearch: (query: string, type: 'properties' | 'funding') => void;
}

/**
 * UnifiedSearch - A breathtaking search component that allows users to search
 * across properties and funding requests with a sleek, modern interface.
 */
const UnifiedSearch: React.FC<UnifiedSearchProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery, 'properties'); // Default to properties, type is controlled by filter bar now
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative flex items-center">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent sm:text-sm transition-colors duration-200"
          placeholder="Search properties, funding requests, locations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          <button
            type="submit"
            className="text-gray-400 hover:text-primary-500 focus:outline-none transition-colors duration-200"
          >
            <span className="sr-only">Search</span>
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </form>
  );
};

export default UnifiedSearch; 