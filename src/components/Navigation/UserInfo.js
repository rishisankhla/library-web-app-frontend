import React from 'react';

const UserInfo = ({ user, handleLogout, variant }) => {
  if (variant === 'mobile') return null;

  return (
    <div className="flex items-center">
      <span className="text-white mr-4">{user.email}</span>
      <button
        onClick={handleLogout}
        className="relative inline-flex items-center px-4 py-2 overflow-hidden text-white bg-red-600 rounded-md group hover:bg-gradient-to-r hover:from-red-500 hover:to-red-400 hover:ring-2 hover:ring-offset-2 hover:ring-red-400 transition-all ease-out duration-300"
      >
        <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
        <span className="relative">Logout</span>
      </button>
    </div>
  );
};

export default UserInfo;