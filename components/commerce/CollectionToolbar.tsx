'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, LayoutGrid, List, SlidersHorizontal } from 'lucide-react';
import { FilterState, SORT_LABELS, SortOption, PER_PAGE_OPTIONS } from '@/lib/hooks/useFilters';

interface CollectionToolbarProps {
  filters: FilterState;
  totalCount: number;
  activeCount: number;
  onUpdateFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  onOpenMobileFilters: () => void;
}

export const CollectionToolbar: React.FC<CollectionToolbarProps> = ({
  filters,
  totalCount,
  activeCount,
  onUpdateFilter,
  onOpenMobileFilters,
}) => {
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  // Close sort dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setSortOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const startItem = (filters.page - 1) * filters.perPage + 1;
  const endItem = Math.min(filters.page * filters.perPage, totalCount);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-5 border-b border-charcoal/10">
      {/* Left: results count + mobile filter button */}
      <div className="flex items-center gap-3">
        {/* Mobile filter button */}
        <button
          onClick={onOpenMobileFilters}
          className="lg:hidden flex items-center gap-2 px-3.5 py-2 rounded-full bg-cream-50 border border-charcoal/15 text-xs font-medium text-charcoal hover:border-terracotta transition-colors"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Filtros</span>
          {activeCount > 0 && (
            <span className="bg-terracotta text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
              {activeCount}
            </span>
          )}
        </button>

        <span className="text-xs text-charcoal-muted">
          {totalCount > 0
            ? `Mostrando ${startItem}–${endItem} de ${totalCount} produtos`
            : 'Nenhum produto encontrado'}
        </span>
      </div>

      {/* Right: sort + per page + view toggle */}
      <div className="flex items-center gap-3">
        {/* Sort dropdown */}
        <div ref={sortRef} className="relative">
          <button
            onClick={() => setSortOpen((o) => !o)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-cream-50 border border-charcoal/15 text-xs text-charcoal hover:border-terracotta transition-colors"
          >
            <span className="text-charcoal-muted">Ordenar:</span>
            <span className="font-medium">{SORT_LABELS[filters.sort]}</span>
            <ChevronDown className={`w-3.5 h-3.5 text-charcoal-muted transition-transform ${sortOpen ? 'rotate-180' : ''}`} />
          </button>
          {sortOpen && (
            <div className="absolute right-0 top-full mt-1 w-48 bg-cream-50 border border-charcoal/10 rounded-xl shadow-soft-lg z-30 py-1 overflow-hidden">
              {(Object.keys(SORT_LABELS) as SortOption[]).map((key) => (
                <button
                  key={key}
                  onClick={() => {
                    onUpdateFilter('sort', key);
                    setSortOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-xs transition-colors ${
                    filters.sort === key
                      ? 'bg-terracotta/10 text-terracotta font-semibold'
                      : 'text-charcoal hover:bg-charcoal/5'
                  }`}
                >
                  {SORT_LABELS[key]}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Products per page */}
        <div className="hidden sm:flex items-center gap-1.5">
          <span className="text-[10px] text-charcoal-muted">Por página:</span>
          <select
            value={filters.perPage}
            onChange={(e) => onUpdateFilter('perPage', parseInt(e.target.value, 10))}
            className="bg-cream-50 border border-charcoal/15 rounded-lg px-2 py-1.5 text-xs text-charcoal focus:outline-none focus:border-terracotta cursor-pointer"
            aria-label="Produtos por página"
          >
            {PER_PAGE_OPTIONS.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        {/* View toggle */}
        <div className="hidden sm:flex items-center border border-charcoal/15 rounded-lg overflow-hidden">
          <button
            onClick={() => onUpdateFilter('view', 'grid')}
            className={`p-2 transition-colors ${
              filters.view === 'grid'
                ? 'bg-terracotta text-white'
                : 'bg-cream-50 text-charcoal-muted hover:text-charcoal'
            }`}
            aria-label="Visualização em grade"
            title="Grade"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => onUpdateFilter('view', 'list')}
            className={`p-2 transition-colors ${
              filters.view === 'list'
                ? 'bg-terracotta text-white'
                : 'bg-cream-50 text-charcoal-muted hover:text-charcoal'
            }`}
            aria-label="Visualização em lista"
            title="Lista"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
