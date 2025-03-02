import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

/**
 * CategoryDropdown - An elegant dropdown for browsing
 * property categories with smooth animations and intuitive
 * organization of marketplace items.
 */
const CategoryDropdown: React.FC = () => {
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const categoryDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        categoryDropdownRef.current && 
        !categoryDropdownRef.current.contains(event.target as Node)
      ) {
        setIsCategoryDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleCategoryDropdown = () => {
    setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
  };

  // Platform features for the dropdown
  const platformFeatures = [
    { id: 'matchmaking', name: 'Matchmaking', path: '/matchmaking' },
    { id: 'loan-management', name: 'Loan Management', path: '/loan-management' },
    { id: 'document-center', name: 'Document Center', path: '/document-center' },
    { id: 'integrations', name: 'Integrations', path: '/integrations' },
    { id: 'help', name: 'Help Center', path: '/help' },
  ];

  return (
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
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown; 