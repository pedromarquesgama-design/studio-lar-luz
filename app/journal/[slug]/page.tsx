import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { ARTICLES } from '../page';
import { ChevronRight, Calendar, Clock, ArrowLeft } from 'lucide-react';
import { MOCK_PRODUCTS } from '@/lib/commerce/mock-data';
import { ProductCard } from '@/components/commerce/ProductCard';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) return { title: 'Artigo não encontrado' };

  return {
    title: `${article.title} — Journal Studio Lar & Luz`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [{ url: article.image }],
    },
  };
}

export default async function ArticleDetailPage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  // Related shoppable product
  const relatedProduct = MOCK_PRODUCTS[0];

  return (
    <article className="bg-cream-100 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-charcoal-muted mb-8">
          <Link href="/" className="hover:text-terracotta">
            Início
          </Link>
          <ChevronRight className="w-3 h-3 opacity-60" />
          <Link href="/journal" className="hover:text-terracotta">
            Journal
          </Link>
          <ChevronRight className="w-3 h-3 opacity-60" />
          <span className="text-charcoal font-medium truncate max-w-xs">{article.category}</span>
        </nav>

        {/* Article Header */}
        <header className="space-y-4 mb-8">
          <span className="text-xs uppercase font-bold tracking-widest text-terracotta">
            {article.category}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-charcoal font-normal tracking-tight leading-tight">
            {article.title}
          </h1>
          <div className="flex items-center gap-4 text-xs text-charcoal-muted pt-2 border-b border-charcoal/10 pb-6">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>{article.date}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>{article.readTime}</span>
            </span>
          </div>
        </header>

        {/* Featured Image */}
        <div className="relative aspect-16/9 rounded-3xl overflow-hidden mb-10 shadow-soft-md bg-paper">
          <Image
            src={article.image}
            alt={article.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 800px"
            className="object-cover"
          />
        </div>

        {/* Article Body Content */}
        <div className="prose prose-stone max-w-none text-charcoal-muted text-sm sm:text-base leading-relaxed space-y-6">
          <p className="text-lg text-charcoal font-serif italic leading-relaxed">
            &ldquo;Cuidar de uma panela ou de uma louça artesanal não é apenas sobre manutenção técnica — é um ritual de carinho pela história que você está construindo ao redor da mesa.&rdquo;
          </p>

          <p>
            O ferro fundido esmaltado é, há séculos, o coração das cozinhas que prezam pelo sabor e pelo tempo. Diferente de panelas convencionais finas, a massa densa do ferro distribui a energia térmica com absoluta uniformidade por todas as paredes, permitindo que carnes, caldos e pães desenvolvam caramelizações profundas sem queimar o fundo.
          </p>

          <h2 className="text-2xl font-serif font-medium text-charcoal pt-4">
            1. O Segredo do Aquecimento Gradual
          </h2>
          <p>
            Mesmo sendo extremamente robusto, o ferro fundido com cobertura esmaltada gosta de gentileza. Sempre inicie o fogo em intensidade média ou baixa com um fio de azeite ou manteiga. O aquecimento gradual protege o esmalte vítreo contra choque térmico e garante uma antiaderência natural impecável.
          </p>

          <h2 className="text-2xl font-serif font-medium text-charcoal pt-4">
            2. Como Lavar sem Agredir o Brilho
          </h2>
          <p>
            Após o preparo, espere a panela esfriar até a temperatura ambiente antes de colocá-la sob a torneira. Use apenas o lado macio da esponja com detergente neutro. Caso algum resíduo grude após um assado lento, basta colocar água morna com uma colher de bicarbonato de sódio e deixar agir por 15 minutos: o esmalte voltará a brilhar como novo.
          </p>

          {/* Shoppable Box Embed */}
          <div className="my-10 p-6 rounded-2xl bg-cream-50 border border-charcoal/15 shadow-soft-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider text-olive">
              Peça Mencionada Neste Artigo
            </span>
            <div className="mt-4 max-w-sm">
              <ProductCard product={relatedProduct} />
            </div>
          </div>

          <h2 className="text-2xl font-serif font-medium text-charcoal pt-4">
            3. Um Legado que Atravessa Gerações
          </h2>
          <p>
            Ao adquirir uma panela de ferro esmaltada, você não está comprando um utensílio descartável de temporada. Com esses simples cuidados, sua peça continuará assando pães e reunindo sua família daqui a 20, 30 ou 50 anos.
          </p>
        </div>

        {/* Back Link */}
        <div className="mt-12 pt-8 border-t border-charcoal/10">
          <Link
            href="/journal"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-charcoal hover:text-terracotta transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar ao Journal</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
