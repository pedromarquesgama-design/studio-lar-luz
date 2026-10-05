'use client';

import React from 'react';
import { Star, ChevronDown, ChevronUp } from 'lucide-react';
import { Collection } from '@/lib/commerce/types';
import { FilterState, SORT_LABELS } from '@/lib/hooks/useFilters';

interface FilterSidebarProps {
  filters: FilterState;
  collections: Collection[];
  priceRange: { min: number; max: number };
  activeCount: number;
  onToggleCategory: (handle: string) => void;
  onUpdateFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  onReset: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  collections,
  priceRange,
  activeCount,
  onToggleCategory,
  onUpdateFilter,
  onReset,
}) => {
  const [openSections, setOpenSections] = React.useState({
    categories: true,
    price: true,
    rating: true,
  });

  const toggleSection = (key: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const ratingOptions = [4, 3] as const;

  return (
    <aside className="w-full lg:w-64 xl:w-72 shrink-0">
      <div className="sticky top-28 bg-cream-50 rounded-2xl border border-charcoal/10 p-5 space-y-1">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-charcoal/10">
          <h2 className="text-base font-semibold text-charcoal flex items-center gap-2">
            Filtros
            {activeCount > 0 && (
              <span className="text-[10px] font-bold bg-terracotta text-white px-2 py-0.5 rounded-full">
                {activeCount}
              </span>
            )}
          </h2>
          {activeCount > 0 && (
            <button
              onClick={onReset}
              className="text-xs text-terracotta hover:text-terracotta/80 font-medium transition-colors"
            >
              Limpar tudo
            </button>
          )}
        </div>

        {/* ── Categories ─────────────────────────────────────── */}
        <div className="py-4 border-b border-charcoal/10">
          <button
            onClick={() => toggleSection('categories')}
            className="flex items-center justify-between w-full text-sm font-semibold text-charcoal"
          >
            <span>Categorias</span>
            {openSections.categories ? (
              <ChevronUp className="w-4 h-4 text-charcoal-muted" />
            ) : (
              <ChevronDown className="w-4 h-4 text-charcoal-muted" />
            )}
          </button>
          {openSections.categories && (
            <div className="mt-3 space-y-2">
              {collections.map((col) => {
                const isChecked = filters.categories.includes(col.handle);
                return (
                  <label
                    key={col.handle}
                    className="flex items-center gap-2.5 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => onToggleCategory(col.handle)}
                      className="sr-only peer"
                    />
                    <div className="w-4 h-4 rounded border-2 border-charcoal/25 peer-checked:bg-terracotta peer-checked:border-terracotta flex items-center justify-center transition-all">
                      {isChecked && (
                        <svg
                          className="w-2.5 h-2.5 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className="text-xs text-charcoal group-hover:text-terracotta transition-colors flex-1">
                      {col.title}
                    </span>
                    <span className="text-[10px] text-charcoal-muted">
                      ({col.productCount})
                    </span>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* ── Price Range ─────────────────────────────────────── */}
        <div className="py-4 border-b border-charcoal/10">
          <button
            onClick={() => toggleSection('price')}
            className="flex items-center justify-between w-full text-sm font-semibold text-charcoal"
          >
            <span>Faixa de Preço</span>
            {openSections.price ? (
              <ChevronUp className="w-4 h-4 text-charcoal-muted" />
            ) : (
              <ChevronDown className="w-4 h-4 text-charcoal-muted" />
            )}
          </button>
          {openSections.price && (
            <div className="mt-3 space-y-3">
              {/* Range slider */}
              <div className="relative pt-1">
                <input
                  type="range"
                  min={priceRange.min}
                  max={priceRange.max}
                  value={filters.priceMax > 0 ? filters.priceMax : priceRange.max}
                  onChange={(e) => onUpdateFilter('priceMax', parseInt(e.target.value, 10))}
                  className="w-full h-1.5 bg-charcoal/10 rounded-full appearance-none cursor-pointer accent-terracotta
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-terracotta [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:cursor-pointer
                    [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-terracotta [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white"
                />
              </div>
              {/* Min / Max inputs */}
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[10px] text-charcoal-muted">R$</span>
                  <input
                    type="number"
                    placeholder={String(priceRange.min)}
                    value={filters.priceMin || ''}
                    onChange={(e) => onUpdateFilter('priceMin', parseInt(e.target.value, 10) || 0)}
                    className="w-full pl-7 pr-2 py-2 text-xs bg-white border border-charcoal/15 rounded-lg text-charcoal focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta/20 transition-colors"
                  />
                </div>
                <span className="text-charcoal-muted text-xs">—</span>
                <div className="relative flex-1">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[10px] text-charcoal-muted">R$</span>
                  <input
                    type="number"
                    placeholder={String(priceRange.max)}
                    value={filters.priceMax || ''}
                    onChange={(e) => onUpdateFilter('priceMax', parseInt(e.target.value, 10) || 0)}
                    className="w-full pl-7 pr-2 py-2 text-xs bg-white border border-charcoal/15 rounded-lg text-charcoal focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta/20 transition-colors"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── Rating ──────────────────────────────────────────── */}
        <div className="py-4">
          <button
            onClick={() => toggleSection('rating')}
            className="flex items-center justify-between w-full text-sm font-semibold text-charcoal"
          >
            <span>Avaliação</span>
            {openSections.rating ? (
              <ChevronUp className="w-4 h-4 text-charcoal-muted" />
            ) : (
              <ChevronDown className="w-4 h-4 text-charcoal-muted" />
            )}
          </button>
          {openSections.rating && (
            <div className="mt-3 space-y-2">
              {ratingOptions.map((stars) => {
                const isSelected = filters.minRating === stars;
                return (
                  <label
                    key={stars}
                    className="flex items-center gap-2.5 cursor-pointer group"
                  >
                    <input
                      type="radio"
                      name="rating"
                      checked={isSelected}
                      onChange={() => onUpdateFilter('minRating', isSelected ? 0 : stars)}
                      className="sr-only"
                    />
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                        isSelected ? 'border-terracotta' : 'border-charcoal/25'
                      }`}
                    >
                      {isSelected && <div className="w-2 h-2 rounded-full bg-terracotta" />}
                    </div>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < stars ? 'text-gold fill-gold' : 'text-charcoal/15'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-charcoal-muted group-hover:text-charcoal transition-colors">
                      & acima
                    </span>
                  </label>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
