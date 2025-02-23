import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import type { CartItem, CartType } from "@/types";

type State = {
  carts: CartType[];
};

const initialState: State = {
  carts: [],
};

type Actions = {
  addToCart: (product: CartType) => void;
  updateCart: (productId: number, itemId: number, quantity: number) => void;
  removeFromCart: (productId: number, itemId: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
};

const useCartStore = create<State & Actions>()(
  immer((set, get) => ({
    ...initialState,

    addToCart: (product) => {
      set((state) => {
        const existingIndex = state.carts.findIndex(
          (item) => item.id === product.id,
        );

        if (existingIndex > -1) {
          product.items.forEach((item) => {
            const existingItemIndex = state.carts[
              existingIndex
            ].items.findIndex(
              (existingItem) =>
                existingItem.color === item.color &&
                existingItem.size === item.size,
            );

            if (existingItemIndex > -1) {
              state.carts[existingIndex].items[existingItemIndex].quantity +=
                item.quantity;
            } else {
              state.carts[existingIndex].items.push(item);
            }
          });
        } else state.carts.push(product);
      });
    },

    updateCart: (productId, itemId, quantity) => {
      set((state) => {
        const existingIndex = state.carts.findIndex(
          (item) => item.id === productId,
        );

        if (existingIndex < 0) return;

        const existingItemIndex = state.carts[existingIndex].items.findIndex(
          (existingItem) => existingItem.id === itemId,
        );

        if (existingItemIndex < 0) return;

        state.carts[existingIndex].items[existingItemIndex].quantity = quantity;
      });
    },

    removeFromCart: (productId, itemId) => {
      set((state) => {
        const existingIndex = state.carts.findIndex(
          (item) => item.id === productId,
        );

        if (existingIndex < 0) return;

        const existingItemIndex = state.carts[existingIndex].items.findIndex(
          (existingItem) => existingItem.id === itemId,
        );

        if (existingItemIndex < 0) return;

        state.carts[existingIndex].items.splice(existingItemIndex, 1);

        if (state.carts[existingIndex].items.length === 0) {
          state.carts.splice(existingIndex, 1);
        }
      });
    },

    clearCart: () => set({ carts: [] }),

    getTotalItems: () => {
      const { carts } = get();
      return carts.reduce(
        (total, cart) =>
          total + cart.items.reduce((total, item) => total + item.quantity, 0),
        0,
      );
    },

    getTotalPrice: () => {
      const { carts } = get();

      return carts.reduce(
        (total, cart) =>
          total +
          cart.items.reduce(
            (total, item) => total + item.quantity * cart.price,
            0,
          ),
        0,
      );
    },
  })),
);

export default useCartStore;

// type cart (product) = {
//   id: number;
//   title: string;
//   price: number;
//   image: any;
//   items: [{ id: number; color: string; size: string; quantity: number }];
// };
