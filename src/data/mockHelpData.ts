import { FaqItem, GlossaryItem, TutorialItem } from '../types/helpTypes';

/**
 * Mock FAQ data for the Help page
 */
export const mockFaqs: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'How do I find an investment property?',
    answer: 'You can find investment properties in the Marketplace section. Use the search bar at the top to filter by location, price, or property type. You can also use the advanced filters to narrow down your search based on specific criteria like ARV, risk score, or property condition.',
    category: 'marketplace',
    tags: ['search', 'properties', 'marketplace', 'filters']
  },
  {
    id: 'faq-2',
    question: 'What does ARV (After Repair Value) mean?',
    answer: 'ARV stands for After Repair Value, which is the estimated value of a property after all necessary repairs and renovations have been completed. This is an important metric for fix-and-flip investors as it helps determine the potential profit margin of a project.',
    category: 'terminology',
    tags: ['arv', 'valuation', 'fix-and-flip', 'investment']
  },
  {
    id: 'faq-3',
    question: 'How do I use the advanced search feature?',
    answer: 'To use the advanced search feature, click on the "Advanced Filters" button next to the search bar in the Marketplace. This will open a panel with additional filter options such as property type, bedrooms, bathrooms, square footage, ARV, risk score, and more. Select your desired criteria and click "Apply Filters" to see matching properties.',
    category: 'marketplace',
    tags: ['search', 'filters', 'advanced', 'marketplace']
  },
  {
    id: 'faq-4',
    question: 'How do I place a bid on a property?',
    answer: 'To place a bid on a property, navigate to the property details page by clicking on a property in the Marketplace. Review the property information, then click the "Bid Now" button. Enter your bid amount and any contingencies, then submit your bid. You will receive a notification when the seller responds to your bid.',
    category: 'bidding',
    tags: ['bid', 'offer', 'property', 'purchase']
  },
  {
    id: 'faq-5',
    question: 'What is the Risk Score?',
    answer: 'The Risk Score is a proprietary metric developed by Domentra that evaluates the potential risk of an investment property on a scale from 0 to 100. A lower score indicates lower risk, while a higher score indicates higher risk. The score is calculated based on factors such as location, property condition, market trends, and financial metrics.',
    category: 'terminology',
    tags: ['risk', 'score', 'investment', 'analysis']
  },
  {
    id: 'faq-6',
    question: 'How do I upload documents to the Document Center?',
    answer: 'To upload documents to the Document Center, navigate to the Document Center from the sidebar menu. Click the "Upload Document" button in the top right corner. Select the file from your computer, add relevant metadata such as document name, category, and tags, then click "Upload". Your document will be securely stored and accessible from the Document Center.',
    category: 'document-center',
    tags: ['documents', 'upload', 'storage', 'files']
  },
  {
    id: 'faq-7',
    question: 'How does the Matchmaking feature work?',
    answer: 'The Matchmaking feature uses AI to match investors with properties based on their investment preferences and criteria. To use this feature, first complete your investor profile with details about your investment strategy, budget, and preferred property types. Then, navigate to the Matchmaking section to see your personalized property matches. You can review each match and take action directly from the matchmaking interface.',
    category: 'matchmaking',
    tags: ['ai', 'matching', 'properties', 'investment']
  },
  {
    id: 'faq-8',
    question: 'How do I request funding for a deal?',
    answer: 'To request funding for a deal, navigate to the Loan Management section from the sidebar menu. Click on "Request Funding" and fill out the loan application form with details about the property, your investment strategy, and the amount of funding needed. Upload any required documents, then submit your application. Our team will review your request and respond within 24-48 hours.',
    category: 'funding',
    tags: ['loans', 'financing', 'funding', 'investment']
  },
  {
    id: 'faq-9',
    question: 'What types of properties are available on Domentra?',
    answer: 'Domentra offers a variety of investment property types, including single-family homes, multi-family properties, commercial properties, and land. Properties are categorized by investment strategy, such as Fix & Flip, Buy & Hold (Rental), New Construction, and Wholesale. You can filter by property type in the Marketplace to find the specific type of investment opportunity you\'re looking for.',
    category: 'marketplace',
    tags: ['properties', 'types', 'investment', 'categories']
  },
  {
    id: 'faq-10',
    question: 'How do I track my investments?',
    answer: 'You can track your investments in the Dashboard section. The Dashboard provides an overview of your active investments, pending bids, loan status, and key metrics. For more detailed information on a specific investment, click on the property to view its performance metrics, documents, and transaction history.',
    category: 'dashboard',
    tags: ['tracking', 'investments', 'performance', 'metrics']
  }
];

