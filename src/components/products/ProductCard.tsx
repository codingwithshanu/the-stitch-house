'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MessageCircle, Sparkles, Eye, ArrowRight } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { generateProductWhatsAppLink } from '@/lib/whatsapp';
import { ProductItem } from '@/types';

interface ProductCardProps {
  product: ProductItem;
  featured?: boolean;
}

export default function ProductCard({ product, featured = false }: ProductCardProps) {
  const primaryImage =
    product.images?.find((img) => img.isPrimary)?.url ||
    product.images?.[0]?.url ||
    'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80';

  const secondaryImage = product.images?.[1]?.url;

  const originUrl = typeof window !== 'undefined' ? window.location.origin : 'https://thestitchhouse.in';
  const productUrl = `${originUrl}/products/${product.slug}`;

  const whatsappUrl = generateProductWhatsAppLink({
    productName: product.name,
    price: product.price,
    priceOnRequest: product.priceOnRequest,
    productUrl,
  });

  return (
    <div className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-cream-200/80 shadow-soft hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-cream-100">
        <Link href={`/products/${product.slug}`} className="block w-full h-full">
          <Image
            src={primaryImage}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />

          {secondaryImage && (
            <Image
              src={secondaryImage}
              alt={`${product.name} alternate angle`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover object-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out absolute inset-0"
            />
          )}
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.status === 'CUSTOM_ONLY' ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-charcoal-900/85 backdrop-blur-sm text-gold-300 shadow-sm">
              <Sparkles className="w-3 h-3 text-gold-400" />
              Custom Only
            </span>
          ) : product.status === 'AVAILABLE' ? (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-emerald-800/85 backdrop-blur-sm text-emerald-100 shadow-sm">
              Available
            </span>
          ) : product.status === 'COMING_SOON' ? (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-amber-800/85 backdrop-blur-sm text-amber-100 shadow-sm">
              Coming Soon
            </span>
          ) : null}

          {product.isFeatured && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium tracking-wide bg-rosewood-800/90 text-rosewood-50">
              Featured
            </span>
          )}
        </div>

        {/* Quick View Link Button on Hover */}
        <Link
          href={`/products/${product.slug}`}
          className="absolute bottom-3 right-3 p-2.5 rounded-full bg-white/90 backdrop-blur-md text-charcoal-800 shadow-md opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-rosewood-800 hover:text-white"
          aria-label="View product details"
        >
          <Eye className="w-4 h-4" />
        </Link>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between bg-white">
        <div>
          {/* Category Tag */}
          {product.category && (
            <Link
              href={`/collections/${product.category.slug}`}
              className="text-[11px] font-semibold uppercase tracking-wider text-gold-700 hover:text-rosewood-800 transition-colors"
            >
              {product.category.name}
            </Link>
          )}

          {/* Product Title */}
          <Link href={`/products/${product.slug}`} className="block mt-1">
            <h3 className="font-serif text-base sm:text-lg font-semibold text-charcoal-900 group-hover:text-rosewood-800 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {/* Fabric / Specs preview */}
          {product.fabric && (
            <p className="text-xs text-charcoal-500 mt-1 line-clamp-1">
              Fabric: {product.fabric}
            </p>
          )}
        </div>

        {/* Price & Action Row */}
        <div className="mt-4 pt-3 border-t border-cream-100 flex items-center justify-between gap-2">
          <div>
            <span className="block text-sm sm:text-base font-bold text-rosewood-900">
              {product.priceOnRequest || !product.price
                ? 'Price on Request'
                : formatCurrency(product.price)}
            </span>
            <span className="text-[10px] text-charcoal-400 font-medium">
              Custom Stitching Available
            </span>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-600 text-emerald-800 hover:text-white text-xs font-semibold tracking-wide border border-emerald-200/80 transition-all duration-200"
            title="Enquire on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-emerald-600 group-hover:fill-white text-emerald-600" />
            <span className="hidden xs:inline">Enquire</span>
          </a>
        </div>
      </div>
    </div>
  );
}
