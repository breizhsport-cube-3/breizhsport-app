<template>
  <div class="bg-gray-50 shadow-sm rounded-lg p-6">
    <h2 class="text-lg font-medium mb-4">{{ t("checkout.shipping.title") }}</h2>

    <!-- Formulaire d'adresse -->
    <form @submit.prevent="handleNext" class="space-y-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          v-for="field in formFields"
          :key="field.name"
          :class="{ 'md:col-span-2': field.fullWidth }"
        >
          <label
            :for="field.name"
            class="block text-sm font-medium text-gray-700"
          >
            {{ t(`checkout.shipping.${field.name}`) }}
          </label>
          <InputText
            :id="field.name"
            v-model="form[field.name]"
            :type="field.type || 'text'"
            :placeholder="t(`checkout.shipping.${field.name}`)"
            class="w-full mt-1"
            :class="{ 'p-invalid': v$[field.name]?.$error }"
          />
          <small class="text-red-500" v-if="v$[field.name]?.$error">
            {{ v$[field.name]?.$errors[0]?.$message }}
          </small>
        </div>
      </div>

      <!-- Sélection du mode de livraison -->
      <div class="mt-8">
        <h3 class="text-lg font-medium mb-4">
          {{ t("checkout.shipping.method.title") }}
        </h3>
        <ShippingMethodSelector
          v-model="selectedMethod"
          :cart-total="cartStore.totalPrice"
        />
      </div>

      <!-- Boutons de navigation -->
      <div class="flex justify-end pt-6">
        <Button
          type="submit"
          :label="t('checkout.next')"
          icon="pi pi-arrow-right"
          iconPos="right"
          :disabled="!isFormValid"
        />
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import { useCartStore } from "../../stores/cart";
import { useCheckoutStore } from "../../stores/checkout";
import ShippingMethodSelector from "./ShippingMethodSelector.vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";

const { t } = useI18n();
const cartStore = useCartStore();
const checkoutStore = useCheckoutStore();
const emit = defineEmits(["next"]);

// Formulaire et validation
const form = ref({ ...checkoutStore.shippingForm });
const selectedMethod = ref(checkoutStore.selectedShippingMethod);

const formFields = [
  { name: "first_name", type: "text" },
  { name: "last_name", type: "text" },
  { name: "email", type: "email" },
  { name: "phone", type: "tel" },
  { name: "address", type: "text", fullWidth: true },
  { name: "city", type: "text" },
  { name: "postal_code", type: "text" },
  { name: "country", type: "text" },
];

const rules = {
  first_name: { required },
  last_name: { required },
  email: { required, email },
  phone: { required, minLength: minLength(10) },
  address: { required },
  city: { required },
  postal_code: { required, minLength: minLength(5) },
  country: { required },
};

const v$ = useVuelidate(rules, form);

const isFormValid = computed(() => {
  return !v$.value.$invalid && selectedMethod.value;
});

const handleNext = async () => {
  const isValid = await v$.value.$validate();
  if (!isValid || !selectedMethod.value) return;

  checkoutStore.setShippingForm(form.value);
  checkoutStore.setShippingMethod(selectedMethod.value);

  emit("next");
};
</script>
