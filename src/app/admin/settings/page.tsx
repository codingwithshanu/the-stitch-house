'use client';

import React, { useState, useEffect } from 'react';
import { Settings, Save, CheckCircle, AlertCircle, Loader2, Sparkles, Building, Phone, Instagram } from 'lucide-react';
import { SiteSettingsItem } from '@/types';

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const [formData, setFormData] = useState<SiteSettingsItem>({
    id: 'default',
    businessName: 'The Stitch House',
    tagline: 'Made with Precision, Worn with Confidence.',
    phone: '+91 90743 71984',
    whatsappNumber: '919074371984',
    instagramHandle: 'stitch_by_neelima',
    instagramUrl: 'https://instagram.com/stitch_by_neelima',
    address: 'Rau, Indore, Madhya Pradesh',
    openingHours: 'Mon - Sat: 10:00 AM - 8:00 PM',
    aboutStory: '',
  });

  useEffect(() => {
    fetch('/api/settings')
      .then((r) => r.json())
      .then((data) => {
        if (data.settings) {
          setFormData(data.settings);
        }
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setFormData(data.settings);
        showToast('Boutique settings saved successfully');
      } else {
        setError(data.error || 'Failed to update settings');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  if (loading) {
    return (
      <div className="p-12 text-center">
        <Loader2 className="w-8 h-8 text-rosewood-800 animate-spin mx-auto mb-2" />
        <p className="text-xs text-charcoal-500">Loading settings...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-charcoal-950 text-white text-xs px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2 border border-gold-500/30 animate-fadeIn">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-950">
          Boutique Information & Contact Settings
        </h1>
        <p className="text-xs text-charcoal-500 mt-1">
          Update phone numbers, WhatsApp numbers, studio hours, address and social links.
        </p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-cream-200 shadow-soft">
        {error && (
          <div className="mb-6 p-3.5 bg-rosewood-50 border border-rosewood-200 rounded-xl flex items-center gap-2 text-xs text-rosewood-900">
            <AlertCircle className="w-4 h-4 text-rosewood-700 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Section: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-cream-100">
              <Building className="w-4 h-4 text-rosewood-800" />
              <h2 className="font-serif text-lg font-bold text-charcoal-900">
                Brand & Tagline
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1">
                  Business Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-200 text-xs sm:text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-rosewood-800/20 focus:border-rosewood-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1">
                  Brand Tagline
                </label>
                <input
                  type="text"
                  required
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-200 text-xs sm:text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-rosewood-800/20 focus:border-rosewood-800"
                />
              </div>
            </div>
          </div>

          {/* Section: Contact & WhatsApp */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-cream-100">
              <Phone className="w-4 h-4 text-rosewood-800" />
              <h2 className="font-serif text-lg font-bold text-charcoal-900">
                Contact & WhatsApp Redirection
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1">
                  WhatsApp Number (with country code, e.g. 919074371984)
                </label>
                <input
                  type="text"
                  required
                  value={formData.whatsappNumber}
                  onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-200 text-xs sm:text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-rosewood-800/20 focus:border-rosewood-800"
                />
                <p className="text-[10px] text-charcoal-400 mt-1">
                  This number receives all 1-tap customer quote clicks.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1">
                  Display Phone Number
                </label>
                <input
                  type="text"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-200 text-xs sm:text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-rosewood-800/20 focus:border-rosewood-800"
                />
              </div>
            </div>
          </div>

          {/* Section: Instagram & Social */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-cream-100">
              <Instagram className="w-4 h-4 text-[#E1306C]" />
              <h2 className="font-serif text-lg font-bold text-charcoal-900">
                Instagram Profile
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1">
                  Instagram Handle
                </label>
                <input
                  type="text"
                  required
                  value={formData.instagramHandle}
                  onChange={(e) => setFormData({ ...formData, instagramHandle: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-200 text-xs sm:text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-rosewood-800/20 focus:border-rosewood-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1">
                  Instagram Full URL
                </label>
                <input
                  type="url"
                  required
                  value={formData.instagramUrl}
                  onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-200 text-xs sm:text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-rosewood-800/20 focus:border-rosewood-800"
                />
              </div>
            </div>
          </div>

          {/* Section: Location & Hours */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-cream-100">
              <Sparkles className="w-4 h-4 text-gold-600" />
              <h2 className="font-serif text-lg font-bold text-charcoal-900">
                Studio Location & Opening Hours (Indore)
              </h2>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1">
                Studio Address
              </label>
              <input
                type="text"
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-200 text-xs sm:text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-rosewood-800/20 focus:border-rosewood-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1">
                Opening Hours
              </label>
              <input
                type="text"
                required
                value={formData.openingHours}
                onChange={(e) => setFormData({ ...formData, openingHours: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-cream-50 border border-cream-200 text-xs sm:text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-rosewood-800/20 focus:border-rosewood-800"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-rosewood-800 hover:bg-rosewood-900 text-white text-xs font-semibold uppercase tracking-wider shadow-md hover:shadow-lg transition-all disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving Settings...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Settings</span>
                </>
              )}
            </button>
          </div>

        </form>
      </div>

    </div>
  );
}
