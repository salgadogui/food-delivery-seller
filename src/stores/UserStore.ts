import { defineStore } from "pinia";
import type { UserData, Store } from "@/types/store";
import FetchService from "@/fetchService";

const baseUrl = 'http://localhost:3000';
const authToken = localStorage.getItem('token') || sessionStorage.getItem('token') || '';
const fetchService = new FetchService(baseUrl, authToken);

export const useUserStore = defineStore('user', {
  state: (): UserData => ({
    stores: [],
    authToken: authToken
  }),

  getters: {
    getStores: (state): Store[] => state.stores,
  },

  actions: {
    async fetchStores() {
      const data: Store[] = await fetchService.fetchStores();
      this.stores = data;
    },
    async createStore(storeName: string) {
      await fetchService.createStore(storeName);
      await this.fetchStores();
    }
  }
});