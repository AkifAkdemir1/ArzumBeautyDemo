<template>
  <div class="product-card">
    <img :src="product.image" alt="" />
    <h3>{{ product.name }}</h3>
    <p>₼{{ product.price }}</p>
  </div>
</template>

<script setup>
defineProps({
  product: Object
})
</script>