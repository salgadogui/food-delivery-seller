<template>
    <!-- <div class="product__card" v-for="store in stores" :key="store.id">
        <img class="card__preview" src="@/assets/img/products/food1.jpg" alt="test" />
        <div class="card__content">
            <div class="card__content-left">
                <div class="card__content--title">
                        {{ store.name }}
                </div>
                <div class="card__content--info">
                    {{ new Date(store.created_at).toDateString() }}
                </div>
            </div>
        </div>
    </div> -->
    <div class="card">
        <DataTable :value="stores" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem">
            <Column field="id" header="Id" style="width: 25%"></Column>
            <Column field="name" header="Name" style="width: 25%"></Column>
        </DataTable>
    </div>
    
</template>

<script setup lang="ts">
    import { useUserStore } from '@/stores/UserStore';
    import { onMounted, ref } from 'vue';
    import type { Store } from '@/types/store'

    const userStore = useUserStore()
    
    onMounted(async () => {
        await userStore.fetchStores();
        stores.value = userStore.getStores;
    });

    const stores = ref<Store[]>([])
</script>