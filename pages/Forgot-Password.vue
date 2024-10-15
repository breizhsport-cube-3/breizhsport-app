<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary-300 to-secondary-300 p-6 sm:px-6 lg:px-8 animate-background">
    <div class="w-full max-w-md space-y-2 bg-white p-4 sm:p-8 rounded-xl shadow-2xl">
      <div class="flex flex-col items-center justify-center">
        <Logo />
        <h1 class="sm:mt-6 font-fredoka text-2xl sm:text-3xl md:text-4xl text-primary-600 text-center">
          Breizhsport
        </h1>
        <p class="mt-1 text-center text-xs sm:text-sm text-gray-600">
          {{ $t('auth.forgot_password.description') }}
        </p>
      </div>
      <form class="mt-4 sm:mt-8 space-y-4" @submit.prevent="handleForgotPassword">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">{{ $t('auth.forgot_password.email') }}</label>
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

        <div v-if="message" class="text-green-500 text-xs sm:text-sm text-center bg-green-100 p-2 rounded-md">
          {{ message }}
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
              <Icon name="feather:key" class="h-5 w-5 text-primary-500 group-hover:text-primary-400" />
            </span>
            {{ $t('auth.forgot_password.reset_password') }}
          </button>
        </div>
      </form>

      <div class="text-center text-xs sm:text-sm">
        <span class="text-gray-600">{{ $t('auth.forgot_password.remember_password') }}</span>
        <NuxtLink
          to="/login"
          class="ml-1 font-medium text-primary-600 hover:text-primary-500 transition duration-150 ease-in-out"
        >
          {{ $t('auth.forgot_password.sign_in') }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '~/composables/useAuth'

const email = ref('')
const message = ref('')
const error = ref('')
const { forgotPassword } = useAuth()

const handleForgotPassword = async () => {
  message.value = ''
  error.value = ''

  try {
    await forgotPassword(email.value)
    message.value = 'Password reset instructions have been sent to your email.'
  } catch (err) {
    console.error('Password reset request failed:', err)
    error.value = 'Failed to send password reset email. Please try again.'
  }
}
</script>
