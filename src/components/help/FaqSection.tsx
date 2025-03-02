import React, { useState, useEffect } from 'react';
import { mockFaqs } from '../../data/mockHelpData';
import FaqItem from './FaqItem';

interface FaqSectionProps {
  searchQuery: string;
}

/**
 * FaqSection - A breathtaking FAQ component for the Help page
 * with elegant animations and intuitive design. Features expandable
 * questions and answers, category filtering, and search functionality.
 */
const FaqSection: React.FC<FaqSectionProps> = ({ searchQuery }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [filteredFaqs, setFilteredFaqs] = useState(mockFaqs);
  
  // Filter FAQs based on search query and active category
  useEffect(() => {
    let filtered = mockFaqs;
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(faq => 
        faq.question.toLowerCase().includes(query) || 
        faq.answer.toLowerCase().includes(query) ||
        faq.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(faq => faq.category === activeCategory);
    }
    
    setFilteredFaqs(filtered);
  }, [searchQuery, activeCategory]);
  
  // Get unique categories from FAQs
  const categories = ['all', ...new Set(mockFaqs.map(faq => faq.category))];
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6" id="faq">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Frequently Asked Questions
        </h2>
        
        {/* Category Filter Pills */}
        <div className="hidden md:flex space-x-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-3 py-1 text-sm rounded-md ${
                activeCategory === category
                  ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400'
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      {/* Mobile Category Dropdown */}
      <div className="mb-4 md:hidden">
        <label htmlFor="category-select" className="sr-only">Select Category</label>
        <select
          id="category-select"
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
          {filteredFaqs.length} {filteredFaqs.length === 1 ? 'result' : 'results'} for "{searchQuery}"
        </p>
      )}
      
      {/* FAQ List */}
      {filteredFaqs.length > 0 ? (
        <div className="space-y-4">
          {filteredFaqs.map((faq) => (
            <FaqItem key={faq.id} faq={faq} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
            No FAQs Found
          </h3>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            {searchQuery 
              ? `No results found for "${searchQuery}". Try another search term.` 
              : 'No FAQs available in this category.'}
          </p>
        </div>
      )}
      
      {/* Still Need Help */}
      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Still Need Help?
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mb-4">
          If you couldn't find the answer to your question, our support team is here to help.
        </p>
        <button
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default FaqSection; 