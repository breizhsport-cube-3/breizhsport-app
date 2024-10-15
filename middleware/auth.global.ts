import { useAuth } from '~/composables/useAuth'

export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated } = useAuth()

  // Redirect from "/" to "/login" or "/home" based on auth status
  if (to.path === '/') {
    return navigateTo(isAuthenticated.value ? '/home' : '/login')
  }

  // Public routes that don't require authentication
  const publicRoutes = ['/login', '/register', '/forgot-password']

  // Redirect authenticated users away from public routes
  if (isAuthenticated.value && publicRoutes.includes(to.path)) {
    return navigateTo('/home')
  }

  // Redirect unauthenticated users away from protected routes
  if (!isAuthenticated.value && !publicRoutes.includes(to.path)) {
    return navigateTo('/login')
  }
})
