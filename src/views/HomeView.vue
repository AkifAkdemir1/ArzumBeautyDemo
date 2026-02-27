<template>
    <section class="container home-layout">
      <!-- TOP SLIDER -->
      <section class="section-card">
        <div class="section-head">
          <div>
            <h2 class="section-title">Öne Çıkanlar</h2>
            <p class="section-subtitle">En popüler ürünleri keşfet</p>
          </div>
  
          <div class="slider-controls">
            <button type="button" class="slider-btn" @click="scrollSlider(topSlider, -1)">
              ‹
            </button>
            <button type="button" class="slider-btn" @click="scrollSlider(topSlider, 1)">
              ›
            </button>
          </div>
        </div>
  
        <div
          ref="topSlider"
          class="slider-track"
          @mouseenter="stopAutoScroll('top')"
          @mouseleave="startAutoScroll('top')"
        >
          <div
            v-for="product in topSliderProducts"
            :key="product.id"
            class="slide-card"
          >
            <div class="slide-image-wrap">
              <img :src="product.image" :alt="product.title" class="slide-image" />
            </div>
  
            <div class="slide-body">
              <h3 class="slide-title">{{ product.title }}</h3>
              <p class="slide-price">{{ product.price }} ₺</p>
  
              <button
                type="button"
                class="btn slider-add-btn"
                @click="handleAddToCart(product)"
              >
                Sepete Ekle
              </button>
            </div>
          </div>
        </div>
      </section>
  
      <!-- GRID -->
      <section class="section-card">
        <div class="section-head section-head-no-controls">
          <div>
            <h2 class="section-title">Seçili Ürünler</h2>
            <p class="section-subtitle">Tam 4 ürünlük vitrin alanı</p>
          </div>
        </div>
  
        <div class="home-grid">
          <div
            v-for="product in gridProducts"
            :key="product.id"
            class="grid-card"
          >
            <div class="grid-image-wrap">
              <img :src="product.image" :alt="product.title" class="grid-image" />
            </div>
  
            <div class="grid-body">
              <h3 class="grid-title">{{ product.title }}</h3>
              <p class="grid-price">{{ product.price }} ₺</p>
  
              <button
                type="button"
                class="btn"
                @click="handleAddToCart(product)"
              >
                Sepete Ekle
              </button>
            </div>
          </div>
        </div>
      </section>
  
      <!-- BOTTOM SLIDER -->
      <section class="section-card">
        <div class="section-head">
          <div>
            <h2 class="section-title">Yeni Gelenler</h2>
            <p class="section-subtitle">Son eklenen ürünleri incele</p>
          </div>
  
          <div class="slider-controls">
            <button type="button" class="slider-btn" @click="scrollSlider(bottomSlider, -1)">
              ‹
            </button>
            <button type="button" class="slider-btn" @click="scrollSlider(bottomSlider, 1)">
              ›
            </button>
          </div>
        </div>
  
        <div
          ref="bottomSlider"
          class="slider-track"
          @mouseenter="stopAutoScroll('bottom')"
          @mouseleave="startAutoScroll('bottom')"
        >
          <div
            v-for="product in bottomSliderProducts"
            :key="product.id"
            class="slide-card"
          >
            <div class="slide-image-wrap">
              <img :src="product.image" :alt="product.title" class="slide-image" />
            </div>
  
            <div class="slide-body">
              <h3 class="slide-title">{{ product.title }}</h3>
              <p class="slide-price">{{ product.price }} ₺</p>
  
              <button
                type="button"
                class="btn slider-add-btn"
                @click="handleAddToCart(product)"
              >
                Sepete Ekle
              </button>
            </div>
          </div>
        </div>
      </section>
    </section>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue'
  import { fetchHomeProducts } from '../services/productService'
  import { useCartStore } from '../stores/cartStore'
  
  const { addToCart } = useCartStore()
  
  const topSlider = ref(null)
  const bottomSlider = ref(null)
  
  const topSliderProducts = ref([])
  const gridProducts = ref([])
  const bottomSliderProducts = ref([])
  
  let topInterval = null
  let bottomInterval = null
  
  function scrollSlider(targetRef, direction) {
    if (!targetRef.value) return
  
    targetRef.value.scrollBy({
      left: direction * 320,
      behavior: 'smooth'
    })
  }
  
  function autoMove(targetRef) {
    if (!targetRef.value) return
  
    const el = targetRef.value
    const maxScrollLeft = el.scrollWidth - el.clientWidth
  
    if (el.scrollLeft >= maxScrollLeft - 5) {
      el.scrollTo({
        left: 0,
        behavior: 'auto'
      })
      return
    }
  
    el.scrollBy({
      left: 320,
      behavior: 'smooth'
    })
  }
  
  function startAutoScroll(type) {
    if (type === 'top') {
      stopAutoScroll('top')
      topInterval = setInterval(() => {
        autoMove(topSlider)
      }, 2500)
    }
  
    if (type === 'bottom') {
      stopAutoScroll('bottom')
      bottomInterval = setInterval(() => {
        autoMove(bottomSlider)
      }, 3000)
    }
  }
  
  function stopAutoScroll(type) {
    if (type === 'top' && topInterval) {
      clearInterval(topInterval)
      topInterval = null
    }
  
    if (type === 'bottom' && bottomInterval) {
      clearInterval(bottomInterval)
      bottomInterval = null
    }
  }
  
  async function handleAddToCart(product) {
    await addToCart(product)
  }
  
  onMounted(async () => {
    try {
      const data = await fetchHomeProducts()
      topSliderProducts.value = data.featured
      gridProducts.value = data.grid
      bottomSliderProducts.value = data.newest
    } catch (error) {
      console.error('Home products yüklenemedi:', error)
    }
  
    startAutoScroll('top')
    startAutoScroll('bottom')
  })
  
  onBeforeUnmount(() => {
    stopAutoScroll('top')
    stopAutoScroll('bottom')
  })
  </script>