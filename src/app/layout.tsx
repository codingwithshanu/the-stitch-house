import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingActions from '@/components/layout/FloatingActions';

export const metadata: Metadata = {
  metadataBase: new URL('https://thestitchhouse.in'),
  title: {
    default: 'The Stitch House — Boutique & Custom Tailoring in Indore | @stitch_by_neelima',
    template: '%s | The Stitch House Indore',
  },
  description:
    'Indore’s premier boutique for designer bridal lehengas, bespoke blouse stitching, salwar suits, festive dresses, and custom alterations by Neelima. Made with precision, worn with confidence.',
  keywords: [
    'The Stitch House',
    'Boutique in Indore',
    'Custom Stitching Indore',
    'Bridal Lehenga Indore',
    'Designer Blouse Tailoring Indore',
    'Salwar Suit Stitching Indore',
    'Neelima boutique',
    'stitch_by_neelima',
    'Ladies tailor Indore',
    'Women ethnic wear Indore',
  ],
  authors: [{ name: 'Neelima — The Stitch House' }],
  openGraph: {
    title: 'The Stitch House — Boutique & Custom Stitching | Indore',
    description:
      'Made with Precision, Worn with Confidence. Custom tailoring, bridal lehengas, designer blouses & alterations in Indore.',
    url: 'https://thestitchhouse.in',
    siteName: 'The Stitch House',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'The Stitch House Boutique Indore',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ClothingStore',
    name: 'The Stitch House',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b',
    description: 'Boutique stitching, designer lehengas, custom blouses & alterations in Indore by Neelima.',
    telephone: '+91 90743 71984',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rau',
      addressLocality: 'Indore',
      addressRegion: 'Madhya Pradesh',
      postalCode: '453331',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 22.7196,
      longitude: 75.8577,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '10:00',
        closes: '20:00',
      },
    ],
    sameAs: ['https://instagram.com/stitch_by_neelima'],
    priceRange: '₹₹',
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-cream-50 text-charcoal-900 antialiased selection:bg-rosewood-100 selection:text-rosewood-900">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <FloatingActions />
      </body>
    </html>
  );
}