/**
 * Mock Glossary data for the Help page
 */
export const mockGlossary: GlossaryItem[] = [
  {
    id: 'glossary-1',
    term: 'ARV',
    definition: 'After Repair Value. The estimated value of a property after all necessary repairs and renovations have been completed. This is a key metric for fix-and-flip investors to determine potential profit.',
    relatedTerms: ['Fix & Flip', 'Renovation', 'Property Value'],
    category: 'valuation'
  },
  {
    id: 'glossary-2',
    term: 'Risk Score',
    definition: 'A proprietary metric developed by Domentra that evaluates the potential risk of an investment property on a scale from 0 to 100. Lower scores indicate lower risk, while higher scores indicate higher risk.',
    relatedTerms: ['Investment Risk', 'Due Diligence', 'Property Analysis'],
    category: 'analysis'
  },
  {
    id: 'glossary-3',
    term: 'Fix & Flip',
    definition: 'An investment strategy where a property is purchased, renovated, and then sold for profit, typically within a short timeframe (3-12 months).',
    relatedTerms: ['ARV', 'Renovation', 'ROI'],
    category: 'strategy'
  },
  {
    id: 'glossary-4',
    term: 'Buy & Hold',
    definition: 'An investment strategy where a property is purchased and held for an extended period, typically generating income through rental payments and potentially appreciating in value over time.',
    relatedTerms: ['Rental Property', 'Cash Flow', 'Appreciation'],
    category: 'strategy'
  },
  {
    id: 'glossary-5',
    term: 'Gap Funding',
    definition: 'Short-term financing used to bridge a funding gap between the purchase of a property and long-term financing or sale. Often used in fix-and-flip projects or when traditional financing is not immediately available.',
    relatedTerms: ['Bridge Loan', 'Short-term Financing', 'Hard Money'],
    category: 'financing'
  },
  {
    id: 'glossary-6',
    term: 'ROI',
    definition: 'Return on Investment. A performance measure used to evaluate the efficiency or profitability of an investment, calculated by dividing the net profit by the cost of the investment.',
    relatedTerms: ['Profit', 'Investment Performance', 'Cash-on-Cash Return'],
    category: 'finance'
  },
  {
    id: 'glossary-7',
    term: 'Cash-on-Cash Return',
    definition: 'A rate of return that calculates the cash income earned on the cash invested in a property. It measures the annual return on your investment based on the net cash flow and the amount of cash invested.',
    relatedTerms: ['ROI', 'Cash Flow', 'Investment Performance'],
    category: 'finance'
  },
  {
    id: 'glossary-8',
    term: 'Hard Money Loan',
    definition: 'A type of short-term loan secured by real estate, typically used by investors for quick financing of investment properties. These loans usually have higher interest rates but faster approval processes than traditional loans.',
    relatedTerms: ['Gap Funding', 'Private Lending', 'Bridge Loan'],
    category: 'financing'
  },
  {
    id: 'glossary-9',
    term: 'Wholesale',
    definition: 'A real estate investment strategy where an investor contracts a property with a seller and then assigns that contract to another buyer for a fee, without taking ownership of the property.',
    relatedTerms: ['Assignment', 'Contract', 'Investor'],
    category: 'strategy'
  },
  {
    id: 'glossary-10',
    term: 'Cap Rate',
    definition: 'Capitalization Rate. A metric used to evaluate real estate investments, calculated by dividing the net operating income by the current market value or purchase price of a property.',
    relatedTerms: ['NOI', 'Property Valuation', 'Investment Analysis'],
    category: 'finance'
  },
  {
    id: 'glossary-11',
    term: 'NOI',
    definition: 'Net Operating Income. The annual income generated by a property after deducting all operating expenses but before deducting taxes and financing costs.',
    relatedTerms: ['Cap Rate', 'Cash Flow', 'Operating Expenses'],
    category: 'finance'
  },
  {
    id: 'glossary-12',
    term: 'LTV',
    definition: 'Loan-to-Value ratio. A financial term used by lenders to express the ratio of a loan to the value of an asset purchased. It is calculated by dividing the loan amount by the appraised value of the property.',
    relatedTerms: ['Financing', 'Mortgage', 'Down Payment'],
    category: 'financing'
  }
];

