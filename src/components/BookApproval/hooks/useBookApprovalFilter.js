export const useBookApprovalFilter = (books, searchTerm) => {
  return books.filter(book =>
    book['book-requested']?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.username?.toLowerCase().includes(searchTerm.toLowerCase())
  );
};