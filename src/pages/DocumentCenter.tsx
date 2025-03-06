import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import DocumentSidebar from '../components/DocumentSidebar';
import DocumentList from '../components/DocumentList';
import DocumentDetail from '../components/DocumentDetail';
import { Document } from '../types/documentTypes';
import DocumentUploadModal from '../components/DocumentUploadModal';
import DocumentShareModal from '../components/DocumentShareModal';

/**
 * Mock documents for demonstration
 */
const mockDocuments: Document[] = [
  {
    id: 'doc-1',
    name: 'Loan Agreement - 123 Maple Street',
    type: 'PDF',
    category: 'loan',
    uploadDate: '2023-11-15',
    size: '1.2 MB',
    propertyId: 'prop-1',
    propertyAddress: '123 Maple Street, San Francisco, CA 94110',
    loanId: 'loan-1',
    tags: ['agreement', 'loan', 'important'],
    sharedWith: [
      { id: 'user-2', name: 'Sarah Brown', email: 'sarah@example.com', role: 'admin' },
      { id: 'user-3', name: 'Michael Johnson', email: 'michael@example.com', role: 'viewer' }
    ]
  },
  {
    id: 'doc-2',
    name: 'Property Appraisal - 123 Maple Street',
    type: 'PDF',
    category: 'property',
    uploadDate: '2023-11-10',
    size: '3.5 MB',
    propertyId: 'prop-1',
    propertyAddress: '123 Maple Street, San Francisco, CA 94110',
    loanId: 'loan-1',
    tags: ['appraisal', 'property'],
    sharedWith: [
      { id: 'user-2', name: 'Sarah Brown', email: 'sarah@example.com', role: 'viewer' }
    ]
  },
  {
    id: 'doc-3',
    name: 'Insurance Certificate - 123 Maple Street',
    type: 'PDF',
    category: 'insurance',
    uploadDate: '2023-11-12',
    size: '0.8 MB',
    propertyId: 'prop-1',
    propertyAddress: '123 Maple Street, San Francisco, CA 94110',
    loanId: 'loan-1',
    tags: ['insurance', 'certificate'],
    sharedWith: []
  },
  {
    id: 'doc-4',
    name: 'Loan Agreement - 456 Urban Avenue',
    type: 'PDF',
    category: 'loan',
    uploadDate: '2023-09-20',
    size: '1.5 MB',
    propertyId: 'prop-2',
    propertyAddress: '456 Urban Avenue, Chicago, IL 60611',
    loanId: 'loan-2',
    tags: ['agreement', 'loan', 'important'],
    sharedWith: [
      { id: 'user-3', name: 'Michael Johnson', email: 'michael@example.com', role: 'viewer' }
    ]
  },
  {
    id: 'doc-5',
    name: 'Property Appraisal - 456 Urban Avenue',
    type: 'PDF',
    category: 'property',
    uploadDate: '2023-09-15',
    size: '4.2 MB',
    propertyId: 'prop-2',
    propertyAddress: '456 Urban Avenue, Chicago, IL 60611',
    loanId: 'loan-2',
    tags: ['appraisal', 'property'],
    sharedWith: []
  },
  {
    id: 'doc-6',
    name: 'Tax Returns 2022',
    type: 'PDF',
    category: 'tax',
    uploadDate: '2023-04-15',
    size: '2.7 MB',
    tags: ['tax', 'returns', '2022'],
    sharedWith: [
      { id: 'user-4', name: 'Jessica Lee', email: 'jessica@example.com', role: 'admin' }
    ]
  },
  {
    id: 'doc-7',
    name: 'Operating Agreement - LLC',
    type: 'DOCX',
    category: 'legal',
    uploadDate: '2023-01-10',
    size: '1.1 MB',
    tags: ['legal', 'agreement', 'LLC'],
    sharedWith: [
      { id: 'user-2', name: 'Sarah Brown', email: 'sarah@example.com', role: 'viewer' },
      { id: 'user-4', name: 'Jessica Lee', email: 'jessica@example.com', role: 'viewer' }
    ]
  },
  {
    id: 'doc-8',
    name: 'Purchase Contract - 789 Oak Drive',
    type: 'PDF',
    category: 'property',
    uploadDate: '2023-08-05',
    size: '3.1 MB',
    propertyId: 'prop-3',
    propertyAddress: '789 Oak Drive, Austin, TX 78704',
    tags: ['purchase', 'contract', 'property'],
    sharedWith: []
  },
  {
    id: 'doc-9',
    name: 'Property Photos - 101 Ocean View',
    type: 'ZIP',
    category: 'property',
    uploadDate: '2023-10-08',
    size: '15.2 MB',
    propertyId: 'prop-4',
    propertyAddress: '101 Ocean View, Miami, FL 33139',
    tags: ['photos', 'property'],
    sharedWith: []
  },
  {
    id: 'doc-10',
    name: 'Partnership Agreement',
    type: 'PDF',
    category: 'legal',
    uploadDate: '2023-02-22',
    size: '2.3 MB',
    tags: ['legal', 'partnership', 'agreement'],
    sharedWith: [
      { id: 'user-2', name: 'Sarah Brown', email: 'sarah@example.com', role: 'admin' },
      { id: 'user-3', name: 'Michael Johnson', email: 'michael@example.com', role: 'viewer' },
      { id: 'user-4', name: 'Jessica Lee', email: 'jessica@example.com', role: 'viewer' }
    ]
  }
];

/**
 * DocumentCenter - A breathtaking, mobile-first document management page
 * that empowers users to organize, view, share, and manage all real estate
 * investment documents. Features elegant animations, advanced filtering,
 * and secure sharing capabilities, styled to match the Domentra design system.
 */
