import React from 'react';
import { Integration, IntegrationCategory, IntegrationCategoryInfo } from '../types/integrationTypes';

/**
 * Category icons for the different integration types
 */
export const categoryIcons: Record<IntegrationCategory, JSX.Element> = {
  'crm': (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  'accounting': (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  ),
  'esignature': (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
    </svg>
  ),
  'property-management': (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  'cloud-storage': (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
    </svg>
  ),
  'api': (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  'analytics': (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  )
};

/**
 * Category information for the different integration types
 */
export const categoryInfo: IntegrationCategoryInfo[] = [
  {
    id: 'crm',
    name: 'CRM Systems',
    description: 'Connect your customer relationship management tools to streamline client data and document access.',
    iconComponent: categoryIcons['crm']
  },
  {
    id: 'accounting',
    name: 'Accounting Software',
    description: 'Integrate financial tools to manage invoices, receipts, and tax documents efficiently.',
    iconComponent: categoryIcons['accounting']
  },
  {
    id: 'esignature',
    name: 'E-Signature Platforms',
    description: 'Streamline document signing with secure, legally-binding electronic signature solutions.',
    iconComponent: categoryIcons['esignature']
  },
  {
    id: 'property-management',
    name: 'Property Management',
    description: 'Connect property management tools to organize leases, maintenance records, and tenant documentation.',
    iconComponent: categoryIcons['property-management']
  },
  {
    id: 'cloud-storage',
    name: 'Cloud Storage',
    description: 'Link cloud storage services for secure, accessible document backup and sharing.',
    iconComponent: categoryIcons['cloud-storage']
  },
  {
    id: 'api',
    name: 'APIs & Middleware',
    description: 'Connect custom applications and services through flexible API integrations.',
    iconComponent: categoryIcons['api']
  },
  {
    id: 'analytics',
    name: 'Analytics & Reporting',
    description: 'Gain insights into document usage, workflow efficiency, and compliance metrics.',
    iconComponent: categoryIcons['analytics']
  }
];

/**
 * Mock integrations data
 */
export const mockIntegrations: Integration[] = [
  // CRM Systems
  {
    id: 'salesforce',
    name: 'Salesforce',
    description: 'Connect your Salesforce CRM to sync contacts, opportunities, and documents seamlessly.',
    category: 'crm',
    logoUrl: 'https://logo.clearbit.com/salesforce.com',
    status: 'connected',
    connectedSince: '2023-06-15T00:00:00Z',
    features: ['Contact synchronization', 'Document linking', 'Opportunity tracking', 'Custom field mapping'],
    popularityScore: 9,
    website: 'https://www.salesforce.com'
  },
  {
    id: 'hubspot',
    name: 'HubSpot',
    description: 'Integrate HubSpot to manage contacts, deals, and marketing campaigns with document access.',
    category: 'crm',
    logoUrl: 'https://logo.clearbit.com/hubspot.com',
    status: 'disconnected',
    features: ['Contact management', 'Marketing automation', 'Sales pipeline', 'Document attachment'],
    popularityScore: 8,
    website: 'https://www.hubspot.com'
  },
  {
    id: 'zoho-crm',
    name: 'Zoho CRM',
    description: 'Connect Zoho CRM to manage your real estate leads, contacts, and document workflows.',
    category: 'crm',
    logoUrl: 'https://logo.clearbit.com/zoho.com',
    status: 'disconnected',
    features: ['Lead management', 'Contact tracking', 'Document association', 'Workflow automation'],
    popularityScore: 7,
    website: 'https://www.zoho.com/crm'
  },

  // Accounting Software
  {
    id: 'quickbooks',
    name: 'QuickBooks',
    description: 'Integrate QuickBooks to manage financial documents, invoices, and transaction records.',
    category: 'accounting',
    logoUrl: 'https://logo.clearbit.com/quickbooks.com',
    status: 'connected',
    connectedSince: '2023-08-22T00:00:00Z',
    features: ['Invoice management', 'Expense tracking', 'Financial reporting', 'Tax document organization'],
    popularityScore: 9,
    website: 'https://quickbooks.intuit.com'
  },
  {
    id: 'xero',
    name: 'Xero',
    description: 'Connect Xero accounting software for streamlined financial document management.',
    category: 'accounting',
    logoUrl: 'https://logo.clearbit.com/xero.com',
    status: 'disconnected',
    features: ['Bank reconciliation', 'Invoice creation', 'Financial reporting', 'Document attachment'],
    popularityScore: 8,
    website: 'https://www.xero.com'
  },
  {
    id: 'freshbooks',
    name: 'FreshBooks',
    description: 'Integrate FreshBooks to manage invoices, expenses, and financial documents for your properties.',
    category: 'accounting',
    logoUrl: 'https://logo.clearbit.com/freshbooks.com',
    status: 'disconnected',
    features: ['Time tracking', 'Expense management', 'Client invoicing', 'Financial reporting'],
    popularityScore: 7,
    website: 'https://www.freshbooks.com'
  },

  // E-Signature Platforms
  {
    id: 'docusign',
    name: 'DocuSign',
    description: 'Connect DocuSign for secure, legally-binding electronic signatures on all your real estate documents.',
    category: 'esignature',
    logoUrl: 'https://logo.clearbit.com/docusign.com',
    status: 'connected',
    connectedSince: '2023-05-10T00:00:00Z',
    features: ['Electronic signatures', 'Document tracking', 'Template creation', 'Mobile signing'],
    popularityScore: 9,
    website: 'https://www.docusign.com'
  },
  {
    id: 'adobe-sign',
    name: 'Adobe Sign',
    description: 'Integrate Adobe Sign to streamline document signing processes for contracts and agreements.',
    category: 'esignature',
    logoUrl: 'https://logo.clearbit.com/adobe.com',
    status: 'disconnected',
    features: ['Electronic signatures', 'Document workflow', 'Audit trails', 'Compliance certification'],
    popularityScore: 8,
    website: 'https://acrobat.adobe.com/us/en/sign.html'
  },
  {
    id: 'pandadoc',
    name: 'PandaDoc',
    description: 'Connect PandaDoc for creating, sending, and signing real estate documents with ease.',
    category: 'esignature',
    logoUrl: 'https://logo.clearbit.com/pandadoc.com',
    status: 'pending',
    features: ['Document creation', 'Electronic signatures', 'Template library', 'Analytics dashboard'],
    popularityScore: 7,
    website: 'https://www.pandadoc.com'
  },

  // Property Management
  {
    id: 'buildium',
    name: 'Buildium',
    description: 'Integrate Buildium to manage property documents, leases, and maintenance records.',
    category: 'property-management',
    logoUrl: 'https://logo.clearbit.com/buildium.com',
    status: 'connected',
    connectedSince: '2023-07-05T00:00:00Z',
    features: ['Lease management', 'Maintenance tracking', 'Tenant portal', 'Document storage'],
    popularityScore: 8,
    website: 'https://www.buildium.com'
  },
  {
    id: 'appfolio',
    name: 'AppFolio',
    description: 'Connect AppFolio to streamline property management documents and tenant communications.',
    category: 'property-management',
    logoUrl: 'https://logo.clearbit.com/appfolio.com',
    status: 'disconnected',
    features: ['Lease tracking', 'Maintenance requests', 'Tenant screening', 'Document organization'],
    popularityScore: 8,
    website: 'https://www.appfolio.com'
  },
  {
    id: 'propertyware',
    name: 'Propertyware',
    description: 'Integrate Propertyware for comprehensive property document management and tenant services.',
    category: 'property-management',
    logoUrl: 'https://logo.clearbit.com/propertyware.com',
    status: 'disconnected',
    features: ['Lease automation', 'Maintenance coordination', 'Accounting tools', 'Document repository'],
    popularityScore: 7,
    website: 'https://www.propertyware.com'
  },

  // Cloud Storage
  {
    id: 'google-drive',
    name: 'Google Drive',
    description: 'Connect Google Drive for secure cloud storage and collaborative document editing.',
    category: 'cloud-storage',
    logoUrl: 'https://logo.clearbit.com/google.com',
    status: 'connected',
    connectedSince: '2023-04-18T00:00:00Z',
    features: ['Document storage', 'File sharing', 'Collaborative editing', 'Version history'],
    popularityScore: 9,
    website: 'https://drive.google.com'
  },
  {
    id: 'dropbox',
    name: 'Dropbox',
    description: 'Integrate Dropbox to store, share, and access your real estate documents from anywhere.',
    category: 'cloud-storage',
    logoUrl: 'https://logo.clearbit.com/dropbox.com',
    status: 'disconnected',
    features: ['File storage', 'Document sharing', 'Mobile access', 'Automatic backup'],
    popularityScore: 8,
    website: 'https://www.dropbox.com'
  },
  {
    id: 'onedrive',
    name: 'Microsoft OneDrive',
    description: 'Connect OneDrive for seamless integration with Microsoft Office and document storage.',
    category: 'cloud-storage',
    logoUrl: 'https://logo.clearbit.com/microsoft.com',
    status: 'error',
    features: ['Office integration', 'Document storage', 'File sharing', 'Version control'],
    popularityScore: 8,
    website: 'https://onedrive.live.com'
  },

  // APIs & Middleware
  {
    id: 'zapier',
    name: 'Zapier',
    description: 'Integrate Zapier to connect your document system with thousands of other apps and services.',
    category: 'api',
    logoUrl: 'https://logo.clearbit.com/zapier.com',
    status: 'connected',
    connectedSince: '2023-09-01T00:00:00Z',
    features: ['Workflow automation', 'App integration', 'Custom triggers', 'Data mapping'],
    popularityScore: 9,
    website: 'https://zapier.com'
  },
  {
    id: 'mulesoft',
    name: 'MuleSoft',
    description: 'Connect MuleSoft for enterprise API integration and data transformation capabilities.',
    category: 'api',
    logoUrl: 'https://logo.clearbit.com/mulesoft.com',
    status: 'disconnected',
    features: ['API management', 'Data integration', 'Enterprise connectivity', 'Workflow automation'],
    popularityScore: 7,
    website: 'https://www.mulesoft.com'
  },
  {
    id: 'make',
    name: 'Make (Integromat)',
    description: 'Integrate Make to create powerful automated workflows between your document system and other apps.',
    category: 'api',
    logoUrl: 'https://logo.clearbit.com/make.com',
    status: 'pending',
    features: ['Visual workflow builder', 'App integration', 'Data mapping', 'Error handling'],
    popularityScore: 8,
    website: 'https://www.make.com'
  },

  // Analytics & Reporting
  {
    id: 'tableau',
    name: 'Tableau',
    description: 'Connect Tableau for powerful data visualization and analytics of your document metrics.',
    category: 'analytics',
    logoUrl: 'https://logo.clearbit.com/tableau.com',
    status: 'connected',
    connectedSince: '2023-08-15T00:00:00Z',
    features: ['Data visualization', 'Interactive dashboards', 'Custom reporting', 'Data analysis'],
    popularityScore: 9,
    website: 'https://www.tableau.com'
  },
  {
    id: 'power-bi',
    name: 'Microsoft Power BI',
    description: 'Integrate Power BI to create insightful dashboards and reports from your document data.',
    category: 'analytics',
    logoUrl: 'https://logo.clearbit.com/microsoft.com',
    status: 'disconnected',
    features: ['Business intelligence', 'Data visualization', 'Report sharing', 'Data modeling'],
    popularityScore: 8,
    website: 'https://powerbi.microsoft.com'
  },
  {
    id: 'looker',
    name: 'Looker',
    description: 'Connect Looker for advanced analytics and business intelligence on your document usage.',
    category: 'analytics',
    logoUrl: 'https://logo.clearbit.com/looker.com',
    status: 'disconnected',
    features: ['Data exploration', 'Custom dashboards', 'Embedded analytics', 'Data modeling'],
    popularityScore: 7,
    website: 'https://www.looker.com'
  }
]; 