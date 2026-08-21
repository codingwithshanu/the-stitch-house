'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { CategoryItem } from '@/types';

interface CategoryGridProps {
  categories: CategoryItem[];
}

export default function CategoryGrid({ categories }: CategoryGridProps) {
  if (!categories || categories.length === 0) return null;

  return (
    <section className="py-16 sm:py-24 bg-cream-100/60 border-b border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-gold-700 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Boutique Categories</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-950">
            Explore Our Craft & Creations
          </h2>
          <p className="text-charcoal-600 text-sm sm:text-base mt-3 leading-relaxed">
            From regal Indian bridal wear to chic contemporary silhouettes, browse our specialized craftsmanship categories.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/collections/${cat.slug}`}
              className="group relative flex flex-col rounded-2xl overflow-hidden bg-white border border-cream-200 shadow-soft hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1.5"
            >
              {/* Category Image */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-cream-200">
                <Image
                  src={
                    cat.image ||
                    'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80'
                  }
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-charcoal-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Floating Top Right Arrow */}
                <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-rosewood-800 transition-colors">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-3 left-3 right-3 text-left">
                  <h3 className="font-serif text-sm sm:text-base font-bold text-white leading-tight">
                    {cat.name}
                  </h3>
                  {cat._count?.products !== undefined && (
                    <p className="text-[10px] text-gold-300 mt-0.5 font-medium">
                      {cat._count.products} {cat._count.products === 1 ? 'Design' : 'Designs'}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
