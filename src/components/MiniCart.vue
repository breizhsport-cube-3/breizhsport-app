<template>
  <div class="flex flex-col">
    <!-- Cart Items -->
    <div class="max-h-[400px] overflow-y-auto">
      <div v-if="cartStore.items.length === 0" class="text-center py-8">
        <i class="pi pi-shopping-cart text-4xl text-gray-300 mb-4"></i>
        <h3 class="text-xl text-gray-600 mb-6">{{ t("shop.cart.empty") }}</h3>
        <router-link
          to="/products"
          class="inline-flex items-center text-primary-500 hover:text-primary-600"
        >
          <i class="pi pi-arrow-left mr-2"></i>
          {{ t("shop.navigation.products") }}
        </router-link>
      </div>

      <div v-else class="space-y-3">
        <div
          v-for="item in cartStore.items"
          :key="item.id"
          class="flex items-center p-3 bg-gray-50 rounded-lg"
        >
          <router-link :to="`/product/${item.id}`" class="flex-shrink-0">
            <img
              :src="item.images[0]"
              :alt="item.name"
              class="w-14 h-14 object-cover rounded hover:opacity-80 transition-opacity"
            />
          </router-link>
          <div class="ml-3 flex-grow">
            <router-link :to="`/product/${item.id}`">
              <h3 class="font-medium text-sm hover:text-primary-600">
                {{ item.name }}
              </h3>
            </router-link>
            <div class="text-xs text-gray-600 space-y-0.5">
              <p>{{ item.price }}€</p>
              <p v-if="item.size">
                {{ t("shop.product.size") }}: {{ item.size }}
              </p>
              <p v-if="item.color">
                {{ t("shop.product.color.title") }}:
                {{ t(`shop.product.color.variants.${item.color}`) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Cart Summary -->
    <div class="border-t mt-3 pt-3">
      <div class="space-y-2 mb-4">
        <div class="flex justify-between text-gray-600">
          <span>{{ t("shop.cart.subtotal") }}</span>
          <span>{{ cartStore.totalPrice.toFixed(2) }}€</span>
        </div>
        <div class="flex justify-between text-gray-600">
          <span>{{ t("shop.cart.shipping") }}</span>
          <span class="text-primary-500">{{ t("shop.cart.free") }}</span>
        </div>
        <div class="flex justify-between font-semibold text-lg">
          <span>{{ t("shop.cart.total") }}</span>
          <span>{{ cartStore.totalPrice.toFixed(2) }}€</span>
        </div>
      </div>

      <div class="flex flex-col gap-2">
        <Button
          :label="t('shop.cart.view_cart')"
          outlined
          class="w-full justify-center"
          @click="router.push('/cart')"
        >
          <template #icon>
            <i class="pi pi-shopping-cart text-primary-500 mr-2"></i>
          </template>
        </Button>
        <Button
          :label="t('shop.cart.checkout')"
          severity="success"
          class="w-full justify-center bg-primary-500"
          :disabled="cartStore.items.length === 0"
          @click="router.push('/checkout')"
        >
          <template #icon>
            <i class="pi pi-check text-white mr-2"></i>
          </template>
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from "../stores/cart";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import Button from "primevue/button";

const router = useRouter();
const cartStore = useCartStore();
const { t } = useI18n();
</script>
