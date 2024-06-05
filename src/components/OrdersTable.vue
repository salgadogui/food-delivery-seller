<template>
    <div class="card">
        <DataTable
            :value="orders" paginator 
            :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"
            sortField="updated_at" :sortOrder="-1"
            tableStyle="min-width: 50rem">
                <Column field="id" header="Id" sortable style="width: 25%"></Column>
                <Column field="store.name" header="Store name" sortable style="width: 25%"></Column>
                <Column field="user.email" header="User Email" sortable style="width: 25%"></Column>
                <Column field="created_at" header="Created at" sortable style="width: 25%"></Column>
                <Column field="updated_at" header="Updated at" sortable style="width: 25%"></Column>
                 <Column field="state" header="Status 2" sortable style="width: 25%"></Column>
				<Column header="Status" style="width: 25%">
					<template #body="slotProps">
						<Tag :value="slotProps.data.state" :severity="getSeverity(slotProps.data.state)" />
					</template>
				</Column>
        </DataTable>
    </div>
</template>

<script setup lang="ts">
    import { useOrderStore } from '@/stores/OrderStore';
    import { onMounted, ref } from 'vue';
    import type { Order } from '@/types/order';

    const orderStore = useOrderStore()
    const orders = ref<Order[]>([])
    
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
</script>
