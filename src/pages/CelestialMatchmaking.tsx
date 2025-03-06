import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import MatchmakingHeader from '../components/matchmaking/MatchmakingHeader';
import SearchFilterBar from '../components/matchmaking/SearchFilterBar';
import ViewToggle from '../components/matchmaking/ViewToggle';
import FundingRequestCard from '../components/matchmaking/FundingRequestCard';
import FundingRequestDetailModal from '../components/matchmaking/FundingRequestDetailModal';
import AIMatchmakingSuggestions from '../components/matchmaking/AIMatchmakingSuggestions';
import { mockFundingRequests, aiSuggestedFundingRequests } from '../data/mockFundingRequests';
import { FundingRequest } from '../components/matchmaking/FundingRequestCard';

/**
 * CelestialMatchmaking - A breathtaking, mobile-first matchmaking page
 * that connects real estate investors with private lenders through AI-driven algorithms.
 * Features elegant animations, comprehensive filtering options, and a stunning
 * visual interface for exploring funding opportunities.
 */
const CelestialMatchmaking: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    fundingType: 'all',
    returnRange: 'all',
    riskScore: 'all',
    dealSize: 'all'
  });
  const [sortOption, setSortOption] = useState('projected-roi-desc');
  const [fundingRequests, setFundingRequests] = useState<FundingRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<FundingRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<FundingRequest | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const isMobile = useMediaQuery({ maxWidth: 768 });
  
  // Simulate loading and fetch data
  useEffect(() => {
    const timer = setTimeout(() => {
      setFundingRequests(mockFundingRequests);
      setFilteredRequests(mockFundingRequests);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    applyFiltersAndSearch(query, activeFilters, sortOption);
  };
  
  // Handle filter change
  const handleFilterChange = (filterType: string, value: string) => {
    const newFilters = { ...activeFilters, [filterType]: value };
    setActiveFilters(newFilters);
    applyFiltersAndSearch(searchQuery, newFilters, sortOption);
  };
  
  // Handle sort change
  const handleSortChange = (option: string) => {
    setSortOption(option);
    applyFiltersAndSearch(searchQuery, activeFilters, option);
  };
  
  // Apply filters and search
  const applyFiltersAndSearch = (query: string, filters: any, sort: string) => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      let results = [...mockFundingRequests];
      
      // Apply search query
      if (query) {
        const lowerQuery = query.toLowerCase();
        results = results.filter(request => 
          request.propertyAddress.toLowerCase().includes(lowerQuery) ||
          request.city.toLowerCase().includes(lowerQuery) ||
          request.state.toLowerCase().includes(lowerQuery) ||
          request.fundingType.toLowerCase().includes(lowerQuery) ||
          request.investorName.toLowerCase().includes(lowerQuery)
        );
      }
      
      // Apply filters
      if (filters.fundingType !== 'all') {
        results = results.filter(request => 
          request.fundingType.toLowerCase().includes(filters.fundingType.toLowerCase())
        );
      }
      
      if (filters.riskScore !== 'all') {
        results = results.filter(request => 
          request.riskScore.toLowerCase() === filters.riskScore.toLowerCase()
        );
      }
      
      if (filters.returnRange !== 'all') {
        const [min, max] = filters.returnRange.split('-').map(Number);
        if (max) {
          results = results.filter(request => 
            request.projectedReturn >= min && request.projectedReturn <= max
          );
        } else {
          // Handle "20+" case
          results = results.filter(request => request.projectedReturn >= min);
        }
      }
      
      if (filters.dealSize !== 'all') {
        const sizeRanges: { [key: string]: [number, number] } = {
          '10k-50k': [10000, 50000],
          '50k-100k': [50000, 100000],
          '100k-250k': [100000, 250000],
          '250k-500k': [250000, 500000],
          '500k+': [500000, Infinity]
        };
        
        const [min, max] = sizeRanges[filters.dealSize] || [0, Infinity];
        results = results.filter(request => 
          request.amount >= min && request.amount <= max
        );
      }
      
      // Apply sorting
      switch (sort) {
        case 'projected-roi-desc':
          results.sort((a, b) => b.projectedReturn - a.projectedReturn);
          break;
        case 'projected-roi-asc':
          results.sort((a, b) => a.projectedReturn - b.projectedReturn);
          break;
        case 'risk-score-asc':
          results.sort((a, b) => {
            const riskValues = { 'Low': 1, 'Medium': 2, 'High': 3 };
            return riskValues[a.riskScore as keyof typeof riskValues] - riskValues[b.riskScore as keyof typeof riskValues];
          });
          break;
        case 'risk-score-desc':
          results.sort((a, b) => {
            const riskValues = { 'Low': 1, 'Medium': 2, 'High': 3 };
            return riskValues[b.riskScore as keyof typeof riskValues] - riskValues[a.riskScore as keyof typeof riskValues];
          });
          break;
        case 'time-remaining-asc':
          results.sort((a, b) => a.timeRemaining - b.timeRemaining);
          break;
        case 'amount-desc':
          results.sort((a, b) => b.amount - a.amount);
          break;
        case 'amount-asc':
          results.sort((a, b) => a.amount - b.amount);
          break;
        default:
          break;
      }
      
      setFilteredRequests(results);
      setIsLoading(false);
    }, 300);
  };
  
  // Handle view toggle
  const handleViewChange = (newView: 'grid' | 'list') => {
    setView(newView);
  };
  
  // Handle request selection
  const handleRequestSelect = (request: FundingRequest) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };
  
  // Handle modal close
  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  
  // Handle fund deal
  const handleFundDeal = (request: FundingRequest) => {
    console.log('Fund deal:', request);
    // In a real app, this would open a funding form or redirect to a funding page
    setIsModalOpen(false);
  };
  
  // Handle contact investor
  const handleContactInvestor = (request: FundingRequest) => {
    console.log('Contact investor:', request);
    // In a real app, this would open a contact form or messaging interface
    setIsModalOpen(false);
  };
  
  // Handle save deal
  const handleSaveDeal = (request: FundingRequest) => {
    console.log('Save deal:', request);
    // In a real app, this would save the deal to the user's favorites
  };
  
  // Handle share deal
  const handleShareDeal = (request: FundingRequest) => {
    console.log('Share deal:', request);
    // In a real app, this would open a sharing interface
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Header */}
        <MatchmakingHeader />
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Main Content */}
          <div className="md:w-3/4">
            {/* Search and Filter Bar */}
            <SearchFilterBar 
              onSearch={handleSearch}
              onFilterChange={handleFilterChange}
              onSortChange={handleSortChange}
            />
            
            {/* Results Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {isLoading ? 'Loading...' : `${filteredRequests.length} Funding Opportunities`}
              </h2>
              <ViewToggle currentView={view} onViewChange={handleViewChange} />
            </div>
            
            {/* Results Grid/List */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="animate-pulse bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                    <div className="h-48 bg-gray-300 dark:bg-gray-700"></div>
                    <div className="p-4">
                      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
                      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></div>
                      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></div>
                      <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-full mt-4"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredRequests.length > 0 ? (
              <div className={view === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
                : "space-y-4"
              }>
                {filteredRequests.map((request) => (
                  <FundingRequestCard
                    key={request.id}
                    request={request}
                    view={view}
                    onClick={handleRequestSelect}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No matching funding opportunities</h3>
                <p className="mt-1 text-gray-500 dark:text-gray-400">Try adjusting your filters or search query.</p>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="md:w-1/4">
            <AIMatchmakingSuggestions 
              suggestions={aiSuggestedFundingRequests}
              onViewDeal={handleRequestSelect}
            />
            
            {/* Additional sidebar content could go here */}
          </div>
        </div>
      </div>
      
      {/* Detail Modal */}
      <FundingRequestDetailModal
        request={selectedRequest}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onFundDeal={handleFundDeal}
        onContactInvestor={handleContactInvestor}
        onSaveDeal={handleSaveDeal}
        onShareDeal={handleShareDeal}
      />
    </div>
  );
};

export default CelestialMatchmaking; 