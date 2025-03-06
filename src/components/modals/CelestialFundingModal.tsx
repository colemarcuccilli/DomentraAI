import React, { useState } from 'react';
import { FundingRequest } from '../../types/property';

// Define a more flexible FundingRequest type for the component
type FlexibleFundingRequest = {
  id: string;
  title: string;
  amount: number;
  term: number;
  rate: number;
  type: string;
  description: string;
  property: any;
  borrower: any;
  status: string;
  isFeatured?: boolean;
  [key: string]: any;
};

interface CelestialFundingModalProps {
  request: FundingRequest | FlexibleFundingRequest;
  onClose: () => void;
  onSubmitOffer: () => void;
}

const CelestialFundingModal: React.FC<CelestialFundingModalProps> = ({
  request,
  onClose,
  onSubmitOffer,
}) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
        <div className="relative w-full max-w-4xl rounded-xl bg-white shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="text-xl font-semibold">{request.title}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            {/* Property Images */}
            <div className="space-y-4">
              <img 
                src={request.property.imageUrls[0]} 
                alt={request.title}
                className="w-full rounded-lg object-cover h-64"
              />
              <div className="grid grid-cols-3 gap-2">
                {request.property.imageUrls.slice(1).map((url: string, i: number) => (
                  <img 
                    key={i} 
                    src={url} 
                    alt={`${request.title} ${i + 2}`}
                    className="w-full rounded-lg object-cover h-20"
                  />
                ))}
              </div>
            </div>

            {/* Funding Details */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold">${request.amount.toLocaleString()}</h3>
                <p className="text-gray-600">
                  {typeof request.property.address === 'object' 
                    ? `${request.property.address.street}, ${request.property.address.city}, ${request.property.address.state}` 
                    : `${request.property.city}, ${request.property.state}`}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Term</p>
                  <p className="font-medium">{request.term} months</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Rate</p>
                  <p className="font-medium">{request.rate}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Purchase Price</p>
                  <p className="font-medium">${request.property.purchasePrice.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">ARV</p>
                  <p className="font-medium">${request.property.arv.toLocaleString()}</p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Borrower Profile</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Experience</p>
                    <p className="font-medium">{request.borrower.experience} years</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Projects Completed</p>
                    <p className="font-medium">{request.borrower.completedProjects}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Credit Score</p>
                    <p className="font-medium">{request.borrower.creditScore}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={onSubmitOffer}
                className="w-full bg-primary-600 text-white py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
              >
                Submit Funding Offer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CelestialFundingModal; 