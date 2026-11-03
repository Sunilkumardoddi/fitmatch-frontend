'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { AdminAuthProvider, AdminAuthGuard } from '../../../lib/auth/admin-guard';
import { AdminSidebar } from '../../../components/admin/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  return (
    <AdminAuthProvider>
      {isLoginPage ? (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
          {children}
        </div>
      ) : (
        <AdminAuthGuard>
          <div className="flex min-h-screen bg-slate-100 text-slate-900">
            <AdminSidebar />
            <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
              <main className="flex-1 p-8">{children}</main>
            </div>
          </div>
        </AdminAuthGuard>
      )}
    </AdminAuthProvider>
  );
}

