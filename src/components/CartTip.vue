<template>
  <div
    class="absolute right-0 mt-2 w-64 bg-red-500 text-white rounded-lg shadow-lg z-50 p-4"
  >
    <h3 class="text-lg font-semibold mb-2">Your Cart (Debug)</h3>
    <p>If you can see this, the CartTip is rendering correctly.</p>
    <button
      @click="$emit('close')"
      class="mt-2 bg-white text-red-500 px-3 py-1 rounded"
    >
      Close
    </button>
  </div>
</template>

<script setup lang="ts">
defineEmits(["close"]);
console.log("CartTip component mounted");
</script>
