<template>
  <div class="bg-white">
    <div class="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-fredoka text-gray-900 mb-8">
        {{ t("shop.cart.title") }}
      </h1>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <!-- Cart Items -->
        <div class="lg:col-span-8">
          <div
            v-if="cartStore.items.length === 0"
            class="text-center py-12 bg-gray-50 rounded-lg"
          >
            <i class="pi pi-shopping-cart text-5xl text-gray-300 mb-4"></i>
            <p class="text-gray-500">{{ t("shop.cart.empty") }}</p>
            <Button
              :label="t('shop.navigation.products')"
              icon="pi pi-arrow-left"
              class="mt-4"
              @click="router.push('/products')"
            />
          </div>

          <div v-else class="space-y-4">
            <div
              v-for="item in cartStore.items"
              :key="item.id"
              class="flex gap-6 p-4 bg-gray-50 rounded-lg"
            >
              <img
                :src="item.images[0]"
                :alt="item.name"
                class="w-24 h-24 object-cover rounded-lg"
              />
              <div class="flex-grow">
                <div class="flex justify-between">
                  <div>
                    <h3 class="font-medium text-lg">{{ item.name }}</h3>
                    <div class="text-sm text-gray-600 space-y-1 mt-1">
                      <p v-if="item.size">
                        {{ t("shop.product.size") }}: {{ item.size.label }}
                      </p>
                      <p v-if="item.color">
                        {{ t("shop.product.color.title") }}:
                        {{ t(`shop.product.color.variants.${item.color}`) }}
                      </p>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="font-medium text-lg">{{ item.price }}€</p>
                    <p class="text-sm text-gray-500">
                      {{ t("shop.cart.unit_price") }}: {{ item.price }}€
                    </p>
                  </div>
                </div>
                <div class="flex items-center justify-between mt-4">
                  <div class="flex items-center gap-2">
                    <Button
                      icon="pi pi-minus"
                      text
                      @click="updateQuantity(item, item.quantity - 1)"
                      :disabled="item.quantity <= 1"
                      class="p-2"
                    />
                    <span class="w-12 text-center">{{ item.quantity }}</span>
                    <Button
                      icon="pi pi-plus"
                      text
                      @click="updateQuantity(item, item.quantity + 1)"
                      class="p-2"
                    />
                  </div>
                  <Button
                    icon="pi pi-trash"
                    text
                    severity="danger"
                    @click="cartStore.removeItem(item.id)"
                    class="p-2"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="lg:col-span-4">
          <div class="bg-gray-50 rounded-lg p-6 sticky top-4">
            <h2 class="text-xl font-medium mb-4">
              {{ t("shop.cart.summary") }}
            </h2>

            <div class="space-y-3 mb-6">
              <div class="flex justify-between">
                <span class="text-gray-600">{{ t("shop.cart.subtotal") }}</span>
                <span>{{ cartStore.totalPrice.toFixed(2) }}€</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">{{ t("shop.cart.shipping") }}</span>
                <span class="text-primary-600">{{ t("shop.cart.free") }}</span>
              </div>
              <div class="h-px bg-gray-200 my-2"></div>
              <div class="flex justify-between font-medium text-lg">
                <span>{{ t("shop.cart.total") }}</span>
                <span>{{ cartStore.totalPrice.toFixed(2) }}€</span>
              </div>
            </div>

            <Button
              :label="t('shop.cart.checkout')"
              icon="pi pi-check"
              severity="success"
              class="w-full"
              :disabled="cartStore.items.length === 0"
              @click="router.push('/checkout')"
            />

            <Button
              :label="t('shop.navigation.products')"
              icon="pi pi-arrow-left"
              text
              class="w-full mt-2"
              @click="router.push('/products')"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useCartStore } from "../stores/cart";
import { useI18n } from "vue-i18n";
import Button from "primevue/button";

const router = useRouter();
const cartStore = useCartStore();
const { t } = useI18n();

const updateQuantity = (item, newQuantity) => {
  if (newQuantity >= 1) {
    cartStore.updateQuantity(item.id, newQuantity);
  }
};
</script>
