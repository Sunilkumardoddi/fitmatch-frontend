'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Layers, UploadCloud, Clock, ShieldAlert, LogOut } from 'lucide-react';
import { useAdminAuth } from '../../lib/auth/admin-guard';

export function AdminSidebar() {
  const pathname = usePathname();
  const { operator, logout } = useAdminAuth();

  const navItems = [
    { label: 'Size Chart Queue', href: '/admin', icon: Layers },
    { label: 'Data Ops & CSV Import', href: '/admin/data-ops', icon: UploadCloud },
    { label: 'Chart Freshness Audit', href: '/admin/freshness', icon: Clock },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col min-h-screen border-r border-slate-800">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-black text-xs">
            FM
          </div>
          <span className="font-black text-white text-base tracking-tight">FitMatch Ops</span>
        </div>
        <div className="mt-2 flex items-center space-x-2">
          <span className="bg-amber-400/10 text-amber-400 border border-amber-400/30 text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wider">
            Operator Portal
          </span>
          <span className="text-xs text-slate-500 font-mono">ADR-008</span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-1">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-500 px-3 py-2">
          Catalog Governance
        </div>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-bold transition min-h-[44px] ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Operator User Footer */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/40">
        <div className="flex items-center justify-between mb-3">
          <div className="truncate">
            <div className="text-xs font-bold text-white truncate">{operator?.name || 'Operator'}</div>
            <div className="text-xs text-slate-500 truncate">{operator?.email || 'admin@fitmatch.in'}</div>
          </div>
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs px-2 py-0.5 rounded font-mono">
            {operator?.role === 'PLATFORM_ADMIN' ? 'ADMIN' : 'MERCHANT'}
          </span>
        </div>

        <button
          type="button"
          onClick={logout}
          className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-slate-800 hover:bg-red-950/50 hover:text-red-400 hover:border-red-800 text-slate-400 rounded-xl text-xs font-bold border border-slate-700/80 transition min-h-[44px]"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}

