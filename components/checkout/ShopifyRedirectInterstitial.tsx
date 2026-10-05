'use client';

import React, { useEffect, useState } from 'react';
import { ShieldCheck, ExternalLink, ArrowLeft, MailCheck, Loader2 } from 'lucide-react';

interface ShopifyRedirectInterstitialProps {
  checkoutUrl: string;
  customerEmail: string;
  itemCount: number;
  totalFormatted: string;
  mode: 'cart' | 'permalink' | 'storefront';
  warning?: string;
  delaySeconds?: number;
  onCancel: () => void;
}

export const ShopifyRedirectInterstitial: React.FC<ShopifyRedirectInterstitialProps> = ({
  checkoutUrl,
  customerEmail,
  itemCount,
  totalFormatted,
  mode,
  warning,
  delaySeconds = 5,
  onCancel,
}) => {
  const [secondsLeft, setSecondsLeft] = useState(delaySeconds);

  // Automatic redirect countdown
  useEffect(() => {
    if (secondsLeft <= 0) {
      window.location.href = checkoutUrl;
      return;
    }
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft, checkoutUrl]);

  const progress = ((delaySeconds - secondsLeft) / delaySeconds) * 100;

  return (
    <div className="bg-cream-100 min-h-screen py-10">
      <div className="max-w-xl mx-auto px-4 sm:px-6">
        <div className="bg-cream-50 p-8 rounded-2xl border border-charcoal/10 shadow-soft-md text-center space-y-5">
          <div className="mx-auto w-14 h-14 rounded-full bg-olive/10 flex items-center justify-center">
            {secondsLeft > 0 ? (
              <Loader2 className="w-7 h-7 text-olive animate-spin" />
            ) : (
              <ShieldCheck className="w-7 h-7 text-olive" />
            )}
          </div>

          <div>
            <h1 className="text-2xl font-serif text-charcoal tracking-tight">
              Pedido quase lá!
            </h1>
            <p className="text-sm text-charcoal-muted mt-2 leading-relaxed">
              Vamos te levar ao checkout seguro da Shopify para concluir o
              pagamento de{' '}
              <strong className="text-charcoal">
                {itemCount} {itemCount === 1 ? 'item' : 'itens'} • {totalFormatted}
              </strong>
              .
            </p>
          </div>

          {/* Countdown + progress */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-charcoal">
              Redirecionando em {secondsLeft}s…
            </p>
            <div className="h-1.5 bg-charcoal/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-terracotta rounded-full transition-all duration-1000 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Email confirmation notice */}
          <div className="p-4 rounded-xl bg-paper-light border border-charcoal/10 flex items-start gap-3 text-left">
            <MailCheck className="w-5 h-5 text-terracotta shrink-0 mt-0.5" />
            <p className="text-xs text-charcoal-muted leading-relaxed">
              Você ainda precisará inserir os dados de pagamento no ambiente
              seguro da Shopify. Após a confirmação do pagamento, enviaremos o
              resumo do pedido e o código de rastreio para{' '}
              <strong className="text-charcoal">
                {customerEmail || 'o seu e-mail'}
              </strong>
              .
            </p>
          </div>

          {mode === 'storefront' && warning && (
            <p className="text-xs text-terracotta bg-terracotta-subtle border border-terracotta/20 rounded-xl px-4 py-3 leading-relaxed">
              {warning}
            </p>
          )}

          {/* Fallback / explicit actions */}
          <div className="space-y-3 pt-1">
            <a
              href={checkoutUrl}
              className="w-full py-4 rounded-full bg-terracotta hover:bg-terracotta-hover text-white text-xs font-bold uppercase tracking-wider shadow-soft-md transition-all flex items-center justify-center gap-2"
            >
              <span>Ir para o pagamento agora</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={onCancel}
              className="w-full py-3 rounded-full border border-charcoal/20 text-charcoal text-xs font-semibold uppercase tracking-wider hover:bg-paper-light transition-all flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar e revisar o pedido</span>
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 text-[11px] text-charcoal-muted">
            <ShieldCheck className="w-3.5 h-3.5 text-olive" />
            <span>Checkout Shopify com criptografia de ponta a ponta</span>
          </div>
        </div>
      </div>
    </div>
  );
};
