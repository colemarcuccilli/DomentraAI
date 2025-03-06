import React from 'react';
import { FundingRequest } from '../../types/property';

interface FundingRequestCardProps {
  request: FundingRequest;
  onClick: (request: FundingRequest) => void;
  variant?: 'default' | 'featured';
}

const FundingRequestCard: React.FC<FundingRequestCardProps> = ({
  request,
  onClick,
  variant = 'default'
}) => {
  const {
    title,
    amount,
    term,
    rate,
    type,
    property,
    borrower,
    isFeatured
  } = request;

  // Calculate monthly payment (simplified)
  const monthlyPayment = (amount * (rate / 100 / 12) * Math.pow(1 + rate / 100 / 12, term)) / (Math.pow(1 + rate / 100 / 12, term) - 1);

  return (
    <div
      onClick={() => onClick(request)}
      className={`group cursor-pointer rounded-xl bg-white dark:bg-gray-800 shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
        variant === 'featured' ? 'border-2 border-primary-500' : ''
      }`}
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={property.imageUrls[0]}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        {isFeatured && (
          <div className="absolute top-3 left-3 bg-primary-500 text-white text-xs font-medium px-2 py-1 rounded-full">
            Featured
          </div>
        )}
        <div className="absolute top-3 right-3 bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 text-xs font-medium px-2 py-1 rounded-full">
          {type}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Title and Amount */}
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
            {title}
          </h3>
          <div className="flex items-baseline mt-1">
            <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              ${amount.toLocaleString()}
            </span>
            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
              requested
            </span>
          </div>
        </div>

        {/* Key Details */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Term</p>
            <p className="font-medium text-gray-900 dark:text-white">{term} mo</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Rate</p>
            <p className="font-medium text-gray-900 dark:text-white">{rate}%</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Monthly</p>
            <p className="font-medium text-gray-900 dark:text-white">${Math.round(monthlyPayment).toLocaleString()}</p>
          </div>
        </div>

        {/* Property Details */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
            {typeof property.address === 'object' 
              ? `${property.address.street}, ${property.address.city}, ${property.address.state}` 
              : `${property.city}, ${property.state}`}
          </p>
          <div className="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              {property.propertyType}
            </span>
            {property.arv && (
              <>
                <span className="mx-2">•</span>
                <span>ARV: ${property.arv.toLocaleString()}</span>
              </>
            )}
          </div>
        </div>

        {/* Borrower Info */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-sm font-medium text-gray-600 dark:text-gray-300">
              {borrower.firstName?.[0] || ''}{borrower.lastName?.[0] || ''}
            </div>
            <div className="ml-2">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {borrower.firstName} {borrower.lastName}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {borrower.completedProjects || 0} completed projects
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex items-center text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(borrower.rating || 0) ? 'fill-current' : 'stroke-current fill-none'}`}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundingRequestCard; 