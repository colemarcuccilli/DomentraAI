import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import HelpHeader from '../components/help/HelpHeader';
import SearchBar from '../components/help/SearchBar';
import HelpCategories from '../components/help/HelpCategories';
import FaqSection from '../components/help/FaqSection';
import GlossarySection from '../components/help/GlossarySection';
import TutorialSection from '../components/help/TutorialSection';
import ContactSupport from '../components/help/ContactSupport';
import { HelpCategory } from '../types/helpTypes';

/**
 * Help - A breathtaking, mobile-first help center page
 * that empowers users to find answers, learn about the platform,
 * and get support when needed. Features elegant animations,
 * intuitive navigation, and comprehensive resources.
 */
const Help: React.FC = () => {
  // State for search and active category
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<HelpCategory>('faq');
  
  // Responsive design
  const isMobile = useMediaQuery({ maxWidth: 768 });
  
  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // If search is not empty, show all categories with matching content
    if (query.trim() !== '') {
      setActiveCategory('all');
    }
  };
  
  // Handle category change
  const handleCategoryChange = (category: HelpCategory) => {
    setActiveCategory(category);
    // Clear search when changing categories
    setSearchQuery('');
  };
  
  // Render the appropriate section based on active category
  const renderActiveSection = () => {
    switch (activeCategory) {
      case 'faq':
        return <FaqSection searchQuery={searchQuery} />;
      case 'glossary':
        return <GlossarySection searchQuery={searchQuery} />;
      case 'tutorials':
        return <TutorialSection searchQuery={searchQuery} />;
      case 'contact':
        return <ContactSupport />;
      case 'all':
        return (
          <>
            <FaqSection searchQuery={searchQuery} />
            <GlossarySection searchQuery={searchQuery} />
            <TutorialSection searchQuery={searchQuery} />
          </>
        );
      default:
        return <FaqSection searchQuery={searchQuery} />;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header Section */}
      <HelpHeader />
      
      {/* Main Content */}
      <section className="py-8">
        <div className="container-fluid">
          <div className="max-w-7xl mx-auto">
            {/* Search Bar */}
            <div className="mb-8">
              <SearchBar 
                searchQuery={searchQuery} 
                onSearch={handleSearch} 
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Sidebar Categories */}
              <div className="md:col-span-1">
                <HelpCategories 
                  activeCategory={activeCategory}
                  onCategoryChange={handleCategoryChange}
                />
              </div>
              
              {/* Main Content Area */}
              <div className="md:col-span-3">
                {renderActiveSection()}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Help; 