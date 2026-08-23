import { openDB } from "idb";

const DB_NAME = "vyapar-saas-db";
const DB_VERSION = 1;

export const initDB = async () => {
  const db = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // Products store
      if (!db.objectStoreNames.contains("products")) {
        db.createObjectStore("products", {
          keyPath: "id",
        });
      }

      // Offline sync queue
      if (!db.objectStoreNames.contains("syncQueue")) {
        db.createObjectStore("syncQueue", {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    },
  });

  return db;
};

// Get all products from IndexedDB
export const getOfflineProducts = async () => {
  try {
    const db = await initDB();

    const products = await db.getAll("products");

    return products;
  } catch (error) {
    console.error("Failed to get offline products:", error);

    return [];
  }
};

// Save a single product offline
export const saveProductOffline = async (product) => {
  try {
    const db = await initDB();

    await db.put("products", product);

    console.log("Product saved offline successfully.");

    return product;
  } catch (error) {
    console.error("Failed to save product offline:", error);

    throw error;
  }
};

// Save multiple products offline
export const saveOfflineProducts = async (products) => {
  try {
    const db = await initDB();

    const tx = db.transaction("products", "readwrite");

    for (const product of products) {
      await tx.store.put(product);
    }

    await tx.done;

    console.log("Products saved offline successfully.");

    return products;
  } catch (error) {
    console.error("Failed to save offline products:", error);

    throw error;
  }
};

// Add operation to sync queue
export const addToSyncQueue = async (operation) => {
  try {
    const db = await initDB();

    const id = await db.add("syncQueue", {
      ...operation,
      createdAt: new Date().toISOString(),
    });

    console.log("Operation added to sync queue.");

    return id;
  } catch (error) {
    console.error("Failed to add operation to sync queue:", error);

    throw error;
  }
};

// Clear all offline products
export const clearOfflineProducts = async () => {
  try {
    const db = await initDB();

    await db.clear("products");

    console.log("Offline products cleared.");
  } catch (error) {
    console.error("Failed to clear offline products:", error);

    throw error;
  }
};

// Clear sync queue
export const clearSyncQueue = async () => {
  try {
    const db = await initDB();

    await db.clear("syncQueue");

    console.log("Sync queue cleared.");
  } catch (error) {
    console.error("Failed to clear sync queue:", error);

    throw error;
  }
};