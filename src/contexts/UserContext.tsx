import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { UserProfile } from '../types/user';

// Mock admin user data for development
const mockAdminUser: UserProfile = {
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

interface UserContextType {
  currentUser: UserProfile | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (userData: Partial<UserProfile>, password: string) => Promise<void>;
  updateProfile: (userData: Partial<UserProfile>) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  // For development, always set the current user to the mock admin user
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(mockAdminUser);
  const [isLoading, setIsLoading] = useState(false);

  // Simulate fetching user data on mount - not needed for development
  useEffect(() => {
    // No need to fetch user data in development
    // Always use the mock admin user
  }, []);

  const login = async (email: string, password: string) => {
    // For development, always succeed with mock admin user
    setCurrentUser(mockAdminUser);
  };

  const logout = () => {
    // For development, don't actually log out
    console.log('Logout attempted, but ignored in development mode');
  };

  const signup = async (userData: Partial<UserProfile>, password: string) => {
    // For development, always succeed with mock admin user
    setCurrentUser(mockAdminUser);
  };

  const updateProfile = async (userData: Partial<UserProfile>) => {
    // For development, update the mock admin user
    setCurrentUser({ ...mockAdminUser, ...userData });
  };

  return (
    <UserContext.Provider value={{ currentUser, isLoading, login, logout, signup, updateProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export default UserContext; 