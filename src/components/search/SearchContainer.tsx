import React, { useState } from 'react';
import SearchTabs from './SearchTabs';
import SearchInput from './SearchInput';
import QuickFilters from './QuickFilters';

interface SearchContainerProps {
  onSearch: (query: string, filters: string[], type: 'properties' | 'funding') => void;
}

const SearchContainer: React.FC<SearchContainerProps> = ({ onSearch }) => {
  const [activeTab, setActiveTab] = useState<'properties' | 'funding'>('properties');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const handleSearch = () => {
    onSearch(searchQuery, selectedFilters, activeTab);
  };

  const handleFilterToggle = (filterId: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filterId)
        ? prev.filter((id) => id !== filterId)
        : [...prev, filterId]
    );
  };

  const placeholder = activeTab === 'properties'
    ? 'Search investment properties...'
    : 'Search funding opportunities...';

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <SearchTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        <button 
          className="ml-4 px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors"
        >
          {activeTab === 'properties' ? 'List a Property' : 'List Funding Need'}
        </button>
      </div>
      <div className="flex-1">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          onSearch={handleSearch}
          placeholder={placeholder}
        />
        <QuickFilters
          type={activeTab}
          selectedFilters={selectedFilters}
          onFilterToggle={handleFilterToggle}
        />
      </div>
    </div>
  );
};

export default SearchContainer; 