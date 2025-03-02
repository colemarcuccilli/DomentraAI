import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';

interface EtherealEscrowButtonProps {
  propertyId: string;
  propertyPrice: number;
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * EtherealEscrowButton - A breathtaking, mobile-first escrow button component
 * that provides a secure gateway to initiate escrow services for property
 * transactions. Features elegant animations, responsive design, and a
 * comprehensive modal interface for escrow initiation.
 */
const EtherealEscrowButton: React.FC<EtherealEscrowButtonProps> = ({
  propertyPrice,
  variant = 'primary',
  size = 'md',
  className = '',
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [escrowAmount, setEscrowAmount] = useState(propertyPrice * 0.1); // Default 10% earnest money
  const [escrowType, setEscrowType] = useState<'standard' | 'blockchain'>('standard');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const isMobile = useMediaQuery({ maxWidth: 768 });
  
  // Button styling based on variant and size
  const buttonClasses = `
    flex items-center justify-center rounded-md font-medium transition-all duration-300
    ${variant === 'primary' ? 'bg-primary-600 hover:bg-primary-700 text-white' : 
      variant === 'secondary' ? 'bg-secondary-600 hover:bg-secondary-700 text-white' : 
      'bg-accent-500 hover:bg-accent-600 text-white'}
    ${size === 'sm' ? 'px-3 py-1.5 text-sm' : 
      size === 'lg' ? 'px-6 py-3 text-lg' : 
      'px-4 py-2 text-base'}
    ${className}
    ${isProcessing ? 'opacity-75 cursor-wait' : ''}
  `;
  
  const openEscrowModal = () => {
    setIsModalOpen(true);
  };
  
  const closeEscrowModal = () => {
    setIsModalOpen(false);
  };
  
  const handleEscrowSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreeToTerms) {
      alert('Please agree to the terms and conditions');
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate API call to escrow service
    try {
      // In a real app, this would be an API call to initiate escrow
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success! Close modal and show success message
      setIsProcessing(false);
      setIsModalOpen(false);
      alert('Escrow initiated successfully! You will receive an email with next steps.');
    } catch (error) {
      setIsProcessing(false);
      alert('There was an error initiating escrow. Please try again.');
    }
  };
  
  return (
    <>
      <button
        type="button"
        className={buttonClasses}
        onClick={openEscrowModal}
        disabled={isProcessing}
        aria-label="Initiate secure escrow"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        {isProcessing ? 'Processing...' : 'Secure Escrow'}
      </button>
      
      {/* Escrow Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="escrow-modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div 
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
              aria-hidden="true"
              onClick={closeEscrowModal}
            ></div>
            
            {/* Modal panel */}
            <div className={`inline-block align-bottom bg-white dark:bg-gray-900 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle ${isMobile ? 'w-full' : 'sm:max-w-lg sm:w-full'}`}>
              <div className="bg-white dark:bg-gray-900 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900 sm:mx-0 sm:h-10 sm:w-10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white" id="escrow-modal-title">
                      Initiate Secure Escrow
                    </h3>
                    <div className="mt-4">
                      <form onSubmit={handleEscrowSubmit}>
                        <div className="space-y-4">
                          {/* Escrow Amount */}
                          <div>
                            <label htmlFor="escrow-amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Escrow Amount
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="text-gray-500 sm:text-sm">$</span>
                              </div>
                              <input
                                type="number"
                                name="escrow-amount"
                                id="escrow-amount"
                                className="input-field pl-7 pr-12"
                                placeholder="0.00"
                                value={escrowAmount}
                                onChange={(e) => setEscrowAmount(parseFloat(e.target.value))}
                                aria-describedby="escrow-amount-description"
                                min={1000}
                                max={propertyPrice}
                                required
                              />
                              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <span className="text-gray-500 sm:text-sm" id="escrow-amount-currency">
                                  USD
                                </span>
                              </div>
                            </div>
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400" id="escrow-amount-description">
                              Recommended: ${(propertyPrice * 0.1).toLocaleString()} (10% of property price)
                            </p>
                          </div>
                          
                          {/* Escrow Type */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Escrow Type
                            </label>
                            <div className="mt-2 space-y-2">
                              <div className="flex items-center">
                                <input
                                  id="escrow-standard"
                                  name="escrow-type"
                                  type="radio"
                                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                                  checked={escrowType === 'standard'}
                                  onChange={() => setEscrowType('standard')}
                                />
                                <label htmlFor="escrow-standard" className="ml-3 block text-sm text-gray-700 dark:text-gray-300">
                                  Standard Escrow (via Escrow.com)
                                </label>
                              </div>
                              <div className="flex items-center">
                                <input
                                  id="escrow-blockchain"
                                  name="escrow-type"
                                  type="radio"
                                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                                  checked={escrowType === 'blockchain'}
                                  onChange={() => setEscrowType('blockchain')}
                                />
                                <label htmlFor="escrow-blockchain" className="ml-3 block text-sm text-gray-700 dark:text-gray-300">
                                  Blockchain Escrow (Smart Contract)
                                </label>
                              </div>
                            </div>
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                              {escrowType === 'standard' 
                                ? 'Traditional escrow service with licensed agents.' 
                                : 'Decentralized escrow using smart contracts for enhanced security.'}
                            </p>
                          </div>
                          
                          {/* Terms and Conditions */}
                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input
                                id="terms"
                                name="terms"
                                type="checkbox"
                                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                                checked={agreeToTerms}
                                onChange={() => setAgreeToTerms(!agreeToTerms)}
                                required
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor="terms" className="text-gray-700 dark:text-gray-300">
                                I agree to the <a href="/terms" className="text-primary-600 hover:text-primary-500">terms and conditions</a> and understand that escrow fees will apply.
                              </label>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-6 sm:flex sm:flex-row-reverse">
                          <button
                            type="submit"
                            className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm ${isProcessing ? 'opacity-75 cursor-wait' : ''}`}
                            disabled={isProcessing}
                          >
                            {isProcessing ? (
                              <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                              </>
                            ) : 'Initiate Escrow'}
                          </button>
                          <button
                            type="button"
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:w-auto sm:text-sm"
                            onClick={closeEscrowModal}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EtherealEscrowButton; 