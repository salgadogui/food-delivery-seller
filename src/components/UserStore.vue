<template>
    <h3 class="setting__right--side-title">Your Stores</h3>
    <Button label="+ New Store" rounded />
    <section class="products__list" style="margin-top: 15px;">
        <UserStoreCard/>
    </section>
</template>

<script setup lang="ts">
    import UserStoreCard from './UserStoreCard.vue';

</script>