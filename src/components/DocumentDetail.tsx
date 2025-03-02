import React from 'react';
import { Document, User } from '../types/documentTypes';

interface DocumentDetailProps {
  document: Document;
  formatDate: (dateString: string) => string;
  getFileTypeIcon: (type: string) => JSX.Element;
  getCategoryIcon: (category: string) => JSX.Element;
  handleShareDocument: (document: Document) => void;
  onClose: () => void;
}

/**
 * DocumentDetail - A breathtaking, mobile-first document detail component
 * that displays comprehensive information about a selected document with
 * elegant styling and intuitive actions.
 */
const DocumentDetail: React.FC<DocumentDetailProps> = ({
  document,
  formatDate,
  getFileTypeIcon,
  getCategoryIcon,
  handleShareDocument,
  onClose
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      {/* Document Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-start">
        <div className="flex items-start">
          <div className="mr-4">
            {getFileTypeIcon(document.type)}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {document.name}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {document.size} • Uploaded on {formatDate(document.uploadDate)}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      {/* Document Actions */}
      <div className="bg-gray-50 dark:bg-gray-700 p-4 flex space-x-2">
        <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md flex items-center font-medium">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download
        </button>
        <button 
          className="bg-white dark:bg-gray-600 text-gray-700 dark:text-white border border-gray-300 dark:border-gray-500 px-4 py-2 rounded-md flex items-center font-medium"
          onClick={() => handleShareDocument(document)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          Share
        </button>
        <button className="bg-white dark:bg-gray-600 text-gray-700 dark:text-white border border-gray-300 dark:border-gray-500 px-4 py-2 rounded-md flex items-center font-medium">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Edit
        </button>
      </div>
      
      {/* Document Details */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
              Category
            </h3>
            <div className="flex items-center">
              {getCategoryIcon(document.category)}
              <span className="ml-2 text-gray-900 dark:text-white capitalize">
                {document.category}
              </span>
            </div>
          </div>
          {document.propertyAddress && (
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Property
              </h3>
              <p className="text-gray-900 dark:text-white">
                {document.propertyAddress}
              </p>
            </div>
          )}
        </div>
        
        {/* Tags */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {document.tags.map((tag: string, index: number) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-md"
              >
                {tag}
              </span>
            ))}
            <button className="px-2 py-1 border border-dashed border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500 text-xs rounded-md flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Tag
            </button>
          </div>
        </div>
        
        {/* Shared With */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            Shared With
          </h3>
          {document.sharedWith.length > 0 ? (
            <div className="space-y-3">
              {document.sharedWith.map((user: User) => (
                <div key={user.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-700 dark:text-primary-300 font-medium">
                      {user.name.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-md capitalize">
                    {user.role}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              This document hasn't been shared with anyone yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentDetail; 