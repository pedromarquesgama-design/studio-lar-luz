import React from 'react';
import { Metadata } from 'next';
import { getCommerceProvider } from '@/lib/commerce/provider';
import { CollectionFilterClient } from '@/components/commerce/CollectionFilterClient';

export const metadata: Metadata = {
  title: 'Coleções — Utensílios & Artigos para o Lar',
  description: 'Conheça todas as coleções Studio Lar & Luz: Cozinha, Mesa Posta, Xícaras & Copos, Panelas, Marmitas, Banho e Detalhes.',
};

export default async function CollectionsPage() {
  const provider = getCommerceProvider();
  const [collections, products] = await Promise.all([
    provider.getCollections(),
    provider.getProducts(),
  ]);

  return (
    <div className="bg-cream-100 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest text-terracotta font-bold">
            Catálogo Completo
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-charcoal font-normal tracking-tight mt-2">
            Coleções Studio Lar & Luz
          </h1>
          <p className="text-sm sm:text-base text-charcoal-muted mt-3 leading-relaxed">
            Peças selecionadas com carinho para inspirar momentos ao redor da mesa e trazer luz e aconchego ao cotidiano.
          </p>
        </div>

        {/* Filterable Product Grid */}
        <CollectionFilterClient
          products={products}
          collections={collections}
        />
      </div>
    </div>
  );
}
