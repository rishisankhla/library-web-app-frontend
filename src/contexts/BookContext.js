import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const BookContext = createContext();

export const useBooks = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks must be used within a BookProvider');
  }
  return context;
};

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [readers, setReaders] = useState({});
  const [requestedBooks, setRequestedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllData = async () => {
    try {
      const [booksResponse, readersResponse, requestedBooksResponse] = await Promise.all([
        axios.get('https://library-web-app-backend.onrender.com/books'),
        axios.get('https://library-web-app-backend.onrender.com/readers'),
        axios.get('https://library-web-app-backend.onrender.com/requestedbook')
      ]);

      // Transform books data
      const booksArray = Object.entries(booksResponse.data).map(([key, value]) => ({
        id: key,
        ...value,
      }));
      setBooks(booksArray);

      // Transform readers data
      setReaders(readersResponse.data || {});

      // Transform requested books data
      const requestedBooksArray = Object.keys(requestedBooksResponse.data).map(key => ({
        id: key,
        ...requestedBooksResponse.data[key]
      }));
      setRequestedBooks(requestedBooksArray);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const approveRequest = async (requestId, bookId, userEmail) => {
    try {
      const response = await axios.post(`https://library-web-app-backend.onrender.com/requestedbook/approveRequest`, {
        requestId,
        bookId,
        userEmail
      });

      // Fetch fresh data after approval
      await fetchAllData();

      return { success: true, message: response.data.message };
    } catch (error) {
      console.error('Error approving request:', error);
      return { success: false, message: 'Error approving request' };
    }
  };

  const requestBook = async (bookId, userEmail) => {
    try {
      const response = await axios.post('https://library-web-app-backend.onrender.com/books/request', {
        bookId,
        userEmail
      });

      // Fetch fresh data after request
      await fetchAllData();

      return { success: true, message: response.data.message };
    } catch (error) {
      console.error('Error requesting book:', error);
      return { success: false, message: 'Error requesting book' };
    }
  };

  const returnBook = async (userEmail, bookId) => {
    try {
      await Promise.all([
        axios.post('https://library-web-app-backend.onrender.com/books/returnBook', { userEmail, bookId }),
        axios.post('https://library-web-app-backend.onrender.com/readers/returnBook', { userEmail, bookId })
      ]);

      // Fetch fresh data after return
      await fetchAllData();

      return { success: true, message: 'Book returned successfully' };
    } catch (error) {
      console.error('Error returning book:', error);
      return { success: false, message: 'Error returning book' };
    }
  };

  const value = {
    books,
    readers,
    requestedBooks,
    loading,
    error,
    approveRequest,
    requestBook,
    returnBook,
    refreshData: fetchAllData
  };

  return (
    <BookContext.Provider value={value}>
      {children}
    </BookContext.Provider>
  );
};