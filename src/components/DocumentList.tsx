import React from 'react';
import { Document } from '../types/documentTypes';

interface DocumentListProps {
  documents: Document[];
  searchTerm: string;
  selectedCategory: string;
  sortBy: 'date' | 'name' | 'size';
  sortDirection: 'asc' | 'desc';
  toggleSort: (field: 'date' | 'name' | 'size') => void;
  handleDocumentSelect: (document: Document) => void;
  handleShareDocument: (document: Document) => void;
  formatDate: (dateString: string) => string;
  getFileTypeIcon: (type: string) => JSX.Element;
  isLoading: boolean;
}

/**
 * DocumentList - A breathtaking, mobile-first document list component
 * that displays filtered and sorted documents with beautiful animations
 * and intuitive controls.
 */
const DocumentList: React.FC<DocumentListProps> = ({
  documents,
  searchTerm,
  selectedCategory,
  sortBy,
  sortDirection,
  toggleSort,
  handleDocumentSelect,
  handleShareDocument,
  formatDate,
  getFileTypeIcon,
  isLoading
}) => {
  // Filter and sort documents
  const filteredAndSortedDocuments = documents
    .filter(doc => {
      // Filter by search term
      const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      // Filter by category
      const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      // Sort by selected field
      if (sortBy === 'date') {
        const dateA = new Date(a.uploadDate).getTime();
        const dateB = new Date(b.uploadDate).getTime();
        return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
      } else if (sortBy === 'name') {
        return sortDirection === 'asc' 
          ? a.name.localeCompare(b.name) 
          : b.name.localeCompare(a.name);
      } else { // Sort by size
        const sizeA = parseFloat(a.size.split(' ')[0]);
        const sizeB = parseFloat(b.size.split(' ')[0]);
        return sortDirection === 'asc' ? sizeA - sizeB : sizeB - sizeA;
      }
    });

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-pulse">
        <div className="flex justify-between mb-6">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
        </div>
        
        <div className="space-y-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="flex items-center">
              <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
              <div className="ml-4 flex-1">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
              <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Document List Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            {selectedCategory === 'all' ? 'All Documents' : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Documents`}
            <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
              ({filteredAndSortedDocuments.length} {filteredAndSortedDocuments.length === 1 ? 'document' : 'documents'})
            </span>
          </h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">Sort by:</span>
            <button
              onClick={() => toggleSort('date')}
              className={`px-3 py-1 text-sm rounded-md ${
                sortBy === 'date'
                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              Date {sortBy === 'date' && (sortDirection === 'asc' ? '↑' : '↓')}
            </button>
            <button
              onClick={() => toggleSort('name')}
              className={`px-3 py-1 text-sm rounded-md ${
                sortBy === 'name'
                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              Name {sortBy === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
            </button>
            <button
              onClick={() => toggleSort('size')}
              className={`px-3 py-1 text-sm rounded-md ${
                sortBy === 'size'
                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              Size {sortBy === 'size' && (sortDirection === 'asc' ? '↑' : '↓')}
            </button>
          </div>
        </div>
      </div>
      
      {/* Document List */}
      {filteredAndSortedDocuments.length > 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredAndSortedDocuments.map(document => (
              <li
                key={document.id}
                className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 cursor-pointer"
                onClick={() => handleDocumentSelect(document)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      {getFileTypeIcon(document.type)}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-base font-medium text-gray-900 dark:text-white">
                        {document.name}
                      </h3>
                      <div className="mt-1 flex items-center">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {formatDate(document.uploadDate)}
                        </span>
                        <span className="mx-2 text-gray-300 dark:text-gray-600">•</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {document.size}
                        </span>
                        <span className="mx-2 text-gray-300 dark:text-gray-600">•</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                          {document.category}
                        </span>
                      </div>
                      {document.propertyAddress && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {document.propertyAddress.split(',')[0]}
                        </p>
                      )}
                      <div className="mt-2 flex flex-wrap gap-1">
                        {document.tags.slice(0, 3).map((tag: string, index: number) => (
                          <span
                            key={index}
                            className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-md"
                          >
                            {tag}
                          </span>
                        ))}
                        {document.tags.length > 3 && (
                          <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-md">
                            +{document.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                      title="Download"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Download logic would go here
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </button>
                    <button
                      className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                      title="Share"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleShareDocument(document);
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
            No documents found
          </h3>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            {searchTerm 
              ? `No results found for "${searchTerm}". Try another search term.` 
              : `No ${selectedCategory !== 'all' ? selectedCategory : ''} documents available.`}
          </p>
        </div>
      )}
    </div>
  );
};

export default DocumentList; 