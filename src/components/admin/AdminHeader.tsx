'use client';

import React from 'react';
import { useAdminAuth } from '../../lib/auth/admin-guard';

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
}

export function AdminHeader({ title, subtitle }: AdminHeaderProps) {
  const { operator } = useAdminAuth();

  return (
    <header className="bg-white border-b border-slate-200 px-8 py-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-xl font-black text-slate-900 tracking-tight">{title}</h1>
        {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
      </div>

      <div className="flex items-center space-x-3 text-xs font-semibold">
        <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-slate-700">API: Connected (Port 4000)</span>
        </div>
        <div className="bg-indigo-50 text-indigo-700 border border-indigo-200 px-3 py-1.5 rounded-xl font-mono text-xs">
          Role: {operator?.role || 'PLATFORM_ADMIN'}
        </div>
      </div>
    </header>
  );
}

