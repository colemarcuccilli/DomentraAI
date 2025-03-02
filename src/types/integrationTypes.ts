/**
 * Integration type definitions for the Integrations page
 */

export type IntegrationCategory = 
  | 'crm' 
  | 'accounting' 
  | 'esignature' 
  | 'property-management' 
  | 'cloud-storage' 
  | 'api' 
  | 'analytics';

export type IntegrationStatus = 
  | 'connected' 
  | 'disconnected' 
  | 'pending' 
  | 'error';

export interface Integration {
  id: string;
  name: string;
  description: string;
  category: IntegrationCategory;
  logoUrl: string;
  status: IntegrationStatus;
  connectedSince?: string; // ISO date string
  features: string[];
  popularityScore: number; // 1-10 scale
  website: string;
}

export interface IntegrationCategoryInfo {
  id: IntegrationCategory;
  name: string;
  description: string;
  iconComponent: React.ReactNode;
} 