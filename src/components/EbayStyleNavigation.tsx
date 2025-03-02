import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

/**
 * EbayStyleNavigation - A breathtaking, mobile-first navigation component
 * inspired by eBay's intuitive design. Features elegant animations, 
 * category navigation, and a powerful search experience that adapts
 * seamlessly across all device sizes.
 */
const EbayStyleNavigation: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isAllCategoriesOpen, setIsAllCategoriesOpen] = useState(false);
  const [isBuyDropdownOpen, setIsBuyDropdownOpen] = useState(false);
  const [isFundDropdownOpen, setIsFundDropdownOpen] = useState(false);
  const categoryDropdownRef = useRef<HTMLDivElement>(null);
  const allCategoriesDropdownRef = useRef<HTMLDivElement>(null);
  const buyDropdownRef = useRef<HTMLDivElement>(null);
  const fundDropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        categoryDropdownRef.current && 
        !categoryDropdownRef.current.contains(event.target as Node)
      ) {
        setIsCategoryDropdownOpen(false);
      }
      
      if (
        allCategoriesDropdownRef.current && 
        !allCategoriesDropdownRef.current.contains(event.target as Node)
      ) {
        setIsAllCategoriesOpen(false);
      }

      if (
        buyDropdownRef.current && 
        !buyDropdownRef.current.contains(event.target as Node)
      ) {
        setIsBuyDropdownOpen(false);
      }

      if (
        fundDropdownRef.current && 
        !fundDropdownRef.current.contains(event.target as Node)
      ) {
        setIsFundDropdownOpen(false);
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

  const toggleCategoryDropdown = () => {
    setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
    if (isAllCategoriesOpen) setIsAllCategoriesOpen(false);
    if (isBuyDropdownOpen) setIsBuyDropdownOpen(false);
    if (isFundDropdownOpen) setIsFundDropdownOpen(false);
  };

  const toggleAllCategoriesDropdown = () => {
    setIsAllCategoriesOpen(!isAllCategoriesOpen);
    if (isCategoryDropdownOpen) setIsCategoryDropdownOpen(false);
    if (isBuyDropdownOpen) setIsBuyDropdownOpen(false);
    if (isFundDropdownOpen) setIsFundDropdownOpen(false);
  };

  const toggleBuyDropdown = () => {
    setIsBuyDropdownOpen(!isBuyDropdownOpen);
    if (isCategoryDropdownOpen) setIsCategoryDropdownOpen(false);
    if (isAllCategoriesOpen) setIsAllCategoriesOpen(false);
    if (isFundDropdownOpen) setIsFundDropdownOpen(false);
  };

  const toggleFundDropdown = () => {
    setIsFundDropdownOpen(!isFundDropdownOpen);
    if (isCategoryDropdownOpen) setIsCategoryDropdownOpen(false);
    if (isAllCategoriesOpen) setIsAllCategoriesOpen(false);
    if (isBuyDropdownOpen) setIsBuyDropdownOpen(false);
  };

  // Real estate specific categories for the dropdown
  const categories = [
    { id: 'properties', name: 'Properties', path: '/marketplace' },
    { id: 'investment-properties', name: 'Investment Properties', path: '/marketplace?type=investment' },
    { id: 'fix-and-flips', name: 'Fix & Flips', path: '/marketplace?type=fix-and-flip' },
    { id: 'lenders', name: 'Lenders', path: '/marketplace?type=lenders' },
    { id: 'funding-opportunities', name: 'Funding Opportunities', path: '/marketplace?type=funding' },
    { id: 'matchmaking', name: 'Matchmaking', path: '/matchmaking' },
    { id: 'loan-management', name: 'Loan Management', path: '/loan-management' },
    { id: 'document-center', name: 'Document Center', path: '/document-center' },
    { id: 'integrations', name: 'Integrations', path: '/integrations' },
    { id: 'help', name: 'Help Center', path: '/help' },
  ];

  // Property-specific filters
  const propertyFilters = [
    { id: 'location', name: 'Location' },
    { id: 'price', name: 'Price Range' },
    { id: 'bedrooms', name: 'Bedrooms' },
    { id: 'property-type', name: 'Property Type' },
    { id: 'investment-potential', name: 'Investment Potential' },
    { id: 'roi', name: 'Expected ROI' },
  ];

  // Buy options
  const buyOptions = [
    { id: 'all-properties', name: 'All Properties', path: '/marketplace' },
    { id: 'investment-properties', name: 'Investment Properties', path: '/marketplace?type=investment' },
    { id: 'fix-and-flips', name: 'Fix & Flips', path: '/marketplace?type=fix-and-flip' },
    { id: 'rental-properties', name: 'Rental Properties', path: '/marketplace?type=rental' },
    { id: 'commercial-properties', name: 'Commercial Properties', path: '/marketplace?type=commercial' },
  ];

  // Fund options
  const fundOptions = [
    { id: 'all-funding', name: 'All Funding Opportunities', path: '/marketplace?type=funding' },
    { id: 'lenders', name: 'Connect with Lenders', path: '/marketplace?type=lenders' },
    { id: 'investment-partners', name: 'Find Investment Partners', path: '/matchmaking?type=investment' },
    { id: 'loan-programs', name: 'Loan Programs', path: '/loan-management' },
    { id: 'escrow-services', name: 'Escrow Services', path: '/marketplace?type=escrow' },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 py-2 px-4 shadow-sm" aria-label="Main Navigation">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex-shrink-0" aria-label="Domentra Home">
              <img 
                src="../assets/images/domentra-logo.png" 
                alt="Domentra Logo" 
                className="h-10 w-auto"
              />
            </Link>
            
            {/* Shop by category dropdown */}
            <div className="relative" ref={categoryDropdownRef}>
              <button
                type="button"
                onClick={toggleCategoryDropdown}
                className="flex items-center text-gray-700 hover:text-gray-900 text-sm font-medium"
                aria-expanded={isCategoryDropdownOpen}
                aria-haspopup="true"
              >
                Shop by category
                <svg 
                  className={`ml-1 h-4 w-4 transition-transform duration-200 ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Category dropdown menu */}
              {isCategoryDropdownOpen && (
                <div 
                  className="absolute left-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 animate-fade-in"
                  role="menu"
                  aria-orientation="vertical"
                >
                  <div className="py-1" role="none">
                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Property Types
                    </div>
                    <Link
                      to="/marketplace"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      All Properties
                    </Link>
                    <Link
                      to="/marketplace?type=investment"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      Investment Properties
                    </Link>
                    <Link
                      to="/marketplace?type=fix-and-flip"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      Fix & Flips
                    </Link>
                    <Link
                      to="/marketplace?type=rental"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      Rental Properties
                    </Link>
                    
                    <div className="border-t border-gray-100 my-1"></div>
                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Funding
                    </div>
                    <Link
                      to="/marketplace?type=lenders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      Lenders
                    </Link>
                    <Link
                      to="/marketplace?type=funding"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      Funding Opportunities
                    </Link>
                    
                    <div className="border-t border-gray-100 my-1"></div>
                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Platform Features
                    </div>
                    {categories.slice(5).map((category) => (
                      <Link
                        key={category.id}
                        to={category.path}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        role="menuitem"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Buy Box */}
            <div className="relative" ref={buyDropdownRef}>
              <button
                type="button"
                onClick={toggleBuyDropdown}
                className="flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                aria-expanded={isBuyDropdownOpen}
                aria-haspopup="true"
              >
                <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Buy
                <svg 
                  className={`ml-1 h-4 w-4 transition-transform duration-200 ${isBuyDropdownOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Buy dropdown menu */}
              {isBuyDropdownOpen && (
                <div 
                  className="absolute left-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 animate-fade-in"
                  role="menu"
                  aria-orientation="vertical"
                >
                  <div className="py-1" role="none">
                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      I want to buy...
                    </div>
                    {buyOptions.map((option) => (
                      <Link
                        key={option.id}
                        to={option.path}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        role="menuitem"
                      >
                        {option.name}
                      </Link>
                    ))}
                    <div className="border-t border-gray-100 my-1"></div>
                    <Link
                      to="/matchmaking"
                      className="block px-4 py-2 text-sm text-primary-600 font-medium hover:bg-gray-100"
                      role="menuitem"
                    >
                      Find my perfect property match →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Fund Box */}
            <div className="relative" ref={fundDropdownRef}>
              <button
                type="button"
                onClick={toggleFundDropdown}
                className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                aria-expanded={isFundDropdownOpen}
                aria-haspopup="true"
              >
                <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Fund
                <svg 
                  className={`ml-1 h-4 w-4 transition-transform duration-200 ${isFundDropdownOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Fund dropdown menu */}
              {isFundDropdownOpen && (
                <div 
                  className="absolute left-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 animate-fade-in"
                  role="menu"
                  aria-orientation="vertical"
                >
                  <div className="py-1" role="none">
                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Funding Options
                    </div>
                    {fundOptions.map((option) => (
                      <Link
                        key={option.id}
                        to={option.path}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        role="menuitem"
                      >
                        {option.name}
                      </Link>
                    ))}
                    <div className="border-t border-gray-100 my-1"></div>
                    <Link
                      to="/loan-management"
                      className="block px-4 py-2 text-sm text-primary-600 font-medium hover:bg-gray-100"
                      role="menuitem"
                    >
                      Apply for funding now →
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Search form */}
          <div className="flex-1 max-w-3xl mx-4">
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
                    {isAllCategoriesOpen && (
                      <div 
                        className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 animate-fade-in"
                        role="menu"
                        aria-orientation="vertical"
                      >
                        <div className="py-1" role="none">
                          <button
                            type="button"
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 font-medium"
                            role="menuitem"
                            onClick={() => {
                              // Handle category selection
                              setIsAllCategoriesOpen(false);
                            }}
                          >
                            All Categories
                          </button>
                          <div className="border-t border-gray-100 my-1"></div>
                          {categories.slice(0, 5).map((category) => (
                            <button
                              key={category.id}
                              type="button"
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                              role="menuitem"
                              onClick={() => {
                                // Handle category selection
                                setIsAllCategoriesOpen(false);
                              }}
                            >
                              {category.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
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
          </div>
          
          {/* Advanced link */}
          <div>
            <Link 
              to="/advanced-search" 
              className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
            >
              Advanced
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default EbayStyleNavigation; 