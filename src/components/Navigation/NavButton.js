import React from 'react';
import { getIcon } from './utils/icons';

export const NavButton = ({ id, label, icon, onClick, isActive, variant }) => {
  const IconComponent = getIcon(icon);

  if (variant === 'desktop') {
    return (
      <button
        onClick={onClick}
        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
          isActive
            ? 'bg-blue-500 text-white'
            : 'text-gray-300 hover:bg-blue-600 hover:text-white'
        }`}
      >
        {label}
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`nav-item ${isActive ? 'active' : ''}`}
    >
      <IconComponent 
        className={`nav-icon w-6 h-6`}
      />
      <span className="nav-label">
        {label}
      </span>
    </button>
  );
};