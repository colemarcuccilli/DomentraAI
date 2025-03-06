export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'INVESTOR' | 'LENDER' | 'ADMIN';
  permissions: {
    canListProperties: boolean;
    canSubmitLoanOffers: boolean;
    canManageUsers: boolean;
  };
  verificationStatus: 'UNVERIFIED' | 'PENDING' | 'VERIFIED';
  createdAt: string;
  updatedAt: string;
} 