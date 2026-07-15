import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import POSBilling from './pages/POSBilling';
import Inventory from './pages/Inventory';
import Reports from './pages/Reports';

// Naye Auth Components Import kiye hain
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // App load hote hi check karo ki kya koi user already logged in hai
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const handleAuthSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  // Loading state jab tak localStorage check ho raha ho
  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-950 text-white">
        <p className="text-lg font-semibold animate-pulse">Loading Vyapar SaaS...</p>
      </div>
    );
  }

  return (
    <Router>
      <div className="flex h-screen w-screen bg-slate-50 dark:bg-slate-950 overflow-hidden">
        
        {/* 1. Agar user logged in hai, tabhi Sidebar dikhega */}
        {user && <Sidebar onLogout={handleLogout} />}

        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <Routes>
            {/* 2. Public Routes (Agar user logged in hai, toh login/register block karke dashboard bhej do) */}
            <Route 
              path="/login" 
              element={!user ? <Login onAuthSuccess={handleAuthSuccess} /> : <Navigate to="/dashboard" replace />} 
            />
            <Route 
              path="/register" 
              element={!user ? <Register onAuthSuccess={handleAuthSuccess} /> : <Navigate to="/dashboard" replace />} 
            />

            {/* 3. Protected Routes (Bina login ke koi inme nahi ghus sakta) */}
            <Route 
              path="/dashboard" 
              element={user ? <Dashboard /> : <Navigate to="/login" replace />} 
            />
            <Route 
              path="/pos" 
              element={user ? <POSBilling /> : <Navigate to="/login" replace />} 
            />
            <Route 
              path="/inventory" 
              element={user ? <Inventory /> : <Navigate to="/login" replace />} 
            />
            <Route 
              path="/reports" 
              element={user ? <Reports /> : <Navigate to="/login" replace />} 
            />

            {/* 4. Default Route Fallback */}
            <Route 
              path="*" 
              element={<Navigate to={user ? "/dashboard" : "/login"} replace />} 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;