import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FundingRequestCard from '../components/matchmaking/FundingRequestCard';
import { FundingRequest } from '../components/matchmaking/FundingRequestCard';
import { mockFundingRequests } from '../data/mockFundingRequests';

/**
 * MyRequests - A breathtaking, mobile-first page component
 * for displaying and managing the user's funding requests.
 */
const MyRequests: React.FC = () => {
  console.log('MyRequests component is being rendered');
  const navigate = useNavigate();
  const [userRequests, setUserRequests] = useState<FundingRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'funded' | 'expired'>('all');
  const [selectedRequest, setSelectedRequest] = useState<FundingRequest | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Fetch user's funding requests
  useEffect(() => {
    // In a real app, this would be an API call to get the user's requests
    // For now, we'll use mock data and pretend the first 3 requests belong to the current user
    setIsLoading(true);
    
    setTimeout(() => {
      // Simulate API call delay
      const userMockRequests = mockFundingRequests.slice(0, 3).map((request, index) => {
        // Add random offers count to each request
        return {
          ...request,
          offersCount: index === 0 ? 3 : index === 1 ? 1 : 0
        };
      });
      setUserRequests(userMockRequests);
      setIsLoading(false);
    }, 800);
  }, []);

  // Filter requests by status
  const getFilteredRequests = () => {
    if (statusFilter === 'all') return userRequests;
    
    if (statusFilter === 'active') {
      return userRequests.filter(request => 
        request.timeRemaining > 0
      );
    }
    
    if (statusFilter === 'funded') {
      // Since we don't have fundingProgress anymore, we'll consider a request "funded"
      // if it has a specific property or condition. For now, let's use a placeholder.
      // In a real app, you would have a specific status field or other indicator.
      return userRequests.filter(request => 
        false // Placeholder - replace with actual logic when available
      );
    }
    
    if (statusFilter === 'expired') {
      return userRequests.filter(request => 
        request.timeRemaining <= 0
      );
    }
    
    return userRequests;
  };

  // Handle view request details
  const handleViewRequest = (request: FundingRequest) => {
    navigate(`/funding/${request.id}`);
  };

  // Handle edit request
  const handleEditRequest = (request: FundingRequest, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the card click
    navigate(`/edit-request/${request.id}`);
  };

  // Handle delete request
  const handleDeleteClick = (request: FundingRequest, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the card click
    setSelectedRequest(request);
    setIsDeleteModalOpen(true);
  };

  // Confirm delete request
  const handleConfirmDelete = () => {
    if (!selectedRequest) return;
    
    // In a real app, this would be an API call to delete the request
    setUserRequests(prevRequests => 
      prevRequests.filter(request => request.id !== selectedRequest.id)
    );
    
    setIsDeleteModalOpen(false);
    setSelectedRequest(null);
  };

  // Cancel delete
  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setSelectedRequest(null);
  };

  // Create a new funding request
  const handleCreateRequest = () => {
    navigate('/create-request');
  };

  // Render loading skeleton
  const renderSkeleton = () => (
    <div className="space-y-4">
      {[1, 2, 3].map((item) => (
        <div key={item} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 animate-pulse">
          <div className="flex flex-col sm:flex-row">
            <div className="sm:w-1/4 h-32 bg-gray-300 dark:bg-gray-700 rounded mb-4 sm:mb-0"></div>
            <div className="sm:w-3/4 sm:pl-4 space-y-2">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
              <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mt-4"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Funding Requests</h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Manage your posted funding requests and track their progress
            </p>
          </div>
          <button
            onClick={handleCreateRequest}
            className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Create New Request
          </button>
        </div>

        {/* Status Filter */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                statusFilter === 'all'
                  ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200'
                  : 'bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              All Requests
            </button>
            <button
              onClick={() => setStatusFilter('active')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                statusFilter === 'active'
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : 'bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setStatusFilter('funded')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                statusFilter === 'funded'
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  : 'bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              Funded
            </button>
            <button
              onClick={() => setStatusFilter('expired')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                statusFilter === 'expired'
                  ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  : 'bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              Expired
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          {isLoading ? (
            renderSkeleton()
          ) : getFilteredRequests().length > 0 ? (
            <div className="space-y-4">
              {getFilteredRequests().map((request) => (
                <div 
                  key={request.id} 
                  className="relative cursor-pointer"
                  onClick={() => handleViewRequest(request)}
                >
                  <FundingRequestCard
                    request={request}
                    view="list"
                    onClick={handleViewRequest}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No funding requests found</h3>
              <p className="mt-1 text-gray-500 dark:text-gray-400">
                {statusFilter !== 'all' 
                  ? `You don't have any ${statusFilter} funding requests.` 
                  : "You haven't created any funding requests yet."}
              </p>
              <div className="mt-6">
                <button
                  onClick={handleCreateRequest}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Create Your First Request
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedRequest && (
        <div className="fixed z-50 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900 sm:mx-0 sm:h-10 sm:w-10">
                    <svg className="h-6 w-6 text-red-600 dark:text-red-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white" id="modal-title">
                      Delete Funding Request
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Are you sure you want to delete this funding request? This action cannot be undone.
                      </p>
                      <p className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                        {selectedRequest.propertyAddress}, {selectedRequest.city}, {selectedRequest.state}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button 
                  type="button" 
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleConfirmDelete}
                >
                  Delete
                </button>
                <button 
                  type="button" 
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleCancelDelete}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyRequests; 