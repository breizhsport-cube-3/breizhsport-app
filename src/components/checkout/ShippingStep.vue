<template>
  <div class="bg-gray-50 shadow-sm rounded-lg p-6">
    <h2 class="text-lg font-medium mb-4">{{ t("checkout.shipping.method.title") }}</h2>
    
    <div class="space-y-6">
      <ShippingMethodSelector 
        :model-value="selectedMethod"
        @update:model-value="onMethodSelect"
        :cart-total="cartStore.totalPrice"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useCartStore } from '../../stores/cart';
import { useCheckoutStore } from '../../stores/checkout';
import ShippingMethodSelector from './ShippingMethodSelector.vue';

const { t } = useI18n();
const cartStore = useCartStore();
const checkoutStore = useCheckoutStore();
const emit = defineEmits(['next', 'prev', 'valid']);

const selectedMethod = ref(checkoutStore.selectedShippingMethod);

emit('valid', selectedMethod.value !== null);

const onMethodSelect = (method) => {
  selectedMethod.value = method;
  checkoutStore.setShippingMethod(method);
  emit('valid', method !== null);
};

watch(selectedMethod, (newMethod) => {
  emit('valid', newMethod !== null);
}, { immediate: true });
</script> 