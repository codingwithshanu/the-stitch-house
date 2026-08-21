'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { MessageCircle, Phone, Instagram } from 'lucide-react';
import { generateGeneralWhatsAppLink } from '@/lib/whatsapp';

export default function FloatingActions() {
  const pathname = usePathname();

  // Hide on admin routes
  if (pathname.startsWith('/admin')) {
    return null;
  }

  const whatsappLink = generateGeneralWhatsAppLink();

  return (
    <aside aria-label="Quick contact" className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-cream-200 px-4 py-2.5 shadow-2xl flex items-center justify-between gap-3">
      {/* Call Button */}
      <a
        href="tel:+919876543210"
        className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-full bg-cream-100 text-charcoal-800 text-xs font-semibold uppercase tracking-wider border border-cream-300 hover:bg-cream-200 active:scale-95 transition-all"
      >
        <Phone className="w-4 h-4 text-charcoal-700" />
        <span>Call</span>
      </a>

      {/* Instagram Button */}
      <a
        href="https://instagram.com/stitch_by_neelima"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center p-2.5 rounded-full bg-cream-100 text-[#E1306C] border border-cream-300 active:scale-95 transition-all"
        aria-label="Instagram"
      >
        <Instagram className="w-4 h-4" />
      </a>

      {/* WhatsApp Button (Prominent) */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-[2] flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold uppercase tracking-wider shadow-md active:scale-95 transition-all"
      >
        <MessageCircle className="w-4 h-4 text-white fill-white" />
        <span>Chat on WhatsApp</span>
      </a>
    </aside>
  );
}
