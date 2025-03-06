import React from 'react';

interface ProgressIndicatorProps {
  currentStep: number;
  stepsValid: Record<number, boolean>;
  steps: string[];
}

/**
 * ProgressIndicator - A breathtaking, mobile-first component
 * for displaying step progress with elegant animations and visual feedback.
 */
const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  stepsValid,
  steps
}) => {
  // Get step status
  const getStepStatus = (stepId: number): 'complete' | 'current' | 'upcoming' => {
    if (stepId < currentStep) return 'complete';
    if (stepId === currentStep) return 'current';
    return 'upcoming';
  };
  
  return (
    <div className="px-4 py-4 sm:px-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <nav aria-label="Progress">
        <ol className="flex items-center justify-between md:space-x-8">
          {steps.map((stepLabel, index) => {
            const stepId = index + 1;
            const status = getStepStatus(stepId);
            const isValid = stepsValid[stepId];
            
            return (
              <li key={stepId} className="relative md:flex-1">
                <div className="flex items-center md:block">
                  <div className="flex-shrink-0">
                    <span
                      className={`
                        h-8 w-8 rounded-full flex items-center justify-center
                        ${status === 'complete' 
                          ? 'bg-primary-600 dark:bg-primary-500' 
                          : status === 'current'
                            ? 'border-2 border-primary-600 dark:border-primary-500'
                            : 'border-2 border-gray-300 dark:border-gray-600'
                        }
                        ${status === 'complete' || status === 'current' 
                          ? 'text-white dark:text-gray-900' 
                          : 'text-gray-500 dark:text-gray-400'
                        }
                        transition-all duration-200
                      `}
                    >
                      {status === 'complete' ? (
                        <svg className="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <span>{stepId}</span>
                      )}
                    </span>
                  </div>
                  
                  <div className="ml-3 md:ml-0 md:mt-2">
                    <span
                      className={`
                        text-xs font-medium
                        ${status === 'complete' 
                          ? 'text-primary-600 dark:text-primary-400' 
                          : status === 'current'
                            ? 'text-primary-600 dark:text-primary-400'
                            : 'text-gray-500 dark:text-gray-400'
                        }
                      `}
                    >
                      {stepLabel}
                    </span>
                    
                    {status === 'current' && !isValid && (
                      <span className="block text-xs text-red-500 dark:text-red-400 mt-0.5">
                        Required fields missing
                      </span>
                    )}
                    
                    {status === 'complete' && isValid && (
                      <span className="block text-xs text-green-500 dark:text-green-400 mt-0.5">
                        Complete
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Connector line (hidden on mobile) */}
                {stepId !== steps.length && (
                  <div className="hidden md:block absolute top-4 right-0 left-0 h-0.5 -translate-y-1/2">
                    <div
                      className={`
                        h-0.5 w-full
                        ${status === 'complete' 
                          ? 'bg-primary-600 dark:bg-primary-500' 
                          : 'bg-gray-300 dark:bg-gray-600'
                        }
                      `}
                    />
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
};

export default ProgressIndicator; 