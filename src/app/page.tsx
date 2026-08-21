import React from 'react';
import prisma from '@/lib/prisma';
import HeroSection from '@/components/home/HeroSection';
import CategoryGrid from '@/components/home/CategoryGrid';
import FeaturedSection from '@/components/home/FeaturedSection';
import CustomStitchingBanner from '@/components/home/CustomStitchingBanner';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import InstagramShowcase from '@/components/home/InstagramShowcase';
import LocationMap from '@/components/home/LocationMap';

export const revalidate = 60; // ISR revalidation every 60 seconds

export default async function HomePage() {
  // Fetch categories with product counts
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { products: true },
      },
    },
    orderBy: { sortOrder: 'asc' },
  });

  // Fetch featured products
  const featuredProducts = await prisma.product.findMany({
    where: {
      isPublished: true,
      isFeatured: true,
    },
    include: {
      category: true,
      images: {
        orderBy: { sortOrder: 'asc' },
      },
    },
    take: 8,
    orderBy: { createdAt: 'desc' },
  });

  // Fetch Instagram showcase posts
  const instagramPosts = await prisma.instagramPost.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: 'asc' },
    take: 4,
  });

  return (
    <div className="flex flex-col">
      <HeroSection />
      <CategoryGrid categories={categories as any} />
      <FeaturedSection products={featuredProducts as any} />
      <CustomStitchingBanner />
      <WhyChooseUs />
      <InstagramShowcase posts={instagramPosts as any} />
      <LocationMap />
    </div>
  );
}
