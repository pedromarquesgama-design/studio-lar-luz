'use client';

import { useCallback, useMemo, useState } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Product, Collection } from '@/lib/commerce/types';

// ── Filter types ────────────────────────────────────────────────
export interface FilterState {
  categories: string[];      // collection handles
  priceMin: number;
  priceMax: number;
  minRating: number;         // 0 = any, 3/4/5
  sort: SortOption;
  view: 'grid' | 'list';
  perPage: number;
  page: number;
}

export type SortOption =
  | 'bestseller'
  | 'price-asc'
  | 'price-desc'
  | 'newest'
  | 'rating';

export const SORT_LABELS: Record<SortOption, string> = {
  bestseller: 'Mais Vendidos',
  'price-asc': 'Menor Preço',
  'price-desc': 'Maior Preço',
  newest: 'Lançamentos',
  rating: 'Melhor Avaliação',
};

export const PER_PAGE_OPTIONS = [12, 24, 48];

const DEFAULT_FILTERS: FilterState = {
  categories: [],
  priceMin: 0,
  priceMax: 0, // 0 = no max
  minRating: 0,
  sort: 'bestseller',
  view: 'grid',
  perPage: 12,
  page: 1,
};

// ── Helper: build price range from product set ──────────────────
export function getPriceRange(products: Product[]) {
  if (products.length === 0) return { min: 0, max: 1000 };
  const prices = products.map((p) => p.price);
  return {
    min: Math.floor(Math.min(...prices)),
    max: Math.ceil(Math.max(...prices)),
  };
}

// ── Active filter count for badge ───────────────────────────────
export function getActiveFilterCount(filters: FilterState, absoluteMax: number): number {
  let count = 0;
  if (filters.categories.length > 0) count += filters.categories.length;
  if (filters.priceMin > 0) count++;
  if (filters.priceMax > 0 && filters.priceMax < absoluteMax) count++;
  if (filters.minRating > 0) count++;
  return count;
}

// ── Hook ────────────────────────────────────────────────────────
export function useFilters(allProducts: Product[], collections: Collection[]) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Parse initial state from URL params
  const initialFilters = useMemo<FilterState>(() => {
    const cats = searchParams.get('cat')?.split(',').filter(Boolean) || [];
    const priceMin = parseInt(searchParams.get('pmin') || '0', 10) || 0;
    const priceMax = parseInt(searchParams.get('pmax') || '0', 10) || 0;
    const minRating = parseInt(searchParams.get('rating') || '0', 10) || 0;
    const sort = (searchParams.get('sort') as SortOption) || 'bestseller';
    const view = (searchParams.get('view') as 'grid' | 'list') || 'grid';
    const perPage = parseInt(searchParams.get('pp') || '12', 10) || 12;
    const page = parseInt(searchParams.get('page') || '1', 10) || 1;

    return { categories: cats, priceMin, priceMax, minRating, sort, view, perPage, page };
  }, [searchParams]);

  const [filters, setFiltersRaw] = useState<FilterState>(initialFilters);

  const priceRange = useMemo(() => getPriceRange(allProducts), [allProducts]);

  // Push state to URL (shallow)
  const syncURL = useCallback(
    (next: FilterState) => {
      const params = new URLSearchParams();
      if (next.categories.length > 0) params.set('cat', next.categories.join(','));
      if (next.priceMin > 0) params.set('pmin', String(next.priceMin));
      if (next.priceMax > 0 && next.priceMax < priceRange.max) params.set('pmax', String(next.priceMax));
      if (next.minRating > 0) params.set('rating', String(next.minRating));
      if (next.sort !== 'bestseller') params.set('sort', next.sort);
      if (next.view !== 'grid') params.set('view', next.view);
      if (next.perPage !== 12) params.set('pp', String(next.perPage));
      if (next.page > 1) params.set('page', String(next.page));
      const qs = params.toString();
      router.replace(`${pathname}${qs ? `?${qs}` : ''}`, { scroll: false });
    },
    [router, pathname, priceRange.max]
  );

  const setFilters = useCallback(
    (updater: FilterState | ((prev: FilterState) => FilterState)) => {
      setFiltersRaw((prev) => {
        const next = typeof updater === 'function' ? updater(prev) : updater;
        syncURL(next);
        return next;
      });
    },
    [syncURL]
  );

  const updateFilter = useCallback(
    <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
      setFilters((prev) => ({ ...prev, [key]: value, page: key === 'page' ? (value as number) : 1 }));
    },
    [setFilters]
  );

  const toggleCategory = useCallback(
    (handle: string) => {
      setFilters((prev) => {
        const cats = prev.categories.includes(handle)
          ? prev.categories.filter((c) => c !== handle)
          : [...prev.categories, handle];
        return { ...prev, categories: cats, page: 1 };
      });
    },
    [setFilters]
  );

  const removeFilter = useCallback(
    (type: 'category' | 'priceMin' | 'priceMax' | 'rating', value?: string) => {
      setFilters((prev) => {
        if (type === 'category' && value) {
          return { ...prev, categories: prev.categories.filter((c) => c !== value), page: 1 };
        }
        if (type === 'priceMin') return { ...prev, priceMin: 0, page: 1 };
        if (type === 'priceMax') return { ...prev, priceMax: 0, page: 1 };
        if (type === 'rating') return { ...prev, minRating: 0, page: 1 };
        return prev;
      });
    },
    [setFilters]
  );

  const resetFilters = useCallback(() => {
    setFilters({ ...DEFAULT_FILTERS });
  }, [setFilters]);

  // ── Apply filters & sort ──────────────────────────────────────
  const filteredProducts = useMemo(() => {
    let results = [...allProducts];

    // Category filter
    if (filters.categories.length > 0) {
      results = results.filter((p) => filters.categories.includes(p.category));
    }

    // Price range
    if (filters.priceMin > 0) {
      results = results.filter((p) => p.price >= filters.priceMin);
    }
    if (filters.priceMax > 0) {
      results = results.filter((p) => p.price <= filters.priceMax);
    }

    // Rating
    if (filters.minRating > 0) {
      results = results.filter((p) => p.rating >= filters.minRating);
    }

    // Sort
    switch (filters.sort) {
      case 'price-asc':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        results.sort((a, b) => (a.isNewArrival ? -1 : b.isNewArrival ? 1 : 0));
        break;
      case 'rating':
        results.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
        break;
      case 'bestseller':
      default:
        results.sort((a, b) => (a.isBestseller ? -1 : b.isBestseller ? 1 : 0));
        break;
    }

    return results;
  }, [allProducts, filters]);

  // ── Paginate ──────────────────────────────────────────────────
  const totalCount = filteredProducts.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / filters.perPage));
  const paginatedProducts = useMemo(() => {
    const start = (filters.page - 1) * filters.perPage;
    return filteredProducts.slice(start, start + filters.perPage);
  }, [filteredProducts, filters.page, filters.perPage]);

  const activeCount = getActiveFilterCount(filters, priceRange.max);

  return {
    filters,
    updateFilter,
    toggleCategory,
    removeFilter,
    resetFilters,
    filteredProducts,
    paginatedProducts,
    totalCount,
    totalPages,
    priceRange,
    activeCount,
    collections,
  };
}
