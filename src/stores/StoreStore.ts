import { defineStore } from "pinia";
import type { Store } from "@/types/store";
import FetchService from "@/fetchService";

const baseUrl = 'http://localhost:3000';
const authToken = localStorage.getItem('token') || sessionStorage.getItem('token') || '';
const fetchService = new FetchService(baseUrl, authToken);

interface State {
  stores: Store[];
}

export const useStoreStore = defineStore('store', {
  state: (): State => ({
    stores: []
  }),

  getters: {
    getStores: (state): Store[] => state.stores
  },

  actions: {
    async fetchStores() {
      const data: Store[] = await fetchService.fetchAll<Store>('stores');
      this.stores = data;
    },
    async createStore(storeName: string) {
      await fetchService.create<Store>('stores', { name: storeName });
      await this.fetchStores();
    },
	async deleteStore(storeId: string){ 
		await fetchService.delete('stores', storeId);
		await this.fetchStores();
	}
  }
});
