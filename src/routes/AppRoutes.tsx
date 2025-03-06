import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layout components
import DashboardLayout from '../layouts/DashboardLayout';
import AuthLayout from '../layouts/AuthLayout';

// Page components
import Dashboard from '../pages/Dashboard';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';
import NotFound from '../pages/NotFound';
import MyRequests from '../pages/MyRequests';

// Funding request components
import FundingRequestContainer from '../components/funding/FundingRequestContainer';
import FundingDetail from '../pages/FundingDetail';

// Negotiation components
import NegotiationPage from '../pages/NegotiationPage';
import Negotiations from '../pages/Negotiations';

// Auth guard component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // This is a simplified auth check. In a real app, you'd check if the user is authenticated
  const isAuthenticated = localStorage.getItem('auth_token') !== null;
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

/**
 * AppRoutes - Defines the routing structure for the application
 */
const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Auth routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>
      
      {/* Dashboard routes - protected */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        
        {/* My Requests page */}
        <Route path="/my-requests" element={
          <ProtectedRoute>
            <MyRequests />
          </ProtectedRoute>
        } />
        
        {/* Funding request routes */}
        <Route path="/create-request" element={
          <ProtectedRoute>
            <FundingRequestContainer />
          </ProtectedRoute>
        } />
        
        <Route path="/edit-request/:id" element={
          <ProtectedRoute>
            <FundingRequestContainer />
          </ProtectedRoute>
        } />
        
        <Route path="/funding/:id" element={
          <ProtectedRoute>
            <FundingDetail />
          </ProtectedRoute>
        } />
        
        {/* Negotiation routes */}
        <Route path="/negotiation/:negotiationId" element={
          <NegotiationPage />
        } />
        
        <Route path="/negotiations" element={
          <ProtectedRoute>
            <Negotiations />
          </ProtectedRoute>
        } />
      </Route>
      
      {/* Redirect root to dashboard */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      
      {/* 404 route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes; 