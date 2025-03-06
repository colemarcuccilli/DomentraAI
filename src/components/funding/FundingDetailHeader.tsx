import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageGallery from '../matchmaking/detailModal/ImageGallery';
import PropertyHeader from '../matchmaking/detailModal/PropertyHeader';
import { FundingRequest } from '../matchmaking/FundingRequestCard';
import { TabType } from '../matchmaking/detailModal/NavigationTabs';
import NegotiationButton from '../negotiation/NegotiationButton';

interface FundingDetailHeaderProps {
  fundingRequest: FundingRequest;
  hasOffers: boolean;
  offersCount: number;
  setActiveTab: (tab: TabType) => void;
  onToggleEdit: () => void;
  isEditing: boolean;
  onDelete: () => void;
}

/**
 * FundingDetailHeader - A breathtaking, mobile-first component
 * that displays the header section of the funding detail page.
 */
const FundingDetailHeader: React.FC<FundingDetailHeaderProps> = ({
  fundingRequest,
  hasOffers,
  offersCount,
  setActiveTab,
  onToggleEdit,
  isEditing,
  onDelete
}) => {
  const navigate = useNavigate();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = () => {
    if (showDeleteConfirm) {
      onDelete();
      setShowDeleteConfirm(false);
    } else {
      setShowDeleteConfirm(true);
    }
  };

  return (
    <>
      <div className="bg-primary-600 dark:bg-primary-800 text-white p-4">
        <button 
          onClick={() => navigate('/my-requests')}
          className="flex items-center text-sm font-medium text-white/80 hover:text-white"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to My Requests
        </button>
      </div>
      
      {/* Top Section with Image and Key Details */}
      <div className="flex flex-col md:flex-row">
        {/* Property Image */}
        <div className="md:w-1/2 md:h-[400px]">
          <ImageGallery 
            mainImage={fundingRequest.imageUrl} 
            additionalImages={fundingRequest.additionalImages} 
            propertyAddress={fundingRequest.propertyAddress} 
          />
        </div>
        
        {/* Property Details */}
        <div className="md:w-1/2 p-6">
          <PropertyHeader request={fundingRequest} />
          <div className="mt-6 flex flex-wrap gap-3">
            <button 
              onClick={onToggleEdit}
              className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isEditing ? 'bg-green-600 hover:bg-green-700' : 'bg-primary-600 hover:bg-primary-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500`}
            >
              <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                {isEditing ? (
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                ) : (
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                )}
              </svg>
              {isEditing ? 'Save Changes' : 'Edit Request'}
            </button>
            <button 
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              onClick={() => {
                setActiveTab('offers');
              }}
            >
              <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
              </svg>
              {hasOffers ? `View Offers (${offersCount})` : 'No Offers Yet'}
            </button>
            <NegotiationButton fundingRequestId={fundingRequest.id} />
            <button 
              onClick={handleDelete}
              className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${showDeleteConfirm ? 'bg-red-700 hover:bg-red-800' : 'bg-red-600 hover:bg-red-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500`}
            >
              <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {showDeleteConfirm ? 'Confirm Delete' : 'Delete Request'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FundingDetailHeader; 