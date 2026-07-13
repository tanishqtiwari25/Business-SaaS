import React, { createContext } from 'react';
import { useOfflineSync } from '../hooks/useOfflineSync';

export const SyncContext = createContext();

export const SyncProvider = ({ children }) => {
  const syncState = useOfflineSync();

  return (
    <SyncContext.Provider value={syncState}>
      {children}
    </SyncContext.Provider>
  );
};