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
        <UserStoreCard/>
    </section>
</template>

<script setup lang="ts">
    import UserStoreCard from './UserStoreCard.vue';
    import { ref } from 'vue';
    import { useUserStore } from '@/stores/UserStore';
    import type { Store } from '@/types/store';

    const userStore = useUserStore()
    const storeName = ref<string>() 
    const showNewStoreForm =
        defineModel<boolean>('showNewStoreForm', { default : false })


    const toggleForm = () => {
        showNewStoreForm.value = !showNewStoreForm.value
    }

    const submitForm = () => {
        // const formData = { store: { name: storeName.value } }
        userStore.createStore(storeName.value)
    }

    interface formData {
        formData: Store
    }
</script>