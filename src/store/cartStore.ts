import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "../types";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (product, quantity) => {
        const existing = get().items.find((i) => i.product._id === product._id);
        if (existing) {
          set((state) => ({
            items: state.items.map((i) =>
              i.product._id === product._id
                ? { ...i, quantity: i.quantity + quantity }
                : i,
            ),
          }));
        } else {
          set((state) => ({ items: [...state.items, { product, quantity }] }));
        }
      },

      removeFromCart: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.product._id !== id),
        })),

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(id);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.product._id === id ? { ...i, quantity } : i,
          ),
        }));
      },

      clearCart: () => set({ items: [] }),
      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      totalPrice: () =>
        get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    }),
    {
      name: "esim-cart", // localStorage key
    },
  ),
);
