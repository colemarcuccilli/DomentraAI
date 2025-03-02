import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Integration, IntegrationCategory } from '../types/integrationTypes';
import { mockIntegrations, categoryInfo } from '../data/mockIntegrations';

// Import components
import IntegrationCard from '../components/integrations/IntegrationCard';
import CategoryFilter from '../components/integrations/CategoryFilter';
import SearchFilter from '../components/integrations/SearchFilter';
import IntegrationStats from '../components/integrations/IntegrationStats';
import IntegrationDetailModal from '../components/integrations/IntegrationDetailModal';

/**
 * Integrations - A breathtaking, mobile-first integrations management page
 * that empowers users to connect, manage, and utilize various third-party services.
 * Features elegant animations, advanced filtering, and comprehensive integration details.
 */
const Integrations: React.FC = () => {
  // State for integrations data
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // State for filters
  const [selectedCategory, setSelectedCategory] = useState<IntegrationCategory | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // State for modal
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Responsive design
  const isMobile = useMediaQuery({ maxWidth: 768 });
  
  // Fetch integrations data
  useEffect(() => {
    const fetchIntegrations = async () => {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIntegrations(mockIntegrations);
      setIsLoading(false);
    };
    
    fetchIntegrations();
  }, []);
  
  // Filter integrations based on selected filters
  const filteredIntegrations = integrations.filter(integration => {
    // Filter by category
    const matchesCategory = selectedCategory === 'all' || integration.category === selectedCategory;
    
    // Filter by search term
    const matchesSearch = 
      integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      integration.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      integration.features.some(feature => feature.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Filter by status
    const matchesStatus = statusFilter === 'all' || integration.status === statusFilter;
    
    return matchesCategory && matchesSearch && matchesStatus;
  });
  
  // Handle integration connection
  const handleConnect = (id: string) => {
    setIntegrations(prevIntegrations => 
      prevIntegrations.map(integration => 
        integration.id === id 
          ? { 
              ...integration, 
              status: 'connected',
              connectedSince: new Date().toISOString()
            } 
          : integration
      )
    );
  };
  
  // Handle integration disconnection
  const handleDisconnect = (id: string) => {
    setIntegrations(prevIntegrations => 
      prevIntegrations.map(integration => 
        integration.id === id 
          ? { 
              ...integration, 
              status: 'disconnected',
              connectedSince: undefined
            } 
          : integration
      )
    );
  };
  
  // Handle viewing integration details
  const handleViewDetails = (id: string) => {
    const integration = integrations.find(i => i.id === id);
    if (integration) {
      setSelectedIntegration(integration);
      setIsModalOpen(true);
    }
  };
  
  // Loading skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-8"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-1 space-y-4">
                <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-60 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
              
              <div className="md:col-span-3 space-y-6">
                <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, index) => (
                    <div key={index} className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header Section */}
      <section className="relative pt-8 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-700 to-secondary-700 opacity-90 z-0"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31')] bg-cover bg-center mix-blend-overlay z-0"></div>
        
        <div className="container-fluid relative z-10">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 animate-fade-in">
              Integrations
            </h1>
            <p className="text-lg text-white opacity-90 mb-6 animate-fade-in">
              Connect your document center with your favorite tools and services
            </p>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-8">
        <div className="container-fluid">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Sidebar */}
              <div className="md:col-span-1">
                <CategoryFilter 
                  categories={categoryInfo}
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                />
                
                <SearchFilter 
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  statusFilter={statusFilter}
                  onStatusFilterChange={setStatusFilter}
                />
              </div>
              
              {/* Main Content */}
              <div className="md:col-span-3">
                <IntegrationStats integrations={integrations} />
                
                {filteredIntegrations.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredIntegrations.map(integration => (
                      <IntegrationCard 
                        key={integration.id}
                        integration={integration}
                        onConnect={handleConnect}
                        onDisconnect={handleDisconnect}
                        onViewDetails={handleViewDetails}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                      No integrations found
                    </h3>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                      {searchTerm 
                        ? `No results found for "${searchTerm}". Try another search term.` 
                        : `No ${selectedCategory !== 'all' ? selectedCategory : ''} integrations available with the selected filters.`}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Integration Detail Modal */}
      <IntegrationDetailModal 
        integration={selectedIntegration}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConnect={handleConnect}
        onDisconnect={handleDisconnect}
      />
    </div>
  );
};

export default Integrations; 