import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const HelpCenter: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedFAQs, setExpandedFAQs] = useState<string[]>([]);

  // FAQ data
  const faqs: FAQItem[] = [
    {
      question: 'How does the matchmaking algorithm work?',
      answer: 'Our AI-powered matchmaking algorithm analyzes your investment preferences, risk tolerance, and financial goals to find properties that match your criteria. It considers factors like location, property type, ROI potential, and market trends to suggest the most relevant opportunities for you.',
      category: 'matchmaking'
    },
    {
      question: 'How do I get verified as an investor?',
      answer: 'To get verified as an investor, navigate to your profile settings and select "Verification". You\'ll need to provide identification documents, proof of funds, and complete a brief questionnaire about your investment experience. Our team typically reviews verification requests within 1-2 business days.',
      category: 'account'
    },
    {
      question: 'What types of properties are available on the platform?',
      answer: 'Domentra offers a wide range of real estate investment opportunities including single-family homes, multi-family properties, commercial real estate, fix-and-flip projects, new construction, and land development. You can filter properties by type, location, price range, and potential ROI.',
      category: 'marketplace'
    },
    {
      question: 'How do I apply for funding?',
      answer: 'To apply for funding, navigate to the "Loan Management" section and select "New Funding Request". Complete the application form with details about your project, required funding amount, timeline, and collateral. You can also upload supporting documents like property appraisals, renovation plans, and financial projections.',
      category: 'funding'
    },
    {
      question: 'What are the fees for using Domentra?',
      answer: 'Domentra operates on a tiered subscription model. Basic accounts are free and allow browsing of properties and limited matchmaking. Premium accounts ($49/month) provide full access to matchmaking, detailed analytics, and priority support. Enterprise accounts (custom pricing) offer additional features for large-scale investors and lenders.',
      category: 'account'
    },
    {
      question: 'How secure is my data on the platform?',
      answer: 'We take data security seriously. Domentra uses bank-level encryption (256-bit SSL), two-factor authentication, and regular security audits to protect your information. We never share your personal data with third parties without your explicit consent, and we comply with all relevant data protection regulations.',
      category: 'account'
    },
    {
      question: 'Can I invest with partners or as part of a group?',
      answer: 'Yes, Domentra supports collaborative investing. You can create investment groups, invite partners, and manage shared investments through our platform. Each member can have customized access levels and visibility into the investment details based on your preferences.',
      category: 'marketplace'
    },
    {
      question: 'What lending options are available?',
      answer: 'Our platform connects you with various lending options including traditional mortgages, hard money loans, private lending, bridge financing, construction loans, and crowdfunding opportunities. Each listing specifies available funding types, interest rates, terms, and requirements.',
      category: 'funding'
    },
    {
      question: 'How do I contact property sellers or borrowers?',
      answer: 'When you\'re interested in a property or funding request, you can use our secure messaging system to contact the seller or borrower directly. Click the "Contact" button on any listing to initiate a conversation. All communications are logged and stored for your reference.',
      category: 'marketplace'
    },
    {
      question: 'What happens after I\'m matched with a property?',
      answer: 'After being matched with a property, you\'ll receive a detailed match report explaining why this property aligns with your criteria. You can then view comprehensive property details, schedule a virtual or in-person viewing, contact the seller, and initiate the purchase process if interested.',
      category: 'matchmaking'
    }
  ];

  // Categories for filtering
  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'account', name: 'Account & Billing' },
    { id: 'marketplace', name: 'Marketplace' },
    { id: 'matchmaking', name: 'Matchmaking' },
    { id: 'funding', name: 'Funding & Loans' }
  ];

  // Filter FAQs based on search query and active category
  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Toggle FAQ expansion
  const toggleFAQ = (question: string) => {
    setExpandedFAQs(prev => 
      prev.includes(question) 
        ? prev.filter(q => q !== question) 
        : [...prev, question]
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Help Center</h1>
        <p className="mt-4 text-xl text-gray-600">
          Find answers to common questions about using Domentra
        </p>
        
        {/* Search Bar */}
        <div className="mt-8 max-w-xl mx-auto">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for answers..."
              className="w-full py-3 px-4 pr-12 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Category Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${activeCategory === category.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              `}
            >
              {category.name}
            </button>
          ))}
        </nav>
      </div>
      
      {/* FAQs */}
      <div className="space-y-6">
        {filteredFAQs.length > 0 ? (
          filteredFAQs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white shadow overflow-hidden rounded-lg"
            >
              <button
                onClick={() => toggleFAQ(faq.question)}
                className="w-full px-6 py-4 flex justify-between items-center focus:outline-none"
              >
                <span className="text-lg font-medium text-gray-900 text-left">{faq.question}</span>
                <svg 
                  className={`h-5 w-5 text-gray-500 transform transition-transform duration-200 ${expandedFAQs.includes(faq.question) ? 'rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {expandedFAQs.includes(faq.question) && (
                <div className="px-6 py-4 border-t border-gray-200">
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No results found</h3>
            <p className="mt-1 text-gray-500">
              We couldn't find any FAQs matching your search. Try different keywords or browse by category.
            </p>
          </div>
        )}
      </div>
      
      {/* Contact Support */}
      <div className="mt-12 bg-primary-50 rounded-lg p-6 sm:p-8">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-primary-900">Still need help?</h2>
          <p className="mt-2 text-primary-700">
            Our support team is available to assist you with any questions or issues.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
            >
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email Support
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200"
            >
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              Live Chat
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter; 