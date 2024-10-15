import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCookie } from 'nuxt/app'

export const useAuth = () => {
  const user = ref(null)
  const token = useCookie('auth_token')
  const router = useRouter()

  const isAuthenticated = computed(() => !!user.value)

  const login = async (email: string, password: string) => {
    try {
      // Replace this with your actual API call
      const response = await $fetch('/api/login', {
        method: 'POST',
        body: { email, password },
      })

      user.value = response.user
      token.value = response.token

      // Redirect to dashboard after successful login
      router.push('/dashboard')
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    }
  }

  const logout = () => {
    user.value = null
    token.value = null
    router.push('/login')
  }

  const checkAuth = async () => {
    if (token.value) {
      try {
        // Replace this with your actual API call to verify the token
        const response = await $fetch('/api/verify-token', {
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        })
        user.value = response.user
      } catch (error) {
        console.error('Token verification failed:', error)
        token.value = null
      }
    }
  }

  const redirectIfAuthenticated = () => {
    if (isAuthenticated.value) {
      router.push('/home')
    }
  }

  return {
    user,
    isAuthenticated,
    login,
    logout,
    checkAuth,
    redirectIfAuthenticated,
  }
}
