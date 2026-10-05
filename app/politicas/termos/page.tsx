import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Termos e Condições de Uso — Studio Lar & Luz',
  description: 'Termos e condições gerais de contratação e uso da plataforma Studio Lar & Luz.',
};

export default function TermsPage() {
  return (
    <div className="bg-cream-100 min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl sm:text-4xl font-serif text-charcoal font-normal tracking-tight mb-2">
          Termos e Condições de Uso
        </h1>
        <p className="text-xs text-charcoal-muted mb-8">
          Vigência a partir de Outubro de 2026.
        </p>

        <div className="bg-cream-50 p-8 rounded-2xl border border-charcoal/10 shadow-soft-sm text-xs sm:text-sm text-charcoal-muted leading-relaxed space-y-6">
          <section>
            <h2 className="text-base font-serif font-bold text-charcoal mb-2">1. Objeto</h2>
            <p>
              Estes Termos regulam a compra e venda de produtos disponibilizados no comércio eletrônico da Studio Lar & Luz em território nacional.
            </p>
          </section>

          <section>
            <h2 className="text-base font-serif font-bold text-charcoal mb-2">2. Preços e Disponibilidade</h2>
            <p>
              Os preços informados em nosso site são em Moeda Corrente Nacional (BRL R$) e incluem todos os tributos devidos. As promoções e descontos no Pix são válidos enquanto durarem os estoques e podem ser alterados sem aviso prévio.
            </p>
          </section>

          <section>
            <h2 className="text-base font-serif font-bold text-charcoal mb-2">3. Propriedade Intelectual</h2>
            <p>
              A marca nominativa e figurativa Studio Lar & Luz, as fotos autorais de catálogo e os textos deste site pertencem com exclusividade à Studio Lar & Luz Artigos para Casa Ltda.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
