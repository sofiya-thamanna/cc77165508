// components/ProfileDropdown.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';

const ProfileDropdown = ({ onLogout }) => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-50 border p-4">
      <div className="mb-3">
        <h2 className="text-lg font-semibold text-gray-800">{user.name}</h2>
        <p className="text-sm text-gray-500">{user.email}</p>
      </div>
      <button
        onClick={onLogout}
        className="w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default ProfileDropdown;
