<template>
    <h3 class="setting__right--side-title">Your Stores</h3>
	<Button label="+ New Store" @click="toggleForm" style="margin-right: 20px;" />
	<Dialog v-model:visible="newStoreDialog" :style="{width: '450px'}" header="Add New Store" :modal="true" class="p-fluid">
				<div class="field">
					<label for="name">Name</label>
			<InputText id="name" v-model.trim="storeName" required="true" :invalid="submitted && !storeName" />
			<small class="p-error" v-if="submitted && !storeName">Name is required.</small>
		</div>
		<template #footer>
			<Button label="Cancel" icon="pi pi-times" text @click="hideDialog"/>
			<Button label="Save" icon="pi pi-check" text @click="submitForm" />
		</template>
	</Dialog>
	<section class="products__list" style="margin-top: 15px;">
        <StoresTable :key="storeKey" @storeUpdated="updateStoresTable" />
    </section>
</template>

<script setup lang="ts">
    import StoresTable from './StoresTable.vue';
    import { ref } from 'vue';
    import { useStoreStore } from '@/stores/StoreStore';

	const newStoreDialog = ref(false);
	const submitted = ref(false);
    const storeStore = useStoreStore()
    const storeName = ref<string>() 
    const storeKey = ref(0);
	const deleteStoreDialog = ref(false);
	const selectedStore = ref();

    const toggleForm = () => {
		storeName.value = {};
		submitted.value = false;
		newStoreDialog.value = true;	
    }

    const submitForm = async () => {
		submitted.value = true;
		newStoreDialog.value = false;
		try {
            await storeStore.createStore(storeName.value)
            updateStoresTable();
        } catch (err) {
            console.error('Failed to submit form:', err);
        }
    }
	
	const hideDialog = () => {
		newStoreDialog.value = false;
		submitted.value = false;
	};

	const fetchStores = async () => {
	  await storeStore.fetchStores();
	  stores.value = storeStore.stores;
	};
	
	const updateStoresTable = () => {
		storeKey.value++;	
	}
</script>
