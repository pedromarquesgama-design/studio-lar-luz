import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { ArrowRight, Calendar, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Journal & Inspiração — Studio Lar & Luz',
  description: 'Artigos sobre o ritual do lar, mesa posta acolhedora, cuidados com cerâmicas artesanais e gastronomia com afeto.',
};

export const ARTICLES = [
  {
    slug: 'como-cuidar-de-panelas-de-ferro-fundido-esmaltado',
    title: 'Guia Definitivo: Como Cuidar da sua Panela de Ferro Fundido Esmaltado',
    excerpt: 'Dicas práticas para manter o brilho do esmalte vitrificado, evitar choques térmicos e cozinhar pães e assados perfeitos por gerações.',
    date: '28 de Setembro de 2026',
    readTime: '4 min de leitura',
    category: 'Cozinha com Afeto',
    image: 'https://images.unsplash.com/photo-1584990347449-399b24479904?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'a-arte-da-mesa-posta-organica-para-o-dia-a-dia',
    title: 'A Arte da Mesa Posta Orgânica: Acolhimento Sem Complicação',
    excerpt: 'Como harmonizar cerâmicas de formatos livres, linho natural e faqueiro dourado fosco para transformar qualquer almoço de terça-feira em um momento especial.',
    date: '20 de Setembro de 2026',
    readTime: '5 min de leitura',
    category: 'Mesa & Inspiração',
    image: 'https://images.unsplash.com/photo-1615865417491-9941019fbc00?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'o-ritual-do-cafe-da-manha-lento',
    title: 'O Ritual do Café da Manhã Lento: Criando Pausas no Cotidiano',
    excerpt: 'O poder sensorial de uma boa xícara artesanal entre as mãos e como pequenas escolhas de design matinal moldam a energia do seu dia.',
    date: '14 de Setembro de 2026',
    readTime: '3 min de leitura',
    category: 'Estilo de Vida',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
  },
];

export default function JournalPage() {
  return (
    <div className="bg-cream-100 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest text-olive font-bold">
            Editorial & Inspiração
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif text-charcoal font-normal tracking-tight mt-2">
            Journal Studio Lar & Luz
          </h1>
          <p className="text-sm sm:text-base text-charcoal-muted mt-3 leading-relaxed">
            Crônicas, guias práticos de cuidados e ideias para transformar cada cantinho da sua casa em um refúgio de calma.
          </p>
        </div>

        {/* Featured First Article */}
        <div className="mb-14">
          <Link
            href={`/journal/${ARTICLES[0].slug}`}
            className="group grid grid-cols-1 lg:grid-cols-12 rounded-3xl overflow-hidden bg-cream-50 border border-charcoal/10 shadow-soft-md hover:shadow-soft-lg transition-all duration-300"
          >
            <div className="lg:col-span-7 relative aspect-16/10 lg:aspect-auto min-h-[320px] bg-paper">
              <Image
                src={ARTICLES[0].image}
                alt={ARTICLES[0].title}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
            </div>
            <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 text-xs text-charcoal-muted mb-3">
                  <span className="font-bold text-terracotta uppercase tracking-wider">
                    {ARTICLES[0].category}
                  </span>
                  <span>•</span>
                  <span>{ARTICLES[0].readTime}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif text-charcoal font-normal leading-snug group-hover:text-terracotta transition-colors">
                  {ARTICLES[0].title}
                </h2>
                <p className="text-xs sm:text-sm text-charcoal-muted mt-3 leading-relaxed">
                  {ARTICLES[0].excerpt}
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-charcoal/10 flex items-center justify-between text-xs">
                <span className="text-charcoal-muted">{ARTICLES[0].date}</span>
                <span className="font-bold uppercase tracking-wider text-charcoal group-hover:text-terracotta flex items-center gap-1">
                  <span>Ler Artigo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ARTICLES.slice(1).map((art) => (
            <Link
              key={art.slug}
              href={`/journal/${art.slug}`}
              className="group flex flex-col rounded-2xl overflow-hidden bg-cream-50 border border-charcoal/10 shadow-soft-sm hover:shadow-soft-md transition-all duration-300"
            >
              <div className="relative aspect-16/10 w-full overflow-hidden bg-paper">
                <Image
                  src={art.image}
                  alt={art.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-charcoal-muted mb-2">
                    <span className="font-bold text-terracotta uppercase tracking-wider">
                      {art.category}
                    </span>
                    <span>•</span>
                    <span>{art.readTime}</span>
                  </div>
                  <h3 className="text-xl font-serif text-charcoal font-medium leading-snug group-hover:text-terracotta transition-colors">
                    {art.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-charcoal-muted mt-2 leading-relaxed line-clamp-3">
                    {art.excerpt}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-charcoal/10 flex items-center justify-between text-xs text-charcoal-muted">
                  <span>{art.date}</span>
                  <span className="font-semibold text-charcoal group-hover:text-terracotta flex items-center gap-1">
                    <span>Ler mais</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
