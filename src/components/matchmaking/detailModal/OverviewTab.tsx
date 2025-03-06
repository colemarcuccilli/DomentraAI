import React from 'react';
import { FundingRequest } from '../FundingRequestCard';
import { formatLengthOfFunding } from './utils/formatters';

interface OverviewTabProps {
  request: FundingRequest;
  isEditing?: boolean;
  onFieldChange?: (field: keyof FundingRequest, value: any) => void;
}

/**
 * OverviewTab - A breathtaking, mobile-first component
 * for displaying a concise overview of the funding request.
 */
const OverviewTab: React.FC<OverviewTabProps> = ({ 
  request,
  isEditing = false,
  onFieldChange
}) => {
  const {
    fundingType,
    propertyAddress,
    city,
    state,
    amount,
    projectedReturn,
    riskScore,
    riskScoreValue,
    lengthOfFunding,
    exitStrategy,
    potentialLenderProfit,
    investorName,
    investorCompletedDeals,
    propertyType,
    currentCondition,
    arv
  } = request;
  
  const handleChange = (field: keyof FundingRequest, value: any) => {
    if (isEditing && onFieldChange) {
      onFieldChange(field, value);
    }
  };
  
  return (
    <div>
      <div className="mb-6">
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          This {fundingType} request for a property in {city}, {state} offers lenders a {projectedReturn}% offered return on a ${amount.toLocaleString()} investment over {formatLengthOfFunding(lengthOfFunding)}, yielding ${potentialLenderProfit.toLocaleString()} profit. With a {riskScore} Risk Score of {riskScoreValue}/100 and a {request.investorVerified ? 'verified' : ''} investor ({investorName}, {investorCompletedDeals} deals completed), this is a {riskScore === 'Low' ? 'secure' : riskScore === 'Medium' ? 'balanced' : 'high-reward'} opportunity for {exitStrategy.toLowerCase()}.
        </p>
        
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          The property is a {propertyType} in {currentCondition} condition with an After Repair Value (ARV) of ${arv.toLocaleString()}. For more detailed information about the property, investment terms, and investor credentials, please explore the tabs below.
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">Funding Type</p>
          {isEditing ? (
            <select
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={fundingType}
              onChange={(e) => handleChange('fundingType', e.target.value)}
            >
              <option value="Fix and Flip">Fix and Flip</option>
              <option value="Bridge Loan">Bridge Loan</option>
              <option value="Private Money Loan">Private Money Loan</option>
              <option value="Hard Money Loan">Hard Money Loan</option>
              <option value="Equity Gap">Equity Gap</option>
            </select>
          ) : (
            <p className="text-lg font-medium text-gray-900 dark:text-white">{fundingType}</p>
          )}
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">Amount</p>
          {isEditing ? (
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={amount}
              onChange={(e) => handleChange('amount', Number(e.target.value))}
            />
          ) : (
            <p className="text-lg font-medium text-gray-900 dark:text-white">${amount.toLocaleString()}</p>
          )}
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">Projected Return</p>
          {isEditing ? (
            <input
              type="number"
              step="0.1"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={projectedReturn}
              onChange={(e) => handleChange('projectedReturn', Number(e.target.value))}
            />
          ) : (
            <p className="text-lg font-medium text-primary-600 dark:text-primary-400">{projectedReturn}%</p>
          )}
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">Risk Score</p>
          {isEditing ? (
            <div className="flex flex-col space-y-2">
              <select
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={riskScore}
                onChange={(e) => handleChange('riskScore', e.target.value as 'Low' | 'Medium' | 'High')}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              <input
                type="number"
                min="0"
                max="100"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={riskScoreValue}
                onChange={(e) => handleChange('riskScoreValue', Number(e.target.value))}
              />
            </div>
          ) : (
            <p className="text-lg font-medium text-gray-900 dark:text-white">{riskScore} ({riskScoreValue}/100)</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OverviewTab; 