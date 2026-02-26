import { reactive, computed, readonly } from 'vue'
import {
  fetchCart,
  addCartItem,
  removeCartItem,
  clearCartItems
} from '../services/cartService'

const state = reactive({
  items: [],
  loading: false,
  initialized: false,
  error: null
})

async function loadCart() {
  if (state.loading) return

  state.loading = true
  state.error = null

  try {
    state.items = await fetchCart()
    state.initialized = true
  } catch (error) {
    state.error = 'Sepet yüklenemedi.'
    console.error(error)
  } finally {
    state.loading = false
  }
}

async function addToCart(product) {
  state.loading = true
  state.error = null

  try {
    state.items = await addCartItem(product)
    state.initialized = true
  } catch (error) {
    state.error = 'Ürün sepete eklenemedi.'
    console.error(error)
  } finally {
    state.loading = false
  }
}

async function removeFromCart(productId) {
  state.loading = true
  state.error = null

  try {
    state.items = await removeCartItem(productId)
  } catch (error) {
    state.error = 'Ürün sepetten çıkarılamadı.'
    console.error(error)
  } finally {
    state.loading = false
  }
}

async function clearCart() {
  state.loading = true
  state.error = null

  try {
    state.items = await clearCartItems()
  } catch (error) {
    state.error = 'Sepet temizlenemedi.'
    console.error(error)
  } finally {
    state.loading = false
  }
}

const cartCount = computed(() => {
  return state.items.reduce((sum, item) => sum + item.quantity, 0)
})

const totalPrice = computed(() => {
  return state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
})

export function useCartStore() {
  return {
    state: readonly(state),
    loadCart,
    addToCart,
    removeFromCart,
    clearCart,
    cartCount,
    totalPrice
  }
}