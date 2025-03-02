import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import DreamscapeMatchmaking from '../components/DreamscapeMatchmaking';

/**
 * CelestialMatchmaking - A breathtaking, mobile-first matchmaking page
 * that connects real estate investors with private lenders through AI-driven algorithms.
 * Features elegant animations, comprehensive filtering options, and a stunning
 * visual interface for exploring funding opportunities.
 */
const CelestialMatchmaking: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [propertyValue, setPropertyValue] = useState(250000);
  const [loanAmount, setLoanAmount] = useState(175000);
  const [propertyType, setPropertyType] = useState('Single Family');
  const [investmentStrategy, setInvestmentStrategy] = useState('Fix and Flip');
  const [timeline, setTimeline] = useState(12);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  
  const isMobile = useMediaQuery({ maxWidth: 768 });
  
  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Calculate loan-to-value ratio
  const ltv = (loanAmount / propertyValue) * 100;
  
  // Handle property value change
  const handlePropertyValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setPropertyValue(value);
    // Automatically adjust loan amount to maintain LTV ratio
    setLoanAmount(Math.round(value * (loanAmount / propertyValue)));
  };
  
  // Handle loan amount change
  const handleLoanAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoanAmount(parseInt(e.target.value));
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-12 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">
            AI-Powered Lender Matchmaking
          </h1>
          <p className="text-xl md:text-2xl text-primary-100 mb-8 animate-fade-in-delay">
            Find your perfect funding partner in minutes, not days
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 animate-fade-in-up">
              <p className="text-3xl font-bold">$2.8B+</p>
              <p className="text-sm text-primary-100">Total Funded</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 animate-fade-in-up delay-100">
              <p className="text-3xl font-bold">94%</p>
              <p className="text-sm text-primary-100">Match Success Rate</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 animate-fade-in-up delay-200">
              <p className="text-3xl font-bold">5,400+</p>
              <p className="text-sm text-primary-100">Active Lenders</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 animate-fade-in-up delay-300">
              <p className="text-3xl font-bold">48hrs</p>
              <p className="text-sm text-primary-100">Avg. Funding Time</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Funding Criteria Form */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Your Funding Criteria
              </h2>
              
              {isLoading ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                  <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                  <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="propertyValue" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Property Value
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 dark:text-gray-400">$</span>
                      <input
                        type="number"
                        id="propertyValue"
                        value={propertyValue}
                        onChange={handlePropertyValueChange}
                        className="pl-8 w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        min="50000"
                        max="10000000"
                        step="10000"
                      />
                    </div>
                    <div className="mt-2">
                      <input
                        type="range"
                        value={propertyValue}
                        onChange={handlePropertyValueChange}
                        min="50000"
                        max="2000000"
                        step="10000"
                        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-600"
                      />
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                        <span>$50k</span>
                        <span>$2M+</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="loanAmount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Loan Amount
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 dark:text-gray-400">$</span>
                      <input
                        type="number"
                        id="loanAmount"
                        value={loanAmount}
                        onChange={handleLoanAmountChange}
                        className="pl-8 w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        min="25000"
                        max={propertyValue}
                        step="5000"
                      />
                    </div>
                    <div className="mt-2">
                      <input
                        type="range"
                        value={loanAmount}
                        onChange={handleLoanAmountChange}
                        min="25000"
                        max={propertyValue}
                        step="5000"
                        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-600"
                      />
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs text-gray-500 dark:text-gray-400">$25k</span>
                        <span className="text-sm font-medium text-primary-600 dark:text-primary-400">LTV: {ltv.toFixed(1)}%</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">${(propertyValue/1000).toFixed(0)}k</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Property Type
                    </label>
                    <select
                      id="propertyType"
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    >
                      <option value="Single Family">Single Family</option>
                      <option value="Multi-Family">Multi-Family (2-4 units)</option>
                      <option value="Apartment">Apartment Building (5+ units)</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Land">Land</option>
                      <option value="Mixed Use">Mixed Use</option>
                    </select>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="investmentStrategy" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Investment Strategy
                    </label>
                    <select
                      id="investmentStrategy"
                      value={investmentStrategy}
                      onChange={(e) => setInvestmentStrategy(e.target.value)}
                      className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    >
                      <option value="Fix and Flip">Fix and Flip</option>
                      <option value="Buy and Hold">Buy and Hold</option>
                      <option value="BRRRR">BRRRR Strategy</option>
                      <option value="New Construction">New Construction</option>
                      <option value="Wholesale">Wholesale</option>
                    </select>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Loan Term (months)
                    </label>
                    <select
                      id="timeline"
                      value={timeline}
                      onChange={(e) => setTimeline(parseInt(e.target.value))}
                      className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    >
                      <option value="6">6 months</option>
                      <option value="12">12 months</option>
                      <option value="18">18 months</option>
                      <option value="24">24 months</option>
                      <option value="36">36 months</option>
                    </select>
                  </div>
                  
                  <div className="mb-6">
                    <button
                      type="button"
                      onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                      className="text-primary-600 dark:text-primary-400 text-sm font-medium flex items-center"
                    >
                      {showAdvancedOptions ? 'Hide' : 'Show'} Advanced Options
                      <svg className={`ml-1 h-4 w-4 transition-transform ${showAdvancedOptions ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {showAdvancedOptions && (
                      <div className="mt-3 space-y-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                        <div>
                          <label className="flex items-center">
                            <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Interest-only payments</span>
                          </label>
                        </div>
                        <div>
                          <label className="flex items-center">
                            <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">No prepayment penalty</span>
                          </label>
                        </div>
                        <div>
                          <label className="flex items-center">
                            <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Fast closing (under 7 days)</span>
                          </label>
                        </div>
                        <div>
                          <label className="flex items-center">
                            <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">No income verification</span>
                          </label>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Finding Matches...
                      </>
                    ) : (
                      'Find My Perfect Lender'
                    )}
                  </button>
                </form>
              )}
            </div>
            
            {/* Testimonial */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-6">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <img 
                    src="https://randomuser.me/api/portraits/men/54.jpg" 
                    alt="Testimonial" 
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Michael Thompson</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Real Estate Investor</p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 italic">
                "Domentra's matchmaking algorithm found me a lender in less than 5 minutes. The terms were better than anything I could find on my own, and I closed on my property within a week. Absolutely game-changing!"
              </p>
              <div className="mt-3 flex items-center">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Funded $1.2M deal in Atlanta, GA</span>
              </div>
            </div>
          </div>
          
          {/* Matchmaking Results */}
          <div className="lg:col-span-2">
            <DreamscapeMatchmaking 
              propertyValue={propertyValue}
              loanAmount={loanAmount}
              propertyType={propertyType}
              investmentStrategy={investmentStrategy}
              timeline={timeline}
              className="h-full"
            />
          </div>
        </div>
        
        {/* How It Works Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
            How Our AI Matchmaking Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">1. Share Your Criteria</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Tell us about your property, investment strategy, and funding needs. The more details you provide, the better your matches.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">2. AI Analyzes Thousands of Lenders</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Our proprietary algorithm analyzes over 5,400 active lenders, considering 50+ factors to find your perfect match.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">3. Connect & Fund</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Review your matches, connect directly with lenders, and get funded in as little as 48 hours with our streamlined process.
              </p>
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Frequently Asked Questions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Is there a fee to use the matchmaking service?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                No, our matchmaking service is completely free for investors. We're compensated by our lending partners when a successful match is made.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                How quickly can I get funded?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Many of our lenders can fund in as little as 48 hours. The average funding time across our platform is 5 business days.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                What types of properties can be funded?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Our lender network covers single-family, multi-family, commercial, land, and mixed-use properties. We have specialists for every property type and investment strategy.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                What information do I need to provide?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                To start, just the basic information about your property and funding needs. Once matched, lenders may request additional documentation depending on their requirements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CelestialMatchmaking; 