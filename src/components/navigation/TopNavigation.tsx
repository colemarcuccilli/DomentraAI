import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserProfile } from '../../types/user';
import UnifiedSearch from '../search/UnifiedSearch';
import domentraLogo from '../../assets/images/domentra-logo.png';

interface TopNavigationProps {
  currentUser?: UserProfile | null;
}

/**
 * TopNavigation - A breathtaking, mobile-first top navigation bar
 * that houses the logo, app search functionality, user account features,
 * and deal listing access. Adapts seamlessly across all device sizes.
 */
const TopNavigation: React.FC<TopNavigationProps> = ({ 
  currentUser: propUser
}) => {
  // For development, always use a mock admin user
  const currentUser: UserProfile = {
    id: 'admin-dev',
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@domentra.com',
    role: 'ADMIN',
    permissions: {
      canListProperties: true,
      canSubmitLoanOffers: true,
      canManageUsers: true
    },
    verificationStatus: 'VERIFIED',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  
  const userMenuRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close user menu when clicking outside
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
      
      // Close notifications when clicking outside
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle search
  const handleSearch = (query: string) => {
    console.log('Search query:', query);
    // Implement search functionality
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left section: Logo and Search */}
          <div className="flex items-center flex-1">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <img
                  className="h-8 w-auto"
                  src={domentraLogo}
                  alt="Domentra"
                />
              </Link>
            </div>

            {/* Search Bar */}
            <div className="ml-4 flex-1 max-w-md">
              <UnifiedSearch onSearch={handleSearch} />
            </div>
          </div>

          {/* Right section: Help, Notifications, User */}
          <div className="flex items-center">
            {/* Help Button */}
            <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>

            {/* Notifications */}
            <div className="relative ml-3" ref={notificationsRef}>
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
              </button>
              
              {isNotificationsOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">Notifications</h3>
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                      {/* Notification items would go here */}
                      <div className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">New funding request</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">A new funding request has been submitted for your review.</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">2 hours ago</p>
                      </div>
                      <div className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Loan offer accepted</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Your loan offer for 123 Main St has been accepted.</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">1 day ago</p>
                      </div>
                    </div>
                    <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
                      <a href="#" className="text-xs text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300">View all notifications</a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="relative ml-3" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center text-sm rounded-full focus:outline-none"
              >
                <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                  {currentUser ? (
                    currentUser.firstName && currentUser.lastName ? (
                      <span className="text-gray-700 dark:text-gray-300 font-medium">
                        {currentUser.firstName[0]}{currentUser.lastName[0]}
                      </span>
                    ) : (
                      <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    )
                  ) : (
                    <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </button>
              
              {isUserMenuOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    {currentUser ? (
                      <>
                        <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {currentUser.firstName} {currentUser.lastName}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {currentUser.email}
                          </p>
                        </div>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                          role="menuitem"
                        >
                          Your Profile
                        </a>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                          role="menuitem"
                        >
                          Settings
                        </a>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                          role="menuitem"
                        >
                          Sign out
                        </a>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                          role="menuitem"
                        >
                          Sign in
                        </Link>
                        <Link
                          to="/signup"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                          role="menuitem"
                        >
                          Sign up
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavigation; 