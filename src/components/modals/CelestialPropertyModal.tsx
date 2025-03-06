import React from 'react';
import { Property } from '../../types/property';

interface CelestialPropertyModalProps {
  property: Property;
  onClose: () => void;
  onSubmitOffer: () => void;
}

const CelestialPropertyModal: React.FC<CelestialPropertyModalProps> = ({
  property,
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
            <h2 className="text-xl font-semibold">{property.title}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            {/* Images */}
            <div className="space-y-4">
              <img 
                src={property.imageUrls[0]} 
                alt={property.title}
                className="w-full rounded-lg object-cover h-64"
              />
              <div className="grid grid-cols-3 gap-2">
                {property.imageUrls.slice(1).map((url, i) => (
                  <img 
                    key={i} 
                    src={url} 
                    alt={`${property.title} ${i + 2}`}
                    className="w-full rounded-lg object-cover h-20"
                  />
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold">${property.price.toLocaleString()}</h3>
                <p className="text-gray-600">
                  {typeof property.address === 'object' 
                    ? `${property.address.street}, ${property.address.city}, ${property.address.state}` 
                    : `${property.city}, ${property.state}`}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Bedrooms</p>
                  <p className="font-medium">{property.bedrooms}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Bathrooms</p>
                  <p className="font-medium">{property.bathrooms}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Square Feet</p>
                  <p className="font-medium">{property.squareFeet.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Year Built</p>
                  <p className="font-medium">{property.yearBuilt}</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Features</h4>
                <div className="flex flex-wrap gap-2">
                  {property.features.map((feature, i) => (
                    <span key={i} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={onSubmitOffer}
                className="w-full bg-primary-600 text-white py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
              >
                Write Offer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CelestialPropertyModal; 