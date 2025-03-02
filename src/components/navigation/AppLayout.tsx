import React from 'react';
import TopNavigation from './TopNavigation';
import SideNavigation from './SideNavigation';

/**
 * AppLayout - A breathtaking layout component that combines
 * the top navigation bar and side navigation to create a
 * cohesive, app-like experience. Features elegant spacing
 * and responsive design.
 */
interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <TopNavigation />
      
      {/* Side Navigation */}
      <SideNavigation />
      
      {/* Main Content */}
      <main className="pt-16 pl-64 transition-all duration-300">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AppLayout; 