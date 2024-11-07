<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between">
          <router-link to="/" class="flex items-center">
            <Logo />
            <h1 class="ml-2 text-xl font-fredoka text-primary-600">
              Breizhsport
            </h1>
          </router-link>
          <div class="flex items-center space-x-4">
            <Steps :model="steps" :readonly="false" />
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <!-- Form Section -->
        <div class="lg:col-span-8">
          <div class="bg-white shadow-sm rounded-lg p-6 space-y-6">
            <!-- Shipping Information -->
            <div v-if="currentStep === 0">
              <h2 class="text-lg font-medium mb-4">
                {{ t("checkout.shipping.title") }}
              </h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700">
                    {{ t("checkout.shipping.firstName") }}
                  </label>
                  <InputText
                    v-model="form.firstName"
                    class="w-full"
                    :class="{ 'p-invalid': v$.firstName.$error }"
                  />
                  <small class="text-red-500" v-if="v$.firstName.$error">
                    {{ v$.firstName.$errors[0].$message }}
                  </small>
                </div>

                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700">
                    {{ t("checkout.shipping.lastName") }}
                  </label>
                  <InputText
                    v-model="form.lastName"
                    class="w-full"
                    :class="{ 'p-invalid': v$.lastName.$error }"
                  />
                  <small class="text-red-500" v-if="v$.lastName.$error">
                    {{ v$.lastName.$errors[0].$message }}
                  </small>
                </div>

                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700">
                    {{ t("checkout.shipping.email") }}
                  </label>
                  <InputText
                    v-model="form.email"
                    type="email"
                    class="w-full"
                    :class="{ 'p-invalid': v$.email.$error }"
                  />
                  <small class="text-red-500" v-if="v$.email.$error">
                    {{ v$.email.$errors[0].$message }}
                  </small>
                </div>

                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700">
                    {{ t("checkout.shipping.phone") }}
                  </label>
                  <InputText
                    v-model="form.phone"
                    class="w-full"
                    :class="{ 'p-invalid': v$.phone.$error }"
                  />
                  <small class="text-red-500" v-if="v$.phone.$error">
                    {{ v$.phone.$errors[0].$message }}
                  </small>
                </div>

                <div class="space-y-2 md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700">
                    {{ t("checkout.shipping.address") }}
                  </label>
                  <InputText
                    v-model="form.address"
                    class="w-full"
                    :class="{ 'p-invalid': v$.address.$error }"
                  />
                  <small class="text-red-500" v-if="v$.address.$error">
                    {{ v$.address.$errors[0].$message }}
                  </small>
                </div>

                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700">
                    {{ t("checkout.shipping.city") }}
                  </label>
                  <InputText
                    v-model="form.city"
                    class="w-full"
                    :class="{ 'p-invalid': v$.city.$error }"
                  />
                  <small class="text-red-500" v-if="v$.city.$error">
                    {{ v$.city.$errors[0].$message }}
                  </small>
                </div>

                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700">
                    {{ t("checkout.shipping.postalCode") }}
                  </label>
                  <InputText
                    v-model="form.postalCode"
                    class="w-full"
                    :class="{ 'p-invalid': v$.postalCode.$error }"
                  />
                  <small class="text-red-500" v-if="v$.postalCode.$error">
                    {{ v$.postalCode.$errors[0].$message }}
                  </small>
                </div>
              </div>
            </div>

            <!-- Payment Information -->
            <div v-if="currentStep === 1">
              <h2 class="text-lg font-medium mb-4">
                {{ t("checkout.payment.title") }}
              </h2>
              <!-- Add payment form here -->
            </div>

            <!-- Confirmation -->
            <div v-if="currentStep === 2">
              <h2 class="text-lg font-medium mb-4">
                {{ t("checkout.confirmation.title") }}
              </h2>
              <!-- Add confirmation details here -->
            </div>

            <!-- Navigation Buttons -->
            <div class="flex justify-between pt-6">
              <Button
                v-if="currentStep > 0"
                :label="t('checkout.back')"
                severity="secondary"
                @click="previousStep"
              />
              <Button
                :label="
                  currentStep === steps.length - 1
                    ? t('checkout.placeOrder')
                    : t('checkout.next')
                "
                severity="primary"
                @click="nextStep"
                class="ml-auto"
              />
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="lg:col-span-4">
          <div class="bg-white shadow-sm rounded-lg p-6 space-y-4">
            <h2 class="text-lg font-medium">
              {{ t("checkout.summary.title") }}
            </h2>

            <!-- Cart Items -->
            <div class="space-y-4">
              <div
                v-for="item in cartStore.items"
                :key="item.id"
                class="flex items-start space-x-4"
              >
                <img
                  :src="item.images[0]"
                  :alt="item.name"
                  class="w-16 h-16 object-cover rounded-lg"
                />
                <div class="flex-1">
                  <h3 class="text-sm font-medium">{{ item.name }}</h3>
                  <p class="text-sm text-gray-500">
                    {{ t("checkout.summary.quantity") }}: {{ item.quantity }}
                  </p>
                  <p class="text-sm font-medium">{{ item.price }}€</p>
                </div>
              </div>
            </div>

            <!-- Totals -->
            <div class="border-t pt-4 space-y-2">
              <div class="flex justify-between text-sm">
                <span>{{ t("checkout.summary.subtotal") }}</span>
                <span>{{ cartStore.subtotal }}€</span>
              </div>
              <div class="flex justify-between text-sm">
                <span>{{ t("checkout.summary.shipping") }}</span>
                <span>{{ shippingCost }}€</span>
              </div>
              <div class="flex justify-between font-medium text-lg pt-2">
                <span>{{ t("checkout.summary.total") }}</span>
                <span>{{ cartStore.total + shippingCost }}€</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import { useCartStore } from "../stores/cart";
import Logo from "../components/Logo.vue";
import Steps from "primevue/steps";
import Button from "primevue/button";
import InputText from "primevue/inputtext";

const { t } = useI18n();
const cartStore = useCartStore();

const currentStep = ref(0);
const shippingCost = ref(4.99);

const steps = [
  { label: t("checkout.steps.shipping") },
  { label: t("checkout.steps.payment") },
  { label: t("checkout.steps.confirmation") },
];

const form = ref({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
});

const rules = {
  firstName: { required: { ...required, message: t("validation.required") } },
  lastName: { required: { ...required, message: t("validation.required") } },
  email: {
    required: { ...required, message: t("validation.required") },
    email: { ...email, message: t("validation.email") },
  },
  phone: {
    required: { ...required, message: t("validation.required") },
    minLength: {
      ...minLength(10),
      message: t("validation.minLength", { min: 10 }),
    },
  },
  address: { required: { ...required, message: t("validation.required") } },
  city: { required: { ...required, message: t("validation.required") } },
  postalCode: {
    required: { ...required, message: t("validation.required") },
    minLength: {
      ...minLength(5),
      message: t("validation.minLength", { min: 5 }),
    },
  },
};

const v$ = useVuelidate(rules, form);

const nextStep = async () => {
  if (currentStep.value === 0) {
    const isValid = await v$.value.$validate();
    if (!isValid) return;
  }
  if (currentStep.value < steps.length - 1) {
    currentStep.value++;
  }
};

const previousStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--;
  }
};
</script>
