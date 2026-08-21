'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Sparkles,
  Heart,
  Instagram,
  MessageCircle,
  Phone,
  Calendar,
  Clock,
  CheckCircle2,
  MapPin,
  Send,
  AlertCircle,
  ArrowRight,
  Scissors,
  Star,
} from 'lucide-react';
import { generateMakeupWhatsAppLink } from '@/lib/whatsapp';
import { MakeupServiceItem, MakeupPortfolioItem, SiteSettingsItem } from '@/types';

interface GlamClientProps {
  settings: SiteSettingsItem | null;
  services: MakeupServiceItem[];
  portfolio: MakeupPortfolioItem[];
}

export default function GlamClient({ settings, services, portfolio }: GlamClientProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    eventDate: '',
    serviceType: 'Bridal HD Makeup',
    venue: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const glamPhone = settings?.glamPhone || '+91 90743 71984';
  const glamWhatsapp = settings?.glamWhatsappNumber || '919074371984';
  const glamInstaHandle = settings?.glamInstagramHandle || 'glam_by_neelima';
  const glamInstaUrl = settings?.glamInstagramUrl || 'https://instagram.com/glam_by_neelima';
  const glamBio =
    settings?.glamBio ||
    'Professional Bridal & Party Makeup Artist and Hairstylist based in Indore. Specializing in flawless HD Makeup, Dewy Skin, and Contemporary Hairstyling.';

  const filteredPortfolio = portfolio.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  const categoriesList = ['all', 'Bridal', 'Engagement', 'Party', 'Hairstyles'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const fullMessage = `[Makeup Booking Request]\nService: ${formData.serviceType}\nDate: ${
        formData.eventDate || 'Not specified'
      }\nVenue/Location: ${formData.venue || 'Indore'}\nDetails: ${formData.message}`;

      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          serviceType: `Makeup: ${formData.serviceType}`,
          message: fullMessage,
        }),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({
          name: '',
          phone: '',
          eventDate: '',
          serviceType: 'Bridal HD Makeup',
          venue: '',
          message: '',
        });
      } else {
        const data = await res.json();
        setStatus('error');
        setErrorMessage(data.error || 'Failed to submit makeup inquiry');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Network error. Please reach out on WhatsApp directly.');
    }
  };

  const generalWhatsApp = generateMakeupWhatsAppLink('Bridal / Party Makeup Consultation', undefined, undefined, glamWhatsapp);

  return (
    <div className="min-h-screen bg-cream-50">
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-cream-100/90 via-cream-50 to-cream-50 pt-12 pb-20 border-b border-cream-200">
        <div className="absolute top-10 right-10 w-96 h-96 bg-rosewood-100/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-gold-200/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Brand Bio */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rosewood-50 border border-rosewood-200 text-rosewood-900 text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-gold-600" />
                <span>Professional Makeup Artist & Hairstylist • Indore</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-charcoal-950 leading-[1.15]">
                {settings?.glamBusinessName || 'Neelima Makeup Art'} <br />
                <span className="italic font-normal text-rosewood-800 text-3xl sm:text-4xl lg:text-5xl block mt-2">
                  Enhancing Your Natural Glow
                </span>
              </h1>

              <p className="text-base sm:text-lg text-charcoal-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans">
                {glamBio}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <a
                  href={generalWhatsApp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Book Makeup Slot on WhatsApp</span>
                </a>

                <a
                  href={glamInstaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-white hover:bg-cream-100 text-charcoal-800 text-xs sm:text-sm font-semibold uppercase tracking-wider border border-cream-300 shadow-sm transition-all"
                >
                  <Instagram className="w-4 h-4 text-[#E1306C]" />
                  <span>@{glamInstaHandle}</span>
                </a>
              </div>

              {/* Highlights */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-cream-200 max-w-lg mx-auto lg:mx-0">
                <div className="text-center lg:text-left">
                  <p className="font-serif text-2xl font-bold text-rosewood-900">HD / 4K</p>
                  <p className="text-xs text-charcoal-500 font-medium">Bridal Makeup</p>
                </div>
                <div className="text-center lg:text-left">
                  <p className="font-serif text-2xl font-bold text-gold-700">On-Venue</p>
                  <p className="text-xs text-charcoal-500 font-medium">Travel in Indore & MP</p>
                </div>
                <div className="text-center lg:text-left">
                  <p className="font-serif text-2xl font-bold text-charcoal-900">100%</p>
                  <p className="text-xs text-charcoal-500 font-medium">Custom Styling</p>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Frame */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-cream-200">
                <Image
                  src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1000&q=85"
                  alt="Neelima Makeup Art Bridal Look"
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 45vw"
                  className="object-cover object-center hover:scale-105 transition-transform duration-700"
                />

                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-charcoal-950/80 backdrop-blur-md text-white border border-white/20 shadow-lg flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#FFDC80] via-[#E1306C] to-[#833AB4] flex items-center justify-center">
                      <Instagram className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white">@{glamInstaHandle}</p>
                      <p className="text-[10px] text-cream-200">Daily bridal transformations</p>
                    </div>
                  </div>
                  <a
                    href={glamInstaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-bold text-gold-300 uppercase tracking-wider hover:underline"
                  >
                    View Reels →
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Makeup Packages & Services */}
      <section className="py-16 sm:py-24 bg-white border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-gold-700 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tailored Beauty Packages</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-950">
              Makeup & Hair Artistry Services
            </h2>
            <p className="text-charcoal-600 text-sm sm:text-base mt-2">
              Using international luxury makeup products (Huda Beauty, MAC, NARS, Charlotte Tilbury) tailored for your skin type.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {services.map((srv) => (
              <div
                key={srv.id}
                className="bg-cream-50/70 rounded-3xl overflow-hidden border border-cream-200 shadow-soft hover:shadow-card-hover transition-all flex flex-col justify-between"
              >
                {srv.image && (
                  <div className="relative aspect-[16/11] w-full bg-cream-200">
                    <Image
                      src={srv.image}
                      alt={srv.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 25vw"
                      className="object-cover object-center"
                    />
                    <div className="absolute top-3 right-3 bg-charcoal-950/80 backdrop-blur-md px-3 py-1 rounded-full text-gold-300 text-xs font-semibold">
                      {srv.priceText || (srv.price ? `₹${srv.price.toLocaleString('en-IN')}` : 'Custom')}
                    </div>
                  </div>
                )}

                <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rosewood-800 bg-rosewood-50 px-2.5 py-0.5 rounded-full border border-rosewood-200">
                      {srv.category}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-charcoal-900 mt-2">
                      {srv.title}
                    </h3>
                    <p className="text-xs text-charcoal-600 mt-1.5 leading-relaxed">
                      {srv.description}
                    </p>

                    {srv.includes && (
                      <div className="mt-3 pt-3 border-t border-cream-200/80">
                        <p className="text-[11px] font-semibold text-charcoal-800">Package Includes:</p>
                        <p className="text-[11px] text-charcoal-600 mt-0.5">{srv.includes}</p>
                      </div>
                    )}

                    {srv.duration && (
                      <div className="flex items-center gap-1 text-[11px] text-charcoal-500 mt-2">
                        <Clock className="w-3.5 h-3.5 text-gold-600" />
                        <span>Duration: {srv.duration}</span>
                      </div>
                    )}
                  </div>

                  <a
                    href={generateMakeupWhatsAppLink(srv.title, undefined, undefined, glamWhatsapp)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold uppercase tracking-wider shadow transition-all"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-white" />
                    <span>Check Availability</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. Portfolio Showcase with Filter Tabs */}
      <section className="py-16 sm:py-24 bg-cream-50 border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-gold-700 mb-2">
              <Instagram className="w-3.5 h-3.5 text-[#E1306C]" />
              <span>Real Brides & Transformations</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-950">
              Glam Portfolio
            </h2>
            <p className="text-charcoal-600 text-sm sm:text-base mt-2">
              Browse real bridal looks, engagement glam, and creative hairstyles crafted by Neelima in Indore.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8">
            {categoriesList.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
                  selectedCategory.toLowerCase() === cat.toLowerCase()
                    ? 'bg-rosewood-800 text-white shadow-sm'
                    : 'bg-white border border-cream-200 text-charcoal-700 hover:bg-cream-100'
                }`}
              >
                {cat === 'all' ? 'All Looks' : cat}
              </button>
            ))}
          </div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {filteredPortfolio.map((item) => (
              <div
                key={item.id}
                className="group relative aspect-[3/4] rounded-3xl overflow-hidden bg-cream-200 border border-cream-200 shadow-soft"
              >
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 25vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-charcoal-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                  <span className="text-[10px] font-bold text-gold-300 uppercase tracking-widest">
                    {item.category}
                  </span>
                  <h4 className="font-serif text-base font-bold text-white mt-1">
                    {item.title}
                  </h4>
                  {item.description && (
                    <p className="text-xs text-cream-200 mt-1 line-clamp-2">
                      {item.description}
                    </p>
                  )}

                  {item.instagramUrl && (
                    <a
                      href={item.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-gold-300 hover:underline"
                    >
                      <Instagram className="w-3.5 h-3.5" />
                      <span>View on Instagram</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Complete Bridal Bundle Cross-Promotion */}
      <section className="py-12 bg-rosewood-950 text-white border-b border-gold-600/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 p-8 sm:p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="space-y-2 text-center lg:text-left">
              <span className="text-xs font-semibold tracking-widest uppercase text-gold-300 flex items-center justify-center lg:justify-start gap-1.5">
                <Sparkles className="w-4 h-4 text-gold-400" />
                The Ultimate Bridal Experience in Indore
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Boutique Couture & Bridal Makeup Under One Roof
              </h3>
              <p className="text-sm text-cream-200 max-w-2xl leading-relaxed">
                Get your dream bridal lehenga or designer blouse custom-stitched by <strong>The Stitch House</strong> and paired with flawless HD bridal makeup by <strong>Neelima Makeup Art</strong>.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <Link
                href="/collections/lehengas"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gold-500 hover:bg-gold-400 text-charcoal-950 text-xs font-bold uppercase tracking-wider transition-all"
              >
                <Scissors className="w-4 h-4" />
                <span>Explore Bridal Lehengas</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Booking Inquiry & Contact Form */}
      <section className="py-16 sm:py-24 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white p-8 sm:p-12 rounded-3xl border border-cream-200 shadow-soft">
            
            {/* Left: Contact Info */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rosewood-50 text-rosewood-900 text-xs font-semibold uppercase tracking-wider">
                  <Calendar className="w-3.5 h-3.5 text-gold-600" />
                  <span>Reserve Your Date</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-950">
                  Book Makeup & Hair
                </h2>
                <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
                  Wedding dates in Indore fill up fast during wedding season. Contact us in advance to secure your slot.
                </p>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-charcoal-700">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-cream-100 flex items-center justify-center text-emerald-600 flex-shrink-0">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-charcoal-900">Direct WhatsApp</p>
                    <a
                      href={generalWhatsApp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 font-semibold hover:underline"
                    >
                      {glamPhone} (Quick Slot Check)
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-cream-100 flex items-center justify-center text-[#E1306C] flex-shrink-0">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-charcoal-900">Instagram</p>
                    <a
                      href={glamInstaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#E1306C] font-semibold hover:underline"
                    >
                      @{glamInstaHandle}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-cream-100 flex items-center justify-center text-rosewood-800 flex-shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-charcoal-900">Studio / Venue Service</p>
                    <p className="text-charcoal-600 text-xs">
                      Studio Rau, Indore
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-cream-100/70 border border-cream-200 text-xs text-charcoal-700 space-y-1.5">
                <p className="font-semibold text-charcoal-900">✨ Pre-Bridal Consultation Available</p>
                <p className="text-[11px] text-charcoal-600 leading-relaxed">
                  Skin prep recommendations, jewelry matching, and hairstyle trial discussions are included with bridal packages.
                </p>
              </div>
            </div>

            {/* Right: Booking Form */}
            <div className="lg:col-span-7 bg-cream-50/60 p-6 sm:p-8 rounded-2xl border border-cream-200">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-charcoal-950 mb-1">
                Makeup Booking Inquiry
              </h3>
              <p className="text-xs text-charcoal-500 mb-6">
                Fill details below for quote and slot confirmation.
              </p>

              {status === 'success' ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="font-serif text-xl font-bold text-emerald-950">
                    Inquiry Sent Successfully!
                  </h4>
                  <p className="text-xs text-emerald-800">
                    Thank you! Neelima will check the calendar for your date and contact you directly on WhatsApp.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="mt-2 text-xs font-semibold uppercase tracking-wider text-emerald-900 underline"
                  >
                    Submit Another Date
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {status === 'error' && (
                    <div className="p-3.5 bg-rosewood-50 border border-rosewood-200 rounded-xl flex items-center gap-2 text-xs text-rosewood-900">
                      <AlertCircle className="w-4 h-4 text-rosewood-700 flex-shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-charcoal-700 mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Ananya Sharma"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-cream-300 text-xs sm:text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-rosewood-800/20 focus:border-rosewood-800"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-charcoal-700 mb-1">
                        WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. 98260 12345"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-cream-300 text-xs sm:text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-rosewood-800/20 focus:border-rosewood-800"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-charcoal-700 mb-1">
                        Event Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.eventDate}
                        onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-cream-300 text-xs sm:text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-rosewood-800/20 focus:border-rosewood-800"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-charcoal-700 mb-1">
                        Service Type
                      </label>
                      <select
                        value={formData.serviceType}
                        onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-cream-300 text-xs sm:text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-rosewood-800/20 focus:border-rosewood-800"
                      >
                        <option value="Bridal HD Makeup">Bridal HD Makeup</option>
                        <option value="Engagement / Reception Makeup">Engagement / Reception Makeup</option>
                        <option value="Party & Sangeet Makeup">Party & Sangeet Makeup</option>
                        <option value="Hairstyling & Saree Draping Only">Hairstyling & Saree Draping Only</option>
                        <option value="Bridal + Siders Combo">Bridal + Siders Combo Package</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal-700 mb-1">
                      Event Venue / Location (Indore or Outstation)
                    </label>
                    <input
                      type="text"
                      value={formData.venue}
                      onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                      placeholder="e.g. Sayaji Hotel Indore / Home appointment"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-cream-300 text-xs sm:text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-rosewood-800/20 focus:border-rosewood-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal-700 mb-1">
                      Additional Details (Number of people, ready-by time, etc.)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="e.g. Need bridal makeup ready by 6:00 PM + 2 party makeups for mom and sister..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-cream-300 text-xs sm:text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-rosewood-800/20 focus:border-rosewood-800"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-rosewood-800 hover:bg-rosewood-900 text-white text-xs font-semibold uppercase tracking-wider shadow hover:shadow-md transition-all disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{status === 'submitting' ? 'Submitting...' : 'Send Booking Inquiry'}</span>
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
