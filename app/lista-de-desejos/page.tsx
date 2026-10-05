'use client';

import React from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { useWishlistStore } from '@/lib/store/useWishlistStore';
import { MOCK_PRODUCTS } from '@/lib/commerce/mock-data';
import { ProductCard } from '@/components/commerce/ProductCard';

export default function WishlistPage() {
  const productIds = useWishlistStore((s) => s.productIds);
  const clearWishlist = useWishlistStore((s) => s.clearWishlist);

  const favoritedProducts = MOCK_PRODUCTS.filter((p) => productIds.includes(p.id));

  return (
    <div className="bg-cream-100 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 mb-8 border-b border-charcoal/10 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-terracotta font-bold flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 fill-current" />
              Sua Seleção de Desejos
            </span>
            <h1 className="text-3xl font-serif text-charcoal font-normal tracking-tight mt-1">
              Lista de Desejos
            </h1>
            <p className="text-xs text-charcoal-muted mt-1">
              {favoritedProducts.length} peça{favoritedProducts.length !== 1 ? 's' : ''} salva{favoritedProducts.length !== 1 ? 's' : ''} para o seu lar.
            </p>
          </div>

          {favoritedProducts.length > 0 && (
            <button
              onClick={clearWishlist}
              className="text-xs text-charcoal-muted hover:text-red-600 underline self-start sm:self-center"
            >
              Limpar Lista
            </button>
          )}
        </div>

        {favoritedProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {favoritedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-cream-50 rounded-2xl border border-charcoal/10 max-w-xl mx-auto">
            <Heart className="w-12 h-12 text-charcoal-muted/40 mx-auto mb-3" />
            <h3 className="text-lg font-serif font-bold text-charcoal">Sua lista está vazia</h3>
            <p className="text-xs text-charcoal-muted mt-1 max-w-xs mx-auto">
              Clique no coração nos produtos que você mais gostar para salvá-los aqui e comprar mais tarde.
            </p>
            <Link
              href="/colecoes"
              className="mt-6 inline-block px-8 py-3.5 rounded-full bg-terracotta text-white text-xs font-bold uppercase tracking-wider hover:bg-terracotta-hover transition-colors"
            >
              Explorar Catálogo
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
