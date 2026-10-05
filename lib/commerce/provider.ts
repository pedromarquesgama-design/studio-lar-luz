import { CommerceProvider } from './types';
import { MockCommerceProvider } from './mock-provider';
import { ShopifyCommerceProvider } from './shopify/client';

let providerInstance: CommerceProvider | null = null;

export function getCommerceProvider(): CommerceProvider {
  if (providerInstance) {
    return providerInstance;
  }

  const mode = process.env.COMMERCE_PROVIDER || 'mock';
  const hasShopifyCreds =
    process.env.SHOPIFY_STORE_DOMAIN &&
    process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  if (mode === 'shopify' && hasShopifyCreds) {
    providerInstance = new ShopifyCommerceProvider();
  } else {
    providerInstance = new MockCommerceProvider();
  }

  return providerInstance;
}
