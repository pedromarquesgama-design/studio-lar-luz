'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import Image from 'next/image';
import { ShieldCheck, Zap, CreditCard, ExternalLink, Check, Copy, AlertCircle } from 'lucide-react';
import { useCartStore } from '@/lib/store/useCartStore';
import { ShopifyRedirectInterstitial } from '@/components/checkout/ShopifyRedirectInterstitial';
import { formatBRL, calculatePixPrice, calculateInstallments, maskCEP, maskCPF } from '@/lib/utils/format';

interface ShopifyRedirectState {
  url: string;
  mode: 'cart' | 'permalink' | 'storefront';
  warning?: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotal, getSubtotal, getDiscountAmount, getItemCount, clearCart } = useCartStore();
  const [shopifyRedirect, setShopifyRedirect] = useState<ShopifyRedirectState | null>(null);
  const [redirectError, setRedirectError] = useState<string | null>(null);

  const total = getTotal();
  const subtotal = getSubtotal();
  const discountAmount = getDiscountAmount();
  const pix = calculatePixPrice(total, 5);
  const installments = calculateInstallments(total, 6);

  // Form states (pré-preenchido com dados de teste — remover antes da produção)
  const [formData, setFormData] = useState({
    name: 'Cliente Teste',
    email: 'teste@studiolarluz.com.br',
    phone: '(11) 98765-4321',
    cpf: '123.456.789-09',
    cep: '01310-100',
    street: 'Av. Paulista',
    number: '1000',
    complement: 'Apto 42',
    neighborhood: 'Bela Vista',
    city: 'São Paulo',
    state: 'SP',
  });

  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card' | 'shopify'>('pix');
  const [selectedInstallment, setSelectedInstallment] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedPix, setCopiedPix] = useState(false);

  // Auto-fill address by CEP
  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = maskCEP(e.target.value);
    setFormData((prev) => ({ ...prev, cep: value }));

    const raw = value.replace(/\D/g, '');
    if (raw.length === 8) {
      // Simulate ViaCEP lookup
      setTimeout(() => {
        setFormData((prev) => ({
          ...prev,
          street: 'Alameda dos Jacarandás',
          neighborhood: 'Jardins',
          city: 'São Paulo',
          state: 'SP',
        }));
      }, 400);
    }
  };

  const handleCopyPix = () => {
    navigator.clipboard.writeText('00020126580014br.gov.bcb.pix0136studiolarluz-pagamento-pix-982045204000053039865405141.555802BR5916STUDIO LAR LUZ6009SAO PAULO62070503***6304ABCD');
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2000);
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setRedirectError(null);

    // Shopify flow: create a checkout session, then show the intermediate
    // notification screen with automatic redirection (order is NOT complete yet).
    if (paymentMethod === 'shopify') {
      setIsProcessing(true);
      try {
        const res = await fetch('/api/checkout/shopify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            lines: items.map((item) => ({
              variantId: item.variantId,
              quantity: item.quantity,
            })),
          }),
        });
        const data = await res.json();
        if (!res.ok || !data.checkoutUrl) {
          throw new Error(data.error || 'Falha ao iniciar o checkout Shopify.');
        }
        // Keep the local cart intact until payment is confirmed on Shopify.
        setShopifyRedirect({
          url: data.checkoutUrl,
          mode: data.mode,
          warning: data.warning,
        });
      } catch (err: any) {
        setRedirectError(err.message || 'Não foi possível iniciar o checkout Shopify. Tente novamente.');
      } finally {
        setIsProcessing(false);
      }
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      clearCart();
      router.push(`/checkout/sucesso?method=${paymentMethod}&total=${total}`);
    }, 1200);
  };

  if (items.length === 0) {
    return (
      <div className="bg-cream-100 min-h-screen py-20">
        <Script src="https://cdn.shopify.com/storefront/web-components.js" strategy="lazyOnload" />
        <shopify-store store-domain="qt5aaq-1s.myshopify.com" country="BR" language="pt" />
        <div className="max-w-xl mx-auto px-4 text-center">
          <h1 className="text-2xl font-serif font-bold text-charcoal">Seu carrinho está vazio</h1>
          <p className="text-sm text-charcoal-muted mt-2">Adicione produtos antes de prosseguir para o checkout.</p>
        </div>
      </div>
    );
  }

  // Intermediate notification screen: shown after the form is submitted with
  // the Shopify method, before the automatic redirect to hosted checkout.
  if (shopifyRedirect) {
    return (
      <>
        <Script src="https://cdn.shopify.com/storefront/web-components.js" strategy="lazyOnload" />
        <shopify-store store-domain="qt5aaq-1s.myshopify.com" country="BR" language="pt" />
        <ShopifyRedirectInterstitial
          checkoutUrl={shopifyRedirect.url}
          customerEmail={formData.email}
          itemCount={getItemCount()}
          totalFormatted={formatBRL(total)}
          mode={shopifyRedirect.mode}
          warning={shopifyRedirect.warning}
          delaySeconds={5}
          onCancel={() => setShopifyRedirect(null)}
        />
      </>
    );
  }

  return (
    <div className="bg-cream-100 min-h-screen py-10">
      <Script src="https://cdn.shopify.com/storefront/web-components.js" strategy="lazyOnload" />
      <shopify-store store-domain="qt5aaq-1s.myshopify.com" country="BR" language="pt" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-charcoal/10">
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif text-charcoal tracking-tight font-normal">
              Finalização de Compra Segura
            </h1>
            <p className="text-xs text-charcoal-muted mt-1">
              Ambiente protegido e criptografado SSL 256 bits.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-olive font-semibold bg-olive/10 px-3 py-1.5 rounded-full">
            <ShieldCheck className="w-4 h-4 text-olive" />
            <span>Compra 100% Garantida</span>
          </div>
        </div>

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Customer & Delivery Info + Payment */}
          <div className="lg:col-span-7 space-y-8">
            {/* Section 1: Customer Info */}
            <div className="bg-cream-50 p-6 rounded-2xl border border-charcoal/10 shadow-soft-sm space-y-4">
              <h2 className="text-base font-serif font-bold text-charcoal tracking-wide flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-terracotta text-white text-xs flex items-center justify-center font-sans">
                  1
                </span>
                <span>Dados Pessoais & Contato</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    Nome Completo *
                  </label>
                  <input
                    type="text"

                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="ex: Mariana Guimarães"
                    className="w-full text-xs px-3.5 py-3 rounded-lg border border-charcoal/20 bg-white text-charcoal focus:outline-none focus:border-terracotta"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    E-mail (para confirmação e rastreio) *
                  </label>
                  <input
                    type="email"

                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="mariana@email.com"
                    className="w-full text-xs px-3.5 py-3 rounded-lg border border-charcoal/20 bg-white text-charcoal focus:outline-none focus:border-terracotta"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    Telefone WhatsApp *
                  </label>
                  <input
                    type="tel"

                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(11) 98765-4321"
                    className="w-full text-xs px-3.5 py-3 rounded-lg border border-charcoal/20 bg-white text-charcoal focus:outline-none focus:border-terracotta"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    CPF (necessário para emissão de nota fiscal) *
                  </label>
                  <input
                    type="text"

                    maxLength={14}
                    value={formData.cpf}
                    onChange={(e) => setFormData({ ...formData, cpf: maskCPF(e.target.value) })}
                    placeholder="000.000.000-00"
                    className="w-full text-xs px-3.5 py-3 rounded-lg border border-charcoal/20 bg-white text-charcoal focus:outline-none focus:border-terracotta"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Shipping Address */}
            <div className="bg-cream-50 p-6 rounded-2xl border border-charcoal/10 shadow-soft-sm space-y-4">
              <h2 className="text-base font-serif font-bold text-charcoal tracking-wide flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-terracotta text-white text-xs flex items-center justify-center font-sans">
                  2
                </span>
                <span>Endereço de Entrega</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">CEP *</label>
                  <input
                    type="text"

                    maxLength={9}
                    value={formData.cep}
                    onChange={handleCepChange}
                    placeholder="00000-000"
                    className="w-full text-xs px-3.5 py-3 rounded-lg border border-charcoal/20 bg-white text-charcoal focus:outline-none focus:border-terracotta"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-charcoal mb-1">Logradouro / Rua *</label>
                  <input
                    type="text"

                    value={formData.street}
                    onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                    placeholder="Rua, Avenida ou Alameda"
                    className="w-full text-xs px-3.5 py-3 rounded-lg border border-charcoal/20 bg-white text-charcoal focus:outline-none focus:border-terracotta"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">Número *</label>
                  <input
                    type="text"

                    value={formData.number}
                    onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                    placeholder="ex: 120"
                    className="w-full text-xs px-3.5 py-3 rounded-lg border border-charcoal/20 bg-white text-charcoal focus:outline-none focus:border-terracotta"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">Complemento</label>
                  <input
                    type="text"
                    value={formData.complement}
                    onChange={(e) => setFormData({ ...formData, complement: e.target.value })}
                    placeholder="Apto 42, Bloco B"
                    className="w-full text-xs px-3.5 py-3 rounded-lg border border-charcoal/20 bg-white text-charcoal focus:outline-none focus:border-terracotta"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">Bairro *</label>
                  <input
                    type="text"

                    value={formData.neighborhood}
                    onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                    placeholder="Bairro"
                    className="w-full text-xs px-3.5 py-3 rounded-lg border border-charcoal/20 bg-white text-charcoal focus:outline-none focus:border-terracotta"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-charcoal mb-1">Cidade *</label>
                  <input
                    type="text"

                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="São Paulo"
                    className="w-full text-xs px-3.5 py-3 rounded-lg border border-charcoal/20 bg-white text-charcoal focus:outline-none focus:border-terracotta"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">Estado *</label>
                  <input
                    type="text"

                    maxLength={2}
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value.toUpperCase() })}
                    placeholder="SP"
                    className="w-full text-xs px-3.5 py-3 rounded-lg border border-charcoal/20 bg-white text-charcoal focus:outline-none focus:border-terracotta uppercase"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Payment Options (Option A: Dual Flow) */}
            <div className="bg-cream-50 p-6 rounded-2xl border border-charcoal/10 shadow-soft-sm space-y-4">
              <h2 className="text-base font-serif font-bold text-charcoal tracking-wide flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-terracotta text-white text-xs flex items-center justify-center font-sans">
                  3
                </span>
                <span>Forma de Pagamento</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Method 1: Pix */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('pix')}
                  className={`p-4 rounded-xl border text-left flex flex-col justify-between transition-all ${
                    paymentMethod === 'pix'
                      ? 'border-terracotta bg-cream-50 ring-2 ring-terracotta/20 shadow-soft-sm'
                      : 'border-charcoal/15 bg-white hover:border-charcoal/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Zap className="w-5 h-5 text-gold" />
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-olive text-white">
                      5% OFF
                    </span>
                  </div>
                  <div className="mt-3">
                    <p className="text-sm font-bold text-charcoal">Pix Instantâneo</p>
                    <p className="text-[11px] text-olive font-semibold mt-0.5">
                      {pix.formattedPrice}
                    </p>
                  </div>
                </button>

                {/* Method 2: Credit Card */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-xl border text-left flex flex-col justify-between transition-all ${
                    paymentMethod === 'card'
                      ? 'border-terracotta bg-cream-50 ring-2 ring-terracotta/20 shadow-soft-sm'
                      : 'border-charcoal/15 bg-white hover:border-charcoal/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <CreditCard className="w-5 h-5 text-charcoal" />
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-paper text-charcoal-muted">
                      Até 6x
                    </span>
                  </div>
                  <div className="mt-3">
                    <p className="text-sm font-bold text-charcoal">Cartão de Crédito</p>
                    <p className="text-[11px] text-charcoal-muted mt-0.5">Sem juros</p>
                  </div>
                </button>

                {/* Method 3: Shopify Hosted Checkout */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('shopify')}
                  className={`p-4 rounded-xl border text-left flex flex-col justify-between transition-all ${
                    paymentMethod === 'shopify'
                      ? 'border-terracotta bg-cream-50 ring-2 ring-terracotta/20 shadow-soft-sm'
                      : 'border-charcoal/15 bg-white hover:border-charcoal/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <ExternalLink className="w-5 h-5 text-charcoal-muted" />
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-paper text-charcoal-muted">
                      Shopify
                    </span>
                  </div>
                  <div className="mt-3">
                    <p className="text-sm font-bold text-charcoal">Shopify Checkout</p>
                    <p className="text-[11px] text-charcoal-muted mt-0.5">Apple/Google Pay</p>
                  </div>
                </button>
              </div>

              {/* Conditional Payment Content */}
              {paymentMethod === 'pix' && (
                <div className="p-4 rounded-xl bg-paper-light border border-charcoal/10 space-y-3 animate-fade-in">
                  <div className="flex items-center gap-2 text-xs font-semibold text-olive">
                    <Zap className="w-4 h-4 text-gold fill-gold" />
                    <span>Desconto de 5% aplicado! Valor com Pix: {pix.formattedPrice}</span>
                  </div>
                  <p className="text-xs text-charcoal-muted leading-relaxed">
                    Ao clicar em finalizar pedido, o código Pix Copia e Cola e o QR Code oficial serão gerados com compensação instantânea em segundos.
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={handleCopyPix}
                      className="px-3.5 py-2 rounded-lg bg-cream-50 border border-charcoal/20 text-xs font-semibold text-charcoal hover:bg-charcoal hover:text-white transition-all flex items-center gap-1.5"
                    >
                      {copiedPix ? <Check className="w-3.5 h-3.5 text-olive" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedPix ? 'Chave Copiada!' : 'Copiar Código Pix Simulado'}</span>
                    </button>
                  </div>
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="space-y-4 pt-2 animate-fade-in">
                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1">Número do Cartão *</label>
                    <input
                      type="text"
                      placeholder="0000 0000 0000 0000"
                      maxLength={19}
                      className="w-full text-xs px-3.5 py-3 rounded-lg border border-charcoal/20 bg-white text-charcoal focus:outline-none focus:border-terracotta"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1">Validade *</label>
                      <input
                        type="text"
                        placeholder="MM/AA"
                        maxLength={5}
                        className="w-full text-xs px-3.5 py-3 rounded-lg border border-charcoal/20 bg-white text-charcoal focus:outline-none focus:border-terracotta"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1">CVV *</label>
                      <input
                        type="text"
                        placeholder="123"
                        maxLength={4}
                        className="w-full text-xs px-3.5 py-3 rounded-lg border border-charcoal/20 bg-white text-charcoal focus:outline-none focus:border-terracotta"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1">Parcelamento *</label>
                    <select
                      value={selectedInstallment}
                      onChange={(e) => setSelectedInstallment(Number(e.target.value))}
                      className="w-full text-xs px-3.5 py-3 rounded-lg border border-charcoal/20 bg-white text-charcoal focus:outline-none focus:border-terracotta"
                    >
                      <option value={1}>1x de {formatBRL(total)} sem juros</option>
                      <option value={2}>2x de {formatBRL(total / 2)} sem juros</option>
                      <option value={3}>3x de {formatBRL(total / 3)} sem juros</option>
                      <option value={4}>4x de {formatBRL(total / 4)} sem juros</option>
                      <option value={5}>5x de {formatBRL(total / 5)} sem juros</option>
                      <option value={6}>6x de {formatBRL(total / 6)} sem juros</option>
                    </select>
                  </div>
                </div>
              )}

              {paymentMethod === 'shopify' && (
                <div className="p-4 rounded-xl bg-paper-light border border-charcoal/10 text-xs text-charcoal-muted leading-relaxed space-y-2 animate-fade-in">
                  <div className="flex items-center gap-1.5 font-bold text-charcoal">
                    <ExternalLink className="w-4 h-4 text-terracotta" />
                    <span>Redirecionamento para o Checkout Seguro Shopify</span>
                  </div>
                  <p>
                    Você será direcionado para o gateway internacional da Shopify para concluir com Apple Pay, Google Pay ou cartão salvo.
                  </p>
                  {redirectError && (
                    <p className="flex items-start gap-1.5 text-terracotta font-semibold">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{redirectError}</span>
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Order Summary & Confirmation Button */}
          <div className="lg:col-span-5">
            <div className="bg-cream-50 p-6 rounded-2xl border border-charcoal/10 shadow-soft-sm space-y-6 sticky top-28">
              <h2 className="text-base font-serif font-bold text-charcoal tracking-wide pb-3 border-b border-charcoal/10">
                Itens no Pedido ({items.length})
              </h2>

              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-paper shrink-0">
                      <Image src={item.image} alt={item.title} fill sizes="48px" className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-semibold text-charcoal truncate">{item.title}</h4>
                      <p className="text-[11px] text-charcoal-muted">
                        Qtd: {item.quantity} • {formatBRL(item.price)}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-charcoal">
                      {formatBRL(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Details */}
              <div className="pt-4 border-t border-charcoal/10 space-y-2 text-xs text-charcoal-muted">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-charcoal font-medium">{formatBRL(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-olive-dark font-medium">
                    <span>Desconto Cupom</span>
                    <span>- {formatBRL(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Frete Brasil</span>
                  <span className="text-olive font-semibold">Grátis</span>
                </div>

                {paymentMethod === 'pix' && (
                  <div className="flex justify-between text-olive font-semibold pt-1">
                    <span>Desconto Pix (5%)</span>
                    <span>- {pix.formattedSavings}</span>
                  </div>
                )}

                <div className="flex justify-between text-base font-bold text-charcoal pt-3 border-t border-charcoal/10">
                  <span>Total a Pagar</span>
                  <span>{paymentMethod === 'pix' ? pix.formattedPrice : formatBRL(total)}</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 rounded-full bg-terracotta hover:bg-terracotta-hover active:bg-terracotta-active text-white text-xs font-bold uppercase tracking-wider shadow-soft-md hover:shadow-soft-lg transition-all flex items-center justify-center gap-2 group disabled:opacity-70"
              >
                {isProcessing ? (
                  <span>Processando Pedido...</span>
                ) : (
                  <span>
                    {paymentMethod === 'pix'
                      ? `Pagar com Pix • ${pix.formattedPrice}`
                      : paymentMethod === 'shopify'
                      ? 'Ir para o Checkout Shopify'
                      : `Confirmar Pedido • ${formatBRL(total)}`}
                  </span>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-charcoal-muted">
                <ShieldCheck className="w-3.5 h-3.5 text-olive" />
                <span>Seus dados estão protegidos por criptografia de ponta a ponta</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
