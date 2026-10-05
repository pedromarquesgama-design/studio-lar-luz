'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Truck, Search, CheckCircle2, Clock, MapPin, ExternalLink, MessageCircle } from 'lucide-react';
import { OrderTrackingResult } from '@/lib/commerce/types';
import { getCommerceProvider } from '@/lib/commerce/provider';
import { formatDateBR } from '@/lib/utils/format';

function TrackingContent() {
  const searchParams = useSearchParams();
  const initialCode = searchParams.get('codigo') || '';

  const [orderNumber, setOrderNumber] = useState(initialCode);
  const [emailOrCpf, setEmailOrCpf] = useState('');
  const [loading, setLoading] = useState(false);
  const [trackingResult, setTrackingResult] = useState<OrderTrackingResult | null>(null);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (initialCode) {
      handleSearch(initialCode);
    }
  }, [initialCode]);

  const handleSearch = async (codeToSearch?: string) => {
    const code = codeToSearch || orderNumber;
    if (!code) return;

    setLoading(true);
    setSearched(true);

    try {
      const provider = getCommerceProvider();
      const res = await provider.trackOrder(code, emailOrCpf);
      setTrackingResult(res);
    } catch (err) {
      console.error(err);
      setTrackingResult(null);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <div className="bg-cream-100 min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="w-12 h-12 rounded-full bg-olive/15 text-olive flex items-center justify-center mx-auto mb-3 shadow-soft-sm">
            <Truck className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-serif text-charcoal font-normal tracking-tight">
            Rastreamento de Pedido
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-muted mt-2">
            Acompanhe a entrega das suas peças Studio Lar & Luz em tempo real.
          </p>
        </div>

        {/* Search Card */}
        <div className="bg-cream-50 p-6 sm:p-8 rounded-2xl border border-charcoal/10 shadow-soft-sm">
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">
                  Número do Pedido *
                </label>
                <input
                  type="text"
                  required
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  placeholder="ex: #LL1042"
                  className="w-full text-xs px-3.5 py-3 rounded-lg border border-charcoal/20 bg-white text-charcoal focus:outline-none focus:border-terracotta"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">
                  E-mail ou CPF do comprador
                </label>
                <input
                  type="text"
                  value={emailOrCpf}
                  onChange={(e) => setEmailOrCpf(e.target.value)}
                  placeholder="mariana@email.com"
                  className="w-full text-xs px-3.5 py-3 rounded-lg border border-charcoal/20 bg-white text-charcoal focus:outline-none focus:border-terracotta"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-full bg-terracotta hover:bg-terracotta-hover active:bg-terracotta-active text-white text-xs font-bold uppercase tracking-wider shadow-soft-sm transition-all flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>{loading ? 'Consultando Transportadora...' : 'Rastrear Envio'}</span>
            </button>
          </form>
        </div>

        {/* Tracking Results Timeline */}
        {searched && (
          <div className="mt-8 animate-fade-in">
            {trackingResult ? (
              <div className="bg-cream-50 rounded-2xl border border-charcoal/10 shadow-soft-sm p-6 sm:p-8 space-y-6">
                {/* Status Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-charcoal/10 gap-3">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-olive font-bold">
                      {trackingResult.carrierName} • Código: {trackingResult.trackingCode}
                    </span>
                    <h2 className="text-xl font-serif font-bold text-charcoal mt-1">
                      {trackingResult.orderNumber}
                    </h2>
                    <p className="text-xs text-charcoal-muted mt-0.5">
                      Destinatário: {trackingResult.customerName}
                    </p>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-olive/15 text-olive-dark text-xs font-bold">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{trackingResult.statusDescription}</span>
                    </span>
                    <p className="text-xs text-charcoal-muted mt-1.5">
                      Previsão de Entrega: <strong>{formatDateBR(trackingResult.estimatedDeliveryDate)}</strong>
                    </p>
                  </div>
                </div>

                {/* Timeline */}
                <div className="space-y-6 pt-2 pl-2">
                  {trackingResult.timeline.map((item, idx) => (
                    <div key={idx} className="relative flex items-start gap-4">
                      {/* Timeline line */}
                      {idx < trackingResult.timeline.length - 1 && (
                        <div className="absolute left-2.5 top-6 bottom-0 w-0.5 bg-charcoal/15 -z-0" />
                      )}

                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 z-10 ${
                          item.done
                            ? 'bg-olive text-white'
                            : 'bg-paper border-2 border-charcoal/30 text-transparent'
                        }`}
                      >
                        {item.done && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>

                      <div className="flex-1 pb-2">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-xs font-bold text-charcoal">{item.description}</p>
                          <span className="text-[11px] text-charcoal-muted shrink-0">
                            {formatDateBR(item.date)} às {item.time}
                          </span>
                        </div>
                        <p className="text-xs text-charcoal-muted flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-terracotta" />
                          <span>{item.location}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tracking External Link & WhatsApp Notice */}
                <div className="pt-6 border-t border-charcoal/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <a
                    href={trackingResult.trackingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-terracotta hover:underline font-semibold flex items-center gap-1.5"
                  >
                    <span>Ver no site oficial dos Correios</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <div className="flex items-center gap-1.5 text-charcoal-muted">
                    <MessageCircle className="w-3.5 h-3.5 text-olive" />
                    <span>Notificações automáticas ativadas no WhatsApp</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-cream-50 rounded-2xl border border-charcoal/10 p-8 text-center text-charcoal-muted">
                <p className="text-sm font-semibold text-charcoal">Nenhum pedido localizado com estes dados.</p>
                <p className="text-xs mt-1">
                  Dica: Para demonstração interativa, experimente consultar o pedido <strong>#LL1042</strong>.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function OrderTrackingPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-xs">Carregando rastreio...</div>}>
      <TrackingContent />
    </Suspense>
  );
}
