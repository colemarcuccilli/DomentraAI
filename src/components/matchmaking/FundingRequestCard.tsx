import React from 'react';
import { Link } from 'react-router-dom';

export interface FundingRequest {
  id: string;
  propertyAddress: string;
  city: string;
  state: string;
  amount: number;
  projectedReturn: number;
  riskScore: 'Low' | 'Medium' | 'High';
  fundingType: string;
  investorName: string;
  investorVerified: boolean;
  projectedReturnsVerified: boolean;
  timeRemaining: number; // in days
  imageUrl: string;
  
  // Additional properties for detailed view
  riskScoreValue: number; // numerical value (0-100)
  lengthOfFunding: number; // in days
  exitStrategy: string;
  potentialLenderProfit: number;
  
  // Property details
  propertyType: string;
  currentCondition: string;
  rehabCost: number;
  lotSize: number; // in sqft
  buildingSize: number; // in sqft
  structuralIntegrity: string;
  
  // Market details
  marketDescription: string;
  arvMin: number;
  arvMax: number;
  arv: number; // After Repair Value
  
  // Neighborhood details
  neighborhoodDescription: string;
  
  // Investor details
  investorCompany: string;
  investorYearsInBusiness: number;
  investorCompletedDeals: number;
  investorRating: number; // out of 5
  
  // Investment details
  purchasePrice: number;
  potentialInvestorProfit: number;
  
  // Additional images
  additionalImages: string[];
  
  // Available documents
  availableDocuments: string[];
  
  // Offers count
  offersCount?: number;
}

interface FundingRequestCardProps {
  request: FundingRequest;
  view: 'grid' | 'list';
  onClick: (request: FundingRequest) => void;
}

/**
 * FundingRequestCard - A breathtaking, mobile-first card component
 * for displaying funding requests with elegant animations and responsive design.
 */
const FundingRequestCard: React.FC<FundingRequestCardProps> = ({
  request,
  view,
  onClick
}) => {
  const {
    id,
    propertyAddress,
    city,
    state,
    amount,
    projectedReturn,
    riskScore,
    fundingType,
    investorName,
    investorVerified,
    projectedReturnsVerified,
    timeRemaining,
    imageUrl
  } = request;
  
  // Risk score color
  const getRiskScoreColor = (score: string) => {
    switch (score) {
      case 'Low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'High':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };
  
  // Grid view card
  if (view === 'grid') {
    return (
      <div 
        className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
      >
        {/* Card Image */}
        <div className="relative h-48 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={propertyAddress} 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
            <div className="flex justify-between items-center">
              <span className="text-white font-medium">${amount.toLocaleString()}</span>
              <div className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getRiskScoreColor(riskScore)}`}>
                {riskScore} Risk
              </div>
            </div>
          </div>
          
          {/* Offers badge */}
          {request.offersCount !== undefined && request.offersCount > 0 && (
            <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
              {request.offersCount} {request.offersCount === 1 ? 'Offer' : 'Offers'}
            </div>
          )}
        </div>
        
        {/* Card Content */}
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
              {propertyAddress}
            </h3>
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            {city}, {state} • {fundingType}
          </p>
          
          {/* Offered Return */}
          <div className="flex items-center mb-3">
            <div className="flex-1">
              <div className="flex items-center">
                <span className="text-xl font-bold text-primary-600 dark:text-primary-400">{projectedReturn}%</span>
                {projectedReturnsVerified && (
                  <div className="ml-2 text-blue-500 dark:text-blue-400 tooltip" data-tip="Offered Returns Verified">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                      <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                    </svg>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Offered Return</p>
            </div>
            
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{investorName}</span>
              {investorVerified && (
                <div className="ml-1 text-green-500 dark:text-green-400 tooltip" data-tip="Domentra Verified">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                </div>
              )}
            </div>
          </div>
          
          {/* Action Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClick(request);
            }}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
          >
            View Deal
          </button>
        </div>
      </div>
    );
  }
  
  // List view card
  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
    >
      <div className="flex flex-col md:flex-row">
        {/* Card Image (only visible on md and up) */}
        <div className="relative md:w-48 h-32 md:h-auto overflow-hidden">
          <img 
            src={imageUrl} 
            alt={propertyAddress} 
            className="w-full h-full object-cover"
          />
          
          {/* Offers badge */}
          {request.offersCount !== undefined && request.offersCount > 0 && (
            <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
              {request.offersCount} {request.offersCount === 1 ? 'Offer' : 'Offers'}
            </div>
          )}
        </div>
        
        {/* Card Content */}
        <div className="flex-1 p-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {propertyAddress}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {city}, {state} • {fundingType}
              </p>
            </div>
            
            <div className="mt-2 md:mt-0 flex items-center">
              <div className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getRiskScoreColor(riskScore)} mr-2`}>
                {riskScore} Risk
              </div>
              <span className="text-lg font-bold text-primary-600 dark:text-primary-400">${amount.toLocaleString()}</span>
              
              {/* Offers count badge for list view */}
              {request.offersCount !== undefined && request.offersCount > 0 && (
                <div className="ml-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {request.offersCount} {request.offersCount === 1 ? 'Offer' : 'Offers'}
                </div>
              )}
            </div>
          </div>
          
          <div className="flex flex-wrap items-center justify-between mt-3">
            {/* Offered Return */}
            <div className="flex items-center mr-4 mb-2 md:mb-0">
              <div>
                <div className="flex items-center">
                  <span className="text-xl font-bold text-primary-600 dark:text-primary-400">{projectedReturn}%</span>
                  {projectedReturnsVerified && (
                    <div className="ml-2 text-blue-500 dark:text-blue-400 tooltip" data-tip="Offered Returns Verified">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                        <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                      </svg>
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Offered Return</p>
              </div>
            </div>
            
            {/* Investor */}
            <div className="flex items-center mr-4 mb-2 md:mb-0">
              <div>
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{investorName}</span>
                  {investorVerified && (
                    <div className="ml-1 text-green-500 dark:text-green-400 tooltip" data-tip="Domentra Verified">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Investor</p>
              </div>
            </div>
            
            {/* Time Remaining */}
            <div className="flex items-center mr-4 mb-2 md:mb-0">
              <div>
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{timeRemaining} days</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Time Remaining</p>
              </div>
            </div>
            
            {/* Action Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClick(request);
              }}
              className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-1.5 px-4 rounded-md transition-colors duration-200 text-sm"
            >
              View Deal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundingRequestCard; 