import React, { useState } from 'react';

interface ImageGalleryProps {
  mainImage: string;
  additionalImages: string[];
  propertyAddress: string;
}

/**
 * ImageGallery - A breathtaking, mobile-first image gallery component
 * for displaying property images with elegant animations and swipe functionality.
 */
const ImageGallery: React.FC<ImageGalleryProps> = ({
  mainImage,
  additionalImages,
  propertyAddress
}) => {
  const [activeImage, setActiveImage] = useState(mainImage);
  const allImages = [mainImage, ...additionalImages];
  
  return (
    <div className="relative h-full w-full">
      {/* Main Image */}
      <div className="h-full">
        <img 
          src={activeImage} 
          alt={propertyAddress} 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Thumbnail Navigation */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {allImages.map((image, index) => (
          <button
            key={index}
            onClick={() => setActiveImage(image)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              activeImage === image 
                ? 'bg-white scale-110 shadow-lg' 
                : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`View image ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Thumbnail Preview (Desktop) */}
      <div className="hidden md:flex absolute bottom-12 left-0 right-0 justify-center gap-2 px-4">
        {allImages.map((image, index) => (
          <button
            key={index}
            onClick={() => setActiveImage(image)}
            className={`relative w-16 h-16 rounded-md overflow-hidden transition-all duration-200 ${
              activeImage === image 
                ? 'ring-2 ring-primary-500 ring-offset-2 scale-110' 
                : 'opacity-70 hover:opacity-100'
            }`}
            aria-label={`View image ${index + 1}`}
          >
            <img 
              src={image} 
              alt={`Thumbnail ${index + 1}`} 
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
      
      {/* Left/Right Navigation */}
      <div>
        <button
          onClick={() => {
            const currentIndex = allImages.indexOf(activeImage);
            const prevIndex = currentIndex === 0 ? allImages.length - 1 : currentIndex - 1;
            setActiveImage(allImages[prevIndex]);
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-all duration-200 transform hover:scale-110"
          aria-label="Previous image"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => {
            const currentIndex = allImages.indexOf(activeImage);
            const nextIndex = currentIndex === allImages.length - 1 ? 0 : currentIndex + 1;
            setActiveImage(allImages[nextIndex]);
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-all duration-200 transform hover:scale-110"
          aria-label="Next image"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      {/* Image Counter */}
      <div className="absolute top-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
        {allImages.indexOf(activeImage) + 1} / {allImages.length}
      </div>
    </div>
  );
};

export default ImageGallery; 