import React from 'react';
import { getCommerceProvider } from '@/lib/commerce/provider';
import { HeroSection } from '@/components/home/HeroSection';
import { CategoryCircles } from '@/components/home/CategoryCircles';
import { BestsellersCarousel } from '@/components/home/BestsellersCarousel';
import { CategoryBannersGrid } from '@/components/commerce/CategoryBannersGrid';
import { TrustBar } from '@/components/home/TrustBar';

export const revalidate = 60; // ISR cache revalidation

export default async function HomePage() {
  const provider = getCommerceProvider();
  const products = await provider.getProducts({ limit: 12 });

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Full-width Hero with Serif Headline & 3D Interactive Showcase */}
      <HeroSection />

      {/* 2. Circular Category Icons */}
      <CategoryCircles />

      {/* 3. Bestsellers Product Grid & Quick-Add */}
      <BestsellersCarousel products={products} />

      {/* 4. Category Banners Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <CategoryBannersGrid />
      </div>

      {/* 5. Trust Bar with 5 Value Propositions */}
      <TrustBar />
    </div>
  );
}
