import { defineStore } from "pinia";
import FetchService from '@/fetchService'
import type { Order } from "@/types/order";
import { fetchEventSource } from '@microsoft/fetch-event-source';

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
		},
		listenToOrderStatus(orderId: string, storeId: string, callback: (data: any) => void) {
		  fetchEventSource(`http://localhost:3000/stores/${storeId}/orders/${orderId}/status`, {
			method: 'GET',
			headers: {
			  'Accept': 'application/json',
			  'Authorization': `Bearer ${authToken}`,
			  'X-API-KEY': import.meta.env.VITE_X_API_KEY,
			},
			async onopen(response) {
			  if (response.ok) {
				console.log('connected!');
				return;
			  }
			},
			onmessage(event) {
			  const data = JSON.parse(event.data);
			  console.log(data);
			  callback(data);
			},
			onclose() {
			  console.log('Connection closed');
			},
			onerror(err) {
			  console.error('EventSource failed:', err);
			},
		  });
		},

    }
})
