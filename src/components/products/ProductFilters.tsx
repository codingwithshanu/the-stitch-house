'use client';

import React from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { CategoryItem } from '@/types';

interface ProductFiltersProps {
  categories: CategoryItem[];
  selectedCategory: string;
  onSelectCategory: (categorySlug: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  statusFilter: string;
  onStatusChange: (status: string) => void;
  totalCount: number;
}

export default function ProductFilters({
  categories,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  statusFilter,
  onStatusChange,
  totalCount,
}: ProductFiltersProps) {
  return (
    <div className="space-y-5 bg-white p-5 sm:p-6 rounded-2xl border border-cream-200 shadow-soft mb-8">
      {/* Top Row: Search & Sort */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search lehenga, blouse, fabric..."
            className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-cream-50 border border-cream-200 text-xs sm:text-sm text-charcoal-900 placeholder:text-charcoal-400 focus:outline-none focus:ring-2 focus:ring-rosewood-800/20 focus:border-rosewood-800 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-charcoal-400 hover:text-charcoal-700"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Right Side: Status Filter & Sort Dropdown */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <div className="text-xs text-charcoal-500 font-medium hidden md:block">
            Showing <span className="font-bold text-charcoal-800">{totalCount}</span> designs
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="sort-select" className="text-xs font-semibold text-charcoal-600 hidden xs:block">
              Sort by:
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="py-2 px-3 rounded-xl bg-cream-50 border border-cream-200 text-xs font-medium text-charcoal-800 focus:outline-none focus:ring-2 focus:ring-rosewood-800/20 focus:border-rosewood-800"
            >
              <option value="newest">Newest First</option>
              <option value="popular">Most Viewed</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Pills Row */}
      <div className="pt-3 border-t border-cream-100 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => onSelectCategory('all')}
          className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all ${
            selectedCategory === 'all'
              ? 'bg-rosewood-800 text-white shadow-sm'
              : 'bg-cream-100 text-charcoal-700 hover:bg-cream-200'
          }`}
        >
          All Collections
        </button>

        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.slug)}
            className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all ${
              selectedCategory === cat.slug
                ? 'bg-rosewood-800 text-white shadow-sm'
                : 'bg-cream-100 text-charcoal-700 hover:bg-cream-200'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}
