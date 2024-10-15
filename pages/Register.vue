<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary-300 to-secondary-300 p-6 sm:px-6 lg:px-8 animate-background">
    <div class="w-full max-w-md space-y-2 bg-white p-4 sm:p-8 rounded-xl shadow-2xl">
      <div class="flex flex-col items-center justify-center">
        <Logo />
        <h1 class="sm:mt-6 font-fredoka text-2xl sm:text-3xl md:text-4xl text-primary-600 text-center">
          Breizhsport
        </h1>
        <p class="mt-1 text-center text-xs sm:text-sm text-gray-600">
          {{ $t('auth.register.description') }}
        </p>
      </div>
      <form class="mt-4 sm:mt-8 space-y-4" @submit.prevent="handleRegister">
        <div class="space-y-2">
          <div class="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <div class="w-full sm:w-1/2">
              <label for="firstName" class="block text-sm font-medium text-gray-700">{{ $t('auth.register.first_name') }}</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                v-model="firstName"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-sm"
                placeholder="John"
              />
            </div>
            <div class="w-full sm:w-1/2">
              <label for="lastName" class="block text-sm font-medium text-gray-700">{{ $t('auth.register.last_name') }}</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                v-model="lastName"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-sm"
                placeholder="Doe"
              />
            </div>
          </div>
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">{{ $t('auth.register.email') }}</label>
            <input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              v-model="email"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-sm"
              placeholder="john.doe@example.com"
            />
          </div>
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">{{ $t('auth.register.password') }}</label>
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="new-password"
              required
              v-model="password"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-sm"
              placeholder="••••••••"
            />
          </div>
          <div>
            <label for="passwordConfirmation" class="block text-sm font-medium text-gray-700">{{ $t('auth.register.password_confirmation') }}</label>
            <input
              id="passwordConfirmation"
              name="passwordConfirmation"
              type="password"
              autocomplete="new-password"
              required
              v-model="passwordConfirmation"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-sm"
              placeholder="••••••••"
            />
          </div>
        </div>

        <div v-if="error" class="text-red-500 text-xs sm:text-sm text-center bg-red-100 p-2 rounded-md">
          {{ error }}
        </div>

        <div>
          <button
            type="submit"
            class="group relative flex w-full justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white transition duration-300 ease-in-out hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
              <Icon name="feather:user-plus" class="h-5 w-5 text-primary-500 group-hover:text-primary-400" />
            </span>
            {{ $t('auth.register.sign_up') }}
          </button>
        </div>
      </form>

      <div class="text-center text-xs sm:text-sm">
        <span class="text-gray-600">{{ $t('auth.register.already_have_account') }}</span>
        <NuxtLink
          to="/login"
          class="ml-1 font-medium text-primary-600 hover:text-primary-500 transition duration-150 ease-in-out"
        >
          {{ $t('auth.register.sign_in') }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '~/composables/useAuth'

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const passwordConfirmation = ref('')
const error = ref('')
const router = useRouter()
const { login } = useAuth()

const handleRegister = async () => {
  error.value = ''

  if (password.value !== passwordConfirmation.value) {
    error.value = 'Passwords do not match'
    return
  }

  try {
    // Implement registration logic here
    console.log('Registering with:', firstName.value, lastName.value, email.value, password.value)
    // After successful registration, log the user in and redirect to home
    await login(email.value, password.value)
    await router.push('/home')
  } catch (err) {
    console.error('Registration failed:', err)
    error.value = 'Registration failed. Please try again.'
  }
}
</script>
