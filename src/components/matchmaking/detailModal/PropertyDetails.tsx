import React from 'react';
import { FundingRequest } from '../FundingRequestCard';

interface PropertyDetailsProps {
  request: FundingRequest;
  isEditing?: boolean;
  onFieldChange?: (field: keyof FundingRequest, value: any) => void;
}

/**
 * PropertyDetails - A breathtaking, mobile-first component
 * for displaying property details with elegant typography and layout.
 */
const PropertyDetails: React.FC<PropertyDetailsProps> = ({ 
  request,
  isEditing = false,
  onFieldChange
}) => {
  const {
    propertyType,
    currentCondition,
    rehabCost,
    lotSize,
    buildingSize,
    structuralIntegrity,
    purchasePrice,
    arv,
    potentialInvestorProfit
  } = request;
  
  const handleChange = (field: keyof FundingRequest, value: any) => {
    if (isEditing && onFieldChange) {
      onFieldChange(field, value);
    }
  };
  
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
        Property Details
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Property Type</h4>
          {isEditing ? (
            <select
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={propertyType}
              onChange={(e) => handleChange('propertyType', e.target.value)}
            >
              <option value="Single Family Home">Single Family Home</option>
              <option value="Multi-Family">Multi-Family</option>
              <option value="Commercial">Commercial</option>
              <option value="Mixed Use">Mixed Use</option>
              <option value="Land">Land</option>
            </select>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">{propertyType}</p>
          )}
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Current Condition</h4>
          {isEditing ? (
            <select
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={currentCondition}
              onChange={(e) => handleChange('currentCondition', e.target.value)}
            >
              <option value="Excellent">Excellent</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
              <option value="Poor">Poor</option>
              <option value="Distressed">Distressed</option>
            </select>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">{currentCondition}</p>
          )}
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Lot Size</h4>
          {isEditing ? (
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={lotSize}
              onChange={(e) => handleChange('lotSize', Number(e.target.value))}
            />
          ) : (
            <p className="text-gray-600 dark:text-gray-400">{lotSize.toLocaleString()} sqft</p>
          )}
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Building Size</h4>
          {isEditing ? (
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={buildingSize}
              onChange={(e) => handleChange('buildingSize', Number(e.target.value))}
            />
          ) : (
            <p className="text-gray-600 dark:text-gray-400">{buildingSize.toLocaleString()} sqft</p>
          )}
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Structural Integrity</h4>
          {isEditing ? (
            <select
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={structuralIntegrity}
              onChange={(e) => handleChange('structuralIntegrity', e.target.value)}
            >
              <option value="Excellent">Excellent</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
              <option value="Poor">Poor</option>
              <option value="Needs Repair">Needs Repair</option>
            </select>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">{structuralIntegrity}</p>
          )}
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rehab Cost</h4>
          {isEditing ? (
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={rehabCost}
              onChange={(e) => handleChange('rehabCost', Number(e.target.value))}
            />
          ) : (
            <p className="text-gray-600 dark:text-gray-400">${rehabCost.toLocaleString()}</p>
          )}
        </div>
      </div>
      
      <div className="mt-6 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          Investment Breakdown
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Purchase Price</h4>
            {isEditing ? (
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={purchasePrice}
                onChange={(e) => handleChange('purchasePrice', Number(e.target.value))}
              />
            ) : (
              <p className="text-gray-600 dark:text-gray-400">${purchasePrice.toLocaleString()}</p>
            )}
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rehab Cost</h4>
            <p className="text-gray-600 dark:text-gray-400">${rehabCost.toLocaleString()}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">After Repair Value (ARV)</h4>
            {isEditing ? (
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={arv}
                onChange={(e) => handleChange('arv', Number(e.target.value))}
              />
            ) : (
              <p className="text-gray-600 dark:text-gray-400">${arv.toLocaleString()}</p>
            )}
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Potential Investor Profit</h4>
            {isEditing ? (
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={potentialInvestorProfit}
                onChange={(e) => handleChange('potentialInvestorProfit', Number(e.target.value))}
              />
            ) : (
              <p className="text-gray-600 dark:text-gray-400">${potentialInvestorProfit.toLocaleString()}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails; 