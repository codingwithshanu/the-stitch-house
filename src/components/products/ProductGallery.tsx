'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import { ProductImageItem } from '@/types';

interface ProductGalleryProps {
  images: ProductImageItem[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const validImages =
    images && images.length > 0
      ? images
      : [
          {
            url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=80',
            altText: productName,
            isPrimary: true,
            sortOrder: 0,
          },
        ];

  const currentImage = validImages[selectedIndex] || validImages[0];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev === 0 ? validImages.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev === validImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-4">
      {/* Main Image Stage */}
      <div
        className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-cream-100 border border-cream-200 shadow-soft cursor-zoom-in group"
        onClick={() => setIsModalOpen(true)}
      >
        <Image
          src={currentImage.url}
          alt={currentImage.altText || productName}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Navigation Arrows for multi-image */}
        {validImages.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              type="button"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-md text-charcoal-800 hover:bg-white flex items-center justify-center shadow-md transition-all opacity-0 group-hover:opacity-100"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={handleNext}
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-md text-charcoal-800 hover:bg-white flex items-center justify-center shadow-md transition-all opacity-0 group-hover:opacity-100"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Zoom Hint Icon */}
        <div className="absolute bottom-3 right-3 p-2 rounded-full bg-charcoal-900/60 backdrop-blur-md text-white opacity-75 group-hover:opacity-100 transition-opacity">
          <Maximize2 className="w-4 h-4" />
        </div>
      </div>

      {/* Thumbnails Row */}
      {validImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 pt-1 scrollbar-none">
          {validImages.map((img, idx) => (
            <button
              key={img.id || idx}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              className={`relative w-20 h-24 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all duration-200 ${
                selectedIndex === idx
                  ? 'border-rosewood-800 ring-2 ring-rosewood-200 scale-95'
                  : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <Image
                src={img.url}
                alt={`${productName} thumbnail ${idx + 1}`}
                fill
                sizes="80px"
                className="object-cover object-center"
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-charcoal-950/95 backdrop-blur-lg flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close fullscreen preview"
          >
            <X className="w-6 h-6" />
          </button>

          <div
            className="relative max-w-4xl max-h-[85vh] w-full h-[80vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={currentImage.url}
              alt={currentImage.altText || productName}
              fill
              className="object-contain"
              sizes="100vw"
            />

            {validImages.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/30 text-white"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/30 text-white"
                  aria-label="Next"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
