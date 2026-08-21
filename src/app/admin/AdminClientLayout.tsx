'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import { AdminPayload } from '@/lib/auth';
import { X } from 'lucide-react';

interface AdminClientLayoutProps {
  children: React.ReactNode;
  initialAdmin: AdminPayload | null;
}

export default function AdminClientLayout({
  children,
  initialAdmin,
}: AdminClientLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [admin, setAdmin] = useState<AdminPayload | null>(initialAdmin);

  const isLoginPage = pathname === '/admin/login';

  // Client side guard - hooks must always execute unconditionally
  useEffect(() => {
    if (!initialAdmin && !isLoginPage) {
      router.push('/admin/login');
    }
  }, [initialAdmin, isLoginPage, router]);

  useEffect(() => {
    setAdmin(initialAdmin);
  }, [initialAdmin]);

  // If on login page, render children directly without admin layout
  if (isLoginPage) {
    return <>{children}</>;
  }

  if (!admin && !initialAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-cream-50 flex">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block flex-shrink-0">
        <AdminSidebar />
      </div>

      {/* Mobile Sidebar Overlay Drawer */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-charcoal-950/60 backdrop-blur-sm"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative z-10 w-64 bg-charcoal-950 flex flex-col">
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="absolute top-4 right-4 p-2 text-charcoal-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <AdminSidebar onCloseMobile={() => setMobileSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader
          onOpenMobileMenu={() => setMobileSidebarOpen(true)}
          adminName={admin?.name || initialAdmin?.name || 'Neelima'}
        />
        <main className="p-4 sm:p-6 lg:p-8 flex-1">{children}</main>
      </div>
    </div>
  );
}
