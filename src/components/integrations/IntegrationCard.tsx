import React from 'react';
import { Integration, IntegrationStatus } from '../../types/integrationTypes';

interface IntegrationCardProps {
  integration: Integration;
  onConnect: (id: string) => void;
  onDisconnect: (id: string) => void;
  onViewDetails: (id: string) => void;
}

/**
 * IntegrationCard - A breathtaking card component that displays integration details
 * with elegant animations and intuitive controls. Features status indicators,
 * connection management, and detailed information display.
 */
const IntegrationCard: React.FC<IntegrationCardProps> = ({
  integration,
  onConnect,
  onDisconnect,
  onViewDetails
}) => {
  // Status badge color based on connection status
  const getStatusBadgeColor = (status: IntegrationStatus): string => {
    switch (status) {
      case 'connected':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'disconnected':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'error':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  // Status text based on connection status
  const getStatusText = (status: IntegrationStatus): string => {
    switch (status) {
      case 'connected':
        return 'Connected';
      case 'disconnected':
        return 'Disconnected';
      case 'pending':
        return 'Connection Pending';
      case 'error':
        return 'Connection Error';
      default:
        return 'Unknown Status';
    }
  };

  // Format date for display
  const formatDate = (dateString?: string): string => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="h-12 w-12 rounded-md bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
              {integration.logoUrl ? (
                <img 
                  src={integration.logoUrl} 
                  alt={`${integration.name} logo`} 
                  className="h-10 w-10 object-contain"
                  onError={(e) => {
                    // Fallback if image fails to load
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              ) : (
                <span className="text-xl font-bold text-gray-500 dark:text-gray-400">
                  {integration.name.charAt(0)}
                </span>
              )}
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {integration.name}
              </h3>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(integration.status)}`}>
                {getStatusText(integration.status)}
              </span>
            </div>
          </div>
          <div>
            {integration.popularityScore >= 8 && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900/20 dark:text-primary-400">
                Popular
              </span>
            )}
          </div>
        </div>
        
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {integration.description}
        </p>
        
        {integration.status === 'connected' && integration.connectedSince && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
            Connected since {formatDate(integration.connectedSince)}
          </p>
        )}
        
        <div className="flex flex-wrap gap-2 mb-4">
          {integration.features.slice(0, 3).map((feature, index) => (
            <span 
              key={index}
              className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
            >
              {feature}
            </span>
          ))}
          {integration.features.length > 3 && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
              +{integration.features.length - 3} more
            </span>
          )}
        </div>
        
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => onViewDetails(integration.id)}
            className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 text-sm font-medium"
          >
            View Details
          </button>
          
          {integration.status === 'connected' ? (
            <button
              onClick={() => onDisconnect(integration.id)}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              Disconnect
            </button>
          ) : (
            <button
              onClick={() => onConnect(integration.id)}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-600"
              disabled={integration.status === 'pending' || integration.status === 'error'}
            >
              {integration.status === 'pending' ? 'Pending...' : 
               integration.status === 'error' ? 'Retry Connection' : 'Connect'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default IntegrationCard; 