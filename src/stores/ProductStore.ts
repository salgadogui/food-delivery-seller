import { defineStore } from "pinia";
import FetchService from "@/fetchService";
import type { Product } from "@/types/product";
import type { ProductData } from "@/types/product_data";

const baseUrl = 'http://localhost:3000';
const authToken = localStorage.getItem('token') || sessionStorage.getItem('token') || '';
const fetchService = new FetchService(baseUrl, authToken);

interface State {
  products: Product[];
}

export const useProductStore = defineStore('product', {
  state: (): State => ({
    products: [],
  }),

  getters: {
    getProducts: (state): Product[] => state.products
  },

  actions: {
    async fetchProducts() {
      const data: Product[] = await fetchService.fetchProducts();
      this.products = data;
    },
    async createProduct(
      productName: string, productPrice: number, storeId: number) {
        await fetchService.createProduct(productName, productPrice, storeId);
        await this.fetchProducts();
    },
  }
});