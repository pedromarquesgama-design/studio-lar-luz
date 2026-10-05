'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, Check } from 'lucide-react';
import { Product } from '@/lib/commerce/types';
import { formatBRL, calculateInstallments } from '@/lib/utils/format';
import { useCartStore } from '@/lib/store/useCartStore';
import { useWishlistStore } from '@/lib/store/useWishlistStore';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, priority = false }) => {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggleWishlist);
  const isInWishlist = useWishlistStore((s) => s.isInWishlist(product.id));

  const currentVariant = product.variants[selectedVariantIndex] || product.variants[0];
  const displayPrice = currentVariant?.price || product.price;
  const displayComparePrice = currentVariant?.compareAtPrice || product.compareAtPrice;
  const displayImage = currentVariant?.image || product.featuredImage;

  const installments = calculateInstallments(displayPrice, 6);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsAdding(true);
    addItem({
      productId: product.id,
      variantId: currentVariant.id,
      title: product.title,
      variantTitle: currentVariant.title,
      handle: product.handle,
      price: displayPrice,
      quantity: 1,
      image: displayImage,
    });

    setTimeout(() => {
      setIsAdding(false);
      setAddedSuccess(true);
      setTimeout(() => setAddedSuccess(false), 1500);
    }, 300);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div className="group relative flex flex-col bg-cream-50 rounded-xl overflow-hidden border border-charcoal/5 hover:border-charcoal/15 transition-all duration-300 hover:shadow-soft-md">
      {/* Image Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-paper-light">
        <Link href={`/produtos/${product.handle}`} className="block w-full h-full">
          <Image
            src={displayImage}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            priority={priority}
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        </Link>

        {/* Badges on Top Left */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {product.isBestseller && (
            <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-gold-gradient text-charcoal shadow-sm">
              Mais Vendido
            </span>
          )}
          {product.isNewArrival && (
            <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-olive text-white shadow-sm">
              Novo
            </span>
          )}
          {displayComparePrice && displayComparePrice > displayPrice && (
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-terracotta text-white shadow-sm">
              Oferta
            </span>
          )}
        </div>

        {/* Wishlist Button on Top Right */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-xs transition-all z-10 ${
            isInWishlist
              ? 'bg-terracotta text-white'
              : 'bg-white/80 text-charcoal hover:bg-white hover:text-terracotta'
          } shadow-soft-sm`}
          aria-label={isInWishlist ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-current' : ''}`} />
        </button>

        {/* Quick Add Hover Button */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 hidden sm:block">
          <button
            onClick={handleQuickAdd}
            disabled={isAdding}
            className="w-full py-2.5 px-4 rounded-full bg-charcoal/90 hover:bg-charcoal text-white text-xs font-semibold uppercase tracking-wider backdrop-blur-sm flex items-center justify-center gap-2 shadow-soft-md transition-all active:scale-95"
          >
            {addedSuccess ? (
              <>
                <Check className="w-3.5 h-3.5 text-gold-light" />
                <span>Adicionado!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>{isAdding ? 'Adicionando...' : 'Adicionar Rápido'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Swatches if multiple variants */}
          {product.variants.length > 1 && (
            <div className="flex items-center gap-1.5 mb-2">
              {product.variants.map((v, i) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVariantIndex(i)}
                  className={`w-3.5 h-3.5 rounded-full border transition-all ${
                    selectedVariantIndex === i
                      ? 'ring-2 ring-terracotta ring-offset-1 scale-110'
                      : 'border-charcoal/20 opacity-80 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: v.colorHex || '#ECE9E3' }}
                  title={v.title}
                  aria-label={`Selecionar ${v.title}`}
                />
              ))}
            </div>
          )}

          <Link href={`/produtos/${product.handle}`} className="block group-hover:text-terracotta transition-colors">
            <h3 className="text-sm font-medium text-charcoal line-clamp-2 leading-snug">
              {product.title}
            </h3>
          </Link>
        </div>

        <div className="mt-3 pt-2 border-t border-charcoal/5 flex items-baseline justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-base font-bold text-charcoal">
                {formatBRL(displayPrice)}
              </span>
              {displayComparePrice && (
                <span className="text-xs text-charcoal-muted line-through">
                  {formatBRL(displayComparePrice)}
                </span>
              )}
            </div>
            <p className="text-[11px] text-charcoal-muted mt-0.5">
              {installments.formatted}
            </p>
          </div>

          {/* Mobile Quick Add Button */}
          <button
            onClick={handleQuickAdd}
            className="sm:hidden p-2 rounded-full bg-terracotta text-white shadow-soft-sm active:scale-95"
            aria-label="Adicionar ao carrinho"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
