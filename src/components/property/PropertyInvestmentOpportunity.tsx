import React from 'react';
import { Property } from '../../types/property';

interface PropertyInvestmentOpportunityProps {
  property: Property;
}

/**
 * PropertyInvestmentOpportunity - A component that displays detailed financial analysis
 * and risk mitigation for the property, focusing on returns to excite lenders.
 */
const PropertyInvestmentOpportunity: React.FC<PropertyInvestmentOpportunityProps> = ({ property }) => {
  // Calculate investment metrics
  const rehabEstimate = property.arv - property.purchasePrice;
  const arvPercentage = Math.round((property.purchasePrice / property.arv) * 100);
  const potentialProfit = rehabEstimate * 0.5; // Simplified calculation for example
  
  // Mock investment scenarios
  const scenarios = [
    {
      name: 'Conservative',
      rehabCost: rehabEstimate * 1.2,
      timeframe: '6 months',
      arvEstimate: property.arv * 0.95,
      roi: (property.roi || 0) * 0.8,
      risk: 'Low'
    },
    {
      name: 'Moderate',
      rehabCost: rehabEstimate,
      timeframe: '4 months',
      arvEstimate: property.arv,
      roi: property.roi || 0,
      risk: 'Medium'
    },
    {
      name: 'Aggressive',
      rehabCost: rehabEstimate * 0.9,
      timeframe: '3 months',
      arvEstimate: property.arv * 1.05,
      roi: (property.roi || 0) * 1.2,
      risk: 'High'
    }
  ];
  
  // Mock lending options (for lenders to offer)
  const lendingOptions = [
    {
      type: 'Bridge Loan',
      amount: property.purchasePrice,
      term: '12 months',
      rate: '8.5%',
      points: '2',
      ltv: '75%',
      profitPotential: '$' + Math.round(property.purchasePrice * 0.085).toLocaleString()
    },
    {
      type: 'Rehab Loan',
      amount: rehabEstimate,
      term: '6 months',
      rate: '9.5%',
      points: '2.5',
      ltv: '100%',
      profitPotential: '$' + Math.round(rehabEstimate * 0.095 * 0.5).toLocaleString()
    },
    {
      type: 'Private Money',
      amount: property.purchasePrice + rehabEstimate,
      term: '12 months',
      rate: '10%',
      points: '1',
      ltv: '80%',
      profitPotential: '$' + Math.round((property.purchasePrice + rehabEstimate) * 0.1).toLocaleString()
    }
  ];
  
  return (
    <section id="investment-opportunity" className="py-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Investment Opportunity</h2>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
        {/* Investment Summary */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Investment Summary</h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Priced at <span className="font-semibold text-blue-600 dark:text-blue-400">${property.purchasePrice.toLocaleString()}</span> ({arvPercentage}% of ARV), 
            this property is a strategic fix-and-flip play. A <span className="font-semibold text-blue-600 dark:text-blue-400">${rehabEstimate.toLocaleString()}</span> rehab 
            unlocks a <span className="font-semibold text-blue-600 dark:text-blue-400">${property.arv.toLocaleString()}</span> ARV, 
            delivering <span className="font-semibold text-blue-600 dark:text-blue-400">${potentialProfit.toLocaleString()}</span> profit 
            at a <span className="font-semibold text-blue-600 dark:text-blue-400">{property.roi}%</span> ROI. 
            Low Risk Score (80/100) reflects stable market conditions, minimal renovation hurdles, and strong comps. 
            As a lender, you can capitalize on {property.city}'s premium market with multiple financing options.
          </p>
        </div>
        
        {/* Investment Scenarios */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Investment Scenarios</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Scenario</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Rehab Cost</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Timeframe</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">ARV Estimate</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">ROI</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Risk</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {scenarios.map((scenario, index) => (
                  <tr key={index} className={index === 1 ? 'bg-blue-50 dark:bg-blue-900/20' : ''}>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">{scenario.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">${Math.round(scenario.rehabCost).toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{scenario.timeframe}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">${Math.round(scenario.arvEstimate).toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{Math.round(scenario.roi)}%</td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{scenario.risk}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Lending Options */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Lending Opportunities</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {lendingOptions.map((option, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <div className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">{option.type}</div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Loan Amount:</span>
                    <span className="text-sm text-gray-900 dark:text-white">${Math.round(option.amount).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Term:</span>
                    <span className="text-sm text-gray-900 dark:text-white">{option.term}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Suggested Rate:</span>
                    <span className="text-sm text-gray-900 dark:text-white">{option.rate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Points:</span>
                    <span className="text-sm text-gray-900 dark:text-white">{option.points}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">LTV:</span>
                    <span className="text-sm text-gray-900 dark:text-white">{option.ltv}</span>
                  </div>
                  <div className="flex justify-between mt-2 pt-2 border-t border-gray-200 dark:border-gray-600">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Potential Income:</span>
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{option.profitPotential}</span>
                  </div>
                </div>
                <div className="mt-3 text-center">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {index === 0 ? 'Lowest risk, steady returns' : 
                     index === 1 ? 'Medium risk, higher returns' : 
                     'Higher risk, highest returns'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Risk Assessment */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Risk Assessment</h3>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-md font-medium text-gray-700 dark:text-gray-300">Overall Risk Score</h4>
              <div className="text-md font-medium text-green-500">Low Risk</div>
            </div>
            
            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5 mb-4">
              <div 
                className="h-2.5 rounded-full bg-green-500" 
                style={{ width: '80%' }}
              ></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Risk Factors</h5>
                <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-1.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Strong market demand in {property.city}
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-1.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Solid ARV supported by recent comps
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-1.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {arvPercentage}% purchase-to-ARV ratio (below 80% threshold)
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-1.5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Moderate rehab complexity
                  </li>
                </ul>
              </div>
              <div>
                <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Lender Protections</h5>
                <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-1.5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                    </svg>
                    Phased funding release tied to rehab milestones
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-1.5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                    </svg>
                    First position lien on property
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-1.5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                    </svg>
                    Personal guarantee from borrower
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-1.5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                    </svg>
                    10% contingency reserve
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyInvestmentOpportunity; 