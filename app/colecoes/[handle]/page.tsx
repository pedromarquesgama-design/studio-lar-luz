import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getCommerceProvider } from '@/lib/commerce/provider';
import { ChevronRight } from 'lucide-react';
import { CollectionFilterClient } from '@/components/commerce/CollectionFilterClient';

interface CollectionPageProps {
  params: Promise<{ handle: string }>;
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { handle } = await params;
  const provider = getCommerceProvider();
  const collection = await provider.getCollectionByHandle(handle);

  if (!collection) {
    return { title: 'Coleção não encontrada' };
  }

  return {
    title: `${collection.title} — Studio Lar & Luz`,
    description: collection.description,
  };
}

export default async function CollectionDetailPage({ params }: CollectionPageProps) {
  const { handle } = await params;
  const provider = getCommerceProvider();
  const [collection, products, collections] = await Promise.all([
    provider.getCollectionByHandle(handle),
    provider.getProducts({ collection: handle }),
    provider.getCollections(),
  ]);

  if (!collection) {
    notFound();
  }

  return (
    <div className="bg-cream-100 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-charcoal-muted mb-6">
          <Link href="/" className="hover:text-terracotta transition-colors">
            Início
          </Link>
          <ChevronRight className="w-3 h-3 opacity-60" />
          <Link href="/colecoes" className="hover:text-terracotta transition-colors">
            Coleções
          </Link>
          <ChevronRight className="w-3 h-3 opacity-60" />
          <span className="text-charcoal font-medium">{collection.title}</span>
        </nav>

        {/* Collection Header */}
        <div className="border-b border-charcoal/10 pb-8 mb-10">
          <h1 className="text-3xl sm:text-4xl font-serif text-charcoal font-normal tracking-tight">
            {collection.title}
          </h1>
          <p className="text-sm sm:text-base text-charcoal-muted max-w-2xl mt-2 leading-relaxed">
            {collection.description}
          </p>
        </div>

        {/* Filterable Product Grid (no category sidebar on single-collection pages) */}
        <CollectionFilterClient
          products={products}
          collections={collections}
          currentCollectionHandle={handle}
        />
      </div>
    </div>
  );
}
