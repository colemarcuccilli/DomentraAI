import React, { useState, useEffect } from 'react';
import { FundingRequestData } from '../../FundingRequestContainer';

interface BasicPropertyInfoStepProps {
  formData: FundingRequestData;
  updateFormData: (data: Partial<FundingRequestData>) => void;
  updateStepValidation: (step: 1, isValid: boolean) => void;
  onNext: () => void;
  onCancel: () => void;
}

/**
 * BasicPropertyInfoStep - A breathtaking, mobile-first component
 * for collecting basic property information with elegant form controls.
 */
const BasicPropertyInfoStep: React.FC<BasicPropertyInfoStepProps> = ({
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
  
  // Property conditions
  const propertyConditions = [
    'Excellent',
    'Good',
    'Fair',
    'Needs Minor Repairs',
    'Needs Major Repairs',
    'Distressed'
  ];
  
  // Ownership statuses
  const ownershipStatuses = [
    'Owned Free and Clear',
    'Owned with Mortgage',
    'Under Contract',
    'Option to Purchase',
    'Not Yet Acquired'
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
    
    if (!formData.propertyAddress) {
      newErrors.propertyAddress = 'Property address is required';
    }
    
    if (!formData.city) {
      newErrors.city = 'City is required';
    }
    
    if (!formData.state) {
      newErrors.state = 'State is required';
    }
    
    if (!formData.zipCode) {
      newErrors.zipCode = 'ZIP code is required';
    }
    
    if (!formData.propertyType) {
      newErrors.propertyType = 'Property type is required';
    }
    
    if (!formData.propertyCondition) {
      newErrors.propertyCondition = 'Property condition is required';
    }
    
    if (!formData.beds) {
      newErrors.beds = 'Number of bedrooms is required';
    }
    
    if (!formData.baths) {
      newErrors.baths = 'Number of bathrooms is required';
    }
    
    if (!formData.buildingSize) {
      newErrors.buildingSize = 'Building size is required';
    }
    
    if (!formData.lotSize) {
      newErrors.lotSize = 'Lot size is required';
    }
    
    if (!formData.currentOwnershipStatus) {
      newErrors.currentOwnershipStatus = 'Current ownership status is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Check validation on mount and when form data changes
  useEffect(() => {
    const isValid = validateForm();
    updateStepValidation(1, isValid);
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
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Basic Property Information</h2>
      
      <div className="space-y-6">
        {/* Property Location */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Property Location</h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="col-span-2">
              <label htmlFor="propertyAddress" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Property Address
              </label>
              <input
                type="text"
                id="propertyAddress"
                name="propertyAddress"
                value={formData.propertyAddress || ''}
                onChange={handleChange}
                className={`block w-full rounded-md shadow-sm sm:text-sm ${
                  errors.propertyAddress
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500 dark:border-red-700'
                    : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600'
                } dark:bg-gray-700 dark:text-white`}
              />
              {errors.propertyAddress && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.propertyAddress}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city || ''}
                onChange={handleChange}
                className={`block w-full rounded-md shadow-sm sm:text-sm ${
                  errors.city
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500 dark:border-red-700'
                    : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600'
                } dark:bg-gray-700 dark:text-white`}
              />
              {errors.city && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.city}</p>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state || ''}
                  onChange={handleChange}
                  className={`block w-full rounded-md shadow-sm sm:text-sm ${
                    errors.state
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500 dark:border-red-700'
                      : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600'
                  } dark:bg-gray-700 dark:text-white`}
                />
                {errors.state && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.state}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  ZIP Code
                </label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode || ''}
                  onChange={handleChange}
                  className={`block w-full rounded-md shadow-sm sm:text-sm ${
                    errors.zipCode
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500 dark:border-red-700'
                      : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600'
                  } dark:bg-gray-700 dark:text-white`}
                />
                {errors.zipCode && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.zipCode}</p>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Property Details */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Property Details</h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Property Type
              </label>
              <select
                id="propertyType"
                name="propertyType"
                value={formData.propertyType || ''}
                onChange={handleChange}
                className={`block w-full rounded-md shadow-sm sm:text-sm ${
                  errors.propertyType
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500 dark:border-red-700'
                    : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600'
                } dark:bg-gray-700 dark:text-white`}
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
            
            <div>
              <label htmlFor="propertyCondition" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Property Condition
              </label>
              <select
                id="propertyCondition"
                name="propertyCondition"
                value={formData.propertyCondition || ''}
                onChange={handleChange}
                className={`block w-full rounded-md shadow-sm sm:text-sm ${
                  errors.propertyCondition
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500 dark:border-red-700'
                    : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600'
                } dark:bg-gray-700 dark:text-white`}
              >
                <option value="">Select Property Condition</option>
                {propertyConditions.map(condition => (
                  <option key={condition} value={condition}>{condition}</option>
                ))}
              </select>
              {errors.propertyCondition && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.propertyCondition}</p>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="beds" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Bedrooms
                </label>
                <input
                  type="number"
                  id="beds"
                  name="beds"
                  min="0"
                  step="1"
                  value={formData.beds || ''}
                  onChange={handleChange}
                  className={`block w-full rounded-md shadow-sm sm:text-sm ${
                    errors.beds
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500 dark:border-red-700'
                      : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600'
                  } dark:bg-gray-700 dark:text-white`}
                />
                {errors.beds && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.beds}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="baths" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Bathrooms
                </label>
                <input
                  type="number"
                  id="baths"
                  name="baths"
                  min="0"
                  step="0.5"
                  value={formData.baths || ''}
                  onChange={handleChange}
                  className={`block w-full rounded-md shadow-sm sm:text-sm ${
                    errors.baths
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500 dark:border-red-700'
                      : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600'
                  } dark:bg-gray-700 dark:text-white`}
                />
                {errors.baths && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.baths}</p>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="buildingSize" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Building Size (sqft)
                </label>
                <input
                  type="number"
                  id="buildingSize"
                  name="buildingSize"
                  min="0"
                  value={formData.buildingSize || ''}
                  onChange={handleChange}
                  className={`block w-full rounded-md shadow-sm sm:text-sm ${
                    errors.buildingSize
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500 dark:border-red-700'
                      : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600'
                  } dark:bg-gray-700 dark:text-white`}
                />
                {errors.buildingSize && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.buildingSize}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="lotSize" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Lot Size (sqft)
                </label>
                <input
                  type="number"
                  id="lotSize"
                  name="lotSize"
                  min="0"
                  value={formData.lotSize || ''}
                  onChange={handleChange}
                  className={`block w-full rounded-md shadow-sm sm:text-sm ${
                    errors.lotSize
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500 dark:border-red-700'
                      : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600'
                  } dark:bg-gray-700 dark:text-white`}
                />
                {errors.lotSize && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.lotSize}</p>
                )}
              </div>
            </div>
            
            <div className="col-span-2">
              <label htmlFor="currentOwnershipStatus" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Current Ownership Status
              </label>
              <select
                id="currentOwnershipStatus"
                name="currentOwnershipStatus"
                value={formData.currentOwnershipStatus || ''}
                onChange={handleChange}
                className={`block w-full rounded-md shadow-sm sm:text-sm ${
                  errors.currentOwnershipStatus
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500 dark:border-red-700'
                    : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600'
                } dark:bg-gray-700 dark:text-white`}
              >
                <option value="">Select Ownership Status</option>
                {ownershipStatuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
              {errors.currentOwnershipStatus && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.currentOwnershipStatus}</p>
              )}
            </div>
          </div>
        </div>
        
        {/* Form Actions */}
        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Cancel
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

export default BasicPropertyInfoStep; 