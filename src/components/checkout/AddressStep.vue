<template>
  <div class="shadow-sm rounded-lg p-6 bg-gray-50">
    <h2 class="text-lg font-medium mb-4">{{ t("checkout.address.title") }}</h2>

    <form @submit.prevent class="space-y-4">
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
            {{ t(`checkout.address.${field.name}`) }}
          </label>
          <InputText
            :id="field.name"
            v-model="form[field.name]"
            :type="field.type || 'text'"
            :placeholder="t(`checkout.address.${field.name}`)"
            class="w-full mt-1"
            :class="{ 'p-invalid': v$[field.name]?.$error }"
          />
          <small class="text-red-500" v-if="v$[field.name]?.$error">
            {{ v$[field.name]?.$errors[0]?.$message }}
          </small>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import { useCheckoutStore } from "../../stores/checkout";
import InputText from "primevue/inputtext";

const { t } = useI18n();
const checkoutStore = useCheckoutStore();
const emit = defineEmits(["valid"]);

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

const form = ref({ ...checkoutStore.shippingForm });

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

const isFormValid = computed(() => !v$.value.$invalid);

// Surveiller la validité du formulaire
watch(
  () => !v$.value.$invalid,
  (isValid) => {
    emit("valid", isValid);
  },
  { immediate: true },
);

const handleNext = async () => {
  const isValid = await v$.value.$validate();
  if (!isValid) return;

  checkoutStore.setShippingForm(form.value);
  emit("next");
};
</script>
