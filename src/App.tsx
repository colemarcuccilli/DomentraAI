import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import './App.css';
import CosmicFooter from './components/CosmicFooter';
import LuminousMarketplace from './pages/LuminousMarketplace';
import CelestialMatchmaking from './pages/CelestialMatchmaking';
import RadiantLoanManagement from './pages/RadiantLoanManagement';
import DocumentCenter from './pages/DocumentCenter';
import Integrations from './pages/Integrations';
import Help from './pages/Help';

// Import our new navigation components
import { TopNavigation, SideNavigation } from './components/navigation';

/**
 * App - The main application component that handles routing and layout.
 * Implements a mobile-first, desktop-perfect design with stunning visuals.
 */
function App() {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [useNewNavigation, setUseNewNavigation] = useState(true); // Toggle between navigation styles

  // Update sidebar state when screen size changes
  useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Top Navigation */}
        {useNewNavigation && <TopNavigation />}
        
        <div className="flex flex-col md:flex-row flex-1">
          {/* Sidebar Navigation */}
          {useNewNavigation && <SideNavigation />}
          
          {/* Main Content */}
          <div className={`flex-1 flex flex-col transition-all duration-300 ${
            useNewNavigation ? 'md:ml-64 pt-16' : 'md:ml-0 w-full'
          }`}>
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
                <Route path="/help" element={<Help />} />
                <Route path="/login" element={<div className="p-8 text-center">Login Page Coming Soon</div>} />
                <Route path="/signup" element={<div className="p-8 text-center">Signup Page Coming Soon</div>} />
                {/* Add more routes as they are developed */}
              </Routes>
            </main>
            
            {/* Footer */}
            <CosmicFooter />
          </div>
        </div>
        
        {/* Style Toggle Button (for development purposes) */}
        <button 
          onClick={() => setUseNewNavigation(!useNewNavigation)}
          className="fixed bottom-4 right-4 bg-primary-600 text-white p-2 rounded-full shadow-lg z-50"
          aria-label="Toggle navigation style"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </Router>
  );
}

export default App;
