import { useState } from 'react';

export const useBookApprovalSort = (books) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedBooks = [...books].sort((a, b) => {
    if (!sortConfig.key) return 0;

    let aValue = a[sortConfig.key === 'book-requested' ? 'book-requested' : sortConfig.key];
    let bValue = b[sortConfig.key === 'book-requested' ? 'book-requested' : sortConfig.key];

    if (sortConfig.direction === 'ascending') {
      return aValue > bValue ? 1 : -1;
    }
    return aValue < bValue ? 1 : -1;
  });

  return { sortConfig, requestSort, sortedBooks };
};