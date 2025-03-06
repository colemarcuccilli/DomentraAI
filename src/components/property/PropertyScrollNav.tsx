import React, { useEffect, useState } from 'react';

interface PropertyScrollNavProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

/**
 * PropertyScrollNav - A navigation component that appears when scrolling past the photos
 * in the property detail modal. Allows users to quickly navigate to different sections.
 */
const PropertyScrollNav: React.FC<PropertyScrollNavProps> = ({ 
  activeSection,
  onSectionChange
}) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Check if we should show the navigation based on scroll position
    const checkVisibility = () => {
      const photoGallery = document.getElementById('property-photo-gallery');
      const modalContent = document.querySelector('.property-modal-content');
      
      if (photoGallery && modalContent) {
        const photoRect = photoGallery.getBoundingClientRect();
        const modalRect = modalContent.getBoundingClientRect();
        
        // Show nav when photo gallery is scrolled out of view (top of photo is above the modal viewport)
        const photoTopRelativeToModal = photoRect.top - modalRect.top;
        setIsVisible(photoTopRelativeToModal < 0);
      }
    };
    
    // Find the modal content element and attach scroll listener
    const modalContent = document.querySelector('.property-modal-content');
    if (modalContent) {
      modalContent.addEventListener('scroll', checkVisibility);
      // Initial check
      checkVisibility();
      
      return () => {
        modalContent.removeEventListener('scroll', checkVisibility);
      };
    }
  }, []);
  
  const handleSectionClick = (sectionId: string) => {
    onSectionChange(sectionId);
    
    // Scroll to the section
    const section = document.getElementById(sectionId);
    const modalContent = document.querySelector('.property-modal-content');
    
    if (section && modalContent) {
      const modalRect = modalContent.getBoundingClientRect();
      const sectionRect = section.getBoundingClientRect();
      
      // Calculate position relative to modal
      const scrollTop = sectionRect.top - modalRect.top + modalContent.scrollTop - 80; // 80px offset for nav height
      
      modalContent.scrollTo({
        top: scrollTop,
        behavior: 'smooth'
      });
    }
  };
  
  if (!isVisible) return null;
  
  return (
    <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <nav className="flex space-x-8 overflow-x-auto hide-scrollbar py-3">
          <button
            onClick={() => handleSectionClick('overview')}
            className={`whitespace-nowrap px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              activeSection === 'overview'
                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Overview
          </button>
          
          <button
            onClick={() => handleSectionClick('facts-features')}
            className={`whitespace-nowrap px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              activeSection === 'facts-features'
                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Facts & Features
          </button>
          
          <button
            onClick={() => handleSectionClick('market-value')}
            className={`whitespace-nowrap px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              activeSection === 'market-value'
                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Market Value
          </button>
          
          <button
            onClick={() => handleSectionClick('neighborhood')}
            className={`whitespace-nowrap px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              activeSection === 'neighborhood'
                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Neighborhood
          </button>
          
          <button
            onClick={() => handleSectionClick('investment-opportunity')}
            className={`whitespace-nowrap px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              activeSection === 'investment-opportunity'
                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Investment Opportunity
          </button>
        </nav>
      </div>
    </div>
  );
};

export default PropertyScrollNav; 