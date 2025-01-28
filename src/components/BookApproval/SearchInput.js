import React from 'react';
import { useBookApproval } from './BookApprovalContext';

const SearchInput = () => {
  const { searchTerm, setSearchTerm } = useBookApproval();

  return (
    <div className="relative w-full sm:w-64">
      <input
        type="text"
        placeholder="Search requests..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm"
      />
      <svg className="w-5 h-5 text-gray-400 absolute right-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
  );
};

export default SearchInput;