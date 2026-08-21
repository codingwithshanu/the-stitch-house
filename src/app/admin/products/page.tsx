'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  Sparkles,
  ExternalLink,
  Loader2,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils';
import { ProductItem, CategoryItem } from '@/types';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products?all=true');
      const data = await res.json();
      if (data.products) setProducts(data.products);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      if (data.categories) setCategories(data.categories);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    Promise.all([fetchProducts(), fetchCategories()]).finally(() => setLoading(false));
  }, []);

  const handleTogglePublish = async (product: ProductItem) => {
    try {
      const res = await fetch(`/api/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublished: !product.isPublished }),
      });
      if (res.ok) {
        setProducts((prev) =>
          prev.map((p) => (p.id === product.id ? { ...p, isPublished: !p.isPublished } : p))
        );
        showToast(product.isPublished ? 'Product unpublished' : 'Product published');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleToggleFeatured = async (product: ProductItem) => {
    try {
      const res = await fetch(`/api/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFeatured: !product.isFeatured }),
      });
      if (res.ok) {
        setProducts((prev) =>
          prev.map((p) => (p.id === product.id ? { ...p, isFeatured: !p.isFeatured } : p))
        );
        showToast(product.isFeatured ? 'Removed from featured' : 'Marked as featured');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/products/${deleteId}`, { method: 'DELETE' });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== deleteId));
        setDeleteId(null);
        showToast('Product deleted successfully');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setDeleting(false);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const filteredProducts = products.filter((p) => {
    if (selectedCat !== 'all' && p.category?.slug !== selectedCat) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchCat = p.category?.name.toLowerCase().includes(q);
      if (!matchName && !matchCat) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-charcoal-950 text-white text-xs px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2 border border-gold-500/30 animate-fadeIn">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-950">
            All Products & Designs
          </h1>
          <p className="text-xs text-charcoal-500 mt-1">
            Manage your boutique clothing collection, photos, prices and visibility.
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-rosewood-800 hover:bg-rosewood-900 text-white text-xs font-semibold uppercase tracking-wider shadow transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </Link>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-cream-200 shadow-soft flex flex-col sm:flex-row gap-3 justify-between items-center">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by product name..."
            className="w-full pl-10 pr-3.5 py-2 rounded-xl bg-cream-50 border border-cream-200 text-xs text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-rosewood-800/20"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label className="text-xs font-semibold text-charcoal-600 hidden xs:block">Category:</label>
          <select
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
            className="w-full sm:w-auto py-2 px-3 rounded-xl bg-cream-50 border border-cream-200 text-xs text-charcoal-800 focus:outline-none focus:ring-2 focus:ring-rosewood-800/20"
          >
            <option value="all">All Categories ({products.length})</option>
            {categories.map((c) => (
              <option key={c.id} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-2xl border border-cream-200 shadow-soft overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <Loader2 className="w-8 h-8 text-rosewood-800 animate-spin mx-auto mb-2" />
            <p className="text-xs text-charcoal-500">Loading boutique products...</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-charcoal-700">
              <thead className="bg-cream-100/70 border-b border-cream-200 text-charcoal-900 font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3.5 px-4">Design</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Price</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-center">Featured</th>
                  <th className="py-3.5 px-4 text-center">Published</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-100">
                {filteredProducts.map((prod) => {
                  const coverImg = prod.images?.[0]?.url || 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b';
                  return (
                    <tr key={prod.id} className="hover:bg-cream-50/50 transition-colors">
                      {/* Product Name & Image */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-16 rounded-lg overflow-hidden bg-cream-200 flex-shrink-0 border border-cream-200">
                            <Image
                              src={coverImg}
                              alt={prod.name}
                              fill
                              sizes="48px"
                              className="object-cover object-center"
                            />
                          </div>
                          <div className="min-w-0 max-w-xs">
                            <Link
                              href={`/admin/products/${prod.id}/edit`}
                              className="font-semibold text-charcoal-900 hover:text-rosewood-800 truncate block text-xs"
                            >
                              {prod.name}
                            </Link>
                            <p className="text-[10px] text-charcoal-400 mt-0.5">
                              {prod.images.length} photos • {prod.viewsCount} views
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3 px-4">
                        <span className="font-medium text-charcoal-800">
                          {prod.category?.name || 'Uncategorized'}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="py-3 px-4">
                        <span className="font-bold text-rosewood-900">
                          {prod.priceOnRequest || !prod.price
                            ? 'Price on Request'
                            : formatCurrency(prod.price)}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                            prod.status === 'AVAILABLE'
                              ? 'bg-emerald-100 text-emerald-800'
                              : prod.status === 'CUSTOM_ONLY'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-cream-200 text-charcoal-700'
                          }`}
                        >
                          {prod.status.replace('_', ' ')}
                        </span>
                      </td>

                      {/* Featured Toggle */}
                      <td className="py-3 px-4 text-center">
                        <button
                          type="button"
                          onClick={() => handleToggleFeatured(prod)}
                          className={`p-1.5 rounded-full transition-colors ${
                            prod.isFeatured
                              ? 'text-gold-600 hover:bg-gold-50'
                              : 'text-charcoal-300 hover:text-charcoal-500'
                          }`}
                          title={prod.isFeatured ? 'Featured on homepage' : 'Not featured'}
                        >
                          <Sparkles className={`w-4 h-4 ${prod.isFeatured ? 'fill-gold-500 text-gold-500' : ''}`} />
                        </button>
                      </td>

                      {/* Published Toggle */}
                      <td className="py-3 px-4 text-center">
                        <button
                          type="button"
                          onClick={() => handleTogglePublish(prod)}
                          className={`text-xs px-2.5 py-1 rounded-full font-semibold transition-colors ${
                            prod.isPublished
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-charcoal-100 text-charcoal-500'
                          }`}
                        >
                          {prod.isPublished ? 'Published' : 'Draft'}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            href={`/products/${prod.slug}`}
                            target="_blank"
                            className="p-1.5 text-charcoal-400 hover:text-rosewood-800 hover:bg-cream-100 rounded-lg"
                            title="View on live site"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>

                          <Link
                            href={`/admin/products/${prod.id}/edit`}
                            className="p-1.5 text-charcoal-600 hover:text-rosewood-800 hover:bg-cream-100 rounded-lg"
                            title="Edit product"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Link>

                          <button
                            type="button"
                            onClick={() => setDeleteId(prod.id)}
                            className="p-1.5 text-charcoal-400 hover:text-rosewood-600 hover:bg-rosewood-50 rounded-lg"
                            title="Delete product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center space-y-3">
            <p className="text-sm font-semibold text-charcoal-800">No products found</p>
            <p className="text-xs text-charcoal-500">
              Start by adding your first boutique clothing design or clearing search filters.
            </p>
            <Link
              href="/admin/products/new"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-rosewood-800 text-white text-xs font-semibold uppercase tracking-wider shadow mt-2"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Product</span>
            </Link>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 bg-charcoal-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-2xl border border-cream-200 animate-fadeIn">
            <div className="w-10 h-10 rounded-full bg-rosewood-50 text-rosewood-800 flex items-center justify-center mx-auto">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="font-serif text-lg font-bold text-charcoal-950">
                Delete Product?
              </h3>
              <p className="text-xs text-charcoal-500">
                This action cannot be undone. The product and its images will be permanently removed.
              </p>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 rounded-xl bg-cream-100 hover:bg-cream-200 text-charcoal-800 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={deleting}
                onClick={handleDelete}
                className="flex-1 py-2.5 rounded-xl bg-rosewood-800 hover:bg-rosewood-900 text-white text-xs font-semibold disabled:opacity-50"
              >
                {deleting ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
