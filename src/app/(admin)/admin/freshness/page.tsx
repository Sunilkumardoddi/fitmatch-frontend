'use client';

import React, { useState, useEffect } from 'react';
import { adminApi, FreshnessAuditItem } from '../../../../lib/api/admin-api';
import { AdminHeader } from '../../../../components/admin/AdminHeader';
import { Clock, AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react';

export default function AdminFreshnessPage() {
  const [auditItems, setAuditItems] = useState<FreshnessAuditItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadAudit = async () => {
    setIsLoading(true);
    try {
      const data = await adminApi.getFreshnessAudit();
      setAuditItems(data);
    } catch {
      // Fallback
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAudit();
  }, []);

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Size Chart Freshness & Lifecycle Audit"
        subtitle="Automated monitoring of brand size chart freshness per OPS-001 (Charts > 365 days flagged as STALE)."
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase">
            <span>Verified Fresh</span>
            <CheckCircle className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">
            {auditItems.filter((i) => i.freshnessStatus === 'FRESH').length}
          </div>
          <p className="text-xs text-slate-500 mt-1">&lt; 90 days since verification</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase">
            <span>Aging Review</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">
            {auditItems.filter((i) => i.freshnessStatus === 'AGING').length}
          </div>
          <p className="text-xs text-slate-500 mt-1">90 &ndash; 365 days old</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase">
            <span>Stale / Audit Required</span>
            <AlertTriangle className="w-4 h-4 text-red-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">
            {auditItems.filter((i) => i.freshnessStatus === 'STALE').length}
          </div>
          <p className="text-xs text-slate-500 mt-1">&gt; 365 days (Action required)</p>
        </div>
      </div>

      {/* Freshness Audit Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-sm font-black text-slate-900">Brand Chart Freshness Registry</h2>
          <button
            type="button"
            onClick={loadAudit}
            className="flex items-center space-x-1.5 text-xs text-slate-600 hover:text-slate-900 font-bold p-2 min-h-[40px]"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Re-run Audit</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-xs">
                <th className="py-3 px-3">Brand & Category</th>
                <th className="py-3 px-3">Age (Days)</th>
                <th className="py-3 px-3">Last Verified</th>
                <th className="py-3 px-3">Freshness Status</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {auditItems.map((item) => (
                <tr key={item.chartId} className="hover:bg-slate-50 transition">
                  <td className="py-3.5 px-3 font-bold text-slate-900">
                    {item.brandName}
                    <div className="text-xs text-slate-500 font-normal">{item.categoryName}</div>
                  </td>
                  <td className="py-3.5 px-3 font-mono font-semibold">{item.ageDays}d</td>
                  <td className="py-3.5 px-3 text-slate-600 font-mono">{item.lastVerifiedAt}</td>
                  <td className="py-3.5 px-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        item.freshnessStatus === 'FRESH'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : item.freshnessStatus === 'AGING'
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : 'bg-red-50 text-red-800 border border-red-200'
                      }`}
                    >
                      {item.freshnessStatus}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <button
                      type="button"
                      className="text-xs font-bold text-indigo-600 hover:text-indigo-800 p-2 min-h-[40px]"
                    >
                      Audit Chart &rarr;
                    </button>
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

