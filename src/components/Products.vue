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
            optionLabel="name"
            placeholder="Select a store id"
            class="w-full md:w-14rem"
        />
        
        <Button label="Submit" style="margin-left: 15px;" @click="submitForm"/>
    </div>
    <section class="products__list" style="margin-top: 15px;">
        <ProductsTable :key="productKey" @productUpdated="updateProductsTable" />
    </section>
</template>

<script setup lang="ts">
    import ProductsTable from './ProductsTable.vue';
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
    const productKey = ref(0);

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

	const updateProductsTable = () => {
		productKey.value++;	
	}
</script>
