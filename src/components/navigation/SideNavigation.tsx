import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

/**
 * SideNavigation - A breathtaking, mobile-first component
 * for the main application navigation with elegant hover effects.
 */
const SideNavigation: React.FC = () => {
  const location = useLocation();
  
  // Navigation items
  const navItems = [
    {
      name: 'Matchmaking',
      path: '/matchmaking',
      icon: (
        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
        </svg>
      )
    },
    {
      name: 'My Funding',
      path: '/funding',
      icon: (
        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      subItems: [
        {
          name: 'My Requests',
          path: '/my-requests',
          highlight: false
        },
        {
          name: 'Funded Deals',
          path: '/funding/deals',
          highlight: false
        }
      ]
    },
    {
      name: 'Negotiations',
      path: '/negotiations',
      icon: (
        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      )
    },
    {
      name: 'Document Center',
      path: '/document-center',
      icon: (
        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      name: 'Profile',
      path: '/profile',
      icon: (
        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      name: 'Settings',
      path: '/settings',
      icon: (
        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    }
  ];
  
  // Check if a path is active
  const isActive = (path: string) => {
    // For hash router, we need to check without the hash
    const currentPath = location.pathname;
    return currentPath === path || currentPath.startsWith(`${path}/`);
  };
  
  // Check if a subitem is active
  const isSubItemActive = (path: string) => {
    // For hash router, we need to check without the hash
    const currentPath = location.pathname;
    return currentPath === path;
  };
  
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm h-full">
      <div className="px-4 py-5 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-center">
          <img
            className="h-8"
            src="./logo.svg"
            alt="Domentra"
          />
          <span className="ml-2 text-xl font-bold text-primary-600 dark:text-primary-400">
            Domentra
          </span>
        </div>
      </div>
      
      <div className="px-2 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.name}>
              {!item.subItems ? (
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors duration-150 ${
                      isActive
                        ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`
                  }
                >
                  <span className="mr-3 text-gray-500 dark:text-gray-400">
                    {item.icon}
                  </span>
                  {item.name}
                </NavLink>
              ) : (
                <div className="mb-2">
                  <div
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-md ${
                      isActive(item.path)
                        ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <span className="mr-3 text-gray-500 dark:text-gray-400">
                      {item.icon}
                    </span>
                    {item.name}
                  </div>
                  
                  <ul className="mt-1 pl-10 space-y-1">
                    {item.subItems.map((subItem) => (
                      <li key={subItem.name}>
                        {subItem.name === 'My Requests' ? (
                          <NavLink
                            to="/my-requests"
                            className={({ isActive }) =>
                              `block px-4 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${
                                isActive
                                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                              } ${
                                subItem.highlight
                                  ? 'border-l-2 border-primary-500 dark:border-primary-400'
                                  : ''
                              }`
                            }
                          >
                            {subItem.name}
                          </NavLink>
                        ) : (
                          <NavLink
                            to={subItem.path}
                            className={({ isActive }) =>
                              `block px-4 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${
                                isActive
                                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                              } ${
                                subItem.highlight
                                  ? 'border-l-2 border-primary-500 dark:border-primary-400'
                                  : ''
                              }`
                            }
                          >
                            {subItem.name}
                          </NavLink>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      
      {/* Create Funding Request Button */}
      <div className="px-4 py-4 mt-6 border-t border-gray-200 dark:border-gray-700">
        <NavLink
          to="/funding/create"
          className="flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200 transform hover:scale-105 animate-pulse-subtle"
        >
          <svg className="mr-2 -ml-1 h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          <span className="font-bold">Create Funding Request</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default SideNavigation; 