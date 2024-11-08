<template>
  <div class="space-y-6">
    <!-- Sélection du transporteur -->
    <div class="flex gap-4 overflow-x-auto pb-4">
      <div
        v-for="(carrier, id) in shippingData.carriers"
        :key="id"
        @click="selectCarrier(id)"
        class="flex flex-col items-center p-4 border rounded-lg cursor-pointer min-w-[120px]"
        :class="{ 'border-primary-600 bg-primary-50': selectedCarrier === id }"
      >
        <img
          :src="carrierLogos[id]"
          :alt="carrier.name"
          class="h-12 object-contain mb-2"
        />
        <span class="text-sm font-medium">{{ carrier.name }}</span>
      </div>
    </div>

    <!-- Méthodes de livraison du transporteur sélectionné -->
    <div v-if="selectedCarrier" class="space-y-4">
      <div
        v-for="method in currentCarrierMethods"
        :key="method.id"
        @click="selectMethod(method)"
        class="p-4 border rounded-lg cursor-pointer"
        :class="{
          'border-primary-600 bg-primary-50': isMethodSelected(method),
        }"
      >
        <div class="flex justify-between items-start mb-2">
          <div>
            <h3 class="font-medium">{{ method.name }}</h3>
            <p class="text-sm text-gray-600">{{ method.description }}</p>
          </div>
          <div class="text-right">
            <span class="font-medium" v-if="isFreeShipping">
              {{ t("shop.cart.free") }}
            </span>
            <span class="font-medium" v-else>
              {{ method.price.toFixed(2) }}€
            </span>
            <div class="text-sm text-gray-600">
              {{ formatDeliveryTime(method.estimatedDays) }}
            </div>
          </div>
        </div>

        <!-- Features -->
        <div class="flex flex-wrap gap-3 mt-3">
          <span
            v-for="feature in method.features"
            :key="feature"
            class="inline-flex items-center gap-1 text-sm text-gray-600"
          >
            <i :class="shippingData.features[feature].icon"></i>
            {{ shippingData.features[feature].label[locale] }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useCartStore } from "../../stores/cart";
import shippingData from "../../data/shipping-methods.json";

// Importez les logos
import colissimoLogo from "../../assets/images/checkout/shipping/colissimo.svg";
import chronopostLogo from "../../assets/images/checkout/shipping/chronopost.svg";
import dpdLogo from "../../assets/images/checkout/shipping/dpd.svg";
import upsLogo from "../../assets/images/checkout/shipping/ups.svg";
import mondialRelayLogo from "../../assets/images/checkout/shipping/mondial-relay.svg";

// Créez un mapping des logos
const carrierLogos = {
  colissimo: colissimoLogo,
  chronopost: chronopostLogo,
  dpd: dpdLogo,
  ups: upsLogo,
  mondial_relay: mondialRelayLogo,
};

const props = defineProps({
  modelValue: {
    type: Object,
    default: null,
  },
});

const { t, locale } = useI18n();
const cartStore = useCartStore();
const emit = defineEmits(["update:modelValue"]);

const selectedCarrier = ref(shippingData.default_carrier);
const selectedMethodId = ref(null);

// Initialiser la sélection si une valeur est déjà définie
watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue) {
      selectedMethodId.value = newValue.id;
      // Trouver le transporteur correspondant
      for (const [carrierId, carrier] of Object.entries(
        shippingData.carriers,
      )) {
        if (carrier.methods.some((m) => m.id === newValue.id)) {
          selectedCarrier.value = carrierId;
          break;
        }
      }
    }
  },
  { immediate: true },
);

// Vérifier si une méthode est sélectionnée
const isMethodSelected = (method) => {
  return props.modelValue?.id === method.id;
};

// Calcul si la livraison est gratuite
const isFreeShipping = computed(() => {
  return cartStore.totalPrice >= shippingData.free_shipping_threshold;
});

// Méthodes du transporteur sélectionné
const currentCarrierMethods = computed(() => {
  return shippingData.carriers[selectedCarrier.value]?.methods || [];
});

// Formatage du temps de livraison estimé
const formatDeliveryTime = (estimatedDays) => {
  if (estimatedDays.min === estimatedDays.max) {
    return t("checkout.shipping.delivery_time_single", {
      days: estimatedDays.min,
    });
  }
  return t("checkout.shipping.delivery_time_range", {
    min: estimatedDays.min,
    max: estimatedDays.max,
  });
};

// Sélection du transporteur
const selectCarrier = (carrierId) => {
  selectedCarrier.value = carrierId;
  selectedMethodId.value = null;
  emit("update:modelValue", null);
};

// Sélection de la méthode
const selectMethod = (method) => {
  selectedMethodId.value = method.id;
  emit("update:modelValue", {
    ...method,
    carrier: shippingData.carriers[selectedCarrier.value].name,
    carrierLogo: carrierLogos[selectedCarrier.value],
    finalPrice: isFreeShipping.value ? 0 : method.price,
  });
};
</script>
