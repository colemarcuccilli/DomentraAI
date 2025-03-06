import React, { useState, useEffect } from 'react';
import ProgressIndicator from './ProgressIndicator';
import BasicInfoStep from './steps/BasicInfoStep';
import InvestorProfileStep from './steps/InvestorProfileStep';
import PropertyDetailsStep from './steps/PropertyDetailsStep';
import MarketDetailsStep from './steps/MarketDetailsStep';
import ReviewSubmitStep from './steps/ReviewSubmitStep';

// Define the FundingRequestData interface to be used across all steps
export interface FundingRequestData {
  // Basic Info - Step 1
  propertyAddress: string;
  propertyCity: string;
  propertyState: string;
  propertyZip: string;
  propertyType: string;
  fundingType: string;
  amountRequested: number;
  projectedReturn: number;
  lengthOfFunding: number;
  exitStrategy: string;
  riskLevel: string;
  
  // Investor Profile - Step 2
  investorName: string;
  businessName: string;
  yearsInBusiness: number;
  dealsCompleted: number;
  investorRating: number;
  agreeToVerification: boolean;
  
  // Property Details - Step 3
  currentCondition: string;
  purchasePrice: number;
  arv: number; // After Repair Value
  rehabEstimate: number;
  potentialProfit: number;
  documents: File[];
  
  // Market Details - Step 4
  marketTrend: string;
  rentalDemand: string;
  avgHomePrice: number;
  medianIncome: number;
  jobGrowthRate: string;
  marketAnalysis: string;
  marketScore: number;
}

interface FundingRequestUploadProps {
  onComplete: (data: FundingRequestData) => void;
  onCancel: () => void;
}

/**
 * FundingRequestUpload - A breathtaking, mobile-first component
 * for managing the multi-step funding request upload process.
 */
const FundingRequestUpload: React.FC<FundingRequestUploadProps> = ({
  onComplete,
  onCancel
}) => {
  // Current step state
  const [currentStep, setCurrentStep] = useState(1);
  
  // Step validation state
  const [stepsValid, setStepsValid] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false
  });
  
  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form data state with default values
  const [formData, setFormData] = useState<FundingRequestData>({
    // Basic Info - Step 1
    propertyAddress: '',
    propertyCity: '',
    propertyState: '',
    propertyZip: '',
    propertyType: '',
    fundingType: '',
    amountRequested: 0,
    projectedReturn: 0,
    lengthOfFunding: 0,
    exitStrategy: '',
    riskLevel: '',
    
    // Investor Profile - Step 2
    investorName: '',
    businessName: '',
    yearsInBusiness: 0,
    dealsCompleted: 0,
    investorRating: 0,
    agreeToVerification: false,
    
    // Property Details - Step 3
    currentCondition: '',
    purchasePrice: 0,
    arv: 0,
    rehabEstimate: 0,
    potentialProfit: 0,
    documents: [],
    
    // Market Details - Step 4
    marketTrend: '',
    rentalDemand: '',
    avgHomePrice: 0,
    medianIncome: 0,
    jobGrowthRate: '',
    marketAnalysis: '',
    marketScore: 0
  });
  
  // Update form data
  const updateFormData = (data: Partial<FundingRequestData>) => {
    setFormData(prevData => ({
      ...prevData,
      ...data
    }));
  };
  
  // Update step validation
  const updateStepValidation = (step: number, isValid: boolean) => {
    setStepsValid(prev => ({
      ...prev,
      [step]: isValid
    }));
  };
  
  // Handle next step
  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
      
      // Scroll to top when changing steps
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  // Handle previous step
  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      
      // Scroll to top when changing steps
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  // Handle form submission
  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Call the onComplete callback with the form data
      onComplete(formData);
    } catch (error) {
      console.error('Error submitting funding request:', error);
      setIsSubmitting(false);
    }
  };
  
  // Render the current step
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicInfoStep
            formData={formData}
            updateFormData={updateFormData}
            updateStepValidation={(isValid) => updateStepValidation(1, isValid)}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <InvestorProfileStep
            formData={formData}
            updateFormData={updateFormData}
            updateStepValidation={(isValid) => updateStepValidation(2, isValid)}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        );
      case 3:
        return (
          <PropertyDetailsStep
            formData={formData}
            updateFormData={updateFormData}
            updateStepValidation={(isValid) => updateStepValidation(3, isValid)}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        );
      case 4:
        return (
          <MarketDetailsStep
            formData={formData}
            updateFormData={updateFormData}
            updateStepValidation={(isValid) => updateStepValidation(4, isValid)}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        );
      case 5:
        return (
          <ReviewSubmitStep
            formData={formData}
            updateFormData={updateFormData}
            onSubmit={handleSubmit}
            onPrev={handlePrev}
            isSubmitting={isSubmitting}
          />
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Create Funding Request
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Complete the form below to create a new funding request for your property.
        </p>
      </div>
      
      {/* Progress Indicator */}
      <div className="mb-8">
        <ProgressIndicator
          currentStep={currentStep}
          stepsValid={stepsValid}
        />
      </div>
      
      {/* Step Content */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        {renderStep()}
      </div>
      
      {/* Cancel Button */}
      <div className="mt-4 text-center">
        <button
          type="button"
          onClick={onCancel}
          className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200"
        >
          Cancel and return to dashboard
        </button>
      </div>
    </div>
  );
};

export default FundingRequestUpload; 