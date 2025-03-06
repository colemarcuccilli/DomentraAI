import React, { useState, useEffect } from 'react';
import { FundingRequestData } from '../../FundingRequestContainer';

interface FundingDetailsStepProps {
  formData: FundingRequestData;
  updateFormData: (data: Partial<FundingRequestData>) => void;
  updateStepValidation: (step: 2, isValid: boolean) => void;
  onNext: () => void;
  onPrev: () => void;
}

/**
 * FundingDetailsStep - A breathtaking, mobile-first component
 * for collecting funding details with elegant form controls.
 */
const FundingDetailsStep: React.FC<FundingDetailsStepProps> = ({
  formData,
  updateFormData,
  updateStepValidation,
  onNext,
  onPrev
}) => {
  // Local validation state
  const [errors, setErrors] = useState<Record<string, string>>({});
  
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
    'Buy and Hold',
    'Wholesale',
    'Development',
    'Refinance'
  ];
  
  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    // Convert numeric values
    const processedValue = type === 'number' ? (value ? parseFloat(value) : '') : value;
    
    updateFormData({ [name]: processedValue });
  };
  
  // Validate the form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fundingType) {
      newErrors.fundingType = 'Funding type is required';
    }
    
    if (!formData.amount) {
      newErrors.amount = 'Amount is required';
    } else if (formData.amount <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }
    
    if (!formData.lengthOfFunding) {
      newErrors.lengthOfFunding = 'Length of funding is required';
    } else if (formData.lengthOfFunding <= 0) {
      newErrors.lengthOfFunding = 'Length of funding must be greater than 0';
    }
    
    if (!formData.projectedReturn) {
      newErrors.projectedReturn = 'Projected return is required';
    } else if (formData.projectedReturn <= 0) {
      newErrors.projectedReturn = 'Projected return must be greater than 0';
    }
    
    if (!formData.exitStrategy) {
      newErrors.exitStrategy = 'Exit strategy is required';
    }
    
    if (!formData.purchasePrice) {
      newErrors.purchasePrice = 'Purchase price is required';
    } else if (formData.purchasePrice <= 0) {
      newErrors.purchasePrice = 'Purchase price must be greater than 0';
    }
    
    if (!formData.arv) {
      newErrors.arv = 'After Repair Value is required';
    } else if (formData.arv <= 0) {
      newErrors.arv = 'After Repair Value must be greater than 0';
    }
    
    if (formData.rehabCost === undefined || formData.rehabCost === null) {
      newErrors.rehabCost = 'Rehab cost is required';
    } else if (formData.rehabCost < 0) {
      newErrors.rehabCost = 'Rehab cost cannot be negative';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Check validation on mount and when form data changes
  useEffect(() => {
    const isValid = validateForm();
    updateStepValidation(2, isValid);
  }, [formData]);
  
  // Handle next button click
  const handleNext = () => {
    const isValid = validateForm();
    
    if (isValid) {
      onNext();
    } else {
      // Scroll to the first error
      const firstErrorField = Object.keys(errors)[0];
      const errorElement = document.getElementById(firstErrorField);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };
  
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Funding Details</h2>
      
      <div className="space-y-6">
        {/* Funding Information */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Funding Information</h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="fundingType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Funding Type
              </label>
              <select
                id="fundingType"
                name="fundingType"
                value={formData.fundingType || ''}
                onChange={handleChange}
                className={`block w-full rounded-md shadow-sm sm:text-sm ${
                  errors.fundingType
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500 dark:border-red-700'
                    : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600'
                } dark:bg-gray-700 dark:text-white`}
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
            
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Amount Requested ($)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  min="0"
                  value={formData.amount || ''}
                  onChange={handleChange}
                  className={`block w-full pl-7 rounded-md shadow-sm sm:text-sm ${
                    errors.amount
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500 dark:border-red-700'
                      : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600'
                  } dark:bg-gray-700 dark:text-white`}
                />
              </div>
              {errors.amount && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.amount}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="lengthOfFunding" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Length of Funding (days)
              </label>
              <input
                type="number"
                id="lengthOfFunding"
                name="lengthOfFunding"
                min="1"
                value={formData.lengthOfFunding || ''}
                onChange={handleChange}
                className={`block w-full rounded-md shadow-sm sm:text-sm ${
                  errors.lengthOfFunding
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500 dark:border-red-700'
                    : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600'
                } dark:bg-gray-700 dark:text-white`}
              />
              {errors.lengthOfFunding && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.lengthOfFunding}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="projectedReturn" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Projected Return (%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="projectedReturn"
                  name="projectedReturn"
                  min="0"
                  step="0.1"
                  value={formData.projectedReturn || ''}
                  onChange={handleChange}
                  className={`block w-full pr-7 rounded-md shadow-sm sm:text-sm ${
                    errors.projectedReturn
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500 dark:border-red-700'
                      : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600'
                  } dark:bg-gray-700 dark:text-white`}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">%</span>
                </div>
              </div>
              {errors.projectedReturn && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.projectedReturn}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="exitStrategy" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Exit Strategy
              </label>
              <select
                id="exitStrategy"
                name="exitStrategy"
                value={formData.exitStrategy || ''}
                onChange={handleChange}
                className={`block w-full rounded-md shadow-sm sm:text-sm ${
                  errors.exitStrategy
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500 dark:border-red-700'
                    : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600'
                } dark:bg-gray-700 dark:text-white`}
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
          </div>
        </div>
        
        {/* Financial Information */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Financial Information</h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div>
              <label htmlFor="purchasePrice" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Purchase Price ($)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  id="purchasePrice"
                  name="purchasePrice"
                  min="0"
                  value={formData.purchasePrice || ''}
                  onChange={handleChange}
                  className={`block w-full pl-7 rounded-md shadow-sm sm:text-sm ${
                    errors.purchasePrice
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500 dark:border-red-700'
                      : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600'
                  } dark:bg-gray-700 dark:text-white`}
                />
              </div>
              {errors.purchasePrice && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.purchasePrice}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="rehabCost" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Rehab Cost ($)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  id="rehabCost"
                  name="rehabCost"
                  min="0"
                  value={formData.rehabCost || ''}
                  onChange={handleChange}
                  className={`block w-full pl-7 rounded-md shadow-sm sm:text-sm ${
                    errors.rehabCost
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500 dark:border-red-700'
                      : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600'
                  } dark:bg-gray-700 dark:text-white`}
                />
              </div>
              {errors.rehabCost && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.rehabCost}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="arv" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                After Repair Value ($)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  id="arv"
                  name="arv"
                  min="0"
                  value={formData.arv || ''}
                  onChange={handleChange}
                  className={`block w-full pl-7 rounded-md shadow-sm sm:text-sm ${
                    errors.arv
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500 dark:border-red-700'
                      : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600'
                  } dark:bg-gray-700 dark:text-white`}
                />
              </div>
              {errors.arv && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.arv}</p>
              )}
            </div>
          </div>
        </div>
        
        {/* Form Actions */}
        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={onPrev}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Back
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default FundingDetailsStep; 