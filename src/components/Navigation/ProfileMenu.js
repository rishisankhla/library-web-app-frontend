import React from 'react';

const ProfileMenu = ({ user, handleLogout }) => {
  return (
    <div className="absolute bottom-full left-0 right-0 bg-white shadow-lg rounded-t-xl p-4 mb-2">
      <div className="flex items-center justify-between mb-4">
        <span className="text-gray-800 font-medium">{user.email}</span>
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileMenu;