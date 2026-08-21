'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Instagram,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Sparkles,
  Heart,
  Lock,
} from 'lucide-react';
import { generateGeneralWhatsAppLink } from '@/lib/whatsapp';

export default function Footer() {
  const pathname = usePathname();

  // Hide footer on admin pages
  if (pathname.startsWith('/admin')) {
    return null;
  }

  const whatsappLink = generateGeneralWhatsAppLink();

  return (
    <footer className="bg-charcoal-900 text-charcoal-100 border-t border-gold-600/30 pt-16 pb-24 md:pb-12 mt-20 relative overflow-hidden">
      {/* Decorative subtle background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-rosewood-950/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold-900/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-charcoal-800">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white">
                The Stitch House
              </span>
              <p className="text-xs font-sans tracking-widest uppercase text-gold-400 mt-0.5 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-gold-400" />
                By Designer Neelima • Indore
              </p>
            </Link>

            <p className="text-sm text-charcoal-300 leading-relaxed">
              &ldquo;Made with Precision, Worn with Confidence.&rdquo; Bespoke women’s tailoring, couture bridal lehengas, hand-embroidered blouses, and custom alterations in Indore.
            </p>

            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://instagram.com/stitch_by_neelima"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-charcoal-800 hover:bg-[#E1306C] flex items-center justify-center text-white transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-charcoal-800 hover:bg-emerald-600 flex items-center justify-center text-white transition-colors duration-200"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gold-300 font-sans">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm text-charcoal-300">
              <li>
                <Link href="/" className="hover:text-gold-300 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/collections" className="hover:text-gold-300 transition-colors">
                  All Collections
                </Link>
              </li>
              <li>
                <Link href="/custom-stitching" className="hover:text-gold-300 transition-colors">
                  Custom Tailoring & Stitching
                </Link>
              </li>
              <li>
                <Link href="/glam-by-neelima" className="text-gold-300 hover:text-white transition-colors font-medium">
                  💄 Neelima Makeup Art (@glam_by_neelima)
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-gold-300 transition-colors">
                  About Neelima & Boutique
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold-300 transition-colors">
                  Contact & Directions
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gold-300 font-sans">
              Boutique Services
            </h4>
            <ul className="space-y-2.5 text-sm text-charcoal-300">
              <li>
                <Link href="/collections/designer-blouses" className="hover:text-gold-300 transition-colors">
                  Designer Blouses
                </Link>
              </li>
              <li>
                <Link href="/collections/lehengas" className="hover:text-gold-300 transition-colors">
                  Bridal & Festive Lehengas
                </Link>
              </li>
              <li>
                <Link href="/collections/salwar-suits" className="hover:text-gold-300 transition-colors">
                  Salwar Suits & Anarkalis
                </Link>
              </li>
              <li>
                <Link href="/collections/dresses" className="hover:text-gold-300 transition-colors">
                  Indo-Western & Gowns
                </Link>
              </li>
              <li>
                <Link href="/collections/girls-wear" className="hover:text-gold-300 transition-colors">
                  Girls’ Ethnic Wear
                </Link>
              </li>
              <li>
                <Link href="/custom-stitching" className="hover:text-gold-300 transition-colors">
                  Precision Alterations
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Studio */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gold-300 font-sans">
              Boutique Studio
            </h4>
            <ul className="space-y-3 text-sm text-charcoal-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-400 mt-1 flex-shrink-0" />
                <span>Near 56 Dukan, New Palasia, Indore, Madhya Pradesh 452001</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <a href="tel:+919876543210" className="hover:text-gold-300">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-gold-400 mt-1 flex-shrink-0" />
                <span>Mon - Sat: 10:30 AM - 8:00 PM<br />Sunday: By Appointment</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-charcoal-400">
          <p className="flex items-center gap-1 text-center sm:text-left">
            © {new Date().getFullYear()} The Stitch House. Crafted with{' '}
            <Heart className="w-3.5 h-3.5 text-rosewood-500 fill-rosewood-500 inline" /> for fashion lovers in Indore.
          </p>

          <div className="flex items-center space-x-6">
            <Link
              href="/admin/login"
              className="text-charcoal-400 hover:text-gold-300 flex items-center gap-1.5 transition-colors"
            >
              <Lock className="w-3 h-3" />
              <span>Admin Login</span>
            </Link>
            <a
              href="https://instagram.com/stitch_by_neelima"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold-300 transition-colors"
            >
              @stitch_by_neelima
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
