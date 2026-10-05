'use client';

import React, { Suspense, useState } from 'react';
import { Product, Collection } from '@/lib/commerce/types';
import { useFilters } from '@/lib/hooks/useFilters';
import { FilterSidebar } from '@/components/commerce/FilterSidebar';
import { FilterDrawerMobile } from '@/components/commerce/FilterDrawerMobile';
import { ActiveFilterPills } from '@/components/commerce/ActiveFilterPills';
import { CollectionToolbar } from '@/components/commerce/CollectionToolbar';
import { ProductCard } from '@/components/commerce/ProductCard';
import { ProductCardList } from '@/components/commerce/ProductCardList';
import { Pagination } from '@/components/commerce/Pagination';
import Link from 'next/link';

interface CollectionFilterClientProps {
  products: Product[];
  collections: Collection[];
  /** When provided, hides the category filter (single-collection view) */
  currentCollectionHandle?: string;
}

function CollectionFilterClientInner({
  products,
  collections,
  currentCollectionHandle,
}: CollectionFilterClientProps) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // If we're on a single collection page, don't show category filter
  const showCategoryFilter = !currentCollectionHandle;

  const {
    filters,
    updateFilter,
    toggleCategory,
    removeFilter,
    resetFilters,
    paginatedProducts,
    totalCount,
    totalPages,
    priceRange,
    activeCount,
  } = useFilters(products, collections);

  return (
    <>
      {/* Active Filter Pills */}
      <ActiveFilterPills
        filters={filters}
        collections={collections}
        priceRange={priceRange}
        onRemove={removeFilter}
        onReset={resetFilters}
      />

      <div className="flex gap-8">
        {/* Desktop Sidebar — hidden on mobile */}
        {showCategoryFilter && (
          <div className="hidden lg:block">
            <FilterSidebar
              filters={filters}
              collections={collections}
              priceRange={priceRange}
              activeCount={activeCount}
              onToggleCategory={toggleCategory}
              onUpdateFilter={updateFilter}
              onReset={resetFilters}
            />
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <CollectionToolbar
            filters={filters}
            totalCount={totalCount}
            activeCount={activeCount}
            onUpdateFilter={updateFilter}
            onOpenMobileFilters={() => setMobileFiltersOpen(true)}
          />

          {/* Product Grid / List */}
          {paginatedProducts.length > 0 ? (
            <>
              {filters.view === 'grid' ? (
                <div
                  className={`grid gap-4 sm:gap-6 ${
                    showCategoryFilter
                      ? 'grid-cols-2 md:grid-cols-2 lg:grid-cols-3'
                      : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                  }`}
                >
                  {paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {paginatedProducts.map((product) => (
                    <ProductCardList key={product.id} product={product} />
                  ))}
                </div>
              )}

              {/* Pagination */}
              <Pagination
                currentPage={filters.page}
                totalPages={totalPages}
                onPageChange={(page) => updateFilter('page', page)}
              />
            </>
          ) : (
            <div className="text-center py-20 bg-cream-50 rounded-2xl border border-charcoal/10">
              <p className="text-charcoal-muted text-base font-medium">
                Nenhum produto encontrado com os filtros selecionados.
              </p>
              <button
                onClick={resetFilters}
                className="mt-4 inline-block px-6 py-2.5 rounded-full bg-terracotta text-white text-xs font-bold uppercase tracking-wider hover:bg-terracotta/90 transition-colors"
              >
                Limpar Filtros
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <FilterDrawerMobile
        isOpen={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        filters={filters}
        collections={showCategoryFilter ? collections : []}
        priceRange={priceRange}
        activeCount={activeCount}
        onToggleCategory={toggleCategory}
        onUpdateFilter={updateFilter}
        onReset={resetFilters}
      />
    </>
  );
}

// Wrapper with Suspense for useSearchParams
export const CollectionFilterClient: React.FC<CollectionFilterClientProps> = (props) => {
  return (
    <Suspense
      fallback={
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-cream-50 rounded-xl border border-charcoal/5 overflow-hidden animate-pulse"
            >
              <div className="aspect-square bg-charcoal/5" />
              <div className="p-4 space-y-2">
                <div className="h-3 bg-charcoal/5 rounded w-2/3" />
                <div className="h-3 bg-charcoal/5 rounded w-1/2" />
                <div className="h-4 bg-charcoal/5 rounded w-1/3 mt-3" />
              </div>
            </div>
          ))}
        </div>
      }
    >
      <CollectionFilterClientInner {...props} />
    </Suspense>
  );
};
