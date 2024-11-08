<template>
  <div class="bg-gray-50 shadow-sm rounded-lg p-6">
    <h2 class="text-lg font-medium mb-4">{{ t("checkout.payment.title") }}</h2>
    <div ref="cardElementRef" class="p-4 border rounded-lg mb-4"></div>
    <div ref="cardErrorsRef" class="text-red-500 text-sm mt-2"></div>

    <div class="flex items-center gap-2 mt-4 text-sm text-gray-600">
      <i class="pi pi-lock"></i>
      {{ t("checkout.payment.secure_payment") }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useI18n } from "vue-i18n";
import { stripePromise } from "../../services/stripe";

const { t } = useI18n();
const emit = defineEmits(["next", "prev", "valid", "process-payment"]);

const cardElementRef = ref(null);
const cardErrorsRef = ref(null);
const stripe = ref(null);
const elements = ref(null);
const cardElement = ref(null);
const isProcessing = ref(false);
const isCardComplete = ref(false);

onMounted(async () => {
  await initializeStripe();
});

onUnmounted(() => {
  if (cardElement.value) {
    cardElement.value.destroy();
  }
});

const initializeStripe = async () => {
  if (!stripe.value && cardElementRef.value) {
    stripe.value = await stripePromise;
    elements.value = stripe.value.elements();
    cardElement.value = elements.value.create("card", {
      style: {
        base: {
          fontSize: "16px",
          color: "#32325d",
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          "::placeholder": {
            color: "#aab7c4",
          },
        },
        invalid: {
          color: "#fa755a",
          iconColor: "#fa755a",
        },
      },
    });
    cardElement.value.mount(cardElementRef.value);
    cardElement.value.on("change", handleChange);
  }
};

const handleChange = (event) => {
  isCardComplete.value = event.complete;
  emit("valid", event.complete && !event.error);

  if (event.error) {
    cardErrorsRef.value.textContent =
      t(`checkout.payment.errors.${event.error.code}`) || event.error.message;
  } else {
    cardErrorsRef.value.textContent = "";
  }
};

const handlePayment = async () => {
  if (!stripe.value || !cardElement.value || !isCardComplete.value) return;

  isProcessing.value = true;
  cardErrorsRef.value.textContent = "";

  try {
    const { token, error } = await stripe.value.createToken(cardElement.value);
    if (error) {
      cardErrorsRef.value.textContent =
        t(`checkout.payment.errors.${error.code}`) || error.message;
      emit("valid", false);
      return;
    }
    emit("valid", true);
    emit("next");
  } catch (error) {
    console.error("Payment error:", error);
    cardErrorsRef.value.textContent = t(
      "checkout.payment.errors.processing_error",
    );
    emit("valid", false);
  } finally {
    isProcessing.value = false;
  }
};

// Exposer handlePayment pour le parent
defineExpose({ handlePayment });
</script>
