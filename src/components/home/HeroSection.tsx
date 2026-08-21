'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Instagram, MessageCircle, Scissors } from 'lucide-react';
import { generateGeneralWhatsAppLink } from '@/lib/whatsapp';

export default function HeroSection() {
  const whatsappLink = generateGeneralWhatsAppLink();

  return (
    <section className="relative overflow-hidden bg-cream-50 pt-8 pb-16 lg:pt-16 lg:pb-24 border-b border-cream-200/80">
      {/* Background Decorative Blur */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gold-200/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Brand Story & CTA */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Tag / Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rosewood-50 border border-rosewood-200/70 text-rosewood-900 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-gold-600" />
              <span>Boutique Stitching & Custom Tailoring • Indore</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-charcoal-950 leading-[1.15]">
              Made with <span className="italic font-normal text-rosewood-800">Precision</span>, Worn with <span className="italic font-normal text-gold-700">Confidence</span>.
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-charcoal-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans font-normal">
              Welcome to <strong>The Stitch House</strong> by designer Neelima. From regal bridal lehengas and hand-embroidered blouses to contemporary dresses and precision alterations — every garment is tailored to celebrate your unique grace.
            </p>

            {/* Action Buttons */}
            <div className="text-center flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link
                href="/collections"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-rosewood-800 hover:bg-rosewood-900 text-white text-sm font-semibold uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-200"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/custom-stitching"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-cream-100 text-charcoal-800 text-sm font-semibold uppercase tracking-wider border border-cream-300 shadow-sm transition-all duration-200"
              >
                <span>Custom Stitching Guide</span>
                <Scissors className="w-4 h-4 text-gold-600" />
              </Link>

              {/* <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-sm font-semibold border border-emerald-200 transition-all duration-200"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600" />
                <span>Chat on WhatsApp</span>
              </a> */}
            </div>

            {/* Trust Highlights */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-cream-200/80 max-w-lg mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <p className="font-serif text-2xl font-bold text-rosewood-900">100%</p>
                <p className="text-xs text-charcoal-500 font-medium">Bespoke Fitting</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="font-serif text-2xl font-bold text-gold-700">50+</p>
                <p className="text-xs text-charcoal-500 font-medium">Happy Clients</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="font-serif text-2xl font-bold text-charcoal-900">PAN</p>
                <p className="text-xs text-charcoal-500 font-medium">India Delivery</p>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Showcase Collage */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Feature Image */}
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-cream-200">
                <Image
                  src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85"
                  alt="The Stitch House Designer Lehenga"
                  fill
                  priority
                  sizes="(max-width: 1024px) 80vw, 40vw"
                  className="object-cover object-center hover:scale-105 transition-transform duration-700"
                />

                {/* Floating Instagram Tag Badge */}
                <a
                  href="https://instagram.com/stitch_by_neelima"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-charcoal-950/80 backdrop-blur-md text-white border border-white/20 shadow-lg flex items-center justify-between hover:bg-charcoal-950 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#FFDC80] via-[#E1306C] to-[#833AB4] flex items-center justify-center">
                      <Instagram className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white">@stitch_by_neelima</p>
                      <p className="text-[10px] text-cream-200">Follow on Instagram for daily reels</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-gold-300 uppercase tracking-wider">Follow →</span>
                </a>
              </div>

              {/* Floating secondary decorative card */}
              <div className="hidden sm:block absolute -top-6 -right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-gold-200 shadow-xl max-w-[200px] z-10 animate-pulse">
                <div className="flex items-center gap-2 text-rosewood-800 font-serif font-bold text-sm">
                  <Sparkles className="w-4 h-4 text-gold-500" />
                  <span>Custom Bridal Work</span>
                </div>
                <p className="text-[11px] text-charcoal-500 mt-1 leading-snug">
                  Personalized neckline & embroidery consultation in Indore
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
