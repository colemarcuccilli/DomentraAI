import React from 'react';
import { FundingRequest } from '../../FundingRequestCard';
import { getRiskScoreColor } from '../utils/formatters';

interface RiskAssessmentSectionProps {
  request: FundingRequest;
}

/**
 * RiskAssessmentSection - A component for displaying risk assessment information
 * with elegant typography and layout.
 */
const RiskAssessmentSection: React.FC<RiskAssessmentSectionProps> = ({ request }) => {
  const { riskScore, riskScoreValue } = request;
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Risk Assessment</h3>
      
      <div className="flex items-center mb-4">
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskScoreColor(riskScore)}`}>
          {riskScore} Risk
        </span>
        <div className="ml-2 flex-1">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
            <div 
              className={`h-1.5 rounded-full ${
                riskScore === 'Low' ? 'bg-green-500' : 
                riskScore === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${riskScoreValue}%` }}
            ></div>
          </div>
        </div>
        <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">{riskScoreValue}/100</span>
      </div>
      
      <p className="text-sm text-gray-600 dark:text-gray-400">
        This risk score is calculated based on property condition, market analysis, and investor track record.
      </p>
    </div>
  );
};

export default RiskAssessmentSection; 