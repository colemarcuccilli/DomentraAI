import React, { useState } from 'react';
import { FaqItem as FaqItemType } from '../../types/helpTypes';

interface FaqItemProps {
  faq: FaqItemType;
}

/**
 * FaqItem - A breathtaking expandable FAQ item component
 * with elegant animations and intuitive design. Features
 * smooth transitions and accessible controls.
 */
const FaqItem: React.FC<FaqItemProps> = ({ faq }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Toggle expanded state
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <button
        className="w-full flex justify-between items-center p-4 text-left focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        onClick={toggleExpanded}
        aria-expanded={isExpanded}
        aria-controls={`faq-answer-${faq.id}`}
      >
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          {faq.question}
        </h3>
        <span className="ml-6 flex-shrink-0">
          <svg
            className={`h-6 w-6 text-gray-400 transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      
      <div
        id={`faq-answer-${faq.id}`}
        className={`transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? 'max-h-96' : 'max-h-0'}`}
      >
        <div className="p-4 pt-0 border-t border-gray-200 dark:border-gray-700">
          <p className="text-base text-gray-700 dark:text-gray-300 whitespace-pre-line">
            {faq.answer}
          </p>
          
          {/* Tags */}
          {faq.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {faq.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FaqItem; 