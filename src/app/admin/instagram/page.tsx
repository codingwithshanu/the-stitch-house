'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Instagram,
  Plus,
  Trash2,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Loader2,
  X,
  Save,
} from 'lucide-react';
import { InstagramPostItem } from '@/types';

export default function AdminInstagramPage() {
  const [posts, setPosts] = useState<InstagramPostItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const [formTitle, setFormTitle] = useState('');
  const [formImageUrl, setFormImageUrl] = useState('');
  const [formPostUrl, setFormPostUrl] = useState('https://instagram.com/stitch_by_neelima');
  const [formCaption, setFormCaption] = useState('');
  const [formSortOrder, setFormSortOrder] = useState('0');

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/instagram');
      const data = await res.json();
      if (data.posts) setPosts(data.posts);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const openAddModal = () => {
    setFormTitle('');
    setFormImageUrl('');
    setFormPostUrl('https://instagram.com/stitch_by_neelima');
    setFormCaption('');
    setFormSortOrder((posts.length + 1).toString());
    setError('');
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formImageUrl.trim() || !formPostUrl.trim()) {
      setError('Image URL and Instagram Post URL are required');
      return;
    }

    setSaving(true);
    setError('');

    try {
      const res = await fetch('/api/instagram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formTitle.trim() || null,
          imageUrl: formImageUrl.trim(),
          postUrl: formPostUrl.trim(),
          caption: formCaption.trim() || null,
          sortOrder: parseInt(formSortOrder) || 0,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setModalOpen(false);
        fetchPosts();
        showToast('Instagram post added to homepage showcase');
      } else {
        setError(data.error || 'Failed to add post');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this post from showcase?')) return;
    try {
      const res = await fetch(`/api/instagram/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setPosts((prev) => prev.filter((p) => p.id !== id));
        showToast('Post removed from showcase');
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
            Instagram Showcase Manager
          </h1>
          <p className="text-xs text-charcoal-500 mt-1">
            Highlight your best Instagram reels, client fittings, and tailoring videos on the homepage.
          </p>
        </div>

        <button
          onClick={openAddModal}
          type="button"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-rosewood-800 hover:bg-rosewood-900 text-white text-xs font-semibold uppercase tracking-wider shadow transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Instagram Post</span>
        </button>
      </div>

      {/* Grid of Instagram Showcase Items */}
      <div className="bg-white rounded-2xl p-6 border border-cream-200 shadow-soft">
        {loading ? (
          <div className="p-12 text-center">
            <Loader2 className="w-8 h-8 text-rosewood-800 animate-spin mx-auto mb-2" />
            <p className="text-xs text-charcoal-500">Loading showcase items...</p>
          </div>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="group relative rounded-2xl overflow-hidden bg-cream-50 border border-cream-200 shadow-sm flex flex-col justify-between"
              >
                <div className="relative aspect-square w-full bg-cream-200">
                  <Image
                    src={post.imageUrl}
                    alt={post.title || 'Instagram Post'}
                    fill
                    sizes="(max-width: 640px) 100vw, 25vw"
                    className="object-cover object-center"
                  />
                  <a
                    href={post.postUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-charcoal-950/60 backdrop-blur-md text-white hover:bg-[#E1306C] transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="p-4 space-y-2">
                  <h4 className="font-serif font-bold text-xs text-charcoal-900 line-clamp-1">
                    {post.title || 'Instagram Showcase'}
                  </h4>
                  {post.caption && (
                    <p className="text-[11px] text-charcoal-600 line-clamp-2 leading-relaxed">
                      {post.caption}
                    </p>
                  )}

                  <div className="pt-2 border-t border-cream-100 flex items-center justify-between">
                    <span className="text-[10px] text-charcoal-400 font-medium">
                      Order: #{post.sortOrder}
                    </span>
                    <button
                      onClick={() => handleDelete(post.id)}
                      type="button"
                      className="text-xs text-rosewood-800 hover:text-rosewood-900 font-medium flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <Instagram className="w-8 h-8 text-charcoal-300 mx-auto mb-2" />
            <p className="text-sm font-semibold text-charcoal-800">No Instagram posts added yet</p>
            <p className="text-xs text-charcoal-500 mt-1">
              Add links and photo URLs to showcase your Instagram activity directly on the homepage.
            </p>
          </div>
        )}
      </div>

      {/* Add Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-charcoal-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-5 shadow-2xl border border-cream-200 animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-cream-100">
              <h3 className="font-serif text-xl font-bold text-charcoal-950">
                Add Instagram Showcase
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
                  Post Title / Description
                </label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Bridal Blouse Handwork Finished ✨"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-200 text-xs sm:text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-rosewood-800/20 focus:border-rosewood-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1">
                  Image URL *
                </label>
                <input
                  type="url"
                  required
                  value={formImageUrl}
                  onChange={(e) => setFormImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-200 text-xs sm:text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-rosewood-800/20 focus:border-rosewood-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1">
                  Instagram Post / Reel URL *
                </label>
                <input
                  type="url"
                  required
                  value={formPostUrl}
                  onChange={(e) => setFormPostUrl(e.target.value)}
                  placeholder="https://instagram.com/stitch_by_neelima"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-200 text-xs sm:text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-rosewood-800/20 focus:border-rosewood-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1">
                  Caption / Hashtags
                </label>
                <textarea
                  rows={2}
                  value={formCaption}
                  onChange={(e) => setFormCaption(e.target.value)}
                  placeholder="Handcrafted zardozi detail for our bride..."
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
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  <span>Save Post</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
