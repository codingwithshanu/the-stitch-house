import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import CollectionsClient from '../CollectionsClient';

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = await prisma.category.findUnique({
    where: { slug: params.category },
  });

  if (!category) {
    return {
      title: 'Collection Not Found | The Stitch House',
    };
  }

  return {
    title: `${category.name} Collection — The Stitch House Indore`,
    description:
      category.description ||
      `Explore premium boutique ${category.name} and bespoke custom tailoring in Indore by Neelima at The Stitch House.`,
    openGraph: {
      title: `${category.name} Collection | The Stitch House`,
      description: category.description || `Boutique ${category.name} stitched with precision in Indore.`,
    },
  };
}

export const revalidate = 60;

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = params;

  const currentCategory = await prisma.category.findUnique({
    where: { slug: categorySlug },
  });

  if (!currentCategory) {
    notFound();
  }

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

  return (
    <CollectionsClient
      initialCategories={categories as any}
      initialProducts={products as any}
      preSelectedCategory={categorySlug}
    />
  );
}
