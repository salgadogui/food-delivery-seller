<template>
    <h3 class="setting__right--side-title">Your Orders</h3>
    <section class="products__list" style="margin-top: 15px;">
        <UserProductTable :key="storeCardKey" />
    </section>
</template>

<script setup lang="ts">
    import UserProductTable from './UserProductTable.vue';
    import { onMounted, ref } from 'vue';
    import { useUserStore } from '@/stores/UserStore';
    import type { Store } from '@/types/store';

    
    const userStore = useUserStore()
    onMounted(async () => {
        await userStore.fetchStores();
        stores.value = userStore.getStores;
    });

    const stores = ref<Store[]>(userStore.getStores)
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
            await userStore.createProduct(
                productName.value, parseFloat(productPrice.value), storeId.value["id"])
            storeCardKey.value++;
        } catch (err) {
            console.error('Failed to submit form:', err);
        }
    }
</script>