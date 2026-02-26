import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import ProductsView from '../views/ProductsView.vue'
import CategoryView from '../views/CategoryView.vue'
import CartView from '../views/CartView.vue'
import AuthView from '../views/AuthView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/products', component: ProductsView },
  { path: '/category/:slug', component: CategoryView },
  { path: '/cart', component: CartView },
  { path: '/auth', component: AuthView }
]

export default createRouter({
  history: createWebHistory(),
  routes
})