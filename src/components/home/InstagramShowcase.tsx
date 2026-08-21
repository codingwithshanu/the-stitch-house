'use client';

import React from 'react';
import Image from 'next/image';
import { Instagram, Sparkles, ArrowUpRight } from 'lucide-react';
import { InstagramPostItem } from '@/types';

interface InstagramShowcaseProps {
  posts: InstagramPostItem[];
}

export default function InstagramShowcase({ posts }: InstagramShowcaseProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="py-16 sm:py-24 bg-cream-100/50 border-b border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-gold-700 mb-2">
            <Instagram className="w-3.5 h-3.5 text-[#E1306C]" />
            <span>@stitch_by_neelima on Instagram</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-950">
            Behind the Seams & Real Brides
          </h2>
          <p className="text-charcoal-600 text-sm sm:text-base mt-3 leading-relaxed">
            Follow our daily tailoring journey, reel showcases, client fittings, and behind-the-scenes work at our Indore studio.
          </p>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.postUrl || 'https://instagram.com/stitch_by_neelima'}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden bg-cream-200 border border-cream-300/80 shadow-soft hover:shadow-card-hover transition-all duration-300"
            >
              <Image
                src={post.imageUrl}
                alt={post.title || 'The Stitch House Instagram Post'}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />

              {/* Instagram Hover Overlay */}
              <div className="absolute inset-0 bg-charcoal-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-white">
                <div className="flex justify-end">
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-gold-300 mb-1">
                    <Instagram className="w-3.5 h-3.5" />
                    <span>View on Instagram</span>
                  </div>
                  {post.caption && (
                    <p className="text-[11px] text-cream-100 line-clamp-2 leading-snug">
                      {post.caption}
                    </p>
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Follow CTA */}
        <div className="mt-12 text-center">
          <a
            href="https://instagram.com/stitch_by_neelima"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider shadow-md hover:shadow-lg hover:opacity-95 transition-all duration-200"
          >
            <Instagram className="w-4 h-4" />
            <span>Follow @stitch_by_neelima on Instagram</span>
          </a>
        </div>

      </div>
    </section>
  );
}
