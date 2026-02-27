<template>
    <div class="auth-card">
      <h2 class="auth-title">Signup</h2>
      <p class="auth-subtitle">Yeni hesap oluştur</p>
  
      <form class="auth-form" @submit.prevent="handleSignup">
        <label class="auth-label" for="signup-name">Ad Soyad</label>
        <input
          id="signup-name"
          v-model="signupForm.name"
          type="text"
          class="auth-input"
          placeholder="Ad Soyad"
          required
        />
  
        <label class="auth-label" for="signup-email">E-posta</label>
        <input
          id="signup-email"
          v-model="signupForm.email"
          type="email"
          class="auth-input"
          placeholder="ornek@mail.com"
          required
        />
  
        <label class="auth-label" for="signup-password">Şifre</label>
        <div class="auth-password-wrap">
          <input
            id="signup-password"
            v-model="signupForm.password"
            :type="showPassword ? 'text' : 'password'"
            class="auth-input"
            placeholder="Şifre oluştur"
            required
          />
          <button
            type="button"
            class="auth-toggle-btn"
            @click="showPassword = !showPassword"
          >
            {{ showPassword ? 'Gizle' : 'Göster' }}
          </button>
        </div>
  
        <p v-if="error" class="auth-error">{{ error }}</p>
        <p v-if="success" class="auth-success">{{ success }}</p>
  
        <button type="submit" class="btn auth-btn" :disabled="loading">
          {{ loading ? 'Kayıt oluşturuluyor...' : 'Kayıt Ol' }}
        </button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive } from 'vue'
  import { signupUser } from '../services/authService'
  
  const showPassword = ref(false)
  const loading = ref(false)
  const error = ref('')
  const success = ref('')
  
  const signupForm = reactive({
    name: '',
    email: '',
    password: ''
  })
  
  function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email)
  }
  
  async function handleSignup() {
    error.value = ''
    success.value = ''
  
    if (signupForm.name.trim().length < 2) {
      error.value = 'Ad Soyad en az 2 karakter olmalı.'
      return
    }
  
    if (!validateEmail(signupForm.email)) {
      error.value = 'Geçerli bir e-posta gir.'
      return
    }
  
    if (signupForm.password.trim().length < 6) {
      error.value = 'Şifre en az 6 karakter olmalı.'
      return
    }
  
    loading.value = true
  
    try {
      const result = await signupUser(signupForm)
      success.value = `${result.user.name} için kayıt başarılı.`
    } catch (err) {
      error.value = err.message || 'Kayıt başarısız.'
    } finally {
      loading.value = false
    }
  }
  </script>