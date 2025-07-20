import React from 'react';

const LogoutModal = ({ isOpen, onClose, onLogout }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-lg p-6 w-96">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute bg-white top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="mt-2">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Are you sure you want to log out?
          </h3>
          
          <div className="flex justify-center space-x-3 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={onLogout}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Yes, Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal; 