<template>
    <div class="auth-card">
      <h2 class="auth-title">Login</h2>
      <p class="auth-subtitle">Hesabına giriş yap</p>
  
      <form class="auth-form" @submit.prevent="handleLogin">
        <label class="auth-label" for="login-email">E-posta</label>
        <input
          id="login-email"
          v-model="loginForm.email"
          type="email"
          class="auth-input"
          placeholder="ornek@mail.com"
          required
        />
  
        <label class="auth-label" for="login-password">Şifre</label>
        <div class="auth-password-wrap">
          <input
            id="login-password"
            v-model="loginForm.password"
            :type="showPassword ? 'text' : 'password'"
            class="auth-input"
            placeholder="Şifreni gir"
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
          {{ loading ? 'Giriş yapılıyor...' : 'Giriş Yap' }}
        </button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive } from 'vue'
  import { useRouter } from 'vue-router'
  import { loginUser } from '../services/authService'
  
  const router = useRouter()
  
  const showPassword = ref(false)
  const loading = ref(false)
  const error = ref('')
  const success = ref('')
  
  const loginForm = reactive({
    email: '',
    password: ''
  })
  
  function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email)
  }
  
  async function handleLogin() {
    error.value = ''
    success.value = ''
  
    if (!validateEmail(loginForm.email)) {
      error.value = 'Geçerli bir e-posta gir.'
      return
    }
  
    if (loginForm.password.trim().length < 6) {
      error.value = 'Şifre en az 6 karakter olmalı.'
      return
    }
  
    loading.value = true
  
    try {
      const result = await loginUser(loginForm)
      success.value = `${result.user.email} ile giriş başarılı.`
      setTimeout(() => {
        router.push('/')
      }, 700)
    } catch (err) {
      error.value = err.message || 'Giriş başarısız.'
    } finally {
      loading.value = false
    }
  }
  </script>