import { openDB } from 'idb'; // Lightweight promise wrapper wrapper for IndexedDB

const DB_NAME = 'VyaparOfflineDB';
const STORE_PRODUCTS = 'products';
const STORE_SYNC_QUEUE = 'syncQueue';

export const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_PRODUCTS)) {
        db.createObjectStore(STORE_PRODUCTS, { keyPath: 'sku' });
      }
      if (!db.objectStoreNames.contains(STORE_SYNC_QUEUE)) {
        db.createObjectStore(STORE_SYNC_QUEUE, { keyPath: 'id', autoIncrement: true });
      }
    },
  });
};

export const saveProductOffline = async (product) => {
  const db = await initDB();
  await db.put(STORE_PRODUCTS, product);
  
  // Queue changes for Sync engine
  await db.put(STORE_SYNC_QUEUE, {
    id: `${Date.now()}_${product.sku}`,
    action: 'UPDATE',
    collection: 'products',
    data: product,
    timestamp: new Date()
  });
};

export const getOfflineProducts = async () => {
  const db = await initDB();
  return db.getAll(STORE_PRODUCTS);
};