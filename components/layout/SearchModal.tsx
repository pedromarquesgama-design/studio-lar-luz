'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X, ArrowRight } from 'lucide-react';
import { MOCK_PRODUCTS } from '@/lib/commerce/mock-data';
import { formatBRL } from '@/lib/utils/format';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const filtered = query.trim()
    ? MOCK_PRODUCTS.filter(
        (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  const quickTags = ['Panela de ferro', 'Faqueiro dourado', 'Xícara cerâmica', 'Marmita hermética', 'Toalha waffle'];

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-charcoal/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-cream-50 border-b border-charcoal/10 shadow-soft-lg w-full max-h-[85vh] flex flex-col">
        <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-6">
          {/* Search Header Input */}
          <div className="flex items-center justify-between gap-4 pb-4 border-b border-charcoal/10">
            <div className="flex items-center gap-3 flex-1">
              <Search className="w-5 h-5 text-charcoal-muted" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar utensílios, louças, faqueiros ou toalhas..."
                className="w-full bg-transparent text-lg md:text-xl text-charcoal placeholder:text-charcoal-muted/60 focus:outline-none font-sans"
              />
            </div>
            <button
              onClick={onClose}
              className="p-2 text-charcoal-muted hover:text-charcoal transition-colors rounded-full hover:bg-paper-light"
              aria-label="Fechar busca"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Quick Suggestions when empty */}
          {!query && (
            <div className="py-6">
              <p className="text-xs uppercase tracking-wider text-charcoal-muted font-medium mb-3">
                Buscas Mais Frequentes
              </p>
              <div className="flex flex-wrap gap-2">
                {quickTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="text-xs md:text-sm px-3.5 py-1.5 rounded-full bg-paper border border-charcoal/10 text-charcoal hover:bg-terracotta hover:text-white hover:border-terracotta transition-all"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results List */}
          {query && (
            <div className="py-6 overflow-y-auto max-h-[55vh]">
              {filtered.length > 0 ? (
                <div>
                  <p className="text-xs text-charcoal-muted mb-4">
                    {filtered.length} produto{filtered.length > 1 ? 's' : ''} encontrado{filtered.length > 1 ? 's' : ''}:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filtered.map((product) => (
                      <Link
                        key={product.id}
                        href={`/produtos/${product.handle}`}
                        onClick={onClose}
                        className="flex items-center gap-4 p-3 rounded-lg border border-transparent hover:border-charcoal/10 hover:bg-paper-light transition-all group"
                      >
                        <div className="relative w-16 h-16 rounded-md overflow-hidden bg-paper shrink-0">
                          <Image
                            src={product.featuredImage}
                            alt={product.title}
                            fill
                            sizes="64px"
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-charcoal truncate group-hover:text-terracotta transition-colors">
                            {product.title}
                          </h4>
                          <p className="text-xs text-charcoal-muted mt-0.5">
                            {product.category}
                          </p>
                          <p className="text-sm font-semibold text-terracotta mt-1">
                            {formatBRL(product.price)}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-charcoal-muted group-hover:text-terracotta group-hover:translate-x-1 transition-all" />
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-charcoal-muted">
                  <p className="text-base font-medium">Nenhum produto encontrado para &quot;{query}&quot;</p>
                  <p className="text-xs mt-1">Tente buscar por termos mais genéricos como &quot;cerâmica&quot; ou &quot;inox&quot;.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {/* Click outside backdrop */}
      <div className="flex-1" onClick={onClose} />
    </div>
  );
};
