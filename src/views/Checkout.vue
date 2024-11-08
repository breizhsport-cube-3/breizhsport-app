<template>
  <div class="min-h-screen">
    <div class="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-fredoka text-gray-900 mb-8">
        {{ t("checkout.title") }}
      </h1>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div class="lg:col-span-8">
          <div class="card flex justify-center">
            <Stepper v-model:value="currentStep" linear class="basis-[40rem]">
              <StepList>
                <Step
                  v-slot="{ activateCallback, value, a11yAttrs }"
                  asChild
                  :value="1"
                >
                  <div
                    class="flex flex-row flex-auto gap-2"
                    v-bind="a11yAttrs.root"
                  >
                    <button
                      class="bg-transparent border-0 inline-flex flex-col gap-2"
                      @click="() => canMoveToStep(1) && activateCallback(1)"
                      v-bind="a11yAttrs.header"
                      :disabled="!canMoveToStep(1)"
                    >
                      <span
                        :class="[
                          'rounded-full border-2 w-12 h-12 inline-flex items-center justify-center',
                          {
                            'bg-primary text-primary-contrast border-primary':
                              value <= currentStep,
                            'border-surface-200 dark:border-surface-700':
                              value > currentStep,
                          },
                        ]"
                      >
                        <i class="pi pi-user" />
                      </span>
                    </button>
                    <Divider />
                  </div>
                </Step>

                <Step
                  v-slot="{ activateCallback, value, a11yAttrs }"
                  asChild
                  :value="2"
                >
                  <div
                    class="flex flex-row flex-auto gap-2 pl-2"
                    v-bind="a11yAttrs.root"
                  >
                    <button
                      class="bg-transparent border-0 inline-flex flex-col gap-2"
                      @click="() => canMoveToStep(2) && activateCallback(2)"
                      v-bind="a11yAttrs.header"
                      :disabled="!canMoveToStep(2)"
                    >
                      <span
                        :class="[
                          'rounded-full border-2 w-12 h-12 inline-flex items-center justify-center',
                          {
                            'bg-primary text-primary-contrast border-primary':
                              value <= currentStep,
                            'border-surface-200 dark:border-surface-700':
                              value > currentStep,
                          },
                        ]"
                      >
                        <i class="pi pi-truck" />
                      </span>
                    </button>
                    <Divider />
                  </div>
                </Step>

                <Step
                  v-slot="{ activateCallback, value, a11yAttrs }"
                  asChild
                  :value="3"
                >
                  <div
                    class="flex flex-row flex-auto gap-2 pl-2"
                    v-bind="a11yAttrs.root"
                  >
                    <button
                      class="bg-transparent border-0 inline-flex flex-col gap-2"
                      @click="() => canMoveToStep(3) && activateCallback(3)"
                      v-bind="a11yAttrs.header"
                      :disabled="!canMoveToStep(3)"
                    >
                      <span
                        :class="[
                          'rounded-full border-2 w-12 h-12 inline-flex items-center justify-center',
                          {
                            'bg-primary text-primary-contrast border-primary':
                              value <= currentStep,
                            'border-surface-200 dark:border-surface-700':
                              value > currentStep,
                          },
                        ]"
                      >
                        <i class="pi pi-credit-card" />
                      </span>
                    </button>
                    <Divider />
                  </div>
                </Step>

                <Step
                  v-slot="{ activateCallback, value, a11yAttrs }"
                  asChild
                  :value="4"
                >
                  <div class="flex flex-row pl-2" v-bind="a11yAttrs.root">
                    <button
                      class="bg-transparent border-0 inline-flex flex-col gap-2"
                      @click="activateCallback"
                      v-bind="a11yAttrs.header"
                    >
                      <span
                        :class="[
                          'rounded-full border-2 w-12 h-12 inline-flex items-center justify-center',
                          {
                            'bg-primary text-primary-contrast border-primary':
                              value <= currentStep,
                            'border-surface-200 dark:border-surface-700':
                              value > currentStep,
                          },
                        ]"
                      >
                        <i class="pi pi-check" />
                      </span>
                    </button>
                  </div>
                </Step>
              </StepList>

              <StepPanels>
                <StepPanel v-slot="{ activateCallback }" :value="1">
                  <AddressStep @valid="setStepValidity" />
                  <div class="flex pt-6 justify-end">
                    <Button
                      :label="t('checkout.next')"
                      icon="pi pi-arrow-right"
                      iconPos="right"
                      :disabled="!isStepValid"
                      @click="() => canMoveToStep(2) && activateCallback(2)"
                    />
                  </div>
                </StepPanel>

                <StepPanel v-slot="{ activateCallback }" :value="2">
                  <ShippingStep @valid="setStepValidity" />
                  <div class="flex pt-6 justify-between">
                    <Button
                      :label="t('checkout.back')"
                      severity="secondary"
                      icon="pi pi-arrow-left"
                      @click="() => activateCallback(1)"
                    />
                    <Button
                      :label="t('checkout.next')"
                      icon="pi pi-arrow-right"
                      iconPos="right"
                      :disabled="!isStepValid"
                      @click="() => canMoveToStep(3) && activateCallback(3)"
                    />
                  </div>
                </StepPanel>

                <StepPanel v-slot="{ activateCallback }" :value="3">
                  <PaymentStep ref="paymentStepRef" @valid="setStepValidity" />
                  <div class="flex pt-6 justify-between">
                    <Button
                      :label="t('checkout.back')"
                      severity="secondary"
                      icon="pi pi-arrow-left"
                      @click="() => activateCallback(2)"
                    />
                    <Button
                      :label="
                        isProcessingPayment
                          ? t('checkout.payment.processing')
                          : t('checkout.payment.pay')
                      "
                      :icon="
                        isProcessingPayment
                          ? 'pi pi-spinner pi-spin'
                          : 'pi pi-credit-card'
                      "
                      :severity="isProcessingPayment ? 'secondary' : 'primary'"
                      iconPos="right"
                      :disabled="
                        !isStepValid || isProcessingPayment || !canMoveToStep(4)
                      "
                      @click="
                        async () => {
                          isProcessingPayment = true;
                          try {
                            if (await paymentStepRef?.handlePayment()) {
                              orderId.value = generateOrderId();
                              activateCallback(4);
                            }
                          } finally {
                            isProcessingPayment = false;
                          }
                        }
                      "
                    />
                  </div>
                </StepPanel>

                <StepPanel :value="4">
                  <ConfirmationStep :order-id="orderId" />
                </StepPanel>
              </StepPanels>
            </Stepper>
          </div>
        </div>

        <div class="lg:col-span-4">
          <OrderSummary
            :selected-shipping-method="selectedShippingMethod"
            :cart-items="cartStore.items"
            :cart-total="cartStore.totalPrice"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useCartStore } from "../stores/cart";
