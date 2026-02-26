<template>
  <section class="container">
    <div class="page-head">
      <h2>Tüm Ürünler</h2>

      <div class="filters">
        <input
          v-model="search"
          placeholder="Ürün ara..."
          class="input"
        />

        <select v-model="sort" class="select">
          <option value="default">Sırala</option>
          <option value="priceAsc">Fiyat Artan</option>
          <option value="priceDesc">Fiyat Azalan</option>
        </select>
      </div>
    </div>

    <div class="grid">
      <ProductCard
        v-for="product in visibleProducts"
        :key="product.id"
        :product="product"
        @add-to-cart="handleAddToCart"
      />
    </div>

    <div v-if="visibleProducts.length === 0" class="empty">
      Ürün bulunamadı.
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import ProductCard from '../components/ProductCard.vue'
import { useCartStore } from '../stores/cartStore'

const route = useRoute()

const search = ref(route.query.search ? String(route.query.search) : '')
const sort = ref('default')

const { addToCart, loadCart, state } = useCartStore()

const products = [
  {
    id: 1,
    title: 'Mat Ruj',
    price: 25,
    image: 'https://via.placeholder.com/300'
  },
  {
    id: 2,
    title: 'Fondöten',
    price: 40,
    image: 'https://via.placeholder.com/300'
  },
  {
    id: 3,
    title: 'Allık',
    price: 35,
    image: 'https://via.placeholder.com/300'
  }
]

watch(
  () => route.query.search,
  (newValue) => {
    search.value = newValue ? String(newValue) : ''
  }
)

const filteredProducts = computed(() => {
  return products.filter((product) =>
    product.title.toLowerCase().includes(search.value.toLowerCase())
  )
})

const visibleProducts = computed(() => {
  const list = [...filteredProducts.value]

  if (sort.value === 'priceAsc') {
    list.sort((a, b) => a.price - b.price)
  }

  if (sort.value === 'priceDesc') {
    list.sort((a, b) => b.price - a.price)
  }

  return list
})

async function handleAddToCart(product) {
  await addToCart(product)
  alert(`${product.title} sepete eklendi ✅`)
}

onMounted(async () => {
  if (!state.initialized) {
    await loadCart()
  }
})
</script>