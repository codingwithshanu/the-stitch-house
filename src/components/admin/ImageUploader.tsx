'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Upload, Plus, Trash2, Star, ArrowLeft, ArrowRight, Link as LinkIcon, Loader2 } from 'lucide-react';
import { ProductImageItem } from '@/types';

interface ImageUploaderProps {
  images: ProductImageItem[];
  onChange: (images: ProductImageItem[]) => void;
}

export default function ImageUploader({ images, onChange }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setError('');
    setUploading(true);

    const newImages: ProductImageItem[] = [...images];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = new FormData();
      formData.append('file', file);

      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();
        if (res.ok && data.url) {
          newImages.push({
            url: data.url,
            altText: file.name,
            isPrimary: newImages.length === 0,
            sortOrder: newImages.length,
          });
        } else {
          setError(data.error || 'Failed to upload one or more images');
        }
      } catch {
        setError('Upload failed. Please try again.');
      }
    }

    onChange(newImages);
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleAddUrl = () => {
    if (!urlInput.trim()) return;
    const newImages: ProductImageItem[] = [
      ...images,
      {
        url: urlInput.trim(),
        altText: 'Product image',
        isPrimary: images.length === 0,
        sortOrder: images.length,
      },
    ];
    onChange(newImages);
    setUrlInput('');
    setShowUrlInput(false);
  };

  const handleRemove = (index: number) => {
    const updated = images.filter((_, i) => i !== index);
    if (updated.length > 0 && !updated.some((img) => img.isPrimary)) {
      updated[0].isPrimary = true;
    }
    onChange(updated);
  };

  const handleSetPrimary = (index: number) => {
    const updated = images.map((img, i) => ({
      ...img,
      isPrimary: i === index,
    }));
    onChange(updated);
  };

  const handleMove = (index: number, direction: 'left' | 'right') => {
    if (
      (direction === 'left' && index === 0) ||
      (direction === 'right' && index === images.length - 1)
    ) {
      return;
    }
    const targetIndex = direction === 'left' ? index - 1 : index + 1;
    const updated = [...images];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-800">
          Product Images ({images.length})
        </label>
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-xs text-rosewood-800 hover:underline flex items-center gap-1 font-medium"
        >
          <LinkIcon className="w-3 h-3" />
          <span>{showUrlInput ? 'Hide URL input' : 'Add image via URL'}</span>
        </button>
      </div>

      {error && (
        <p className="text-xs text-rosewood-700 bg-rosewood-50 p-2.5 rounded-xl border border-rosewood-200">
          {error}
        </p>
      )}

      {/* URL Input Bar */}
      {showUrlInput && (
        <div className="flex gap-2 p-3 bg-cream-50 rounded-xl border border-cream-200">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="Paste image URL (https://...)"
            className="flex-1 px-3 py-1.5 rounded-lg bg-white border border-cream-300 text-xs text-charcoal-900 focus:outline-none focus:ring-1 focus:ring-rosewood-800"
          />
          <button
            type="button"
            onClick={handleAddUrl}
            className="px-3.5 py-1.5 rounded-lg bg-rosewood-800 text-white text-xs font-semibold uppercase tracking-wider"
          >
            Add URL
          </button>
        </div>
      )}

      {/* Upload Dropzone */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-cream-300 hover:border-rosewood-700 bg-cream-50/50 hover:bg-cream-100/50 rounded-2xl p-6 text-center cursor-pointer transition-colors"
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp,image/avif"
          className="hidden"
          onChange={(e) => handleFileUpload(e.target.files)}
        />

        {uploading ? (
          <div className="flex flex-col items-center justify-center space-y-2 py-4">
            <Loader2 className="w-8 h-8 text-rosewood-800 animate-spin" />
            <p className="text-xs font-medium text-charcoal-600">Uploading and processing images...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-rosewood-50 flex items-center justify-center text-rosewood-800">
              <Upload className="w-5 h-5" />
            </div>
            <p className="text-xs font-semibold text-charcoal-800">
              Click or Drag & Drop photos from your phone or computer
            </p>
            <p className="text-[11px] text-charcoal-400">
              Supports JPG, PNG, WEBP, AVIF (Max 10MB per photo)
            </p>
          </div>
        )}
      </div>

      {/* Image Thumbnails Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3 pt-2">
          {images.map((img, idx) => (
            <div
              key={idx}
              className={`relative group aspect-[3/4] rounded-xl overflow-hidden bg-cream-100 border-2 transition-all ${
                img.isPrimary ? 'border-rosewood-800 ring-2 ring-rosewood-200' : 'border-cream-200'
              }`}
            >
              <Image
                src={img.url}
                alt={img.altText || `Image ${idx + 1}`}
                fill
                sizes="(max-width: 640px) 50vw, 20vw"
                className="object-cover object-center"
              />

              {/* Primary Badge */}
              {img.isPrimary && (
                <span className="absolute top-1.5 left-1.5 bg-rosewood-800 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow">
                  Cover Photo
                </span>
              )}

              {/* Action Overlays */}
              <div className="absolute inset-0 bg-charcoal-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                <div className="flex justify-between items-center">
                  {!img.isPrimary && (
                    <button
                      type="button"
                      onClick={() => handleSetPrimary(idx)}
                      title="Set as cover image"
                      className="p-1 rounded bg-white/20 hover:bg-gold-500 text-white transition-colors"
                    >
                      <Star className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemove(idx)}
                    title="Delete image"
                    className="p-1 rounded bg-white/20 hover:bg-rosewood-700 text-white transition-colors ml-auto"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => handleMove(idx, 'left')}
                    disabled={idx === 0}
                    title="Move left"
                    className="p-1 rounded bg-white/20 hover:bg-white/40 text-white disabled:opacity-30"
                  >
                    <ArrowLeft className="w-3 h-3" />
                  </button>
                  <span className="text-[10px] text-white/80 font-medium">#{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => handleMove(idx, 'right')}
                    disabled={idx === images.length - 1}
                    title="Move right"
                    className="p-1 rounded bg-white/20 hover:bg-white/40 text-white disabled:opacity-30"
                  >
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
