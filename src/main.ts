import './assets/main.css'

import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/lara-light-indigo/theme.css'
import Button from 'primevue/button'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Paginator from 'primevue/paginator';

const app = createApp(App)
const pinia = createPinia()

app.component('Button', Button)
app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('Paginator', Paginator)

pinia.use(({ store }) => {store.router = markRaw(router)})
app.use(PrimeVue)
app.use(pinia)
app.use(router)

app.mount('#app')
