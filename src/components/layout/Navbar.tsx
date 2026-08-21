'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Instagram, MessageCircle, Sparkles } from 'lucide-react';
import { generateGeneralWhatsAppLink } from '@/lib/whatsapp';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Collections', href: '/collections' },
    { name: 'Custom Stitching', href: '/custom-stitching' },
    { name: 'Makeup & Hair', href: '/glam-by-neelima', badge: 'Glam' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  // Don't show public navbar on admin pages
  if (pathname.startsWith('/admin')) {
    return null;
  }

  const whatsappLink = generateGeneralWhatsAppLink();

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass-nav shadow-sm py-3 border-b border-gold-200/50'
          : 'bg-cream-50/95 backdrop-blur-md py-4 border-b border-cream-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="group flex flex-col">
            <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-rosewood-900 group-hover:text-rosewood-700 transition-colors">
              The Stitch House
            </span>
            <span className="text-[10px] sm:text-[11px] font-sans font-medium tracking-widest uppercase text-gold-600 -mt-1 flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-gold-500" />
              Boutique & Tailoring • Indore
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-2 text-sm font-medium rounded-full transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? 'text-rosewood-900 bg-rosewood-50/80 font-semibold'
                      : 'text-charcoal-700 hover:text-rosewood-800 hover:bg-cream-100'
                  }`}
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded-full bg-gold-100 text-gold-800 border border-gold-300">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Actions: Instagram & WhatsApp */}
          <div className="hidden md:flex items-center space-x-3">
            <a
              href="https://instagram.com/stitch_by_neelima"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full text-charcoal-700 hover:text-rosewood-700 hover:bg-rosewood-50 transition-colors flex items-center gap-1.5 text-xs font-medium"
              title="Follow @stitch_by_neelima on Instagram"
            >
              <Instagram className="w-4 h-4 text-[#E1306C]" />
              <span className="hidden lg:inline text-charcoal-600">@stitch_by_neelima</span>
            </a>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-rosewood-800 hover:bg-rosewood-900 rounded-full shadow-sm hover:shadow transition-all duration-200"
            >
              <MessageCircle className="w-3.5 h-3.5 text-green-400 fill-green-400" />
              <span>Book / Enquire</span>
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-rosewood-800 hover:bg-rosewood-50 rounded-full"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-5 h-5 text-emerald-600 fill-emerald-600" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2 rounded-lg text-charcoal-800 hover:bg-cream-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-rosewood-800" />
              ) : (
                <Menu className="w-6 h-6 text-charcoal-800" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-cream-50/98 backdrop-blur-lg border-b border-gold-200/60 px-4 pt-3 pb-6 space-y-3 shadow-xl animate-fadeIn">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-3 text-base font-medium rounded-xl transition-colors ${
                    isActive
                      ? 'text-rosewood-900 bg-rosewood-100/60 font-semibold'
                      : 'text-charcoal-800 hover:bg-cream-200/50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-cream-200 space-y-2.5">
            <a
              href="https://instagram.com/stitch_by_neelima"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 text-sm font-medium text-charcoal-800 bg-cream-100 hover:bg-rosewood-50 rounded-xl border border-cream-200"
            >
              <Instagram className="w-4 h-4 text-[#E1306C]" />
              <span>Follow @stitch_by_neelima on Instagram</span>
            </a>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 px-4 text-sm font-semibold uppercase tracking-wider text-white bg-rosewood-800 hover:bg-rosewood-900 rounded-xl shadow"
            >
              <MessageCircle className="w-4 h-4 text-green-400 fill-green-400" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
