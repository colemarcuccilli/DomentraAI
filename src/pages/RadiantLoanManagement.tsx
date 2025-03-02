import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useParams, useNavigate } from 'react-router-dom';

// Type definitions
interface Lender {
  name: string;
  contactEmail: string;
  contactPhone: string;
  loanOfficer: string;
}

interface Document {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  size: string;
}

interface Payment {
  id: string;
  date: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed' | 'upcoming';
  method: string;
}

interface Loan {
  id: string;
  propertyAddress: string;
  propertyType: string;
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  monthlyPayment: number;
  originationDate: string;
  maturityDate: string;
  nextPaymentDate: string;
  nextPaymentAmount: number;
  totalPaid: number;
  remainingBalance: number;
  status: 'active' | 'paid' | 'defaulted' | 'pending';
  lender: Lender;
  documents: Document[];
  paymentHistory: Payment[];
}

/**
 * Mock loan data for demonstration
 */
const mockLoans: Loan[] = [
  {
    id: 'loan-1',
    propertyAddress: '123 Maple Street, San Francisco, CA 94110',
    propertyType: 'Single Family',
    loanAmount: 850000,
    interestRate: 7.25,
    loanTerm: 12,
    monthlyPayment: 5156.25,
    originationDate: '2023-11-15',
    maturityDate: '2024-11-15',
    nextPaymentDate: '2023-12-15',
    nextPaymentAmount: 5156.25,
    totalPaid: 10312.50,
    remainingBalance: 839687.50,
    status: 'active',
    lender: {
      name: 'Meridian Capital',
      contactEmail: 'support@meridiancapital.com',
      contactPhone: '(415) 555-7890',
      loanOfficer: 'David Chen'
    },
    documents: [
      { id: 'doc-1', name: 'Loan Agreement', type: 'PDF', uploadDate: '2023-11-15', size: '1.2 MB' },
      { id: 'doc-2', name: 'Property Appraisal', type: 'PDF', uploadDate: '2023-11-10', size: '3.5 MB' },
      { id: 'doc-3', name: 'Insurance Certificate', type: 'PDF', uploadDate: '2023-11-12', size: '0.8 MB' }
    ],
    paymentHistory: [
      { id: 'payment-1', date: '2023-12-15', amount: 5156.25, status: 'completed', method: 'ACH' },
      { id: 'payment-2', date: '2024-01-15', amount: 5156.25, status: 'completed', method: 'ACH' }
    ]
  },
  {
    id: 'loan-2',
    propertyAddress: '456 Urban Avenue, Chicago, IL 60611',
    propertyType: 'Multi-Family',
    loanAmount: 1250000,
    interestRate: 6.75,
    loanTerm: 24,
    monthlyPayment: 7031.25,
    originationDate: '2023-09-20',
    maturityDate: '2025-09-20',
    nextPaymentDate: '2023-12-20',
    nextPaymentAmount: 7031.25,
    totalPaid: 21093.75,
    remainingBalance: 1228906.25,
    status: 'active',
    lender: {
      name: 'Apex Funding',
      contactEmail: 'loans@apexfunding.com',
      contactPhone: '(312) 555-4321',
      loanOfficer: 'Sarah Williams'
    },
    documents: [
      { id: 'doc-4', name: 'Loan Agreement', type: 'PDF', uploadDate: '2023-09-20', size: '1.5 MB' },
      { id: 'doc-5', name: 'Property Appraisal', type: 'PDF', uploadDate: '2023-09-15', size: '4.2 MB' },
      { id: 'doc-6', name: 'Insurance Certificate', type: 'PDF', uploadDate: '2023-09-18', size: '0.9 MB' }
    ],
    paymentHistory: [
      { id: 'payment-3', date: '2023-10-20', amount: 7031.25, status: 'completed', method: 'ACH' },
      { id: 'payment-4', date: '2023-11-20', amount: 7031.25, status: 'completed', method: 'ACH' }
    ]
  },
  {
    id: 'loan-3',
    propertyAddress: '789 Oak Drive, Austin, TX 78704',
    propertyType: 'Commercial',
    loanAmount: 2000000,
    interestRate: 6.5,
    loanTerm: 36,
    monthlyPayment: 10833.33,
    originationDate: '2023-08-05',
    maturityDate: '2026-08-05',
    nextPaymentDate: '2023-12-05',
    nextPaymentAmount: 10833.33,
    totalPaid: 43333.32,
    remainingBalance: 1956666.68,
    status: 'active',
    lender: {
      name: 'Sunbelt Capital',
      contactEmail: 'info@sunbeltcapital.com',
      contactPhone: '(512) 555-6789',
      loanOfficer: 'Michael Johnson'
    },
    documents: [
      { id: 'doc-7', name: 'Loan Agreement', type: 'PDF', uploadDate: '2023-08-05', size: '1.8 MB' },
      { id: 'doc-8', name: 'Property Appraisal', type: 'PDF', uploadDate: '2023-07-30', size: '5.1 MB' },
      { id: 'doc-9', name: 'Insurance Certificate', type: 'PDF', uploadDate: '2023-08-02', size: '1.0 MB' }
    ],
    paymentHistory: [
      { id: 'payment-5', date: '2023-09-05', amount: 10833.33, status: 'completed', method: 'ACH' },
      { id: 'payment-6', date: '2023-10-05', amount: 10833.33, status: 'completed', method: 'ACH' },
      { id: 'payment-7', date: '2023-11-05', amount: 10833.33, status: 'completed', method: 'ACH' },
      { id: 'payment-8', date: '2023-12-05', amount: 10833.33, status: 'upcoming', method: 'ACH' }
    ]
  },
  {
    id: 'loan-4',
    propertyAddress: '101 Ocean View, Miami, FL 33139',
    propertyType: 'Luxury',
    loanAmount: 3500000,
    interestRate: 6.25,
    loanTerm: 24,
    monthlyPayment: 18229.17,
    originationDate: '2023-10-10',
    maturityDate: '2025-10-10',
    nextPaymentDate: '2023-12-10',
    nextPaymentAmount: 18229.17,
    totalPaid: 36458.34,
    remainingBalance: 3463541.66,
    status: 'active',
    lender: {
      name: 'Coastal Investments',
      contactEmail: 'support@coastalinvestments.com',
      contactPhone: '(305) 555-2345',
      loanOfficer: 'Rebecca Torres'
    },
    documents: [
      { id: 'doc-10', name: 'Loan Agreement', type: 'PDF', uploadDate: '2023-10-10', size: '2.0 MB' },
      { id: 'doc-11', name: 'Property Appraisal', type: 'PDF', uploadDate: '2023-10-05', size: '6.3 MB' },
      { id: 'doc-12', name: 'Insurance Certificate', type: 'PDF', uploadDate: '2023-10-08', size: '1.2 MB' }
    ],
    paymentHistory: [
      { id: 'payment-9', date: '2023-11-10', amount: 18229.17, status: 'completed', method: 'ACH' }
    ]
  }
];

