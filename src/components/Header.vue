<template>
  <header class="header">
    <div class="container header-inner">
      <RouterLink to="/" class="logo-wrap">
        <img :src="logo" alt="Logo" class="logo-img" />
      </RouterLink>

      <form class="nav-search" @submit.prevent="goToSearch">
        <input
          v-model="searchText"
          type="text"
          placeholder="Ürün ara..."
          class="nav-search-input"
        />
        <button type="submit" class="nav-search-btn" aria-label="Ara">
          <svg viewBox="0 0 24 24" class="nav-icon">
            <path
              d="M10.5 4a6.5 6.5 0 1 0 4.03 11.6l4.43 4.43 1.41-1.41-4.43-4.43A6.5 6.5 0 0 0 10.5 4zm0 2a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9z"
              fill="currentColor"
            />
          </svg>
        </button>
      </form>

      <div class="header-actions">
        <button type="button" class="action-btn" @click="handleLogin">
          <svg viewBox="0 0 24 24" class="nav-icon">
            <path
              d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm0 2c-3.33 0-6 1.79-6 4v1h12v-1c0-2.21-2.67-4-6-4z"
              fill="currentColor"
            />
          </svg>
          <span>Login</span>
        </button>

        <button type="button" class="action-btn" @click="handleFavorites">
          <svg viewBox="0 0 24 24" class="nav-icon">
            <path
              d="M12 21s-6.72-4.35-9.33-8.13A5.57 5.57 0 0 1 11.2 5.8L12 6.6l.8-.8a5.57 5.57 0 0 1 8.53 7.07C18.72 16.65 12 21 12 21z"
              fill="currentColor"
            />
          </svg>
          <span>Favorites</span>
        </button>

        <div class="cart-menu">
          <button
            type="button"
            class="action-btn"
            @click="isCartOpen = !isCartOpen"
          >
            <svg viewBox="0 0 24 24" class="nav-icon">
              <path
                d="M7 4H3v2h2l2.4 8.02A2 2 0 0 0 9.32 16H18v-2H9.32l-.3-1H19a2 2 0 0 0 1.92-1.45L22 7H8.42L7.82 5H7V4zm3 14a2 2 0 1 0 .001 4.001A2 2 0 0 0 10 18zm8 0a2 2 0 1 0 .001 4.001A2 2 0 0 0 18 18z"
                fill="currentColor"
              />
            </svg>
            <span>Cart</span>
            <span v-if="cartCount" class="cart-badge">{{ cartCount }}</span>
          </button>

          <div v-if="isCartOpen" class="cart-dropdown">
            <div class="cart-dropdown-head">
              <span>Sepet</span>
              <button
                v-if="cartItems.length"
                type="button"
                class="cart-clear-btn"
                @click="handleClearCart"
              >
                Temizle
              </button>
            </div>

            <div v-if="cartItems.length === 0" class="cart-empty">
              Sepet şu an boş.
            </div>

            <div v-else class="cart-list">
              <div
                v-for="item in cartItems"
                :key="item.id"
                class="cart-item"
              >
                <img :src="item.image" :alt="item.title" class="cart-item-img" />

                <div class="cart-item-info">
                  <div class="cart-item-title">{{ item.title }}</div>
                  <div class="cart-item-meta">
                    {{ item.quantity }} x {{ item.price }} ₺
                  </div>
                </div>

                <button
                  type="button"
                  class="cart-remove-btn"
                  @click="handleRemove(item.id)"
                >
                  Sil
                </button>
              </div>

              <div class="cart-total">
                <span>Toplam</span>
                <strong>{{ totalPrice }} ₺</strong>
              </div>

              <RouterLink
                to="/cart"
                class="cart-view-btn"
                @click="isCartOpen = false"
              >
                Sepete Git
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cartStore'
import logo from '../assets/logo.webp'
import AuthView from '../views/AuthView.vue'
const router = useRouter()
const searchText = ref('')
const isCartOpen = ref(false)

const {
  state,
  loadCart,
  removeFromCart,
  clearCart,
  cartCount,
  totalPrice
} = useCartStore()

const cartItems = computed(() => state.items)

function goToSearch() {
  const q = searchText.value.trim()

  router.push({
    path: '/products',
    query: q ? { search: q } : {}
  })
}

function handleLogin() {
  router.push({
    path: '/auth',
    query: { tab: 'login' }
  })
}

function handleFavorites() {
  alert('Favorites sayfası daha sonra bağlanacak.')
}

async function handleRemove(productId) {
  await removeFromCart(productId)
}

async function handleClearCart() {
  await clearCart()
}

onMounted(async () => {
  if (!state.initialized) {
    await loadCart()
  }
})
</script>