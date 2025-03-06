import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { FaCheckCircle, FaTimesCircle, FaCommentDots, FaHandshake, FaExchangeAlt } from 'react-icons/fa';

// Define the message types for our negotiation
export type MessageRole = 'investor' | 'lender';
export type MessageStatus = 'pending' | 'accepted' | 'rejected' | 'countered';

export interface NegotiationMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  status: MessageStatus;
  offerDetails?: {
    amount: number;
    interestRate: number;
    term: number;
    additionalTerms?: string;
  };
  attachments?: Array<{
    id: string;
    name: string;
    url: string;
    type: string;
  }>;
}

export interface NegotiationTimelineProps {
  negotiationId: string;
  investorName: string;
  investorAvatar?: string;
  lenderName: string;
  lenderAvatar?: string;
  propertyAddress: string;
  propertyImage?: string;
  messages: NegotiationMessage[];
  onSendMessage: (message: Omit<NegotiationMessage, 'id' | 'timestamp' | 'status'>) => Promise<void>;
  onAcceptOffer: (messageId: string) => Promise<void>;
  onRejectOffer: (messageId: string) => Promise<void>;
  onCounterOffer: (messageId: string, counterOffer: NegotiationMessage['offerDetails']) => Promise<void>;
  currentUserRole: MessageRole;
}

/**
 * NegotiationTimeline - A breathtaking, mobile-first timeline component
 * that visualizes the back-and-forth negotiation between an investor and lender.
 * The timeline grows vertically with messages alternating between left (investor) and right (lender).
 */
