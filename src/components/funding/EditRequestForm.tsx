import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FundingRequest } from '../matchmaking/FundingRequestCard';
import { mockFundingRequests } from '../../data/mockFundingRequests';

interface EditRequestFormProps {
  onCancel: () => void;
  onSubmit: (data: FundingRequest) => void;
}

/**
 * EditRequestForm - A breathtaking, mobile-first component
 * for editing an existing funding request with elegant animations.
 */
const EditRequestForm: React.FC<EditRequestFormProps> = ({ onCancel, onSubmit }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState<FundingRequest | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Fetch the funding request data
  useEffect(() => {
    if (!id) {
      navigate('/my-requests');
      return;
    }

    // In a real app, this would be an API call to get the request data
    setIsLoading(true);
    
    setTimeout(() => {
      const request = mockFundingRequests.find(req => req.id === id);
      
      if (request) {
        setFormData(request);
      } else {
        // Request not found
        navigate('/my-requests');
      }
      
      setIsLoading(false);
    }, 500);
  }, [id, navigate]);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => {
      if (!prev) return prev;
      
      return {
        ...prev,
        [name]: name === 'amount' || name === 'projectedReturn' || name === 'timeRemaining' 
          ? parseFloat(value) 
          : value
      };
    });
  };

  // Validate the form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData) return false;
    
    if (!formData.propertyAddress) {
      newErrors.propertyAddress = 'Property address is required';
    }
    
    if (!formData.city) {
      newErrors.city = 'City is required';
    }
    
    if (!formData.state) {
      newErrors.state = 'State is required';
    }
    
    if (!formData.amount || formData.amount <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }
    
    if (!formData.projectedReturn || formData.projectedReturn <= 0) {
      newErrors.projectedReturn = 'Projected return must be greater than 0';
    }
    
    if (!formData.fundingType) {
      newErrors.fundingType = 'Funding type is required';
    }
    
    if (!formData.exitStrategy) {
      newErrors.exitStrategy = 'Exit strategy is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData) return;
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  if (isLoading) {
    return (
      <div className="animate-pulse p-6">
        <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-6"></div>
        <div className="space-y-4">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
          <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
          <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
          <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
        </div>
      </div>
    );
  }

  if (!formData) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500 dark:text-gray-400">Request not found</p>
        <button
          onClick={() => navigate('/my-requests')}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Back to My Requests
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Edit Funding Request</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Property Information */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Property Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="propertyAddress" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Property Address
              </label>
              <input
                type="text"
                id="propertyAddress"
                name="propertyAddress"
                value={formData.propertyAddress}
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
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
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
              
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
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
            </div>
          </div>
        </div>
        
        {/* Funding Information */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Funding Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Amount Requested ($)
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className={`block w-full rounded-md shadow-sm sm:text-sm ${
                  errors.amount
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500 dark:border-red-700'
                    : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600'
                } dark:bg-gray-700 dark:text-white`}
              />
              {errors.amount && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.amount}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="projectedReturn" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Projected Return (%)
              </label>
              <input
                type="number"
                id="projectedReturn"
                name="projectedReturn"
                value={formData.projectedReturn}
                onChange={handleChange}
                className={`block w-full rounded-md shadow-sm sm:text-sm ${
                  errors.projectedReturn
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500 dark:border-red-700'
                    : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600'
                } dark:bg-gray-700 dark:text-white`}
              />
              {errors.projectedReturn && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.projectedReturn}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="fundingType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Funding Type
              </label>
              <select
                id="fundingType"
                name="fundingType"
                value={formData.fundingType}
                onChange={handleChange}
                className={`block w-full rounded-md shadow-sm sm:text-sm ${
                  errors.fundingType
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500 dark:border-red-700'
                    : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600'
                } dark:bg-gray-700 dark:text-white`}
              >
                <option value="">Select Funding Type</option>
                <option value="Private Money Loan">Private Money Loan</option>
                <option value="Bridge/Gap">Bridge/Gap</option>
                <option value="EMD">EMD</option>
                <option value="Double Close">Double Close</option>
              </select>
              {errors.fundingType && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.fundingType}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="timeRemaining" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Time Remaining (days)
              </label>
              <input
                type="number"
                id="timeRemaining"
                name="timeRemaining"
                value={formData.timeRemaining}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
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
            className={`block w-full rounded-md shadow-sm sm:text-sm ${
              errors.exitStrategy
                ? 'border-red-300 focus:ring-red-500 focus:border-red-500 dark:border-red-700'
                : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600'
            } dark:bg-gray-700 dark:text-white`}
          >
            <option value="">Select Exit Strategy</option>
            <option value="Fix n Flip">Fix n Flip</option>
            <option value="Buy and Hold">Buy and Hold</option>
            <option value="Wholesale">Wholesale</option>
            <option value="Property Purchase">Property Purchase</option>
            <option value="Refinance">Refinance</option>
          </select>
          {errors.exitStrategy && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.exitStrategy}</p>
          )}
        </div>
        
        {/* Form Actions */}
        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRequestForm; 