import { useCheckoutStore } from "../stores/checkout";
import AddressStep from "../components/checkout/AddressStep.vue";
import ShippingStep from "../components/checkout/ShippingStep.vue";
import PaymentStep from "../components/checkout/PaymentStep.vue";
import ConfirmationStep from "../components/checkout/ConfirmationStep.vue";
import OrderSummary from "../components/checkout/OrderSummary.vue";
import Divider from "primevue/divider";
import Stepper from "primevue/stepper";
import Step from "primevue/step";
import StepList from "primevue/steplist";
import StepPanel from "primevue/steppanel";
import StepPanels from "primevue/steppanels";
import Button from "primevue/button";

const { t } = useI18n();
const cartStore = useCartStore();
const checkoutStore = useCheckoutStore();
const currentStep = ref(1);
const orderId = ref(null);
const isStepValid = ref(false);
const stepsValidity = ref({
  1: false,
  2: false,
  3: false,
  4: false,
});

const paymentStepRef = ref(null);
const isProcessingPayment = ref(false);

// Créer un computed pour la méthode de livraison sélectionnée
const selectedShippingMethod = computed(
  () => checkoutStore.selectedShippingMethod,
);

const setStepValidity = (isValid) => {
  stepsValidity.value[currentStep.value] = isValid;
  isStepValid.value = isValid;
};

const canMoveToStep = (step) => {
  // On peut toujours revenir en arrière
  if (step < currentStep.value) return true;

  // Pour avancer, il faut que toutes les étapes précédentes soient valides
  for (let i = 1; i < step; i++) {
    if (!stepsValidity.value[i]) return false;
  }
  return true;
};

const generateOrderId = () => {
  return "ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase();
};

onMounted(() => {
  cartStore.initializeCart();
});
</script>
