'use client';

import React from 'react';
import Link from 'next/link';
import { Scissors, Sparkles, MessageCircle, Ruler, Palette, CheckCircle2, ArrowRight } from 'lucide-react';
import { generateCustomStitchingWhatsAppLink } from '@/lib/whatsapp';

export default function CustomStitchingBanner() {
  const whatsappLink = generateCustomStitchingWhatsAppLink();

  const steps = [
    {
      icon: Palette,
      step: '01',
      title: 'Share Your Design / Idea',
      description: 'Send us photos from Instagram, Pinterest, or your own sketches.',
    },
    {
      icon: Ruler,
      step: '02',
      title: 'Fabric & Measurement',
      description: 'Provide your measurements online or visit our Indore studio for a custom fit.',
    },
    {
      icon: Scissors,
      step: '03',
      title: 'Precision Crafting',
      description: 'Master pattern cutting, cup padding, handcrafted embroidery & finishing.',
    },
    {
      icon: CheckCircle2,
      step: '04',
      title: 'Trial & Perfect Delivery',
      description: 'Flawless fit delivered to your doorstep in Indore with trial guarantee.',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-rosewood-950 text-white relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-rosewood-800/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gold-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rosewood-900/80 border border-gold-500/30 text-gold-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>Bespoke Tailoring In Indore</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            Have a Dream Outfit in Mind? <br />
            <span className="text-gold-300 italic font-normal">We Stitch It to Precision.</span>
          </h2>
          <p className="text-cream-200 text-sm sm:text-base mt-4 leading-relaxed">
            From bridal blouse cuts, lehenga customization, and salwar suit stitching to delicate alterations — experience boutique tailoring tailored around you.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-gold-400/40 transition-all duration-300 flex flex-col justify-between backdrop-blur-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-serif text-2xl font-bold text-white/30">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-cream-300 leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold uppercase tracking-wider text-sm shadow-xl hover:shadow-2xl transition-all"
          >
            <MessageCircle className="w-5 h-5 fill-white" />
            <span>Book Tailoring Consultation on WhatsApp</span>
          </a>

          <Link
            href="/custom-stitching"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-semibold uppercase tracking-wider border border-white/20 transition-all"
          >
            <span>Learn About Services & Sizing</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
