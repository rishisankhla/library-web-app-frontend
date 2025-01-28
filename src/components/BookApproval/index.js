import React from 'react';
import { BookApprovalProvider } from './BookApprovalContext';
import BookApprovalHeader from './BookApprovalHeader';
import BookApprovalTable from './BookApprovalTable';

const BookApproval = () => {
  return (
    <BookApprovalProvider>
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
        <BookApprovalHeader />
        <BookApprovalTable />
      </div>
    </BookApprovalProvider>
  );
};

export default BookApproval;