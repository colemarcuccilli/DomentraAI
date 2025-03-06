import React from 'react';

interface DocumentsListProps {
  documents: string[];
}

/**
 * DocumentsList - A breathtaking, mobile-first component
 * for displaying available documents with elegant typography and icons.
 */
const DocumentsList: React.FC<DocumentsListProps> = ({ documents }) => {
  if (!documents || documents.length === 0) return null;
  
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
        Available Documents
      </h3>
      
      <div className="space-y-2">
        {documents.map((document, index) => (
          <a 
            key={index}
            href="#" 
            className="flex items-center p-2 bg-gray-50 dark:bg-gray-800 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <svg className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{document}</span>
          </a>
        ))}
      </div>
      
      <div className="mt-4">
        <a 
          href="#" 
          className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium flex items-center"
        >
          <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          View All Verified Contracts
        </a>
      </div>
    </div>
  );
};

export default DocumentsList; 