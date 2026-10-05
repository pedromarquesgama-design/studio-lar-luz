import React from 'react';
import { Product } from '@/lib/commerce/types';

interface OrganizationJsonLdProps {
  url?: string;
}

export const OrganizationJsonLd: React.FC<OrganizationJsonLdProps> = ({
  url = 'https://studiolarluz.com.br',
}) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HomeGoodsStore',
    name: 'Studio Lar & Luz',
    url: url,
    logo: `${url}/brand/logo-full-transparent.png`,
    image: `${url}/brand/og-image.jpg`,
    description: 'Loja online de artigos de cozinha, mesa posta, faqueiros, xícaras artesanais, marmitas herméticas e produtos para o lar.',
    telephone: '+55-11-98765-4321',
    priceRange: 'R$ 89 - R$ 499',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'BR',
      addressRegion: 'SP',
      addressLocality: 'São Paulo',
    },
    sameAs: [
      'https://instagram.com/studiolarluz',
      'https://facebook.com/studiolarluz',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export const WebSiteJsonLd: React.FC = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Studio Lar & Luz',
    url: 'https://studiolarluz.com.br',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://studiolarluz.com.br/colecoes?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export const ProductJsonLd: React.FC<{ product: Product; url: string }> = ({
  product,
  url,
}) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    image: product.images,
    description: product.description,
    sku: product.variants[0]?.sku || product.id,
    brand: {
      '@type': 'Brand',
      name: 'Studio Lar & Luz',
    },
    offers: {
      '@type': 'Offer',
      url: url,
      priceCurrency: 'BRL',
      price: product.price.toFixed(2),
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: 'Studio Lar & Luz',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating.toString(),
      reviewCount: product.reviewCount.toString(),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export const FaqJsonLd: React.FC<{ faqs: { question: string; answer: string }[] }> = ({
  faqs,
}) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
