import React from 'react';
import { useBookApproval } from './BookApprovalContext';

const EmptyState = () => {
  const { searchTerm } = useBookApproval();

  return (
    <div className="text-center py-8">
      <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
      <h3 className="mt-2 text-sm font-medium text-gray-900">No requests found</h3>
      <p className="mt-1 text-sm text-gray-500">
        {searchTerm ? 'Try adjusting your search term' : 'New requests will appear here'}
      </p>
    </div>
  );
};

export default EmptyState;