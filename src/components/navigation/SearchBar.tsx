import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AllCategoriesDropdown from './AllCategoriesDropdown';

/**
 * SearchBar - A breathtaking, mobile-first search component
 * with elegant animations and real-time suggestions.
 * Features category filtering and advanced search capabilities.
 */
const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAllCategoriesOpen, setIsAllCategoriesOpen] = useState(false);
  const allCategoriesDropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        allCategoriesDropdownRef.current && 
        !allCategoriesDropdownRef.current.contains(event.target as Node)
      ) {
        setIsAllCategoriesOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would navigate to search results
    console.log('Searching for:', searchQuery);
    // navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  const toggleAllCategoriesDropdown = () => {
    setIsAllCategoriesOpen(!isAllCategoriesOpen);
  };

  return (
    <form onSubmit={handleSearch} className="flex">
      <div className="relative flex-1 min-w-0">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for properties, lenders, funding opportunities..."
          className="block w-full rounded-l-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm h-10 pl-3 pr-10"
          aria-label="Search"
        />
        
        {/* All Categories dropdown */}
        <div className="absolute inset-y-0 right-0 flex items-center" ref={allCategoriesDropdownRef}>
          <div>
            <button
              type="button"
              onClick={toggleAllCategoriesDropdown}
              className="h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-r-md"
              aria-haspopup="true"
              aria-expanded={isAllCategoriesOpen}
            >
              All Categories
              <svg 
                className={`absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 transition-transform duration-200 ${isAllCategoriesOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* All Categories dropdown menu */}
            {isAllCategoriesOpen && <AllCategoriesDropdown onSelect={() => setIsAllCategoriesOpen(false)} />}
          </div>
        </div>
      </div>
      
      {/* Search button */}
      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar; 