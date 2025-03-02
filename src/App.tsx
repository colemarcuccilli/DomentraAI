import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import './App.css';
import CosmicFooter from './components/CosmicFooter';
import LuminousMarketplace from './pages/LuminousMarketplace';
import CelestialNavigation from './components/CelestialNavigation';
import CelestialMatchmaking from './pages/CelestialMatchmaking';
import RadiantLoanManagement from './pages/RadiantLoanManagement';
import DocumentCenter from './pages/DocumentCenter';
import Integrations from './pages/Integrations';

/**
 * App - The main application component that handles routing and layout.
 * Implements a mobile-first, desktop-perfect design with stunning visuals.
 */
function App() {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  // Update sidebar state when screen size changes
  useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Router>
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Sidebar Navigation */}
        <CelestialNavigation 
          isSidebar={true} 
          isOpen={sidebarOpen} 
          toggleSidebar={toggleSidebar} 
        />
        
        {/* Main Content */}
        <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen && !isMobile ? 'md:ml-0' : 'md:ml-0 w-full'}`}>
          {/* Mobile Header with Toggle Button */}
          {isMobile && (
            <header className="bg-white dark:bg-gray-800 shadow-sm p-4 flex items-center">
              <button 
                onClick={toggleSidebar}
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 focus:outline-none"
                aria-label="Toggle sidebar"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div className="ml-4 text-xl font-bold text-primary-600 dark:text-primary-400">
                Domentra
                <span className="text-xs ml-1 opacity-70">beta</span>
              </div>
            </header>
          )}
          
          {/* Page Content */}
          <main className="flex-grow p-0 md:p-4 w-full">
            <Routes>
              <Route path="/" element={<LuminousMarketplace />} />
              <Route path="/marketplace" element={<LuminousMarketplace />} />
              <Route path="/matchmaking" element={<CelestialMatchmaking />} />
              
              {/* Loan Management Routes */}
              <Route path="/loan-management" element={<Navigate to="/loan-management/overview" replace />} />
              <Route path="/loan-management/:tab" element={<RadiantLoanManagement />} />
              
              <Route path="/document-center" element={<DocumentCenter />} />
              <Route path="/integrations" element={<Integrations />} />
              <Route path="/help" element={<div className="p-8 text-center">Help Page Coming Soon</div>} />
              <Route path="/login" element={<div className="p-8 text-center">Login Page Coming Soon</div>} />
              <Route path="/signup" element={<div className="p-8 text-center">Signup Page Coming Soon</div>} />
              {/* Add more routes as they are developed */}
            </Routes>
          </main>
          
          {/* Footer */}
          <CosmicFooter />
        </div>
      </div>
    </Router>
  );
}

export default App;
