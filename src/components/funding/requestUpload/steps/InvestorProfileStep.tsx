import React, { useState, useEffect } from 'react';
import { FundingRequestData } from '../../FundingRequestContainer';

interface InvestorProfileStepProps {
  formData: FundingRequestData;
  updateFormData: (data: Partial<FundingRequestData>) => void;
  updateStepValidation: (step: 2, isValid: boolean) => void;
  onNext: () => void;
  onPrev: () => void;
}

/**
 * InvestorProfileStep - A breathtaking, mobile-first component
 * for collecting investor profile information with elegant form controls.
 */
const InvestorProfileStep: React.FC<InvestorProfileStepProps> = ({
  formData,
  updateFormData,
  updateStepValidation,
  onNext,
  onPrev
}) => {
  // Local validation state
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Validate form fields
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Required fields
    if (!formData.investorName) newErrors.investorName = 'Investor name is required';
    if (!formData.businessName) newErrors.businessName = 'Business name is required';
    if (!formData.yearsInBusiness || formData.yearsInBusiness <= 0) {
      newErrors.yearsInBusiness = 'Valid years in business is required';
    }
    if (!formData.dealsCompleted || formData.dealsCompleted < 0) {
      newErrors.dealsCompleted = 'Valid number of deals is required';
    }
    if (!formData.agreeToVerification) {
      newErrors.agreeToVerification = 'You must agree to Domentra\'s verification process';
    }
    
    setErrors(newErrors);
    
    // Update parent validation state
    const isValid = Object.keys(newErrors).length === 0;
    updateStepValidation(2, isValid);
    
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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      updateFormData({ [name]: checked });
    } else if (type === 'number') {
      updateFormData({ [name]: parseFloat(value) || 0 });
    } else {
      updateFormData({ [name]: value });
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-md">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Step 2: Investor Profile
        </h3>
        
        <div className="mb-8">
          <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-4">
            Investor Information
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Investor Name */}
            <div>
              <label htmlFor="investorName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Investor Name
              </label>
              <input
                type="text"
                id="investorName"
                name="investorName"
                value={formData.investorName}
                onChange={handleChange}
                placeholder="Michael Johnson"
                className={`
                  block w-full rounded-md shadow-sm sm:text-sm
                  ${errors.investorName
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500 dark:border-red-700'
                    : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600'
                  }
                  dark:bg-gray-700 dark:text-white
                `}
              />
              {errors.investorName && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.investorName}</p>
              )}
            </div>
            
            {/* Business Name */}
            <div>
              <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Business Name
              </label>
              <input
                type="text"
                id="businessName"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                placeholder="Golden Gate Investments"
                className={`
                  block w-full rounded-md shadow-sm sm:text-sm
                  ${errors.businessName
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500 dark:border-red-700'
                    : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600'
                  }
                  dark:bg-gray-700 dark:text-white
                `}
              />
              {errors.businessName && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.businessName}</p>
              )}
            </div>
            
            {/* Years in Business */}
            <div>
              <label htmlFor="yearsInBusiness" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Years in Business
              </label>
              <input
                type="number"
                id="yearsInBusiness"
                name="yearsInBusiness"
                value={formData.yearsInBusiness || ''}
                onChange={handleChange}
                min="0"
                placeholder="8"
                className={`
                  block w-full rounded-md shadow-sm sm:text-sm
                  ${errors.yearsInBusiness
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500 dark:border-red-700'
                    : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600'
                  }
                  dark:bg-gray-700 dark:text-white
                `}
              />
              {errors.yearsInBusiness && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.yearsInBusiness}</p>
              )}
            </div>
            
            {/* Deals Completed */}
            <div>
              <label htmlFor="dealsCompleted" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Deals Completed in Past 12 Months
              </label>
              <input
                type="number"
                id="dealsCompleted"
                name="dealsCompleted"
                value={formData.dealsCompleted || ''}
                onChange={handleChange}
                min="0"
                placeholder="25"
                className={`
                  block w-full rounded-md shadow-sm sm:text-sm
                  ${errors.dealsCompleted
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500 dark:border-red-700'
                    : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600'
                  }
                  dark:bg-gray-700 dark:text-white
                `}
              />
              {errors.dealsCompleted && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.dealsCompleted}</p>
              )}
            </div>
            
            {/* Rating */}
            <div>
              <label htmlFor="rating" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Rating (optional)
              </label>
              <div className="flex items-center">
                <input
                  type="number"
                  id="rating"
                  name="rating"
                  value={formData.rating || ''}
                  onChange={handleChange}
                  min="0"
                  max="5"
                  step="0.1"
                  placeholder="4.8"
                  className="block w-24 rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">/ 5</span>
                
                {/* Star Rating Display */}
                <div className="ml-4 flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`h-5 w-5 ${
                        (formData.rating || 0) >= star
                          ? 'text-yellow-400'
                          : (formData.rating || 0) >= star - 0.5
                            ? 'text-yellow-300'
                            : 'text-gray-300 dark:text-gray-600'
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Verification Agreement */}
        <div className="mb-4">
          <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-4">
            Verification
          </h4>
          
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="agreeToVerification"
                name="agreeToVerification"
                type="checkbox"
                checked={formData.agreeToVerification}
                onChange={handleChange}
                className={`
                  h-4 w-4 rounded focus:ring-primary-500 text-primary-600
                  ${errors.agreeToVerification
                    ? 'border-red-300 dark:border-red-700'
                    : 'border-gray-300 dark:border-gray-600'
                  }
                `}
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="agreeToVerification" className="font-medium text-gray-700 dark:text-gray-300">
                I agree to Domentra's verification process
              </label>
              <p className="text-gray-500 dark:text-gray-400">
                This includes background checks, contract review, and financial verification to ensure the highest quality listings for lenders.
              </p>
              {errors.agreeToVerification && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.agreeToVerification}</p>
              )}
            </div>
          </div>
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

export default InvestorProfileStep; 