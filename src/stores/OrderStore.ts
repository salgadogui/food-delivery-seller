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
            const data: Order[] = await fetchService.fetchAll<Order>('orders');
            this.orders = data;
        },
        async confirmOrder(storeId: string, orderId: string, paymentDetails: any) {
			console.log(paymentDetails);
            const orderPayload = {
                payment: {
					order_id: orderId,
					...paymentDetails,
				}
            };

            try {
                const response = await fetch(`${baseUrl}/stores/${storeId}/orders/${orderId}/confirm_order`, {
                    method: 'POST',
                    headers: {
						'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authToken}`,
                    },
                    body: JSON.stringify(orderPayload),
                });
				console.log(JSON.stringify(orderPayload));

                if (!response.ok) {
                    throw new Error('Order confirmation failed');
                }

                const data = await response.json();
                console.log('Order confirmed successfully:', data);
            } catch (error) {
                console.error('Error confirming order:', error);
            }
        },
		async updateOrderStatus(storeId: string, orderId: string, status: string) {
		  try {
			const response = await fetch(`${baseUrl}/stores/${storeId}/orders/${orderId}/update_status`, {
			  method: 'PATCH',
			  headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${authToken}`,
			  },
			  body: JSON.stringify({ status }),
			});

			if (!response.ok) {
			  throw new Error('Order status update failed');
			}

			const data = await response.json();
			console.log('Order status updated successfully:', data);
			// Update the local orders state if needed
			await this.fetchOrders();
		  } catch (error) {
			console.error('Error updating order status:', error);
		  }
		}
    }
})
