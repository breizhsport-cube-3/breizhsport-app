<template>
  <div class="bg-gray-50 shadow-sm rounded-lg p-6 sticky top-4">
    <h2 class="text-lg font-medium mb-4">
      {{ t("checkout.summary.title") }}
    </h2>

    <!-- Liste des produits -->
    <div v-if="cartItems.length > 0" class="space-y-4 mb-6">
      <div v-for="item in cartItems" 
           :key="`${item.id}-${item.size}-${item.color}`" 
           class="flex gap-4 py-2 border-b border-gray-100 last:border-b-0">
        <img :src="item.images[0]" 
             :alt="item.name[currentLocale]" 
             class="w-16 h-16 object-cover rounded-md" />
        <div class="flex-1">
          <h3 class="font-medium text-sm truncate">{{ item.name[currentLocale] }}</h3>
          <div class="text-xs text-gray-600 space-y-1">
            <div v-if="item.size" class="flex items-center gap-2">
              <span>{{ t("shop.product.size") }}:</span>
              <span class="font-medium">{{ item.size }}</span>
            </div>
            <div v-if="item.color" class="flex items-center gap-2">
              <span>{{ t("shop.product.color.title") }}:</span>
              <div class="flex items-center gap-1">
                <span 
                  class="w-3 h-3 rounded-full inline-block"
                  :style="{ backgroundColor: item.colorData.value }"
                ></span>
                <span class="font-medium">{{ item.colorData.name[currentLocale] }}</span>
              </div>
            </div>
            <div class="text-gray-500">
              {{ t("shop.cart.unit_price") }}: {{ item.price }}€ × {{ item.quantity }}
            </div>
          </div>
        </div>
        <div class="text-sm font-medium">
          {{ (item.price * item.quantity).toFixed(2) }}€
        </div>
      </div>
    </div>

    <!-- Résumé des coûts -->
    <div v-if="cartItems.length > 0" class="space-y-3">
      <div class="flex justify-between text-sm">
        <span class="text-gray-600">{{ t("checkout.summary.subtotal") }}</span>
        <span>{{ cartTotal.toFixed(2) }}€</span>
      </div>
      <div class="flex justify-between text-sm py-2">
        <span class="text-gray-600">{{ t("checkout.summary.shipping") }}</span>
        <span v-if="selectedShippingMethod">
          {{ selectedShippingMethod.price }}€
        </span>
        <span v-else class="text-gray-500 italic">
          {{ t("checkout.summary.shipping_calculated_later") }}
        </span>
      </div>
      <div class="h-px bg-gray-200 my-2"></div>
      <div class="flex justify-between font-medium text-lg">
        <span>{{ t("checkout.summary.total") }}</span>
        <span>{{ totalWithShipping }}€</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();
const currentLocale = computed(() => locale.value);

const props = defineProps({
  selectedShippingMethod: {
    type: Object,
    default: null
  },
  cartItems: {
    type: Array,
    required: true
  },
  cartTotal: {
    type: Number,
    required: true
  }
});

const totalWithShipping = computed(() => {
  const shippingCost = props.selectedShippingMethod?.price || 0;
  return (props.cartTotal + shippingCost).toFixed(2);
});
</script>
