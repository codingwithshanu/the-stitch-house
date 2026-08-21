'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  FolderTree,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  AlertCircle,
  Loader2,
  X,
  Save,
} from 'lucide-react';
import { CategoryItem } from '@/types';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const [formName, setFormName] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formImage, setFormImage] = useState('');
  const [formSortOrder, setFormSortOrder] = useState('0');

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      if (data.categories) setCategories(data.categories);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const openAddModal = () => {
    setEditingCategory(null);
    setFormName('');
    setFormDescription('');
    setFormImage('');
    setFormSortOrder(categories.length.toString());
    setError('');
    setModalOpen(true);
  };

  const openEditModal = (cat: CategoryItem) => {
    setEditingCategory(cat);
    setFormName(cat.name);
    setFormDescription(cat.description || '');
    setFormImage(cat.image || '');
    setFormSortOrder(cat.sortOrder.toString());
    setError('');
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      setError('Please enter category name');
      return;
    }
    setSaving(true);
    setError('');

    try {
      const payload = {
        name: formName.trim(),
        description: formDescription.trim() || null,
        image: formImage.trim() || null,
        sortOrder: parseInt(formSortOrder) || 0,
      };

      let res;
      if (editingCategory) {
        res = await fetch(`/api/categories/${editingCategory.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch('/api/categories', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      const data = await res.json();
      if (res.ok) {
        setModalOpen(false);
        fetchCategories();
        showToast(editingCategory ? 'Category updated' : 'Category created');
      } else {
        setError(data.error || 'Failed to save category');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await fetch(`/api/categories/${deleteId}`, { method: 'DELETE' });
      if (res.ok) {
        setCategories((prev) => prev.filter((c) => c.id !== deleteId));
        setDeleteId(null);
        showToast('Category deleted successfully');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-charcoal-950 text-white text-xs px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2 border border-gold-500/30 animate-fadeIn">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-950">
            Product Categories
          </h1>
          <p className="text-xs text-charcoal-500 mt-1">
            Organize clothing into Lehengas, Blouses, Salwar Suits, Dresses, etc.
          </p>
        </div>

        <button
          onClick={openAddModal}
          type="button"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-rosewood-800 hover:bg-rosewood-900 text-white text-xs font-semibold uppercase tracking-wider shadow transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Category</span>
        </button>
      </div>

      {/* Categories Grid */}
      <div className="bg-white rounded-2xl border border-cream-200 shadow-soft overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <Loader2 className="w-8 h-8 text-rosewood-800 animate-spin mx-auto mb-2" />
            <p className="text-xs text-charcoal-500">Loading categories...</p>
          </div>
        ) : categories.length > 0 ? (
          <div className="divide-y divide-cream-100">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-cream-50/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-16 rounded-xl overflow-hidden bg-cream-200 flex-shrink-0 border border-cream-200">
                    <Image
                      src={
                        cat.image ||
                        'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=400&q=80'
                      }
                      alt={cat.name}
                      fill
                      sizes="56px"
                      className="object-cover object-center"
                    />
                  </div>

                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <h3 className="font-serif text-base font-bold text-charcoal-950">
                        {cat.name}
                      </h3>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-rosewood-50 text-rosewood-800 font-semibold">
                        /{cat.slug}
                      </span>
                    </div>
                    {cat.description && (
                      <p className="text-xs text-charcoal-600 line-clamp-1">
                        {cat.description}
                      </p>
                    )}
                    <p className="text-[11px] text-gold-700 font-medium">
                      {cat._count?.products || 0} Products attached
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => openEditModal(cat)}
                    type="button"
                    className="p-2 rounded-xl bg-cream-100 hover:bg-rosewood-50 text-charcoal-700 hover:text-rosewood-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => setDeleteId(cat.id)}
                    type="button"
                    className="p-2 rounded-xl bg-cream-100 hover:bg-rosewood-50 text-charcoal-500 hover:text-rosewood-700 transition-colors"
                    title="Delete category"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <p className="text-xs text-charcoal-500">No categories created yet.</p>
          </div>
        )}
      </div>

      {/* Add / Edit Category Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-charcoal-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-5 shadow-2xl border border-cream-200 animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-cream-100">
              <h3 className="font-serif text-xl font-bold text-charcoal-950">
                {editingCategory ? 'Edit Category' : 'Add New Category'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 text-charcoal-400 hover:text-charcoal-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <div className="p-3 bg-rosewood-50 border border-rosewood-200 rounded-xl flex items-center gap-2 text-xs text-rosewood-900">
                <AlertCircle className="w-4 h-4 text-rosewood-700 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Designer Blouses"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-200 text-xs sm:text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-rosewood-800/20 focus:border-rosewood-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1">
                  Category Image URL
                </label>
                <input
                  type="url"
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-200 text-xs sm:text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-rosewood-800/20 focus:border-rosewood-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1">
                  Sort Order Number
                </label>
                <input
                  type="number"
                  value={formSortOrder}
                  onChange={(e) => setFormSortOrder(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-200 text-xs sm:text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-rosewood-800/20 focus:border-rosewood-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1">
                  Short Description
                </label>
                <textarea
                  rows={2}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Short summary for category banner..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-200 text-xs sm:text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-rosewood-800/20 focus:border-rosewood-800"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-cream-100 hover:bg-cream-200 text-charcoal-800 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-rosewood-800 hover:bg-rosewood-900 text-white text-xs font-semibold uppercase tracking-wider disabled:opacity-50"
                >
                  {saving ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  <span>Save Category</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 bg-charcoal-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-2xl border border-cream-200 animate-fadeIn">
            <div className="w-10 h-10 rounded-full bg-rosewood-50 text-rosewood-800 flex items-center justify-center mx-auto">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="font-serif text-lg font-bold text-charcoal-950">
                Delete Category?
              </h3>
              <p className="text-xs text-charcoal-500">
                Products in this category will also be deleted.
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
                onClick={handleDelete}
                className="flex-1 py-2.5 rounded-xl bg-rosewood-800 hover:bg-rosewood-900 text-white text-xs font-semibold"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
