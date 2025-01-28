import React from 'react';
import NavLinks from './NavLinks';
import UserInfo from './UserInfo';

const DesktopNav = ({ user, activeComponent, setActiveComponent, handleLogout }) => {
  return (
    <nav className="bg-gradient-to-r from-blue-700 to-blue-900 shadow-lg hidden md:block">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-white text-xl font-bold">Library System</span>
            <div className="ml-10">
              <NavLinks 
                user={user}
                activeComponent={activeComponent}
                setActiveComponent={setActiveComponent}
                variant="desktop"
              />
            </div>
          </div>
          <UserInfo 
            user={user}
            handleLogout={handleLogout}
            variant="desktop"
          />
        </div>
      </div>
    </nav>
  );
};

export default DesktopNav;