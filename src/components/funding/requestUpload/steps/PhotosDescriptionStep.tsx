import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import { FundingRequestData } from '../../FundingRequestContainer';

interface PhotosDescriptionStepProps {
  formData: FundingRequestData;
  updateFormData: (data: Partial<FundingRequestData>) => void;
  updateStepValidation: (step: 3, isValid: boolean) => void;
  onNext: () => void;
  onPrev: () => void;
}

/**
 * PhotosDescriptionStep - A breathtaking, mobile-first component
 * for collecting property photos and description in the funding request flow.
 * This step combines photos upload and market description for a streamlined experience.
 */
const PhotosDescriptionStep: React.FC<PhotosDescriptionStepProps> = ({
  formData,
  updateFormData,
  updateStepValidation,
  onNext,
  onPrev
}) => {
  // Local state for validation errors
  const [errors, setErrors] = useState<{
    photos?: string;
    propertyDescription?: string;
    marketDescription?: string;
    neighborhoodDescription?: string;
  }>({});
  
  // Local state for preview images
  const [previews, setPreviews] = useState<string[]>([]);
  
  // File input ref
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Initialize component
  React.useEffect(() => {
    // Generate previews for existing photos
    if (formData.propertyPhotos && formData.propertyPhotos.length > 0) {
      const newPreviews = Array.from(formData.propertyPhotos).map(file => URL.createObjectURL(file));
      setPreviews(newPreviews);
    }
    
    // Validate form on mount
    validateForm();
    
    // Cleanup function to revoke object URLs
    return () => {
      previews.forEach(preview => URL.revokeObjectURL(preview));
    };
  }, []);
  
  // Handle file upload
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const fileList = Array.from(files);
    
    updateFormData({
      propertyPhotos: fileList
    });
    
    // Create preview URLs
    const newPreviews = fileList.map(file => URL.createObjectURL(file));
    setPreviews(newPreviews);
    
    validateForm();
  };
  
  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
    validateForm();
  };
  
  // Validate the form
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    // Check if photos are uploaded
    if (!formData.propertyPhotos || formData.propertyPhotos.length === 0) {
      newErrors.photos = 'At least one property photo is required';
    }
    
    // Check if description is provided
    if (!formData.propertyDescription || formData.propertyDescription.trim() === '') {
      newErrors.propertyDescription = 'Property description is required';
    }
    
    // Check if market description is provided
    if (!formData.marketDescription || formData.marketDescription.trim() === '') {
      newErrors.marketDescription = 'Market description is required';
    }
    
    // Check if neighborhood description is provided
    if (!formData.neighborhoodDescription || formData.neighborhoodDescription.trim() === '') {
      newErrors.neighborhoodDescription = 'Neighborhood description is required';
    }
    
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
  
  // Trigger file input click
  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  return (
    <div className="p-6 sm:p-10">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Photos & Description
      </h2>
      
      <form onSubmit={handleSubmit}>
        {/* Photo upload section */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Property Photos (1-3 photos)
          </label>
          
          <div 
            className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md ${
              errors.photos 
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
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                >
                  <span>Upload files</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    accept="image/jpeg,image/png"
                    multiple
                    onChange={handleFileUpload}
                    ref={fileInputRef}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              
              <p className="text-xs text-gray-500 dark:text-gray-400">
                PNG, JPG up to 5MB each
              </p>
            </div>
          </div>
          
          {errors.photos && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.photos}</p>
          )}
          
          {/* Preview section */}
          {previews.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-4">
              {previews.map((preview, index) => (
                <div key={index} className="relative">
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="h-24 w-full object-cover rounded-md"
                  />
                  <span className="absolute top-1 right-1 bg-gray-800 bg-opacity-75 text-white text-xs px-2 py-1 rounded-md">
                    {index + 1}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Description section */}
        <div className="mb-8">
          <label htmlFor="propertyDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Brief Description for Lenders
          </label>
          
          <textarea
            id="propertyDescription"
            name="propertyDescription"
            rows={4}
            className={`shadow-sm block w-full sm:text-sm border-gray-300 dark:border-gray-700 dark:bg-gray-800 rounded-md ${
              errors.propertyDescription ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'focus:ring-primary-500 focus:border-primary-500'
            }`}
            placeholder="Describe your funding opportunity (e.g., 'Fix-and-flip opportunity in Fort Wayne with 15.5% projected return')"
            value={formData.propertyDescription || ''}
            onChange={handleChange}
            maxLength={500}
          />
          
          <div className="mt-2 flex justify-between items-center">
            {errors.propertyDescription ? (
              <p className="text-sm text-red-600 dark:text-red-400">{errors.propertyDescription}</p>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Brief description of your funding opportunity.
              </p>
            )}
            
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {(formData.propertyDescription?.length || 0)}/500
            </span>
          </div>
        </div>
        
        {/* Market Description */}
        <div className="mb-8">
          <label htmlFor="marketDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Market Description
          </label>
          
          <textarea
            id="marketDescription"
            name="marketDescription"
            rows={3}
            className={`shadow-sm block w-full sm:text-sm border-gray-300 dark:border-gray-700 dark:bg-gray-800 rounded-md ${
              errors.marketDescription ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'focus:ring-primary-500 focus:border-primary-500'
            }`}
            placeholder="Describe the market conditions and trends (e.g., 'Growing market with 5% annual appreciation')"
            value={formData.marketDescription || ''}
            onChange={handleChange}
            maxLength={300}
          />
          
          <div className="mt-2 flex justify-between items-center">
            {errors.marketDescription ? (
              <p className="text-sm text-red-600 dark:text-red-400">{errors.marketDescription}</p>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Describe the local real estate market and trends
              </p>
            )}
            
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {(formData.marketDescription?.length || 0)}/300
            </span>
          </div>
        </div>
        
        {/* Neighborhood Description */}
        <div className="mb-8">
          <label htmlFor="neighborhoodDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Neighborhood Description
          </label>
          
          <textarea
            id="neighborhoodDescription"
            name="neighborhoodDescription"
            rows={3}
            className={`shadow-sm block w-full sm:text-sm border-gray-300 dark:border-gray-700 dark:bg-gray-800 rounded-md ${
              errors.neighborhoodDescription ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'focus:ring-primary-500 focus:border-primary-500'
            }`}
            placeholder="Describe the neighborhood (e.g., 'Established neighborhood with good schools and low crime rate')"
            value={formData.neighborhoodDescription || ''}
            onChange={handleChange}
            maxLength={300}
          />
          
          <div className="mt-2 flex justify-between items-center">
            {errors.neighborhoodDescription ? (
              <p className="text-sm text-red-600 dark:text-red-400">{errors.neighborhoodDescription}</p>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Describe the neighborhood characteristics and amenities
              </p>
            )}
            
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {(formData.neighborhoodDescription?.length || 0)}/300
            </span>
          </div>
        </div>
        
        {/* Investment Highlights */}
        <div className="mb-8">
          <label htmlFor="investmentHighlights" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Investment Highlights
          </label>
          
          <textarea
            id="investmentHighlights"
            name="investmentHighlights"
            rows={3}
            className={`shadow-sm block w-full sm:text-sm border-gray-300 dark:border-gray-700 dark:bg-gray-800 rounded-md focus:ring-primary-500 focus:border-primary-500`}
            placeholder="Highlight key investment points (e.g., 'Below market acquisition, high rental demand area')"
            value={formData.investmentHighlights || ''}
            onChange={handleChange}
            maxLength={300}
          />
          
          <div className="mt-2 flex justify-between items-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Highlight the key selling points of this investment
            </p>
            
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {(formData.investmentHighlights?.length || 0)}/300
            </span>
          </div>
        </div>
        
        {/* Risk Factors */}
        <div className="mb-8">
          <label htmlFor="riskFactors" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Risk Factors
          </label>
          
          <textarea
            id="riskFactors"
            name="riskFactors"
            rows={3}
            className={`shadow-sm block w-full sm:text-sm border-gray-300 dark:border-gray-700 dark:bg-gray-800 rounded-md focus:ring-primary-500 focus:border-primary-500`}
            placeholder="Describe potential risks (e.g., 'Potential zoning changes, seasonal market')"
            value={formData.riskFactors || ''}
            onChange={handleChange}
            maxLength={300}
          />
          
          <div className="mt-2 flex justify-between items-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Be transparent about potential risks to build trust with lenders
            </p>
            
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {(formData.riskFactors?.length || 0)}/300
            </span>
          </div>
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

export default PhotosDescriptionStep; 