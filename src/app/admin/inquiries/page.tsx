'use client';

import React, { useState, useEffect } from 'react';
import {
  Inbox,
  MessageCircle,
  Phone,
  Mail,
  Trash2,
  CheckCircle,
  Loader2,
  Calendar,
  Check,
} from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { InquiryItem } from '@/types';

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDept, setFilterDept] = useState('all'); // all, boutique, makeup
  const [toastMessage, setToastMessage] = useState('');

  const fetchInquiries = async () => {
    try {
      const res = await fetch('/api/inquiries');
      const data = await res.json();
      if (data.inquiries) setInquiries(data.inquiries);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setInquiries((prev) =>
          prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus as any } : inq))
        );
        showToast(`Status updated to ${newStatus}`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this customer inquiry?')) return;
    try {
      const res = await fetch(`/api/inquiries/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setInquiries((prev) => prev.filter((inq) => inq.id !== id));
        showToast('Inquiry deleted');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const filteredInquiries = inquiries.filter((inq) => {
    if (filterStatus !== 'all' && inq.status !== filterStatus) return false;
    const isMakeup = (inq.serviceType || '').toLowerCase().includes('makeup');
    if (filterDept === 'makeup' && !isMakeup) return false;
    if (filterDept === 'boutique' && isMakeup) return false;
    return true;
  });

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
            Customer Inquiries Inbox
          </h1>
          <p className="text-xs text-charcoal-500 mt-1">
            Track inquiries for both <strong>The Stitch House</strong> and <strong>Neelima Makeup Art</strong>.
          </p>
        </div>

        {/* Status Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {['all', 'NEW', 'CONTACTED', 'CLOSED'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                filterStatus === st
                  ? 'bg-rosewood-800 text-white shadow-sm'
                  : 'bg-white border border-cream-200 text-charcoal-700 hover:bg-cream-100'
              }`}
            >
              {st === 'all' ? 'All Status' : st}
            </button>
          ))}
        </div>
      </div>

      {/* Department Tabs */}
      <div className="flex gap-2 border-b border-cream-200 pb-3">
        <button
          onClick={() => setFilterDept('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
            filterDept === 'all'
              ? 'bg-charcoal-950 text-white shadow-sm'
              : 'bg-cream-100 text-charcoal-700 hover:bg-cream-200'
          }`}
        >
          All Inquiries ({inquiries.length})
        </button>

        <button
          onClick={() => setFilterDept('boutique')}
          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
            filterDept === 'boutique'
              ? 'bg-rosewood-800 text-white shadow-sm'
              : 'bg-cream-100 text-charcoal-700 hover:bg-cream-200'
          }`}
        >
          👗 Boutique & Tailoring
        </button>

        <button
          onClick={() => setFilterDept('makeup')}
          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
            filterDept === 'makeup'
              ? 'bg-rosewood-800 text-white shadow-sm'
              : 'bg-cream-100 text-charcoal-700 hover:bg-cream-200'
          }`}
        >
          💄 Glam & Makeup Bookings
        </button>
      </div>

      {/* Inquiries List */}
      <div className="space-y-4">
        {loading ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-cream-200">
            <Loader2 className="w-8 h-8 text-rosewood-800 animate-spin mx-auto mb-2" />
            <p className="text-xs text-charcoal-500">Loading customer leads...</p>
          </div>
        ) : filteredInquiries.length > 0 ? (
          filteredInquiries.map((inq) => {
            const cleanPhone = inq.phone.replace(/[^0-9]/g, '');
            const replyMsg = `Hi ${inq.name}! 👋 This is Neelima from The Stitch House (Indore). I received your inquiry regarding "${
              inq.serviceType || 'Boutique Custom Tailoring'
            }". How can I help you? ✨`;
            const whatsappReplyUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
              replyMsg
            )}`;

            return (
              <div
                key={inq.id}
                className={`bg-white rounded-2xl p-5 sm:p-6 border shadow-soft transition-all ${
                  inq.status === 'NEW'
                    ? 'border-emerald-300 ring-1 ring-emerald-200'
                    : 'border-cream-200'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  {/* Left Column: Customer details & Message */}
                  <div className="space-y-3 min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="font-serif text-lg font-bold text-charcoal-950">
                        {inq.name}
                      </span>
                      <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-rosewood-50 text-rosewood-800 border border-rosewood-200">
                        {inq.serviceType || 'General Inquiry'}
                      </span>
                      {inq.product && (
                        <span className="text-[11px] font-medium text-gold-700">
                          Item: {inq.product.name}
                        </span>
                      )}
                    </div>

                    {/* Customer Message Box */}
                    <div className="p-3.5 rounded-xl bg-cream-50/80 border border-cream-200 text-xs sm:text-sm text-charcoal-800 leading-relaxed">
                      &ldquo;{inq.message}&rdquo;
                    </div>

                    {/* Meta info */}
                    <div className="flex flex-wrap items-center gap-4 text-xs text-charcoal-500">
                      <span className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-charcoal-400" />
                        <a
                          href={`tel:${inq.phone}`}
                          className="font-mono font-medium text-charcoal-800 hover:text-rosewood-800"
                        >
                          {inq.phone}
                        </a>
                      </span>

                      {inq.email && (
                        <span className="flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-charcoal-400" />
                          <span>{inq.email}</span>
                        </span>
                      )}

                      <span className="flex items-center gap-1.5 text-charcoal-400">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{formatDate(inq.createdAt)}</span>
                      </span>
                    </div>
                  </div>

                  {/* Right Column: Actions & Status */}
                  <div className="flex flex-row md:flex-col items-center md:items-end justify-between gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-cream-100 flex-shrink-0">
                    
                    {/* WhatsApp Reply Button (Prominent) */}
                    <a
                      href={whatsappReplyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold uppercase tracking-wider shadow transition-all"
                    >
                      <MessageCircle className="w-4 h-4 fill-white" />
                      <span>Reply on WhatsApp</span>
                    </a>

                    {/* Status Dropdown */}
                    <div className="flex items-center gap-2">
                      <select
                        value={inq.status}
                        onChange={(e) => handleUpdateStatus(inq.id, e.target.value)}
                        className={`py-1.5 px-3 rounded-xl text-xs font-semibold uppercase tracking-wider border focus:outline-none ${
                          inq.status === 'NEW'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : inq.status === 'CONTACTED'
                            ? 'bg-purple-50 text-purple-800 border-purple-300'
                            : 'bg-cream-100 text-charcoal-600 border-cream-300'
                        }`}
                      >
                        <option value="NEW">Status: NEW</option>
                        <option value="CONTACTED">Status: CONTACTED</option>
                        <option value="CLOSED">Status: CLOSED</option>
                      </select>

                      <button
                        onClick={() => handleDelete(inq.id)}
                        type="button"
                        className="p-2 text-charcoal-400 hover:text-rosewood-700 hover:bg-rosewood-50 rounded-xl transition-colors"
                        title="Delete Inquiry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-12 text-center bg-white rounded-2xl border border-cream-200 space-y-2">
            <Inbox className="w-8 h-8 text-charcoal-300 mx-auto" />
            <p className="text-sm font-semibold text-charcoal-800">No inquiries found</p>
            <p className="text-xs text-charcoal-500">
              Customer inquiries submitted through the contact form will appear here.
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
