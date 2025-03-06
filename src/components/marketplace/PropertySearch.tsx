import { useState, useRef, useEffect } from 'react';

/**
 * PropertySearch - A breathtaking, mobile-first search component
 * specifically designed for property searching in the marketplace.
 * Features elegant animations, filters, and intuitive design.
 */
const PropertySearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const filtersRef = useRef<HTMLDivElement>(null);

  // Close filters when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filtersRef.current && 
        !filtersRef.current.contains(event.target as Node)
      ) {
        setIsFiltersOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would filter properties
    console.log('Searching for properties:', searchQuery);
  };

  const toggleFilters = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Find Your Perfect Property</h2>
      
      <form onSubmit={handleSearch} className="space-y-4">
        {/* Main search input */}
        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by location, property type, or keyword..."
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm h-12 pl-10"
                aria-label="Search properties"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Filter button */}
          <div className="relative" ref={filtersRef}>
            <button
              type="button"
              onClick={toggleFilters}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              aria-expanded={isFiltersOpen}
            >
              <svg className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filters
            </button>
            
            {/* Filters dropdown */}
            {isFiltersOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg z-10 p-4 animate-fade-in">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="property-type" className="block text-sm font-medium text-gray-700">Property Type</label>
                    <select
                      id="property-type"
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                    >
                      <option value="">All Types</option>
                      <option value="residential">Residential</option>
                      <option value="commercial">Commercial</option>
                      <option value="industrial">Industrial</option>
                      <option value="land">Land</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="price-range" className="block text-sm font-medium text-gray-700">Price Range</label>
                    <select
                      id="price-range"
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                    >
                      <option value="">Any Price</option>
                      <option value="0-100000">$0 - $100,000</option>
                      <option value="100000-250000">$100,000 - $250,000</option>
                      <option value="250000-500000">$250,000 - $500,000</option>
                      <option value="500000-1000000">$500,000 - $1,000,000</option>
                      <option value="1000000+">$1,000,000+</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="investment-type" className="block text-sm font-medium text-gray-700">Investment Type</label>
                    <select
                      id="investment-type"
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                    >
                      <option value="">All Investments</option>
                      <option value="fix-flip">Fix & Flip</option>
                      <option value="rental">Rental</option>
                      <option value="development">Development</option>
                      <option value="commercial">Commercial</option>
                    </select>
                  </div>
                  
                  <div className="pt-2 flex justify-end space-x-2">
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      onClick={() => setIsFiltersOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      onClick={() => setIsFiltersOpen(false)}
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Search button */}
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Search Properties
          </button>
        </div>
        
        {/* Quick filters */}
        <div className="flex flex-wrap gap-2 pt-2">
          <span className="text-sm text-gray-500 self-center">Quick Filters:</span>
          <button
            type="button"
            className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-xs font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Fix & Flip
          </button>
          <button
            type="button"
            className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-xs font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Rental Properties
          </button>
          <button
            type="button"
            className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-xs font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            New Construction
          </button>
          <button
            type="button"
            className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-xs font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Commercial
          </button>
        </div>
      </form>
    </div>
  );
};

export default PropertySearch; 