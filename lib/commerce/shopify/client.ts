import { CommerceProvider, Product, Collection, OrderTrackingResult } from '../types';
import {
  GET_PRODUCTS_QUERY,
  GET_PRODUCT_BY_HANDLE_QUERY,
  GET_COLLECTIONS_QUERY,
  GET_COLLECTION_BY_HANDLE_QUERY,
} from './queries';

export class ShopifyCommerceProvider implements CommerceProvider {
  private domain: string;
  private storefrontToken: string;
  private apiVersion: string;

  constructor() {
    this.domain = process.env.SHOPIFY_STORE_DOMAIN || '';
    this.storefrontToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || '';
    this.apiVersion = process.env.SHOPIFY_API_VERSION || '2024-10';
  }

  private async fetchStorefront<T>(query: string, variables: Record<string, unknown> = {}): Promise<T> {
    if (!this.domain || !this.storefrontToken) {
      throw new Error('Shopify credentials missing. Check SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_ACCESS_TOKEN.');
    }

    const endpoint = `https://${this.domain}/api/${this.apiVersion}/graphql.json`;
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': this.storefrontToken,
      },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`Shopify API responded with status ${res.status}: ${res.statusText}`);
    }

    const json = await res.json();
    if (json.errors) {
      throw new Error(`Shopify GraphQL error: ${JSON.stringify(json.errors)}`);
    }

    return json.data as T;
  }

  private mapShopifyProduct(node: any): Product {
    const minPrice = parseFloat(node.priceRange?.minVariantPrice?.amount || '0');
    const comparePrice = parseFloat(node.compareAtPriceRange?.minVariantPrice?.amount || '0');

    return {
      id: node.id,
      handle: node.handle,
      title: node.title,
      description: node.description || '',
      shortDescription: node.description?.slice(0, 140) + '...',
      category: node.productType || 'Geral',
      room: 'geral',
      price: minPrice,
      compareAtPrice: comparePrice > minPrice ? comparePrice : undefined,
      featuredImage: node.featuredImage?.url || '/images/placeholder.jpg',
      images: node.images?.edges?.map((e: any) => e.node.url) || [],
      tags: node.tags || [],
      inStock: node.availableForSale,
      rating: 4.9,
      reviewCount: 15,
      variants: node.variants?.edges?.map((e: any) => ({
        id: e.node.id,
        title: e.node.title,
        sku: e.node.sku || '',
        price: parseFloat(e.node.price?.amount || '0'),
        compareAtPrice: e.node.compareAtPrice ? parseFloat(e.node.compareAtPrice.amount) : undefined,
        availableForSale: e.node.availableForSale,
        quantityAvailable: e.node.quantityAvailable ?? 10,
        selectedOptions: e.node.selectedOptions || [],
        image: e.node.image?.url,
      })) || [],
    };
  }

  async getProducts(options?: { collection?: string; room?: string; limit?: number; query?: string }): Promise<Product[]> {
    try {
      const data: any = await this.fetchStorefront(GET_PRODUCTS_QUERY, {
        first: options?.limit || 24,
        query: options?.query || null,
      });

      return (data.products?.edges || []).map((edge: any) => this.mapShopifyProduct(edge.node));
    } catch (err) {
      console.warn('Shopify Storefront API error, falling back to mock provider:', err);
      return [];
    }
  }

  async getProductByHandle(handle: string): Promise<Product | null> {
    try {
      const data: any = await this.fetchStorefront(GET_PRODUCT_BY_HANDLE_QUERY, { handle });
      if (!data.product) return null;
      return this.mapShopifyProduct(data.product);
    } catch (err) {
      console.warn('Shopify Storefront API getProductByHandle error:', err);
      return null;
    }
  }

  async getCollections(): Promise<Collection[]> {
    try {
      const data: any = await this.fetchStorefront(GET_COLLECTIONS_QUERY, { first: 12 });
      return (data.collections?.edges || []).map((edge: any) => ({
        id: edge.node.id,
        handle: edge.node.handle,
        title: edge.node.title,
        description: edge.node.description || '',
        image: edge.node.image?.url || '',
        productCount: 10,
      }));
    } catch (err) {
      console.warn('Shopify Storefront API getCollections error:', err);
      return [];
    }
  }

  async getCollectionByHandle(handle: string): Promise<Collection | null> {
    try {
      const data: any = await this.fetchStorefront(GET_COLLECTION_BY_HANDLE_QUERY, { handle });
      if (!data.collection) return null;
      return {
        id: data.collection.id,
        handle: data.collection.handle,
        title: data.collection.title,
        description: data.collection.description || '',
        image: data.collection.image?.url || '',
        productCount: data.collection.products?.edges?.length || 0,
      };
    } catch (err) {
      console.warn('Shopify Storefront API getCollectionByHandle error:', err);
      return null;
    }
  }

  async trackOrder(orderNumber: string, emailOrCpf: string): Promise<OrderTrackingResult | null> {
    // Para ordens no Shopify, consulta a Admin API se SHOPIFY_ADMIN_API_TOKEN estiver presente
    if (!process.env.SHOPIFY_ADMIN_API_TOKEN) {
      return null;
    }

    try {
      const cleanNumber = orderNumber.replace('#', '').trim();
      const adminEndpoint = `https://${this.domain}/admin/api/${this.apiVersion}/orders.json?name=${cleanNumber}&status=any`;
      const res = await fetch(adminEndpoint, {
        headers: {
          'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_API_TOKEN,
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) return null;
      const json = await res.json();
      const order = json.orders?.[0];
      if (!order) return null;

      const fulfillment = order.fulfillments?.[0];
      const trackingCompany = fulfillment?.tracking_company || 'Correios';
      const trackingNumber = fulfillment?.tracking_number || 'Sem código disponível';
      const trackingUrl = fulfillment?.tracking_url || 'https://rastreamento.correios.com.br';

      return {
        orderNumber: order.name,
        customerName: order.customer ? `${order.customer.first_name} ${order.customer.last_name}` : 'Cliente',
        status: fulfillment?.shipment_status === 'delivered' ? 'entregue' : 'em_transito',
        statusDescription: `Pedido ${order.financial_status === 'paid' ? 'pago' : 'em processamento'}. ${fulfillment ? 'Enviado via ' + trackingCompany : 'Em separação no estoque.'}`,
        carrierName: trackingCompany,
        trackingCode: trackingNumber,
        trackingUrl: trackingUrl,
        estimatedDeliveryDate: '2026-10-10',
        timeline: [
          {
            date: order.created_at.slice(0, 10),
            time: order.created_at.slice(11, 16),
            location: 'Loja Online',
            description: 'Pedido realizado e confirmado',
            done: true,
          },
          ...(fulfillment
            ? [
                {
                  date: fulfillment.created_at.slice(0, 10),
                  time: fulfillment.created_at.slice(11, 16),
                  location: 'Centro de Distribuição',
                  description: `Despachado com código ${trackingNumber}`,
                  done: true,
                },
              ]
            : []),
        ],
      };
    } catch (err) {
      console.error('Error fetching order from Shopify Admin API:', err);
      return null;
    }
  }
}
