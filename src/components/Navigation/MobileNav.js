import React from 'react';
import NavLinks from './NavLinks';

const MobileNav = ({ user, activeComponent, setActiveComponent, handleLogout, isMenuOpen, setIsMenuOpen }) => {
  return (
    <div className="md:hidden">
      {/* Profile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm z-40" onClick={() => setIsMenuOpen(false)}>
          <div className="absolute bottom-24 left-4 right-4 bg-white rounded-2xl shadow-xl p-4" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-lg">
                    {user.email[0].toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 truncate max-w-[200px]">
                    {user.email}
                  </p>
                  <p className="text-xs text-gray-500">Signed in</p>
                </div>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-sm font-medium text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}

      {/* Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 mobile-nav">
        <div className="nav-container">
          <NavLinks 
            user={user}
            activeComponent={activeComponent}
            setActiveComponent={setActiveComponent}
            variant="mobile"
            setIsMenuOpen={setIsMenuOpen}
            isMenuOpen={isMenuOpen}
          />
        </div>
      </div>
    </div>
  );
};

export default MobileNav;