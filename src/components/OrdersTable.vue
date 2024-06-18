<template>
    <div class="card">
        <DataTable
			v-model:expandedRows="expandedRows"
			dataKey="id"
            :value="orders" paginator 
            :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"
            sortField="updated_at" :sortOrder="-1"
            tableStyle="min-width: 50rem">
				<Column expander style="width: 5rem" />
                <Column field="id" header="Id" sortable style="width: 25%"></Column>
				<Column header="Confirm Order" style="width: 15%">
					<template #body="slotProps">
						<Button
							v-if="slotProps.data.state === 'order_placed'"
							label="Confirm Order"
							@click="confirmOrder(slotProps.data.store.id, slotProps.data.id, getPaymentDetails(slotProps.data))"
						/>
					</template>
				</Column>
                <Column field="store.name" header="Store name" sortable style="width: 25%"></Column>
                <Column field="user.email" header="User Email" sortable style="width: 25%"></Column>
                <Column field="created_at" header="Created at" sortable style="width: 25%"></Column>
                <Column field="updated_at" header="Updated at" sortable style="width: 25%"></Column>
				<Column field="total_value" header="Total Value" sortable style="width: 25%"></Column>
				<Column header="Status" style="width: 25%">
					<template #body="slotProps">
						<Tag :value="slotProps.data.state" :severity="getSeverity(slotProps.data.state)" />
					</template>
				</Column>
				<template #expansion="slotProps">
					<h5>Items for Order # {{ slotProps.data.id  }}</h5>
					<DataTable :value="slotProps.data.order_items">
						<Column field="product.name" header="Product Name" sortable />	
						<Column field="quantity" header="Quantity" sortable />	
						<Column field="price" header="Price" sortable />	
					</DataTable>
				</template>
        </DataTable>
    </div>
</template>

<script setup lang="ts">
    import { useOrderStore } from '@/stores/OrderStore';
    import { onMounted, ref } from 'vue';
    import type { Order } from '@/types/order';

    const orderStore = useOrderStore()
    const orders = ref<Order[]>([])
	const expandedRows = ref({});
    
    onMounted(async () => {
        await orderStore.fetchOrders();
        orders.value = orderStore.getOrders;
    });

	const getSeverity = (state): String => {
		switch (state) {
			case 'order_placed':
				return 'secondary';
			case 'order_confirmed':
				return 'info';
			case 'out_for_delivery':
				return 'warning';
			case 'delivered':
				return 'success';
			case 'canceled':
				return 'danger'			
			default:
				return null;
		}
	} 

	const confirmOrder = async (storeId: string, orderId: string, paymentDetails: any) => {
		// This should not be here. Should be sent
		// client-side by the buyer, but for now will suffice.	
		await orderStore.confirmOrder(storeId, orderId, paymentDetails);
	};
	
	const getPaymentDetails = (order) => {
	  return {
		value: order.total_value, // Replace with actual value
		number: '5555 5555 5555 4444', // Replace with actual card number
		valid: '2026-04-01', // Replace with actual card validity date
		cvv: 123 // Replace with actual CVV
	  };
	};
</script>
