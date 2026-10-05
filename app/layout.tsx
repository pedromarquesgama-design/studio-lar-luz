import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { OrganizationJsonLd, WebSiteJsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  metadataBase: new URL('https://studiolarluz.com.br'),
  title: {
    default: 'Studio Lar & Luz — Artigos para Cozinha, Mesa Posta e Lar Acolhedor',
    template: '%s | Studio Lar & Luz',
  },
  description:
    'Descubra peças de cozinha, faqueiros em inox dourado, cerâmicas artesanais, panelas de ferro fundido e marmitas herméticas pensadas para viver com calma e afeto.',
  keywords: [
    'Studio Lar & Luz',
    'mesa posta',
    'cerâmica artesanal',
    'faqueiro dourado',
    'panela ferro fundido esmaltada',
    'marmita bento box inox',
    'toalhas algodão egípcio',
    'utensílios cozinha',
  ],
  authors: [{ name: 'Studio Lar & Luz' }],
  creator: 'Studio Lar & Luz',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://studiolarluz.com.br',
    siteName: 'Studio Lar & Luz',
    title: 'Studio Lar & Luz — O Ritual do Lar com Luz e Afeto',
    description:
      'Curadoria de artigos para cozinha, mesa posta e acolhimento. Frete Grátis e 5% OFF no Pix.',
    images: [
      {
        url: '/brand/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Studio Lar & Luz — Home & Light',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Studio Lar & Luz',
    description: 'Curadoria de artigos para cozinha, mesa posta e acolhimento.',
    images: ['/brand/og-image.jpg'],
  },
  icons: {
    icon: '/brand/favicon.ico',
    apple: '/brand/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#474B2F',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        <OrganizationJsonLd />
        <WebSiteJsonLd />
      </head>
      <body className="min-h-screen flex flex-col bg-cream-100 text-charcoal antialiased selection:bg-terracotta selection:text-white">
        <AnnouncementBar />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
