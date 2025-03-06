import React, { useState, useRef, useEffect } from 'react';
import { FundingRequest } from './FundingRequestCard';
import ImageGallery from './detailModal/ImageGallery';
import PropertyHeader from './detailModal/PropertyHeader';
import ActionButtons from './detailModal/ActionButtons';
import NavigationTabs, { TabType } from './detailModal/NavigationTabs';
import OverviewTab from './detailModal/OverviewTab';
import PropertyDetails from './detailModal/PropertyDetails';
import MarketDetails from './detailModal/MarketDetails';
import InvestmentDetails from './detailModal/InvestmentDetails';
import DocumentsList from './detailModal/DocumentsList';
import OffersTab from './detailModal/OffersTab';

interface FundingRequestDetailModalProps {
  request: FundingRequest | null;
  isOpen: boolean;
  onClose: () => void;
  onFundDeal: (request: FundingRequest) => void;
  onContactInvestor: (request: FundingRequest) => void;
  onSaveDeal: (request: FundingRequest) => void;
  onShareDeal: (request: FundingRequest) => void;
}

/**
 * FundingRequestDetailModal - A breathtaking, mobile-first modal component
 * for displaying detailed funding request information with elegant animations.
 * This component orchestrates all the smaller components for different sections.
 */
const FundingRequestDetailModal: React.FC<FundingRequestDetailModalProps> = ({
  request,
  isOpen,
  onClose,
  onFundDeal,
  onContactInvestor,
  onSaveDeal,
  onShareDeal
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const modalRef = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);
  const propertyRef = useRef<HTMLDivElement>(null);
  const marketRef = useRef<HTMLDivElement>(null);
  const investmentRef = useRef<HTMLDivElement>(null);
  const documentsRef = useRef<HTMLDivElement>(null);
  const offersRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const [isNavSticky, setIsNavSticky] = useState(false);
  
  // Mock offers data - in a real app, this would come from props or an API
  const [offers, setOffers] = useState<any[]>([]);
  const hasOffers = offers.length > 0;
  
  // Simulate fetching offers
  useEffect(() => {
    if (request) {
      // Mock data - in a real app, this would be an API call
      const mockOffers = request.id === '1' ? [
        {
          id: '101',
          lenderName: 'Capital Funding Group',
          lenderVerified: true,
          amount: 750000,
          interestRate: 4.5,
          term: 365, // days
          status: 'pending',
          dateSubmitted: '2023-09-15',
          message: "We're excited about this property and can offer competitive terms."
        },
        {
          id: '102',
          lenderName: 'Real Estate Investors LLC',
          lenderVerified: false,
          amount: 725000,
          interestRate: 4.2,
          term: 730, // days
          status: 'pending',
          dateSubmitted: '2023-09-16'
        }
      ] : [];
      
      setOffers(mockOffers);
    }
  }, [request]);
  
  // Handle scroll to check if nav should be sticky
  useEffect(() => {
    const handleScroll = () => {
      if (modalRef.current && navRef.current) {
        const navPosition = navRef.current.getBoundingClientRect().top;
        setIsNavSticky(navPosition <= 0);
        
        // Update active tab based on scroll position
        const scrollPosition = modalRef.current.scrollTop;
        
        // Define sections with their refs and corresponding tabs
        const sections = [
          { ref: overviewRef, tab: 'overview' },
          { ref: propertyRef, tab: 'property' },
          { ref: marketRef, tab: 'market' },
          { ref: investmentRef, tab: 'investment' },
          { ref: documentsRef, tab: 'documents' },
          { ref: offersRef, tab: 'offers' }
        ];
        
        // Find the current section in view
        for (let i = sections.length - 1; i >= 0; i--) {
          const section = sections[i];
          if (section.ref.current) {
            const sectionTop = section.ref.current.offsetTop;
            if (scrollPosition >= sectionTop - 100) { // 100px offset for better UX
              setActiveTab(section.tab as TabType);
              break;
            }
          }
        }
      }
    };
    
    const modalElement = modalRef.current;
    if (modalElement) {
      modalElement.addEventListener('scroll', handleScroll);
      return () => modalElement.removeEventListener('scroll', handleScroll);
    }
  }, []);
  
  // Handle tab change by scrolling to the section
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    
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
    
    if (targetRef.current && modalRef.current) {
      const navHeight = navRef.current ? navRef.current.offsetHeight : 0;
      const targetPosition = targetRef.current.offsetTop - navHeight;
      
      modalRef.current.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };
  
  if (!isOpen || !request) return null;
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
          aria-hidden="true"
          onClick={onClose}
        ></div>

        {/* Close button - fixed position relative to viewport */}
        <div className="fixed top-4 right-4 z-50 sm:top-8 sm:right-8">
          <button
            type="button"
            className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 shadow-md hover:shadow-lg transition-all duration-200"
            onClick={onClose}
            aria-label="Close modal"
          >
            <span className="sr-only">Close</span>
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal panel */}
        <div 
          ref={modalRef}
          className="inline-block align-middle bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-6xl w-full max-h-[90vh] overflow-y-auto scroll-smooth relative"
        >
          {/* Top Section with Image and Key Details */}
          <div className="flex flex-col md:flex-row">
            {/* Property Image */}
            <div className="md:w-1/2 md:h-[400px]">
              <ImageGallery 
                mainImage={request.imageUrl} 
                additionalImages={request.additionalImages} 
                propertyAddress={request.propertyAddress} 
              />
            </div>
            
            {/* Property Details */}
            <div className="md:w-1/2 p-6">
              <PropertyHeader request={request} />
              <ActionButtons 
                request={request}
                onFundDeal={onFundDeal}
                onContactInvestor={onContactInvestor}
                onSaveDeal={onSaveDeal}
                onShareDeal={onShareDeal}
              />
            </div>
          </div>
          
          {/* Navigation Tabs - Sticky */}
          <div 
            ref={navRef}
            className={`${isNavSticky ? 'sticky top-0 backdrop-blur-sm bg-white/90 dark:bg-gray-800/90' : 'bg-white dark:bg-gray-800'} z-40 px-6 border-t border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300`}
          >
            <NavigationTabs 
              activeTab={activeTab} 
              onTabChange={handleTabChange} 
              tabs={['overview', 'property', 'market', 'investment', 'documents', 'offers'] as TabType[]}
              labels={{
                overview: 'Overview',
                property: 'Property',
                market: 'Market',
                investment: 'Investment',
                documents: 'Documents',
                offers: hasOffers ? `Offers (${offers.length})` : 'Offers'
              }}
            />
          </div>
          
          {/* Tab Content Sections */}
          <div className="px-6 pb-8">
            <div 
              ref={overviewRef} 
              id="overview-section" 
              className={`py-6 scroll-mt-16 ${activeTab === 'overview' ? 'border-l-4 border-primary-500 pl-4 -ml-4' : ''}`}
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Overview</h2>
              <OverviewTab request={request} />
            </div>
            
            <div 
              ref={propertyRef} 
              id="property-section" 
              className={`py-6 scroll-mt-16 ${activeTab === 'property' ? 'border-l-4 border-primary-500 pl-4 -ml-4' : ''}`}
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Property Details</h2>
              <PropertyDetails request={request} />
            </div>
            
            <div 
              ref={marketRef} 
              id="market-section" 
              className={`py-6 scroll-mt-16 ${activeTab === 'market' ? 'border-l-4 border-primary-500 pl-4 -ml-4' : ''}`}
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Market Analysis</h2>
              <MarketDetails request={request} />
            </div>
            
            <div 
              ref={investmentRef} 
              id="investment-section" 
              className={`py-6 scroll-mt-16 ${activeTab === 'investment' ? 'border-l-4 border-primary-500 pl-4 -ml-4' : ''}`}
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Investment Details</h2>
              <InvestmentDetails request={request} />
            </div>
            
            <div 
              ref={documentsRef} 
              id="documents-section" 
              className={`py-6 scroll-mt-16 ${activeTab === 'documents' ? 'border-l-4 border-primary-500 pl-4 -ml-4' : ''}`}
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Documents</h2>
              <DocumentsList documents={request.availableDocuments} />
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
                fundingRequestId={request?.id} 
                onClose={onClose}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundingRequestDetailModal; 