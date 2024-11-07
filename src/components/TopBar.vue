<template>
  <nav class="bg-white shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <router-link to="/" class="flex items-center">
            <Logo />
            <h1 class="ml-2 text-xl font-fredoka text-primary-600">
              Breizhsport
            </h1>
          </router-link>
        </div>
        <div class="flex items-center space-x-4">
          <router-link
            to="/products"
            class="text-gray-600 hover:text-primary-600"
          >
            {{ t("shop.navigation.products") }}
          </router-link>
          <div class="relative inline-block">
            <button
              ref="cartButton"
              @click="toggleCart"
              class="text-gray-600 hover:text-primary-600 p-2"
            >
              <i class="pi pi-shopping-cart"></i>
              <span
                v-if="cartStore.totalItems"
                class="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
              >
                {{ cartStore.totalItems }}
              </span>
            </button>

            <OverlayPanel
              ref="op"
              class="w-[400px]"
              :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
              :showCloseIcon="true"
              appendTo="body"
              :baseZIndex="1000"
              :autoZIndex="true"
            >
              <MiniCart />
            </OverlayPanel>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "../stores/cart";
import { useI18n } from "vue-i18n";
import Logo from "./Logo.vue";
import MiniCart from "./MiniCart.vue";
import OverlayPanel from "primevue/overlaypanel";

const router = useRouter();
const cartStore = useCartStore();
const { t } = useI18n();
const op = ref();

const toggleCart = (event) => {
  event.stopPropagation();
  op.value.toggle(event);
};
</script>

<style scoped>
:deep(.p-overlaypanel) {
  margin-top: 0.5rem;
}

:deep(.p-overlaypanel:before),
:deep(.p-overlaypanel:after) {
  margin-left: -0.5rem;
}
</style>
