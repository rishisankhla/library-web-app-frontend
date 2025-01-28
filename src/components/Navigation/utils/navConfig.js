export const getNavConfig = (isAdmin) => {
  if (isAdmin) {
    return [
      {
        id: 'books',
        label: 'Book Status',
        icon: 'books'
      },
      {
        id: 'readers',
        label: 'Readers Details',
        icon: 'readers'
      },
      {
        id: 'requests',
        label: 'Book Requests',
        icon: 'requests'
      }
    ];
  }

  return [
    {
      id: 'books',
      label: 'Available Books',
      icon: 'books'
    },
    {
      id: 'mybooks',
      label: 'My Books',
      icon: 'myBooks'
    }
  ];
};