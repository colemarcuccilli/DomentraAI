import React, { useState } from 'react';

interface PropertyImageGalleryProps {
  images: string[];
  activeIndex: number;
  onIndexChange: (index: number) => void;
  onToggleFullScreen: () => void;
  isFullScreen: boolean;
  isLoggedIn: boolean;
}

/**
 * PropertyImageGallery - A breathtaking image gallery component for property listings
 * that allows users to navigate through property images with a carousel interface.
 */
const PropertyImageGallery: React.FC<PropertyImageGalleryProps> = ({
  images,
  activeIndex,
  onIndexChange,
  onToggleFullScreen,
  isFullScreen,
  isLoggedIn
}) => {
  const [isHovering, setIsHovering] = useState(false);

  // If not logged in, only show the first image
  const displayImages = isLoggedIn ? images : [images[0]];

  const handlePrevious = () => {
    onIndexChange(activeIndex === 0 ? displayImages.length - 1 : activeIndex - 1);
  };

  const handleNext = () => {
    onIndexChange(activeIndex === displayImages.length - 1 ? 0 : activeIndex + 1);
  };

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Main Image */}
      <div className="relative bg-gray-200 dark:bg-gray-800">
        <div className={`relative ${isFullScreen ? 'h-screen' : 'h-64 sm:h-96'}`}>
          <img
            src={displayImages[activeIndex]}
            alt={`Property image ${activeIndex + 1}`}
            className="w-full h-full object-cover"
          />
          
          {/* Image Counter */}
          <div className="absolute bottom-4 right-4 bg-black bg-opacity-60 text-white text-sm px-2 py-1 rounded">
            {activeIndex + 1} / {displayImages.length}
          </div>

          {/* Fullscreen Toggle */}
          <button
            onClick={onToggleFullScreen}
            className="absolute top-4 right-4 bg-black bg-opacity-60 text-white p-2 rounded-full hover:bg-opacity-80 focus:outline-none"
          >
            {isFullScreen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
              </svg>
            )}
          </button>

          {/* Not Logged In Overlay */}
          {!isLoggedIn && displayImages.length > 1 && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="text-center text-white p-4">
                <svg className="w-12 h-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <p className="text-lg font-semibold">Log in to view all {images.length} photos</p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Arrows - Only show if logged in and multiple images */}
        {isLoggedIn && displayImages.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className={`absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-60 text-white p-2 rounded-full hover:bg-opacity-80 focus:outline-none ${
                isHovering || isFullScreen ? 'opacity-100' : 'opacity-0'
              } transition-opacity duration-300`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className={`absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-60 text-white p-2 rounded-full hover:bg-opacity-80 focus:outline-none ${
                isHovering || isFullScreen ? 'opacity-100' : 'opacity-0'
              } transition-opacity duration-300`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Thumbnail Strip - Only show if logged in and multiple images */}
      {isLoggedIn && displayImages.length > 1 && !isFullScreen && (
        <div className="flex overflow-x-auto py-2 px-1 space-x-2 bg-gray-100 dark:bg-gray-800">
          {displayImages.map((image, index) => (
            <button
              key={index}
              onClick={() => onIndexChange(index)}
              className={`flex-shrink-0 w-16 h-16 rounded overflow-hidden focus:outline-none ${
                index === activeIndex ? 'ring-2 ring-primary-500' : 'opacity-70 hover:opacity-100'
              }`}
            >
              <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyImageGallery; 