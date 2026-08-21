import React from 'react';
import type { Metadata } from 'next';
import prisma from '@/lib/prisma';
import GlamClient from './GlamClient';

export const metadata: Metadata = {
  title: 'Neelima Makeup Art — Professional Bridal & Party Makeup Artist in Indore | @glam_by_neelima',
  description:
    'Indore’s premier bridal makeup artist and hairstylist by Neelima (@glam_by_neelima). HD Bridal Makeup, Reception Glam, Saree Draping, and Hair Artistry. Book your wedding slot.',
  openGraph: {
    title: 'Neelima Makeup Art — Professional Makeup Artist in Indore',
    description:
      'Enhancing Your Natural Beauty. Bridal Makeup, Party Glam, and Hairstyling in Indore by Neelima (@glam_by_neelima).',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Neelima Makeup Art Indore',
      },
    ],
  },
};

export const revalidate = 60;

export default async function GlamPage() {
  const [settings, services, portfolio] = await Promise.all([
    prisma.siteSetting.findUnique({ where: { id: 'default' } }),
    prisma.makeupService.findMany({ orderBy: { sortOrder: 'asc' } }),
    prisma.makeupPortfolio.findMany({ orderBy: { sortOrder: 'asc' } }),
  ]);

  return (
    <GlamClient
      settings={settings as any}
      services={services as any}
      portfolio={portfolio as any}
    />
  );
}
