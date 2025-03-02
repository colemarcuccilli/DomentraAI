import React from 'react';
import { Link } from 'react-router-dom';

/**
 * ComingSoon - An elegant, mobile-first placeholder component
 * that informs users the Help Center is under development.
 * Features a visually appealing design with subtle animations
 * and clear messaging.
 */
const ComingSoon: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
      <div className="max-w-3xl mx-auto animate-fade-in">
        {/* Logo/Icon */}
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
            <svg 
              className="w-12 h-12 text-primary-600 dark:text-primary-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
          </div>
        </div>
        
        {/* Main heading */}
        <h1 className="text-4xl sm:text-5xl font-display font-bold text-gray-900 dark:text-white mb-4">
          Help Center Coming Soon
        </h1>
        
        {/* Subheading */}
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          We're working hard to build a comprehensive help center to support your journey with Domentra.
        </p>
        
        {/* Timeline */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 mb-8 max-w-md mx-auto">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">What to expect:</h2>
          <ul className="space-y-4 text-left">
            <li className="flex items-start">
              <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700 dark:text-gray-300">Comprehensive FAQs and tutorials</span>
            </li>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700 dark:text-gray-300">Step-by-step guides for all features</span>
            </li>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700 dark:text-gray-300">Glossary of real estate and funding terms</span>
            </li>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700 dark:text-gray-300">Direct support contact options</span>
            </li>
          </ul>
        </div>
        
        {/* CTA */}
        <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
          <Link 
            to="/" 
            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors duration-200"
          >
            Return to Home
          </Link>
          <a 
            href="mailto:support@domentra.com" 
            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 transition-colors duration-200"
          >
            Contact Support
          </a>
        </div>
        
        {/* Timeline */}
        <div className="mt-12 text-gray-600 dark:text-gray-400">
          <p>Expected launch: Q2 2024</p>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon; 