import React from 'react';
import { useBookApproval } from './BookApprovalContext';

const TableHeader = () => {
  const { sortConfig, requestSort } = useBookApproval();

  const headers = [
    { key: 'book-requested', label: 'Book Requested' },
    { key: 'email', label: 'Email' },
    { key: 'request-status', label: 'Status' },
    { key: 'username', label: 'Username' }
  ];

  return (
    <thead className="bg-gray-50">
      <tr>
        {headers.map(({ key, label }) => (
          <th
            key={key}
            onClick={() => requestSort(key)}
            className="group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors duration-200"
          >
            <div className="flex items-center space-x-1">
              <span>{label}</span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {sortConfig.key === key && (
                  sortConfig.direction === 'ascending' ? '↑' : '↓'
                )}
              </span>
            </div>
          </th>
        ))}
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Actions
        </th>
      </tr>
    </thead>
  );
};

export default TableHeader;