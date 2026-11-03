'use client';

import React, { useState, useEffect } from 'react';
import { adminApi, AdminSizeChartSummary } from '../../../lib/api/admin-api';
import { AdminHeader } from '../../../components/admin/AdminHeader';
import { Search, Filter, CheckCircle2, Send, Lock, AlertCircle, RefreshCw } from 'lucide-react';

export default function AdminCatalogQueuePage() {
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [charts, setCharts] = useState<AdminSizeChartSummary[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [notification, setNotification] = useState<string | null>(null);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await adminApi.getCharts();
      setCharts(data);
    } catch (err: any) {
      setNotification(`Failed to load charts from backend: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handlePublish = async (id: string, brand: string, category: string) => {
    const res = await adminApi.publishChart(id);
    if (res.success) {
      setCharts((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: 'PUBLISHED' } : c))
      );
      setNotification(`Chart for ${brand} (${category}) published. Immutability locked per ADR-008.`);
      setTimeout(() => setNotification(null), 5000);
    }
  };

  const handleSubmitReview = async (id: string) => {
    const res = await adminApi.submitForReview(id);
    if (res.success) {
      setCharts((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: 'IN_REVIEW' } : c))
      );
      setNotification(`Chart submitted for review.`);
      setTimeout(() => setNotification(null), 5000);
    }
  };

  const filteredCharts = charts.filter((c) => {
    const matchesFilter = filterStatus === 'ALL' || c.status === filterStatus;
    const matchesSearch =
      c.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Size Chart Verification & Lifecycle Queue"
        subtitle="Manage brand charts, state transitions (Draft → In Review → Published), and enforce ADR-008 immutability."
      />

      {notification && (
        <div
          role="status"
          className="bg-emerald-50 border border-emerald-300 p-4 rounded-2xl text-emerald-800 text-xs font-bold flex items-center justify-between shadow-sm animate-in fade-in"
        >
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{notification}</span>
          </div>
          <button
            type="button"
            onClick={() => setNotification(null)}
            className="text-emerald-700 hover:text-emerald-900 text-xs ml-4"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Filter & Table Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 pb-4">
          {/* Status Tabs */}
          <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-bold">
            {(['ALL', 'PUBLISHED', 'IN_REVIEW', 'DRAFT'] as const).map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setFilterStatus(st)}
                className={`py-2 px-3 rounded-lg transition min-h-[40px] ${
                  filterStatus === st
                    ? 'bg-white text-indigo-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {st === 'ALL' ? 'All Charts' : st.replace('_', ' ')}
              </button>
            ))}
          </div>

          {/* Search Bar & Refresh */}
          <div className="flex items-center space-x-2 w-full md:w-auto">
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter brand or category..."
                className="w-full pl-9 pr-3.5 py-2 border border-slate-300 rounded-xl text-xs font-semibold outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
            <button
              type="button"
              onClick={loadData}
              title="Refresh queue"
              className="p-2 border border-slate-300 hover:bg-slate-50 text-slate-600 rounded-xl transition min-h-[40px] min-w-[40px] flex items-center justify-center"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
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
                <th className="py-3 px-3">Provenance Source</th>
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
                          onClick={() => handlePublish(c.id, c.brand, c.category)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition shadow-sm min-h-[44px] flex items-center space-x-1.5 ml-auto"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Approve & Publish</span>
                        </button>
                      ) : c.status === 'PUBLISHED' ? (
                        <span className="text-slate-400 text-xs italic font-medium inline-flex items-center space-x-1">
                          <Lock className="w-3 h-3" />
                          <span>Locked (Immutable)</span>
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleSubmitReview(c.id)}
                          className="text-indigo-600 hover:text-indigo-800 font-bold text-xs p-2 min-h-[44px] inline-flex items-center space-x-1"
                        >
                          <Send className="w-3 h-3" />
                          <span>Submit Review</span>
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500 text-xs font-semibold">
                    {isLoading ? 'Loading charts from catalog...' : 'No size charts match the selected filter.'}
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