const NegotiationTimeline: React.FC<NegotiationTimelineProps> = ({
  negotiationId,
  investorName,
  investorAvatar,
  lenderName,
  lenderAvatar,
  propertyAddress,
  propertyImage,
  messages,
  onSendMessage,
  onAcceptOffer,
  onRejectOffer,
  onCounterOffer,
  currentUserRole
}) => {
  const [newMessage, setNewMessage] = useState('');
  const [showOfferForm, setShowOfferForm] = useState(false);
  const [offerDetails, setOfferDetails] = useState<NegotiationMessage['offerDetails']>({
    amount: 0,
    interestRate: 0,
    term: 0,
    additionalTerms: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    const timeline = document.getElementById('negotiation-timeline');
    if (timeline) {
      timeline.scrollTop = timeline.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() && !showOfferForm) return;
    
    setIsSubmitting(true);
    try {
      await onSendMessage({
        role: currentUserRole,
        content: newMessage,
        offerDetails: showOfferForm ? offerDetails : undefined
      });
      setNewMessage('');
      setShowOfferForm(false);
      setOfferDetails({
        amount: 0,
        interestRate: 0,
        term: 0,
        additionalTerms: ''
      });
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusIcon = (status: MessageStatus) => {
    switch (status) {
      case 'accepted':
        return <FaCheckCircle size={20} />;
      case 'rejected':
        return <FaTimesCircle size={20} />;
      case 'countered':
        return <FaExchangeAlt size={20} />;
      default:
        return <FaCommentDots size={20} />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatTermLength = (days: number): string => {
    if (days < 30) {
      return `${days} day${days !== 1 ? 's' : ''}`;
    } else if (days < 365) {
      const months = Math.round(days / 30);
      return `${months} month${months !== 1 ? 's' : ''}`;
    } else {
      const years = (days / 365).toFixed(1);
      return `${years} year${years !== '1.0' ? 's' : ''}`;
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-lg shadow-xl overflow-hidden">
      {/* Header with property info */}
      <div className="bg-white dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700 flex items-center space-x-4">
        {propertyImage && (
          <div className="h-16 w-16 rounded-lg overflow-hidden flex-shrink-0">
            <img src={propertyImage} alt={propertyAddress} className="h-full w-full object-cover" />
          </div>
        )}
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Negotiation for {propertyAddress}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Between {investorName} and {lenderName}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
            <FaHandshake size={20} />
          </div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Negotiation #{negotiationId.slice(0, 8)}
          </span>
        </div>
      </div>

      {/* Timeline */}
      <div 
        id="negotiation-timeline"
        className="flex-1 overflow-y-auto p-4 space-y-8 relative"
        style={{ 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%239C92AC" fill-opacity="0.05" fill-rule="evenodd"%3E%3Cpath d="M0 40L40 0H20L0 20M40 40V20L20 40"/%3E%3C/g%3E%3C/svg%3E")',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Timeline center line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-300 via-primary-500 to-primary-700 dark:from-primary-700 dark:via-primary-500 dark:to-primary-300 transform -translate-x-1/2 z-0"></div>
        
        {/* Messages */}
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`relative flex ${message.role === 'investor' ? 'justify-start' : 'justify-end'} z-10`}
            >
              <div 
                className={`
                  max-w-[80%] sm:max-w-[70%] md:max-w-[60%] 
                  ${message.role === 'investor' 
                    ? 'bg-white dark:bg-gray-800 rounded-tr-2xl rounded-br-2xl rounded-bl-2xl ml-12' 
                    : 'bg-primary-50 dark:bg-primary-900 rounded-tl-2xl rounded-bl-2xl rounded-br-2xl mr-12'
                  }
                  p-4 shadow-md
                `}
              >
                {/* Message header with avatar and name */}
                <div className="flex items-center space-x-2 mb-2">
                  <div className="h-8 w-8 rounded-full overflow-hidden flex-shrink-0 border-2 border-white dark:border-gray-700 shadow-sm">
                    <img 
                      src={message.role === 'investor' ? investorAvatar : lenderAvatar} 
                      alt={message.role === 'investor' ? investorName : lenderName}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://ui-avatars.com/api/?name=${message.role === 'investor' ? investorName : lenderName}&background=random`;
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {message.role === 'investor' ? investorName : lenderName}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {format(new Date(message.timestamp), 'MMM d, yyyy h:mm a')}
                    </p>
                  </div>
                  <div className={`${
                    message.status === 'accepted' ? 'text-green-500' : 
                    message.status === 'rejected' ? 'text-red-500' : 
                    message.status === 'countered' ? 'text-blue-500' : 
                    'text-gray-500'
                  }`}>
                    {getStatusIcon(message.status)}
                  </div>
                </div>

                {/* Message content */}
                <div className="mb-3">
                  <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                    {message.content}
                  </p>
                </div>

                {/* Offer details if present */}
                {message.offerDetails && (
                  <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Offer Details</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">Amount</p>
                        <p className="font-medium text-gray-900 dark:text-white">{formatCurrency(message.offerDetails.amount)}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">Interest Rate</p>
                        <p className="font-medium text-gray-900 dark:text-white">{message.offerDetails.interestRate}%</p>
                      </div>
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">Term</p>
                        <p className="font-medium text-gray-900 dark:text-white">{formatTermLength(message.offerDetails.term)}</p>
                      </div>
                    </div>
                    {message.offerDetails.additionalTerms && (
                      <div className="mt-2">
                        <p className="text-gray-500 dark:text-gray-400">Additional Terms</p>
                        <p className="font-medium text-gray-900 dark:text-white text-sm">{message.offerDetails.additionalTerms}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Attachments if present */}
                {message.attachments && message.attachments.length > 0 && (
                  <div className="mt-3">
                    <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">Attachments</h4>
                    <div className="flex flex-wrap gap-2">
                      {message.attachments.map(attachment => (
                        <a 
                          key={attachment.id}
                          href={attachment.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center p-2 bg-gray-100 dark:bg-gray-700 rounded-md text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        >
                          <span className="truncate max-w-[150px]">{attachment.name}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action buttons for the current user if the message is from the other party */}
                {message.role !== currentUserRole && message.status === 'pending' && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      onClick={() => onAcceptOffer(message.id)}
                      className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-sm rounded-full transition-colors flex items-center gap-1"
                    >
                      <FaCheckCircle size={12} />
                      <span>Accept</span>
                    </button>
                    <button
                      onClick={() => onRejectOffer(message.id)}
                      className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded-full transition-colors flex items-center gap-1"
                    >
                      <FaTimesCircle size={12} />
                      <span>Decline</span>
                    </button>
                    <button
                      onClick={() => {
                        setShowOfferForm(true);
                        if (message.offerDetails) {
                          // Create a deep copy to avoid undefined values
                          const newOfferDetails = {
                            amount: message.offerDetails.amount,
                            interestRate: message.offerDetails.interestRate,
                            term: message.offerDetails.term,
                            additionalTerms: message.offerDetails.additionalTerms || ''
                          };
                          setOfferDetails(newOfferDetails);
                        }
                      }}
                      className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-full transition-colors flex items-center gap-1"
                    >
                      <FaExchangeAlt size={12} />
                      <span>Counter</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Timeline dot */}
              <div 
                className={`absolute top-4 ${
                  message.role === 'investor' ? 'left-0' : 'right-0'
                } w-4 h-4 rounded-full bg-white border-4 ${
                  message.status === 'accepted' ? 'border-green-500' : 
                  message.status === 'rejected' ? 'border-red-500' : 
                  message.status === 'countered' ? 'border-blue-500' : 
                  'border-primary-500'
                } transform ${
                  message.role === 'investor' ? 'translate-x-6' : '-translate-x-6'
                }`}
              ></div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Message input */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
        {showOfferForm && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
          >
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Make an Offer</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Amount</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 dark:text-gray-400">$</span>
                  <input
                    type="number"
                    value={offerDetails.amount}
                    onChange={(e) => setOfferDetails({...offerDetails, amount: Number(e.target.value)})}
                    className="block w-full pl-8 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:text-white text-sm"
                    placeholder="500,000"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Interest Rate (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={offerDetails.interestRate}
                  onChange={(e) => setOfferDetails({...offerDetails, interestRate: Number(e.target.value)})}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:text-white text-sm"
                  placeholder="5.5"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Term (days)</label>
                <input
                  type="number"
                  value={offerDetails.term}
                  onChange={(e) => setOfferDetails({...offerDetails, term: Number(e.target.value)})}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:text-white text-sm"
                  placeholder="365"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Additional Terms (optional)</label>
              <textarea
                value={offerDetails.additionalTerms || ''}
                onChange={(e) => setOfferDetails({...offerDetails, additionalTerms: e.target.value})}
                rows={3}
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:text-white text-sm"
                placeholder="Any additional terms or conditions..."
              ></textarea>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowOfferForm(false)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}

        <div className="flex items-end space-x-2">
          <div className="flex-1">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              rows={2}
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:text-white resize-none"
              placeholder="Type your message..."
            ></textarea>
          </div>
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={() => setShowOfferForm(!showOfferForm)}
              className={`p-2 rounded-full ${
                showOfferForm 
                  ? 'bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-400' 
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
              } hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors`}
              title="Make an offer"
            >
              <FaExchangeAlt size={18} />
            </button>
            <button
              type="button"
              onClick={handleSendMessage}
              disabled={isSubmitting || (!newMessage.trim() && !showOfferForm)}
              className={`px-4 py-2 rounded-full font-medium text-white transition-colors ${
                isSubmitting || (!newMessage.trim() && !showOfferForm)
                  ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                  : 'bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600'
              }`}
            >
              {isSubmitting ? 'Sending...' : 'Send'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NegotiationTimeline; 