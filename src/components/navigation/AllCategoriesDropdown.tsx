import React from 'react';

/**
 * AllCategoriesDropdown - An elegant dropdown component for
 * selecting search categories with smooth animations and
 * intuitive design.
 */
interface AllCategoriesDropdownProps {
  onSelect: () => void;
}

const AllCategoriesDropdown: React.FC<AllCategoriesDropdownProps> = ({ onSelect }) => {
  // Real estate specific categories for the dropdown
  const categories = [
    { id: 'properties', name: 'Properties' },
    { id: 'investment-properties', name: 'Investment Properties' },
    { id: 'fix-and-flips', name: 'Fix & Flips' },
    { id: 'lenders', name: 'Lenders' },
    { id: 'funding-opportunities', name: 'Funding Opportunities' },
  ];

  return (
    <div 
      className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 animate-fade-in"
      role="menu"
      aria-orientation="vertical"
    >
      <div className="py-1" role="none">
        <button
          type="button"
          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 font-medium"
          role="menuitem"
          onClick={onSelect}
        >
          All Categories
        </button>
        <div className="border-t border-gray-100 my-1"></div>
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            role="menuitem"
            onClick={onSelect}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllCategoriesDropdown; 