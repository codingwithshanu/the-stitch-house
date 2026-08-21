'use client';

import React from 'react';
import { Menu, Sparkles, User } from 'lucide-react';

interface AdminHeaderProps {
  onOpenMobileMenu: () => void;
  adminName?: string;
}

export default function AdminHeader({
  onOpenMobileMenu,
  adminName = 'Neelima',
}: AdminHeaderProps) {
  return (
    <header className="bg-white border-b border-cream-200 px-4 sm:px-8 py-4 flex items-center justify-between sticky top-0 z-30 shadow-sm">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          type="button"
          className="lg:hidden p-2 rounded-lg text-charcoal-700 hover:bg-cream-100 focus:outline-none"
          aria-label="Open sidebar menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <span className="font-serif text-lg font-bold text-rosewood-900 hidden sm:inline">
            The Stitch House
          </span>
          <span className="text-xs text-charcoal-400 font-medium hidden sm:inline">•</span>
          <span className="text-xs text-charcoal-500 font-medium">Boutique Management</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-cream-100 border border-cream-200 text-xs font-semibold text-charcoal-800">
          <div className="w-6 h-6 rounded-full bg-rosewood-800 text-white flex items-center justify-center text-xs">
            {adminName.charAt(0)}
          </div>
          <span>{adminName}</span>
        </div>
      </div>
    </header>
  );
}
