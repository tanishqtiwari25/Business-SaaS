import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { getOfflineProducts, saveProductOffline } from '../utils/db';

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ sku: '', name: '', stock: '' });

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

  // Handle Add Product Form Submit
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/products', formData);
      if (res.data.success || res.status === 201) {
        const newProduct = res.data.data || formData;
        setProducts(prev => [...prev, newProduct]);
        await saveProductOffline(newProduct);
        
        // Reset form & close modal
        setFormData({ sku: '', name: '', stock: '' });
        setIsModalOpen(false);
      }
    } catch (err) {
      console.error("Error adding product:", err);
      alert("Product add nahi ho paya. Please check connection.");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold dark:text-white text-slate-800">Product Stocks Ledger</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium shadow-md transition"
        >
          + Add Product
        </button>
      </div>

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
            {products.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center py-4 text-slate-500">No products found.</td>
              </tr>
            ) : (
              products.map((p, index) => (
                <tr key={p._id || p.sku || index} className="border-b text-slate-700 dark:text-slate-300">
                  <td className="py-2 font-mono text-sm">{p.sku}</td>
                  <td className="py-2 font-semibold">{p.name}</td>
                  <td className="py-2">{p.stock} Units</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl w-96 shadow-xl">
            <h3 className="text-lg font-bold mb-4 dark:text-white">Add New Product</h3>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400">SKU</label>
                <input
                  type="text"
                  required
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  className="w-full mt-1 p-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                  placeholder="e.g. SKU123"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400">Product Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full mt-1 p-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                  placeholder="e.g. Sugar 1kg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400">Stock Quantity</label>
                <input
                  type="number"
                  required
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  className="w-full mt-1 p-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                  placeholder="e.g. 50"
                />
              </div>
              <div className="flex justify-end space-x-2 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-300 dark:bg-slate-700 rounded-lg text-slate-800 dark:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;