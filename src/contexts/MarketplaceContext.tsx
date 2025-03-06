import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole, DEFAULT_PERMISSIONS } from '../types/userTypes';

interface MarketplaceContextType {
  currentUser: UserProfile | null;
  isAuthenticated: boolean;
  userRole: UserRole | null;
  setCurrentUser: (user: UserProfile | null) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(undefined);

export const useMarketplace = () => {
  const context = useContext(MarketplaceContext);
  if (context === undefined) {
    throw new Error('useMarketplace must be used within a MarketplaceProvider');
  }
  return context;
};

export const MarketplaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mock authentication - replace with real auth system
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simulate API call
      const mockUser: UserProfile = {
        id: '1',
        email,
        firstName: 'John',
        lastName: 'Doe',
        role: 'INVESTOR',
        permissions: DEFAULT_PERMISSIONS.INVESTOR,
        verificationStatus: 'VERIFIED',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      setCurrentUser(mockUser);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simulate API call
      setCurrentUser(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Simulate checking local storage or session
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
          setCurrentUser(JSON.parse(savedUser));
        }
      } catch (err) {
        console.error('Error checking auth:', err);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Save user to storage when it changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    userRole: currentUser?.role || null,
    setCurrentUser,
    login,
    logout,
    isLoading,
    error,
  };

  return (
    <MarketplaceContext.Provider value={value}>
      {children}
    </MarketplaceContext.Provider>
  );
};

export default MarketplaceProvider; 