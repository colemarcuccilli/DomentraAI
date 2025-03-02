import React, { useState, useEffect } from 'react';
import { mockTutorials } from '../../data/mockHelpData';
import TutorialCard from './TutorialCard';

interface TutorialSectionProps {
  searchQuery: string;
}

/**
 * TutorialSection - A breathtaking tutorials component for the Help page
 * with elegant animations and intuitive design. Features category
 * filtering, difficulty levels, and search functionality.
 */
const TutorialSection: React.FC<TutorialSectionProps> = ({ searchQuery }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeDifficulty, setActiveDifficulty] = useState<string>('all');
  const [filteredTutorials, setFilteredTutorials] = useState(mockTutorials);
  
  // Filter tutorials based on search query, active category, and active difficulty
  useEffect(() => {
    let filtered = mockTutorials;
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(tutorial => 
        tutorial.title.toLowerCase().includes(query) || 
        tutorial.description.toLowerCase().includes(query) ||
        tutorial.tags.some(tag => tag.toLowerCase().includes(query)) ||
        tutorial.steps.some(step => 
          step.title.toLowerCase().includes(query) || 
          step.description.toLowerCase().includes(query)
        )
      );
    }
    
    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(tutorial => tutorial.category === activeCategory);
    }
    
    // Filter by difficulty
    if (activeDifficulty !== 'all') {
      filtered = filtered.filter(tutorial => tutorial.difficulty === activeDifficulty);
    }
    
    setFilteredTutorials(filtered);
  }, [searchQuery, activeCategory, activeDifficulty]);
  
  // Get unique categories from tutorials
  const categories = ['all', ...new Set(mockTutorials.map(tutorial => tutorial.category))];
  
  // Difficulty levels
  const difficulties = ['all', 'beginner', 'intermediate', 'advanced'];
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6" id="tutorials">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Tutorials & Guides
        </h2>
      </div>
      
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Category Filter */}
        <div>
          <label htmlFor="tutorial-category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Filter by Category
          </label>
          <select
            id="tutorial-category"
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
        
        {/* Difficulty Filter */}
        <div>
          <label htmlFor="tutorial-difficulty" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Filter by Difficulty
          </label>
          <select
            id="tutorial-difficulty"
            className="block w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md py-2 pl-3 pr-10 text-base focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            value={activeDifficulty}
            onChange={(e) => setActiveDifficulty(e.target.value)}
          >
            {difficulties.map((difficulty) => (
              <option key={difficulty} value={difficulty}>
                {difficulty === 'all' ? 'All Difficulties' : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Search Results Count */}
      {searchQuery && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          {filteredTutorials.length} {filteredTutorials.length === 1 ? 'result' : 'results'} for "{searchQuery}"
        </p>
      )}
      
      {/* Tutorial Cards */}
      {filteredTutorials.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTutorials.map((tutorial) => (
            <TutorialCard key={tutorial.id} tutorial={tutorial} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
            No Tutorials Found
          </h3>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            {searchQuery 
              ? `No results found for "${searchQuery}". Try another search term.` 
              : 'No tutorials available with the selected filters.'}
          </p>
        </div>
      )}
      
      {/* Request Tutorial */}
      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Need a Different Tutorial?
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mb-4">
          If you can't find a tutorial for what you need, let us know and we'll create one for you.
        </p>
        <button
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Request a Tutorial
        </button>
      </div>
    </div>
  );
};

export default TutorialSection; 