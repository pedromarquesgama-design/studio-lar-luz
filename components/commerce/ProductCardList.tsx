'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, Check, Star } from 'lucide-react';
import { Product } from '@/lib/commerce/types';
import { formatBRL, calculateInstallments } from '@/lib/utils/format';
import { useCartStore } from '@/lib/store/useCartStore';
import { useWishlistStore } from '@/lib/store/useWishlistStore';

interface ProductCardListProps {
  product: Product;
}

export const ProductCardList: React.FC<ProductCardListProps> = ({ product }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggleWishlist);
  const isInWishlist = useWishlistStore((s) => s.isInWishlist(product.id));

  const currentVariant = product.variants[0];
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
    <div className="group flex bg-cream-50 rounded-xl overflow-hidden border border-charcoal/5 hover:border-charcoal/15 transition-all duration-300 hover:shadow-soft-md">
      {/* Image */}
      <div className="relative w-36 sm:w-48 aspect-square shrink-0 overflow-hidden bg-paper-light">
        <Link href={`/produtos/${product.handle}`} className="block w-full h-full">
          <Image
            src={displayImage}
            alt={product.title}
            fill
            sizes="200px"
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        </Link>
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
          {product.isBestseller && (
            <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-gold-gradient text-charcoal shadow-sm">
              Mais Vendido
            </span>
          )}
          {product.isNewArrival && (
            <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-olive text-white shadow-sm">
              Novo
            </span>
          )}
          {displayComparePrice && displayComparePrice > displayPrice && (
            <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-terracotta text-white shadow-sm">
              Oferta
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between min-w-0">
        <div>
          <Link href={`/produtos/${product.handle}`} className="block group-hover:text-terracotta transition-colors">
            <h3 className="text-sm sm:text-base font-medium text-charcoal leading-snug line-clamp-2">
              {product.title}
            </h3>
          </Link>
          <p className="text-xs text-charcoal-muted mt-1.5 line-clamp-2 hidden sm:block">
            {product.shortDescription}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-2">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.round(product.rating) ? 'text-gold fill-gold' : 'text-charcoal/15'
                  }`}
                />
              ))}
            </div>
            <span className="text-[10px] text-charcoal-muted">
              ({product.reviewCount})
            </span>
          </div>

          {/* Swatches */}
          {product.variants.length > 1 && (
            <div className="flex items-center gap-1.5 mt-2">
              {product.variants.map((v) => (
                <div
                  key={v.id}
                  className="w-3.5 h-3.5 rounded-full border border-charcoal/15"
                  style={{ backgroundColor: v.colorHex || '#ECE9E3' }}
                  title={v.title}
                />
              ))}
            </div>
          )}
        </div>

        {/* Price and Actions */}
        <div className="flex items-end justify-between mt-3 pt-2 border-t border-charcoal/5">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-charcoal">{formatBRL(displayPrice)}</span>
              {displayComparePrice && (
                <span className="text-xs text-charcoal-muted line-through">
                  {formatBRL(displayComparePrice)}
                </span>
              )}
            </div>
            <p className="text-[11px] text-charcoal-muted">{installments.formatted}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleWishlistToggle}
              className={`p-2 rounded-full transition-all ${
                isInWishlist
                  ? 'bg-terracotta text-white'
                  : 'bg-charcoal/5 text-charcoal hover:text-terracotta hover:bg-terracotta/10'
              }`}
              aria-label={isInWishlist ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
            >
              <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={handleQuickAdd}
              disabled={isAdding}
              className="px-4 py-2 rounded-full bg-terracotta text-white text-xs font-bold uppercase tracking-wider hover:bg-terracotta/90 transition-colors active:scale-95 flex items-center gap-2"
            >
              {addedSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Adicionado!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{isAdding ? 'Adicionando...' : 'Adicionar'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
