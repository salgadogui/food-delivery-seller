<template>
    <h3 class="setting__right--side-title">Stores</h3>
    <UserStoreCard/>
</template>

<script setup lang="ts">
    import { useAuthStore } from '@/stores/AuthStore';
    import UserStoreCard from './UserStoreCard.vue';

    const auth = useAuthStore()

    function handleSignOut () {
        auth.signOut()
    }
</script>