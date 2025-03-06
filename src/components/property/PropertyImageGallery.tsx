import React from 'react';

interface PropertyImageGalleryProps {
  images: string[];
  activeIndex: number;
  onIndexChange: (index: number) => void;
  onToggleFullScreen: () => void;
  isFullScreen: boolean;
  isLoggedIn: boolean;
}

/**
 * PropertyImageGallery - A component that displays a gallery of property images
 * with navigation controls and fullscreen toggle. For logged-out users, it shows
 * limited functionality.
 */
const PropertyImageGallery: React.FC<PropertyImageGalleryProps> = ({
  images,
  activeIndex,
  onIndexChange,
  onToggleFullScreen,
  isFullScreen,
  isLoggedIn
}) => {
  // Handle navigation to previous image
  const handlePrevious = () => {
    onIndexChange((activeIndex - 1 + images.length) % images.length);
  };

  // Handle navigation to next image
  const handleNext = () => {
    onIndexChange((activeIndex + 1) % images.length);
  };

  return (
    <div className={`relative ${isFullScreen ? 'h-full' : ''}`}>
      {/* Main Image */}
      <div 
        className={`
          relative overflow-hidden bg-gray-200 dark:bg-gray-700
          ${isFullScreen ? 'h-full' : 'h-64 md:h-96'}
        `}
      >
        <img
          src={images[activeIndex]}
          alt="Property"
          className="w-full h-full object-cover"
        />
        
        {/* Fullscreen Toggle Button */}
        <button
          onClick={onToggleFullScreen}
          className="absolute top-4 right-4 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label={isFullScreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
          {isFullScreen ? (
            <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
            </svg>
          )}
        </button>
        
        {/* Login Overlay for Logged-out Users */}
        {!isLoggedIn && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center p-4">
              <p className="text-white font-medium mb-3">Log in to see all property images</p>
              <button
                className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200"
              >
                Log In
              </button>
            </div>
          </div>
        )}
        
        {/* Navigation Arrows - Only show if logged in and multiple images */}
        {isLoggedIn && images.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Previous image"
            >
              <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Next image"
            >
              <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
        
        {/* Image Counter */}
        {isLoggedIn && images.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-black bg-opacity-60 text-white text-sm px-2 py-1 rounded">
            {activeIndex + 1} / {images.length}
          </div>
        )}
      </div>
      
      {/* Thumbnail Strip - Only show if logged in and multiple images */}
      {isLoggedIn && images.length > 1 && !isFullScreen && (
        <div className="flex mt-2 space-x-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => onIndexChange(index)}
              className={`
                flex-shrink-0 w-16 h-16 rounded overflow-hidden border-2
                ${activeIndex === index ? 'border-blue-500' : 'border-transparent'}
              `}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyImageGallery; 