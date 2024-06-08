<template>
    <div class="card">
        <DataTable
			v-model:selection="selectedProduct"
			selectionMode="single"
   			dataKey="id"
            :value="products" paginator 
            :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"
            sortField="updated_at" :sortOrder="-1"
            tableStyle="min-width: 50rem"
			@rowSelect="onRowSelect"
			>
                <Column field="id" header="Id" sortable style="width: 25%"></Column>
                <Column field="store_id" header="Store Id" sortable style="width: 25%"></Column>
                <Column field="name" header="Name" sortable style="width: 25%"></Column>
                <Column field="created_at" header="Created at" sortable style="width: 25%"></Column>
                <Column field="updated_at" header="Updated at" sortable style="width: 25%"></Column>
                <Column field="price" header="Price" sortable style="width: 25%"></Column>
        </DataTable>
		<Dialog v-model:visible="showDialog" modal header="Edit Product" :style="{ width: '25rem' }">
			<span class="p-text-secondary block mb-5">Update your product's information.</span>
			<div class="flex align-items-center gap-3 mb-3">
				<label for="name" class="font-semibold w-6rem">Name</label>
				<InputText id="name" class="flex-auto" autocomplete="off" v-model="selectedProductName" />
			</div>
			<div class="flex align-items-center gap-3 mb-3">
				<label for="price" class="font-semibold w-6rem">Price</label>
				<InputText id="price" class="flex-auto" autocomplete="off" v-model="selectedProductPrice" />
			</div>
			<div class="flex align-items-center gap-3 mb-3">
				<label for="store_id" class="font-semibold w-6rem">Store Id</label>
				<InputText id="store_id" class="flex-auto" autocomplete="off" v-model="selectedProductStoreId" />
			</div>
			<div class="flex justify-content-end gap-2">
				<Button type="button" label="Cancel" severity="secondary" @click="showDialog = false"></Button>
				<Button type="button" label="Save" @click="handleUpdate"></Button>
				<Button label="Delete" severity="danger" @click="handleDelete" />
			</div>
		</Dialog>  
	</div>
</template>

<script setup lang="ts">
    import { useProductStore } from '@/stores/ProductStore';
    import { onMounted, ref } from 'vue';
    import type { Product } from '@/types/product'

    const productStore = useProductStore()
    const products = ref<Product[]>([])
 	const showDialog = ref(false);
	const selectedProduct = ref();
	const selectedProductName = ref();
	const selectedProductPrice = ref();
	const selectedProductStoreId = ref();
	   
	const emit = defineEmits(['productUpdated'])

    onMounted(async () => {
        await productStore.fetchProducts();
        products.value = productStore.getProducts;
    });

	const onRowSelect = (event) => {
		showDialog.value = true;
	}

	const handleDelete = async () => {
	  if (selectedProduct.value) {
		await productStore.deleteProduct(selectedProduct.value.id.toString(), selectedProduct.value.store_id.toString());
		showDialog.value = false;
		emit('productUpdated');
	  }
	};

	const handleUpdate = async () => {
	  if (selectedProduct.value) {
		await productStore.updateProduct(selectedProduct.value.id.toString(), selectedProductName.value, Number(selectedProductPrice.value), Number(selectedProductStoreId.value));
		showDialog.value = false;
		emit('productUpdated');
	  }
	};
</script>
