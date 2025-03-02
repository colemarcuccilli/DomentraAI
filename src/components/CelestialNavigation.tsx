import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

interface CelestialNavigationProps {
  isSidebar?: boolean;
  isOpen?: boolean;
  toggleSidebar?: () => void;
}

/**
 * CelestialNavigation - A breathtaking, mobile-first navigation component
 * that adapts seamlessly across all device sizes while maintaining an
 * awe-inspiring visual presence. Features smooth animations, intelligent
 * responsive behavior, and accessibility compliance.
 */
const CelestialNavigation: React.FC<CelestialNavigationProps> = ({ 
  isSidebar = false, 
  isOpen = true, 
  toggleSidebar = () => {} 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const location = useLocation();
  
  // Track scroll position for dynamic navigation styling
  useEffect(() => {
    if (!isSidebar) {
      const handleScroll = () => {
        setScrollPosition(window.scrollY);
      };
      
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [isSidebar]);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Helper function to determine if a link is active
  const isActive = (path: string) => {
    return location.pathname === path || 
           (location.pathname === '/' && path === '/marketplace');
  };

  // Get active link class
  const getNavLinkClass = (path: string) => {
    const baseClass = "flex items-center px-4 py-3 rounded-lg transition-colors duration-200";
    const activeClass = "bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400";
    const inactiveClass = "text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-gray-700 hover:text-primary-600 dark:hover:text-primary-400";
    
    return `${baseClass} ${isActive(path) ? activeClass : inactiveClass}`;
  };

  // Render sidebar navigation
  if (isSidebar) {
    return (
      <aside 
        className={`bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 ease-in-out z-50 ${
          isOpen 
            ? 'w-64 opacity-100 translate-x-0' 
            : isMobile 
              ? 'w-0 opacity-0 -translate-x-full' 
              : 'w-20 opacity-100 translate-x-0'
        } ${isMobile ? 'fixed inset-y-0 left-0' : 'sticky top-0 h-screen'}`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-primary-600 text-white">
            <Link 
              to="/" 
              className="flex items-center"
              aria-label="Domentra Home"
            >
              <div className="w-8 h-8 rounded-full bg-white text-primary-600 flex items-center justify-center mr-2 font-bold text-lg">
                D
              </div>
              <span className={`font-display font-bold transition-all duration-300 ${
                isOpen || isMobile ? 'text-xl' : 'text-xs opacity-0 w-0'
              }`}>
                {isOpen || isMobile ? 'Domentra' : ''}
              </span>
              <span className="text-xs ml-1 opacity-70">beta</span>
            </Link>
            
            {isMobile && (
              <button
                onClick={toggleSidebar}
                className="text-white hover:text-gray-200 focus:outline-none"
                aria-label="Close sidebar"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
            
            {!isMobile && (
              <button
                onClick={toggleSidebar}
                className="text-white hover:text-gray-200 focus:outline-none"
                aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                  )}
                </svg>
              </button>
            )}
          </div>
          
          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-2">
              <li>
                <Link 
                  to="/marketplace" 
                  className={getNavLinkClass("/marketplace")}
                  aria-label="Browse Properties"
                >
                  <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  {(isOpen || isMobile) && <span>Marketplace</span>}
                </Link>
              </li>
              <li>
                <Link 
                  to="/matchmaking" 
                  className={getNavLinkClass("/matchmaking")}
                  aria-label="AI Matchmaking"
                >
                  <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  {(isOpen || isMobile) && <span>Matchmaking</span>}
                </Link>
              </li>
              <li>
                <Link 
                  to="/loan-management" 
                  className={getNavLinkClass("/loan-management")}
                  aria-label="Loan Management"
                >
                  <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {(isOpen || isMobile) && <span>Loan Management</span>}
                </Link>
              </li>
              <li>
                <Link 
                  to="/document-center" 
                  className={getNavLinkClass("/document-center")}
                  aria-label="Document Center"
                >
                  <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {(isOpen || isMobile) && <span>Document Center</span>}
                </Link>
              </li>
              <li>
                <Link 
                  to="/integrations" 
                  className={getNavLinkClass("/integrations")}
                  aria-label="Integrations"
                >
                  <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                  </svg>
                  {(isOpen || isMobile) && <span>Integrations</span>}
                </Link>
              </li>
              <li>
                <Link 
                  to="/help" 
                  className={getNavLinkClass("/help")}
                  aria-label="Help Center"
                >
                  <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {(isOpen || isMobile) && <span>Help</span>}
                </Link>
              </li>
            </ul>
          </nav>
          
          {/* User Actions */}
          {(isOpen || isMobile) && (
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <Link 
                to="/login" 
                className="block w-full text-center mb-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors duration-200"
                aria-label="Log In"
              >
                Log In
              </Link>
              <Link 
                to="/signup" 
                className="block w-full text-center bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
                aria-label="Sign Up"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </aside>
    );
  }

  // Dynamic navigation styling based on scroll position
  const navClasses = `
    fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out
    ${scrollPosition > 50 ? 'bg-white dark:bg-gray-900 shadow-md py-2' : 'bg-transparent py-4'}
  `;

  // Render top navigation (original implementation)
  return (
    <nav className={navClasses} aria-label="Main Navigation">
      <div className="container-fluid mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 animate-fade-in">
            <Link 
              to="/" 
              className="flex items-center"
              aria-label="Domentra Home"
            >
              <span className="text-primary-600 dark:text-primary-400 text-2xl font-display font-bold">
                Domentra
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation Links */}
          {!isMobile && (
            <div className="hidden md:flex items-center space-x-8 animate-fade-in">
              <Link 
                to="/marketplace" 
                className={`font-medium transition-colors duration-200 ${isActive('/marketplace') ? 'text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'}`}
                aria-label="Browse Properties"
              >
                Marketplace
              </Link>
              <Link 
                to="/matchmaking" 
                className={`font-medium transition-colors duration-200 ${isActive('/matchmaking') ? 'text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'}`}
                aria-label="AI Matchmaking"
              >
                Matchmaking
              </Link>
              <Link 
                to="/loan-management" 
                className={`font-medium transition-colors duration-200 ${isActive('/loan-management') ? 'text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'}`}
                aria-label="Loan Management"
              >
                Loan Management
              </Link>
              <Link 
                to="/document-center" 
                className={`font-medium transition-colors duration-200 ${isActive('/document-center') ? 'text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'}`}
                aria-label="Document Center"
              >
                Document Center
              </Link>
              <Link 
                to="/integrations" 
                className={`font-medium transition-colors duration-200 ${isActive('/integrations') ? 'text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'}`}
                aria-label="Integrations"
              >
                Integrations
              </Link>
              <Link 
                to="/help" 
                className={`font-medium transition-colors duration-200 ${isActive('/help') ? 'text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'}`}
                aria-label="Help Center"
              >
                Help
              </Link>
            </div>
          )}
          
          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4 animate-fade-in">
            <Link 
              to="/login" 
              className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors duration-200"
              aria-label="Log In"
            >
              Log In
            </Link>
            <Link 
              to="/signup" 
              className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
              aria-label="Sign Up"
            >
              Sign Up
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          {isMobile && (
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed */}
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                /* Icon when menu is open */
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobile && (
        <div 
          className={`md:hidden ${isMenuOpen ? 'block animate-slide-up' : 'hidden'}`} 
          id="mobile-menu"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-900 shadow-lg rounded-b-lg">
            <Link 
              to="/marketplace" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/marketplace') ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-gray-800 hover:text-primary-600 dark:hover:text-primary-400'}`}
              aria-label="Browse Properties"
            >
              Marketplace
            </Link>
            <Link 
              to="/matchmaking" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/matchmaking') ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-gray-800 hover:text-primary-600 dark:hover:text-primary-400'}`}
              aria-label="AI Matchmaking"
            >
              Matchmaking
            </Link>
            <Link 
              to="/loan-management" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/loan-management') ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-gray-800 hover:text-primary-600 dark:hover:text-primary-400'}`}
              aria-label="Loan Management"
            >
              Loan Management
            </Link>
            <Link 
              to="/document-center" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/document-center') ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-gray-800 hover:text-primary-600 dark:hover:text-primary-400'}`}
              aria-label="Document Center"
            >
              Document Center
            </Link>
            <Link 
              to="/integrations" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/integrations') ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-gray-800 hover:text-primary-600 dark:hover:text-primary-400'}`}
              aria-label="Integrations"
            >
              Integrations
            </Link>
            <Link 
              to="/help" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/help') ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-gray-800 hover:text-primary-600 dark:hover:text-primary-400'}`}
              aria-label="Help Center"
            >
              Help
            </Link>
            <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
              <Link 
                to="/login" 
                className="block px-3 py-2 rounded-md text-base font-medium text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-gray-800"
                aria-label="Log In"
              >
                Log In
              </Link>
              <Link 
                to="/signup" 
                className="block px-3 py-2 mt-2 rounded-md text-base font-medium bg-primary-600 hover:bg-primary-700 text-white"
                aria-label="Sign Up"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default CelestialNavigation; 