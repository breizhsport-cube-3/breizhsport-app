import { defineStore } from "pinia";
import productsData from "../data/products.json"; // Import the JSON file

export const useProductsStore = defineStore("products", {
  state: () => ({
    products: [],
  }),

  actions: {
    loadProducts() {
      this.products = productsData;
    },
  },

  getters: {
    getAllProducts: (state) => state.products,
  },
});
