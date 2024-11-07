<template>
  <div class="min-h-screen flex flex-col">
    <TopBar />
    <main class="flex-1">
      <router-view></router-view>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import TopBar from "./components/TopBar.vue";
import Footer from "./components/Footer.vue";
</script>
