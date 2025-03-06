import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TabType } from '../components/matchmaking/detailModal/NavigationTabs';
import { FundingRequest } from '../components/matchmaking/FundingRequestCard';
import FundingDetailHeader from '../components/funding/FundingDetailHeader';
import FundingDetailSections from '../components/funding/FundingDetailSections';
import { mockFundingRequests } from '../data/mockFundingRequests';

/**
 * FundingDetail - A breathtaking, mobile-first page component
 * for displaying detailed information about a funding request.
 */
const FundingDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [fundingRequest, setFundingRequest] = useState<FundingRequest | null>(null);
  const [editableFundingRequest, setEditableFundingRequest] = useState<FundingRequest | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [offers, setOffers] = useState<any[]>([]);
  const [hasOffers, setHasOffers] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchFundingRequest = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Find funding request in mock data
        const foundRequest = mockFundingRequests.find((r: FundingRequest) => r.id === id);
        if (foundRequest) {
          setFundingRequest(foundRequest);
          setEditableFundingRequest(JSON.parse(JSON.stringify(foundRequest))); // Create a deep copy for editing
          
          // Simulate fetching offers
          await new Promise(resolve => setTimeout(resolve, 300));
          
          // Generate random number of offers (0-3)
          const numOffers = Math.floor(Math.random() * 4);
          if (numOffers > 0) {
            const mockOffers = Array.from({ length: numOffers }, (_, i) => ({
              id: `offer-${i + 1}`,
              lenderName: `Lender ${i + 1}`,
              lenderVerified: Math.random() > 0.5,
              amount: foundRequest.amount * (0.8 + Math.random() * 0.4),
              interestRate: 5 + Math.random() * 5,
              term: 30 + Math.floor(Math.random() * 335),
              status: 'pending',
              dateSubmitted: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)).toISOString(),
              message: Math.random() > 0.3 ? "We're excited about this property and can offer competitive terms." : undefined
            }));
            
            setOffers(mockOffers);
            setHasOffers(true);
          }
        } else {
          // Handle not found
          navigate('/my-requests');
        }
      } catch (error) {
        console.error('Error fetching funding request:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchFundingRequest();
  }, [id, navigate]);

  const handleToggleEdit = () => {
    if (isEditing) {
      // Save changes
      setFundingRequest(editableFundingRequest);
      // In a real app, you would make an API call to save the changes
      console.log('Saving changes:', editableFundingRequest);
    } else {
      // Start editing - already have a copy in editableFundingRequest
    }
    setIsEditing(!isEditing);
  };

  const handleDelete = () => {
    // In a real app, you would make an API call to delete the request
    console.log('Deleting funding request:', id);
    navigate('/my-requests');
  };

  const handleFieldChange = (field: keyof FundingRequest, value: any) => {
    if (editableFundingRequest) {
      setEditableFundingRequest({
        ...editableFundingRequest,
        [field]: value
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-primary-600">Loading funding details...</div>
      </div>
    );
  }

  if (!fundingRequest) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600">Funding request not found</div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        {fundingRequest && (
          <>
            <FundingDetailHeader 
              fundingRequest={isEditing && editableFundingRequest ? editableFundingRequest : fundingRequest}
              hasOffers={hasOffers}
              offersCount={offers.length}
              setActiveTab={setActiveTab}
              onToggleEdit={handleToggleEdit}
              isEditing={isEditing}
              onDelete={handleDelete}
            />
            
            {/* Sections with Tabs */}
            <FundingDetailSections 
              fundingRequest={isEditing && editableFundingRequest ? editableFundingRequest : fundingRequest}
              offers={offers}
              hasOffers={hasOffers}
              fundingRequestId={id || ''}
              isEditing={isEditing}
              onFieldChange={handleFieldChange}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default FundingDetail; 