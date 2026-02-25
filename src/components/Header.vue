<template>
  <header class="header">
    <div class="container">
      <RouterLink to="/" class="logo">ArzumBeauty</RouterLink>

      <nav>
        <RouterLink to="/">Ana Sayfa</RouterLink>
        <RouterLink to="/products">Ürünler</RouterLink>
        <RouterLink to="/category/makyaj">Kategoriler</RouterLink>
        <RouterLink to="/cart">Sepet</RouterLink>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>