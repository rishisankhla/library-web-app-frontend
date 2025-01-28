import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useBookApprovalSort } from './hooks/useBookApprovalSort';
import { useBookApprovalFilter } from './hooks/useBookApprovalFilter';

const BookApprovalContext = createContext();

export const useBookApproval = () => {
  const context = useContext(BookApprovalContext);
  if (!context) {
    throw new Error('useBookApproval must be used within a BookApprovalProvider');
  }
  return context;
};

export const BookApprovalProvider = ({ children }) => {
  const [requestedBooks, setRequestedBooks] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { sortConfig, requestSort, sortedBooks } = useBookApprovalSort(requestedBooks);
  const filteredAndSortedBooks = useBookApprovalFilter(sortedBooks, searchTerm);

  const fetchRequestedBooks = async () => {
    try {
      const response = await axios.get('https://library-web-app-backend.onrender.com/requestedbook');
      const data = response.data;
      const booksArray = Object.keys(data).map(key => ({ id: key, ...data[key] }));
      setRequestedBooks(booksArray);
    } catch (error) {
      console.error('Error fetching requested books:', error);
      setError('Error fetching requested books');
    }
  };

  useEffect(() => {
    fetchRequestedBooks();
  }, []);

  const approveRequest = async (requestId, bookId, userEmail) => {
    try {
      const response = await axios.post(`https://library-web-app-backend.onrender.com/requestedbook/approveRequest`, {
        requestId,
        bookId,
        userEmail
      });
  
      // Update the local state to reflect the change
      setRequestedBooks(prevBooks => 
        prevBooks.map(book => 
          book.id === requestId
            ? { ...book, 'request-status': 'approved' }
            : book
        )
      );

      showNotification(response.data.message, 'success');
    } catch (error) {
      console.error('Error approving request:', error);
      showNotification('Error approving request', 'error');
    }
  };

  const showNotification = (message, type) => {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-500 ease-in-out z-50`;
    notification.textContent = message;
    document.body.appendChild(notification);

    // Fade in
    notification.style.opacity = '0';
    setTimeout(() => {
      notification.style.opacity = '1';
    }, 10);

    // Fade out and remove
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

  const value = {
    requestedBooks,
    error,
    searchTerm,
    setSearchTerm,
    sortConfig,
    requestSort,
    filteredAndSortedBooks,
    approveRequest,
    refreshData: fetchRequestedBooks
  };

  return (
    <BookApprovalContext.Provider value={value}>
      {children}
    </BookApprovalContext.Provider>
  );
};