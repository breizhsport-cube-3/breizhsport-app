<template>
  <Button
    icon="pi pi-heart"
    severity="secondary"
    outlined
    class="p-button-sm"
    @click="handleWishlist"
  />
</template>

<script setup>
import { useAuthStore } from "../stores/auth";
import Button from "primevue/button";

const authStore = useAuthStore();
const emit = defineEmits(["showLogin"]);

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const handleWishlist = () => {
  if (!authStore.isAuthenticated) {
    emit("showLogin");
    return;
  }
  // Add wishlist logic here
};
</script>
