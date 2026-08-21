'use client';

import React, { useState } from 'react';
import { MessageCircle, Instagram, Sparkles, Check } from 'lucide-react';
import { generateProductWhatsAppLink } from '@/lib/whatsapp';
import { ProductItem } from '@/types';

interface WhatsAppEnquiryButtonProps {
  product: ProductItem;
}

export default function WhatsAppEnquiryButton({ product }: WhatsAppEnquiryButtonProps) {
  const sizesList = product.sizes ? product.sizes.split(',').map((s) => s.trim()) : [];
  const colorsList = product.colors ? product.colors.split(',').map((c) => c.trim()) : [];

  const [selectedSize, setSelectedSize] = useState<string>(sizesList[0] || 'Custom Sizing');
  const [selectedColor, setSelectedColor] = useState<string>(colorsList[0] || '');

  const originUrl = typeof window !== 'undefined' ? window.location.origin : 'https://thestitchhouse.in';
  const productUrl = `${originUrl}/products/${product.slug}`;

  const whatsappUrl = generateProductWhatsAppLink({
    productName: product.name,
    price: product.price,
    priceOnRequest: product.priceOnRequest,
    productUrl,
    selectedSize,
    selectedColor: selectedColor || undefined,
  });

  return (
    <div className="space-y-6 bg-cream-50/80 p-5 sm:p-6 rounded-2xl border border-cream-200">
      {/* Size Selector */}
      {sizesList.length > 0 && (
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 mb-2.5">
            Select Size / Custom Measurement:
          </label>
          <div className="flex flex-wrap gap-2">
            {sizesList.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                  selectedSize === size
                    ? 'border-rosewood-800 bg-rosewood-800 text-white shadow-sm'
                    : 'border-cream-300 bg-white text-charcoal-700 hover:border-gold-400'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Color Selector */}
      {colorsList.length > 0 && (
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 mb-2.5">
            Available / Custom Color Options:
          </label>
          <div className="flex flex-wrap gap-2">
            {colorsList.map((col) => (
              <button
                key={col}
                type="button"
                onClick={() => setSelectedColor(col)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium border transition-all flex items-center gap-1.5 ${
                  selectedColor === col
                    ? 'border-rosewood-800 bg-rosewood-800 text-white shadow-sm'
                    : 'border-cream-300 bg-white text-charcoal-700 hover:border-gold-400'
                }`}
              >
                {selectedColor === col && <Check className="w-3 h-3" />}
                {col}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-3 pt-2">
        {/* WhatsApp Direct Order / Inquiry CTA */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold uppercase tracking-wider text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
        >
          <MessageCircle className="w-5 h-5 fill-white text-white" />
          <span>Enquire / Order on WhatsApp</span>
        </a>

        {/* Instagram DM button */}
        {/* {product.instagramUrl && (
          <a
            href={product.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2.5 py-3 px-6 rounded-xl bg-white hover:bg-cream-100 text-charcoal-800 font-medium text-xs border border-cream-300 hover:border-cream-400 transition-colors"
          >
            <Instagram className="w-4 h-4 text-[#E1306C]" />
            <span>View Reel & DM on Instagram</span>
          </a>
        )} */}

        <div className="flex items-center justify-center gap-2 text-[11px] text-charcoal-500 pt-1">
          <Sparkles className="w-3 h-3 text-gold-500" />
          <span>Direct chat with Designer Neelima</span>
        </div>
      </div>
    </div>
  );
}
