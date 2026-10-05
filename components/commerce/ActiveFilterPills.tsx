'use client';

import React from 'react';
import { X, Star } from 'lucide-react';
import { Collection } from '@/lib/commerce/types';
import { FilterState } from '@/lib/hooks/useFilters';
import { formatBRL } from '@/lib/utils/format';

interface ActiveFilterPillsProps {
  filters: FilterState;
  collections: Collection[];
  priceRange: { min: number; max: number };
  onRemove: (type: 'category' | 'priceMin' | 'priceMax' | 'rating', value?: string) => void;
  onReset: () => void;
}

export const ActiveFilterPills: React.FC<ActiveFilterPillsProps> = ({
  filters,
  collections,
  priceRange,
  onRemove,
  onReset,
}) => {
  const pills: { key: string; label: React.ReactNode; onRemove: () => void }[] = [];

  // Category pills
  filters.categories.forEach((handle) => {
    const col = collections.find((c) => c.handle === handle);
    if (col) {
      pills.push({
        key: `cat-${handle}`,
        label: col.title,
        onRemove: () => onRemove('category', handle),
      });
    }
  });

  // Price min pill
  if (filters.priceMin > 0) {
    pills.push({
      key: 'pmin',
      label: `A partir de ${formatBRL(filters.priceMin)}`,
      onRemove: () => onRemove('priceMin'),
    });
  }

  // Price max pill
  if (filters.priceMax > 0 && filters.priceMax < priceRange.max) {
    pills.push({
      key: 'pmax',
      label: `Até ${formatBRL(filters.priceMax)}`,
      onRemove: () => onRemove('priceMax'),
    });
  }

  // Rating pill
  if (filters.minRating > 0) {
    pills.push({
      key: 'rating',
      label: (
        <span className="flex items-center gap-1">
          {filters.minRating}
          <Star className="w-3 h-3 text-gold fill-gold" />
          & acima
        </span>
      ),
      onRemove: () => onRemove('rating'),
    });
  }

  if (pills.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      <span className="text-xs font-semibold text-charcoal-muted mr-1">Filtros ativos:</span>
      {pills.map((pill) => (
        <button
          key={pill.key}
          onClick={pill.onRemove}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-terracotta/10 text-terracotta text-xs font-medium hover:bg-terracotta/20 transition-colors group"
        >
          <span>{pill.label}</span>
          <X className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
        </button>
      ))}
      {pills.length > 1 && (
        <button
          onClick={onReset}
          className="text-xs text-charcoal-muted hover:text-terracotta underline transition-colors ml-1"
        >
          Limpar tudo
        </button>
      )}
    </div>
  );
};
