import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Product } from '@/lib/commerce/types';
import { ProductCard } from '../commerce/ProductCard';

interface BestsellersCarouselProps {
  products: Product[];
}

export const BestsellersCarousel: React.FC<BestsellersCarouselProps> = ({ products }) => {
  const bestsellers = products.filter((p) => p.isBestseller).slice(0, 5);

  return (
    <section className="py-16 bg-cream-50 border-b border-charcoal/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-8 pb-3 border-b border-charcoal/10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif text-charcoal tracking-tight font-normal">
              Mais Vendidos
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-muted mt-1">
              As peças favoritas dos nossos clientes para transformar a rotina da casa.
            </p>
          </div>
          <Link
            href="/colecoes?filtro=mais-vendidos"
            className="group flex items-center gap-1.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-charcoal hover:text-terracotta transition-colors"
          >
            <span>Ver Todos</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {bestsellers.map((product, i) => (
            <ProductCard key={product.id} product={product} priority={i < 2} />
          ))}
        </div>
      </div>
    </section>
  );
};
