import React, { useState, useEffect } from 'react';

interface SearchBarProps {
  searchQuery: string;
  onSearch: (query: string) => void;
}

/**
 * SearchBar - A breathtaking search component for the Help page
 * with elegant animations and intuitive design. Features real-time
 * search suggestions and a clean, accessible interface.
 */
const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, onSearch }) => {
  const [inputValue, setInputValue] = useState(searchQuery);
  
  // Update input value when searchQuery prop changes
  useEffect(() => {
    setInputValue(searchQuery);
  }, [searchQuery]);
  
  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(inputValue);
  };
  
  // Handle clear search
  const handleClear = () => {
    setInputValue('');
    onSearch('');
  };
  
  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg pl-12 pr-10 py-4 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-sm"
          placeholder="Ask a question about Domentra..."
          value={inputValue}
          onChange={handleInputChange}
          aria-label="Search help content"
        />
        
        {/* Search Icon */}
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
        </div>
        
        {/* Clear Button (only shown when there's input) */}
        {inputValue && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            onClick={handleClear}
            aria-label="Clear search"
          >
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </form>
      
      {/* Search Suggestions */}
      <div className="mt-2 flex flex-wrap gap-2">
        <span className="text-sm text-gray-500 dark:text-gray-400 mr-1">Popular searches:</span>
        <button 
          onClick={() => onSearch('how to find property')}
          className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
        >
          How to find property
        </button>
        <button 
          onClick={() => onSearch('arv')}
          className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
        >
          ARV
        </button>
        <button 
          onClick={() => onSearch('risk score')}
          className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
        >
          Risk Score
        </button>
        <button 
          onClick={() => onSearch('upload documents')}
          className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
        >
          Upload documents
        </button>
        <button 
          onClick={() => onSearch('funding')}
          className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
        >
          Funding
        </button>
      </div>
    </div>
  );
};

export default SearchBar; 