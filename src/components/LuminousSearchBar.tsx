import { useState, useRef, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

/**
 * LuminousSearchBar - An awe-inspiring, mobile-first search component
 * that elegantly adapts to any screen size while providing powerful
 * property search capabilities. Features intelligent auto-suggestions,
 * advanced filtering, and accessibility compliance.
 */
const LuminousSearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [propertyType, setPropertyType] = useState<string>('all');
  const [location, setLocation] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  
  // Close advanced search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsAdvancedOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Mock suggestions based on search term
  useEffect(() => {
    if (searchTerm.length > 2) {
      // In a real app, this would be an API call
      const mockSuggestions = [
        `${searchTerm} in New York`,
        `${searchTerm} in Los Angeles`,
        `${searchTerm} in Chicago`,
        `${searchTerm} properties for investment`,
      ];
      setSuggestions(mockSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would trigger a search with all parameters
    console.log('Searching for:', {
      searchTerm,
      priceRange,
      propertyType,
      location
    });
    
    // Close advanced search after submission
    setIsAdvancedOpen(false);
  };
  
  const toggleAdvancedSearch = () => {
    setIsAdvancedOpen(!isAdvancedOpen);
  };
  
  return (
    <div 
      ref={searchRef}
      className="w-full max-w-4xl mx-auto relative animate-fade-in"
      aria-label="Property search"
    >
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            placeholder="Search for properties, locations, or keywords..."
            className="input-field pr-24 h-14 text-lg shadow-md focus:shadow-lg"
            aria-label="Search properties"
          />
          <div className="absolute right-2 top-2 flex space-x-2">
            <button
              type="button"
              onClick={toggleAdvancedSearch}
              className="p-2 text-gray-500 hover:text-primary-600 transition-colors duration-200"
              aria-label="Advanced search options"
              aria-expanded={isAdvancedOpen}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </button>
            <button
              type="submit"
              className="bg-primary-600 hover:bg-primary-700 text-white p-2 rounded-md transition-colors duration-200"
              aria-label="Search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Suggestions dropdown */}
        {isFocused && suggestions.length > 0 && (
          <div className="absolute z-10 w-full bg-white dark:bg-gray-800 mt-1 rounded-md shadow-lg animate-slide-up">
            <ul className="py-1">
              {suggestions.map((suggestion, index) => (
                <li key={index}>
                  <button
                    type="button"
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
                    onClick={() => {
                      setSearchTerm(suggestion);
                      setSuggestions([]);
                    }}
                  >
                    {suggestion}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Advanced search panel */}
        {isAdvancedOpen && (
          <div className={`mt-2 p-4 bg-white dark:bg-gray-800 rounded-md shadow-lg ${isMobile ? 'animate-slide-up' : 'animate-fade-in'}`}>
            <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-2 gap-6'}`}>
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="City, State, or ZIP"
                  className="input-field"
                />
              </div>
              
              <div>
                <label htmlFor="property-type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Property Type
                </label>
                <select
                  id="property-type"
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="input-field"
                >
                  <option value="all">All Properties</option>
                  <option value="single-family">Single Family</option>
                  <option value="multi-family">Multi-Family</option>
                  <option value="commercial">Commercial</option>
                  <option value="land">Land</option>
                </select>
              </div>
              
              <div className="col-span-full">
                <label htmlFor="price-range" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Price Range: ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    id="price-min"
                    min="0"
                    max="1000000"
                    step="10000"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <input
                    type="range"
                    id="price-max"
                    min="0"
                    max="10000000"
                    step="50000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setPriceRange([0, 1000000]);
                  setPropertyType('all');
                  setLocation('');
                }}
                className="mr-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
              >
                Reset
              </button>
              <button
                type="submit"
                className="btn-primary"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default LuminousSearchBar; 