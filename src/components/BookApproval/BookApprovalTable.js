import React from 'react';
import { useBookApproval } from './BookApprovalContext';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import EmptyState from './EmptyState';
import ErrorState from './ErrorState';

const BookApprovalTable = () => {
  const { error, filteredAndSortedBooks, approveRequest } = useBookApproval();

  if (error) {
    return <ErrorState error={error} />;
  }

  return (
    <div>
      {/* Mobile View */}
      <div className="sm:hidden space-y-3">
        {filteredAndSortedBooks.map((book, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-xl p-4"
          >
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-gray-900">{book['book-requested']}</h3>
                <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                  book['request-status'] === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
                }`}>
                  {book['request-status']}
                </span>
              </div>
              
              <p className="text-sm text-gray-500">{book.email}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 font-medium">
                      {book.username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm text-gray-600">{book.username}</span>
                </div>
                
                {book['request-status'] === 'pending' && (
                  <button
                    onClick={() => approveRequest(book.id, book['book-requested'], book.email)}
                    className="inline-flex items-center px-4 py-1.5 text-sm font-medium text-green-600 bg-white border border-green-600 rounded-lg hover:bg-green-600 hover:text-white transition-colors duration-200"
                  >
                    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Approve
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <TableHeader />
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAndSortedBooks.map((book, index) => (
              <TableRow key={index} book={book} />
            ))}
          </tbody>
        </table>
      </div>
      
      {filteredAndSortedBooks.length === 0 && <EmptyState />}
    </div>
  );
};

export default BookApprovalTable;