import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

/**
 * FundBox - A breathtaking call-to-action component for real estate
 * funders looking to finance properties. Features elegant animations
 * and intuitive dropdown options.
 */
const FundBox: React.FC = () => {
  const [isFundDropdownOpen, setIsFundDropdownOpen] = useState(false);
  const fundDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
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

  const toggleFundDropdown = () => {
    setIsFundDropdownOpen(!isFundDropdownOpen);
  };

  // Fund options
  const fundOptions = [
    { id: 'all-funding', name: 'All Funding Opportunities', path: '/marketplace?type=funding' },
    { id: 'lenders', name: 'Connect with Lenders', path: '/marketplace?type=lenders' },
    { id: 'investment-partners', name: 'Find Investment Partners', path: '/matchmaking?type=investment' },
    { id: 'loan-programs', name: 'Loan Programs', path: '/loan-management' },
    { id: 'escrow-services', name: 'Escrow Services', path: '/marketplace?type=escrow' },
  ];

  return (
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
  );
};

export default FundBox; 