'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import { useCartStore } from '@/lib/store/useCartStore';
import { formatBRL, calculatePixPrice } from '@/lib/utils/format';
import { MOCK_PRODUCTS } from '@/lib/commerce/mock-data';

export const CartDrawer: React.FC = () => {
  const {
    isOpen,
    closeCart,
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
    addItem,
  } = useCartStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ success: boolean; message: string } | null>(null);

  if (!isOpen) return null;

  const total = getTotal();
  const subtotal = getSubtotal();
  const discountAmount = getDiscountAmount();
  const isFreeShipping = isFreeShippingQualified();
  const remainingForFreeShipping = getFreeShippingRemaining();
  const threshold = getFreeShippingThreshold();
  const shippingProgress = Math.min(100, Math.round((total / threshold) * 100));

  const pix = calculatePixPrice(total, 5);

  // Cross-sell suggestion: pick first product not currently in cart
  const crossSellProduct = MOCK_PRODUCTS.find(
    (p) => !items.some((i) => i.productId === p.id)
  ) || MOCK_PRODUCTS[2];

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;
    const res = applyCoupon(couponInput);
    setCouponFeedback(res);
  };

  const handleAddCrossSell = () => {
    if (!crossSellProduct) return;
    const firstVariant = crossSellProduct.variants[0];
    addItem({
      productId: crossSellProduct.id,
      variantId: firstVariant.id,
      title: crossSellProduct.title,
      variantTitle: firstVariant.title,
      handle: crossSellProduct.handle,
      price: firstVariant.price,
      quantity: 1,
      image: crossSellProduct.featuredImage,
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-charcoal/50 backdrop-blur-xs transition-opacity animate-fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-cream-50 shadow-soft-lg flex flex-col">
          {/* Header */}
          <div className="px-6 py-5 border-b border-charcoal/10 flex items-center justify-between bg-cream-100">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-serif font-bold text-charcoal tracking-wide">
                Sua Sacola
              </h2>
              <span className="text-xs font-sans px-2 py-0.5 rounded-full bg-paper text-charcoal-muted">
                {items.reduce((s, i) => s + i.quantity, 0)} itens
              </span>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 text-charcoal-muted hover:text-charcoal transition-colors rounded-full hover:bg-paper"
              aria-label="Fechar sacola"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="px-6 py-3 bg-olive/10 border-b border-olive/20 text-xs">
            <div className="flex justify-between items-center mb-1.5 font-medium text-charcoal">
              {isFreeShipping ? (
                <span className="text-olive-dark font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-gold" />
                  Parabéns! Você ganhou Frete Grátis!
                </span>
              ) : (
                <span>
                  Faltam <strong>{formatBRL(remainingForFreeShipping)}</strong> para{' '}
                  <strong className="text-terracotta">Frete Grátis</strong>
                </span>
              )}
              <span className="text-charcoal-muted">{shippingProgress}%</span>
            </div>
            <div className="w-full bg-charcoal/10 rounded-full h-1.5 overflow-hidden">
              <div
                className={`h-full transition-all duration-500 rounded-full ${
                  isFreeShipping ? 'bg-olive' : 'bg-terracotta'
                }`}
                style={{ width: `${shippingProgress}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-charcoal-muted text-sm mb-4">
                  Sua sacola está vazia no momento.
                </p>
                <Link
                  href="/colecoes"
                  onClick={closeCart}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-terracotta text-white font-medium text-sm hover:bg-terracotta-hover transition-colors shadow-soft-sm"
                >
                  Explorar Produtos
                </Link>
              </div>
            ) : (
              <>
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 py-3 border-b border-charcoal/5 items-start"
                  >
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-paper shrink-0">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/produtos/${item.handle}`}
                        onClick={closeCart}
                        className="text-sm font-medium text-charcoal hover:text-terracotta transition-colors line-clamp-1"
                      >
                        {item.title}
                      </Link>
                      {item.variantTitle && (
                        <p className="text-xs text-charcoal-muted mt-0.5">
                          {item.variantTitle}
                        </p>
                      )}
                      <p className="text-sm font-bold text-charcoal mt-1">
                        {formatBRL(item.price)}
                      </p>

                      <div className="flex items-center justify-between mt-2">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-charcoal/20 rounded-md bg-white">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-paper-light text-charcoal-muted hover:text-charcoal transition-colors"
                            aria-label="Diminuir quantidade"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2.5 text-xs font-semibold text-charcoal">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-paper-light text-charcoal-muted hover:text-charcoal transition-colors"
                            aria-label="Aumentar quantidade"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-charcoal-muted hover:text-red-600 transition-colors p-1"
                          aria-label="Remover item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Cross-Sell Recommendation Box */}
                {crossSellProduct && (
                  <div className="mt-4 p-3.5 rounded-xl bg-paper-light border border-charcoal/10">
                    <p className="text-xs uppercase tracking-wider text-charcoal-muted font-bold mb-2">
                      Complete sua casa:
                    </p>
                    <div className="flex items-center justify-between gap-3">
                      <div className="relative w-12 h-12 rounded-md overflow-hidden bg-white shrink-0">
                        <Image
                          src={crossSellProduct.featuredImage}
                          alt={crossSellProduct.title}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-medium text-charcoal truncate">
                          {crossSellProduct.title}
                        </h4>
                        <p className="text-xs font-bold text-terracotta mt-0.5">
                          + {formatBRL(crossSellProduct.price)}
                        </p>
                      </div>
                      <button
                        onClick={handleAddCrossSell}
                        className="px-3 py-1.5 rounded-full bg-cream-50 border border-charcoal/20 text-xs font-semibold text-charcoal hover:bg-terracotta hover:text-white hover:border-terracotta transition-all shrink-0"
                      >
                        + Adicionar
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer & Checkout Call-to-Actions */}
          {items.length > 0 && (
            <div className="p-6 bg-cream-100 border-t border-charcoal/10 space-y-4">
              {/* Cupom Code Input */}
              <div>
                {couponCode ? (
                  <div className="flex items-center justify-between text-xs bg-olive/15 px-3 py-2 rounded-lg text-olive-dark">
                    <span>Cupom <strong>{couponCode}</strong> aplicado!</span>
                    <button
                      onClick={removeCoupon}
                      className="text-xs underline hover:text-red-600 ml-2"
                    >
                      Remover
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Cupom de desconto (ex: LAR10)"
                      className="flex-1 text-xs px-3 py-2 rounded-lg border border-charcoal/20 bg-white text-charcoal uppercase focus:outline-none focus:border-terracotta"
                    />
                    <button
                      type="submit"
                      className="px-3 py-2 rounded-lg bg-paper border border-charcoal/20 text-xs font-semibold text-charcoal hover:bg-charcoal hover:text-white transition-colors"
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

              {/* Subtotal Breakdown */}
              <div className="space-y-1.5 text-xs text-charcoal-muted">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-charcoal font-medium">{formatBRL(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-olive-dark font-medium">
                    <span>Desconto do Cupom</span>
                    <span>- {formatBRL(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Frete</span>
                  <span className="text-charcoal font-medium">
                    {isFreeShipping ? (
                      <span className="text-olive-dark font-semibold">Grátis</span>
                    ) : (
                      'Calculado no checkout'
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-charcoal pt-2 border-t border-charcoal/10">
                  <span>Total</span>
                  <span>{formatBRL(total)}</span>
                </div>

                {/* Pix Discount Notice */}
                <div className="flex items-center gap-1.5 text-xs text-olive font-medium pt-1">
                  <Zap className="w-3.5 h-3.5 shrink-0 text-gold" />
                  <span>
                    ou <strong>{pix.formattedPrice}</strong> no Pix (5% OFF)
                  </span>
                </div>
              </div>

              {/* Primary High-Contrast Checkout Button */}
              <div className="space-y-2 pt-1">
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="w-full py-3.5 rounded-full bg-terracotta hover:bg-terracotta-hover active:bg-terracotta-active text-white text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-soft-md transition-all hover:shadow-soft-lg group"
                >
                  <span>Finalizar Compra</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <button
                  onClick={closeCart}
                  className="w-full py-2.5 text-center text-xs text-charcoal-muted hover:text-charcoal transition-colors underline"
                >
                  Continuar Comprando
                </button>
              </div>

              {/* Trust Badge Guarantee */}
              <div className="flex items-center justify-center gap-2 text-[11px] text-charcoal-muted pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-olive" />
                <span>Compra Segura com Garantia Studio Lar & Luz</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
