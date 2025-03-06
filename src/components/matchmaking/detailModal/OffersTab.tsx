import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NegotiationButton from '../../negotiation/NegotiationButton';

interface Offer {
  id: string;
  lenderName: string;
  lenderVerified: boolean;
  amount: number;
  interestRate: number;
  term: number;
  status: string;
  dateSubmitted: string;
  message?: string;
}

interface OffersTabProps {
  offers: Offer[];
  hasOffers: boolean;
  fundingRequestId?: string;
  onClose?: () => void; // Optional prop for closing modal
}

/**
 * OffersTab - A breathtaking, mobile-first component
 * for displaying funding offers with elegant animations and hover effects.
 * Shows a list of offers or a placeholder when no offers are available.
 */
const OffersTab: React.FC<OffersTabProps> = ({ offers, hasOffers, fundingRequestId, onClose }) => {
  const navigate = useNavigate();
  const [acceptedOfferId, setAcceptedOfferId] = useState<string | null>(null);
  const [declinedOfferId, setDeclinedOfferId] = useState<string | null>(null);
  const [isAccepting, setIsAccepting] = useState(false);
  const [isDeclining, setIsDeclining] = useState(false);

  // Format term length to human-readable format
  const formatTermLength = (days: number): string => {
    if (days < 30) return `${days} days`;
    if (days < 365) return `${Math.round(days / 30)} months`;
    return `${Math.round(days / 365)} years`;
  };

  const handleAcceptOffer = async (offerId: string) => {
    if (!fundingRequestId) {
      console.error('Cannot accept offer: fundingRequestId is undefined');
      return;
    }

    setIsAccepting(true);
    setAcceptedOfferId(offerId);

    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Close the modal if it exists
      if (onClose) {
        onClose();
      }
      
      // Navigate to a success page or dashboard
      navigate(`/dashboard?acceptedOffer=${offerId}&fundingRequestId=${fundingRequestId}`);
    } catch (error) {
      console.error('Error accepting offer:', error);
      setAcceptedOfferId(null);
    } finally {
      setIsAccepting(false);
    }
  };

  const handleDeclineOffer = async (offerId: string) => {
    if (!fundingRequestId) {
      console.error('Cannot decline offer: fundingRequestId is undefined');
      return;
    }

    setIsDeclining(true);
    setDeclinedOfferId(offerId);

    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update the local state to reflect the declined offer
      // In a real app, you would refresh the data from the server
      
      // Show a success message or update UI
      alert('Offer declined successfully');
    } catch (error) {
      console.error('Error declining offer:', error);
    } finally {
      setIsDeclining(false);
      setDeclinedOfferId(null);
    }
  };

  if (!hasOffers) {
    return (
      <div className="text-center py-12 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No offers yet</h3>
        <p className="mt-1 text-gray-500 dark:text-gray-400">
          Your funding request is visible to lenders, but you haven't received any offers yet.
        </p>
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          Average time to receive first offer: 2-3 days
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {offers.map(offer => (
        <div key={offer.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="mr-3 w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-400">
                {offer.lenderName.charAt(0)}
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                  {offer.lenderName}
                  {offer.lenderVerified && (
                    <span className="ml-1 text-blue-500 dark:text-blue-400">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                    </span>
                  )}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Submitted {new Date(offer.dateSubmitted).toLocaleDateString()}
                </p>
              </div>
            </div>
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
              {offer.status === 'pending' ? 'Pending Review' : offer.status}
            </span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
              <p className="text-gray-500 dark:text-gray-400 text-sm">Offer Amount</p>
              <p className="font-medium text-gray-900 dark:text-white">${offer.amount.toLocaleString()}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
              <p className="text-gray-500 dark:text-gray-400 text-sm">Interest Rate</p>
              <p className="font-medium text-gray-900 dark:text-white">{offer.interestRate}%</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
              <p className="text-gray-500 dark:text-gray-400 text-sm">Term</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {formatTermLength(offer.term)}
              </p>
            </div>
          </div>
          
          {offer.message && (
            <div className="mb-4">
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Message from Lender:</p>
              <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                "{offer.message}"
              </p>
            </div>
          )}
          
          <div className="flex space-x-3">
            <button 
              onClick={() => handleAcceptOffer(offer.id)}
              disabled={isAccepting}
              className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                isAccepting && acceptedOfferId === offer.id 
                  ? 'bg-primary-400 cursor-not-allowed' 
                  : 'bg-primary-600 hover:bg-primary-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500`}
            >
              {isAccepting && acceptedOfferId === offer.id ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                'Accept Offer'
              )}
            </button>
            <NegotiationButton
              fundingRequestId={fundingRequestId || ''}
              offerId={offer.id}
              onClose={onClose}
              className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                isAccepting ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
              disabled={isAccepting}
            />
            <button 
              onClick={() => handleDeclineOffer(offer.id)}
              disabled={isDeclining || isAccepting}
              className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                isDeclining && declinedOfferId === offer.id 
                  ? 'bg-red-400 cursor-not-allowed' 
                  : isAccepting ? 'bg-red-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500`}
            >
              {isDeclining && declinedOfferId === offer.id ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                'Decline'
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OffersTab; 