import React from 'react';

interface SearchTabsProps {
  activeTab: 'properties' | 'funding';
  onTabChange: (tab: 'properties' | 'funding') => void;
}

const SearchTabs: React.FC<SearchTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="inline-flex rounded-lg bg-gray-100 p-1">
      <button
        onClick={() => onTabChange('properties')}
        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
          activeTab === 'properties'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-500 hover:text-gray-900'
        }`}
      >
        Buy Properties
      </button>
      <button
        onClick={() => onTabChange('funding')}
        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
          activeTab === 'funding'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-500 hover:text-gray-900'
        }`}
      >
        Fund a Deal
      </button>
    </div>
  );
};

export default SearchTabs; 