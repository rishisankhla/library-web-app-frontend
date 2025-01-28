import React from 'react';
import { auth } from '../firebase';
import { useBooks } from '../contexts/BookContext';
import LoadingSpinner from './LoadingSpinner';

const BooksTaken = () => {
  const { readers, returnBook, loading, error } = useBooks();
  const userEmail = auth.currentUser?.email;
  
  const reader = Object.values(readers).find(reader => reader.email === userEmail);
  const booksTaken = reader?.booksTaken?.filter(book => book !== 'no-book-new-user') || [];

  const handleReturnBook = async (book) => {
    const result = await returnBook(userEmail, book);
    if (result.success) {
      showNotification(result.message, 'success');
    } else {
      showNotification(result.message, 'error');
    }
  };

  const showNotification = (message, type) => {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-500 ease-in-out z-50`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateY(-20px)';
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 500);
    }, 2500);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-red-500 text-center">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">My Books</h2>
        <span className="text-sm sm:text-base text-gray-500">
          {booksTaken.length} {booksTaken.length === 1 ? 'Book' : 'Books'}
        </span>
      </div>
      
      {booksTaken.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8">
          <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <p className="text-gray-500 text-center text-sm sm:text-base">No books currently borrowed</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {booksTaken.map((book, index) => (
            <div 
              key={index} 
              className="bg-gray-50 rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all duration-300 hover:bg-gray-100"
            >
              <div className="flex items-start space-x-3 w-full sm:w-auto">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm sm:text-base font-medium text-gray-900 truncate">{book}</p>
                  <p className="text-xs sm:text-sm text-gray-500">Borrowed Book</p>
                </div>
              </div>
              <button
                onClick={() => handleReturnBook(book)}
                className="w-full sm:w-auto relative inline-flex items-center justify-center px-4 py-2 overflow-hidden text-blue-600 border border-blue-600 rounded-md group hover:bg-blue-600 hover:text-white transition-all ease-out duration-300"
              >
                <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                <span className="relative flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                  </svg>
                  Return Book
                </span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BooksTaken;