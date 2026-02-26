<template>
  <div class="product-card">
    <div class="image-wrapper">
      <img
        :src="product.image"
        :alt="product.title"
        class="pc-image"
      />
    </div>

    <div class="pc-body">
      <h3 class="pc-title">{{ product.title }}</h3>
      <div class="pc-price">{{ product.price }} ₺</div>

      <button
        type="button"
        class="btn"
        @click="$emit('add-to-cart', product)"
      >
        Sepete Ekle
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true
  }
})

defineEmits(['add-to-cart'])
</script>