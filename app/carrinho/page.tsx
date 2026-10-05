'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Minus, Trash2, ArrowRight, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import { useCartStore } from '@/lib/store/useCartStore';
import { formatBRL, calculatePixPrice } from '@/lib/utils/format';

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeItem,
    getSubtotal,
    getDiscountAmount,
    getTotal,
    isFreeShippingQualified,
    getFreeShippingRemaining,
    getFreeShippingThreshold,
    couponCode,
    applyCoupon,
    removeCoupon,
  } = useCartStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ success: boolean; message: string } | null>(null);

  const total = getTotal();
  const subtotal = getSubtotal();
  const discountAmount = getDiscountAmount();
  const isFreeShipping = isFreeShippingQualified();
  const remainingForFreeShipping = getFreeShippingRemaining();
  const threshold = getFreeShippingThreshold();
  const shippingProgress = Math.min(100, Math.round((total / threshold) * 100));
  const pix = calculatePixPrice(total, 5);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;
    const res = applyCoupon(couponInput);
    setCouponFeedback(res);
  };

  return (
    <div className="bg-cream-100 min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-serif text-charcoal font-normal tracking-tight mb-8">
          Sua Sacola de Compras
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-20 bg-cream-50 rounded-2xl border border-charcoal/10 shadow-soft-sm">
            <p className="text-base text-charcoal-muted mb-4">
              Sua sacola está vazia no momento.
            </p>
            <Link
              href="/colecoes"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-terracotta text-white font-bold text-xs uppercase tracking-wider hover:bg-terracotta-hover transition-colors shadow-soft-sm"
            >
              Explorar Coleções
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Items Column */}
            <div className="lg:col-span-8 space-y-6">
              {/* Free shipping bar */}
              <div className="p-4 rounded-xl bg-olive/10 border border-olive/20 text-xs">
                <div className="flex justify-between items-center mb-1.5 font-medium text-charcoal">
                  {isFreeShipping ? (
                    <span className="text-olive-dark font-semibold flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-gold" />
                      Parabéns! Seu pedido tem Frete Grátis garantido.
                    </span>
                  ) : (
                    <span>
                      Adicione mais <strong>{formatBRL(remainingForFreeShipping)}</strong> para{' '}
                      <strong className="text-terracotta">Frete Grátis</strong>
                    </span>
                  )}
                  <span className="text-charcoal-muted">{shippingProgress}%</span>
                </div>
                <div className="w-full bg-charcoal/10 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 rounded-full ${
                      isFreeShipping ? 'bg-olive' : 'bg-terracotta'
                    }`}
                    style={{ width: `${shippingProgress}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="bg-cream-50 rounded-2xl p-6 border border-charcoal/10 shadow-soft-sm divide-y divide-charcoal/10">
                {items.map((item) => (
                  <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex gap-4 sm:gap-6 items-center">
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-paper shrink-0 border border-charcoal/5">
                      <Image src={item.image} alt={item.title} fill sizes="96px" className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/produtos/${item.handle}`}
                        className="text-base font-medium text-charcoal hover:text-terracotta transition-colors line-clamp-1"
                      >
                        {item.title}
                      </Link>
                      {item.variantTitle && (
                        <p className="text-xs text-charcoal-muted mt-0.5">{item.variantTitle}</p>
                      )}
                      <p className="text-sm font-bold text-charcoal mt-1">{formatBRL(item.price)}</p>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center border border-charcoal/20 rounded-full bg-white px-2 py-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 text-charcoal-muted hover:text-charcoal transition-colors"
                        aria-label="Diminuir"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-bold text-charcoal">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 text-charcoal-muted hover:text-charcoal transition-colors"
                        aria-label="Aumentar"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Total item price */}
                    <div className="text-right hidden sm:block">
                      <span className="text-base font-bold text-charcoal">
                        {formatBRL(item.price * item.quantity)}
                      </span>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-charcoal-muted hover:text-red-600 transition-colors"
                      aria-label="Remover item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary Column */}
            <div className="lg:col-span-4">
              <div className="bg-cream-50 rounded-2xl p-6 border border-charcoal/10 shadow-soft-sm space-y-6 sticky top-28">
                <h2 className="text-lg font-serif font-bold text-charcoal tracking-wide pb-3 border-b border-charcoal/10">
                  Resumo do Pedido
                </h2>

                {/* Coupon */}
                <div>
                  {couponCode ? (
                    <div className="flex items-center justify-between text-xs bg-olive/15 px-3 py-2 rounded-lg text-olive-dark">
                      <span>Cupom <strong>{couponCode}</strong> aplicado!</span>
                      <button onClick={removeCoupon} className="text-xs underline hover:text-red-600">
                        Remover
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        placeholder="Cupom de desconto"
                        className="flex-1 text-xs px-3 py-2.5 rounded-lg border border-charcoal/20 bg-white text-charcoal uppercase focus:outline-none focus:border-terracotta"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2.5 rounded-lg bg-paper border border-charcoal/20 text-xs font-semibold text-charcoal hover:bg-charcoal hover:text-white transition-colors"
                      >
                        Aplicar
                      </button>
                    </form>
                  )}
                  {couponFeedback && !couponCode && (
                    <p className={`text-xs mt-1 ${couponFeedback.success ? 'text-olive' : 'text-red-500'}`}>
                      {couponFeedback.message}
                    </p>
                  )}
                </div>

                {/* Pricing Breakdown */}
                <div className="space-y-2 text-xs text-charcoal-muted">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-charcoal font-medium">{formatBRL(subtotal)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-olive-dark font-medium">
                      <span>Desconto</span>
                      <span>- {formatBRL(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Frete</span>
                    <span className="text-charcoal font-medium">
                      {isFreeShipping ? <strong className="text-olive">Grátis</strong> : 'Calculado no checkout'}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-charcoal pt-3 border-t border-charcoal/10">
                    <span>Total</span>
                    <span>{formatBRL(total)}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-olive font-semibold pt-1">
                    <Zap className="w-4 h-4 text-gold fill-gold" />
                    <span>ou {pix.formattedPrice} à vista no Pix (5% OFF)</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <Link
                  href="/checkout"
                  className="w-full py-4 rounded-full bg-terracotta hover:bg-terracotta-hover active:bg-terracotta-active text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-soft-md hover:shadow-soft-lg transition-all group"
                >
                  <span>Avançar para o Checkout</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <div className="flex items-center justify-center gap-2 text-[11px] text-charcoal-muted">
                  <ShieldCheck className="w-3.5 h-3.5 text-olive" />
                  <span>Ambiente 100% Seguro e Criptografado</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
