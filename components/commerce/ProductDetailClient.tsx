'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import {
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
  Zap,
  Plus,
  Minus,
  Check,
  Box,
  Heart,
  ChevronDown,
} from 'lucide-react';
import { Product } from '@/lib/commerce/types';
import { formatBRL, calculateInstallments, calculatePixPrice, maskCEP } from '@/lib/utils/format';
import { useCartStore } from '@/lib/store/useCartStore';
import { useWishlistStore } from '@/lib/store/useWishlistStore';

const TurntableViewer = dynamic(
  () => import('../3d/TurntableViewer').then((m) => m.TurntableViewer),
  { ssr: false }
);

interface ProductDetailClientProps {
  product: Product;
}

export const ProductDetailClient: React.FC<ProductDetailClientProps> = ({ product }) => {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [is3DMode, setIs3DMode] = useState(false);
  const [cep, setCep] = useState('');
  const [cepResult, setCepResult] = useState<{ sedex: string; pac: string } | null>(null);
  const [isCalculatingCep, setIsCalculatingCep] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string>('specs');

  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggleWishlist);
  const isInWishlist = useWishlistStore((s) => s.isInWishlist(product.id));

  const currentVariant = product.variants[selectedVariantIndex] || product.variants[0];
  const price = currentVariant.price || product.price;
  const compareAtPrice = currentVariant.compareAtPrice || product.compareAtPrice;
  const installments = calculateInstallments(price, 6);
  const pix = calculatePixPrice(price, 5);

  const images = product.images.length > 0 ? product.images : [product.featuredImage];
  const activeImage = currentVariant.image && activeImageIndex === 0 ? currentVariant.image : images[activeImageIndex] || product.featuredImage;

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      variantId: currentVariant.id,
      title: product.title,
      variantTitle: currentVariant.title,
      handle: product.handle,
      price: price,
      quantity: quantity,
      image: activeImage,
    });
  };

  const handleCalculateCep = (e: React.FormEvent) => {
    e.preventDefault();
    if (cep.length < 8) return;
    setIsCalculatingCep(true);
    setTimeout(() => {
      setIsCalculatingCep(false);
      setCepResult({
        sedex: 'R$ 18,90 (Chega em 2 a 3 dias úteis)',
        pac: 'Grátis para compras acima de R$ 199 (Chega em 5 a 7 dias úteis)',
      });
    }, 600);
  };

  return (
    <div className="space-y-16">
      {/* Top 2-Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Left: Product Media Gallery & 3D Viewer */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-paper shadow-soft-sm border border-charcoal/10">
            {is3DMode && product.model3d ? (
              <TurntableViewer
                modelType={product.model3d.type as any}
                primaryColor={product.model3d.color}
                fallbackImage={activeImage}
                title={product.title}
              />
            ) : (
              <Image
                src={activeImage}
                alt={product.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover object-center"
              />
            )}

            {/* 3D Mode Toggle Button */}
            {product.model3d && (
              <button
                onClick={() => setIs3DMode(!is3DMode)}
                className="absolute bottom-4 right-4 z-10 px-4 py-2 rounded-full bg-white/90 hover:bg-white text-charcoal text-xs font-semibold backdrop-blur-md shadow-soft-md border border-charcoal/10 flex items-center gap-2 transition-all active:scale-95"
              >
                <Box className="w-4 h-4 text-olive" />
                <span>{is3DMode ? 'Ver Fotos' : 'Ver em 3D 360°'}</span>
              </button>
            )}

            {/* Wishlist Button */}
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`absolute top-4 right-4 z-10 p-2.5 rounded-full backdrop-blur-md transition-all shadow-soft-sm ${
                isInWishlist
                  ? 'bg-terracotta text-white'
                  : 'bg-white/80 text-charcoal hover:bg-white hover:text-terracotta'
              }`}
              aria-label="Favoritar produto"
            >
              <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Thumbnails */}
          {!is3DMode && images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden bg-paper shrink-0 border-2 transition-all ${
                    activeImageIndex === idx
                      ? 'border-terracotta shadow-soft-sm'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt="" fill sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Commercial Information & Buy Box */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs uppercase font-bold tracking-widest text-olive">
                {product.category}
              </span>
              <span className="text-charcoal-muted">•</span>
              {/* Rating */}
              <div className="flex items-center gap-1 text-xs text-charcoal-muted">
                <div className="flex text-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="font-semibold text-charcoal">{product.rating}</span>
                <span>({product.reviewCount} avaliações)</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-serif text-charcoal font-normal tracking-tight leading-snug">
              {product.title}
            </h1>
          </div>

          {/* Price Box */}
          <div className="p-4 rounded-xl bg-paper-light border border-charcoal/10 space-y-2">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-charcoal font-sans">
                {formatBRL(price)}
              </span>
              {compareAtPrice && compareAtPrice > price && (
                <span className="text-base text-charcoal-muted line-through font-light">
                  {formatBRL(compareAtPrice)}
                </span>
              )}
            </div>

            {/* Pix Discount Callout */}
            <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-olive-dark">
              <Zap className="w-4 h-4 text-gold fill-gold" />
              <span>
                {pix.formattedPrice} com 5% de desconto no Pix (Economize {pix.formattedSavings})
              </span>
            </div>

            {/* Installments */}
            <p className="text-xs text-charcoal-muted">
              ou em <strong>{installments.formatted}</strong>
            </p>
          </div>

          {/* Variant Swatches */}
          {product.variants.length > 1 && (
            <div className="space-y-2.5">
              <div className="flex justify-between text-xs">
                <span className="text-charcoal-muted font-medium">Acabamento / Cor:</span>
                <span className="font-bold text-charcoal">{currentVariant.title}</span>
              </div>
              <div className="flex items-center gap-2.5">
                {product.variants.map((v, i) => (
                  <button
                    key={v.id}
                    onClick={() => {
                      setSelectedVariantIndex(i);
                      setActiveImageIndex(0);
                    }}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs transition-all ${
                      selectedVariantIndex === i
                        ? 'border-terracotta bg-cream-50 font-bold text-charcoal shadow-soft-sm'
                        : 'border-charcoal/15 bg-white text-charcoal-muted hover:border-charcoal/30'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                      style={{ backgroundColor: v.colorHex || '#ECE9E3' }}
                    />
                    <span>{v.title}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Real Stock Indicator */}
          {currentVariant.quantityAvailable && currentVariant.quantityAvailable <= 6 && (
            <div className="flex items-center gap-2 text-xs text-terracotta font-semibold">
              <span className="w-2 h-2 rounded-full bg-terracotta animate-ping" />
              <span>Apenas {currentVariant.quantityAvailable} unidades restantes neste lote.</span>
            </div>
          )}

          {/* Quantity & Buy Buttons */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              {/* Quantity Selector */}
              <div className="flex items-center border border-charcoal/20 rounded-full bg-white px-2 py-1 shadow-soft-sm">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 text-charcoal-muted hover:text-charcoal transition-colors"
                  aria-label="Diminuir"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-3 text-sm font-bold text-charcoal">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 text-charcoal-muted hover:text-charcoal transition-colors"
                  aria-label="Aumentar"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Main CTA: Add to Bag */}
              <button
                onClick={handleAddToCart}
                className="flex-1 py-4 px-6 rounded-full bg-terracotta hover:bg-terracotta-hover active:bg-terracotta-active text-white text-sm font-bold uppercase tracking-wider shadow-soft-md hover:shadow-soft-lg transition-all flex items-center justify-center gap-2 group"
              >
                <span>Adicionar à Sacola</span>
              </button>
            </div>
          </div>

          {/* CEP Calculator */}
          <div className="pt-4 border-t border-charcoal/10 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-charcoal">
              <Truck className="w-4 h-4 text-terracotta" />
              <span>Calcular Prazo e Frete</span>
            </div>
            <form onSubmit={handleCalculateCep} className="flex gap-2">
              <input
                type="text"
                value={cep}
                onChange={(e) => setCep(maskCEP(e.target.value))}
                placeholder="00000-000"
                maxLength={9}
                className="w-36 text-xs px-3.5 py-2.5 rounded-lg border border-charcoal/20 bg-white text-charcoal focus:outline-none focus:border-terracotta"
              />
              <button
                type="submit"
                disabled={isCalculatingCep}
                className="px-4 py-2.5 rounded-lg bg-paper border border-charcoal/20 text-xs font-semibold text-charcoal hover:bg-charcoal hover:text-white transition-colors"
              >
                {isCalculatingCep ? 'Calculando...' : 'Calcular'}
              </button>
            </form>
            {cepResult && (
              <div className="p-3 rounded-lg bg-cream-50 border border-charcoal/10 text-xs space-y-1.5 animate-fade-in">
                <p>
                  <strong>Sedex:</strong> {cepResult.sedex}
                </p>
                <p>
                  <strong>PAC:</strong> {cepResult.pac}
                </p>
              </div>
            )}
          </div>

          {/* Trust Guarantees */}
          <div className="grid grid-cols-2 gap-3 pt-3 text-xs text-charcoal-muted">
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-olive shrink-0" />
              <span>Troca grátis em até 30 dias</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-olive shrink-0" />
              <span>Garantia de 1 ano</span>
            </div>
          </div>

          {/* Accordion Specs */}
          <div className="pt-4 border-t border-charcoal/10 divide-y divide-charcoal/10">
            {/* Description */}
            <div className="py-3">
              <button
                onClick={() => setOpenAccordion(openAccordion === 'desc' ? '' : 'desc')}
                className="w-full flex items-center justify-between text-left text-sm font-semibold text-charcoal"
              >
                <span>História & Descrição da Peça</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'desc' ? 'rotate-180' : ''}`} />
              </button>
              {openAccordion === 'desc' && (
                <div className="pt-3 text-xs sm:text-sm text-charcoal-muted leading-relaxed space-y-2 animate-fade-in">
                  <p>{product.description}</p>
                </div>
              )}
            </div>

            {/* Specifications & Materials */}
            <div className="py-3">
              <button
                onClick={() => setOpenAccordion(openAccordion === 'specs' ? '' : 'specs')}
                className="w-full flex items-center justify-between text-left text-sm font-semibold text-charcoal"
              >
                <span>Materiais & Dimensões</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'specs' ? 'rotate-180' : ''}`} />
              </button>
              {openAccordion === 'specs' && (
                <div className="pt-3 text-xs sm:text-sm text-charcoal-muted leading-relaxed space-y-2 animate-fade-in">
                  {product.dimensions && (
                    <p>
                      <strong>Dimensões:</strong> {product.dimensions}
                    </p>
                  )}
                  {product.materials && (
                    <div>
                      <strong>Materiais Nobres:</strong>
                      <ul className="list-disc pl-5 mt-1 space-y-0.5">
                        {product.materials.map((m, i) => (
                          <li key={i}>{m}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Care instructions */}
            <div className="py-3">
              <button
                onClick={() => setOpenAccordion(openAccordion === 'care' ? '' : 'care')}
                className="w-full flex items-center justify-between text-left text-sm font-semibold text-charcoal"
              >
                <span>Instruções de Cuidado & Limpeza</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'care' ? 'rotate-180' : ''}`} />
              </button>
              {openAccordion === 'care' && (
                <div className="pt-3 text-xs sm:text-sm text-charcoal-muted leading-relaxed space-y-1.5 animate-fade-in">
                  {product.careInstructions?.map((c, i) => (
                    <p key={i}>• {c}</p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="pt-12 border-t border-charcoal/10">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-baseline justify-between mb-8 pb-4 border-b border-charcoal/10 gap-2">
            <div>
              <h2 className="text-2xl font-serif font-normal text-charcoal">
                Avaliações de Clientes Verificados
              </h2>
              <p className="text-xs text-charcoal-muted mt-1">
                Opiniões reais de quem comprou e usa no dia a dia.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex text-gold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-sm font-bold text-charcoal">
                {product.rating} de 5.0
              </span>
            </div>
          </div>

          <div className="space-y-6">
            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-5 rounded-xl bg-paper-light border border-charcoal/10 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-charcoal">{rev.author}</span>
                      {rev.verifiedPurchase && (
                        <span className="flex items-center gap-1 text-[11px] text-olive font-semibold px-2 py-0.5 rounded-full bg-olive/10">
                          <Check className="w-3 h-3" />
                          Compra Verificada
                        </span>
                      )}
                    </div>
                    {rev.location && (
                      <span className="text-xs text-charcoal-muted">{rev.location}</span>
                    )}
                  </div>
                  <div className="flex text-gold">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <h4 className="text-sm font-semibold text-charcoal">{rev.title}</h4>
                  <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
                    {rev.comment}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-xs text-charcoal-muted">
                Seja a primeira pessoa a avaliar esta peça recém-chegada ao catálogo!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
