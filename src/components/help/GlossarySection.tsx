import React, { useState, useEffect } from 'react';
import { mockGlossary } from '../../data/mockHelpData';
import GlossaryItem from './GlossaryItem';

interface GlossarySectionProps {
  searchQuery: string;
}

/**
 * GlossarySection - A breathtaking glossary component for the Help page
 * with elegant animations and intuitive design. Features alphabetical
 * navigation, category filtering, and search functionality.
 */
const GlossarySection: React.FC<GlossarySectionProps> = ({ searchQuery }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeLetter, setActiveLetter] = useState<string>('all');
  const [filteredTerms, setFilteredTerms] = useState(mockGlossary);
  
  // Filter glossary terms based on search query, active category, and active letter
  useEffect(() => {
    let filtered = mockGlossary;
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(term => 
        term.term.toLowerCase().includes(query) || 
        term.definition.toLowerCase().includes(query) ||
        (term.relatedTerms && term.relatedTerms.some(related => related.toLowerCase().includes(query)))
      );
    }
    
    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(term => term.category === activeCategory);
    }
    
    // Filter by letter
    if (activeLetter !== 'all') {
      filtered = filtered.filter(term => term.term.charAt(0).toLowerCase() === activeLetter.toLowerCase());
    }
    
    setFilteredTerms(filtered);
  }, [searchQuery, activeCategory, activeLetter]);
  
  // Get unique categories from glossary
  const categories = ['all', ...new Set(mockGlossary.map(term => term.category))];
  
  // Get all unique first letters from glossary terms
  const letters = ['all', ...new Set(mockGlossary.map(term => term.term.charAt(0).toUpperCase()))].sort();
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6" id="glossary">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Glossary of Terms
        </h2>
      </div>
      
      {/* Alphabet Navigation */}
      <div className="mb-6 overflow-x-auto">
        <div className="flex space-x-1 min-w-max">
          {letters.map((letter) => (
            <button
              key={letter}
              onClick={() => setActiveLetter(letter)}
              className={`px-2 py-1 text-sm rounded-md ${
                activeLetter === letter
                  ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400'
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {letter === 'all' ? 'All' : letter}
            </button>
          ))}
        </div>
      </div>
      
      {/* Category Filter */}
      <div className="mb-6">
        <label htmlFor="glossary-category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Filter by Category
        </label>
        <select
          id="glossary-category"
          className="block w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md py-2 pl-3 pr-10 text-base focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          value={activeCategory}
          onChange={(e) => setActiveCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>
      
      {/* Search Results Count */}
      {searchQuery && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          {filteredTerms.length} {filteredTerms.length === 1 ? 'result' : 'results'} for "{searchQuery}"
        </p>
      )}
      
      {/* Glossary List */}
      {filteredTerms.length > 0 ? (
        <div className="space-y-6">
          {filteredTerms.map((term) => (
            <GlossaryItem key={term.id} term={term} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
            No Terms Found
          </h3>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            {searchQuery 
              ? `No results found for "${searchQuery}". Try another search term.` 
              : 'No terms available with the selected filters.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default GlossarySection; 