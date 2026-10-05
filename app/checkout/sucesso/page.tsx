'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import confetti from 'canvas-confetti';
import { CheckCircle2, QrCode, Copy, Check, Truck, ArrowRight, Home } from 'lucide-react';
import { formatBRL } from '@/lib/utils/format';

function SuccessContent() {
  const searchParams = useSearchParams();
  const method = searchParams.get('method') || 'pix';
  const total = parseFloat(searchParams.get('total') || '389.00');

  const [copied, setCopied] = useState(false);
  const [orderNumber] = useState(() => `LL${Math.floor(1000 + Math.random() * 9000)}`);

  useEffect(() => {
    // Launch celebratory confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#B56339', '#5D6041', '#CEAC6F', '#ECE9E3'],
    });
  }, []);

  const pixCode = '00020126580014br.gov.bcb.pix0136studiolarluz-pagamento-pix-982045204000053039865405141.555802BR5916STUDIO LAR LUZ6009SAO PAULO62070503***6304ABCD';

  const handleCopy = () => {
    navigator.clipboard.writeText(pixCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-cream-100 min-h-screen py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <div className="w-16 h-16 rounded-full bg-olive/15 text-olive flex items-center justify-center mx-auto mb-6 shadow-soft-sm">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <span className="text-xs uppercase tracking-widest text-olive font-bold">
          Pedido Recebido com Sucesso!
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif text-charcoal font-normal tracking-tight mt-2">
          Obrigado por Escolher o Studio Lar & Luz
        </h1>
        <p className="text-sm text-charcoal-muted mt-2">
          Número do Pedido: <strong className="text-charcoal font-mono text-base">#{orderNumber}</strong>
        </p>

        {/* Pix Section */}
        {method === 'pix' && (
          <div className="mt-8 p-6 rounded-2xl bg-cream-50 border border-charcoal/10 shadow-soft-sm text-left space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-charcoal/10">
              <span className="text-sm font-serif font-bold text-charcoal flex items-center gap-2">
                <QrCode className="w-5 h-5 text-terracotta" />
                <span>Pagamento via Pix</span>
              </span>
              <span className="text-xs font-bold text-olive px-2.5 py-0.5 rounded-full bg-olive/10">
                Aguardando Pagamento
              </span>
            </div>

            <p className="text-xs text-charcoal-muted leading-relaxed">
              Abra o aplicativo do seu banco, escolha <strong>Pagar via Pix</strong> e escaneie o QR Code ou utilize a opção <strong>Pix Copia e Cola</strong> abaixo.
            </p>

            <div className="p-3 rounded-lg bg-paper-light border border-charcoal/15 font-mono text-[11px] text-charcoal break-all select-all">
              {pixCode}
            </div>

            <button
              onClick={handleCopy}
              className="w-full py-3 rounded-xl bg-terracotta text-white text-xs font-bold uppercase tracking-wider hover:bg-terracotta-hover transition-colors flex items-center justify-center gap-2 shadow-soft-sm"
            >
              {copied ? <Check className="w-4 h-4 text-gold-light" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Código Pix Copiado com Sucesso!' : 'Copiar Código Pix (Copia e Cola)'}</span>
            </button>
          </div>
        )}

        {/* Order Details & Tracking Button */}
        <div className="mt-8 p-6 rounded-2xl bg-cream-50 border border-charcoal/10 shadow-soft-sm text-left space-y-3 text-xs text-charcoal-muted">
          <h3 className="text-sm font-serif font-bold text-charcoal">Próximos Passos:</h3>
          <p>
            1. Enviamos todos os detalhes e o comprovante para o seu e-mail cadastrado.
          </p>
          <p>
            2. Assim que o pagamento for compensado, nossa equipe embalará suas peças com todo o cuidado e emitirá a nota fiscal.
          </p>
          <p>
            3. Você receberá atualizações no seu WhatsApp com o código de rastreamento dos Correios.
          </p>
        </div>

        {/* Action Links */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={`/rastreio?codigo=${orderNumber}`}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-charcoal hover:bg-charcoal-dark text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-soft-sm transition-all"
          >
            <Truck className="w-4 h-4 text-gold-light" />
            <span>Acompanhar Rastreio</span>
          </Link>

          <Link
            href="/"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-paper border border-charcoal/20 hover:border-charcoal/40 text-charcoal text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
          >
            <Home className="w-4 h-4 text-charcoal-muted" />
            <span>Voltar à Página Inicial</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-xs">Carregando confirmação...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
