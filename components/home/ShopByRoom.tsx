import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const ROOMS = [
  {
    title: 'Cozinha',
    subtitle: 'Preparo com alma',
    link: '/colecoes/cozinha',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Mesa Posta',
    subtitle: 'Encontros ao redor da mesa',
    link: '/colecoes/mesa-posta',
    image: 'https://images.unsplash.com/photo-1615865417491-9941019fbc00?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Banheiro & SPA',
    subtitle: 'Pausas revigorantes',
    link: '/colecoes/banho',
    image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Despensa & Rotina',
    subtitle: 'Alimentação saudável',
    link: '/colecoes/marmitas',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Presentes & Detalhes',
    subtitle: 'Para encantar quem ama o lar',
    link: '/colecoes/lar-e-decoracao',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
  },
];

export const ShopByRoom: React.FC = () => {
  return (
    <section className="py-16 bg-cream-100 border-b border-charcoal/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-8 pb-3 border-b border-charcoal/10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif text-charcoal tracking-tight font-normal">
              Comprar por Ambiente
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-muted mt-1">
              Harmonia visual e funcionalidade pensada para cada espaço da casa.
            </p>
          </div>
          <Link
            href="/colecoes"
            className="group flex items-center gap-1.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-charcoal hover:text-terracotta transition-colors"
          >
            <span>Ver Todos</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 5-Column Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {ROOMS.map((room) => (
            <Link
              key={room.title}
              href={room.link}
              className="group relative flex flex-col rounded-xl overflow-hidden bg-paper shadow-soft-sm hover:shadow-soft-md transition-all duration-300"
            >
              <div className="relative aspect-4/5 w-full overflow-hidden bg-paper-light">
                <Image
                  src={room.image}
                  alt={room.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-charcoal/20 to-transparent" />
                <div className="absolute bottom-3 inset-x-3 text-white text-center">
                  <h3 className="text-sm sm:text-base font-serif font-medium tracking-wide">
                    {room.title}
                  </h3>
                  <p className="text-[11px] text-cream-200/90 font-light mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
                    {room.subtitle}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
