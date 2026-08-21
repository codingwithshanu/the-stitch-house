'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Sparkles, Scissors, MessageCircle } from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';
import ProductFilters from '@/components/products/ProductFilters';
import { generateGeneralWhatsAppLink } from '@/lib/whatsapp';
import { CategoryItem, ProductItem } from '@/types';

interface CollectionsClientProps {
  initialCategories: CategoryItem[];
  initialProducts: ProductItem[];
  preSelectedCategory?: string;
}

export default function CollectionsClient({
  initialCategories,
  initialProducts,
  preSelectedCategory = 'all',
}: CollectionsClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(preSelectedCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredProducts = useMemo(() => {
    return initialProducts
      .filter((product) => {
        // Category Filter
        if (selectedCategory !== 'all') {
          if (product.category?.slug !== selectedCategory) {
            return false;
          }
        }

        // Status Filter
        if (statusFilter !== 'all') {
          if (product.status !== statusFilter) return false;
        }

        // Search Filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = product.name.toLowerCase().includes(q);
          const matchDesc = product.description.toLowerCase().includes(q);
          const matchFabric = product.fabric?.toLowerCase().includes(q);
          const matchTags = product.tags?.toLowerCase().includes(q);
          if (!matchName && !matchDesc && !matchFabric && !matchTags) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') {
          return (a.price || 0) - (b.price || 0);
        }
        if (sortBy === 'price-desc') {
          return (b.price || 0) - (a.price || 0);
        }
        if (sortBy === 'popular') {
          return (b.viewsCount || 0) - (a.viewsCount || 0);
        }
        // newest
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [initialProducts, selectedCategory, searchQuery, sortBy, statusFilter]);

  const activeCategoryObj = initialCategories.find((c) => c.slug === selectedCategory);

  const customStitchingWhatsApp = generateGeneralWhatsAppLink(
    'Hi Neelima! I want to get a custom outfit stitched. Can you share details?'
  );

  return (
    <div className="min-h-screen bg-cream-50 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Header */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <nav className="flex items-center justify-center gap-2 text-xs text-charcoal-500 mb-3">
            <Link href="/" className="hover:text-rosewood-800">
              Home
            </Link>
            <span>/</span>
            <span className="text-rosewood-900 font-semibold">
              {activeCategoryObj ? activeCategoryObj.name : 'Collections'}
            </span>
          </nav>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rosewood-50 text-rosewood-900 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            <span>The Stitch House Catalog</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal-950">
            {activeCategoryObj ? activeCategoryObj.name : 'Boutique Catalog & Designs'}
          </h1>

          <p className="text-charcoal-600 text-sm sm:text-base mt-3 leading-relaxed">
            {activeCategoryObj?.description ||
              'Explore our curated collection of Indian festive wear, handcrafted bridal blouses, royal lehengas, and custom-tailored creations in Indore.'}
          </p>
        </div>

        {/* Filters and Search */}
        <ProductFilters
          categories={initialCategories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          totalCount={filteredProducts.length}
        />

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-cream-200 p-8 shadow-soft max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-cream-100 flex items-center justify-center text-charcoal-400 mx-auto mb-4">
              <Scissors className="w-8 h-8 text-gold-600" />
            </div>
            <h3 className="font-serif text-xl font-bold text-charcoal-900 mb-2">
              No matching designs found
            </h3>
            <p className="text-sm text-charcoal-600 mb-6">
              We create bespoke custom stitching! If you don't see the exact design you're looking for, simply message us on WhatsApp with your reference photo.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="px-5 py-2.5 rounded-full bg-cream-100 hover:bg-cream-200 text-charcoal-800 text-xs font-semibold uppercase tracking-wider"
              >
                Clear Filters
              </button>
              <a
                href={customStitchingWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold uppercase tracking-wider shadow"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Custom Order on WhatsApp</span>
              </a>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
