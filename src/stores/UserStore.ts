import { defineStore } from "pinia";
import type { UserStore, Store } from "@/types/store";

export const useUserStore = defineStore('user', {
    state: (): UserStore => ({
        stores: [],
        authToken: localStorage.getItem('token') || sessionStorage.getItem('token') || ''
    }),

    getters: {
        getStores: (state): Store[] => state.stores,
    },

    actions: {
        async fetchStores() {
            try {
              const response = await fetch('http://localhost:3000/stores', {
                method: "GET",
                headers: {
                  "Accept":"application/json",
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${this.authToken}`
                }
              })
              console.log("Response: ", response)
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              const data = await response.json();
              this.stores = data;
              console.log('Data is fetched.');
            } catch (error) {
              console.error('Error fetching stores:', error);
            }
        }
    }
})