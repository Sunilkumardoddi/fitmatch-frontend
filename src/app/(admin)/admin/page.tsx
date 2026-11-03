'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface AdminSizeChart {
  id: string;
  brand: string;
  category: string;
  cut: string;
  basis: string;
  version: number;
  status: 'PUBLISHED' | 'IN_REVIEW' | 'DRAFT';
  sourceUrl: string;
}

export default function AdminCatalogPage() {
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [charts, setCharts] = useState<AdminSizeChart[]>([
    { id: '1', brand: 'Snitch', category: "Men's Casual Shirts", cut: 'Slim', basis: 'GARMENT', version: 1, status: 'PUBLISHED', sourceUrl: 'snitch.co.in/pages/size-guide' },
    { id: '2', brand: 'The Souled Store', category: 'Crew Neck Tee', cut: 'Regular', basis: 'GARMENT', version: 1, status: 'PUBLISHED', sourceUrl: 'thesouledstore.com/size-guide' },
    { id: '3', brand: 'Allen Solly', category: 'Formal Dress Shirt', cut: 'Classic', basis: 'DUAL', version: 2, status: 'PUBLISHED', sourceUrl: 'allensolly.abfrl.in/sizechart' },
    { id: '4', brand: 'Beyoung', category: "Men's Chinos", cut: 'Slim', basis: 'GARMENT', version: 1, status: 'IN_REVIEW', sourceUrl: 'beyoung.in/size-guide/chinos' },
    { id: '5', brand: 'Bewakoof', category: 'Oversized T-Shirt', cut: 'Relaxed', basis: 'GARMENT', version: 1, status: 'DRAFT', sourceUrl: 'bewakoof.com/size-chart' },
  ]);

  const [notification, setNotification] = useState<string | null>(null);

  const approveChart = (id: string) => {
    const target = charts.find((c) => c.id === id);
    if (!target) return;

    setCharts(charts.map((c) => (c.id === id ? { ...c, status: 'PUBLISHED' } : c)));
    setNotification(`Chart for ${target.brand} (${target.category}) has been verified and published! Per ADR-008, it is now strictly immutable.`);
    setTimeout(() => setNotification(null), 5000);
  };

  const filteredCharts = charts.filter((c) => {
    const matchesFilter = filterStatus === 'ALL' || c.status === filterStatus;
    const matchesSearch = c.brand.toLowerCase().includes(searchQuery.toLowerCase()) || c.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Operator / Admin Portal
            </span>
            <span className="text-xs text-slate-500">&bull; ADR-008 Chart Governance</span>
          </div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 mt-2">
            Size Chart Verification & Lifecycle Queue
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Enforcing Draft &rarr; In Review &rarr; Published state transitions. Published versions cannot be mutated.
          </p>
        </div>

        <Link
          href="/"
          className="text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 px-4 py-3 rounded-xl transition min-h-[48px] flex items-center"
        >
          &larr; Return to Consumer Sizing
        </Link>
      </div>

      {notification && (
        <div role="status" className="bg-emerald-50 border border-emerald-300 p-4 rounded-2xl text-emerald-800 text-xs font-bold flex items-center justify-between">
          <span>✓ {notification}</span>
          <button type="button" onClick={() => setNotification(null)} className="text-emerald-700 hover:text-emerald-900 text-xs ml-4">
            ✕
          </button>
        </div>
      )}

      {/* Main Table Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 pb-4">
          {/* Status Filter Tabs */}
          <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-bold">
            {(['ALL', 'PUBLISHED', 'IN_REVIEW', 'DRAFT'] as const).map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setFilterStatus(st)}
                className={`py-2 px-3 rounded-lg transition min-h-[40px] ${
                  filterStatus === st ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {st === 'ALL' ? 'All Charts' : st.replace('_', ' ')}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="w-full md:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search brand or category..."
              className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-semibold outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-xs">
                <th className="py-3 px-3">Brand & Category</th>
                <th className="py-3 px-3">Cut & Silhouette</th>
                <th className="py-3 px-3">Dimension Basis</th>
                <th className="py-3 px-3">Version</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Source Provenance</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {filteredCharts.length > 0 ? (
                filteredCharts.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3.5 px-3 font-bold text-slate-900">
                      {c.brand}
                      <div className="text-xs text-slate-500 font-normal">{c.category}</div>
                    </td>
                    <td className="py-3.5 px-3 font-medium">{c.cut}</td>
                    <td className="py-3.5 px-3 font-mono font-semibold text-slate-700">{c.basis}</td>
                    <td className="py-3.5 px-3 font-mono">v{c.version}</td>
                    <td className="py-3.5 px-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          c.status === 'PUBLISHED'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : c.status === 'IN_REVIEW'
                            ? 'bg-amber-50 text-amber-800 border border-amber-200'
                            : 'bg-slate-100 text-slate-700 border border-slate-200'
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-slate-500 font-mono text-xs max-w-xs truncate">
                      {c.sourceUrl}
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      {c.status === 'IN_REVIEW' ? (
                        <button
                          type="button"
                          onClick={() => approveChart(c.id)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition shadow-sm min-h-[44px]"
                        >
                          Approve & Publish
                        </button>
                      ) : c.status === 'PUBLISHED' ? (
                        <span className="text-slate-400 text-xs italic font-medium">Immutable</span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => approveChart(c.id)}
                          className="text-indigo-600 hover:text-indigo-800 font-bold text-xs p-2 min-h-[44px]"
                        >
                          Submit Review
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500 text-xs font-semibold">
                    No size charts match the selected filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
