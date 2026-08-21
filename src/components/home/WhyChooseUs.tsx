'use client';

import React from 'react';
import { Sparkles, ShieldCheck, HeartHandshake, Scissors, Award, Clock } from 'lucide-react';

export default function WhyChooseUs() {
  const points = [
    {
      icon: Scissors,
      title: 'Precision Fitting Guarantee',
      description: 'We believe an outfit is only as good as its fit. Each garment is meticulously patterned to contour your exact body shape.',
    },
    {
      icon: HeartHandshake,
      title: 'Personalized Consultation',
      description: 'Work directly with designer Neelima to choose flattering necklines, sleeve lengths, fabric combinations, and embroidery styles.',
    },
    {
      icon: Sparkles,
      title: 'Artisanal Hand Embroidery',
      description: 'From traditional Zardozi and Gota Patti to modern sequin and beadwork, our embellishments are crafted by seasoned karigars.',
    },
    {
      icon: Award,
      title: 'Premium Inner Linings & Padding',
      description: 'No compromises on comfort. We use soft cotton linings, double-stitched cancan, and premium imported cups for blouse support.',
    },
    {
      icon: Clock,
      title: 'Strict Timelines for Events',
      description: 'Never worry about last-minute wedding stress. We commit to clear delivery schedules and accommodate urgent event dates.',
    },
    {
      icon: ShieldCheck,
      title: 'Hassle-Free Alteration Support',
      description: 'Trial and adjustment service available in Indore until you are 100% satisfied and wear your outfit with true confidence.',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-cream-50 border-b border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-gold-700 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Stitch House Promise</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-950">
            Why Women in Indore Trust Us
          </h2>
          <p className="text-charcoal-600 text-sm sm:text-base mt-3 leading-relaxed">
            Every stitch tells a story of dedication, elegance, and timeless Indian craftsmanship.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {points.map((pt, idx) => {
            const Icon = pt.icon;
            return (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-2xl bg-white border border-cream-200/90 shadow-soft hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-rosewood-50 border border-rosewood-200/50 flex items-center justify-center text-rosewood-800 mb-5">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-charcoal-900 mb-2">
                  {pt.title}
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed font-sans">
                  {pt.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
