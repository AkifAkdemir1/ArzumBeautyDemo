
<template>
  <section class="container auth-section">
    <div class="auth-shell">
      <div class="auth-tabs">
        <button
          type="button"
          class="auth-tab"
          :class="{ 'is-active': activeTab === 'login' }"
          @click="switchTab('login')"
        >
          Login
        </button>

        <button
          type="button"
          class="auth-tab"
          :class="{ 'is-active': activeTab === 'signup' }"
          @click="switchTab('signup')"
        >
          Signup
        </button>
      </div>

      <div class="auth-grid">
        <div class="auth-card" :class="{ 'auth-card-muted': activeTab !== 'login' }">
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
                :type="showLoginPassword ? 'text' : 'password'"
                class="auth-input"
                placeholder="Şifreni gir"
                required
              />
              <button
                type="button"
                class="auth-toggle-btn"
                @click="showLoginPassword = !showLoginPassword"
              >
                {{ showLoginPassword ? 'Gizle' : 'Göster' }}
              </button>
            </div>

            <p v-if="loginError" class="auth-error">{{ loginError }}</p>
            <p v-if="loginSuccess" class="auth-success">{{ loginSuccess }}</p>

            <button type="submit" class="btn auth-btn" :disabled="loadingLogin">
              {{ loadingLogin ? 'Giriş yapılıyor...' : 'Giriş Yap' }}
            </button>
          </form>
        </div>

        <div class="auth-card" :class="{ 'auth-card-muted': activeTab !== 'signup' }">
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
                :type="showSignupPassword ? 'text' : 'password'"
                class="auth-input"
                placeholder="Şifre oluştur"
                required
              />
              <button
                type="button"
                class="auth-toggle-btn"
                @click="showSignupPassword = !showSignupPassword"
              >
                {{ showSignupPassword ? 'Gizle' : 'Göster' }}
              </button>
            </div>

            <p v-if="signupError" class="auth-error">{{ signupError }}</p>
            <p v-if="signupSuccess" class="auth-success">{{ signupSuccess }}</p>

            <button type="submit" class="btn auth-btn" :disabled="loadingSignup">
              {{ loadingSignup ? 'Kayıt oluşturuluyor...' : 'Kayıt Ol' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { loginUser, signupUser } from '../services/authService'

const router = useRouter()

const activeTab = ref('login')
const showLoginPassword = ref(false)
const showSignupPassword = ref(false)
const loadingLogin = ref(false)
const loadingSignup = ref(false)
const loginError = ref('')
const signupError = ref('')
const loginSuccess = ref('')
const signupSuccess = ref('')

const loginForm = reactive({
  email: '',
  password: ''
})

const signupForm = reactive({
  name: '',
  email: '',
  password: ''
})

function switchTab(tab) {
  activeTab.value = tab
}

function validateEmail(email) {
  return /\S+@\S+\.\S+/.test(email)
}

async function handleLogin() {
  loginError.value = ''
  loginSuccess.value = ''

  if (!validateEmail(loginForm.email)) {
    loginError.value = 'Geçerli bir e-posta gir.'
    return
  }

  if (loginForm.password.trim().length < 6) {
    loginError.value = 'Şifre en az 6 karakter olmalı.'
    return
  }

  loadingLogin.value = true

  try {
    const result = await loginUser(loginForm)
    loginSuccess.value = `${result.user.email} ile giriş başarılı.`
    setTimeout(() => {
      router.push('/')
    }, 700)
  } catch (error) {
    loginError.value = error.message || 'Giriş başarısız.'
  } finally {
    loadingLogin.value = false
  }
}

async function handleSignup() {
  signupError.value = ''
  signupSuccess.value = ''

  if (signupForm.name.trim().length < 2) {
    signupError.value = 'Ad Soyad en az 2 karakter olmalı.'
    return
  }

  if (!validateEmail(signupForm.email)) {
    signupError.value = 'Geçerli bir e-posta gir.'
    return
  }

  if (signupForm.password.trim().length < 6) {
    signupError.value = 'Şifre en az 6 karakter olmalı.'
    return
  }

  loadingSignup.value = true

  try {
    const result = await signupUser(signupForm)
    signupSuccess.value = `${result.user.name} için kayıt başarılı.`
    activeTab.value = 'login'
  } catch (error) {
    signupError.value = error.message || 'Kayıt başarısız.'
  } finally {
    loadingSignup.value = false
  }
}
</script>