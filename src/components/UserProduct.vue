<template>
    <h3 class="setting__right--side-title">Your Products</h3>
    <Button label="+ New Product" rounded @click="toggleForm" style="margin-right: 20px;" />
    <div class="container" v-if="showForm">
        <FloatLabel>
            <label for="product_name">Product name</label>
            <InputText id="product_name" v-model="productName" />
        </FloatLabel>
        <FloatLabel>
            <label for="product_price">Product price</label>
            <InputText id="product_price" v-model="productPrice" />
        </FloatLabel>

        <Dropdown
            v-model="storeId"
            :options="stores"
            optionLabel="id"
            placeholder="Select a store id"
            class="w-full md:w-14rem"
        />

        <!-- <FloatLabel>
            <label for="store_id">Store id</label>
            <InputText id="store_id" v-model="storeId" />
        </FloatLabel> -->
        <Button label="Submit" style="margin-left: 15px;" @click="submitForm"/>
    </div>
    <section class="products__list" style="margin-top: 15px;">
        <UserProductTable :key="storeCardKey" />
    </section>
</template>

<script setup lang="ts">
    import UserProductTable from './UserProductTable.vue';
    import { ref } from 'vue';
    import { useUserStore } from '@/stores/UserStore';
    import type { Store } from '@/types/store';
    
    const userStore = useUserStore()
    const stores = ref<Store[]>(userStore.getStores)
    const productName = ref<string>()
    const productPrice = ref<string>()
    const storeId = ref<string>() 
    const showForm =
        defineModel<boolean>('showForm', { default : false })
    const storeCardKey = ref(0);

    const toggleForm = () => {
        showForm.value = !showForm.value
    }

    const submitForm = async () => {
        try {
            await userStore.createProduct(
                productName.value, productPrice.value, storeId.value)
            storeCardKey.value++;
        } catch (err) {
            console.error('Failed to submit form:', err);
        }
    }
</script>