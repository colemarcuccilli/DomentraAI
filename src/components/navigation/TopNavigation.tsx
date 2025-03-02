import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import CategoryDropdown from './CategoryDropdown';
import BuyBox from './BuyBox';
import FundBox from './FundBox';

/**
 * TopNavigation - A breathtaking, mobile-first top navigation bar
 * that houses the logo, search functionality, and primary action buttons.
 * Adapts seamlessly across all device sizes.
 */
const TopNavigation: React.FC = () => {
  return (
    <nav className="bg-white border-b border-gray-200 py-2 px-4 shadow-sm" aria-label="Main Navigation">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo and Category Navigation */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex-shrink-0" aria-label="Domentra Home">
              <img 
                src="../assets/images/domentra-logo.png" 
                alt="Domentra Logo" 
                className="h-10 w-auto"
              />
            </Link>
            
            {/* Shop by category dropdown */}
            <CategoryDropdown />

            {/* Buy Box */}
            <BuyBox />

            {/* Fund Box */}
            <FundBox />
          </div>
          
          {/* Search form */}
          <div className="flex-1 max-w-3xl mx-4">
            <SearchBar />
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

export default TopNavigation; 