import React, { useState } from 'react';
import { TutorialItem } from '../../types/helpTypes';

interface TutorialCardProps {
  tutorial: TutorialItem;
}

/**
 * TutorialCard - A breathtaking tutorial card component
 * with elegant animations and intuitive design. Features
 * expandable steps, difficulty indicator, and time estimate.
 */
const TutorialCard: React.FC<TutorialCardProps> = ({ tutorial }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Toggle expanded state
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  
  // Get difficulty badge color
  const getDifficultyColor = (difficulty: string): string => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };
  
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <div className="p-4">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {tutorial.title}
          </h3>
          <div className="flex space-x-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${getDifficultyColor(tutorial.difficulty)} capitalize`}>
              {tutorial.difficulty}
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
              {tutorial.estimatedTime}
            </span>
          </div>
        </div>
        
        <p className="mt-2 text-base text-gray-700 dark:text-gray-300">
          {tutorial.description}
        </p>
        
        {/* Tags */}
        {tutorial.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {tutorial.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        {/* Expand/Collapse Button */}
        <button
          className="mt-4 inline-flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
          onClick={toggleExpanded}
          aria-expanded={isExpanded}
          aria-controls={`tutorial-steps-${tutorial.id}`}
        >
          {isExpanded ? 'Hide Steps' : 'Show Steps'}
          <svg
            className={`ml-1 h-5 w-5 transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      {/* Tutorial Steps */}
      <div
        id={`tutorial-steps-${tutorial.id}`}
        className={`transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[1000px]' : 'max-h-0'}`}
      >
        <div className="p-4 pt-0 border-t border-gray-200 dark:border-gray-700">
          <ol className="relative border-l border-gray-200 dark:border-gray-700 ml-3 space-y-6 pt-4">
            {tutorial.steps.map((step) => (
              <li key={step.stepNumber} className="ml-6">
                <span className="absolute flex items-center justify-center w-8 h-8 bg-primary-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-800 dark:bg-primary-900/30">
                  <span className="text-primary-600 dark:text-primary-400 font-medium text-sm">
                    {step.stepNumber}
                  </span>
                </span>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {step.title}
                </h4>
                <p className="mt-1 text-base text-gray-700 dark:text-gray-300">
                  {step.description}
                </p>
                {step.imageUrl && (
                  <div className="mt-3 rounded-md overflow-hidden">
                    <img
                      src={step.imageUrl}
                      alt={`Step ${step.stepNumber}: ${step.title}`}
                      className="w-full h-auto object-cover rounded-md"
                      onError={(e) => {
                        // Fallback if image fails to load
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
      
      {/* Video Tutorial Link */}
      {tutorial.videoUrl && (
        <div className="p-4 pt-0 border-t border-gray-200 dark:border-gray-700">
          <a
            href={tutorial.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Watch Video Tutorial
          </a>
        </div>
      )}
    </div>
  );
};

export default TutorialCard; 