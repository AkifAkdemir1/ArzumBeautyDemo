<template>
  <section class="container">
    <h2>Tüm Ürünler</h2>
    <div class="grid">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </section>
</template>

<script setup>
import ProductCard from '../components/ProductCard.vue'

const products = [
  { id: 1, name: 'Mat Ruj', price: 25, image: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Fondöten', price: 40, image: 'https://via.placeholder.com/150' },
]
</script>