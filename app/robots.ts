import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/checkout/', '/conta/'],
      },
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'ClaudeBot', 'PerplexityBot'],
        allow: ['/', '/produtos/', '/colecoes/', '/journal/', '/llms.txt'],
      },
    ],
    sitemap: 'https://studiolarluz.com.br/sitemap.xml',
  };
}
