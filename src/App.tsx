import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { UserProvider, useUser } from './contexts/UserContext';
import TopNavigation from './components/navigation/TopNavigation';
import SideNavigation from './components/navigation/SideNavigation';
import CelestialMatchmaking from './pages/CelestialMatchmaking';
import LuminousMarketplace from './pages/LuminousMarketplace';
import PropertyDetail from './pages/PropertyDetail';
import FundingDetail from './pages/FundingDetail';
import UserProfile from './pages/UserProfile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import HelpCenter from './pages/HelpCenter';
import NotFound from './pages/NotFound';
import MyRequests from './pages/MyRequests';
import FundingRequestContainer from './components/funding/FundingRequestContainer';
import NegotiationPage from './pages/NegotiationPage';
import Negotiations from './pages/Negotiations';
import DocumentCenter from './pages/DocumentCenter';
import './App.css';

const AppRoutes = () => {
  // For development, always consider the user as logged in
  // In a real app, you would use the useUser hook
  // const { currentUser, isLoading } = useUser();
  const currentUser = { id: 'admin-dev', name: 'Admin User', email: 'admin@domentra.com' };
  const isLoading = false;
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [window.location.pathname]);

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Side Navigation */}
      <SideNavigation />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavigation />
        
        <main className="flex-1 overflow-y-auto pt-16 pb-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <Routes>
              <Route path="/" element={<Navigate to="/matchmaking" replace />} />
              <Route path="/matchmaking" element={<CelestialMatchmaking />} />
              <Route path="/marketplace" element={<LuminousMarketplace />} />
              <Route path="/property/:id" element={<PropertyDetail />} />
              <Route path="/funding/create" element={<FundingRequestContainer />} />
              <Route path="/funding/:id" element={<FundingDetail />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/help" element={<HelpCenter />} />
              <Route path="/login" element={<Navigate to="/" />} />
              <Route path="/signup" element={<Navigate to="/" />} />
              <Route path="/my-requests" element={<MyRequests />} />
              <Route path="/create-request" element={<FundingRequestContainer />} />
              <Route path="/edit-request/:id" element={<FundingRequestContainer />} />
              <Route path="/negotiation/:negotiationId" element={<NegotiationPage />} />
              <Route path="/negotiations" element={<Negotiations />} />
              <Route path="/document-center" element={<DocumentCenter />} />
              <Route path="*" element={<Navigate to="/matchmaking" replace />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};

function App() {
  // Log the current URL for debugging
  useEffect(() => {
    console.log('Current URL:', window.location.href);
    console.log('Pathname:', window.location.pathname);
    console.log('Hash:', window.location.hash);
  }, []);

  return (
    <ThemeProvider>
      <UserProvider>
        <Router>
          <AppRoutes />
        </Router>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
