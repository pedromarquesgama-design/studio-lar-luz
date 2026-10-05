'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Truck, Zap, CreditCard, ChevronRight } from 'lucide-react';

const ANNOUNCEMENTS = [
  {
    icon: Truck,
    text: 'Frete Grátis para todo o Brasil em compras acima de R$ 199',
    link: '/politicas/envio-e-prazos',
  },
  {
    icon: Zap,
    text: '5% de Desconto extra e imediato pagando via Pix',
    link: '/produtos',
  },
  {
    icon: CreditCard,
    text: 'Parcele suas compras em até 6x sem juros no cartão de crédito',
    link: '/produtos',
  },
];

export const AnnouncementBar: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const current = ANNOUNCEMENTS[currentIndex];
  const Icon = current.icon;

  return (
    <div className="bg-[#474B2F] text-cream-100 text-xs font-medium py-2 px-4 border-b border-[#3D4026] relative z-40 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-center text-center">
        {/* Mobile Rotating Carousel */}
        <div className="md:hidden flex items-center justify-center gap-2">
          <Icon className="w-3.5 h-3.5 text-gold-light shrink-0" />
          <Link
            href={current.link}
            className="hover:underline flex items-center gap-1 transition-all"
          >
            <span>{current.text}</span>
            <ChevronRight className="w-3 h-3 opacity-70" />
          </Link>
        </div>

        {/* Desktop Single Elegant Bar with Separators */}
        <div className="hidden md:flex items-center justify-center gap-8 text-[13px] tracking-wide">
          <div className="flex items-center gap-2">
            <Truck className="w-3.5 h-3.5 text-gold-light" />
            <span>
              <strong>Frete Grátis</strong> acima de R$ 199
            </span>
          </div>
          <span className="text-gold-light/40">•</span>
          <div className="flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-gold-light" />
            <span>
              <strong>5% OFF</strong> no Pix
            </span>
          </div>
          <span className="text-gold-light/40">•</span>
          <div className="flex items-center gap-2">
            <CreditCard className="w-3.5 h-3.5 text-gold-light" />
            <span>
              Até <strong>6x sem juros</strong> no cartão
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
