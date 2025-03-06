import React from 'react';
import { FundingRequest } from '../FundingRequestCard';
import FundingDetailsSection from './sections/FundingDetailsSection';
import ReturnsSection from './sections/ReturnsSection';
import RiskAssessmentSection from './sections/RiskAssessmentSection';
import InvestorInfoSection from './sections/InvestorInfoSection';

interface InvestmentDetailsProps {
  request: FundingRequest;
}

/**
 * InvestmentDetails - A breathtaking, mobile-first component
 * for displaying comprehensive investment details with elegant typography and layout.
 * This component combines information from the old modal with the new styling approach.
 */
const InvestmentDetails: React.FC<InvestmentDetailsProps> = ({ request }) => {
  return (
    <div className="space-y-6">
      <FundingDetailsSection request={request} />
      <ReturnsSection request={request} />
      <RiskAssessmentSection request={request} />
      <InvestorInfoSection request={request} />
    </div>
  );
};

export default InvestmentDetails; 