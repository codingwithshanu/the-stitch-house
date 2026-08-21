'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import ImageUploader from '@/components/admin/ImageUploader';
import { ArrowLeft, Save, Loader2, AlertCircle, Trash2 } from 'lucide-react';
import { CategoryItem, ProductImageItem } from '@/types';

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    categoryId: '',
    price: '',
    priceOnRequest: false,
    sizes: '',
    colors: '',
    fabric: '',
    customization: '',
    status: 'AVAILABLE',
    isFeatured: false,
    isPublished: true,
    tags: '',
    instagramUrl: '',
    description: '',
  });

  const [images, setImages] = useState<ProductImageItem[]>([]);

  useEffect(() => {
    Promise.all([
      fetch('/api/categories').then((r) => r.json()),
      fetch(`/api/products/${id}`).then((r) => r.json()),
    ])
      .then(([catData, prodData]) => {
        if (catData.categories) setCategories(catData.categories);
        if (prodData.product) {
          const p = prodData.product;
          setFormData({
            name: p.name || '',
            categoryId: p.categoryId || '',
            price: p.price ? p.price.toString() : '',
            priceOnRequest: Boolean(p.priceOnRequest),
            sizes: p.sizes || '',
            colors: p.colors || '',
            fabric: p.fabric || '',
            customization: p.customization || '',
            status: p.status || 'AVAILABLE',
            isFeatured: Boolean(p.isFeatured),
            isPublished: Boolean(p.isPublished),
            tags: p.tags || '',
            instagramUrl: p.instagramUrl || '',
            description: p.description || '',
          });
          setImages(p.images || []);
        }
      })
      .catch((e) => {
        console.error(e);
        setError('Failed to load product data');
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('Please enter a product name');
      return;
    }
    if (!formData.categoryId) {
      setError('Please select a category');
      return;
    }
    if (images.length === 0) {
      setError('Please upload at least one product photo');
      return;
    }

    setSaving(true);
    setError('');

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          images,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        router.push('/admin/products');
        router.refresh();
      } else {
        setError(data.error || 'Failed to update product');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center">
        <Loader2 className="w-8 h-8 text-rosewood-800 animate-spin mx-auto mb-2" />
        <p className="text-xs text-charcoal-500">Loading product details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Top Breadcrumb & Action */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-charcoal-600 hover:text-rosewood-800"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Products</span>
        </Link>
        <span className="text-xs text-gold-700 font-semibold uppercase tracking-wider">
          Edit Product Design
        </span>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-cream-200 shadow-soft">
        <div className="mb-6 pb-4 border-b border-cream-100">
          <h1 className="font-serif text-2xl font-bold text-charcoal-950">
            Edit: {formData.name}
          </h1>
          <p className="text-xs text-charcoal-500 mt-1">
            Update pricing, photos, customization scopes or availability status.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 bg-rosewood-50 border border-rosewood-200 rounded-xl flex items-center gap-2 text-xs text-rosewood-900">
            <AlertCircle className="w-4 h-4 text-rosewood-700 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Images Uploader Section */}
          <div className="p-5 bg-cream-50/70 rounded-2xl border border-cream-200">
            <ImageUploader images={images} onChange={setImages} />
          </div>

          {/* Name & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1.5">
                Product Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-200 text-xs sm:text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-rosewood-800/20 focus:border-rosewood-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1.5">
                Category *
              </label>
              <select
                required
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-200 text-xs sm:text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-rosewood-800/20 focus:border-rosewood-800"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Pricing & Price on Request */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1.5">
                Price (₹ INR)
              </label>
              <input
                type="number"
                disabled={formData.priceOnRequest}
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="e.g. 8500"
                className="w-full px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-200 text-xs sm:text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-rosewood-800/20 focus:border-rosewood-800 disabled:opacity-40"
              />
            </div>

            <div className="sm:pt-5">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.priceOnRequest}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      priceOnRequest: e.target.checked,
                      price: e.target.checked ? '' : formData.price,
                    })
                  }
                  className="w-4 h-4 rounded text-rosewood-800 focus:ring-rosewood-800"
                />
                <span className="text-xs font-semibold text-charcoal-800">
                  Mark as &ldquo;Price on Request / Custom Stitching&rdquo;
                </span>
              </label>
            </div>
          </div>

          {/* Fabric, Sizes, Colors */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1.5">
                Fabric / Material
              </label>
              <input
                type="text"
                value={formData.fabric}
                onChange={(e) => setFormData({ ...formData, fabric: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-200 text-xs text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-rosewood-800/20 focus:border-rosewood-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1.5">
                Available Sizes
              </label>
              <input
                type="text"
                value={formData.sizes}
                onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-200 text-xs text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-rosewood-800/20 focus:border-rosewood-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1.5">
                Colors Available
              </label>
              <input
                type="text"
                value={formData.colors}
                onChange={(e) => setFormData({ ...formData, colors: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-200 text-xs text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-rosewood-800/20 focus:border-rosewood-800"
              />
            </div>
          </div>

          {/* Customization Notes & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1.5">
                Customization / Alteration Scope
              </label>
              <input
                type="text"
                value={formData.customization}
                onChange={(e) => setFormData({ ...formData, customization: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-200 text-xs text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-rosewood-800/20 focus:border-rosewood-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1.5">
                Product Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-200 text-xs text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-rosewood-800/20 focus:border-rosewood-800"
              >
                <option value="AVAILABLE">Available (In-Stock / Ready to Stitch)</option>
                <option value="CUSTOM_ONLY">Custom Order Only (Bespoke)</option>
                <option value="COMING_SOON">Coming Soon</option>
                <option value="SOLD_OUT">Sold Out / Unavailable</option>
              </select>
            </div>
          </div>

          {/* Tags & Instagram Link */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1.5">
                Tags (Comma separated)
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-200 text-xs text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-rosewood-800/20 focus:border-rosewood-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1.5">
                Instagram Reel / Post URL (Optional)
              </label>
              <input
                type="url"
                value={formData.instagramUrl}
                onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-200 text-xs text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-rosewood-800/20 focus:border-rosewood-800"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1.5">
              Product Description *
            </label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-200 text-xs sm:text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-rosewood-800/20 focus:border-rosewood-800"
            />
          </div>

          {/* Checkboxes: Featured & Published */}
          <div className="flex flex-wrap gap-6 pt-2 border-t border-cream-100">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                className="w-4 h-4 rounded text-rosewood-800 focus:ring-rosewood-800"
              />
              <span className="text-xs font-semibold text-charcoal-800">
                Mark as Featured (Show on Homepage)
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isPublished}
                onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                className="w-4 h-4 rounded text-rosewood-800 focus:ring-rosewood-800"
              />
              <span className="text-xs font-semibold text-charcoal-800">
                Publish to website
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <div className="pt-4 flex justify-end gap-3">
            <Link
              href="/admin/products"
              className="px-6 py-3 rounded-xl bg-cream-100 hover:bg-cream-200 text-charcoal-800 text-xs font-semibold uppercase tracking-wider"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-rosewood-800 hover:bg-rosewood-900 text-white text-xs font-semibold uppercase tracking-wider shadow-md hover:shadow-lg transition-all disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Updating Product...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Update Product</span>
                </>
              )}
            </button>
          </div>

        </form>
      </div>

    </div>
  );
}