/**
 * Mock Tutorial data for the Help page
 */
export const mockTutorials: TutorialItem[] = [
  {
    id: 'tutorial-1',
    title: 'How to Browse Properties in the Marketplace',
    description: 'Learn how to effectively browse and filter properties in the Domentra Marketplace to find your next investment opportunity.',
    steps: [
      {
        stepNumber: 1,
        title: 'Navigate to the Marketplace',
        description: 'Click on the "Marketplace" option in the sidebar menu to access the property listings.',
        imageUrl: '/images/tutorials/marketplace-nav.jpg'
      },
      {
        stepNumber: 2,
        title: 'Use the Search Bar',
        description: 'Enter keywords, addresses, or zip codes in the search bar at the top to find specific properties or locations.',
        imageUrl: '/images/tutorials/marketplace-search.jpg'
      },
      {
        stepNumber: 3,
        title: 'Apply Filters',
        description: 'Click on "Advanced Filters" to narrow down your search based on criteria such as property type, price range, bedrooms, bathrooms, and more.',
        imageUrl: '/images/tutorials/marketplace-filters.jpg'
      },
      {
        stepNumber: 4,
        title: 'Sort Results',
        description: 'Use the sort options to arrange properties by price, date listed, risk score, or potential ROI.',
        imageUrl: '/images/tutorials/marketplace-sort.jpg'
      },
      {
        stepNumber: 5,
        title: 'View Property Details',
        description: 'Click on a property card to view detailed information, including photos, description, financial metrics, and property history.',
        imageUrl: '/images/tutorials/property-details.jpg'
      }
    ],
    category: 'marketplace',
    difficulty: 'beginner',
    estimatedTime: '5 min',
    tags: ['marketplace', 'search', 'filters', 'properties']
  },
  {
    id: 'tutorial-2',
    title: 'How to Place a Bid on a Property',
    description: 'Learn the step-by-step process of placing a bid on a property through the Domentra platform.',
    steps: [
      {
        stepNumber: 1,
        title: 'Find a Property',
        description: 'Browse the Marketplace or Matchmaking section to find a property you\'re interested in.',
        imageUrl: '/images/tutorials/find-property.jpg'
      },
      {
        stepNumber: 2,
        title: 'Review Property Details',
        description: 'Click on the property to view detailed information, including photos, description, financial metrics, and property history.',
        imageUrl: '/images/tutorials/property-review.jpg'
      },
      {
        stepNumber: 3,
        title: 'Click "Bid Now"',
        description: 'After reviewing the property details, click the "Bid Now" button to start the bidding process.',
        imageUrl: '/images/tutorials/bid-button.jpg'
      },
      {
        stepNumber: 4,
        title: 'Enter Bid Details',
        description: 'Enter your bid amount, any contingencies, and your proposed closing timeline.',
        imageUrl: '/images/tutorials/bid-form.jpg'
      },
      {
        stepNumber: 5,
        title: 'Review and Submit',
        description: 'Review your bid details, then click "Submit Bid" to send your offer to the seller.',
        imageUrl: '/images/tutorials/bid-submit.jpg'
      },
      {
        stepNumber: 6,
        title: 'Track Bid Status',
        description: 'Monitor the status of your bid in the "My Bids" section of your Dashboard.',
        imageUrl: '/images/tutorials/bid-tracking.jpg'
      }
    ],
    category: 'bidding',
    difficulty: 'intermediate',
    estimatedTime: '10 min',
    tags: ['bidding', 'offers', 'properties', 'purchase']
  },
  {
    id: 'tutorial-3',
    title: 'How to Request Funding for a Deal',
    description: 'Learn how to request funding for your real estate investment through the Domentra platform.',
    steps: [
      {
        stepNumber: 1,
        title: 'Navigate to Loan Management',
        description: 'Click on the "Loan Management" option in the sidebar menu.',
        imageUrl: '/images/tutorials/loan-nav.jpg'
      },
      {
        stepNumber: 2,
        title: 'Click "Request Funding"',
        description: 'Click the "Request Funding" button to start the application process.',
        imageUrl: '/images/tutorials/funding-button.jpg'
      },
      {
        stepNumber: 3,
        title: 'Select Loan Type',
        description: 'Choose the type of loan you need (e.g., Fix & Flip, Rental, New Construction, Bridge).',
        imageUrl: '/images/tutorials/loan-type.jpg'
      },
      {
        stepNumber: 4,
        title: 'Enter Property Details',
        description: 'Provide information about the property, including address, purchase price, ARV, and renovation budget.',
        imageUrl: '/images/tutorials/property-details-form.jpg'
      },
      {
        stepNumber: 5,
        title: 'Upload Required Documents',
        description: 'Upload necessary documents such as purchase contract, renovation estimates, and proof of funds.',
        imageUrl: '/images/tutorials/document-upload.jpg'
      },
      {
        stepNumber: 6,
        title: 'Review and Submit',
        description: 'Review your application details, then click "Submit Application" to send your funding request.',
        imageUrl: '/images/tutorials/funding-submit.jpg'
      },
      {
        stepNumber: 7,
        title: 'Track Application Status',
        description: 'Monitor the status of your funding request in the "My Loans" section of the Loan Management page.',
        imageUrl: '/images/tutorials/loan-tracking.jpg'
      }
    ],
    category: 'funding',
    difficulty: 'advanced',
    estimatedTime: '15 min',
    tags: ['funding', 'loans', 'financing', 'application']
  },
  {
    id: 'tutorial-4',
    title: 'How to Upload Documents to the Document Center',
    description: 'Learn how to securely upload, organize, and manage your documents in the Domentra Document Center.',
    steps: [
      {
        stepNumber: 1,
        title: 'Navigate to Document Center',
        description: 'Click on the "Document Center" option in the sidebar menu.',
        imageUrl: '/images/tutorials/doc-center-nav.jpg'
      },
      {
        stepNumber: 2,
        title: 'Click "Upload Document"',
        description: 'Click the "Upload Document" button in the top right corner of the Document Center.',
        imageUrl: '/images/tutorials/upload-button.jpg'
      },
      {
        stepNumber: 3,
        title: 'Select File',
        description: 'Click "Browse" or drag and drop your file into the upload area.',
        imageUrl: '/images/tutorials/file-select.jpg'
      },
      {
        stepNumber: 4,
        title: 'Add Document Metadata',
        description: 'Enter document name, select category, add tags, and associate with a property if applicable.',
        imageUrl: '/images/tutorials/doc-metadata.jpg'
      },
      {
        stepNumber: 5,
        title: 'Click "Upload"',
        description: 'Review the document details, then click "Upload" to save the document to the Document Center.',
        imageUrl: '/images/tutorials/doc-upload.jpg'
      }
    ],
    category: 'document-center',
    difficulty: 'beginner',
    estimatedTime: '5 min',
    tags: ['documents', 'upload', 'storage', 'organization']
  },
  {
    id: 'tutorial-5',
    title: 'How to Use the Matchmaking Feature',
    description: 'Learn how to set up your investor profile and use the AI-powered Matchmaking feature to find properties that match your investment criteria.',
    steps: [
      {
        stepNumber: 1,
        title: 'Navigate to Matchmaking',
        description: 'Click on the "Matchmaking" option in the sidebar menu.',
        imageUrl: '/images/tutorials/matchmaking-nav.jpg'
      },
      {
        stepNumber: 2,
        title: 'Complete Your Investor Profile',
        description: 'If this is your first time, you\'ll need to complete your investor profile with details about your investment strategy, budget, and preferences.',
        imageUrl: '/images/tutorials/investor-profile.jpg'
      },
      {
        stepNumber: 3,
        title: 'Review Your Matches',
        description: 'Once your profile is complete, the AI will generate property matches based on your criteria. Review each match in the Matchmaking dashboard.',
        imageUrl: '/images/tutorials/matches-review.jpg'
      },
      {
        stepNumber: 4,
        title: 'Take Action on Matches',
        description: 'For each match, you can choose to "View Details," "Bid Now," "Save for Later," or "Not Interested."',
        imageUrl: '/images/tutorials/match-actions.jpg'
      },
      {
        stepNumber: 5,
        title: 'Refine Your Preferences',
        description: 'Click "Edit Preferences" to update your investor profile and refine your matching criteria for better results.',
        imageUrl: '/images/tutorials/edit-preferences.jpg'
      }
    ],
    category: 'matchmaking',
    difficulty: 'intermediate',
    estimatedTime: '10 min',
    tags: ['matchmaking', 'ai', 'properties', 'preferences']
  }
]; 