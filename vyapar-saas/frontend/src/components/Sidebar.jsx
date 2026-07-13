import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const links = [
    { name: 'Analytics Dashboard', path: '/dashboard', icon: '📊' },
    { name: 'POS Billing Terminal', path: '/pos', icon: '⚡' },
    { name: 'Inventory Matrix', path: '/inventory', icon: '📦' }
  ];

  return (
    <div className="w-64 h-screen bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between p-4 transition-colors duration-200">
      <div>
        <div className="flex items-center gap-3 px-2 py-4 mb-6 border-b dark:border-slate-800">
          <div className="h-9 w-9 bg-indigo-600 rounded-xl flex items-center justify-center font-black text-white text-lg shadow-md">V</div>
          <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white">Vyapar Enterprise</span>
        </div>
        <nav className="space-y-1">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all ${
                isActive 
                  ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400' 
                  : 'text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800/50'
              }`}
            >
              <span>{link.icon}</span>
              {link.name}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded-xl text-center">
        <span className="text-xs font-bold text-slate-400 dark:text-slate-500">SaaS Version 4.1.0-2026</span>
      </div>
    </div>
  );
};

export default Sidebar;