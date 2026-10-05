import React from 'react';
import { Sparkles, Leaf, RotateCcw, ShieldCheck, Headphones } from 'lucide-react';

const TRUST_POINTS = [
  {
    icon: Sparkles,
    title: 'Curadoria Consciente',
    description: 'Peças selecionadas para durar e acolher seu dia a dia.',
  },
  {
    icon: Leaf,
    title: 'Escolhas Sustentáveis',
    description: 'Bambu, cerâmica natural e aço livre de tóxicos.',
  },
  {
    icon: RotateCcw,
    title: 'Trocas em até 30 Dias',
    description: 'Primeira troca grátis para sua total tranquilidade.',
  },
  {
    icon: ShieldCheck,
    title: 'Pagamento 100% Seguro',
    description: 'Pix com 5% OFF e cartões criptografados via Stripe.',
  },
  {
    icon: Headphones,
    title: 'Suporte Humanizado',
    description: 'Atendimento ágil e atencioso direto pelo WhatsApp.',
  },
];

export const TrustBar: React.FC = () => {
  return (
    <section className="py-12 bg-paper-light border-b border-charcoal/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
          {TRUST_POINTS.map((point) => {
            const Icon = point.icon;
            return (
              <div key={point.title} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-cream-50 border border-charcoal/10 flex items-center justify-center mb-3 shadow-soft-sm text-terracotta">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-xs sm:text-sm font-serif font-bold text-charcoal tracking-wide">
                  {point.title}
                </h4>
                <p className="text-[11px] sm:text-xs text-charcoal-muted mt-1 leading-relaxed">
                  {point.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
