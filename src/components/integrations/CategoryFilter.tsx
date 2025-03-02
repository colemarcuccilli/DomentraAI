import React from 'react';
import { IntegrationCategory, IntegrationCategoryInfo } from '../../types/integrationTypes';

interface CategoryFilterProps {
  categories: IntegrationCategoryInfo[];
  selectedCategory: IntegrationCategory | 'all';
  onCategoryChange: (category: IntegrationCategory | 'all') => void;
}

/**
 * CategoryFilter - A breathtaking filter component for integration categories
 * with elegant animations and intuitive controls. Features mobile-first design,
 * responsive layout, and visual indicators for selected categories.
 */
const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategoryChange
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
        Integration Categories
      </h2>
      
      <div className="space-y-2">
        <button
          onClick={() => onCategoryChange('all')}
          className={`w-full text-left px-3 py-2 rounded-md flex items-center ${
            selectedCategory === 'all' 
              ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400' 
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
          </svg>
          All Integrations
        </button>
        
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`w-full text-left px-3 py-2 rounded-md flex items-center ${
              selectedCategory === category.id 
                ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400' 
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <span className="mr-2">{category.iconComponent}</span>
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter; 