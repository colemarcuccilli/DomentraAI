import React from 'react';
import { Integration } from '../../types/integrationTypes';

interface IntegrationStatsProps {
  integrations: Integration[];
}

/**
 * IntegrationStats - A breathtaking statistics component for integrations
 * with elegant animations and intuitive visualizations. Features mobile-first design,
 * responsive layout, and real-time data display.
 */
const IntegrationStats: React.FC<IntegrationStatsProps> = ({ integrations }) => {
  // Calculate statistics
  const totalIntegrations = integrations.length;
  const connectedIntegrations = integrations.filter(i => i.status === 'connected').length;
  const pendingIntegrations = integrations.filter(i => i.status === 'pending').length;
  const errorIntegrations = integrations.filter(i => i.status === 'error').length;
  
  // Calculate connection percentage
  const connectionPercentage = totalIntegrations > 0 
    ? Math.round((connectedIntegrations / totalIntegrations) * 100) 
    : 0;
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
        Integration Overview
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Total
          </div>
          <div className="mt-1 flex items-baseline">
            <div className="text-2xl font-semibold text-gray-900 dark:text-white">
              {totalIntegrations}
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
          <div className="text-sm font-medium text-green-600 dark:text-green-400">
            Connected
          </div>
          <div className="mt-1 flex items-baseline">
            <div className="text-2xl font-semibold text-green-700 dark:text-green-400">
              {connectedIntegrations}
            </div>
            <div className="ml-2 text-sm font-medium text-green-600 dark:text-green-400">
              {connectionPercentage}%
            </div>
          </div>
        </div>
        
        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
          <div className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
            Pending
          </div>
          <div className="mt-1 flex items-baseline">
            <div className="text-2xl font-semibold text-yellow-700 dark:text-yellow-400">
              {pendingIntegrations}
            </div>
          </div>
        </div>
        
        <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
          <div className="text-sm font-medium text-red-600 dark:text-red-400">
            Error
          </div>
          <div className="mt-1 flex items-baseline">
            <div className="text-2xl font-semibold text-red-700 dark:text-red-400">
              {errorIntegrations}
            </div>
          </div>
        </div>
      </div>
      
      {/* Connection Progress Bar */}
      <div className="mt-4">
        <div className="flex justify-between items-center mb-1">
          <div className="text-xs font-medium text-gray-500 dark:text-gray-400">
            Connection Progress
          </div>
          <div className="text-xs font-medium text-gray-500 dark:text-gray-400">
            {connectionPercentage}%
          </div>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          <div 
            className="bg-primary-600 h-2.5 rounded-full" 
            style={{ width: `${connectionPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationStats; 