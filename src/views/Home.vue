<template>
  <div>
    <!-- Hero Section -->
    <div class="bg-gradient-to-b from-primary-50 to-white">
      <div class="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-4xl font-fredoka text-gray-900 sm:text-5xl">
            Discover Breton Sports
          </h2>
          <p class="mt-4 text-xl text-gray-600">
            High-quality sports equipment for traditional Breton games
          </p>
          <div class="mt-8">
            <router-link
              to="/products"
              class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
            >
              Shop Now
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Featured Categories -->
    <div class="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="category in categories"
          :key="category.id"
          class="relative rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
        >
          <img
            :src="category.image"
            :alt="category.name"
            class="w-full h-64 object-cover"
          />
          <div
            class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center"
          >
            <h3 class="text-white text-xl font-fredoka">{{ category.name }}</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const showCart = ref(false);
const cartCount = ref(0);

const categories = ref([
  {
    id: 1,
    name: "Gouren Equipment",
    image: "/images/categories/gouren.jpg",
  },
  {
    id: 2,
    name: "Penvic Equipment",
    image: "/images/categories/penvic.jpg",
  },
  {
    id: 3,
    name: "Kevren Equipment",
    image: "/images/categories/kevren.jpg",
  },
]);
</script>
