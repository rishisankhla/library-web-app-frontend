import React, { useState, useEffect } from 'react';
import { useBooks } from '../contexts/BookContext';
import LoadingSpinner from './LoadingSpinner';

const MyReaderList = () => {
  const { readers, loading, error, refreshData } = useBooks();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [formattedReaders, setFormattedReaders] = useState([]);

  useEffect(() => {
    // Format readers whenever the readers state changes
    const formatted = Object.values(readers).map((reader) => ({
      name: reader.name,
      email: reader.email,
      booksTaken: Array.isArray(reader.booksTaken) 
        ? reader.booksTaken.filter(book => book !== 'no-book-new-user')
        : [],
    }));
    setFormattedReaders(formatted);
  }, [readers]);

  // Refresh data periodically
  useEffect(() => {
    const interval = setInterval(() => {
      refreshData();
    }, 2000);

    return () => clearInterval(interval);
  }, [refreshData]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const filteredAndSortedReaders = React.useMemo(() => {
    return [...formattedReaders]
      .filter(reader =>
        reader.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reader.email?.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (!sortConfig.key) return 0;

        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (sortConfig.key === 'booksTaken') {
          return sortConfig.direction === 'ascending'
            ? aValue.length - bValue.length
            : bValue.length - aValue.length;
        }

        if (sortConfig.direction === 'ascending') {
          return aValue > bValue ? 1 : -1;
        }
        return aValue < bValue ? 1 : -1;
      });
  }, [formattedReaders, searchTerm, sortConfig]);

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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Books Taken Overview</h2>
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search readers..."
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
        {filteredAndSortedReaders.map((reader, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-xl p-4"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-3 min-w-0">
                <div className="h-10 w-10 flex-shrink-0 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-lg">
                    {reader.name ? reader.name[0].toUpperCase() : 'U'}
                  </span>
                </div>
                <div className="min-w-0">
                  <h3 className="font-medium text-gray-900 truncate">{reader.name}</h3>
                  <p className="text-sm text-gray-500 truncate">{reader.email}</p>
                </div>
              </div>
              <div className="flex-shrink-0 ml-2">
                <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium whitespace-nowrap">
                  {reader.booksTaken.length} {reader.booksTaken.length === 1 ? 'Book' : 'Books'}
                </span>
              </div>
            </div>

            {reader.booksTaken.length > 0 && (
              <div className="mt-3 border-t border-gray-200 pt-3">
                <p className="text-xs text-gray-500 mb-2">Books Taken:</p>
                <div className="flex flex-wrap gap-2">
                  {reader.booksTaken.map((book, bookIndex) => (
                    <div
                      key={bookIndex}
                      className="flex items-center bg-white px-2.5 py-1.5 rounded-lg border border-gray-200 max-w-full"
                    >
                      <svg className="w-4 h-4 text-blue-600 flex-shrink-0 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      <span className="text-sm text-gray-700 truncate">{book}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Desktop View */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                className="group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                onClick={() => requestSort('name')}
              >
                <div className="flex items-center space-x-1">
                  <span>Name</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {sortConfig.key === 'name' && (
                      sortConfig.direction === 'ascending' ? '↑' : '↓'
                    )}
                  </span>
                </div>
              </th>
              <th
                className="group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                onClick={() => requestSort('email')}
              >
                <div className="flex items-center space-x-1">
                  <span>Email</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {sortConfig.key === 'email' && (
                      sortConfig.direction === 'ascending' ? '↑' : '↓'
                    )}
                  </span>
                </div>
              </th>
              <th
                className="group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                onClick={() => requestSort('booksTaken')}
              >
                <div className="flex items-center space-x-1">
                  <span>Books Taken</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {sortConfig.key === 'booksTaken' && (
                      sortConfig.direction === 'ascending' ? '↑' : '↓'
                    )}
                  </span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAndSortedReaders.map((reader, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">
                        {reader.name ? reader.name[0].toUpperCase() : 'U'}
                      </span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{reader.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {reader.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-wrap gap-2">
                    {reader.booksTaken.length > 0 ? (
                      reader.booksTaken.map((book, bookIndex) => (
                        <span
                          key={bookIndex}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {book}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500 text-sm">No books</span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredAndSortedReaders.length === 0 && (
        <div className="text-center py-8">
          <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <p className="text-gray-500 text-sm">No readers found</p>
        </div>
      )}
    </div>
  );
};

export default MyReaderList;