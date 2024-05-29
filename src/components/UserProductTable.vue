<template>
    <div class="card">
        <DataTable
            :value="products" paginator 
            :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"
            sortField="updated_at" :sortOrder="-1"
            tableStyle="min-width: 50rem">
                <Column field="id" header="Id" sortable style="width: 25%"></Column>
                <Column field="store_id" header="Store Id" sortable style="width: 25%"></Column>
                <Column field="name" header="Name" sortable style="width: 25%"></Column>
                <Column field="created_at" header="Created at" sortable style="width: 25%"></Column>
                <Column field="updated_at" header="Updated at" sortable style="width: 25%"></Column>
                <Column field="price" header="Price" sortable style="width: 25%"></Column>
            </DataTable>
    </div>
</template>

<script setup lang="ts">
    import { useProductStore } from '@/stores/ProductStore';
    import { onMounted, ref } from 'vue';
    import type { Product } from '@/types/product'

    const productStore = useProductStore()
    const products = ref<Product[]>([])
    
    onMounted(async () => {
        await productStore.fetchProducts();
        products.value = productStore.getProducts;
    });

</script>