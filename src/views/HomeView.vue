<template>
  <section class="container">
    <div class="hero">
      <h2>Güzelliğin Yeni Adresi</h2>
      <p>
        Makyaj, cilt bakımı ve kişisel bakım ürünlerini keşfet.
        En sevilen ürünler tek yerde.
      </p>

      <RouterLink to="/products" class="btn hero-btn">
        Alışverişe Başla
      </RouterLink>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
