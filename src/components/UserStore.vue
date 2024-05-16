<template>
    <h3 class="setting__right--side-title">Your Stores</h3>
    <UserStoreCard/>
    <h4>{{ user_store.getStores }}</h4>
    <!-- <UserStoreCard v-for="store in stores" :key="store.id" :store="store"/> -->
</template>

<script setup lang="ts">
    import { onMounted } from 'vue';
    import { useUserStore } from '@/stores/UserStore';
    import UserStoreCard from './UserStoreCard.vue';

    const user_store = useUserStore()
    user_store.fetchStores()
    // onMounted(() => {
    //   user_store.fetchStores();
    // });

    const stores = user_store.getStores
</script>