import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export const PromoBanners: React.FC = () => {
  return (
    <section className="py-16 bg-cream-100 border-b border-charcoal/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Banner 1: Edição da Estação (Warm Cream Card) */}
          <Link
            href="/colecoes?filtro=verao"
            className="group relative rounded-2xl overflow-hidden bg-paper-light border border-charcoal/10 p-6 flex flex-col justify-between min-h-[340px] hover:shadow-soft-md transition-all duration-300"
          >
            <div className="relative z-10 max-w-[200px]">
              <span className="text-[11px] font-bold uppercase tracking-wider text-terracotta">
                Edição de Verão
              </span>
              <h3 className="text-xl font-serif text-charcoal mt-1.5 font-normal leading-snug">
                Frescor e luz natural para os seus dias.
              </h3>
              <div className="mt-4 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-charcoal group-hover:text-terracotta transition-colors">
                <span>Ver Coleção</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div className="absolute right-0 bottom-0 w-44 h-48 sm:w-52 sm:h-52 overflow-hidden pointer-events-none">
              <Image
                src="https://images.unsplash.com/photo-1615865417491-9941019fbc00?auto=format&fit=crop&w=500&q=80"
                alt="Cerâmicas e mesa de verão"
                fill
                sizes="200px"
                className="object-cover object-left-top group-hover:scale-105 transition-transform duration-500 ease-out"
              />
            </div>
          </Link>

          {/* Banner 2: The Design Guide / Journal (Olive Green Card) */}
          <Link
            href="/journal"
            className="group relative rounded-2xl overflow-hidden bg-[#5D6041] text-cream-100 p-6 flex flex-col justify-between min-h-[340px] hover:shadow-soft-md transition-all duration-300"
          >
            <div className="relative z-10 max-w-[210px]">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gold-light">
                Guia de Estilo
              </span>
              <h3 className="text-xl font-serif text-white mt-1.5 font-normal leading-snug">
                Dicas atemporais para uma mesa posta acolhedora.
              </h3>
              <div className="mt-4 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white group-hover:text-gold-light transition-colors">
                <span>Ler & Inspirar</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div className="absolute right-0 bottom-0 w-44 h-48 sm:w-52 sm:h-52 overflow-hidden pointer-events-none opacity-85">
              <Image
                src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=500&q=80"
                alt="Café e revista de design"
                fill
                sizes="200px"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
              />
            </div>
          </Link>

          {/* Banner 3: New In / Novidades (Cream Modern Card) */}
          <Link
            href="/colecoes?filtro=novidades"
            className="group relative rounded-2xl overflow-hidden bg-cream-50 border border-charcoal/10 p-6 flex flex-col justify-between min-h-[340px] hover:shadow-soft-md transition-all duration-300"
          >
            <div className="relative z-10 max-w-[200px]">
              <span className="text-[11px] font-bold uppercase tracking-wider text-olive">
                Lançamentos
              </span>
              <h3 className="text-xl font-serif text-charcoal mt-1.5 font-normal leading-snug">
                Descubra as novidades que acabaram de chegar.
              </h3>
              <div className="mt-4 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-charcoal group-hover:text-terracotta transition-colors">
                <span>Ver Novidades</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div className="absolute right-0 bottom-0 w-44 h-48 sm:w-52 sm:h-52 overflow-hidden pointer-events-none">
              <Image
                src="https://images.unsplash.com/photo-1577937927133-66ef06acdf18?auto=format&fit=crop&w=500&q=80"
                alt="Copos e objetos novos"
                fill
                sizes="200px"
                className="object-cover object-left group-hover:scale-105 transition-transform duration-500 ease-out"
              />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};
