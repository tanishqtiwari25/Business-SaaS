import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  // Mock metrics mirroring standard client enterprise ledger distribution 
  const salesStreamData = [
    { month: 'Jan', revenue: 45000, profit: 12000 },
    { month: 'Feb', revenue: 52000, profit: 15000 },
    { month: 'Mar', revenue: 61000, profit: 19000 },
    { month: 'Apr', revenue: 58000, profit: 17500 },
    { month: 'May', revenue: 73000, profit: 24000 },
    { month: 'Jun', revenue: 89000, profit: 31000 }
  ];

  const cards = [
    { title: 'Total Revenue Stream', count: '₹3,78,000', delta: '+14% target scale', color: 'text-indigo-600' },
    { title: 'Gross Profit Index', count: '₹1,18,500', delta: '+8.2% vs last month', color: 'text-emerald-600' },
    { title: 'Active Inventory Value', count: '₹2,40,900', delta: 'Low-stock flags: 0', color: 'text-amber-600' }
  ];

  return (
    <div className="p-8 min-h-screen bg-slate-50 dark:bg-slate-950">
      <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">Executive Business Insights</h2>

      {/* Numerical Metrics Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {cards.map((c, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{c.title}</span>
            <h3 className={`text-3xl font-black tracking-tight ${c.color} my-2`}>{c.count}</h3>
            <span className="text-xs font-semibold text-slate-500">{c.delta}</span>
          </div>
        ))}
      </div>

      {/* Advanced Revenue Area Chart Visualization */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-sm">
        <h3 className="font-bold text-slate-800 dark:text-white mb-4 text-md">Revenue and Operational Profit Trajectory</h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={salesStreamData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;