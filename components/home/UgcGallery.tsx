import React from 'react';
import Image from 'next/image';
import { InstagramIcon } from '../common/SocialIcons';

const UGC_PHOTOS = [
  {
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80',
    user: '@camila.home',
    item: 'Panela Holandesa Oliva',
  },
  {
    image: 'https://images.unsplash.com/photo-1615865417491-9941019fbc00?auto=format&fit=crop&w=600&q=80',
    user: '@apartamento.302',
    item: 'Pratos Orgânicos & Faqueiro Dourado',
  },
  {
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
    user: '@cafes.e.versos',
    item: 'Xícaras Artesanais de Café',
  },
  {
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80',
    user: '@rotina.leve',
    item: 'Marmita Bento Box em Bambu',
  },
  {
    image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=600&q=80',
    user: '@studio.arquitetura',
    item: 'Toalhas Felpudas Algodão Egípcio',
  },
];

export const UgcGallery: React.FC = () => {
  return (
    <section className="py-16 bg-cream-50 border-b border-charcoal/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest text-terracotta font-bold flex items-center justify-center gap-1.5 mb-1.5">
            <InstagramIcon className="w-3.5 h-3.5" />
            #StudioLarELuz
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-charcoal font-normal tracking-tight">
            Inspirado por Você
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-muted mt-1.5">
            Casas reais, momentos autênticos. Marque <strong>@studiolarluz</strong> para aparecer em nossa galeria.
          </p>
        </div>

        {/* 5-Photo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {UGC_PHOTOS.map((photo, i) => (
            <div
              key={i}
              className="group relative aspect-square rounded-xl overflow-hidden bg-paper shadow-soft-sm hover:shadow-soft-md transition-all duration-300"
            >
              <Image
                src={photo.image}
                alt={photo.item}
                fill
                sizes="(max-width: 640px) 50vw, 20vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 text-white">
                <p className="text-xs font-semibold">{photo.user}</p>
                <p className="text-[10px] text-cream-200 mt-0.5 line-clamp-1">
                  {photo.item}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