const DocumentCenter: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'size'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [documentToShare, setDocumentToShare] = useState<Document | null>(null);
  
  const isMobile = useMediaQuery({ maxWidth: 768 });
  
  // Simulate loading documents
  useEffect(() => {
    const fetchDocuments = async () => {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setDocuments(mockDocuments);
      setIsLoading(false);
    };
    
    fetchDocuments();
  }, []);
  
  // Format date
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Get file type icon
  const getFileTypeIcon = (type: string): JSX.Element => {
    switch(type.toLowerCase()) {
      case 'pdf':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
          </svg>
        );
      case 'docx':
      case 'doc':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
          </svg>
        );
      case 'xlsx':
      case 'xls':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
          </svg>
        );
      case 'zip':
      case 'rar':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm4 2a1 1 0 011-1h.01a1 1 0 110 2H9a1 1 0 01-1-1zm3 0a1 1 0 011-1h.01a1 1 0 110 2H12a1 1 0 01-1-1zm1 3a1 1 0 00-1 1v.01a1 1 0 002 0V10a1 1 0 00-1-1zm-4 0a1 1 0 00-1 1v.01a1 1 0 002 0V10a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
          </svg>
        );
    }
  };
  
  // Get category icon
  const getCategoryIcon = (category: string): JSX.Element => {
    switch(category) {
      case 'loan':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
            <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
            <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
          </svg>
        );
      case 'property':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
        );
      case 'legal':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1zm-5 8.274l-.818 2.552c.25.112.526.174.818.174.292 0 .569-.062.818-.174L5 10.274zm10 0l-.818 2.552c.25.112.526.174.818.174.292 0 .569-.062.818-.174L15 10.274z" clipRule="evenodd" />
          </svg>
        );
      case 'tax':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm4.707 3.707a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L8.414 9H10a3 3 0 013 3v1a1 1 0 102 0v-1a5 5 0 00-5-5H8.414l1.293-1.293z" clipRule="evenodd" />
          </svg>
        );
      case 'insurance':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clipRule="evenodd" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
          </svg>
        );
    }
  };
  
  // Toggle sort direction
  const toggleSort = (field: 'date' | 'name' | 'size') => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('desc');
    }
  };
  
  // Handle document selection
  const handleDocumentSelect = (document: Document) => {
    setSelectedDocument(document);
  };
  
  // Handle document share
  const handleShareDocument = (document: Document) => {
    setDocumentToShare(document);
    setShowShareModal(true);
  };
  
  // Handle document upload
  const handleUpload = () => {
    setShowUploadModal(true);
  };
  
  // Handle upload submission
  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would upload the file
    alert('File upload functionality would be implemented here');
    setShowUploadModal(false);
  };
  
  // Handle share submission
  const handleShareSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would share the document
    alert(`Document "${documentToShare?.name}" would be shared here`);
    setShowShareModal(false);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header Section */}
      <section className="relative pt-8 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-700 to-secondary-700 opacity-90 z-0"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586281380349-632531db7ed4')] bg-cover bg-center mix-blend-overlay z-0"></div>
        
        <div className="container-fluid relative z-10">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 animate-fade-in">
              Document Center
            </h1>
            <p className="text-lg text-white opacity-90 mb-6 animate-fade-in">
              Securely manage and share all your real estate investment documents
            </p>
            
            {/* Search and Upload */}
            <div className="flex flex-col md:flex-row gap-4 mt-6">
              <div className="flex-grow">
                <div className="relative">
                  <input
                    type="text"
                    className="w-full bg-white dark:bg-gray-800 border-0 rounded-md pl-10 pr-4 py-3 shadow-lg focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Search documents by name, tag, or property..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <div className="absolute left-3 top-3 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>
              <button
                onClick={handleUpload}
                className="bg-white text-primary-700 hover:bg-gray-100 font-medium py-3 px-6 rounded-md shadow-lg transition-colors duration-200 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12" />
                </svg>
                Upload Document
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-8">
        <div className="container-fluid">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <DocumentSidebar 
              documents={documents}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              formatDate={formatDate}
              isLoading={isLoading}
            />
            
            {/* Document List and Details */}
            <div className="md:w-3/4">
              {selectedDocument ? (
                <DocumentDetail 
                  document={selectedDocument}
                  formatDate={formatDate}
                  getFileTypeIcon={getFileTypeIcon}
                  getCategoryIcon={getCategoryIcon}
                  handleShareDocument={handleShareDocument}
                  onClose={() => setSelectedDocument(null)}
                />
              ) : (
                <DocumentList 
                  documents={documents}
                  searchTerm={searchTerm}
                  selectedCategory={selectedCategory}
                  sortBy={sortBy}
                  sortDirection={sortDirection}
                  toggleSort={toggleSort}
                  handleDocumentSelect={handleDocumentSelect}
                  handleShareDocument={handleShareDocument}
                  formatDate={formatDate}
                  getFileTypeIcon={getFileTypeIcon}
                  isLoading={isLoading}
                />
              )}
            </div>
            </div>
          </div>
        </section>
      
      {/* Upload Modal */}
      <DocumentUploadModal 
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onSubmit={handleUploadSubmit}
      />
      
      {/* Share Modal */}
      <DocumentShareModal 
        isOpen={showShareModal}
        document={documentToShare}
        onClose={() => setShowShareModal(false)}
        onSubmit={handleShareSubmit}
      />
    </div>
  );
};

export default DocumentCenter;
