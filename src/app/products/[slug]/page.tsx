import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import ProductGallery from '@/components/products/ProductGallery';
import WhatsAppEnquiryButton from '@/components/products/WhatsAppEnquiryButton';
import ProductCard from '@/components/products/ProductCard';
import { formatCurrency } from '@/lib/utils';
import {
  Sparkles,
  Scissors,
  CheckCircle2,
  ShieldCheck,
  Truck,
  Instagram,
  ArrowLeft,
  Ruler,
} from 'lucide-react';

interface ProductDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: { images: true, category: true },
  });

  if (!product) {
    return { title: 'Product Not Found | The Stitch House' };
  }

  const primaryImage = product.images?.[0]?.url || 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b';

  return {
    title: `${product.name} — The Stitch House Indore`,
    description: product.description.slice(0, 160),
    openGraph: {
      title: `${product.name} | The Stitch House`,
      description: product.description.slice(0, 160),
      images: [
        {
          url: primaryImage,
          width: 1000,
          height: 1250,
          alt: product.name,
        },
      ],
    },
  };
}

export const revalidate = 60;

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      category: true,
      images: {
        orderBy: { sortOrder: 'asc' },
      },
    },
  });

  if (!product || !product.isPublished) {
    notFound();
  }

  // Increment view count asynchronously
  prisma.product
    .update({
      where: { id: product.id },
      data: { viewsCount: { increment: 1 } },
    })
    .catch(() => {});

  // Fetch related products in the same category
  const relatedProducts = await prisma.product.findMany({
    where: {
      categoryId: product.categoryId,
      isPublished: true,
      NOT: { id: product.id },
    },
    include: {
      category: true,
      images: {
        orderBy: { sortOrder: 'asc' },
      },
    },
    take: 4,
  });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images.map((img) => img.url),
    description: product.description,
    category: product.category?.name,
    offers: {
      '@type': 'Offer',
      price: product.price ? product.price.toString() : '0',
      priceCurrency: 'INR',
      availability:
        product.status === 'AVAILABLE'
          ? 'https://schema.org/InStock'
          : 'https://schema.org/PreOrder',
      seller: {
        '@type': 'Organization',
        name: 'The Stitch House Indore',
      },
    },
  };

  return (
    <div className="min-h-screen bg-cream-50 py-8 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-charcoal-500 mb-6 sm:mb-8 overflow-x-auto whitespace-nowrap pb-1">
          <Link href="/" className="hover:text-rosewood-800">
            Home
          </Link>
          <span>/</span>
          <Link href="/collections" className="hover:text-rosewood-800">
            Collections
          </Link>
          {product.category && (
            <>
              <span>/</span>
              <Link
                href={`/collections/${product.category.slug}`}
                className="hover:text-rosewood-800"
              >
                {product.category.name}
              </Link>
            </>
          )}
          <span>/</span>
          <span className="text-charcoal-800 font-semibold truncate max-w-[200px]">
            {product.name}
          </span>
        </nav>

        {/* Main Product Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 bg-white p-6 sm:p-10 rounded-3xl border border-cream-200 shadow-soft">
          
          {/* Left Column: Gallery */}
          <div className="lg:col-span-6">
            <ProductGallery images={product.images as any} productName={product.name} />
          </div>

          {/* Right Column: Product Information & Inquiries */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              
              {/* Category & Status Badges */}
              <div className="flex flex-wrap items-center gap-2">
                {product.category && (
                  <Link
                    href={`/collections/${product.category.slug}`}
                    className="text-xs font-semibold uppercase tracking-wider text-rosewood-800 bg-rosewood-50 px-3 py-1 rounded-full border border-rosewood-200/60"
                  >
                    {product.category.name}
                  </Link>
                )}

                {product.status === 'CUSTOM_ONLY' ? (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-charcoal-900 text-gold-300">
                    <Sparkles className="w-3 h-3 text-gold-400" />
                    Custom Order Only
                  </span>
                ) : product.status === 'AVAILABLE' ? (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-100 text-emerald-800">
                    Ready to Order / Stitch
                  </span>
                ) : null}
              </div>

              {/* Product Title */}
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-charcoal-950 leading-tight">
                {product.name}
              </h1>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 pt-1">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-rosewood-900">
                  {product.priceOnRequest || !product.price
                    ? 'Price on Request'
                    : formatCurrency(product.price)}
                </span>
                <span className="text-xs text-charcoal-500 font-medium">
                  • Tailored with precision in Indore
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-charcoal-600 leading-relaxed pt-2">
                {product.description}
              </p>

              {/* Specifications / Boutique Details */}
              <div className="pt-4 border-t border-cream-100 space-y-2.5 text-xs text-charcoal-700">
                {product.fabric && (
                  <div className="flex items-start gap-2">
                    <span className="font-semibold text-charcoal-900 min-w-[110px]">Fabric & Material:</span>
                    <span>{product.fabric}</span>
                  </div>
                )}
                {product.sizes && (
                  <div className="flex items-start gap-2">
                    <span className="font-semibold text-charcoal-900 min-w-[110px]">Available Sizing:</span>
                    <span>{product.sizes}</span>
                  </div>
                )}
                {product.colors && (
                  <div className="flex items-start gap-2">
                    <span className="font-semibold text-charcoal-900 min-w-[110px]">Color Palette:</span>
                    <span>{product.colors}</span>
                  </div>
                )}
                {product.customization && (
                  <div className="flex items-start gap-2">
                    <span className="font-semibold text-charcoal-900 min-w-[110px]">Customization:</span>
                    <span className="text-rosewood-800 font-medium">{product.customization}</span>
                  </div>
                )}
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 gap-3 pt-3">
                <div className="flex items-center gap-2 text-xs text-charcoal-600 bg-cream-50 p-2.5 rounded-xl">
                  <Ruler className="w-4 h-4 text-gold-600 flex-shrink-0" />
                  <span>Custom Measurements</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-charcoal-600 bg-cream-50 p-2.5 rounded-xl">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Trial & Fit Guarantee</span>
                </div>
              </div>

            </div>

            {/* WhatsApp & Instagram Conversion CTA Component */}
            <div className="pt-4">
              <WhatsAppEnquiryButton product={product as any} />
            </div>

          </div>

        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 sm:mt-24">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-gold-700">
                  More in {product.category?.name}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-950 mt-1">
                  You May Also Love
                </h2>
              </div>
              <Link
                href={`/collections/${product.category?.slug}`}
                className="text-xs font-semibold uppercase tracking-wider text-rosewood-800 hover:text-rosewood-900 hidden sm:inline"
              >
                View Category →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel as any} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
