'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function AdminCatalogPage() {
  const [charts, setCharts] = useState([
    { id: '1', brand: 'Snitch', category: "Men's Casual Shirts", cut: 'Slim', basis: 'GARMENT', version: 1, status: 'PUBLISHED' },
    { id: '2', brand: 'The Souled Store', category: 'Crew Neck Tee', cut: 'Regular', basis: 'GARMENT', version: 1, status: 'PUBLISHED' },
    { id: '3', brand: 'Allen Solly', category: 'Formal Dress Shirt', cut: 'Classic', basis: 'DUAL', version: 2, status: 'PUBLISHED' },
    { id: '4', brand: 'Beyoung', category: "Men's Chinos", cut: 'Slim', basis: 'GARMENT', version: 1, status: 'IN_REVIEW' },
  ]);

  const approveChart = (id: string) => {
    setCharts(charts.map(c => c.id === id ? { ...c, status: 'PUBLISHED' } : c));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
              Role: OPERATOR / ADMIN
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Size Chart Governance & Review Queue
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Enforcing ADR-008 (Draft &rarr; Review &rarr; Published; Published versions are immutable).
          </p>
        </div>
        <Link
          href="/"
          className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold"
        >
          &larr; Back to Consumer Sizing
        </Link>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
          Chart Registry
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase text-[10px]">
                <th className="py-2.5 px-3">Brand & Category</th>
                <th className="py-2.5 px-3">Cut</th>
                <th className="py-2.5 px-3">Basis</th>
                <th className="py-2.5 px-3">Version</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {charts.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/70">
                  <td className="py-3 px-3 font-bold text-slate-900">
                    {c.brand}
                    <div className="text-[11px] text-slate-400 font-normal">{c.category}</div>
                  </td>
                  <td className="py-3 px-3">{c.cut}</td>
                  <td className="py-3 px-3 font-mono font-semibold">{c.basis}</td>
                  <td className="py-3 px-3">v{c.version}</td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${c.status === 'PUBLISHED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    {c.status === 'IN_REVIEW' ? (
                      <button
                        onClick={() => approveChart(c.id)}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-[11px] px-3 py-1 rounded-lg transition shadow-sm"
                      >
                        Approve & Publish
                      </button>
                    ) : (
                      <span className="text-slate-400 text-[11px] italic">Immutable</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

