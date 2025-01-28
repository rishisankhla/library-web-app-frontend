import React, { useState } from 'react';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';

const Navigation = ({ user, activeComponent, setActiveComponent, handleLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <DesktopNav 
        user={user}
        activeComponent={activeComponent}
        setActiveComponent={setActiveComponent}
        handleLogout={handleLogout}
      />
      <MobileNav 
        user={user}
        activeComponent={activeComponent}
        setActiveComponent={setActiveComponent}
        handleLogout={handleLogout}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />
    </>
  );
};

export default Navigation;