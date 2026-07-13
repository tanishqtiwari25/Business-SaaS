import React, { useState } from 'react';

const Reports = () => {
  // Mock data representing supplier payment due cycles
  const [suppliers] = useState([
    { id: 'SUP-001', company: 'Raman Distributors', contact: '9876543210', due: 45000, status: 'DUE' },
    { id: 'SUP-002', company: 'Krishna Agro Tech', contact: '9911223344', due: 0, status: 'PAID' },
    { id: 'SUP-003', company: 'Balaji Plastics', contact: '9440055667', due: 12500, status: 'PARTIAL' }
  ]);

  return (
    <div className="p-8 min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Supplier Outstandings & Ledgers</h2>
          <p className="text-xs text-slate-400 font-medium">B2B vendor payables audit matrix</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-400 text-sm border-b dark:border-slate-800">
              <th className="p-4">Vendor ID</th>
              <th className="p-4">Supplier Name</th>
              <th className="p-4">Contact</th>
              <th className="p-4">Outstanding Due</th>
              <th className="p-4">Status Flag</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
            {suppliers.map((sup) => (
              <tr key={sup.id} className="hover:bg-indigo-50/20 dark:hover:bg-slate-800/40 transition-colors">
                <td className="p-4 font-mono text-sm text-slate-500">{sup.id}</td>
                <td className="p-4 font-bold text-slate-900 dark:text-white">{sup.company}</td>
                <td className="p-4 font-medium">{sup.contact}</td>
                <td className="p-4 font-black text-slate-900 dark:text-white">₹{sup.due.toLocaleString('en-IN')}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                    sup.status === 'PAID' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400' :
                    sup.status === 'DUE' ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/40 dark:text-rose-400' :
                    'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400'
                  }`}>
                    {sup.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;