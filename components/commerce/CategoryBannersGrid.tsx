'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export const CategoryBannersGrid: React.FC = () => {
  return (
    <div className="mb-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        {/* Banner 1: Left Large Feature (5 cols on lg) */}
        <Link
          href="/colecoes/panelas"
          className="group relative lg:col-span-5 min-h-[380px] sm:min-h-[440px] rounded-2xl sm:rounded-3xl overflow-hidden bg-charcoal text-white flex flex-col justify-end p-6 sm:p-8 shadow-soft-md hover:shadow-soft-lg transition-all duration-300"
        >
          <Image
            src="https://images.unsplash.com/photo-1584990347449-399b24479904?auto=format&fit=crop&w=1000&q=80"
            alt="Arte na Cozinha — Panelas & Caçarolas"
            fill
            sizes="(max-width: 1024px) 100vw, 42vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out opacity-85 group-hover:opacity-95"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent" />

          <div className="relative z-10 max-w-md">
            <span className="inline-block text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full bg-gold-gradient text-charcoal mb-3 shadow-xs">
              Destaque da Estação
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-normal tracking-tight text-white leading-tight">
              Arte na Cozinha & Panelas Esmaltadas
            </h2>
            <p className="text-xs sm:text-sm text-cream-200 mt-2 font-light line-clamp-2 leading-relaxed">
              Retenção perfeita de calor com acabamento vitrificado e pegadores em ouro escovado.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-terracotta text-white text-xs font-bold uppercase tracking-wider group-hover:bg-terracotta-hover transition-colors shadow-soft-sm">
              <span>Comprar Agora</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>

        {/* Banner 2 & 3: Middle Column Stack (4 cols on lg) */}
        <div className="lg:col-span-4 flex flex-col gap-4 sm:gap-6">
          {/* Top Stacked Banner */}
          <Link
            href="/colecoes/mesa-posta"
            className="group relative flex-1 min-h-[180px] sm:min-h-[208px] rounded-2xl sm:rounded-3xl overflow-hidden bg-charcoal text-white flex flex-col justify-end p-5 sm:p-6 shadow-soft-md hover:shadow-soft-lg transition-all duration-300"
          >
            <Image
              src="https://images.unsplash.com/photo-1615865417491-9941019fbc00?auto=format&fit=crop&w=800&q=80"
              alt="Mesa Posta & Faqueiros Dourados"
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/30 to-transparent" />

            <div className="relative z-10">
              <span className="text-[9px] uppercase font-bold tracking-widest text-gold-light">
                Celebrações ao Redor da Mesa
              </span>
              <h3 className="text-xl font-serif text-white font-normal mt-0.5">
                Mesa Posta & Faqueiros
              </h3>
              <p className="text-xs text-cream-200 mt-1 line-clamp-1">
                Pratos artesanais e talheres minimalistas em inox dourado.
              </p>
              <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-terracotta-light group-hover:text-white transition-colors">
                <span className="uppercase tracking-wider">Explorar</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Bottom Stacked Banner */}
          <Link
            href="/colecoes/marmitas"
            className="group relative flex-1 min-h-[180px] sm:min-h-[208px] rounded-2xl sm:rounded-3xl overflow-hidden bg-charcoal text-white flex flex-col justify-end p-5 sm:p-6 shadow-soft-md hover:shadow-soft-lg transition-all duration-300"
          >
            <Image
              src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80"
              alt="Marmitas Herméticas em Bambu e Inox"
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/30 to-transparent" />

            <div className="relative z-10">
              <span className="text-[9px] uppercase font-bold tracking-widest text-olive-light">
                Rotina Consciente
              </span>
              <h3 className="text-xl font-serif text-white font-normal mt-0.5">
                Marmitas Herméticas & Potes
              </h3>
              <p className="text-xs text-cream-200 mt-1 line-clamp-1">
                Vedação em silicone antivazamento com tampa em bambu sustentável.
              </p>
              <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-terracotta-light group-hover:text-white transition-colors">
                <span className="uppercase tracking-wider">Ver Coleção</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        </div>

        {/* Banner 4: Right Feature Banner (3 cols on lg) */}
        <Link
          href="/colecoes/cafes-e-copos"
          className="group relative lg:col-span-3 min-h-[380px] sm:min-h-[440px] rounded-2xl sm:rounded-3xl overflow-hidden bg-charcoal text-white flex flex-col justify-between p-6 sm:p-7 shadow-soft-md hover:shadow-soft-lg transition-all duration-300"
        >
          <Image
            src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80"
            alt="Kits Exclusivos de Café & Cerâmicas"
            fill
            sizes="(max-width: 1024px) 100vw, 25vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-charcoal/20" />

          {/* Top Content */}
          <div className="relative z-10">
            <span className="inline-block text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-terracotta text-white shadow-xs">
              Kits Especial
            </span>
          </div>

          {/* Bottom Content */}
          <div className="relative z-10">
            <h2 className="text-xl sm:text-2xl font-serif font-normal tracking-tight text-white leading-snug">
              Monte seu Conjunto de Xícaras & Copos
            </h2>
            <p className="text-xs text-cream-200 mt-2 font-light line-clamp-2 leading-relaxed">
              Cerâmicas artesanais moldadas à mão e vidros térmicos borossilicato.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 hover:bg-white text-charcoal text-xs font-bold uppercase tracking-wider transition-colors shadow-soft-sm">
              <span>Montar Kit</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};
