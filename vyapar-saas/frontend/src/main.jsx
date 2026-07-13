import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { SyncProvider } from './context/SyncContext';
import './index.css'; // Make sure Tailwind styles are initialized here

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <SyncProvider>
        <App />
      </SyncProvider>
    </AuthProvider>
  </React.StrictMode>
);