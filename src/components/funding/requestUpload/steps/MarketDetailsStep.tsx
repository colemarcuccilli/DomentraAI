import React, { useState, useEffect } from 'react';
import { FundingRequestData } from '../FundingRequestUpload';

interface MarketDetailsStepProps {
  formData: FundingRequestData;
  updateFormData: (data: Partial<FundingRequestData>) => void;
  updateStepValidation: (isValid: boolean) => void;
  onNext: () => void;
  onPrev: () => void;
}

/**
 * MarketDetailsStep - A breathtaking, mobile-first component
 * for collecting market analysis data with elegant form controls.
 */
const MarketDetailsStep: React.FC<MarketDetailsStepProps> = ({
  formData,
  updateFormData,
  updateStepValidation,
  onNext,
  onPrev
}) => {
  // Local validation state
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Market trend options
  const marketTrendOptions = [
    'Rapidly Appreciating',
    'Steady Growth',
    'Stable',
    'Slight Decline',
    'Significant Decline'
  ];
  
  // Rental demand options
  const rentalDemandOptions = [
    'Very High',
    'High',
    'Moderate',
    'Low',
    'Very Low'
  ];
  
  // Validate form fields
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Required fields
    if (!formData.marketTrend) newErrors.marketTrend = 'Market trend is required';
    if (!formData.rentalDemand) newErrors.rentalDemand = 'Rental demand is required';
    if (!formData.avgHomePrice || formData.avgHomePrice <= 0) {
      newErrors.avgHomePrice = 'Valid average home price is required';
    }
    if (!formData.medianIncome || formData.medianIncome <= 0) {
      newErrors.medianIncome = 'Valid median income is required';
    }
    if (!formData.jobGrowthRate) {
      newErrors.jobGrowthRate = 'Job growth rate is required';
    }
    if (!formData.marketAnalysis || formData.marketAnalysis.trim().length < 50) {
      newErrors.marketAnalysis = 'Please provide a detailed market analysis (at least 50 characters)';
    }
    
    setErrors(newErrors);
    
    // Update parent validation state
    const isValid = Object.keys(newErrors).length === 0;
    updateStepValidation(isValid);
    
    return isValid;
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onNext();
    }
  };
  
  // Validate on mount and when form data changes
  useEffect(() => {
    validateForm();
  }, [formData]);
  
  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    
    // Convert numeric values
    if (type === 'number') {
      updateFormData({ [name]: parseFloat(value) || 0 });
    } else {
      updateFormData({ [name]: value });
    }
  };
  
  // Calculate market score based on inputs
  const calculateMarketScore = (): number => {
    let score = 0;
    
    // Market trend score (0-5)
    if (formData.marketTrend) {
      const trendIndex = marketTrendOptions.indexOf(formData.marketTrend);
      if (trendIndex >= 0) {
        score += 5 - trendIndex; // Higher score for better trends
      }
    }
    
    // Rental demand score (0-5)
    if (formData.rentalDemand) {
      const demandIndex = rentalDemandOptions.indexOf(formData.rentalDemand);
      if (demandIndex >= 0) {
        score += 5 - demandIndex; // Higher score for better demand
      }
    }
    
    // Job growth score (0-5)
    if (formData.jobGrowthRate) {
      const jobGrowth = parseFloat(formData.jobGrowthRate);
      if (jobGrowth <= 0) score += 0;
      else if (jobGrowth < 1) score += 1;
      else if (jobGrowth < 2) score += 2;
      else if (jobGrowth < 3) score += 3;
      else if (jobGrowth < 4) score += 4;
      else score += 5;
    }
    
    // Normalize to 0-100 scale
    return Math.min(Math.round((score / 15) * 100), 100);
  };
  
  // Get market score color
  const getMarketScoreColor = (score: number): string => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 60) return 'text-blue-600 dark:text-blue-400';
    if (score >= 40) return 'text-yellow-600 dark:text-yellow-400';
    if (score >= 20) return 'text-orange-600 dark:text-orange-400';
    return 'text-red-600 dark:text-red-400';
  };
  
  // Calculate and update market score
  useEffect(() => {
    const score = calculateMarketScore();
    if (score !== formData.marketScore) {
      updateFormData({ marketScore: score });
    }
  }, [formData.marketTrend, formData.rentalDemand, formData.jobGrowthRate]);
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-md">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Step 4: Market Analysis
        </h3>
        
        {/* Market Trends Section */}
        <div className="mb-8">
          <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-4">
            Market Trends
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Market Trend */}
            <div>
              <label htmlFor="marketTrend" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Current Market Trend
              </label>
              <select
                id="marketTrend"
                name="marketTrend"
                value={formData.marketTrend}
                onChange={handleChange}
                className={`
                  block w-full rounded-md shadow-sm sm:text-sm
                  ${errors.marketTrend
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500 dark:border-red-700'
                    : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600'
                  }
                  dark:bg-gray-700 dark:text-white
                `}
              >
                <option value="">Select Market Trend</option>
                {marketTrendOptions.map(trend => (
                  <option key={trend} value={trend}>{trend}</option>
                ))}
              </select>
              {errors.marketTrend && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.marketTrend}</p>
              )}
            </div>
            
            {/* Rental Demand */}
            <div>
              <label htmlFor="rentalDemand" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Rental Demand
              </label>
              <select
                id="rentalDemand"
                name="rentalDemand"
                value={formData.rentalDemand}
                onChange={handleChange}
                className={`
                  block w-full rounded-md shadow-sm sm:text-sm
                  ${errors.rentalDemand
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500 dark:border-red-700'
                    : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600'
                  }
                  dark:bg-gray-700 dark:text-white
                `}
              >
                <option value="">Select Rental Demand</option>
                {rentalDemandOptions.map(demand => (
                  <option key={demand} value={demand}>{demand}</option>
                ))}
              </select>
              {errors.rentalDemand && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.rentalDemand}</p>
              )}
            </div>
          </div>
        </div>
        
        {/* Market Statistics Section */}
        <div className="mb-8">
          <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-4">
            Market Statistics
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Average Home Price */}
            <div>
              <label htmlFor="avgHomePrice" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Average Home Price
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 dark:text-gray-400 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  id="avgHomePrice"
                  name="avgHomePrice"
                  value={formData.avgHomePrice || ''}
                  onChange={handleChange}
                  min="0"
                  placeholder="250000"
                  className={`
                    block w-full pl-7 rounded-md sm:text-sm
                    ${errors.avgHomePrice
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500 dark:border-red-700'
                      : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600'
                    }
                    dark:bg-gray-700 dark:text-white
                  `}
                />
              </div>
              {errors.avgHomePrice && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.avgHomePrice}</p>
              )}
            </div>
            
            {/* Median Income */}
            <div>
              <label htmlFor="medianIncome" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Median Household Income
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 dark:text-gray-400 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  id="medianIncome"
                  name="medianIncome"
                  value={formData.medianIncome || ''}
                  onChange={handleChange}
                  min="0"
                  placeholder="65000"
                  className={`
                    block w-full pl-7 rounded-md sm:text-sm
                    ${errors.medianIncome
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500 dark:border-red-700'
                      : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600'
                    }
                    dark:bg-gray-700 dark:text-white
                  `}
                />
              </div>
              {errors.medianIncome && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.medianIncome}</p>
              )}
            </div>
            
            {/* Job Growth Rate */}
            <div>
              <label htmlFor="jobGrowthRate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Annual Job Growth Rate (%)
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="number"
                  id="jobGrowthRate"
                  name="jobGrowthRate"
                  value={formData.jobGrowthRate || ''}
                  onChange={handleChange}
                  step="0.1"
                  placeholder="2.5"
                  className={`
                    block w-full rounded-md sm:text-sm
                    ${errors.jobGrowthRate
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500 dark:border-red-700'
                      : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600'
                    }
                    dark:bg-gray-700 dark:text-white
                  `}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 dark:text-gray-400 sm:text-sm">%</span>
                </div>
              </div>
              {errors.jobGrowthRate && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.jobGrowthRate}</p>
              )}
            </div>
          </div>
        </div>
        
        {/* Market Score */}
        <div className="mb-8">
          <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-4">
            Market Score
          </h4>
          
          <div className="bg-gray-50 dark:bg-gray-700 rounded-md p-4 border border-gray-200 dark:border-gray-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Based on your market data, we've calculated a market score:
                </p>
                <p className={`text-2xl font-bold mt-1 ${getMarketScoreColor(formData.marketScore || 0)}`}>
                  {formData.marketScore || 0}/100
                </p>
              </div>
              
              <div className="hidden md:block">
                <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 13H5V21H3V13Z" className={getMarketScoreColor(20)} />
                  <path d="M8 9H10V21H8V9Z" className={getMarketScoreColor(40)} />
                  <path d="M13 5H15V21H13V5Z" className={getMarketScoreColor(60)} />
                  <path d="M18 2H20V21H18V2Z" className={getMarketScoreColor(80)} />
                </svg>
              </div>
            </div>
            
            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              <p>This score helps investors gauge the market potential.</p>
            </div>
          </div>
        </div>
        
        {/* Market Analysis */}
        <div className="mb-4">
          <label htmlFor="marketAnalysis" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Detailed Market Analysis
          </label>
          <textarea
            id="marketAnalysis"
            name="marketAnalysis"
            rows={5}
            value={formData.marketAnalysis || ''}
            onChange={handleChange}
            placeholder="Provide a detailed analysis of the local market conditions, including growth potential, comparable sales, and any unique factors that make this a good investment opportunity..."
            className={`
              block w-full rounded-md sm:text-sm
              ${errors.marketAnalysis
                ? 'border-red-300 focus:ring-red-500 focus:border-red-500 dark:border-red-700'
                : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600'
              }
              dark:bg-gray-700 dark:text-white
            `}
          />
          {errors.marketAnalysis && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.marketAnalysis}</p>
          )}
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Provide a comprehensive analysis of the local market. Include information about recent sales, 
            neighborhood developments, and why this property represents a good investment opportunity.
          </p>
        </div>
      </div>
      
      <div className="flex justify-between">
        <button
          type="button"
          onClick={onPrev}
          className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md shadow-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
        >
          <svg className="mr-2 -ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Previous
        </button>
        
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
        >
          Next
          <svg className="ml-2 -mr-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default MarketDetailsStep; 