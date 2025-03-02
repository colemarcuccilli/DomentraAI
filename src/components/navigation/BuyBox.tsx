import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

/**
 * BuyBox - A breathtaking call-to-action component for real estate
 * investors looking to purchase properties. Features elegant animations
 * and intuitive dropdown options.
 */
const BuyBox: React.FC = () => {
  const [isBuyDropdownOpen, setIsBuyDropdownOpen] = useState(false);
  const buyDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        buyDropdownRef.current && 
        !buyDropdownRef.current.contains(event.target as Node)
      ) {
        setIsBuyDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleBuyDropdown = () => {
    setIsBuyDropdownOpen(!isBuyDropdownOpen);
  };

  // Buy options
  const buyOptions = [
    { id: 'all-properties', name: 'All Properties', path: '/marketplace' },
    { id: 'investment-properties', name: 'Investment Properties', path: '/marketplace?type=investment' },
    { id: 'fix-and-flips', name: 'Fix & Flips', path: '/marketplace?type=fix-and-flip' },
    { id: 'rental-properties', name: 'Rental Properties', path: '/marketplace?type=rental' },
    { id: 'commercial-properties', name: 'Commercial Properties', path: '/marketplace?type=commercial' },
  ];

  return (
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
  );
};

export default BuyBox; 