import React from 'react';
import { PulseLoader } from 'react-spinners';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] bg-white rounded-lg shadow-md p-6">
      <PulseLoader color="#2563eb" size={15} margin={5} />
      <p className="mt-4 text-gray-600 text-sm animate-pulse">Loading data...</p>
    </div>
  );
};

export default LoadingSpinner;