import { useEffect, useState } from 'react';
import { initDB } from '../utils/db';
import axios from 'axios';

export const useOfflineSync = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const goOnline = () => { setIsOnline(true); triggerSync(); };
    const goOffline = () => setIsOnline(false);

    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);

    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  const triggerSync = async () => {
    const db = await initDB();
    const queue = await db.getAll('syncQueue');

    if (queue.length === 0) return;

    try {
      const response = await axios.post('/api/sync/offline', { operations: queue }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      if (response.data.success) {
        // Clear sync queue on successful upstream upload
        const tx = db.transaction('syncQueue', 'readwrite');
        await tx.store.clear();
        await tx.done;
        console.log('Cloud Sync successfully executed.');
      }
    } catch (error) {
      console.error('Background Sync failed, holding queue until next retry cycle.', error);
    }
  };

  return { isOnline, triggerSync };
};