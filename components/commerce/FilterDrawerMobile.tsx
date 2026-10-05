'use client';

import React, { useEffect, useRef } from 'react';
import { X, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { Collection } from '@/lib/commerce/types';
import { FilterState } from '@/lib/hooks/useFilters';

interface FilterDrawerMobileProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  collections: Collection[];
  priceRange: { min: number; max: number };
  activeCount: number;
  onToggleCategory: (handle: string) => void;
  onUpdateFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  onReset: () => void;
}

export const FilterDrawerMobile: React.FC<FilterDrawerMobileProps> = ({
  isOpen,
  onClose,
  filters,
  collections,
  priceRange,
  activeCount,
  onToggleCategory,
  onUpdateFilter,
  onReset,
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);

  const [openSections, setOpenSections] = React.useState({
    categories: true,
    price: true,
    rating: false,
  });

  const toggleSection = (key: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Trap focus and prevent body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const ratingOptions = [4, 3] as const;

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-charcoal/50 backdrop-blur-xs z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer (Bottom Sheet) */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Filtros"
        className={`fixed inset-x-0 bottom-0 z-50 bg-cream-50 rounded-t-3xl shadow-2xl transition-transform duration-300 ease-out max-h-[85vh] flex flex-col ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        {/* Handle bar */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-charcoal/20" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 pb-4 border-b border-charcoal/10">
          <h2 className="text-lg font-semibold text-charcoal">Filtros</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-charcoal/5 transition-colors"
            aria-label="Fechar filtros"
          >
            <X className="w-5 h-5 text-charcoal" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-1">
          {/* ── Categories ───────────────────────────────────── */}
          <div className="py-3 border-b border-charcoal/10">
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
              <div className="mt-3 space-y-3">
                {collections.map((col) => {
                  const isChecked = filters.categories.includes(col.handle);
                  return (
                    <label
                      key={col.handle}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => onToggleCategory(col.handle)}
                        className="sr-only peer"
                      />
                      <div className="w-5 h-5 rounded border-2 border-charcoal/25 peer-checked:bg-terracotta peer-checked:border-terracotta flex items-center justify-center transition-all">
                        {isChecked && (
                          <svg
                            className="w-3 h-3 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className="text-sm text-charcoal flex-1">{col.title}</span>
                      <span className="text-xs text-charcoal-muted">({col.productCount})</span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          {/* ── Price Range ───────────────────────────────────── */}
          <div className="py-3 border-b border-charcoal/10">
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
                <input
                  type="range"
                  min={priceRange.min}
                  max={priceRange.max}
                  value={filters.priceMax > 0 ? filters.priceMax : priceRange.max}
                  onChange={(e) => onUpdateFilter('priceMax', parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-charcoal/10 rounded-full appearance-none cursor-pointer accent-terracotta
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-terracotta [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md
                    [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-terracotta [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white"
                />
                <div className="flex items-center gap-3">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-charcoal-muted">R$</span>
                    <input
                      type="number"
                      placeholder={String(priceRange.min)}
                      value={filters.priceMin || ''}
                      onChange={(e) => onUpdateFilter('priceMin', parseInt(e.target.value, 10) || 0)}
                      className="w-full pl-8 pr-3 py-2.5 text-sm bg-white border border-charcoal/15 rounded-xl text-charcoal focus:outline-none focus:border-terracotta"
                    />
                  </div>
                  <span className="text-charcoal-muted">—</span>
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-charcoal-muted">R$</span>
                    <input
                      type="number"
                      placeholder={String(priceRange.max)}
                      value={filters.priceMax || ''}
                      onChange={(e) => onUpdateFilter('priceMax', parseInt(e.target.value, 10) || 0)}
                      className="w-full pl-8 pr-3 py-2.5 text-sm bg-white border border-charcoal/15 rounded-xl text-charcoal focus:outline-none focus:border-terracotta"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ── Rating ────────────────────────────────────────── */}
          <div className="py-3">
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
              <div className="mt-3 space-y-3">
                {ratingOptions.map((stars) => {
                  const isSelected = filters.minRating === stars;
                  return (
                    <label
                      key={stars}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="rating-mobile"
                        checked={isSelected}
                        onChange={() => onUpdateFilter('minRating', isSelected ? 0 : stars)}
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                          isSelected ? 'border-terracotta' : 'border-charcoal/25'
                        }`}
                      >
                        {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-terracotta" />}
                      </div>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < stars ? 'text-gold fill-gold' : 'text-charcoal/15'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-charcoal-muted">& acima</span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Footer buttons */}
        <div className="px-5 py-4 border-t border-charcoal/10 bg-cream-50 flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-full bg-terracotta text-white text-sm font-bold uppercase tracking-wider hover:bg-terracotta/90 transition-colors active:scale-[0.98]"
          >
            {activeCount > 0 ? `Aplicar Filtros (${activeCount})` : 'Aplicar Filtros'}
          </button>
          <button
            onClick={onReset}
            className="py-3 px-5 rounded-full border border-charcoal/20 text-sm font-medium text-charcoal hover:bg-charcoal/5 transition-colors"
          >
            Limpar
          </button>
        </div>
      </div>
    </>
  );
};
