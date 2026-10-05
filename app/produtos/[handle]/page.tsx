import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getCommerceProvider } from '@/lib/commerce/provider';
import { ProductDetailClient } from '@/components/commerce/ProductDetailClient';
import { ProductJsonLd, FaqJsonLd } from '@/components/seo/JsonLd';
import { ChevronRight } from 'lucide-react';

interface ProductPageProps {
  params: Promise<{ handle: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { handle } = await params;
  const provider = getCommerceProvider();
  const product = await provider.getProductByHandle(handle);

  if (!product) {
    return { title: 'Produto não encontrado' };
  }

  return {
    title: `${product.title} — Studio Lar & Luz`,
    description: product.shortDescription,
    openGraph: {
      title: `${product.title} — Studio Lar & Luz`,
      description: product.shortDescription,
      images: [
        {
          url: product.featuredImage,
          width: 800,
          height: 800,
          alt: product.title,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { handle } = await params;
  const provider = getCommerceProvider();
  const product = await provider.getProductByHandle(handle);

  if (!product) {
    notFound();
  }

  const productUrl = `https://studiolarluz.com.br/produtos/${product.handle}`;

  const faqs = [
    {
      question: `Qual o material e acabamento do ${product.title}?`,
      answer: product.materials?.join(', ') || 'Peça artesanal produzida com matérias-primas de alta durabilidade e acabamento atóxico.',
    },
    {
      question: 'Qual o prazo de entrega e frete?',
      answer: 'O frete é grátis para todo o Brasil em compras acima de R$ 199. Para as regiões Sul e Sudeste, a entrega é estimada em 2 a 5 dias úteis.',
    },
    {
      question: 'Como funciona a política de trocas?',
      answer: 'Você tem até 30 dias corridos após o recebimento para solicitar troca ou devolução gratuita, em conformidade com o Código de Defesa do Consumidor.',
    },
  ];

  return (
    <div className="bg-cream-100 min-h-screen py-8 md:py-12">
      {/* Structured Data for SEO & AI Answer Engines */}
      <ProductJsonLd product={product} url={productUrl} />
      <FaqJsonLd faqs={faqs} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-charcoal-muted mb-8 overflow-x-auto whitespace-nowrap pb-2">
          <Link href="/" className="hover:text-terracotta transition-colors">
            Início
          </Link>
          <ChevronRight className="w-3 h-3 opacity-60 shrink-0" />
          <Link href="/colecoes" className="hover:text-terracotta transition-colors">
            Coleções
          </Link>
          <ChevronRight className="w-3 h-3 opacity-60 shrink-0" />
          <Link
            href={`/colecoes/${product.category}`}
            className="hover:text-terracotta transition-colors capitalize"
          >
            {product.category}
          </Link>
          <ChevronRight className="w-3 h-3 opacity-60 shrink-0" />
          <span className="text-charcoal font-medium truncate max-w-xs">{product.title}</span>
        </nav>

        {/* Product Component */}
        <ProductDetailClient product={product} />
      </div>
    </div>
  );
}
