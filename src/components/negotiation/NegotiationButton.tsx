import React from 'react';
import { useNavigate } from 'react-router-dom';

interface NegotiationButtonProps {
  fundingRequestId: string;
  offerId?: string;
  onClose?: () => void;
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
}

/**
 * NegotiationButton - A component that handles navigation to the negotiation page
 * using direct window.location.href to ensure it works regardless of router setup.
 */
const NegotiationButton: React.FC<NegotiationButtonProps> = ({
  fundingRequestId,
  offerId,
  onClose,
  className = "inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500",
  disabled = false,
  children
}) => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (disabled) return;
    
    // Close the modal if it exists
    if (onClose) {
      onClose();
    }
    
    // Construct the URL for hash routing
    const url = offerId 
      ? `/negotiation/${fundingRequestId}?offerId=${offerId}` 
      : `/negotiation/${fundingRequestId}`;
    
    // Use navigate instead of direct window.location to work with HashRouter
    navigate(url);
  };

  return (
    <button 
      className={className}
      onClick={handleClick}
      disabled={disabled}
    >
      {children || (
        <>
          <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z" clipRule="evenodd" />
          </svg>
          {offerId ? 'Negotiate Offer' : 'Start Negotiation'}
        </>
      )}
    </button>
  );
};

export default NegotiationButton; 