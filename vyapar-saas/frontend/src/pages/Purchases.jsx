import React, { useState } from 'react';
import DataTable from '../components/DataTable';

const Purchases = () => {
  const [purchaseHistory] = useState([
    { id: 'P-908', supplier: 'Mahadev Wholesalers', amount: '₹89,000', gst: '₹16,020', status: 'PAID' }
  ]);

  return (
    <div className="p-8 min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Purchase Orders Logs</h2>
          <p className="text-xs text-slate-400">Incoming inventory logistics validation registry</p>
        </div>
      </div>
      <DataTable 
        columns={['Reference ID', 'Supplier Unit name', 'Net Total amount', 'GST breakdown', 'Log Status']} 
        data={purchaseHistory} 
      />
    </div>
  );
};

export default Purchases;