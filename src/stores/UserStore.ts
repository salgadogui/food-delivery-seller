import { defineStore } from "pinia";
import { useAuthStore } from "./AuthStore";

interface State {
    stores: string[] | null[]; // dúvida... qual a tipagem correta?
    auth_token: string
}

export const useUserStore = defineStore('user', {
    state: (): State => ({
        stores: [],
        auth_token: localStorage.getItem('token') || sessionStorage.getItem('token') || ''
    }),

    getters: {
        getStores: (state) => state.stores,
    },

    actions: {
        async fetchStores() {
            try {
              const response = await fetch('http://localhost:3000/stores', {
                method: "GET",
                headers: {
                  "Accept":"application/json",
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${this.auth_token}`
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

// desenvolver fetchStores() para onMounted() no componente
// ... para carregar assim que o componente é iniciado