/**
 * Document type definitions for the Document Center
 */

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'admin' | 'viewer';
  avatar?: string;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  category: 'loan' | 'property' | 'legal' | 'tax' | 'insurance' | 'other';
  uploadDate: string;
  size: string;
  propertyId?: string;
  propertyAddress?: string;
  loanId?: string;
  tags: string[];
  sharedWith: User[];
} 