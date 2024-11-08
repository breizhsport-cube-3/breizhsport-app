<template>
  <div class="bg-gray-50 shadow-sm rounded-lg p-6">
    <div class="text-center">
      <i class="pi pi-check-circle text-6xl text-green-500 mb-4"></i>
      <h2 class="text-2xl font-medium mb-2">
        {{ t("checkout.confirmation.thank_you") }}
      </h2>
      <p class="text-gray-600 mb-6">
        {{ t("checkout.confirmation.order_number") }}: #{{ orderId }}
      </p>

      <div class="text-left max-w-2xl mx-auto space-y-4">
        <div>
          <h3 class="font-medium mb-2">
            {{ t("checkout.confirmation.order_details") }}
          </h3>
          <p class="text-gray-600">
            {{ t("checkout.confirmation.order_date") }}: {{ orderDate }}
          </p>
          <p class="text-gray-600">
            {{ t("checkout.confirmation.estimated_delivery") }}:
            {{ estimatedDelivery }}
          </p>
        </div>

        <!-- Autres détails de la commande -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useCartStore } from "../../stores/cart";
import { useCheckoutStore } from "../../stores/checkout";
import { formatDate, formatDeliveryEstimate } from "../../utils/date";

const { t, locale } = useI18n();
const cartStore = useCartStore();
const checkoutStore = useCheckoutStore();

const props = defineProps({
  orderId: {
    type: String,
    required: true,
  },
});

const estimatedDelivery = computed(() => {
  const method = checkoutStore.selectedShippingMethod;
  if (!method?.estimatedDays) return "";

  return formatDeliveryEstimate(method.estimatedDays, locale.value);
});

const orderDate = computed(() => {
  return formatDate(new Date(), locale.value);
});

onMounted(() => {
  // Vider le panier une fois la commande confirmée
  cartStore.$reset();
});
</script>
