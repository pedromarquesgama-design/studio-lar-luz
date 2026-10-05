export interface Money {
  amount: number;
  currencyCode: 'BRL' | 'USD';
}

export interface ProductVariant {
  id: string;
  title: string;
  sku: string;
  price: number;
  compareAtPrice?: number;
  availableForSale: boolean;
  quantityAvailable: number;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  image?: string;
  colorHex?: string;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number; // 1 to 5
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  location?: string; // e.g. "São Paulo, SP"
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  shortDescription: string;
  category: string;
  room: 'cozinha' | 'mesa-posta' | 'banho' | 'despensa' | 'presentes' | 'geral';
  price: number;
  compareAtPrice?: number;
  images: string[];
  featuredImage: string;
  variants: ProductVariant[];
  tags: string[];
  materials?: string[];
  dimensions?: string;
  careInstructions?: string[];
  inStock: boolean;
  rating: number;
  reviewCount: number;
  reviews?: ProductReview[];
  isNewArrival?: boolean;
  isBestseller?: boolean;
  isSeasonal?: boolean;
  aliexpressSku?: string;
  model3d?: {
    type: 'mug' | 'pan' | 'vase';
    color: string;
  };
}

export interface Collection {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: string;
  iconName?: string;
  productCount: number;
}

export interface CartItem {
  id: string; // Line item unique id
  variantId: string;
  productId: string;
  title: string;
  variantTitle?: string;
  handle: string;
  quantity: number;
  price: number;
  image: string;
  selectedOptions?: { name: string; value: string }[];
}

export interface Cart {
  id: string;
  items: CartItem[];
  subtotal: number;
  discountAmount: number;
  shippingAmount: number;
  total: number;
  couponCode?: string;
  freeShippingQualified: boolean;
  freeShippingThresholdRemaining: number;
}

export interface CustomerOrder {
  id: string;
  orderNumber: string;
  createdAt: string;
  status: 'processando' | 'em_transito' | 'saiu_para_entrega' | 'entregue' | 'cancelado';
  paymentMethod: 'pix' | 'cartao_credito' | 'boleto';
  subtotal: number;
  shipping: number;
  total: number;
  trackingCode?: string;
  carrierName?: string;
  trackingUrl?: string;
  estimatedDeliveryDate?: string;
  items: {
    title: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  shippingAddress: {
    name: string;
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

export interface OrderTrackingResult {
  orderNumber: string;
  customerName: string;
  status: 'processando' | 'em_transito' | 'saiu_para_entrega' | 'entregue';
  statusDescription: string;
  carrierName: string;
  trackingCode: string;
  trackingUrl: string;
  estimatedDeliveryDate: string;
  timeline: {
    date: string;
    time: string;
    location: string;
    description: string;
    done: boolean;
  }[];
}

export interface CommerceProvider {
  getProducts(options?: { collection?: string; room?: string; limit?: number; query?: string }): Promise<Product[]>;
  getProductByHandle(handle: string): Promise<Product | null>;
  getCollections(): Promise<Collection[]>;
  getCollectionByHandle(handle: string): Promise<Collection | null>;
  trackOrder(orderNumber: string, emailOrCpf: string): Promise<OrderTrackingResult | null>;
}
