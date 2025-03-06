import React, { useRef, useEffect, useState } from 'react';
import { TabType } from '../matchmaking/detailModal/NavigationTabs';
import NavigationTabs from '../matchmaking/detailModal/NavigationTabs';
import OverviewTab from '../matchmaking/detailModal/OverviewTab';
import PropertyDetails from '../matchmaking/detailModal/PropertyDetails';
import MarketDetails from '../matchmaking/detailModal/MarketDetails';
import InvestmentDetails from '../matchmaking/detailModal/InvestmentDetails';
import DocumentsList from '../matchmaking/detailModal/DocumentsList';
import OffersTab from '../matchmaking/detailModal/OffersTab';
import { FundingRequest } from '../matchmaking/FundingRequestCard';

interface FundingDetailSectionsProps {
  fundingRequest: FundingRequest;
  offers: any[];
  hasOffers: boolean;
  fundingRequestId?: string;
  isEditing?: boolean;
  onFieldChange?: (field: keyof FundingRequest, value: any) => void;
}

/**
 * FundingDetailSections - A breathtaking, mobile-first component
 * that handles the tabbed navigation and content sections for funding details.
 */
const FundingDetailSections: React.FC<FundingDetailSectionsProps> = ({
  fundingRequest,
  offers,
  hasOffers,
  fundingRequestId,
  isEditing = false,
  onFieldChange
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [isNavSticky, setIsNavSticky] = useState(false);
  
  // Create refs for each section
  const contentRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);
  const propertyRef = useRef<HTMLDivElement>(null);
  const marketRef = useRef<HTMLDivElement>(null);
  const investmentRef = useRef<HTMLDivElement>(null);
  const documentsRef = useRef<HTMLDivElement>(null);
  const offersRef = useRef<HTMLDivElement>(null);

  // Handle scroll to make nav sticky
  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current && contentRef.current) {
        const navPosition = navRef.current.getBoundingClientRect().top;
        setIsNavSticky(navPosition <= 0);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle tab change
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    
    // Get the appropriate ref based on the tab
    let targetRef;
    switch (tab) {
      case 'overview':
        targetRef = overviewRef;
        break;
      case 'property':
        targetRef = propertyRef;
        break;
      case 'market':
        targetRef = marketRef;
        break;
      case 'investment':
        targetRef = investmentRef;
        break;
      case 'documents':
        targetRef = documentsRef;
        break;
      case 'offers':
        targetRef = offersRef;
        break;
      default:
        targetRef = overviewRef;
    }
    
    // Scroll to the section if ref exists
    if (targetRef?.current) {
      // Use scrollIntoView for better browser compatibility
      targetRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      // Apply offset for the sticky nav
      const navHeight = navRef.current?.offsetHeight || 0;
      setTimeout(() => {
        window.scrollBy({
          top: -navHeight - 20,
          behavior: 'smooth'
        });
      }, 100);
    }
  };

  // Define tabs and labels
  const tabs = ['overview', 'property', 'market', 'investment', 'documents', 'offers'] as TabType[];
  const labels = {
    overview: 'Overview',
    property: 'Property',
    market: 'Market',
    investment: 'Investment',
    documents: 'Documents',
    offers: hasOffers ? `Offers (${offers.length})` : 'Offers'
  };

  // Helper function to render editable content
  const renderEditableContent = (section: string) => {
    if (!isEditing || !onFieldChange) {
      // If not in editing mode, render the regular components
      switch (section) {
        case 'overview':
          return <OverviewTab request={fundingRequest} />;
        case 'property':
          return <PropertyDetails request={fundingRequest} />;
        case 'market':
          return <MarketDetails request={fundingRequest} />;
        case 'investment':
          return <InvestmentDetails request={fundingRequest} />;
        default:
          return null;
      }
    }

    // If in editing mode, render editable versions of the components
    switch (section) {
      case 'overview':
        return (
          <OverviewTab 
            request={fundingRequest} 
            isEditing={isEditing} 
            onFieldChange={onFieldChange} 
          />
        );
      case 'property':
        return (
          <PropertyDetails 
            request={fundingRequest} 
            isEditing={isEditing} 
            onFieldChange={onFieldChange} 
          />
        );
      case 'market':
        return (
          <MarketDetails 
            request={fundingRequest} 
            isEditing={isEditing} 
            onFieldChange={onFieldChange} 
          />
        );
      case 'investment':
        return (
          <InvestmentDetails 
            request={fundingRequest} 
            isEditing={isEditing} 
            onFieldChange={onFieldChange} 
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* Navigation Tabs */}
      <div 
        ref={navRef}
        className={`${isNavSticky ? 'sticky top-0 backdrop-blur-sm bg-white/90 dark:bg-gray-800/90 z-10' : 'bg-white dark:bg-gray-800'} px-6 border-t border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300`}
      >
        <NavigationTabs 
          activeTab={activeTab} 
          onTabChange={handleTabChange} 
          tabs={tabs}
          labels={labels}
        />
      </div>
      
      {/* Tab Content Sections */}
      <div className="px-6 pb-8" ref={contentRef}>
        {/* Overview Section */}
        <div 
          id="overview-section" 
          ref={overviewRef}
          className={`py-6 scroll-mt-16 ${activeTab === 'overview' ? 'border-l-4 border-primary-500 pl-4 -ml-4' : ''}`}
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Overview
            {isEditing && <span className="ml-2 text-sm font-normal text-primary-500">(Editing)</span>}
          </h2>
          {renderEditableContent('overview')}
        </div>
        
        {/* Property Details Section */}
        <div 
          id="property-section" 
          ref={propertyRef}
          className={`py-6 scroll-mt-16 ${activeTab === 'property' ? 'border-l-4 border-primary-500 pl-4 -ml-4' : ''}`}
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Property Details
            {isEditing && <span className="ml-2 text-sm font-normal text-primary-500">(Editing)</span>}
          </h2>
          {renderEditableContent('property')}
        </div>
        
        {/* Market Analysis Section */}
        <div 
          id="market-section" 
          ref={marketRef}
          className={`py-6 scroll-mt-16 ${activeTab === 'market' ? 'border-l-4 border-primary-500 pl-4 -ml-4' : ''}`}
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Market Analysis
            {isEditing && <span className="ml-2 text-sm font-normal text-primary-500">(Editing)</span>}
          </h2>
          {renderEditableContent('market')}
        </div>
        
        {/* Investment Details Section */}
        <div 
          id="investment-section" 
          ref={investmentRef}
          className={`py-6 scroll-mt-16 ${activeTab === 'investment' ? 'border-l-4 border-primary-500 pl-4 -ml-4' : ''}`}
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Investment Details
            {isEditing && <span className="ml-2 text-sm font-normal text-primary-500">(Editing)</span>}
          </h2>
          {renderEditableContent('investment')}
        </div>
        
        {/* Documents Section */}
        <div 
          id="documents-section" 
          ref={documentsRef}
          className={`py-6 scroll-mt-16 ${activeTab === 'documents' ? 'border-l-4 border-primary-500 pl-4 -ml-4' : ''}`}
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Documents</h2>
          <DocumentsList documents={fundingRequest?.availableDocuments || []} />
        </div>
        
        {/* Offers Section */}
        <div 
          id="offers-section" 
          ref={offersRef}
          className={`py-6 scroll-mt-16 ${activeTab === 'offers' ? 'border-l-4 border-primary-500 pl-4 -ml-4' : ''}`}
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Funding Offers</h2>
          <OffersTab 
            offers={offers} 
            hasOffers={hasOffers} 
            fundingRequestId={fundingRequestId} 
          />
        </div>
      </div>
    </>
  );
};

export default FundingDetailSections; 