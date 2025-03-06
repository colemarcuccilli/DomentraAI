import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProgressIndicator from './requestUpload/ProgressIndicator';
import BasicPropertyInfoStep from './requestUpload/steps/BasicPropertyInfoStep';
import FundingDetailsStep from './requestUpload/steps/FundingDetailsStep';
import PhotosDescriptionStep from './requestUpload/steps/PhotosDescriptionStep';
import SuccessPage from './requestUpload/SuccessPage';
import WelcomeScreen from './requestUpload/WelcomeScreen';
import EditRequestForm from './EditRequestForm';
import { FundingRequest } from '../matchmaking/FundingRequestCard';

// Define the funding request data structure
export interface FundingRequestData {
  // Property Details (Step 1)
  propertyAddress?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  propertyType?: string;
  propertyCondition?: string;
  beds?: number;
  baths?: number;
  buildingSize?: number; // in sqft
  lotSize?: number; // in sqft
  currentOwnershipStatus?: string;
  structuralIntegrity?: string;
  
  // Funding Details (Step 2)
  fundingType?: string;
  amount?: number;
  lengthOfFunding?: number; // in days
  projectedReturn?: number;
  exitStrategy?: string;
  purchasePrice?: number;
  arv?: number; // After Repair Value
  arvMin?: number;
  arvMax?: number;
  rehabCost?: number;
  potentialLenderProfit?: number;
  potentialInvestorProfit?: number;
  
  // Photos & Description (Step 3)
  propertyPhotos?: File[];
  additionalImages?: File[];
  documents?: {
    purchaseContract?: File;
    rehabEstimates?: File;
    comparableSales?: File;
    inspectionReports?: File;
    proofOfFunds?: File;
    otherDocuments?: File[];
  };
  propertyDescription?: string;
  marketDescription?: string;
  neighborhoodDescription?: string;
  investmentHighlights?: string;
  riskFactors?: string;
}

/**
 * FundingRequestContainer - A breathtaking, mobile-first component
 * for managing the streamlined funding request flow with elegant animations.
 * The process has been optimized to collect all necessary information in just 3 steps.
 */
const FundingRequestContainer: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;
  
  // State to track the current step
  const [currentStep, setCurrentStep] = useState<'welcome' | 1 | 2 | 3 | 'success' | 'edit'>('welcome');
  
  // State to store the form data
  const [formData, setFormData] = useState<FundingRequestData>({});
  
  // State to track validation status of each step
  const [stepsValid, setStepsValid] = useState({
    1: false,
    2: false,
    3: false
  });
  
  // State to store the generated request ID
  const [requestId, setRequestId] = useState<string>('');
  
  // Check if we're in edit mode
  useEffect(() => {
    if (isEditMode) {
      setCurrentStep('edit');
    }
  }, [isEditMode]);
  
  // Update form data
  const updateFormData = (newData: Partial<FundingRequestData>) => {
    setFormData(prevData => ({ ...prevData, ...newData }));
  };
  
  // Update step validation status
  const updateStepValidation = (step: 1 | 2 | 3, isValid: boolean) => {
    setStepsValid(prev => ({ ...prev, [step]: isValid }));
  };
  
  // Handle start button click
  const handleStart = () => {
    setCurrentStep(1);
  };
  
  // Handle next button click
  const handleNext = () => {
    if (typeof currentStep === 'number' && currentStep < 3) {
      setCurrentStep((currentStep + 1) as 1 | 2 | 3);
    } else if (currentStep === 3) {
      handleSubmit();
    }
  };
  
  // Handle previous button click
  const handlePrev = () => {
    if (typeof currentStep === 'number' && currentStep > 1) {
      setCurrentStep((currentStep - 1) as 1 | 2 | 3);
    } else if (currentStep === 1) {
      setCurrentStep('welcome');
    }
  };
  
  // Handle form submission
  const handleSubmit = () => {
    // Generate a unique request ID (in a real app, this would come from the backend)
    const generatedId = `FR-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
    setRequestId(generatedId);
    
    // In a real application, you would make an API call to save the data
    console.log('Funding request submitted:', formData);
    
    // Show success page
    setCurrentStep('success');
  };
  
  // Handle edit form submission
  const handleEditSubmit = (data: FundingRequest) => {
    // In a real application, you would make an API call to update the data
    console.log('Funding request updated:', data);
    
    // Navigate back to my requests page
    navigate('/my-requests', { state: { message: 'Funding request updated successfully!' } });
  };
  
  // Handle cancellation
  const handleCancel = () => {
    if (isEditMode) {
      navigate('/my-requests');
    } else {
      navigate('/dashboard');
    }
  };
  
  // Handle view dashboard
  const handleViewDashboard = () => {
    navigate('/dashboard');
  };
  
  // Handle create new
  const handleCreateNew = () => {
    setCurrentStep('welcome');
    setFormData({});
    setStepsValid({
      1: false,
      2: false,
      3: false
    });
  };
  
  // Render the current step
  const renderStep = () => {
    // If in edit mode, render the edit form
    if (currentStep === 'edit') {
      return (
        <EditRequestForm
          onCancel={handleCancel}
          onSubmit={handleEditSubmit}
        />
      );
    }
    
    switch (currentStep) {
      case 'welcome':
        return <WelcomeScreen onStart={handleStart} />;
      case 1:
        return (
          <BasicPropertyInfoStep
            formData={formData}
            updateFormData={updateFormData}
            updateStepValidation={updateStepValidation}
            onNext={handleNext}
            onCancel={handleCancel}
          />
        );
      case 2:
        return (
          <FundingDetailsStep
            formData={formData}
            updateFormData={updateFormData}
            updateStepValidation={updateStepValidation}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        );
      case 3:
        return (
          <PhotosDescriptionStep
            formData={formData}
            updateFormData={updateFormData}
            updateStepValidation={updateStepValidation}
            onNext={handleSubmit}
            onPrev={handlePrev}
          />
        );
      case 'success':
        return <SuccessPage requestId={requestId} onViewDashboard={handleViewDashboard} onCreateNew={handleCreateNew} />;
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress indicator - only show for steps 1-3 */}
        {typeof currentStep === 'number' && (
          <div className="mb-8">
            <ProgressIndicator 
              currentStep={currentStep} 
              stepsValid={stepsValid}
              steps={[
                'Property Details',
                'Funding Details',
                'Photos & Description'
              ]}
            />
          </div>
        )}
        
        {/* Current step content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default FundingRequestContainer;