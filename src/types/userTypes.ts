/**
 * User Role Management Types
 * Defines the structure and permissions for different user types
 * in the Domentra marketplace.
 */

export type UserRole = 'INVESTOR' | 'LENDER' | 'ADMIN';

export interface UserPermissions {
  canListProperties: boolean;
  canListFundingRequests: boolean;
  canSubmitLoanOffers: boolean;
  canBrowseListings: boolean;
  canAccessAnalytics: boolean;
}

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  permissions: UserPermissions;
  companyName?: string;
  phoneNumber?: string;
  verificationStatus: 'PENDING' | 'VERIFIED' | 'REJECTED';
  createdAt: Date;
  updatedAt: Date;
}

// Default permissions based on user role
export const DEFAULT_PERMISSIONS: Record<UserRole, UserPermissions> = {
  INVESTOR: {
    canListProperties: true,
    canListFundingRequests: true,
    canSubmitLoanOffers: false,
    canBrowseListings: true,
    canAccessAnalytics: true,
  },
  LENDER: {
    canListProperties: false,
    canListFundingRequests: false,
    canSubmitLoanOffers: true,
    canBrowseListings: true,
    canAccessAnalytics: true,
  },
  ADMIN: {
    canListProperties: true,
    canListFundingRequests: true,
    canSubmitLoanOffers: true,
    canBrowseListings: true,
    canAccessAnalytics: true,
  },
}; 