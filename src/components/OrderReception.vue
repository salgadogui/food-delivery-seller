<template>
	<Dialog :visible="visible" modal header="Order Status" @hide="visible = true">
		<div v-for="order in filteredOrders" :key="order.id" class="order">
			<h3>Order #{{ order.id }}</h3>
			<p>Status: {{ order.status }}</p>
			<Button v-if="order.status === 'order_placed'" label="Confirm Order" @click="confirmOrder(order.id, order.store_id, getPaymentDetails(order))" />
			<Button v-if="order.status === 'order_placed'" label="Reject Order" @click="rejectOrder(order.id, order.store_id)" />
		</div>
	</Dialog>
</template>

<script setup lang="ts">
	import { ref, computed, onMounted } from 'vue';
	import { useOrderStore } from '@/stores/OrderStore';
	import type { Order } from '@/types/order';


    const orderStore = useOrderStore();
	const orders = ref<Order[]>(orderStore.getOrders);
	const visible = ref(true);
	
	onMounted(async () => {
		await orderStore.fetchOrders();
        orders.value = orderStore.fetchOrders;
	});

	const confirmOrder = async (storeId: string, orderId: string, paymentDetails: any) => {
		await orderStore.confirmOrder(storeId, orderId, paymentDetails);
        await orderStore.fetchOrders();
	};

	const rejectOrder = async (orderId, storeId) => {
	  try {
		await cartStore.updateOrderStatus(storeId, orderId, 'canceled');
		listenToOrderStatus(orderId, storeId);
	  } catch (error) {
		console.error('Error rejecting order:', error);
	  }
	};

	const updateOrderStatus = async (storeId: string, orderId: string, status: string) => {
	  await orderStore.updateOrderStatus(storeId, orderId, status);
      await orderStore.fetchOrders();
	};

	const filteredOrders = computed(() => {
	  return orders.value.filter(order => order.status !== 'canceled' && order.status !== 'delivered');
	});

	const listenToOrderStatus = (orderId, storeId) => {
	  orderStore.listenToOrderStatus(orderId, storeId, (data) => {
		orders.value = orders.value.map(order => order.id === data.order_id ? { ...order, status: data.status } : order);
		visible.value = true;
	  });
	};

	const getPaymentDetails = (order) => {
	  return {
		value: order.total_value, 
		number: '5555 5555 5555 4444', 
		valid: '2026-04-01', 
		cvv: 123 
	  };
	};
</script>
