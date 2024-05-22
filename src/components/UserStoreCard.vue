<template>
    <div class="card">
        <DataTable
            :value="stores" paginator 
            :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"
            sortField="id" :sortOrder="-1"
            tableStyle="min-width: 50rem">
                <Column field="id" header="Id" sortable style="width: 25%"></Column>
                <Column field="name" header="Name" sortable style="width: 25%"></Column>
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