/**
 * RadiantLoanManagement - A breathtaking, mobile-first loan management page
 * that empowers users to track, manage, and analyze their real estate loans.
 * Features elegant animations, comprehensive loan details, payment history,
 * and upcoming payment scheduling, styled to match the Domentra design system.
 */
const RadiantLoanManagement: React.FC = () => {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<string>('ACH');
  const [paymentDate, setPaymentDate] = useState<string>('');
  
  // Get the tab parameter from the URL
  const { tab = 'overview' } = useParams<{ tab?: string }>();
  const navigate = useNavigate();
  
  // Set the active tab based on the URL parameter
  const activeTab = (tab === 'overview' || tab === 'documents' || tab === 'payments') 
    ? tab 
    : 'overview';
  
  // Update URL when tab changes
  const setActiveTab = (newTab: 'overview' | 'documents' | 'payments') => {
    navigate(`/loan-management/${newTab}`);
  };
  
  const isMobile = useMediaQuery({ maxWidth: 768 });
  
  // Simulate loading loans
  useEffect(() => {
    const fetchLoans = async () => {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setLoans(mockLoans);
      setIsLoading(false);
      
      // Select the first loan by default
      if (mockLoans.length > 0) {
        setSelectedLoan(mockLoans[0]);
        
        // Set payment defaults based on the selected loan
        setPaymentAmount(mockLoans[0].nextPaymentAmount);
        setPaymentDate(mockLoans[0].nextPaymentDate);
      }
    };
    
    fetchLoans();
  }, []);
  
  // Format currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };
  
  // Format date
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Calculate days until next payment
  const getDaysUntilNextPayment = (dateString: string): number => {
    const today = new Date();
    const nextPayment = new Date(dateString);
    const diffTime = nextPayment.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };
  
  // Handle making a payment
  const handleMakePayment = () => {
    setShowPaymentModal(true);
  };
  
  // Handle submitting a payment
  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would be an API call to process the payment
    alert(`Payment of ${formatCurrency(paymentAmount)} scheduled for ${formatDate(paymentDate)} via ${paymentMethod}`);
    
    // Close the modal
    setShowPaymentModal(false);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header Section */}
      <section className="relative pt-8 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-700 to-secondary-700 opacity-90 z-0"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1460317442991-0ec209397118')] bg-cover bg-center mix-blend-overlay z-0"></div>
        
        <div className="container-fluid relative z-10">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 animate-fade-in">
              Loan Management Dashboard
            </h1>
            <p className="text-lg text-white opacity-90 mb-6 animate-fade-in">
              Track, manage, and optimize your real estate loans in one place
            </p>
            
            {/* Summary Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 animate-fade-in">
                <p className="text-sm text-white/70">Active Loans</p>
                <p className="text-2xl font-bold text-white">{loans.length}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 animate-fade-in">
                <p className="text-sm text-white/70">Total Balance</p>
                <p className="text-2xl font-bold text-white">
                  {isLoading ? '...' : formatCurrency(loans.reduce((sum, loan) => sum + loan.remainingBalance, 0))}
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 animate-fade-in">
                <p className="text-sm text-white/70">Next Payment</p>
                <p className="text-2xl font-bold text-white">
                  {selectedLoan ? formatDate(selectedLoan.nextPaymentDate) : '...'}
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 animate-fade-in">
                <p className="text-sm text-white/70">Total Paid YTD</p>
                <p className="text-2xl font-bold text-white">
                  {isLoading ? '...' : formatCurrency(loans.reduce((sum, loan) => sum + loan.totalPaid, 0))}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-8">
        <div className="container-fluid">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Loan Selection Sidebar */}
            <div className="md:w-1/3 lg:w-1/4">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Your Loans</h2>
                
                {isLoading ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, index) => (
                      <div key={index} className="animate-pulse">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {loans.map((loan) => (
                      <div 
                        key={loan.id}
                        onClick={() => {
                          setSelectedLoan(loan);
                          setPaymentAmount(loan.nextPaymentAmount);
                          setPaymentDate(loan.nextPaymentDate);
                        }}
                        className={`p-3 rounded-md cursor-pointer transition-colors duration-200 ${
                          selectedLoan?.id === loan.id 
                            ? 'bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-500' 
                            : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                      >
                        <p className="font-medium text-gray-900 dark:text-white">
                          {loan.propertyAddress.split(',')[0]}
                        </p>
                        <div className="flex justify-between mt-1">
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {formatCurrency(loan.loanAmount)}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {loan.propertyType}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {selectedLoan && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                    Next Payment
                  </h3>
                  <div className="mb-4">
                    <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                      {formatCurrency(selectedLoan.nextPaymentAmount)}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Due on {formatDate(selectedLoan.nextPaymentDate)}
                    </p>
                    <p className={`text-sm font-medium mt-1 ${
                      getDaysUntilNextPayment(selectedLoan.nextPaymentDate) <= 3 
                        ? 'text-red-600 dark:text-red-400' 
                        : 'text-gray-600 dark:text-gray-400'
                    }`}>
                      {getDaysUntilNextPayment(selectedLoan.nextPaymentDate) <= 0 
                        ? 'Due today!' 
                        : `${getDaysUntilNextPayment(selectedLoan.nextPaymentDate)} days remaining`}
                    </p>
                  </div>
                  <button
                    onClick={handleMakePayment}
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
                  >
                    Make a Payment
                  </button>
                </div>
              )}
            </div>
            
            {/* Loan Details */}
            <div className="md:w-2/3 lg:w-3/4">
              {isLoading ? (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-pulse">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-6"></div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {[...Array(4)].map((_, index) => (
                      <div key={index}>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-1"></div>
                        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                </div>
              ) : selectedLoan ? (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                  {/* Loan Header */}
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {selectedLoan.propertyAddress.split(',')[0]}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      {selectedLoan.propertyAddress}
                    </p>
                    
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-800 dark:text-primary-200">
                        {selectedLoan.propertyType}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200">
                        {selectedLoan.status === 'active' ? 'Active' : selectedLoan.status}
                      </span>
                    </div>
                  </div>
                  
                  {/* Loan Overview */}
                  <div className="p-6">
                    {/* Tab Navigation */}
                    <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
                      <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        <button
                          onClick={() => setActiveTab('overview')}
                          className={`py-4 px-1 border-b-2 font-medium text-sm ${
                            activeTab === 'overview'
                              ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                          }`}
                        >
                          Overview
                        </button>
                        <button
                          onClick={() => setActiveTab('payments')}
                          className={`py-4 px-1 border-b-2 font-medium text-sm ${
                            activeTab === 'payments'
                              ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                          }`}
                        >
                          Payment History
                        </button>
                        <button
                          onClick={() => setActiveTab('documents')}
                          className={`py-4 px-1 border-b-2 font-medium text-sm ${
                            activeTab === 'documents'
                              ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                          }`}
                        >
                          Documents
                        </button>
                      </nav>
                    </div>
                    
                    {/* Tab Content */}
                    {activeTab === 'overview' && (
                      <div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Loan Amount</p>
                            <p className="text-lg font-bold text-gray-900 dark:text-white">
                              {formatCurrency(selectedLoan.loanAmount)}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Interest Rate</p>
                            <p className="text-lg font-bold text-gray-900 dark:text-white">
                              {selectedLoan.interestRate}%
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Term</p>
                            <p className="text-lg font-bold text-gray-900 dark:text-white">
                              {selectedLoan.loanTerm} months
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Monthly Payment</p>
                            <p className="text-lg font-bold text-gray-900 dark:text-white">
                              {formatCurrency(selectedLoan.monthlyPayment)}
                            </p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Origination Date</p>
                            <p className="text-base font-medium text-gray-900 dark:text-white">
                              {formatDate(selectedLoan.originationDate)}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Maturity Date</p>
                            <p className="text-base font-medium text-gray-900 dark:text-white">
                              {formatDate(selectedLoan.maturityDate)}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Total Paid</p>
                            <p className="text-base font-medium text-gray-900 dark:text-white">
                              {formatCurrency(selectedLoan.totalPaid)}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Remaining Balance</p>
                            <p className="text-base font-medium text-gray-900 dark:text-white">
                              {formatCurrency(selectedLoan.remainingBalance)}
                            </p>
                          </div>
                        </div>
                        
                        {/* Loan Progress */}
                        <div className="mb-8">
                          <div className="flex justify-between mb-2">
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Loan Progress</p>
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              {Math.round((selectedLoan.totalPaid / selectedLoan.loanAmount) * 100)}%
                            </p>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                            <div 
                              className="bg-primary-600 h-2.5 rounded-full" 
                              style={{ width: `${Math.round((selectedLoan.totalPaid / selectedLoan.loanAmount) * 100)}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        {/* Lender Information */}
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                            Lender Information
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Lender</p>
                              <p className="text-base font-medium text-gray-900 dark:text-white">
                                {selectedLoan.lender.name}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Loan Officer</p>
                              <p className="text-base font-medium text-gray-900 dark:text-white">
                                {selectedLoan.lender.loanOfficer}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Contact Email</p>
                              <p className="text-base font-medium text-primary-600 dark:text-primary-400">
                                <a href={`mailto:${selectedLoan.lender.contactEmail}`}>
                                  {selectedLoan.lender.contactEmail}
                                </a>
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Contact Phone</p>
                              <p className="text-base font-medium text-primary-600 dark:text-primary-400">
                                <a href={`tel:${selectedLoan.lender.contactPhone}`}>
                                  {selectedLoan.lender.contactPhone}
                                </a>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {activeTab === 'payments' && (
                      <div>
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                            Payment History
                          </h3>
                          <button
                            onClick={handleMakePayment}
                            className="bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium py-2 px-4 rounded-md transition-colors duration-200"
                          >
                            Make a Payment
                          </button>
                        </div>
                        
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                              <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                  Date
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                  Amount
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                  Method
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                  Status
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                              {selectedLoan.paymentHistory.map((payment) => (
                                <tr key={payment.id}>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                    {formatDate(payment.date)}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                    {formatCurrency(payment.amount)}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                    {payment.method}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                      ${payment.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' : 
                                        payment.status === 'failed' ? 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100' : 
                                        payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100' :
                                        'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100'}`}>
                                      {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        
                        {selectedLoan.paymentHistory.length === 0 && (
                          <div className="text-center py-8">
                            <p className="text-gray-500 dark:text-gray-400">No payment history available</p>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {activeTab === 'documents' && (
                      <div>
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                            Documents
                          </h3>
                          <button
                            onClick={() => {
                              // In a real app, this would open a document upload modal
                              alert('Document upload functionality would open here');
                            }}
                            className="bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium py-2 px-4 rounded-md transition-colors duration-200"
                          >
                            Upload Document
                          </button>
                        </div>  
                        
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                              <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                  Name
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                  Type
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                  Date
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                  Size
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                  Actions
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                              {selectedLoan.documents.map((document) => (
                                <tr key={document.id}>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                    {document.name}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                    {document.type}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                    {formatDate(document.uploadDate)}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                    {document.size}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                    <button className="text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 mr-3">
                                      View
                                    </button>
                                    <button className="text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300">
                                      Download
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        
                        {selectedLoan.documents.length === 0 && (
                          <div className="text-center py-8">
                            <p className="text-gray-500 dark:text-gray-400">No documents available</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
                  <p className="text-gray-500 dark:text-gray-400">Select a loan to view details</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Make a Payment
            </h3>
            
            <form onSubmit={handleSubmitPayment}>
              <div className="mb-4">
                <label htmlFor="paymentAmount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Payment Amount
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    id="paymentAmount"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(Number(e.target.value))}
                    className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="paymentDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Payment Date
                </label>
                <input
                  type="date"
                  id="paymentDate"
                  value={paymentDate}
                  onChange={(e) => setPaymentDate(e.target.value)}
                  className="block w-full rounded-md border-gray-300 focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Payment Method
                </label>
                <select
                  id="paymentMethod"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="block w-full rounded-md border-gray-300 focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                >
                  <option value="ACH">ACH (Direct Deposit)</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Wire Transfer">Wire Transfer</option>
                  <option value="Check">Check</option>
                </select>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowPaymentModal(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md"
                >
                  Submit Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RadiantLoanManagement;
