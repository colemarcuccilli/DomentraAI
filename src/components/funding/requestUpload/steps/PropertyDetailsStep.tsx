import React, { useState, useEffect, useRef } from 'react';
import { FundingRequestData } from '../../FundingRequestContainer';

interface PropertyDetailsStepProps {
  formData: FundingRequestData;
  updateFormData: (data: Partial<FundingRequestData>) => void;
  updateStepValidation: (step: 3, isValid: boolean) => void;
  onNext: () => void;
  onPrev: () => void;
}

/**
 * PropertyDetailsStep - A breathtaking, mobile-first component
 * for collecting property and financial details in the funding request flow.
 */
const PropertyDetailsStep: React.FC<PropertyDetailsStepProps> = ({
  formData,
  updateFormData,
  updateStepValidation,
  onNext,
  onPrev
}) => {
  // Local state for validation errors
  const [errors, setErrors] = useState<{
    propertyCondition?: string;
    purchasePrice?: string;
    arv?: string;
    documents?: string;
  }>({});
  
  // Local state for uploaded documents
  const [uploadedDocs, setUploadedDocs] = useState<{name: string, size: number}[]>([]);
  
  // File input ref
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Property condition options
  const conditionOptions = [
    'Move-in Ready',
    'Needs Minor Updates',
    'Needs Moderate Rehab',
    'Requires Extensive Rehab',
    'Teardown/Rebuild'
  ];
  
  // Required document types
  const requiredDocTypes = [
    'Purchase Contract',
    'Zoning Documents'
  ];
  
  // Optional document types
  const optionalDocTypes = [
    'Construction Plans',
    'Existing Loan Documents',
    'Market Analysis',
    'Property Photos',
    'Other'
  ];
  
  // Initialize component
  React.useEffect(() => {
    // Set uploaded documents if they exist
    if (formData.documents && formData.documents.length > 0) {
      const docs = Array.from(formData.documents).map(file => ({
        name: file.name,
        size: file.size
      }));
      setUploadedDocs(docs);
    }
    
    // Validate form on mount
    validateForm();
  }, []);
  
  // Calculate potential profit
  const calculateProfit = () => {
    const { purchasePrice, rehabEstimate, arv } = formData;
    
    if (purchasePrice && arv) {
      const rehab = rehabEstimate || 0;
      const fees = (purchasePrice + rehab) * 0.05; // Estimated fees at 5%
      const profit = arv - purchasePrice - rehab - fees;
      
      updateFormData({ potentialProfit: profit > 0 ? profit : 0 });
    }
  };
  
  // Validate the form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Required fields
    if (!formData.propertyCondition) {
      newErrors.propertyCondition = 'Property condition is required';
    }
    
    if (!formData.purchasePrice) {
      newErrors.purchasePrice = 'Purchase price is required';
    } else if (isNaN(Number(formData.purchasePrice)) || Number(formData.purchasePrice) <= 0) {
      newErrors.purchasePrice = 'Purchase price must be a positive number';
    }
    
    if (!formData.rehabEstimate) {
      newErrors.rehabEstimate = 'Rehab estimate is required';
    } else if (isNaN(Number(formData.rehabEstimate)) || Number(formData.rehabEstimate) < 0) {
      newErrors.rehabEstimate = 'Rehab estimate must be a non-negative number';
    }
    
    if (!formData.arv) {
      newErrors.arv = 'After repair value is required';
    } else if (isNaN(Number(formData.arv)) || Number(formData.arv) <= 0) {
      newErrors.arv = 'After repair value must be a positive number';
    }
    
    if (!formData.documents || formData.documents.length === 0) {
      newErrors.documents = 'At least one supporting document is required';
    }
    
    // Update error state
    setErrors(newErrors);
    
    // Update parent validation state
    const isValid = Object.keys(newErrors).length === 0;
    updateStepValidation(3, isValid);
    
    return isValid;
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onNext();
    }
  };
  
  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'number') {
      updateFormData({ [name]: parseFloat(value) || 0 });
    } else {
      updateFormData({ [name]: value });
    }
    
    // Calculate profit when financial values change
    if (['purchasePrice', 'rehabEstimate', 'arv'].includes(name)) {
      setTimeout(calculateProfit, 0);
    }
    
    // Validate after update
    setTimeout(validateForm, 0);
  };
  
  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      
      // Update uploaded docs list
      const newDocs = files.map(file => ({
        name: file.name,
        size: file.size
      }));
      
      setUploadedDocs(newDocs);
      updateFormData({ documents: files });
      
      // Validate after update
      setTimeout(validateForm, 0);
    }
  };
  
  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' bytes';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };
  
  // Format currency
  const formatCurrency = (value: number | undefined) => {
    if (value === undefined) return '';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };
  
  return (
    <div className="p-6 sm:p-10">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Property & Financial Details
      </h2>
      
      <form onSubmit={handleSubmit}>
        {/* Property Condition Section */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Property Condition
          </h3>
          
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
            <div>
              <label htmlFor="propertyCondition" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Current Condition
              </label>
              <select
                id="propertyCondition"
                name="propertyCondition"
                className={`mt-1 block w-full py-2 px-3 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${
                  errors.propertyCondition ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''
                }`}
                value={formData.propertyCondition || ''}
                onChange={handleChange}
              >
                <option value="">Select condition</option>
                {conditionOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              {errors.propertyCondition && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.propertyCondition}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="rehabEstimate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Rehab Estimate (if applicable)
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 dark:text-gray-400 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  name="rehabEstimate"
                  id="rehabEstimate"
                  className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 dark:border-gray-700 dark:bg-gray-800 rounded-md"
                  placeholder="0"
                  value={formData.rehabEstimate || ''}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Market Value Section */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Market Value
          </h3>
          
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
            <div>
              <label htmlFor="purchasePrice" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Purchase Price
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 dark:text-gray-400 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  name="purchasePrice"
                  id="purchasePrice"
                  className={`block w-full pl-7 pr-12 sm:text-sm border-gray-300 dark:border-gray-700 dark:bg-gray-800 rounded-md ${
                    errors.purchasePrice ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'focus:ring-primary-500 focus:border-primary-500'
                  }`}
                  placeholder="0"
                  value={formData.purchasePrice || ''}
                  onChange={handleChange}
                />
              </div>
              {errors.purchasePrice && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.purchasePrice}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="arv" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                After Repair Value (ARV)
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 dark:text-gray-400 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  name="arv"
                  id="arv"
                  className={`block w-full pl-7 pr-12 sm:text-sm border-gray-300 dark:border-gray-700 dark:bg-gray-800 rounded-md ${
                    errors.arv ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'focus:ring-primary-500 focus:border-primary-500'
                  }`}
                  placeholder="0"
                  value={formData.arv || ''}
                  onChange={handleChange}
                />
              </div>
              {errors.arv && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.arv}</p>
              )}
            </div>
          </div>
          
          {/* Potential Profit */}
          {formData.potentialProfit !== undefined && (
            <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800 dark:text-green-300">
                    Potential Profit for Investor
                  </h3>
                  <div className="mt-2 text-sm text-green-700 dark:text-green-400">
                    <p>Estimated profit: <span className="font-bold">{formatCurrency(formData.potentialProfit)}</span></p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Supporting Documents Section */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Supporting Documents
          </h3>
          
          <div className="mb-4">
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
              Required documents:
            </p>
            <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-400">
              {requiredDocTypes.map(doc => (
                <li key={doc}>{doc}</li>
              ))}
            </ul>
          </div>
          
          <div 
            className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md ${
              errors.documents 
                ? 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/10' 
                : 'border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50'
            }`}
          >
            <div className="space-y-1 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              
              <div className="flex text-sm text-gray-600 dark:text-gray-400">
                <label
                  htmlFor="document-upload"
                  className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                >
                  <span>Upload files</span>
                  <input
                    id="document-upload"
                    name="document-upload"
                    type="file"
                    className="sr-only"
                    accept=".pdf,.jpg,.jpeg,.png"
                    multiple
                    onChange={handleFileUpload}
                    ref={fileInputRef}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              
              <p className="text-xs text-gray-500 dark:text-gray-400">
                PDF, JPG, PNG up to 10MB each
              </p>
            </div>
          </div>
          
          {errors.documents && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.documents}</p>
          )}
          
          {/* Uploaded documents list */}
          {uploadedDocs.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Uploaded Documents ({uploadedDocs.length})
              </h4>
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {uploadedDocs.map((doc, index) => (
                  <li key={index} className="py-3 flex justify-between items-center">
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300 truncate max-w-xs">
                        {doc.name}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {formatFileSize(doc.size)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
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
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default PropertyDetailsStep; 