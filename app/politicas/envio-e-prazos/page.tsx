import React from 'react';
import { Metadata } from 'next';
import { Truck, Sparkles, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Envio, Frete e Prazos — Studio Lar & Luz',
  description: 'Informações completas sobre frete grátis acima de R$ 199, prazos médios de entrega e rastreamento para todo o Brasil.',
};

export default function ShippingPolicyPage() {
  return (
    <div className="bg-cream-100 min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl sm:text-4xl font-serif text-charcoal font-normal tracking-tight mb-2">
          Política de Envio e Prazos de Entrega
        </h1>
        <p className="text-xs text-charcoal-muted mb-8">
          Entregas seguras para todos os estados do Brasil.
        </p>

        <div className="bg-cream-50 p-8 rounded-2xl border border-charcoal/10 shadow-soft-sm text-xs sm:text-sm text-charcoal-muted leading-relaxed space-y-6">
          <div className="p-4 rounded-xl bg-olive/15 text-olive-dark flex items-center gap-3">
            <Truck className="w-5 h-5 text-olive shrink-0" />
            <p className="font-semibold text-xs">
              <strong>Frete Grátis</strong> para todo o Brasil em compras acima de R$ 199,00!
            </p>
          </div>

          <section>
            <h2 className="text-base font-serif font-bold text-charcoal mb-2">1. Prazos de Expedição</h2>
            <p>
              Após a confirmação do pagamento, seu pedido é carinhosamente conferido, embalado e despachado em até <strong>1 a 2 dias úteis</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-base font-serif font-bold text-charcoal mb-2">2. Prazos Médios de Entrega por Região</h2>
            <div className="space-y-1.5 pt-1">
              <p>• <strong>Sudeste (SP, RJ, MG, ES):</strong> 2 a 5 dias úteis</p>
              <p>• <strong>Sul (PR, SC, RS):</strong> 3 a 6 dias úteis</p>
              <p>• <strong>Centro-Oeste (DF, GO, MT, MS):</strong> 4 a 7 dias úteis</p>
              <p>• <strong>Nordeste (todas as capitais e interior):</strong> 5 a 9 dias úteis</p>
              <p>• <strong>Norte:</strong> 7 a 14 dias úteis</p>
            </div>
          </section>

          <section>
            <h2 className="text-base font-serif font-bold text-charcoal mb-2">3. Rastreamento e Atualizações</h2>
            <p>
              Assim que o pacote for despachado nos Correios ou transportadora parceira, você receberá o código de rastreamento por e-mail e no WhatsApp, além de poder consultar a qualquer momento em nossa página de <a href="/rastreio" className="text-terracotta underline font-semibold">Rastreamento de Pedido</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
