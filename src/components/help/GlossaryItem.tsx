import React from 'react';
import { GlossaryItem as GlossaryItemType } from '../../types/helpTypes';

interface GlossaryItemProps {
  term: GlossaryItemType;
}

/**
 * GlossaryItem - A breathtaking glossary term component
 * with elegant styling and intuitive design. Features
 * term definition and related terms.
 */
const GlossaryItem: React.FC<GlossaryItemProps> = ({ term }) => {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          {term.term}
        </h3>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 capitalize">
          {term.category}
        </span>
      </div>
      
      <p className="mt-2 text-base text-gray-700 dark:text-gray-300">
        {term.definition}
      </p>
      
      {/* Related Terms */}
      {term.relatedTerms && term.relatedTerms.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Related Terms:
          </h4>
          <div className="mt-2 flex flex-wrap gap-2">
            {term.relatedTerms.map((relatedTerm, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400"
              >
                {relatedTerm}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GlossaryItem; 