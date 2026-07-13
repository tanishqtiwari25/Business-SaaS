import React, { useState, useEffect } from 'react';
import PremiumScanner from '../components/PremiumScanner';
import { getOfflineProducts } from '../utils/db';
import { useOfflineSync } from '../hooks/useOfflineSync';

const POSBilling = () => {
  const { isOnline } = useOfflineSync();
  const [billItems, setBillItems] = useState([]);
  const [localRegistry, setLocalRegistry] = useState([]);

  useEffect(() => {
    async function pullRegistry() {
      const records = await getOfflineProducts();
      setLocalRegistry(records);
    }
    pullRegistry();
  }, []);

  const executeBarcodeAction = (barcodeString) => {
    const match = localRegistry.find(item => item.sku === barcodeString || item.barcode === barcodeString);
    if (match) {
      setBillItems((prev) => {
        const matchedIndex = prev.findIndex(i => i.sku === match.sku);
        if (matchedIndex > -1) {
          const updated = [...prev];
          updated[matchedIndex].qty += 1;
          return updated;
        }
        return [...prev, { ...match, qty: 1 }];
      });
    } else {
      alert(`Item containing tag ID: ${barcodeString} not initialized inside cache index.`);
    }
  };

  const computeGrandTotal = () => billItems.reduce((acc, current) => acc + (current.sellingPrice * current.qty), 0);

  return (
    <div className="p-8 min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-black text-slate-800 dark:text-white">Point of Sale (POS Terminal)</h2>
          <p className="text-xs text-slate-400 font-medium">B2B/B2C Real-time checkout architecture</p>
        </div>
        <div className={`text-xs font-black tracking-widest uppercase py-1.5 px-4 rounded-full ${isOnline ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
          ● Network Connection: {isOnline ? 'Active Hybrid Cloud' : 'Isolated Offline LocalDB'}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <PremiumScanner onScanSuccess={executeBarcodeAction} />
        </div>
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border p-6 shadow-sm">
          <h3 className="font-bold text-slate-800 dark:text-white border-b pb-3 mb-4 text-md">Items Registered inside Active Cart</h3>
          
          {billItems.length === 0 ? (
            <div className="text-center text-slate-400 py-16 text-sm font-medium">No inventory elements queued inside billing parameters.</div>
          ) : (
            <div className="space-y-4">
              {billItems.map((item) => (
                <div key={item.sku} className="flex justify-between items-center border-b pb-3 text-slate-700 dark:text-slate-300">
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">{item.name}</h4>
                    <span className="text-xs text-slate-400 font-mono font-semibold">{item.sku}</span>
                  </div>
                  <div className="flex gap-12 items-center">
                    <span className="text-sm font-medium">Qty: <b className="text-indigo-600 dark:text-indigo-400">{item.qty}</b></span>
                    <span className="font-bold text-slate-900 dark:text-white">₹{item.sellingPrice * item.qty}</span>
                  </div>
                </div>
              ))}
              <div className="flex justify-between items-center pt-4 font-black text-lg text-slate-900 dark:text-white">
                <span>Total Due:</span>
                <span className="text-2xl text-emerald-600 dark:text-emerald-400">₹{computeGrandTotal()}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default POSBilling;