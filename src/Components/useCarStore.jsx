import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      toggleItem: (card) => {
        const exists = get().items.some((i) => i.title === card.title);
        set({
          items: exists
            ? get().items.filter((i) => i.title !== card.title)
            : [...get().items, card],
        });
      },

      removeItem: (title) =>
        set({ items: get().items.filter((i) => i.title !== title) }),

      clearAll: () => set({ items: [] }),

      isLiked: (title) => get().items.some((i) => i.title === title),
    }),
    { name: "cart-storage" }
  )
);

export default useCartStore;