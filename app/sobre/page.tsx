import React from 'react';
import Image from 'next/image';
import { Metadata } from 'next';
import { Sparkles, Heart, Leaf, ShieldCheck } from 'lucide-react';
import { StudioLogo } from '@/components/common/StudioLogo';

export const metadata: Metadata = {
  title: 'Sobre Nós — O Manifesto Studio Lar & Luz',
  description: 'Conheça o Studio Lar & Luz: a busca pela harmonia entre cozinha, mesa posta e acolhimento para o lar.',
};

export default function AboutPage() {
  return (
    <div className="bg-cream-100 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Brand Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="flex justify-center mb-6">
            <StudioLogo variant="icon" />
          </div>
          <span className="text-xs uppercase tracking-widest text-terracotta font-bold">
            Manifesto da Marca
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif text-charcoal font-normal tracking-tight">
            Viver com Alma, em Cada Detalhe
          </h1>
          <p className="text-base sm:text-lg text-charcoal-muted max-w-xl mx-auto leading-relaxed">
            Acreditamos que a casa não é apenas um endereço, mas o santuário onde a vida acontece com calma e afeto.
          </p>
        </div>

        {/* Hero Image */}
        <div className="relative aspect-16/9 rounded-3xl overflow-hidden mb-16 shadow-soft-md bg-paper">
          <Image
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80"
            alt="Ambiente acolhedor Studio Lar & Luz"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 900px"
            className="object-cover"
          />
        </div>

        {/* Manifesto Content */}
        <div className="prose prose-stone max-w-none text-charcoal-muted text-base leading-relaxed space-y-6">
          <p className="text-xl font-serif text-charcoal italic leading-relaxed">
            &ldquo;Studio Lar & Luz nasceu do desejo de desacelerar o cotidiano. Em um mundo de pressa e descartabilidade, escolhemos a permanência, o calor dos materiais nobres e a beleza da imperfeição natural.&rdquo;
          </p>

          <p>
            Nossa curadoria nasce na interseção entre estética atemporal e máxima funcionalidade brasileira. Cada panela em ferro fundido, faqueiro em aço escovado, xícara cerâmica e marmita hermética que entra em nosso catálogo passa por rigorosos testes de usabilidade real: precisa ser linda na bancada e impecável no preparo diário.
          </p>

          {/* 4 Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-12 not-prose">
            <div className="p-6 rounded-2xl bg-cream-50 border border-charcoal/10 shadow-soft-sm space-y-2">
              <div className="w-10 h-10 rounded-full bg-olive/15 text-olive flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-serif font-bold text-charcoal">Design Atemporal</h3>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                Linhas limpas, tons terrosos e minerais que nunca saem de moda e combinam entre si com naturalidade.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-cream-50 border border-charcoal/10 shadow-soft-sm space-y-2">
              <div className="w-10 h-10 rounded-full bg-olive/15 text-olive flex items-center justify-center">
                <Leaf className="w-5 h-5" />
              </div>
              <h3 className="text-base font-serif font-bold text-charcoal">Materiais Conscientes</h3>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                Aço inoxidável 304, ferro maciço, bambu tratado e algodão egípcio de fontes responsáveis.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-cream-50 border border-charcoal/10 shadow-soft-sm space-y-2">
              <div className="w-10 h-10 rounded-full bg-olive/15 text-olive flex items-center justify-center">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="text-base font-serif font-bold text-charcoal">Cuidado em Cada Envio</h3>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                Embalagens protegidas e perfumadas com aroma exclusivo, preparadas como um presente para você.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-cream-50 border border-charcoal/10 shadow-soft-sm space-y-2">
              <div className="w-10 h-10 rounded-full bg-olive/15 text-olive flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-serif font-bold text-charcoal">Compromisso Total</h3>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                Garantia estendida, suporte ágil por WhatsApp e política transparente de trocas sem burocracia.
              </p>
            </div>
          </div>

          <p>
            Seja bem-vindo ao Studio Lar & Luz. Que nossas peças façam parte das melhores memórias à mesa da sua vida.
          </p>
        </div>
      </div>
    </div>
  );
}
