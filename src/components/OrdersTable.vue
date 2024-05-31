<template>
    <div class="card">
        <DataTable
            :value="orders" paginator 
            :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"
            sortField="updated_at" :sortOrder="-1"
            tableStyle="min-width: 50rem">
                <Column field="id" header="Id" sortable style="width: 25%"></Column>
                <Column field="store_id" header="Store Id" sortable style="width: 25%"></Column>
                <Column field="user_id" header="User Id" sortable style="width: 25%"></Column>
                <Column field="created_at" header="Created at" sortable style="width: 25%"></Column>
                <Column field="updated_at" header="Updated at" sortable style="width: 25%"></Column>
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

</script>