import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

interface Negotiation {
  id: string;
  propertyAddress: string;
  propertyImage: string;
  counterpartyName: string;
  counterpartyAvatar: string;
  lastMessageDate: Date;
  lastMessagePreview: string;
  status: 'active' | 'pending' | 'completed' | 'expired';
  amount: number;
  interestRate: number;
  term: number;
}

/**
 * Negotiations - A breathtaking, mobile-first page component
 * that displays all negotiations for the current user.
 * This serves as a central hub for tracking all ongoing and past negotiations.
 */
const Negotiations: React.FC = () => {
  const navigate = useNavigate();
  const [negotiations, setNegotiations] = useState<Negotiation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  useEffect(() => {
    // Simulate API call to fetch negotiations
    const fetchNegotiations = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockNegotiations: Negotiation[] = [
          {
            id: uuidv4(),
            propertyAddress: '123 Celestial Avenue, Starlight City, CA 94103',
            propertyImage: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
            counterpartyName: 'Jordan Chen',
            counterpartyAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
            lastMessageDate: new Date(Date.now() - 2 * 60 * 60 * 1000),
            lastMessagePreview: "I can offer funding, but with some adjustments to your terms.",
            status: 'active',
            amount: 925000,
            interestRate: 7.0,
            term: 365
          },
          {
            id: uuidv4(),
            propertyAddress: '456 Dreamscape Boulevard, Harmony Heights, NY 10001',
            propertyImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
            counterpartyName: 'Taylor Rodriguez',
            counterpartyAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80',
            lastMessageDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            lastMessagePreview: "Let's finalize the terms. I'm ready to move forward.",
            status: 'pending',
            amount: 750000,
            interestRate: 6.5,
            term: 180
          },
          {
            id: uuidv4(),
            propertyAddress: '789 Serenity Lane, Tranquil Valley, FL 33101',
            propertyImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
            counterpartyName: 'Morgan Smith',
            counterpartyAvatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
            lastMessageDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
            lastMessagePreview: "Deal completed. Congratulations on your new funding!",
            status: 'completed',
            amount: 1200000,
            interestRate: 7.25,
            term: 365
          }
        ];
        
        setNegotiations(mockNegotiations);
      } catch (error) {
        console.error('Failed to fetch negotiations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNegotiations();
  }, []);

  const formatDate = (date: Date): string => {
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInDays === 1) {
      return 'Yesterday';
    } else if (diffInDays < 7) {
      return date.toLocaleDateString([], { weekday: 'long' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getStatusBadgeClass = (status: Negotiation['status']): string => {
    switch (status) {
      case 'active':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'expired':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const filteredNegotiations = activeFilter === 'all' 
    ? negotiations 
    : negotiations.filter(negotiation => negotiation.status === activeFilter);

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 md:mb-0">
            Negotiations
          </h1>
          
          <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                activeFilter === 'all'
                  ? 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300'
                  : 'bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveFilter('active')}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                activeFilter === 'active'
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                  : 'bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setActiveFilter('pending')}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                activeFilter === 'pending'
                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                  : 'bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setActiveFilter('completed')}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                activeFilter === 'completed'
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                  : 'bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Completed
            </button>
          </div>
        </div>
        
        {filteredNegotiations.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No negotiations found</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {activeFilter === 'all' 
                ? "You don't have any negotiations yet." 
                : `You don't have any ${activeFilter} negotiations.`}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredNegotiations.map((negotiation) => (
              <div 
                key={negotiation.id}
                onClick={() => navigate(`/negotiation/${negotiation.id}`)}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-lg hover:translate-y-[-2px]"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/4 h-48 md:h-auto relative">
                    <img 
                      src={negotiation.propertyImage} 
                      alt={negotiation.propertyAddress}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(negotiation.status)}`}>
                        {negotiation.status.charAt(0).toUpperCase() + negotiation.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-4 md:p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">
                        {negotiation.propertyAddress}
                      </h2>
                      
                      <div className="flex flex-wrap gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Amount</p>
                          <p className="font-medium text-gray-900 dark:text-white">{formatCurrency(negotiation.amount)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Interest Rate</p>
                          <p className="font-medium text-gray-900 dark:text-white">{negotiation.interestRate}%</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Term</p>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {negotiation.term} {negotiation.term === 1 ? 'day' : 'days'}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center mt-4">
                      <img 
                        src={negotiation.counterpartyAvatar} 
                        alt={negotiation.counterpartyName}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {negotiation.counterpartyName}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                          {negotiation.lastMessagePreview}
                        </p>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {formatDate(negotiation.lastMessageDate)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Negotiations; 