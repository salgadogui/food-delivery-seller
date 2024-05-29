<template>
    <h3 class="setting__right--side-title">Your Orders</h3>
    <section class="products__list" style="margin-top: 15px;">
        <UserProductTable :key="storeCardKey" />
    </section>
</template>

<script setup lang="ts">
    import UserProductTable from './UserProductTable.vue';
    import { onMounted, ref } from 'vue';
    import { useStoreStore } from '@/stores/StoreStore';
    import { useProductStore } from '@/stores/ProductStore';
    import type { Store } from '@/types/store';

    
    const storeStore = useStoreStore()
    const productStore = useProductStore()
    onMounted(async () => {
        await storeStore.fetchStores();
        stores.value = storeStore.getStores;
    });

    const stores = ref<Store[]>(storeStore.getStores)
    const productName = ref<string>()
    const productPrice = ref<string>()
    const storeId = ref<Store>() 
    const showForm =
        defineModel<boolean>('showForm', { default : false })
    const storeCardKey = ref(0);

    const toggleForm = () => {
        showForm.value = !showForm.value
    }

    const submitForm = async () => {
        try {
            await productStore.createProduct(
                productName.value, parseFloat(productPrice.value), storeId.value["id"])
            storeCardKey.value++;
        } catch (err) {
            console.error('Failed to submit form:', err);
        }
    }
</script>