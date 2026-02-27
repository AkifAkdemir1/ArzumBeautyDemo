<template>
  <section class="container auth-section">
    <div class="auth-shell">
      <div class="auth-tabs">
        <button
          type="button"
          class="auth-tab"
          :class="{ 'is-active': activeTab === 'login' }"
          @click="setTab('login')"
        >
          Login
        </button>

        <button
          type="button"
          class="auth-tab"
          :class="{ 'is-active': activeTab === 'signup' }"
          @click="setTab('signup')"
        >
          Signup
        </button>
      </div>

      <LoginForm v-if="activeTab === 'login'" />
      <SignupForm v-else />
    </div>
  </section>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import LoginForm from '../components/LoginForm.vue'
import SignupForm from '../components/SignupForm.vue'

const route = useRoute()
const router = useRouter()

const activeTab = ref(route.query.tab === 'signup' ? 'signup' : 'login')

watch(
  () => route.query.tab,
  (newTab) => {
    activeTab.value = newTab === 'signup' ? 'signup' : 'login'
  }
)

function setTab(tab) {
  activeTab.value = tab

  router.replace({
    path: '/auth',
    query: { tab }
  })
}
</script>