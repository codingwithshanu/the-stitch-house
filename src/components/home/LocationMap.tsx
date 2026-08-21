'use client';

import React from 'react';
import { MapPin, Phone, MessageCircle, Clock, Navigation } from 'lucide-react';
import { generateGeneralWhatsAppLink } from '@/lib/whatsapp';

export default function LocationMap() {
  const whatsappLink = generateGeneralWhatsAppLink('Hi Neelima! I would like to visit your boutique studio in Indore. Please share directions.');

  return (
    <section className="py-16 sm:py-24 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-cream-200 shadow-luxury overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* Info Side */}
          <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rosewood-50 text-rosewood-800 text-xs font-semibold uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5" />
                <span>Visit Our Studio</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-950">
                Experience Bespoke Couture in Indore
              </h2>
              <p className="text-charcoal-600 text-sm sm:text-base leading-relaxed">
                Step into our Indore boutique for personalized fitting, fabric selection, and design consultation directly with Neelima.
              </p>
            </div>

            {/* Studio Details */}
            <div className="space-y-4 text-sm text-charcoal-700">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-cream-100 flex items-center justify-center text-rosewood-800 flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-charcoal-900">Studio Address</p>
                  <p className="text-charcoal-600">Near 56 Dukan, New Palasia, Indore, Madhya Pradesh 452001</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-cream-100 flex items-center justify-center text-rosewood-800 flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-charcoal-900">Hours & Appointments</p>
                  <p className="text-charcoal-600">Monday – Saturday: 10:30 AM – 8:00 PM</p>
                  <p className="text-charcoal-500 text-xs mt-0.5">Sundays strictly by prior appointment</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-cream-100 flex items-center justify-center text-rosewood-800 flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-charcoal-900">Direct Contact</p>
                  <a href="tel:+919876543210" className="text-rosewood-800 font-semibold hover:underline">
                    +91 98765 43210
                  </a>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold uppercase tracking-wider shadow transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Book Appointment</span>
              </a>

              <a
                href="https://maps.google.com/?q=New+Palasia+Indore"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-cream-100 hover:bg-cream-200 text-charcoal-800 text-xs font-semibold uppercase tracking-wider border border-cream-300 transition-all"
              >
                <Navigation className="w-4 h-4 text-gold-600" />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>

          {/* Map / Visual Side */}
          <div className="lg:col-span-6 min-h-[320px] bg-cream-200 relative border-t lg:border-t-0 lg:border-l border-cream-200">
            <iframe
              title="The Stitch House Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14720.658253995874!2d75.875!3d22.724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fd23038676d5%3A0x6b09c5df0c1737e4!2sNew%20Palasia%2C%20Indore%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '380px' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full object-cover grayscale-[20%] contrast-[105%]"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
