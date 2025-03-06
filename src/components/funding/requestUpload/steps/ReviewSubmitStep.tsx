import React, { useState } from 'react';
import { FundingRequestData } from '../../FundingRequestContainer';

interface ReviewSubmitStepProps {
  formData: FundingRequestData;
  updateFormData: (data: Partial<FundingRequestData>) => void;
  updateStepValidation: (step: 5, isValid: boolean) => void;
  onSubmit: () => void;
  onPrev: () => void;
}

/**
 * ReviewSubmitStep - A breathtaking, mobile-first component
 * for reviewing and submitting the funding request.
 */
const ReviewSubmitStep: React.FC<ReviewSubmitStepProps> = ({
  formData,
  updateFormData,
  updateStepValidation,
  onSubmit,
  onPrev
}) => {
  // State for agreement checkbox
  const [agreed, setAgreed] = useState(false);
  
  // State for validation errors
  const [error, setError] = useState<string | null>(null);
  
  // Initialize component
  React.useEffect(() => {
    // Validate on mount
    validateForm();
  }, []);
  
  // Validate the form
  const validateForm = () => {
    if (!agreed) {
      setError('Please confirm that the information is accurate');
      updateStepValidation(5, false);
      return false;
    }
    
    setError(null);
    updateStepValidation(5, true);
    return true;
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit();
    }
  };
  
  // Handle agreement checkbox change
  const handleAgreementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgreed(e.target.checked);
    
    // Validate after update
    setTimeout(validateForm, 0);
  };
  
  // Format currency
  const formatCurrency = (value: number | undefined) => {
    if (value === undefined) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };
  
  // Get risk level color
  const getRiskLevelColor = (riskLevel: string | undefined) => {
    switch (riskLevel) {
      case 'Low':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'High':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };
  
  return (
    <div className="p-6 sm:p-10">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Review & Submit
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-8">
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Please review your funding request details before submitting. You can go back to previous steps to make changes if needed.
          </p>
          
          {/* Summary Sections */}
          <div className="space-y-8">
            {/* Basic Info Section */}
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Basic Deal Information
                </h3>
                <button
                  type="button"
                  onClick={() => onPrev()}
                  className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-500"
                >
                  Edit
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Property Address</h4>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">{formData.propertyAddress || 'N/A'}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Property Type</h4>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">{formData.propertyType || 'N/A'}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Funding Type</h4>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">{formData.fundingType || 'N/A'}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Amount Requested</h4>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">{formatCurrency(formData.amountRequested)}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Projected Return</h4>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {formData.projectedReturn ? `${formData.projectedReturn}%` : 'N/A'}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Length of Funding</h4>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">{formData.lengthOfFunding || 'N/A'}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Exit Strategy</h4>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">{formData.exitStrategy || 'N/A'}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Risk Level</h4>
                  <p className="mt-1">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskLevelColor(formData.riskLevel)}`}>
                      {formData.riskLevel || 'N/A'}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            
            {/* Investor Profile Section */}
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Investor Profile
                </h3>
                <button
                  type="button"
                  onClick={() => onPrev()}
                  className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-500"
                >
                  Edit
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Investor Name</h4>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">{formData.investorName || 'N/A'}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Business Name</h4>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">{formData.businessName || 'N/A'}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Years in Business</h4>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">{formData.yearsInBusiness || 'N/A'}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Deals Completed</h4>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">{formData.dealsCompleted || 'N/A'}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Rating</h4>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {formData.rating ? `${formData.rating}/5` : 'N/A'}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Verification</h4>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {formData.agreeToVerification ? 'Agreed to verification process' : 'Not agreed'}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Property Details Section */}
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Property & Financial Details
                </h3>
                <button
                  type="button"
                  onClick={() => onPrev()}
                  className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-500"
                >
                  Edit
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Property Condition</h4>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">{formData.propertyCondition || 'N/A'}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Rehab Estimate</h4>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">{formatCurrency(formData.rehabEstimate)}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Purchase Price</h4>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">{formatCurrency(formData.purchasePrice)}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">After Repair Value (ARV)</h4>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">{formatCurrency(formData.arv)}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Potential Profit</h4>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">{formatCurrency(formData.potentialProfit)}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Documents</h4>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {formData.documents ? `${formData.documents.length} documents uploaded` : 'No documents'}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Photos & Description Section */}
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Photos & Description
                </h3>
                <button
                  type="button"
                  onClick={() => onPrev()}
                  className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-500"
                >
                  Edit
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Photos</h4>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {formData.photos ? `${formData.photos.length} photos uploaded` : 'No photos'}
                  </p>
                  
                  {formData.photos && formData.photos.length > 0 && (
                    <div className="mt-2 grid grid-cols-3 gap-2">
                      {Array.from(formData.photos).map((photo, index) => (
                        <div key={index} className="relative h-20 bg-gray-100 dark:bg-gray-700 rounded-md overflow-hidden">
                          <img
                            src={URL.createObjectURL(photo)}
                            alt={`Property photo ${index + 1}`}
                            className="h-full w-full object-cover"
                            onLoad={(e) => URL.revokeObjectURL((e.target as HTMLImageElement).src)}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Description</h4>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white whitespace-pre-line">
                    {formData.description || 'No description provided'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Agreement Checkbox */}
        <div className="mb-8">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="agreement"
                name="agreement"
                type="checkbox"
                checked={agreed}
                onChange={handleAgreementChange}
                className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="agreement" className="font-medium text-gray-700 dark:text-gray-300">
                I confirm this information is accurate and agree to Domentra's terms for vetting
              </label>
              <p className="text-gray-500 dark:text-gray-400">
                By submitting, you agree to allow Domentra to verify your information and contracts.
              </p>
            </div>
          </div>
          
          {error && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
          )}
        </div>
        
        {/* Navigation buttons */}
        <div className="flex justify-between pt-5">
          <button
            type="button"
            onClick={onPrev}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Previous
          </button>
          
          <button
            type="submit"
            className="px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Submit Funding Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewSubmitStep; 