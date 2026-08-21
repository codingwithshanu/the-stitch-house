import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import {
  Shirt,
  FolderTree,
  Inbox,
  Eye,
  Plus,
  Sparkles,
  ArrowRight,
  MessageCircle,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { formatCurrency, formatDate, formatTimeAgo } from '@/lib/utils';
import { generateGeneralWhatsAppLink } from '@/lib/whatsapp';

export const revalidate = 0; // Fresh dashboard metrics

export default async function AdminDashboardPage() {
  const [
    totalProducts,
    publishedProducts,
    featuredProducts,
    totalCategories,
    recentInquiries,
    newInquiriesCount,
    topViewedProducts,
  ] = await Promise.all([
    prisma.product.count(),
    prisma.product.count({ where: { isPublished: true } }),
    prisma.product.count({ where: { isFeatured: true } }),
    prisma.category.count(),
    prisma.inquiry.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        product: {
          select: { name: true, slug: true },
        },
      },
    }),
    prisma.inquiry.count({ where: { status: 'NEW' } }),
    prisma.product.findMany({
      take: 4,
      orderBy: { viewsCount: 'desc' },
      include: { category: true, images: { take: 1 } },
    }),
  ]);

  const stats = [
    {
      title: 'Total Catalog Designs',
      value: totalProducts,
      subtitle: `${publishedProducts} Published • ${totalProducts - publishedProducts} Drafts`,
      icon: Shirt,
      color: 'bg-rosewood-50 text-rosewood-800 border-rosewood-200',
    },
    {
      title: 'Customer Inquiries',
      value: recentInquiries.length,
      subtitle: `${newInquiriesCount} New unread leads`,
      icon: Inbox,
      color: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    },
    {
      title: 'Categories',
      value: totalCategories,
      subtitle: 'Lehengas, Blouses, Suits, etc.',
      icon: FolderTree,
      color: 'bg-gold-50 text-gold-800 border-gold-200',
    },
    {
      title: 'Featured Pieces',
      value: featuredProducts,
      subtitle: 'Displayed on Home Page',
      icon: Sparkles,
      color: 'bg-purple-50 text-purple-800 border-purple-200',
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-rosewood-900 via-rosewood-800 to-charcoal-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl relative overflow-hidden">
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-gold-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Stitch House Boutique Dashboard</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Welcome back, Neelima! ✨
          </h1>
          <p className="text-xs sm:text-sm text-cream-200 max-w-lg">
            Manage your boutique catalog, add new festive clothing designs, and follow up on customer WhatsApp inquiries.
          </p>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gold-500 hover:bg-gold-400 text-charcoal-950 text-xs font-bold uppercase tracking-wider shadow-lg transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </Link>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-cream-200 shadow-soft flex items-center justify-between"
            >
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-charcoal-500">
                  {stat.title}
                </p>
                <p className="font-serif text-3xl font-bold text-charcoal-900">
                  {stat.value}
                </p>
                <p className="text-[11px] text-charcoal-500 font-medium">
                  {stat.subtitle}
                </p>
              </div>

              <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${stat.color}`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Two Column Section: Recent Inquiries & Most Popular Products */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Recent Inquiries */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-cream-200 shadow-soft space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-cream-100">
            <div>
              <h2 className="font-serif text-xl font-bold text-charcoal-900">
                Recent Customer Inquiries
              </h2>
              <p className="text-xs text-charcoal-500">
                Leads submitted from the website form
              </p>
            </div>

            <Link
              href="/admin/inquiries"
              className="text-xs font-semibold uppercase tracking-wider text-rosewood-800 hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentInquiries.length > 0 ? (
            <div className="divide-y divide-cream-100">
              {recentInquiries.map((inq) => (
                <div key={inq.id} className="py-3.5 flex items-start justify-between gap-4">
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-charcoal-900">
                        {inq.name}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-cream-100 text-charcoal-700">
                        {inq.serviceType || 'Inquiry'}
                      </span>
                      {inq.status === 'NEW' && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-800">
                          NEW
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-charcoal-600 line-clamp-1">
                      {inq.message}
                    </p>

                    <p className="text-[10px] text-charcoal-400">
                      {formatDate(inq.createdAt)} • Phone: {inq.phone}
                    </p>
                  </div>

                  <a
                    href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                      `Hi ${inq.name}! This is Neelima from The Stitch House. I received your inquiry about ${
                        inq.serviceType || 'custom tailoring'
                      }. How can I help you?`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white transition-colors flex-shrink-0"
                    title="Reply on WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-charcoal-500 py-8 text-center">
              No customer inquiries yet.
            </p>
          )}
        </div>

        {/* Most Viewed Products */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-cream-200 shadow-soft space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-cream-100">
            <div>
              <h2 className="font-serif text-xl font-bold text-charcoal-900">
                Most Viewed Designs
              </h2>
              <p className="text-xs text-charcoal-500">Popular items on the website</p>
            </div>

            <Link
              href="/admin/products"
              className="text-xs font-semibold uppercase tracking-wider text-rosewood-800 hover:underline flex items-center gap-1"
            >
              <span>Manage</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {topViewedProducts.map((prod) => (
              <div
                key={prod.id}
                className="flex items-center justify-between p-3 rounded-2xl bg-cream-50/70 border border-cream-100 hover:border-gold-300 transition-colors"
              >
                <div className="min-w-0 pr-2">
                  <p className="font-semibold text-xs text-charcoal-900 truncate">
                    {prod.name}
                  </p>
                  <p className="text-[11px] text-rosewood-800 font-medium mt-0.5">
                    {prod.priceOnRequest || !prod.price ? 'Price on Request' : formatCurrency(prod.price)}
                  </p>
                </div>

                <div className="flex items-center gap-1 text-xs text-charcoal-500 font-medium flex-shrink-0">
                  <Eye className="w-3.5 h-3.5 text-gold-600" />
                  <span>{prod.viewsCount} views</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
