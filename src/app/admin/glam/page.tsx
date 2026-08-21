'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Sparkles,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  AlertCircle,
  Loader2,
  X,
  Save,
  Instagram,
  Phone,
  MessageCircle,
  Clock,
  Heart,
  ExternalLink,
} from 'lucide-react';
import { MakeupServiceItem, MakeupPortfolioItem, SiteSettingsItem } from '@/types';

export default function AdminGlamPage() {
  const [activeTab, setActiveTab] = useState<'services' | 'portfolio' | 'settings'>('services');
  const [services, setServices] = useState<MakeupServiceItem[]>([]);
  const [portfolio, setPortfolio] = useState<MakeupPortfolioItem[]>([]);
  const [settings, setSettings] = useState<SiteSettingsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState('');
  const [error, setError] = useState('');

  // Service Modal State
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<MakeupServiceItem | null>(null);
  const [serviceForm, setServiceForm] = useState({
    title: '',
    category: 'Bridal',
    description: '',
    price: '',
    priceText: '',
    duration: '',
    includes: '',
    image: '',
    sortOrder: '0',
    isFeatured: true,
  });

  // Portfolio Modal State
  const [portfolioModalOpen, setPortfolioModalOpen] = useState(false);
  const [portfolioForm, setPortfolioForm] = useState({
    title: '',
    category: 'Bridal',
    imageUrl: '',
    instagramUrl: 'https://instagram.com/glam_by_neelima',
    description: '',
    sortOrder: '0',
  });

  // Glam Settings State
  const [glamSettingsForm, setGlamSettingsForm] = useState({
    glamBusinessName: 'Neelima Makeup Art',
    glamTagline: 'Enhancing Your Natural Beauty • Professional Makeup & Hair',
    glamPhone: '+91 90743 71984',
    glamWhatsappNumber: '919074371984',
    glamInstagramHandle: 'glam_by_neelima',
    glamInstagramUrl: 'https://instagram.com/glam_by_neelima',
    glamBio: '',
    glamPricingNote: '',
  });
  const [savingSettings, setSavingSettings] = useState(false);

  const fetchData = async () => {
    try {
      const [sRes, pRes, setRes] = await Promise.all([
        fetch('/api/makeup/services').then((r) => r.json()),
        fetch('/api/makeup/portfolio').then((r) => r.json()),
        fetch('/api/settings').then((r) => r.json()),
      ]);

      if (sRes.services) setServices(sRes.services);
      if (pRes.items) setPortfolio(pRes.items);
      if (setRes.settings) {
        setSettings(setRes.settings);
        setGlamSettingsForm({
          glamBusinessName: setRes.settings.glamBusinessName || 'Neelima Makeup Art',
          glamTagline: setRes.settings.glamTagline || 'Enhancing Your Natural Beauty • Professional Makeup & Hair',
          glamPhone: setRes.settings.glamPhone || '+91 90743 71984',
          glamWhatsappNumber: setRes.settings.glamWhatsappNumber || '919074371984',
          glamInstagramHandle: setRes.settings.glamInstagramHandle || 'glam_by_neelima',
          glamInstagramUrl: setRes.settings.glamInstagramUrl || 'https://instagram.com/glam_by_neelima',
          glamBio: setRes.settings.glamBio || '',
          glamPricingNote: setRes.settings.glamPricingNote || '',
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // --- Service Handlers ---
  const openAddService = () => {
    setEditingService(null);
    setServiceForm({
      title: '',
      category: 'Bridal',
      description: '',
      price: '',
      priceText: '',
      duration: '2.5 - 3 Hours',
      includes: 'HD Base, 3D Lashes, Hair Styling, Saree Draping',
      image: '',
      sortOrder: (services.length + 1).toString(),
      isFeatured: true,
    });
    setServiceModalOpen(true);
  };

  const openEditService = (srv: MakeupServiceItem) => {
    setEditingService(srv);
    setServiceForm({
      title: srv.title,
      category: srv.category,
      description: srv.description,
      price: srv.price ? srv.price.toString() : '',
      priceText: srv.priceText || '',
      duration: srv.duration || '',
      includes: srv.includes || '',
      image: srv.image || '',
      sortOrder: srv.sortOrder.toString(),
      isFeatured: srv.isFeatured,
    });
    setServiceModalOpen(true);
  };

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      let res;
      if (editingService) {
        res = await fetch(`/api/makeup/services/${editingService.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(serviceForm),
        });
      } else {
        res = await fetch('/api/makeup/services', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(serviceForm),
        });
      }

      if (res.ok) {
        setServiceModalOpen(false);
        fetchData();
        showToast(editingService ? 'Service package updated' : 'Service package created');
      } else {
        const d = await res.json();
        setError(d.error || 'Failed to save service');
      }
    } catch {
      setError('Network error');
    }
  };

  const handleDeleteService = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service package?')) return;
    try {
      const res = await fetch(`/api/makeup/services/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setServices((prev) => prev.filter((s) => s.id !== id));
        showToast('Service package deleted');
      }
    } catch (e) {
      console.error(e);
    }
  };

  // --- Portfolio Handlers ---
  const openAddPortfolio = () => {
    setPortfolioForm({
      title: '',
      category: 'Bridal',
      imageUrl: '',
      instagramUrl: 'https://instagram.com/glam_by_neelima',
      description: '',
      sortOrder: (portfolio.length + 1).toString(),
    });
    setPortfolioModalOpen(true);
  };

  const handleSavePortfolio = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/makeup/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(portfolioForm),
      });

      if (res.ok) {
        setPortfolioModalOpen(false);
        fetchData();
        showToast('Portfolio photo added');
      } else {
        const d = await res.json();
        setError(d.error || 'Failed to save photo');
      }
    } catch {
      setError('Network error');
    }
  };

  const handleDeletePortfolio = async (id: string) => {
    if (!confirm('Are you sure you want to remove this photo from portfolio?')) return;
    try {
      const res = await fetch(`/api/makeup/portfolio/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setPortfolio((prev) => prev.filter((p) => p.id !== id));
        showToast('Photo removed');
      }
    } catch (e) {
      console.error(e);
    }
  };

  // --- Settings Handler ---
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);
    setError('');

    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(glamSettingsForm),
      });

      if (res.ok) {
        showToast('Glam & Makeup settings saved successfully');
      } else {
        setError('Failed to update settings');
      }
    } catch {
      setError('Network error');
    } finally {
      setSavingSettings(false);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-charcoal-950 text-white text-xs px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2 border border-gold-500/30 animate-fadeIn">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rosewood-50 text-rosewood-900 text-xs font-semibold uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            <span>Neelima Makeup Art (@glam_by_neelima)</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-950">
            Makeup & Hairstyling Management
          </h1>
          <p className="text-xs text-charcoal-500 mt-0.5">
            Manage your bridal packages, portfolio photos, WhatsApp booking numbers, and Instagram feed.
          </p>
        </div>

        <a
          href="/glam-by-neelima"
          target="_blank"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-cream-100 hover:bg-cream-200 text-charcoal-800 text-xs font-semibold uppercase tracking-wider border border-cream-300 transition-all self-start sm:self-auto"
        >
          <span>View Live Glam Page</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-cream-200 gap-3 overflow-x-auto">
        <button
          onClick={() => setActiveTab('services')}
          className={`pb-3 text-xs font-bold uppercase tracking-wider transition-all border-b-2 whitespace-nowrap ${
            activeTab === 'services'
              ? 'border-rosewood-800 text-rosewood-900'
              : 'border-transparent text-charcoal-500 hover:text-charcoal-800'
          }`}
        >
          💄 Makeup Packages & Pricing ({services.length})
        </button>

        <button
          onClick={() => setActiveTab('portfolio')}
          className={`pb-3 text-xs font-bold uppercase tracking-wider transition-all border-b-2 whitespace-nowrap ${
            activeTab === 'portfolio'
              ? 'border-rosewood-800 text-rosewood-900'
              : 'border-transparent text-charcoal-500 hover:text-charcoal-800'
          }`}
        >
          📸 Portfolio Looks ({portfolio.length})
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`pb-3 text-xs font-bold uppercase tracking-wider transition-all border-b-2 whitespace-nowrap ${
            activeTab === 'settings'
              ? 'border-rosewood-800 text-rosewood-900'
              : 'border-transparent text-charcoal-500 hover:text-charcoal-800'
          }`}
        >
          ⚙️ Glam Contact & Instagram Settings
        </button>
      </div>

      {/* TAB 1: SERVICES & PACKAGES */}
      {activeTab === 'services' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-xs text-charcoal-600">
              Create and manage Bridal, Engagement, Sangeet, and Party makeup packages.
            </p>
            <button
              onClick={openAddService}
              type="button"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-rosewood-800 hover:bg-rosewood-900 text-white text-xs font-semibold uppercase tracking-wider shadow"
            >
              <Plus className="w-4 h-4" />
              <span>Add Service Package</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((srv) => (
              <div
                key={srv.id}
                className="bg-white p-5 rounded-2xl border border-cream-200 shadow-soft flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rosewood-800 bg-rosewood-50 px-2.5 py-0.5 rounded-full border border-rosewood-200">
                      {srv.category}
                    </span>
                    <span className="font-serif text-base font-bold text-rosewood-900">
                      {srv.priceText || (srv.price ? `₹${srv.price.toLocaleString('en-IN')}` : 'Custom Price')}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-charcoal-900 mt-2">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-charcoal-600 mt-1">{srv.description}</p>

                  {srv.includes && (
                    <div className="mt-2.5 p-2.5 rounded-xl bg-cream-50 text-[11px] text-charcoal-700">
                      <span className="font-semibold text-charcoal-900">Includes: </span>
                      {srv.includes}
                    </div>
                  )}

                  {srv.duration && (
                    <p className="text-[10px] text-charcoal-400 mt-2 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-gold-600" />
                      <span>{srv.duration}</span>
                    </p>
                  )}
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-cream-100">
                  <button
                    onClick={() => openEditService(srv)}
                    type="button"
                    className="p-2 rounded-xl bg-cream-100 hover:bg-rosewood-50 text-charcoal-700 hover:text-rosewood-800 text-xs font-semibold flex items-center gap-1"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => handleDeleteService(srv.id)}
                    type="button"
                    className="p-2 rounded-xl bg-cream-100 hover:bg-rosewood-50 text-charcoal-400 hover:text-rosewood-700"
                    title="Delete package"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: PORTFOLIO PHOTOS */}
      {activeTab === 'portfolio' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-xs text-charcoal-600">
              Upload photos of real brides, client fittings, and hairstyle transformations.
            </p>
            <button
              onClick={openAddPortfolio}
              type="button"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-rosewood-800 hover:bg-rosewood-900 text-white text-xs font-semibold uppercase tracking-wider shadow"
            >
              <Plus className="w-4 h-4" />
              <span>Add Portfolio Photo</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {portfolio.map((item) => (
              <div
                key={item.id}
                className="group relative rounded-2xl overflow-hidden bg-white border border-cream-200 shadow-soft flex flex-col justify-between"
              >
                <div className="relative aspect-[3/4] w-full bg-cream-200">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover object-center"
                  />
                  <button
                    onClick={() => handleDeletePortfolio(item.id)}
                    type="button"
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-charcoal-950/70 text-white hover:bg-rosewood-800 transition-colors"
                    title="Delete photo"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="p-3 space-y-1">
                  <span className="text-[9px] font-bold text-gold-700 uppercase tracking-widest block">
                    {item.category}
                  </span>
                  <h4 className="font-serif font-bold text-xs text-charcoal-900 truncate">
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: GLAM SETTINGS */}
      {activeTab === 'settings' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-cream-200 shadow-soft">
          <form onSubmit={handleSaveSettings} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1">
                  Makeup Brand Name
                </label>
                <input
                  type="text"
                  required
                  value={glamSettingsForm.glamBusinessName}
                  onChange={(e) =>
                    setGlamSettingsForm({ ...glamSettingsForm, glamBusinessName: e.target.value })
                  }
                  placeholder="e.g. Neelima Makeup Art"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-200 text-xs sm:text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-rosewood-800/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1">
                  Tagline / Subtitle
                </label>
                <input
                  type="text"
                  required
                  value={glamSettingsForm.glamTagline}
                  onChange={(e) =>
                    setGlamSettingsForm({ ...glamSettingsForm, glamTagline: e.target.value })
                  }
                  placeholder="e.g. Enhancing Your Natural Beauty"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-200 text-xs sm:text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-rosewood-800/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1">
                  Makeup WhatsApp Number (Receives booking clicks)
                </label>
                <input
                  type="text"
                  required
                  value={glamSettingsForm.glamWhatsappNumber}
                  onChange={(e) =>
                    setGlamSettingsForm({ ...glamSettingsForm, glamWhatsappNumber: e.target.value })
                  }
                  placeholder="919074371984"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-200 text-xs sm:text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-rosewood-800/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1">
                  Makeup Phone Number
                </label>
                <input
                  type="text"
                  required
                  value={glamSettingsForm.glamPhone}
                  onChange={(e) =>
                    setGlamSettingsForm({ ...glamSettingsForm, glamPhone: e.target.value })
                  }
                  placeholder="+91 90743 71984"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-200 text-xs sm:text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-rosewood-800/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1">
                  Instagram Handle
                </label>
                <input
                  type="text"
                  required
                  value={glamSettingsForm.glamInstagramHandle}
                  onChange={(e) =>
                    setGlamSettingsForm({ ...glamSettingsForm, glamInstagramHandle: e.target.value })
                  }
                  placeholder="glam_by_neelima"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-200 text-xs sm:text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-rosewood-800/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1">
                  Instagram Page URL
                </label>
                <input
                  type="url"
                  required
                  value={glamSettingsForm.glamInstagramUrl}
                  onChange={(e) =>
                    setGlamSettingsForm({ ...glamSettingsForm, glamInstagramUrl: e.target.value })
                  }
                  placeholder="https://instagram.com/glam_by_neelima"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-200 text-xs sm:text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-rosewood-800/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1">
                Artist Bio / Description
              </label>
              <textarea
                rows={3}
                value={glamSettingsForm.glamBio}
                onChange={(e) =>
                  setGlamSettingsForm({ ...glamSettingsForm, glamBio: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-200 text-xs sm:text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-rosewood-800/20"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={savingSettings}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-rosewood-800 hover:bg-rosewood-900 text-white text-xs font-semibold uppercase tracking-wider shadow disabled:opacity-50"
              >
                {savingSettings ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                <span>Save Glam Settings</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Service Modal */}
      {serviceModalOpen && (
        <div className="fixed inset-0 z-50 bg-charcoal-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-4 shadow-2xl border border-cream-200 animate-fadeIn max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-2 border-b border-cream-100">
              <h3 className="font-serif text-xl font-bold text-charcoal-950">
                {editingService ? 'Edit Makeup Package' : 'Add Makeup Package'}
              </h3>
              <button onClick={() => setServiceModalOpen(false)} className="p-1 text-charcoal-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveService} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1">
                  Package Name *
                </label>
                <input
                  type="text"
                  required
                  value={serviceForm.title}
                  onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                  placeholder="e.g. HD Bridal Royal Package"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-200 text-xs sm:text-sm text-charcoal-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1">
                    Category
                  </label>
                  <select
                    value={serviceForm.category}
                    onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-200 text-xs sm:text-sm text-charcoal-900"
                  >
                    <option value="Bridal">Bridal</option>
                    <option value="Engagement">Engagement</option>
                    <option value="Party">Party</option>
                    <option value="Hair & Draping">Hair & Draping</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1">
                    Price Text
                  </label>
                  <input
                    type="text"
                    value={serviceForm.priceText}
                    onChange={(e) => setServiceForm({ ...serviceForm, priceText: e.target.value })}
                    placeholder="e.g. ₹12,500 / Session"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-200 text-xs sm:text-sm text-charcoal-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1">
                  Duration (e.g. 2.5 Hours)
                </label>
                <input
                  type="text"
                  value={serviceForm.duration}
                  onChange={(e) => setServiceForm({ ...serviceForm, duration: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-200 text-xs sm:text-sm text-charcoal-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1">
                  Package Inclusions (Comma separated)
                </label>
                <input
                  type="text"
                  value={serviceForm.includes}
                  onChange={(e) => setServiceForm({ ...serviceForm, includes: e.target.value })}
                  placeholder="HD Base, Eyelashes, Hair Styling, Saree Draping"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-200 text-xs sm:text-sm text-charcoal-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1">
                  Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={serviceForm.description}
                  onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-200 text-xs sm:text-sm text-charcoal-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  value={serviceForm.image}
                  onChange={(e) => setServiceForm({ ...serviceForm, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-200 text-xs sm:text-sm text-charcoal-900"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setServiceModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-cream-100 text-charcoal-800 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-rosewood-800 text-white text-xs font-semibold uppercase tracking-wider"
                >
                  Save Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Portfolio Modal */}
      {portfolioModalOpen && (
        <div className="fixed inset-0 z-50 bg-charcoal-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-4 shadow-2xl border border-cream-200 animate-fadeIn">
            <div className="flex justify-between items-center pb-2 border-b border-cream-100">
              <h3 className="font-serif text-xl font-bold text-charcoal-950">
                Add Portfolio Photo
              </h3>
              <button onClick={() => setPortfolioModalOpen(false)} className="p-1 text-charcoal-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePortfolio} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1">
                  Title / Bride Name *
                </label>
                <input
                  type="text"
                  required
                  value={portfolioForm.title}
                  onChange={(e) => setPortfolioForm({ ...portfolioForm, title: e.target.value })}
                  placeholder="e.g. Royal Red Bridal Look"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-200 text-xs sm:text-sm text-charcoal-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1">
                  Category
                </label>
                <select
                  value={portfolioForm.category}
                  onChange={(e) => setPortfolioForm({ ...portfolioForm, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-200 text-xs sm:text-sm text-charcoal-900"
                >
                  <option value="Bridal">Bridal</option>
                  <option value="Engagement">Engagement</option>
                  <option value="Party">Party</option>
                  <option value="Hairstyles">Hairstyles</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1">
                  Image URL *
                </label>
                <input
                  type="url"
                  required
                  value={portfolioForm.imageUrl}
                  onChange={(e) => setPortfolioForm({ ...portfolioForm, imageUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-200 text-xs sm:text-sm text-charcoal-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1">
                  Instagram Reel / Post Link
                </label>
                <input
                  type="url"
                  value={portfolioForm.instagramUrl}
                  onChange={(e) => setPortfolioForm({ ...portfolioForm, instagramUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-200 text-xs sm:text-sm text-charcoal-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1">
                  Short Description
                </label>
                <textarea
                  rows={2}
                  value={portfolioForm.description}
                  onChange={(e) => setPortfolioForm({ ...portfolioForm, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-200 text-xs sm:text-sm text-charcoal-900"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setPortfolioModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-cream-100 text-charcoal-800 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-rosewood-800 text-white text-xs font-semibold uppercase tracking-wider"
                >
                  Add Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
