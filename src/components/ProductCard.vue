<template>
  <div
    class="border border-surface-200 dark:border-surface-700 rounded mx-2 mb-4 p-4 h-full"
  >
    <div class="flex flex-col h-full">
      <div class="mb-4 flex-shrink-0">
        <router-link
          :to="`/product/${product.id}`"
          class="relative aspect-square w-full block"
        >
          <img
            :src="product.images[0]"
            :alt="product.name[currentLocale]"
            class="w-full h-full object-cover object-top rounded"
          />
          <span
            v-if="product.oldPrice"
            class="absolute top-2 right-2 text-xs font-medium text-green-600 bg-green-50 opacity-75 px-2 py-1 rounded"
          >
            -{{ discountPercentage }}%
          </span>
        </router-link>
      </div>
      <div class="flex flex-col flex-grow justify-between">
        <div
          class="font-medium truncate max-w-full"
          :title="product.name[currentLocale]"
        >
          {{ product.name[currentLocale] }}
        </div>
        <div class="flex justify-between items-center">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="flex flex-row gap-1 items-center">
                <span class="text-sm font-medium text-primary-600">
                  {{ product.price }}€
                </span>
                <span
                  v-if="product.oldPrice"
                  class="text-xs text-gray-500 line-through"
                >
                  {{ product.oldPrice }}€
                </span>
              </div>
            </div>
          </div>
          <span class="flex gap-4">
            <WishlistButton
              :product="product"
              @showLogin="$emit('showLogin')"
            />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import WishlistButton from "./WishlistButton.vue";
import { RouterLink } from "vue-router";

const { locale } = useI18n();
const currentLocale = computed(() => locale.value);

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const discountPercentage = computed(() => {
  if (!props.product.oldPrice) return 0;
  return Math.round(((props.product.oldPrice - props.product.price) / props.product.oldPrice) * 100);
});

defineEmits(["showLogin"]);
</script>
