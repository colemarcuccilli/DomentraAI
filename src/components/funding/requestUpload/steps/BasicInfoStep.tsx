import React, { useState, useEffect } from 'react';
import { FundingRequestData } from '../../FundingRequestContainer';

interface BasicInfoStepProps {
  formData: FundingRequestData;
  updateFormData: (data: Partial<FundingRequestData>) => void;
  updateStepValidation: (step: 1, isValid: boolean) => void;
  onNext: () => void;
  onCancel: () => void;
}

/**
 * BasicInfoStep - A breathtaking, mobile-first component
 * for collecting basic deal information with elegant form controls.
 */
const BasicInfoStep: React.FC<BasicInfoStepProps> = ({
  formData,
  updateFormData,
  updateStepValidation,
  onNext,
  onCancel
}) => {
  // Local validation state
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Property types
  const propertyTypes = [
    'Single Family',
    'Multi-Family',
    'Commercial',
    'Land',
    'Industrial',
    'Mixed Use',
    'Other'
  ];
  
  // Funding types
  const fundingTypes = [
    'Private Money Loan',
    'Bridge/Gap',
    'EMD',
    'Double Close'
  ];
  
  // Exit strategies
  const exitStrategies = [
    'Fix n Flip',
    'Rental Income',
    'Quick Resale',
    'Development',
    'Refinance',
    'Other'
  ];
  
  // Risk levels
  const riskLevels = ['Low', 'Medium', 'High'];
  
  // Validate the form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Required fields
    if (!formData.propertyAddress) {
      newErrors.propertyAddress = 'Property address is required';
    }
    
    if (!formData.propertyType) {
      newErrors.propertyType = 'Property type is required';
    }
    
    if (!formData.fundingType) {
      newErrors.fundingType = 'Funding type is required';
    }
    
    if (!formData.amountRequested) {
      newErrors.amountRequested = 'Amount requested is required';
    } else if (isNaN(Number(formData.amountRequested)) || Number(formData.amountRequested) <= 0) {
      newErrors.amountRequested = 'Amount must be a positive number';
    }
    
    if (!formData.projectedReturn) {
      newErrors.projectedReturn = 'Projected return is required';
    } else if (isNaN(Number(formData.projectedReturn)) || Number(formData.projectedReturn) <= 0) {
      newErrors.projectedReturn = 'Return must be a positive number';
    }
    
    if (!formData.lengthOfFunding) {
      newErrors.lengthOfFunding = 'Length of funding is required';
    }
    
    if (!formData.exitStrategy) {
      newErrors.exitStrategy = 'Exit strategy is required';
    }
    
    if (!formData.riskLevel) {
      newErrors.riskLevel = 'Risk level is required';
    }
    
    // Update error state
    setErrors(newErrors);
    
    // Update parent validation state
    const isValid = Object.keys(newErrors).length === 0;
    updateStepValidation(1, isValid);
    
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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    // Convert numeric values
    if (type === 'number') {
      updateFormData({ [name]: parseFloat(value) || 0 });
    } else {
      updateFormData({ [name]: value });
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-md">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Step 1: Basic Deal Information
        </h3>
        
        {/* Property Details Section */}
        <div className="mb-8">
          <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-4">
            Property Details
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Property Address */}
            <div className="col-span-1 md:col-span-2">
              <label htmlFor="propertyAddress" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Property Address
              </label>
              <input
                type="text"
                id="propertyAddress"
                name="propertyAddress"
                value={formData.propertyAddress}
                onChange={handleChange}
                placeholder="123 Maple Avenue, Fort Wayne, IN"
                className={`
                  block w-full rounded-md shadow-sm sm:text-sm
                  ${errors.propertyAddress
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500 dark:border-red-700'
                    : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600'
                  }
                  dark:bg-gray-700 dark:text-white
                `}
              />
              {errors.propertyAddress && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.propertyAddress}</p>
              )}
            </div>
            
            {/* Property Type */}
            <div>
              <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Property Type
              </label>
              <select
                id="propertyType"
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                className={`
                  block w-full rounded-md shadow-sm sm:text-sm
                  ${errors.propertyType
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500 dark:border-red-700'
                    : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600'
                  }
                  dark:bg-gray-700 dark:text-white
                `}
              >
                <option value="">Select Property Type</option>
                {propertyTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              {errors.propertyType && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.propertyType}</p>
              )}
            </div>
            
            {/* Property Details (Beds, Baths, etc.) */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label htmlFor="beds" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Beds
                </label>
                <input
                  type="number"
                  id="beds"
                  name="beds"
                  value={formData.beds || ''}
                  onChange={handleChange}
                  min="0"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              
              <div>
                <label htmlFor="baths" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Baths
                </label>
                <input
                  type="number"
                  id="baths"
                  name="baths"
                  value={formData.baths || ''}
                  onChange={handleChange}
                  min="0"
                  step="0.5"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              
              <div>
                <label htmlFor="sqft" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Sqft
                </label>
                <input
                  type="number"
                  id="sqft"
                  name="sqft"
                  value={formData.sqft || ''}
                  onChange={handleChange}
                  min="0"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Funding Details Section */}
        <div className="mb-8">
          <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-4">
            Funding Details
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Funding Type */}
            <div>
              <label htmlFor="fundingType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Funding Type
              </label>
              <select
                id="fundingType"
                name="fundingType"
                value={formData.fundingType}
                onChange={handleChange}
                className={`
                  block w-full rounded-md shadow-sm sm:text-sm
                  ${errors.fundingType
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500 dark:border-red-700'
                    : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600'
                  }
                  dark:bg-gray-700 dark:text-white
                `}
              >
                <option value="">Select Funding Type</option>
                {fundingTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              {errors.fundingType && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.fundingType}</p>
              )}
            </div>
            
            {/* Amount Requested */}
            <div>
              <label htmlFor="amountRequested" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Amount Requested
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 dark:text-gray-400 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  id="amountRequested"
                  name="amountRequested"
                  value={formData.amountRequested || ''}
                  onChange={handleChange}
                  min="0"
                  placeholder="175000"
                  className={`
                    block w-full pl-7 rounded-md sm:text-sm
                    ${errors.amountRequested
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500 dark:border-red-700'
                      : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600'
                    }
                    dark:bg-gray-700 dark:text-white
                  `}
                />
              </div>
              {errors.amountRequested && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.amountRequested}</p>
              )}
            </div>
            
            {/* Projected Return */}
            <div>
              <label htmlFor="projectedReturn" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Offered Return
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="number"
                  id="projectedReturn"
                  name="projectedReturn"
                  value={formData.projectedReturn || ''}
                  onChange={handleChange}
                  min="0"
                  step="0.1"
                  placeholder="15.5"
                  className={`
                    block w-full pr-12 rounded-md sm:text-sm
                    ${errors.projectedReturn
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
              {errors.projectedReturn && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.projectedReturn}</p>
              )}
            </div>
            
            {/* Length of Funding */}
            <div>
              <label htmlFor="lengthOfFunding" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Length of Funding (days)
              </label>
              <input
                type="number"
                id="lengthOfFunding"
                name="lengthOfFunding"
                value={formData.lengthOfFunding || ''}
                onChange={handleChange}
                min="1"
                placeholder="90"
                className={`
                  block w-full rounded-md shadow-sm sm:text-sm
                  ${errors.lengthOfFunding
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500 dark:border-red-700'
                    : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600'
                  }
                  dark:bg-gray-700 dark:text-white
                `}
              />
              {errors.lengthOfFunding && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.lengthOfFunding}</p>
              )}
            </div>
            
            {/* Exit Strategy */}
            <div>
              <label htmlFor="exitStrategy" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Exit Strategy
              </label>
              <select
                id="exitStrategy"
                name="exitStrategy"
                value={formData.exitStrategy}
                onChange={handleChange}
                className={`
                  block w-full rounded-md shadow-sm sm:text-sm
                  ${errors.exitStrategy
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500 dark:border-red-700'
                    : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600'
                  }
                  dark:bg-gray-700 dark:text-white
                `}
              >
                <option value="">Select Exit Strategy</option>
                {exitStrategies.map(strategy => (
                  <option key={strategy} value={strategy}>{strategy}</option>
                ))}
              </select>
              {errors.exitStrategy && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.exitStrategy}</p>
              )}
            </div>
            
            {/* Risk Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Risk Level
              </label>
              <div className="flex space-x-4">
                {riskLevels.map(level => (
                  <div key={level} className="flex items-center">
                    <input
                      id={`risk-${level}`}
                      name="riskLevel"
                      type="radio"
                      value={level}
                      checked={formData.riskLevel === level}
                      onChange={handleChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-600"
                    />
                    <label htmlFor={`risk-${level}`} className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      {level}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
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

export default BasicInfoStep; 