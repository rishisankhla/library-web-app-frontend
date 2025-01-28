import React, { useState, useEffect } from 'react';
import { useBooks } from '../contexts/BookContext';
import LoadingSpinner from './LoadingSpinner';

function ReaderList() {
  const { readers, loading, error, refreshData } = useBooks();
  const [selectedReader, setSelectedReader] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [readersArray, setReadersArray] = useState([]);

  useEffect(() => {
    setReadersArray(Object.values(readers));
  }, [readers]);

  useEffect(() => {
    const interval = setInterval(() => {
      refreshData();
    }, 2000);

    return () => clearInterval(interval);
  }, [refreshData]);

  const filteredReaders = React.useMemo(() => {
    return readersArray.filter(reader =>
      reader.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reader.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [readersArray, searchTerm]);

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
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Readers Directory</h2>
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
      <div className="grid grid-cols-1 gap-4 sm:hidden">
        {filteredReaders.map((reader, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-xl p-4"
          >
            <div className="flex flex-col space-y-3">
              <div className="flex items-start space-x-3 justify-between">
                <div className="flex items-start space-x-3 min-w-0">
                  <div className="h-10 w-10 flex-shrink-0 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">
                      {reader.name ? reader.name[0].toUpperCase() : 'U'}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold text-gray-900 truncate">
                      {reader.name}
                    </h3>
                    <p className="text-sm text-gray-500 truncate">
                      {reader.email}
                    </p>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium whitespace-nowrap">
                    {reader.booksTaken ? reader.booksTaken.filter(book => book !== 'no-book-new-user').length : 0} Books
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSelectedReader(reader)}
                className="w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-blue-600 bg-white border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-200"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View */}
      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReaders.map((reader, index) => (
          <div
            key={index}
            className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-lg">
                    {reader.name ? reader.name[0].toUpperCase() : 'U'}
                  </span>
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {reader.booksTaken ? reader.booksTaken.filter(book => book !== 'no-book-new-user').length : 0} Books
                </span>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2 truncate">{reader.name}</h3>
              <p className="text-gray-600 mb-4 truncate">{reader.email}</p>
              
              <button
                onClick={() => setSelectedReader(reader)}
                className="w-full relative inline-flex items-center justify-center px-4 py-2 overflow-hidden text-blue-600 border border-blue-600 rounded-md group hover:bg-blue-600 hover:text-white transition-all ease-out duration-300"
              >
                <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                <span className="relative">View Details</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredReaders.length === 0 && (
        <div className="text-center py-8">
          <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <p className="text-gray-500 text-sm">No readers found</p>
        </div>
      )}

      {/* Modal */}
      {selectedReader && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full transform transition-all duration-300 scale-100">
            <div className="flex justify-between items-start mb-4">
              <div className="pr-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1 truncate">{selectedReader.name}</h3>
                <p className="text-sm text-gray-600 truncate">{selectedReader.email}</p>
              </div>
              <button
                onClick={() => setSelectedReader(null)}
                className="text-gray-400 hover:text-gray-500 transition-colors duration-200"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="mt-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Books Taken</h4>
              {selectedReader.booksTaken && selectedReader.booksTaken.length > 0 ? (
                <div className="space-y-2">
                  {selectedReader.booksTaken
                    .filter(book => book !== 'no-book-new-user')
                    .map((book, index) => (
                      <div 
                        key={index} 
                        className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg"
                      >
                        <svg className="w-4 h-4 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <span className="text-sm text-gray-700 truncate">{book}</span>
                      </div>
                    ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 bg-gray-50 rounded-lg p-3">No books currently borrowed</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReaderList;