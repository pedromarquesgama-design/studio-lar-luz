import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CartItem } from '../commerce/types';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  couponCode: string;
  discountPercentage: number;

  // Actions
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (item: Omit<CartItem, 'id'>) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  removeItem: (lineId: string) => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  clearCart: () => void;

  // Computed getters
  getItemCount: () => number;
  getSubtotal: () => number;
  getDiscountAmount: () => number;
  getTotal: () => number;
  getFreeShippingThreshold: () => number;
  getFreeShippingRemaining: () => number;
  isFreeShippingQualified: () => boolean;
}

const FREE_SHIPPING_THRESHOLD = 199.0;

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      couponCode: '',
      discountPercentage: 0,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      addItem: (newItem) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (i) =>
              i.productId === newItem.productId &&
              i.variantId === newItem.variantId
          );

          if (existingIndex > -1) {
            const updated = [...state.items];
            updated[existingIndex].quantity += newItem.quantity;
            return { items: updated, isOpen: true };
          } else {
            const lineId = `${newItem.productId}-${newItem.variantId}-${Date.now()}`;
            return {
              items: [...state.items, { ...newItem, id: lineId }],
              isOpen: true,
            };
          }
        });
      },

      updateQuantity: (lineId, quantity) => {
        set((state) => {
          if (quantity <= 0) {
            return { items: state.items.filter((i) => i.id !== lineId) };
          }
          return {
            items: state.items.map((i) =>
              i.id === lineId ? { ...i, quantity } : i
            ),
          };
        });
      },

      removeItem: (lineId) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== lineId),
        }));
      },

      applyCoupon: (code: string) => {
        const clean = code.trim().toUpperCase();
        if (clean === 'BEMVINDO10' || clean === 'LAR10') {
          set({ couponCode: clean, discountPercentage: 10 });
          return { success: true, message: 'Cupom de 10% aplicado com sucesso!' };
        }
        if (clean === 'FRETEGRATIS') {
          set({ couponCode: clean, discountPercentage: 5 });
          return { success: true, message: 'Cupom de desconto especial aplicado!' };
        }
        return { success: false, message: 'Cupom inválido ou expirado.' };
      },

      removeCoupon: () => set({ couponCode: '', discountPercentage: 0 }),

      clearCart: () => set({ items: [], couponCode: '', discountPercentage: 0 }),

      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },

      getDiscountAmount: () => {
        const subtotal = get().getSubtotal();
        const pct = get().discountPercentage;
        return (subtotal * pct) / 100;
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        const discount = get().getDiscountAmount();
        return Math.max(0, subtotal - discount);
      },

      getFreeShippingThreshold: () => FREE_SHIPPING_THRESHOLD,

      getFreeShippingRemaining: () => {
        const total = get().getTotal();
        return Math.max(0, FREE_SHIPPING_THRESHOLD - total);
      },

      isFreeShippingQualified: () => {
        return get().getTotal() >= FREE_SHIPPING_THRESHOLD;
      },
    }),
    {
      name: 'studio-lar-luz-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        couponCode: state.couponCode,
        discountPercentage: state.discountPercentage,
      }),
    }
  )
);
