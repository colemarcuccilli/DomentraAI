import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

interface LenderProfile {
  id: string;
  name: string;
  company: string;
  avatar: string;
  interestRate: number;
  loanTerms: number[];
  loanToValue: number;
  minimumLoan: number;
  maximumLoan: number;
  fundingSpeed: 'Fast' | 'Medium' | 'Standard';
  specialties: string[];
  rating: number;
  totalFunded: number;
  matchScore?: number;
}

interface DreamscapeMatchmakingProps {
  propertyValue?: number;
  loanAmount?: number;
  propertyType?: string;
  investmentStrategy?: string;
  timeline?: number;
  className?: string;
}

/**
 * DreamscapeMatchmaking - A breathtaking, mobile-first AI-driven matchmaking component
 * that connects real estate investors with private lenders. Features elegant animations,
 * intelligent matching algorithms, and a comprehensive interface for exploring funding
 * options with stunning visual feedback.
 */
const DreamscapeMatchmaking: React.FC<DreamscapeMatchmakingProps> = ({
  propertyValue = 250000,
  loanAmount = 175000,
  propertyType = 'Single Family',
  investmentStrategy = 'Fix and Flip',
  timeline = 12,
  className = '',
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [lenders, setLenders] = useState<LenderProfile[]>([]);
  const [selectedLender, setSelectedLender] = useState<LenderProfile | null>(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: `I'm interested in funding for my ${propertyType} ${investmentStrategy} project.`,
  });
  
  const isMobile = useMediaQuery({ maxWidth: 768 });
  
  // Simulate AI-driven lender matching
  useEffect(() => {
    const fetchLenders = async () => {
      setIsLoading(true);
      
      // In a real app, this would be an API call to the AI matching service
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock lender data with AI-calculated match scores
      const mockLenders: LenderProfile[] = [
        {
          id: 'lender-1',
          name: 'Alexandra Chen',
          company: 'Stellar Capital Partners',
          avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
          interestRate: 7.5,
          loanTerms: [6, 12, 24],
          loanToValue: 75,
          minimumLoan: 100000,
          maximumLoan: 2000000,
          fundingSpeed: 'Fast',
          specialties: ['Fix and Flip', 'Single Family', 'Multi-Family'],
          rating: 4.9,
          totalFunded: 15000000,
          matchScore: 98,
        },
        {
          id: 'lender-2',
          name: 'Marcus Johnson',
          company: 'Horizon Funding Group',
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
          interestRate: 8.2,
          loanTerms: [12, 24, 36],
          loanToValue: 80,
          minimumLoan: 50000,
          maximumLoan: 1000000,
          fundingSpeed: 'Medium',
          specialties: ['Buy and Hold', 'Single Family', 'Commercial'],
          rating: 4.7,
          totalFunded: 8500000,
          matchScore: 85,
        },
        {
          id: 'lender-3',
          name: 'Sophia Rodriguez',
          company: 'Luminary Real Estate Finance',
          avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
          interestRate: 6.9,
          loanTerms: [6, 12, 18],
          loanToValue: 70,
          minimumLoan: 150000,
          maximumLoan: 3000000,
          fundingSpeed: 'Fast',
          specialties: ['Fix and Flip', 'Multi-Family', 'New Construction'],
          rating: 4.8,
          totalFunded: 22000000,
          matchScore: 92,
        },
      ];
      
      setLenders(mockLenders);
      setIsLoading(false);
    };
    
    fetchLenders();
  }, [propertyType, investmentStrategy]);
  
  const handleLenderSelect = (lender: LenderProfile) => {
    setSelectedLender(lender);
  };
  
  const handleContactFormToggle = () => {
    setShowContactForm(!showContactForm);
  };
  
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    
    // In a real app, this would be an API call to send the contact request
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setShowContactForm(false);
    alert(`Your funding request has been sent to ${selectedLender?.name}! They will contact you shortly.`);
  };
  
  // Calculate loan-to-value ratio
  const ltv = (loanAmount / propertyValue) * 100;
  
  return (
    <div className={`bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden ${className}`}>
      <div className="p-4 bg-primary-600 text-white">
        <h2 className="text-xl font-bold">AI-Powered Lender Matchmaking</h2>
        <p className="text-primary-100">Finding your perfect funding partner</p>
      </div>
      
      {/* Loan Summary */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Your Funding Request</h3>
        <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} gap-4`}>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Property Value</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">${propertyValue.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Loan Amount</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">${loanAmount.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">LTV Ratio</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">{ltv.toFixed(1)}%</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Timeline</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">{timeline} months</p>
          </div>
        </div>
        <div className="mt-3">
          <p className="text-sm text-gray-500 dark:text-gray-400">Strategy</p>
          <p className="text-base font-medium text-gray-900 dark:text-white">{propertyType} - {investmentStrategy}</p>
        </div>
      </div>
      
      {/* Lender Matches */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          {isLoading ? 'Finding your matches...' : 'Your Top Lender Matches'}
        </h3>
        
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="animate-pulse-slow w-16 h-16 rounded-full bg-primary-200 dark:bg-primary-800 flex items-center justify-center">
              <svg className="w-8 h-8 text-primary-600 dark:text-primary-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Our AI is analyzing thousands of lenders to find your perfect match...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {lenders.map(lender => (
              <div 
                key={lender.id}
                className={`border rounded-lg overflow-hidden transition-all duration-300 ${
                  selectedLender?.id === lender.id 
                    ? 'border-primary-500 shadow-md' 
                    : 'border-gray-200 dark:border-gray-700 hover:shadow-md'
                }`}
              >
                <div 
                  className="p-4 cursor-pointer"
                  onClick={() => handleLenderSelect(lender)}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <img 
                        src={lender.avatar} 
                        alt={lender.name} 
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{lender.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{lender.company}</p>
                        </div>
                        <div className="text-right">
                          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200">
                            {lender.matchScore}% Match
                          </div>
                          <div className="mt-1 flex items-center">
                            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">{lender.rating}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                        <div>
                          <span className="text-gray-500 dark:text-gray-400">Interest Rate</span>
                          <p className="font-medium text-gray-900 dark:text-white">{lender.interestRate}%</p>
                        </div>
                        <div>
                          <span className="text-gray-500 dark:text-gray-400">LTV</span>
                          <p className="font-medium text-gray-900 dark:text-white">Up to {lender.loanToValue}%</p>
                        </div>
                        <div>
                          <span className="text-gray-500 dark:text-gray-400">Loan Range</span>
                          <p className="font-medium text-gray-900 dark:text-white">${(lender.minimumLoan / 1000).toFixed(0)}K-${(lender.maximumLoan / 1000000).toFixed(1)}M</p>
                        </div>
                        <div>
                          <span className="text-gray-500 dark:text-gray-400">Funding Speed</span>
                          <p className="font-medium text-gray-900 dark:text-white">{lender.fundingSpeed}</p>
                        </div>
                      </div>
                      
                      <div className="mt-3 flex flex-wrap gap-1">
                        {lender.specialties.map((specialty, index) => (
                          <span 
                            key={index}
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {selectedLender?.id === lender.id && (
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 animate-fade-in">
                    {!showContactForm ? (
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Total Funded: <span className="font-medium text-gray-900 dark:text-white">${(lender.totalFunded / 1000000).toFixed(1)}M</span>
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Loan Terms: {lender.loanTerms.join(', ')} months
                          </p>
                        </div>
                        <button
                          onClick={handleContactFormToggle}
                          className="btn-primary"
                        >
                          Request Funding
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleFormSubmit} className="animate-fade-in">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Your Name
                            </label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleFormChange}
                              className="input-field mt-1"
                              required
                            />
                          </div>
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Email Address
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleFormChange}
                              className="input-field mt-1"
                              required
                            />
                          </div>
                          <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              value={formData.phone}
                              onChange={handleFormChange}
                              className="input-field mt-1"
                              required
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Message
                            </label>
                            <textarea
                              id="message"
                              name="message"
                              rows={3}
                              value={formData.message}
                              onChange={handleFormChange}
                              className="input-field mt-1"
                              required
                            />
                          </div>
                        </div>
                        <div className="mt-4 flex justify-end space-x-3">
                          <button
                            type="button"
                            onClick={handleContactFormToggle}
                            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-400"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="btn-primary"
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Sending...
                              </>
                            ) : 'Send Funding Request'}
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DreamscapeMatchmaking; 