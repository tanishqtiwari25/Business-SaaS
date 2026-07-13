import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="w-full h-16 bg-white dark:bg-slate-900 border-b flex items-center justify-between px-8 transition-colors">
      <div className="text-sm text-slate-400 font-medium">Enterprise Suite Console view</div>
      <div className="flex items-center gap-4">
        <span className="text-sm font-bold text-slate-800 dark:text-white">{user?.name || 'Authorized Staff'}</span>
        <button onClick={logout} className="text-xs bg-rose-50 text-rose-600 px-3 py-1.5 rounded-lg font-bold hover:bg-rose-100 transition-all">
          Exit Session
        </button>
      </div>
    </div>
  );
};

export default Navbar;