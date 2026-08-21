'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Shirt,
  PlusCircle,
  FolderTree,
  Inbox,
  Instagram,
  Settings,
  ExternalLink,
  LogOut,
  Sparkles,
  Scissors,
} from 'lucide-react';

interface AdminSidebarProps {
  onCloseMobile?: () => void;
}

export default function AdminSidebar({ onCloseMobile }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (e) {
      console.error('Logout error:', e);
    }
  };

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'All Products', href: '/admin/products', icon: Shirt },
    { name: 'Add New Product', href: '/admin/products/new', icon: PlusCircle },
    { name: 'Categories', href: '/admin/categories', icon: FolderTree },
    { name: '💄 Glam by Neelima', href: '/admin/glam', icon: Sparkles },
    { name: 'Inquiries Inbox', href: '/admin/inquiries', icon: Inbox },
    { name: 'Instagram Feed', href: '/admin/instagram', icon: Instagram },
    { name: 'Boutique Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-charcoal-950 text-white min-h-screen flex flex-col justify-between border-r border-charcoal-800">
      <div>
        {/* Brand Header */}
        <div className="p-6 border-b border-charcoal-800">
          <Link
            href="/admin"
            className="block"
            onClick={onCloseMobile}
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-rosewood-800 flex items-center justify-center text-white">
                <Scissors className="w-4 h-4" />
              </div>
              <span className="font-serif text-lg font-bold text-white tracking-tight">
                The Stitch House
              </span>
            </div>
            <p className="text-[10px] text-gold-400 font-sans tracking-widest uppercase mt-1 pl-10">
              Admin CMS • Neelima
            </p>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === '/admin'
                ? pathname === '/admin'
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onCloseMobile}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors ${
                  isActive
                    ? 'bg-rosewood-800 text-white shadow-sm'
                    : 'text-charcoal-300 hover:text-white hover:bg-charcoal-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Footer Actions */}
      <div className="p-4 border-t border-charcoal-800 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs text-charcoal-300 hover:text-gold-300 hover:bg-charcoal-900 transition-colors"
        >
          <span className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>View Public Store</span>
          </span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        <button
          onClick={handleLogout}
          type="button"
          className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rosewood-300 hover:bg-rosewood-950 hover:text-rosewood-200 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout Admin</span>
        </button>
      </div>
    </aside>
  );
}
