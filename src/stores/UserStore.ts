import { defineStore } from "pinia";
import type { UserData } from "@/types/userdata";
import type { Store } from "@/types/store";
import FetchService from "@/fetchService";
import type { Product } from "@/types/product";

const baseUrl = 'http://localhost:3000';
const authToken = localStorage.getItem('token') || sessionStorage.getItem('token') || '';
const fetchService = new FetchService(baseUrl, authToken);

export const useUserStore = defineStore('user', {
  state: (): UserData => ({
    stores: [],
    products: [],
    authToken: authToken
  }),

  getters: {
    getStores: (state): Store[] => state.stores,
    getProducts: (state): Product[] => state.products
  },

  actions: {
    async fetchStores() {
      const data: Store[] = await fetchService.fetchStores();
      this.stores = data;
    },
    async createStore(storeName: string) {
      await fetchService.createStore(storeName);
      await this.fetchStores();
    },
    async fetchProducts() {
      const data: Product[] = await fetchService.fetchProducts();
      this.products = data;
    },
  }
});