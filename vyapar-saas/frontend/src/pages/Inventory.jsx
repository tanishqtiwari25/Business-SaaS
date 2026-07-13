import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { getOfflineProducts, saveProductOffline } from '../utils/db';

const Inventory = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function syncAndLoadInventory() {
      // Step 1: Instant load local offline index
      const local = await getOfflineProducts();
      if (local.length > 0) setProducts(local);

      // Step 2: Fetch and update with dynamic online database
      try {
        const res = await API.get('/products');
        if (res.data.success) {
          setProducts(res.data.data);
          for (let p of res.data.data) {
            await saveProductOffline(p); // Sync to secure IndexedDB
          }
        }
      } catch (err) {
        console.log("Running in offline mode. Rendered from local cache storage.");
      }
    }
    syncAndLoadInventory();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4 dark:text-white text-slate-800">Product Stocks Ledger</h2>
      <div className="bg-white dark:bg-slate-900 shadow rounded-xl p-4">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-slate-400 text-sm">
              <th className="pb-2">SKU</th>
              <th className="pb-2">Name</th>
              <th className="pb-2">Stock</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.sku} className="border-b text-slate-700 dark:text-slate-300">
                <td className="py-2 font-mono text-sm">{p.sku}</td>
                <td className="py-2 font-semibold">{p.name}</td>
                <td className="py-2">{p.stock} Units</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventory;