'use client';

import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  Instagram,
  Sparkles,
  Send,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { generateGeneralWhatsAppLink } from '@/lib/whatsapp';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    serviceType: 'Custom Stitching',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setFormData({
          name: '',
          phone: '',
          email: '',
          serviceType: 'Custom Stitching',
          message: '',
        });
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to submit inquiry');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Network error. Please reach out on WhatsApp directly.');
    }
  };

  const whatsappLink = generateGeneralWhatsAppLink();

  return (
    <div className="min-h-screen bg-cream-50 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rosewood-50 text-rosewood-900 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            <span>Get In Touch</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal-950">
            Contact The Stitch House
          </h1>

          <p className="text-charcoal-600 text-sm sm:text-base leading-relaxed">
            Have a question about a design, custom measurements, or want to book an appointment at our Indore studio? We would love to hear from you.
          </p>
        </div>

        {/* Contact Grid: Details + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white p-8 sm:p-12 rounded-3xl border border-cream-200 shadow-soft">
          
          {/* Left: Contact Info */}
          <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
            <div className="space-y-6">
              <h2 className="font-serif text-2xl font-bold text-charcoal-950">
                Boutique Details
              </h2>

              <div className="space-y-5 text-sm text-charcoal-700">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cream-100 flex items-center justify-center text-rosewood-800 flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-charcoal-900">Studio Location</p>
                    <p className="text-charcoal-600 text-xs sm:text-sm mt-0.5">
                      Near 56 Dukan, New Palasia, Indore, Madhya Pradesh 452001
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cream-100 flex items-center justify-center text-emerald-600 flex-shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-charcoal-900">WhatsApp</p>
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 font-semibold hover:underline text-xs sm:text-sm block mt-0.5"
                    >
                      +91 98765 43210 (Instant Chat)
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cream-100 flex items-center justify-center text-rosewood-800 flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-charcoal-900">Phone</p>
                    <a href="tel:+919876543210" className="text-charcoal-700 hover:text-rosewood-800 text-xs sm:text-sm block mt-0.5">
                      +91 98765 43210
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cream-100 flex items-center justify-center text-[#E1306C] flex-shrink-0">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-charcoal-900">Instagram</p>
                    <a
                      href="https://instagram.com/stitch_by_neelima"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#E1306C] font-semibold hover:underline text-xs sm:text-sm block mt-0.5"
                    >
                      @stitch_by_neelima
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cream-100 flex items-center justify-center text-gold-700 flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-charcoal-900">Studio Hours</p>
                    <p className="text-charcoal-600 text-xs sm:text-sm mt-0.5">
                      Mon - Sat: 10:30 AM - 8:00 PM<br />Sunday: By Appointment Only
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick WhatsApp Action Banner */}
            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200">
              <p className="text-xs font-bold text-emerald-900">Prefer Instant WhatsApp Chat?</p>
              <p className="text-[11px] text-emerald-700 mt-1">
                Neelima replies quickly on WhatsApp with design quotes and fitting advice.
              </p>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold uppercase tracking-wider shadow"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Open WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7 bg-cream-50/60 p-6 sm:p-8 rounded-2xl border border-cream-200">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-charcoal-950 mb-2">
              Send an Inquiry
            </h3>
            <p className="text-xs text-charcoal-600 mb-6">
              Fill out the form below and we will get in touch with you shortly.
            </p>

            {status === 'success' ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-serif text-xl font-bold text-emerald-950">
                  Thank You!
                </h4>
                <p className="text-xs text-emerald-800">
                  Your inquiry has been submitted successfully. Neelima from The Stitch House will contact you on your phone number shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="mt-2 text-xs font-semibold uppercase tracking-wider text-emerald-900 underline"
                >
                  Send Another Message
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
                      placeholder="e.g. Pooja Sharma"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-cream-300 text-xs sm:text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-rosewood-800/20 focus:border-rosewood-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal-700 mb-1">
                      Phone Number (WhatsApp) *
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
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. pooja@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-cream-300 text-xs sm:text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-rosewood-800/20 focus:border-rosewood-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal-700 mb-1">
                      Service / Inquiry Type
                    </label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-cream-300 text-xs sm:text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-rosewood-800/20 focus:border-rosewood-800"
                    >
                      <option value="Custom Stitching">Custom Stitching (Blouse/Lehenga)</option>
                      <option value="Product Inquiry">Product Inquiry</option>
                      <option value="Alteration & Fitting">Alteration & Fitting</option>
                      <option value="Bridal Consultation">Bridal Consultation</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-charcoal-700 mb-1">
                    Your Message / Requirements *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about the outfit you want stitched, preferred dates, fabrics, etc."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-cream-300 text-xs sm:text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-rosewood-800/20 focus:border-rosewood-800"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-rosewood-800 hover:bg-rosewood-900 text-white text-xs font-semibold uppercase tracking-wider shadow hover:shadow-md transition-all disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{status === 'submitting' ? 'Submitting...' : 'Send Inquiry'}</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
