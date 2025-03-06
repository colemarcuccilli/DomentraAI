import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';

const UserProfile: React.FC = () => {
  const { currentUser, updateProfile } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: currentUser?.firstName || '',
    lastName: currentUser?.lastName || '',
    email: currentUser?.email || '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await updateProfile(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">User not found</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        {/* Profile Header */}
        <div className="bg-primary-600 text-white p-6">
          <h1 className="text-2xl font-bold">User Profile</h1>
          <p className="mt-2 opacity-90">Manage your account information</p>
        </div>
        
        {/* Profile Content */}
        <div className="p-6">
          <div className="flex items-center mb-8">
            <div className="h-20 w-20 rounded-full bg-gray-300 flex-shrink-0 mr-4">
              {currentUser.firstName && currentUser.lastName && (
                <div className="h-full w-full flex items-center justify-center text-gray-700 text-xl font-medium">
                  {currentUser.firstName[0]}{currentUser.lastName[0]}
                </div>
              )}
            </div>
            <div>
              <h2 className="text-xl font-semibold">
                {currentUser.firstName} {currentUser.lastName}
              </h2>
              <p className="text-gray-500">{currentUser.email}</p>
              <p className="text-sm text-primary-600 mt-1">
                {currentUser.role === 'INVESTOR' ? 'Investor' : 
                 currentUser.role === 'LENDER' ? 'Lender' : 'Administrator'}
              </p>
            </div>
          </div>
          
          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-md transition-colors duration-200"
                >
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-4">Account Information</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-gray-500 text-sm">Role</p>
                      <p className="font-medium">
                        {currentUser.role === 'INVESTOR' ? 'Investor' : 
                         currentUser.role === 'LENDER' ? 'Lender' : 'Administrator'}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Verification Status</p>
                      <p className="font-medium">
                        {currentUser.verificationStatus === 'VERIFIED' ? (
                          <span className="text-green-600">Verified</span>
                        ) : currentUser.verificationStatus === 'PENDING' ? (
                          <span className="text-yellow-600">Pending Verification</span>
                        ) : (
                          <span className="text-red-600">Unverified</span>
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Member Since</p>
                      <p className="font-medium">
                        {new Date(currentUser.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-4">Permissions</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <svg 
                        className={`h-5 w-5 ${currentUser.permissions.canListProperties ? 'text-green-500' : 'text-red-500'} mr-2`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        {currentUser.permissions.canListProperties ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        )}
                      </svg>
                      <span>List Properties</span>
                    </div>
                    <div className="flex items-center">
                      <svg 
                        className={`h-5 w-5 ${currentUser.permissions.canSubmitLoanOffers ? 'text-green-500' : 'text-red-500'} mr-2`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        {currentUser.permissions.canSubmitLoanOffers ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        )}
                      </svg>
                      <span>Submit Loan Offers</span>
                    </div>
                    <div className="flex items-center">
                      <svg 
                        className={`h-5 w-5 ${currentUser.permissions.canManageUsers ? 'text-green-500' : 'text-red-500'} mr-2`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        {currentUser.permissions.canManageUsers ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        )}
                      </svg>
                      <span>Manage Users</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => setIsEditing(true)}
                className="bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-md transition-colors duration-200"
              >
                Edit Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile; 