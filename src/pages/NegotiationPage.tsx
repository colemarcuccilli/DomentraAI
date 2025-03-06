import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NegotiationTimeline, { NegotiationMessage, MessageRole, MessageStatus } from '../components/negotiation/NegotiationTimeline';
import { FaArrowLeft } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';

// Mock data for demonstration
const mockProperty = {
  id: '12345',
  address: '123 Celestial Avenue, Starlight City, CA 94103',
  imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
  price: 1250000,
  bedrooms: 4,
  bathrooms: 3,
  squareFeet: 2800,
  yearBuilt: 2018,
  propertyType: 'Single Family Home',
};

const mockInvestor = {
  id: '1',
  name: 'Alex Morgan',
  avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
};

const mockLender = {
  id: '2',
  name: 'Jordan Chen',
  avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
};

// Generate mock messages for the negotiation
const generateMockMessages = (): NegotiationMessage[] => {
  const now = new Date();
  const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
  const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000);
  const threeHoursAgo = new Date(now.getTime() - 3 * 60 * 60 * 1000);
  const fourHoursAgo = new Date(now.getTime() - 4 * 60 * 60 * 1000);
  
  return [
    {
      id: uuidv4(),
      role: 'investor',
      content: "Hello! I'm interested in securing funding for this property. I'm looking for $950,000 with a 12-month term.",
      timestamp: fourHoursAgo,
      status: 'countered',
      offerDetails: {
        amount: 950000,
        interestRate: 6.5,
        term: 365,
        additionalTerms: 'Looking for quick closing within 30 days.'
      }
    },
    {
      id: uuidv4(),
      role: 'lender',
      content: 'Thanks for reaching out! I can offer funding, but with some adjustments to your terms.',
      timestamp: threeHoursAgo,
      status: 'countered',
      offerDetails: {
        amount: 900000,
        interestRate: 7.25,
        term: 365,
        additionalTerms: 'We can close in 45 days with standard due diligence period.'
      }
    },
    {
      id: uuidv4(),
      role: 'investor',
      content: 'I appreciate your offer. Let me counter with something that might work better for both of us.',
      timestamp: twoHoursAgo,
      status: 'countered',
      offerDetails: {
        amount: 925000,
        interestRate: 6.75,
        term: 365,
        additionalTerms: 'I can work with a 40-day closing period if we can adjust the rate slightly.'
      }
    },
    {
      id: uuidv4(),
      role: 'lender',
      content: "That's getting closer to what I can work with. Here's my final offer:",
      timestamp: oneHourAgo,
      status: 'pending',
      offerDetails: {
        amount: 925000,
        interestRate: 7.0,
        term: 365,
        additionalTerms: '40-day closing with 10-day due diligence period. Requires proof of funds and credit check.'
      }
    }
  ];
};

/**
 * NegotiationPage - A breathtaking, mobile-first page component
 * that showcases the negotiation timeline between an investor and lender.
 * This page serves as the central hub for all negotiation activities.
 */
