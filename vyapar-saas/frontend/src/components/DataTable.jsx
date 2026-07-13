import React from 'react';

const DataTable = ({ columns, data }) => {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-slate-200/60 bg-white dark:bg-slate-900">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b bg-slate-50 dark:bg-slate-800/40 text-slate-400 text-xs font-bold tracking-wider uppercase">
            {columns.map((col, index) => <th key={index} className="p-4">{col}</th>)}
          </tr>
        </thead>
        <tbody className="divide-y text-slate-700 dark:text-slate-300 text-sm font-medium">
          {data.length === 0 ? (
            <tr><td colSpan={columns.length} className="text-center py-12 text-slate-400">Database rows empty.</td></tr>
          ) : (
            data.map((row, rIndex) => (
              <tr key={rIndex} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors">
                {Object.values(row).map((val, cIndex) => <td key={cIndex} className="p-4">{val}</td>)}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;