import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { useBooks } from '../contexts/BookContext';
import LoadingSpinner from './LoadingSpinner';

function BookList() {
  const [searchTerm, setSearchTerm] = useState('');
  const { books, requestBook, loading, error } = useBooks();
  const [showTable, setShowTable] = useState(false);
  const userEmail = auth.currentUser?.email;
  const isAdmin = userEmail === 'rsank001@gold.ac.uk';

  useEffect(() => {
    if (!loading && books.length > 0) {
      setTimeout(() => {
        setShowTable(true);
      }, 100);
    }
  }, [loading, books]);

  const handleRequestBook = async (bookId) => {
    const result = await requestBook(bookId, userEmail);
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

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.isbn.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
        <div className="text-red-500 text-center">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Available Books</h2>
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm"
          />
          <svg className="w-5 h-5 text-gray-400 absolute right-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Mobile View */}
      <div className="sm:hidden space-y-4">
        {filteredBooks.map((book, index) => (
          <div
            key={book.id}
            className={`bg-gray-50 rounded-xl p-4 book-row ${index % 2 === 0 ? 'from-right' : 'from-left'}`}
            style={{ animationDelay: `${(index + 1) * 0.1}s` }}
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{book.title}</h3>
                  <p className="text-sm text-gray-500">{book.author}</p>
                </div>
                <span className={`ml-2 px-2.5 py-1 text-xs font-medium rounded-full whitespace-nowrap ${
                  book.status === 'available'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {book.status}
                </span>
              </div>

              <div className="flex items-center text-sm text-gray-500">
                <svg className="w-4 h-4 mr-1.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                </svg>
                ISBN: {book.isbn}
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-sm text-gray-500">ID: {book.id}</span>
                {!isAdmin && book.status === 'available' && (
                  <button
                    onClick={() => handleRequestBook(book.id)}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-white border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-200"
                  >
                    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    Request
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
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ISBN</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              {!isAdmin && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              )}
            </tr>
          </thead>
          <tbody className={`bg-white divide-y divide-gray-200 ${showTable ? 'table-loaded' : ''}`}>
            {filteredBooks.map((book, index) => (
              <tr 
                key={book.id} 
                className={`book-row ${index % 2 === 0 ? 'from-right' : 'from-left'} hover:bg-gray-50 transition-colors duration-200`}
                style={{ animationDelay: `${(index + 1) * 0.1}s` }}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{book.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{book.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.author}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.isbn}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    book.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {book.status}
                  </span>
                </td>
                {!isAdmin && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {book.status === 'available' && (
                      <button
                        onClick={() => handleRequestBook(book.id)}
                        className="relative inline-flex items-center px-4 py-2 overflow-hidden text-blue-600 border border-blue-600 rounded-md group hover:bg-blue-600 hover:text-white transition-all ease-out duration-300"
                      >
                        <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                        <span className="relative">Request Book</span>
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center py-8">
          <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <p className="text-gray-500 text-sm">No books found</p>
        </div>
      )}
    </div>
  );
}

export default BookList;