const NegotiationPage: React.FC = () => {
  const { negotiationId } = useParams<{ negotiationId: string }>();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<NegotiationMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUserRole] = useState<MessageRole>('investor'); // In a real app, this would come from auth

  // Log the negotiationId for debugging
  useEffect(() => {
    console.log('%c NEGOTIATION PAGE LOADED ', 'background: #222; color: #bada55; font-size: 16px;');
    console.log('%c negotiationId: ', 'background: #222; color: #bada55', negotiationId);
    
    // Get offerId from URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const offerId = urlParams.get('offerId');
    console.log('%c offerId from URL: ', 'background: #222; color: #bada55', offerId);
    
    // Log the full URL for debugging
    console.log('%c Current URL: ', 'background: #222; color: #bada55', window.location.href);
    
    document.title = `Negotiation | ${negotiationId}`;
  }, [negotiationId]);

  // Handle back button click
  const handleBackClick = () => {
    // Navigate back to the funding detail page
    if (negotiationId) {
      // Use React Router's navigate instead of window.location.href
      navigate(`/funding/${negotiationId}`);
    } else {
      // Fallback to dashboard if no negotiationId
      navigate('/dashboard');
    }
  };

  useEffect(() => {
    // Simulate API call to fetch negotiation data
    const fetchNegotiation = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setMessages(generateMockMessages());
      } catch (error) {
        console.error('Failed to fetch negotiation:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNegotiation();
  }, [negotiationId]);

  const handleSendMessage = async (message: Omit<NegotiationMessage, 'id' | 'timestamp' | 'status'>) => {
    // In a real app, this would be an API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newMessage: NegotiationMessage = {
      ...message,
      id: uuidv4(),
      timestamp: new Date(),
      status: 'pending'
    };
    
    setMessages(prev => [...prev, newMessage]);
    return Promise.resolve();
  };

  const handleAcceptOffer = async (messageId: string) => {
    // In a real app, this would be an API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId 
          ? { ...msg, status: 'accepted' as MessageStatus } 
          : msg
      )
    );
    
    // Add a confirmation message
    const acceptedMessage = messages.find(m => m.id === messageId);
    if (acceptedMessage) {
      const confirmationMessage: NegotiationMessage = {
        id: uuidv4(),
        role: currentUserRole,
        content: `I accept your offer of ${new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: 0
        }).format(acceptedMessage.offerDetails?.amount || 0)} at ${acceptedMessage.offerDetails?.interestRate}% interest for ${acceptedMessage.offerDetails?.term} days.`,
        timestamp: new Date(),
        status: 'accepted'
      };
      
      setMessages(prev => [...prev, confirmationMessage]);
    }
    
    return Promise.resolve();
  };

  const handleRejectOffer = async (messageId: string) => {
    // In a real app, this would be an API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId 
          ? { ...msg, status: 'rejected' as MessageStatus } 
          : msg
      )
    );
    
    // Add a rejection message
    const rejectionMessage: NegotiationMessage = {
      id: uuidv4(),
      role: currentUserRole,
      content: "I'm sorry, but I can't accept this offer. Let's continue negotiating to find terms that work for both of us.",
      timestamp: new Date(),
      status: 'rejected'
    };
    
    setMessages(prev => [...prev, rejectionMessage]);
    return Promise.resolve();
  };

  const handleCounterOffer = async (messageId: string, counterOffer: NegotiationMessage['offerDetails']) => {
    // In a real app, this would be an API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mark the original message as countered
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId 
          ? { ...msg, status: 'countered' as MessageStatus } 
          : msg
      )
    );
    
    return Promise.resolve();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-full mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-2.5"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-40"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center">
          <button
            onClick={handleBackClick}
            className="mr-4 p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            aria-label="Go back"
          >
            <FaArrowLeft />
          </button>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Funding Negotiation</h1>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden h-[calc(100vh-12rem)]">
          <NegotiationTimeline
            negotiationId={negotiationId || '0'}
            investorName={mockInvestor.name}
            investorAvatar={mockInvestor.avatar}
            lenderName={mockLender.name}
            lenderAvatar={mockLender.avatar}
            propertyAddress={mockProperty.address}
            propertyImage={mockProperty.imageUrl}
            messages={messages}
            onSendMessage={handleSendMessage}
            onAcceptOffer={handleAcceptOffer}
            onRejectOffer={handleRejectOffer}
            onCounterOffer={handleCounterOffer}
            currentUserRole={currentUserRole}
          />
        </div>
      </main>

      {/* Footer with property summary */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 rounded-lg overflow-hidden flex-shrink-0">
              <img src={mockProperty.imageUrl} alt={mockProperty.address} className="h-full w-full object-cover" />
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-900 dark:text-white">{mockProperty.address}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {mockProperty.bedrooms} bed • {mockProperty.bathrooms} bath • {mockProperty.squareFeet.toLocaleString()} sq ft
              </p>
            </div>
            <div className="ml-auto">
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  maximumFractionDigits: 0
                }).format(mockProperty.price)}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NegotiationPage; 