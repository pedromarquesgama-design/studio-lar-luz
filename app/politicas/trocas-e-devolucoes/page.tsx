import React from 'react';
import { Metadata } from 'next';
import { RotateCcw, CheckCircle, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Trocas e Devoluções — Studio Lar & Luz',
  description: 'Conheça nossa política de trocas e devoluções com primeira troca grátis e prazo estendido de 30 dias.',
};

export default function ReturnsPolicyPage() {
  return (
    <div className="bg-cream-100 min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl sm:text-4xl font-serif text-charcoal font-normal tracking-tight mb-2">
          Política de Trocas e Devoluções
        </h1>
        <p className="text-xs text-charcoal-muted mb-8">
          Em conformidade com o Código de Defesa do Consumidor (CDC) e compromisso de acolhimento Studio Lar & Luz.
        </p>

        <div className="bg-cream-50 p-8 rounded-2xl border border-charcoal/10 shadow-soft-sm text-xs sm:text-sm text-charcoal-muted leading-relaxed space-y-6">
          <div className="p-4 rounded-xl bg-olive/15 text-olive-dark flex items-center gap-3">
            <RotateCcw className="w-5 h-5 text-olive shrink-0" />
            <p className="font-semibold text-xs">
              Sua primeira troca tem logística reversa 100% gratuita por nossa conta!
            </p>
          </div>

          <section>
            <h2 className="text-base font-serif font-bold text-charcoal mb-2">1. Prazo de Troca Estendido (30 Dias)</h2>
            <p>
              Entendemos que experimentar a peça no seu ambiente faz parte da harmonia da sua casa. Por isso, oferecemos um prazo de até <strong>30 dias corridos</strong> a partir do recebimento da mercadoria para solicitar troca por outro acabamento, cor ou modelo.
            </p>
          </section>

          <section>
            <h2 className="text-base font-serif font-bold text-charcoal mb-2">2. Direito de Arrependimento (CDC Art. 49)</h2>
            <p>
              Caso deseje desistir da compra e solicitar reembolso integral, o prazo legal é de até <strong>7 (sete) dias corridos</strong> após a entrega. O valor integral do produto e do frete original será restituído pelo mesmo método de pagamento utilizado (estorno na fatura do cartão ou Pix em até 2 dias úteis).
            </p>
          </section>

          <section>
            <h2 className="text-base font-serif font-bold text-charcoal mb-2">3. Como Solicitar</h2>
            <p>
              Basta enviar uma mensagem para nosso WhatsApp <strong>(11) 98765-4321</strong> ou e-mail <strong>atendimento@studiolarluz.com.br</strong> informando o número do seu pedido (ex: #LL1042) e a peça que deseja trocar. Emitiremos um código de postagem reversa dos Correios para você postar sem nenhum custo.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
