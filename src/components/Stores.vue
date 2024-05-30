<template>
    <h3 class="setting__right--side-title">Your Stores</h3>
    <Button label="+ New Store" rounded @click="toggleForm" style="margin-right: 20px;" />
    <div class="container" v-if="showNewStoreForm">
        <FloatLabel>
            <label for="store_name">Store name</label>
            <InputText id="store_name" v-model="storeName" />
        </FloatLabel>
        <Button label="Submit" style="margin-left: 15px;" @click="submitForm"/>
    </div>
    <section class="products__list" style="margin-top: 15px;">
        <StoresTable :key="storeCardKey" />
    </section>
</template>

<script setup lang="ts">
    import StoresTable from './StoresTable.vue';
    import { ref } from 'vue';
    import { useStoreStore } from '@/stores/StoreStore';

    const storeStore = useStoreStore()
    const storeName = ref<string>() 
    const showNewStoreForm =
        defineModel<boolean>('showNewStoreForm', { default : false })
    const storeCardKey = ref(0);

    const toggleForm = () => {
        showNewStoreForm.value = !showNewStoreForm.value
    }

    const submitForm = async () => {
        try {
            await storeStore.createStore(storeName.value)
            storeCardKey.value++;
        } catch (err) {
            console.error('Failed to submit form:', err);
        }
    }
</script>