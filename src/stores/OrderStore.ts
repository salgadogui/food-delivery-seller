import { defineStore } from "pinia";
import FetchService from '@/fetchService'
import type { Order } from "@/types/order";

const baseUrl = 'http://localhost:3000';
const authToken = localStorage.getItem('token') || sessionStorage.getItem('token') || '';
const fetchService = new FetchService(baseUrl, authToken);

interface State {
    orders: Order[];
}

export const useOrderStore = defineStore ('order', {
    state: (): State => ({
        orders: []
    }),

    getters: {
        getOrders: (state): Order[] => state.orders
    },

    actions: {
        async fetchOrders() {
            const data: Order[] = await fetchService.fetchOrders();
            this.orders = data;
        }
    }
})