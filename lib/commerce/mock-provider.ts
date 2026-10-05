import { CommerceProvider, Product, Collection, OrderTrackingResult } from './types';
import { MOCK_PRODUCTS, MOCK_COLLECTIONS, MOCK_ORDERS_TRACKING } from './mock-data';

export class MockCommerceProvider implements CommerceProvider {
  async getProducts(options?: { collection?: string; room?: string; limit?: number; query?: string }): Promise<Product[]> {
    let results = [...MOCK_PRODUCTS];

    if (options?.collection) {
      results = results.filter((p) => p.category === options.collection);
    }

    if (options?.room) {
      results = results.filter((p) => p.room === options.room);
    }

    if (options?.query) {
      const q = options.query.toLowerCase().trim();
      results = results.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (options?.limit) {
      results = results.slice(0, options.limit);
    }

    return results;
  }

  async getProductByHandle(handle: string): Promise<Product | null> {
    const product = MOCK_PRODUCTS.find((p) => p.handle === handle);
    return product || null;
  }

  async getCollections(): Promise<Collection[]> {
    return MOCK_COLLECTIONS;
  }

  async getCollectionByHandle(handle: string): Promise<Collection | null> {
    const col = MOCK_COLLECTIONS.find((c) => c.handle === handle);
    return col || null;
  }

  async trackOrder(orderNumber: string, emailOrCpf: string): Promise<OrderTrackingResult | null> {
    // Normaliza código (ex: remove # ou espaços)
    const cleanOrderNumber = orderNumber.replace('#', '').trim().toUpperCase();
    const result = MOCK_ORDERS_TRACKING[cleanOrderNumber];

    if (result) {
      return result;
    }

    // Se qualquer número válido for digitado, gera um status dinâmico para demonstração
    if (cleanOrderNumber.length >= 3) {
      return {
        orderNumber: `#${cleanOrderNumber}`,
        customerName: 'Cliente Studio Lar & Luz',
        status: 'em_transito',
        statusDescription: 'Objeto em trânsito para a unidade de distribuição do seu CEP.',
        carrierName: 'Correios Sedex',
        trackingCode: `BR${Math.floor(100000000 + Math.random() * 900000000)}LL`,
        trackingUrl: 'https://rastreamento.correios.com.br',
        estimatedDeliveryDate: '2026-10-08',
        timeline: [
          {
            date: '2026-10-02',
            time: '11:30',
            location: 'Centro de Distribuição São Paulo',
            description: 'Objeto em trânsito para a unidade local',
            done: true,
          },
          {
            date: '2026-10-01',
            time: '16:00',
            location: 'Studio Lar & Luz',
            description: 'Pedido faturado e despachado com nota fiscal',
            done: true,
          },
          {
            date: '2026-09-30',
            time: '20:15',
            location: 'Loja Online',
            description: 'Pagamento confirmado e pedido recebido',
            done: true,
          },
        ],
      };
    }

    return null;
  }
}
