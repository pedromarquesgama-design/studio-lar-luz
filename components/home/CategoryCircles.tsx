'use client';

import React from 'react';
import Link from 'next/link';
import { ChefHat, Utensils, Coffee, CookingPot, Box, Sparkles, Home } from 'lucide-react';

const CATEGORIES = [
  {
    title: 'Cozinha',
    handle: 'cozinha',
    icon: ChefHat,
    color: 'bg-paper-light hover:bg-cream-200',
  },
  {
    title: 'Mesa Posta',
    handle: 'mesa-posta',
    icon: Utensils,
    color: 'bg-paper-light hover:bg-cream-200',
  },
  {
    title: 'Xícaras & Café',
    handle: 'cafes-e-copos',
    icon: Coffee,
    color: 'bg-paper-light hover:bg-cream-200',
  },
  {
    title: 'Panelas',
    handle: 'panelas',
    icon: CookingPot,
    color: 'bg-paper-light hover:bg-cream-200',
  },
  {
    title: 'Marmitas',
    handle: 'marmitas',
    icon: Box,
    color: 'bg-paper-light hover:bg-cream-200',
  },
  {
    title: 'Toalhas & Banho',
    handle: 'banho',
    icon: Sparkles,
    color: 'bg-paper-light hover:bg-cream-200',
  },
  {
    title: 'Lar & Detalhes',
    handle: 'lar-e-decoracao',
    icon: Home,
    color: 'bg-paper-light hover:bg-cream-200',
  },
];

export const CategoryCircles: React.FC = () => {
  return (
    <section className="py-12 bg-cream-50 border-b border-charcoal/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-start sm:justify-center gap-6 sm:gap-10 overflow-x-auto pb-4 pt-2 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.handle}
                href={`/colecoes/${cat.handle}`}
                className="group flex flex-col items-center shrink-0 text-center transition-transform hover:-translate-y-1 duration-200"
              >
                {/* Circular Icon Container */}
                <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full ${cat.color} border border-charcoal/10 flex items-center justify-center shadow-soft-sm group-hover:border-terracotta/40 group-hover:shadow-soft-md transition-all duration-300`}>
                  <Icon className="w-8 h-8 sm:w-9 sm:h-9 text-charcoal group-hover:text-terracotta group-hover:scale-110 transition-all duration-300" />
                </div>
                <span className="mt-3 text-xs sm:text-sm font-medium text-charcoal group-hover:text-terracotta transition-colors">
                  {cat.title}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
