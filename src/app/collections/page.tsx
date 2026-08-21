import React from 'react';
import type { Metadata } from 'next';
import prisma from '@/lib/prisma';
import CollectionsClient from './CollectionsClient';

export const metadata: Metadata = {
  title: 'All Collections — Designer Lehengas, Blouses & Ethnic Wear | The Stitch House',
  description:
    'Browse our complete catalog of boutique lehengas, handcrafted blouses, anarkalis, festive dresses, and girls wear in Indore. Custom stitching available.',
};

export const revalidate = 60;

export default async function CollectionsPage() {
  const [categories, products] = await Promise.all([
    prisma.category.findMany({
      include: {
        _count: {
          select: { products: true },
        },
      },
      orderBy: { sortOrder: 'asc' },
    }),
    prisma.product.findMany({
      where: { isPublished: true },
      include: {
        category: true,
        images: {
          orderBy: { sortOrder: 'asc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    }),
  ]);

  return <CollectionsClient initialCategories={categories as any} initialProducts={products as any} />;
}
