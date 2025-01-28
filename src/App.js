import './App.css';
import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import BookList from './components/BookList';
import ReaderList from './components/ReaderList';
import Notification from './components/Notification';
import BooksTaken from './components/BooksTaken';
import MyReaderList from './components/MyReaderList';
import BookApproval from './components/BookApproval';
import Navigation from './components/Navigation';
import { BookProvider } from './contexts/BookContext';
import { auth } from './firebase';

const App = () => {
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const [activeComponent, setActiveComponent] = useState('books');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setNotification({ message: 'Login successful', type: 'success' });
        setTimeout(() => setNotification(null), 3000);
      } else {
        setUser(null);
      }
    }, (error) => {
      setNotification({ message: error.message, type: 'error' });
      setTimeout(() => setNotification(null), 3000);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setUser(null);
      setNotification({ message: 'Logout successful', type: 'success' });
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      setNotification({ message: error.message, type: 'error' });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const renderContent = () => {
    const isAdmin = user.email === 'rsank001@gold.ac.uk';

    if (isAdmin) {
      switch (activeComponent) {
        case 'books':
          return <BookList />;
        case 'readers':
          return (
            <>
              <ReaderList />
              <MyReaderList />
            </>
          );
        case 'requests':
          return <BookApproval />;
        default:
          return <BookList />;
      }
    } else {
      switch (activeComponent) {
        case 'books':
          return <BookList />;
        case 'mybooks':
          return <BooksTaken />;
        default:
          return <BookList />;
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100">
      {notification && <Notification message={notification.message} type={notification.type} />}
      {!user ? (
        <Login onLogin={setUser} />
      ) : (
        <BookProvider>
          <div>
            <Navigation 
              user={user}
              activeComponent={activeComponent}
              setActiveComponent={setActiveComponent}
              handleLogout={handleLogout}
            />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="space-y-8">
                {renderContent()}
              </div>
            </main>
          </div>
        </BookProvider>
      )}
    </div>
  );
};

export default App;