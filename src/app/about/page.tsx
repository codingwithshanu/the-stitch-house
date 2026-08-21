import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, Scissors, Heart, Award, CheckCircle2, Instagram, MessageCircle } from 'lucide-react';
import { generateGeneralWhatsAppLink } from '@/lib/whatsapp';

export const metadata: Metadata = {
  title: 'About Designer Neelima & The Stitch House | Indore Boutique',
  description:
    'Discover the story behind The Stitch House in Indore. Designer Neelima brings passion, precision cuts, and bespoke couture to life.',
};

export default function AboutPage() {
  const whatsappLink = generateGeneralWhatsAppLink('Hi Neelima! I read your story on The Stitch House website and would love to consult for an outfit.');

  return (
    <div className="min-h-screen bg-cream-50 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-luxury border-4 border-white bg-cream-200">
              <Image
                src="https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=1000&q=85"
                alt="Designer Neelima at The Stitch House Studio"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="font-serif text-2xl font-bold">Neelima</p>
                <p className="text-xs text-gold-300 tracking-wider uppercase font-medium">
                  Founder & Head Couturier
                </p>
              </div>
            </div>
          </div>

          {/* Bio Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rosewood-50 text-rosewood-900 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-gold-600" />
              <span>Our Story & Vision</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal-950 leading-tight">
              &ldquo;Made with Precision, <br />
              <span className="italic font-normal text-rosewood-800">Worn with Confidence.&rdquo;</span>
            </h1>

            <p className="text-base text-charcoal-700 leading-relaxed font-sans">
              Founded in the vibrant city of <strong>Indore</strong>, <strong>The Stitch House</strong> began with a single vision: to revive the lost art of true bespoke tailoring for the modern woman.
            </p>

            <p className="text-sm sm:text-base text-charcoal-600 leading-relaxed font-sans">
              In an age of mass-produced, ill-fitting fast fashion, designer Neelima created a sanctuary where every curve, shoulder slope, and personal preference is celebrated. From hand-draped bridal lehengas and intricate zardozi blouses to festive anarkalis and subtle alterations, our focus has always been on creating garments that make you feel truly radiant.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-cream-200">
              <div className="flex items-start gap-3">
                <Scissors className="w-5 h-5 text-rosewood-800 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-serif font-bold text-charcoal-900 text-sm">Every Stitch Matters</h4>
                  <p className="text-xs text-charcoal-600">From the sharpness of the neckline to the comfort of the inner seam.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Heart className="w-5 h-5 text-rosewood-800 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-serif font-bold text-charcoal-900 text-sm">Personalized Guidance</h4>
                  <p className="text-xs text-charcoal-600">Direct design consultation with Neelima to choose what flatters you best.</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold uppercase tracking-wider shadow"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Connect with Neelima</span>
              </a>

              <a
                href="https://instagram.com/stitch_by_neelima"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-cream-100 text-charcoal-800 text-xs font-semibold uppercase tracking-wider border border-cream-300"
              >
                <Instagram className="w-4 h-4 text-[#E1306C]" />
                <span>Follow on Instagram</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
