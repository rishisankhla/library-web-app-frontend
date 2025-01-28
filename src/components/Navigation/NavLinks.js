import React from 'react';
import { NavButton } from './NavButton';
import { getNavConfig } from './utils/navConfig';

const NavLinks = ({ user, activeComponent, setActiveComponent, variant, setIsMenuOpen, isMenuOpen }) => {
  const isAdmin = user.email === 'rsank001@gold.ac.uk';
  const navConfig = getNavConfig(isAdmin);

  return (
    <div className={variant === 'desktop' ? 'flex items-baseline space-x-4' : 'flex justify-around w-full'}>
      {navConfig.map((item) => (
        <NavButton
          key={item.id}
          {...item}
          isActive={activeComponent === item.id}
          variant={variant}
          onClick={() => setActiveComponent(item.id)}
        />
      ))}
      {variant === 'mobile' && (
        <NavButton
          id="profile"
          label="Profile"
          icon="profile"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          isActive={isMenuOpen}
          variant="mobile"
        />
      )}
    </div>
  );
};

export default NavLinks;