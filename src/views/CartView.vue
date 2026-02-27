<template>
  <section class="container">
    <div class="page-head">
      <h2>Sepet</h2>
    </div>

    <div v-if="loading" class="empty">
      Sepet yükleniyor...
    </div>

    <div v-else-if="cartItems.length === 0" class="empty">
      Sepet şu an boş.
    </div>

    <div v-else class="cart-page">
      <div class="cart-page-list">
        <div
          v-for="item in cartItems"
          :key="item.id"
          class="cart-page-item"
        >
          <img :src="item.image" :alt="item.title" class="cart-page-image" />

          <div class="cart-page-info">
            <h3 class="cart-page-title">{{ item.title }}</h3>
            <p class="cart-page-meta">{{ item.quantity }} x {{ item.price }} ₺</p>
          </div>

          <div class="cart-page-actions">
            <div class="cart-page-line-total">
              {{ item.quantity * item.price }} ₺
            </div>

            <button
              type="button"
              class="cart-remove-btn"
              @click="handleRemove(item.id)"
            >
              Sil
            </button>
          </div>
        </div>
      </div>

      <div class="cart-page-summary">
        <h3>Sepet Özeti</h3>
        <div class="cart-page-summary-row">
          <span>Toplam Ürün</span>
          <strong>{{ cartCount }}</strong>
        </div>
        <div class="cart-page-summary-row">
          <span>Genel Toplam</span>
          <strong>{{ totalPrice }} ₺</strong>
        </div>

        <button
          type="button"
          class="btn"
          @click="handleClear"
        >
          Sepeti Temizle
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useCartStore } from '../stores/cartStore'

const {
  state,
  loadCart,
  removeFromCart,
  clearCart,
  cartCount,
  totalPrice
} = useCartStore()

const cartItems = computed(() => state.items)
const loading = computed(() => state.loading)

async function handleRemove(productId) {
  await removeFromCart(productId)
}

async function handleClear() {
  await clearCart()
}

onMounted(async () => {
  if (!state.initialized) {
    await loadCart()
  }
})
</script>