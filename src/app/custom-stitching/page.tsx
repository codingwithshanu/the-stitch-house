import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Scissors,
  Sparkles,
  Ruler,
  CheckCircle2,
  MessageCircle,
  Clock,
  HeartHandshake,
  Shirt,
  Layers,
} from 'lucide-react';
import { generateCustomStitchingWhatsAppLink } from '@/lib/whatsapp';

export const metadata: Metadata = {
  title: 'Custom Stitching & Tailoring Services in Indore | The Stitch House',
  description:
    'Bespoke tailoring for designer blouses, bridal lehengas, anarkalis, and precision alterations in Indore by Neelima. Perfect measurements and doorstep delivery.',
};

export default function CustomStitchingPage() {
  const services = [
    {
      title: 'Designer Blouse Stitching',
      subtitle: 'Princess Cut • Padded • Hand Embroidery • Deep Backs',
      description:
        'Crafted with premium cup padding, cotton inner lining, and impeccable armhole fit. Choose from boat necks, halter cuts, sweetheart necklines, or bring your Pinterest reference.',
      startingPrice: '₹750',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Bridal & Festive Lehenga Tailoring',
      subtitle: 'Double Cancan • Custom Latkans • Perfect Waist Flare',
      description:
        'Full bespoke stitching of kalidar lehengas, umbrella flares, and panelled bridal skirts with heavy cancan support, matching dupattas, and handcrafted designer tassels.',
      startingPrice: '₹2,500',
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Salwar Suits, Anarkalis & Shararas',
      subtitle: 'Straight Cuts • Chanderi Silk • Floor Length Anarkalis',
      description:
        'Tailored suits that drape effortlessly. Custom trouser cuts (palazzo, cigarette pants, dhoti salwars) and flared royal anarkalis with delicate neck piping.',
      startingPrice: '₹1,200',
      image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: "Little Girls' Ethnic Outfits",
      subtitle: 'Itch-Free • Cotton Lined • Festive Frocks & Mini Lehengas',
      description:
        'Adorably styled ethnic outfits crafted with ultra-soft baby-friendly cotton lining and comfortable elasticated waistbands. Matching mother-daughter sets available.',
      startingPrice: '₹1,400',
      image: 'https://images.unsplash.com/photo-1621786030684-4c64829cff04?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Indo-Western Gowns & Drape Dresses',
      subtitle: 'Saree Gowns • Jacket Sets • Cocktail Silhouette',
      description:
        'Contemporary silhouettes, pre-pleated drape sarees, fusion capes, and bespoke party gowns tailored to accentuate modern proportions.',
      startingPrice: '₹2,000',
      image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Precision Alterations & Restyling',
      subtitle: 'Resizing • Neckline Restyling • Lengthening/Shortening',
      description:
        'Transform your heirloom sarees into lehengas or blouses, adjust pre-bought designer outfits, or resize tight garments with discreet panels.',
      startingPrice: '₹250',
      image: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const measurementTips = [
    { title: 'Bust / Chest', desc: 'Measure around the fullest part of your bust wearing your standard undergarments.' },
    { title: 'Waist & Upper Waist', desc: 'Measure at your natural waistline (usually 1 inch above your belly button for blouses).' },
    { title: 'Shoulder to Shoulder', desc: 'Measure from one shoulder bone tip across the back to the other.' },
    { title: 'Front / Back Neck Depth', desc: 'Measure diagonally from shoulder point to where you want the neckline to end.' },
    { title: 'Sleeve Length & Round', desc: 'From shoulder bone to desired sleeve hem, plus arm circumference.' },
    { title: 'Lehenga / Kurta Length', desc: 'From waist (where tied) down to floor or ankle, keeping heels in mind.' },
  ];

  const whatsappGeneral = generateCustomStitchingWhatsAppLink('Bespoke Custom Stitching');

  return (
    <div className="min-h-screen bg-cream-50 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rosewood-50 text-rosewood-900 text-xs font-semibold uppercase tracking-wider">
            <Scissors className="w-3.5 h-3.5 text-gold-600" />
            <span>Bespoke Tailoring in Indore</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal-950">
            Custom Stitching Crafted Just For You
          </h1>

          <p className="text-charcoal-600 text-sm sm:text-base leading-relaxed">
            No two bodies are identical. At The Stitch House, every garment is drafted from a blank canvas to match your individual posture, preferences, and elegance.
          </p>

          <div className="pt-2">
            <a
              href={whatsappGeneral}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold uppercase tracking-wider shadow-lg transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Book Stitching Consultation on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Services Cards */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900">
              Our Tailoring Specialties
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
              Select any service and contact us to discuss design details.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl overflow-hidden border border-cream-200 shadow-soft hover:shadow-card-hover transition-all flex flex-col justify-between"
              >
                <div className="relative aspect-[16/10] w-full bg-cream-100">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center"
                  />
                  <div className="absolute top-3 right-3 bg-charcoal-900/80 backdrop-blur-md px-3 py-1 rounded-full text-gold-300 text-xs font-semibold">
                    From {service.startingPrice}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-charcoal-900">
                      {service.title}
                    </h3>
                    <p className="text-xs font-medium text-rosewood-800 mt-0.5">
                      {service.subtitle}
                    </p>
                    <p className="text-xs sm:text-sm text-charcoal-600 mt-2.5 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-cream-100">
                    <a
                      href={generateCustomStitchingWhatsAppLink(service.title)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-cream-100 hover:bg-rosewood-800 text-charcoal-800 hover:text-white text-xs font-semibold uppercase tracking-wider transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-current" />
                      <span>Enquire for {service.title}</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Measurement Guide Section */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-cream-200 shadow-soft">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-gold-700">
                <Ruler className="w-3.5 h-3.5" />
                <span>Simple & Accurate</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-950">
                How We Take Your Measurements
              </h2>
              <p className="text-sm text-charcoal-600 leading-relaxed">
                Whether you visit our Indore studio, arrange a pickup of your best-fitting sample blouse, or share measurements over a video call, we ensure a millimeter-perfect fit.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2 text-xs font-medium text-charcoal-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Send a sample fitting garment (Indore pickup available)</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-charcoal-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Visit our boutique Indore for in-person trial</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-charcoal-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Video consultation with Neelima for remote clients</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {measurementTips.map((tip, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-cream-50 border border-cream-200/80">
                  <span className="text-xs font-bold text-rosewood-900 block mb-1">
                    {tip.title}
                  </span>
                  <p className="text-[11px] text-charcoal-600 leading-relaxed">
                    {tip.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
