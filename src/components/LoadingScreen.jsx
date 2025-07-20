import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 flex items-center justify-center">
      <div className="text-center">
        {/* Logo/Brand */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">FoodExpress</h1>
          <p className="text-blue-100 text-lg">Delicious food delivered to your doorstep</p>
        </div>

        {/* Loading Spinner */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            {/* Outer ring */}
            <div className="w-16 h-16 border-4 border-blue-200 border-t-white rounded-full animate-spin"></div>
            {/* Inner ring */}
            <div className="absolute top-2 left-2 w-12 h-12 border-4 border-blue-300 border-t-white rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          </div>
        </div>

        {/* Loading text */}
        <div className="text-white">
          <p className="text-lg font-medium mb-2">Loading...</p>
          <div className="flex justify-center space-x-1">
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-8 w-64 mx-auto">
          <div className="bg-blue-200 rounded-full h-2">
            <div className="bg-white h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
          </div>
        </div>

        {/* Loading tips */}
        <div className="mt-8 text-blue-100 text-sm">
          <p>Preparing your delicious experience...</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen; 