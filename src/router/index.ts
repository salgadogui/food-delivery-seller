import { createRouter, createWebHistory } from 'vue-router'
import SignInView from '@/views/SignInView.vue'
import AccountView from '@/views/AccountView.vue'
import StoresView from '@/views/StoresView.vue'
import ProductsView from '@/views/ProductsView.vue'
import OrdersView from '@/views/OrdersView.vue'
import DashboardView from '@/views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
	{
		path: '/signin',
		name: 'signin',
		component: SignInView
	},
    {
      path: '/account',
      name: 'account',
      component: AccountView
    },
    {
      path: '/stores',
      name: 'stores',
      component: StoresView
    },
    {
      path: '/products',
      name: 'products',
      component: ProductsView
    },
    {
      path: '/orders',
      name: 'orders',
      component: OrdersView
    },
	{
	  path: '/dashboard',
	  name: 'dashboard',
	  component: DashboardView
	}	
  ]
})

export default router
