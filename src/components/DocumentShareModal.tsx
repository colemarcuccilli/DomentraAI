import React from 'react';
import { Document, User } from '../types/documentTypes';

interface DocumentShareModalProps {
  isOpen: boolean;
  document: Document | null;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

/**
 * DocumentShareModal - A breathtaking modal component for sharing documents
 * with team members or external partners. Features elegant animations,
 * permission controls, and notification options.
 */
const DocumentShareModal: React.FC<DocumentShareModalProps> = ({ 
  isOpen, 
  document, 
  onClose, 
  onSubmit 
}) => {
  if (!isOpen || !document) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="share-modal" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose}></div>
        
        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900 sm:mx-0 sm:h-10 sm:w-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white" id="share-modal-title">
                  Share "{document.name}"
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Share this document with team members or external partners.
                  </p>
                </div>
              </div>
            </div>
            
            <form onSubmit={onSubmit} className="mt-5">
              <div className="space-y-4">
                {/* Already shared with */}
                {document.sharedWith.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Already shared with
                    </h4>
                    <div className="space-y-2">
                      {document.sharedWith.map((user: User) => (
                        <div key={user.id} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-2 rounded-md">
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
                          <select
                            className="text-xs border-0 bg-transparent focus:ring-0 text-gray-500 dark:text-gray-400 py-0"
                            defaultValue={user.role}
                          >
                            <option value="viewer">Viewer</option>
                            <option value="admin">Admin</option>
                            <option value="owner">Owner</option>
                          </select>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Add people */}
                <div>
                  <label htmlFor="share-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Add people
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                      type="email"
                      name="share-email"
                      id="share-email"
                      className="focus:ring-primary-500 focus:border-primary-500 flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Email address"
                    />
                    <select
                      className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 sm:text-sm"
                    >
                      <option value="viewer">Viewer</option>
                      <option value="admin">Admin</option>
                      <option value="owner">Owner</option>
                    </select>
                  </div>
                </div>
                
                {/* Share options */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Share options
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        id="share-link"
                        name="share-option"
                        type="radio"
                        defaultChecked
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-600"
                      />
                      <label htmlFor="share-link" className="ml-3 block text-sm text-gray-700 dark:text-gray-300">
                        Create a link to share with anyone
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="share-specific"
                        name="share-option"
                        type="radio"
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-600"
                      />
                      <label htmlFor="share-specific" className="ml-3 block text-sm text-gray-700 dark:text-gray-300">
                        Only share with specific people
                      </label>
                    </div>
                  </div>
                </div>
                
                {/* Notification message */}
                <div>
                  <label htmlFor="share-message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Add a message (optional)
                  </label>
                  <textarea
                    id="share-message"
                    name="share-message"
                    rows={3}
                    className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Add a note to recipients..."
                  ></textarea>
                </div>
              </div>
              
              <div className="mt-6 sm:flex sm:flex-row-reverse">
                <button
                  type="submit"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Share
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentShareModal; 