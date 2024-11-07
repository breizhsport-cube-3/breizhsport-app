<template>
  <div class="logo-container">
    <img :src="logoPath" alt="Logo" class="logo" />
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  dark: {
    type: Boolean,
    default: false,
  },
});

const logoPath = computed(() =>
  props.dark
    ? new URL("../assets/images/logo-dark.svg", import.meta.url).href
    : new URL("../assets/images/logo-light.svg", import.meta.url).href,
);
</script>

<style scoped>
.logo {
  width: 50px;
}
</style>
