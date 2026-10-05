'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle2, Sparkles } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
  };

  return (
    <section className="py-16 bg-cream-100 border-b border-charcoal/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-paper-light rounded-2xl p-8 sm:p-12 border border-charcoal/10 shadow-soft-sm max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream-50 border border-charcoal/10 text-xs font-semibold text-terracotta mb-4 shadow-soft-sm">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Presente de Boas-Vindas</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif text-charcoal font-normal tracking-tight">
            Inspire Seu Lar com a Luz Certa
          </h2>
          <p className="text-sm sm:text-base text-charcoal-muted max-w-lg mx-auto mt-2 leading-relaxed">
            Cadastre seu e-mail e receba histórias de mesa posta, receitas acolhedoras e <strong>10% de desconto</strong> no seu primeiro pedido.
          </p>

          {isSubscribed ? (
            <div className="mt-8 p-4 rounded-xl bg-olive/15 text-olive-dark flex items-center justify-center gap-2 max-w-md mx-auto animate-fade-in">
              <CheckCircle2 className="w-5 h-5 text-olive" />
              <div className="text-left text-xs sm:text-sm">
                <p className="font-bold">Inscrição confirmada com sucesso!</p>
                <p>Use o cupom <strong className="underline tracking-wider font-mono">BEMVINDO10</strong> no carrinho.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="relative flex-1">
                <Mail className="w-4 h-4 text-charcoal-muted absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Seu melhor e-mail..."
                  required
                  className="w-full pl-11 pr-4 py-3.5 rounded-full bg-white border border-charcoal/20 text-sm text-charcoal placeholder:text-charcoal-muted/60 focus:outline-none focus:border-terracotta shadow-soft-sm"
                />
              </div>
              <button
                type="submit"
                className="px-8 py-3.5 rounded-full bg-terracotta hover:bg-terracotta-hover active:bg-terracotta-active text-white text-xs font-bold uppercase tracking-wider shadow-soft-sm transition-all"
              >
                Cadastrar
              </button>
            </form>
          )}

          <p className="text-[11px] text-charcoal-muted/80 mt-3">
            Respeitamos sua privacidade. Cancele sua inscrição quando desejar.
          </p>
        </div>
      </div>
    </section>
  );
};
