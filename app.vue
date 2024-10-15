<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuth } from '~/composables/useAuth'

const { checkAuth } = useAuth()

onMounted(async () => {
  await checkAuth()
})
</script>
