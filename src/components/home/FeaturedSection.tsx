'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';
import { ProductItem } from '@/types';

interface FeaturedSectionProps {
  products: ProductItem[];
}

export default function FeaturedSection({ products }: FeaturedSectionProps) {
  if (!products || products.length === 0) return null;

  return (
    <section className="py-16 sm:py-24 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-gold-700 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Signature Boutique Pieces</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-950">
              Featured Creations
            </h2>
            <p className="text-charcoal-600 text-sm sm:text-base mt-2 max-w-xl">
              Handpicked designs showcasing our master craftsmanship, intricate embroidery, and flattering tailored cuts.
            </p>
          </div>

          <Link
            href="/collections"
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-rosewood-800 hover:text-rosewood-900 group"
          >
            <span>View Full Catalog</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} featured={true} />
          ))}
        </div>

      </div>
    </section>
  );
}
