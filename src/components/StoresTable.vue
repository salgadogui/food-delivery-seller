<template>
    <div class="card">
        <DataTable
			v-model:selection="selectedStore"
			selectionMode="single"
			dataKey="id"
            :value="stores" paginator 
            :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"
            sortField="updated_at" :sortOrder="-1"
			tableStyle="min-width: 50rem"
			@rowSelect="onRowSelect">
                <Column field="id" header="Id" sortable style="width: 25%"></Column>
                <Column field="name" header="Name" sortable style="width: 25%"></Column>
                <Column field="created_at" header="Created at" sortable style="width: 25%"></Column>
                <Column field="updated_at" header="Updated at" sortable style="width: 25%"></Column>
        </DataTable>
		<Dialog v-model:visible="showStoreDialog" modal header="Edit Store" :style="{ width: '25rem' }">
			<span class="p-text-secondary block mb-5">Update your information.</span>
			<div class="flex align-items-center gap-3 mb-3">
				<label for="name" class="font-semibold w-6rem">Name</label>
				<InputText id="name" class="flex-auto" autocomplete="off" />
			</div>
			<div class="flex justify-content-end gap-2">
                <Button type="button" label="Cancel" severity="secondary" @click="showStoreDialog = false"></Button>
                <Button type="button" label="Save" @click="showStoreDialog = false"></Button>
            </div>
		</Dialog>
    </div>
</template>

<script setup lang="ts">
    import { useStoreStore } from '@/stores/StoreStore';
    import { onMounted, ref } from 'vue';
    import type { Store } from '@/types/store'

    const storeStore = useStoreStore()
    const stores = ref<Store[]>([])
	const selectedStore = ref()    
	const showStoreDialog = ref(false);

    onMounted(async () => {
        await storeStore.fetchStores();
        stores.value = storeStore.getStores;
    });

	const onRowSelect = (event) => {
		showStoreDialog.value = true;
	}
</script>
