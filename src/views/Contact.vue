<template>
  <div class="bg-gray-50 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-fredoka text-gray-900 mb-4">
          {{ t("footer.contact_us") }}
        </h1>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          {{ t("contact.description") }}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
        <!-- Contact Form -->
        <div class="bg-white rounded-lg shadow-sm p-8">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700">
                  {{ t("contact.form.firstName") }}
                </label>
                <InputText
                  v-model="form.firstName"
                  :class="{ 'p-invalid': v$.firstName.$error }"
                  class="w-full"
                />
                <small class="text-red-500" v-if="v$.firstName.$error">
                  {{ v$.firstName.$errors[0].$message }}
                </small>
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700">
                  {{ t("contact.form.lastName") }}
                </label>
                <InputText
                  v-model="form.lastName"
                  :class="{ 'p-invalid': v$.lastName.$error }"
                  class="w-full"
                />
                <small class="text-red-500" v-if="v$.lastName.$error">
                  {{ v$.lastName.$errors[0].$message }}
                </small>
              </div>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">
                {{ t("contact.form.email") }}
              </label>
              <InputText
                v-model="form.email"
                type="email"
                :class="{ 'p-invalid': v$.email.$error }"
                class="w-full"
              />
              <small class="text-red-500" v-if="v$.email.$error">
                {{ v$.email.$errors[0].$message }}
              </small>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">
                {{ t("contact.form.subject") }}
              </label>
              <Dropdown
                v-model="form.subject"
                :options="subjects"
                optionLabel="label"
                :class="{ 'p-invalid': v$.subject.$error }"
                class="w-full"
              />
              <small class="text-red-500" v-if="v$.subject.$error">
                {{ v$.subject.$errors[0].$message }}
              </small>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">
                {{ t("contact.form.message") }}
              </label>
              <div class="relative">
                <Textarea
                  v-model="form.message"
                  :class="{ 'p-invalid': v$.message.$error }"
                  rows="6"
                  class="w-full resize-none"
                  :maxlength="maxMessageLength"
                />
                <div class="absolute bottom-2 right-2 text-xs text-gray-500">
                  {{ form.message.length }}/{{ maxMessageLength }}
                </div>
              </div>
              <small class="text-red-500" v-if="v$.message.$error">
                {{ v$.message.$errors[0].$message }}
              </small>
            </div>

            <Button
              type="submit"
              :loading="loading"
              class="w-full"
              severity="primary"
            >
              {{ t("contact.form.submit") }}
            </Button>
          </form>
        </div>

        <!-- Contact Information -->
        <div class="space-y-8">
          <div class="bg-white rounded-lg shadow-sm p-8">
            <h2 class="text-2xl font-fredoka text-gray-900 mb-6">
              {{ t("contact.info.title") }}
            </h2>
            <div class="space-y-6">
              <div class="flex items-start space-x-4">
                <i class="pi pi-map-marker text-primary-500 text-xl mt-1"></i>
                <div>
                  <h3 class="font-medium text-gray-900">
                    {{ t("contact.info.address.title") }}
                  </h3>
                  <p class="text-gray-600">
                    283 Av. Général George S. Patton, 35000 Rennes
                  </p>
                </div>
              </div>

              <div class="flex items-start space-x-4">
                <i class="pi pi-phone text-primary-500 text-xl mt-1"></i>
                <div>
                  <h3 class="font-medium text-gray-900">
                    {{ t("contact.info.phone.title") }}
                  </h3>
                  <p class="text-gray-600">+33 2 99 27 10 10</p>
                </div>
              </div>

              <div class="flex items-start space-x-4">
                <i class="pi pi-envelope text-primary-500 text-xl mt-1"></i>
                <div>
                  <h3 class="font-medium text-gray-900">
                    {{ t("contact.info.email.title") }}
                  </h3>
                  <p class="text-gray-600">contact@breizhsport.fr</p>
                </div>
              </div>

              <div class="flex items-start space-x-4">
                <i class="pi pi-clock text-primary-500 text-xl mt-1"></i>
                <div>
                  <h3 class="font-medium text-gray-900">
                    {{ t("contact.info.hours.title") }}
                  </h3>
                  <p class="text-gray-600">
                    {{ t("contact.info.hours.weekdays") }}
                  </p>
                  <p class="text-gray-600">
                    {{ t("contact.info.hours.weekend") }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Map -->
          <div class="bg-white rounded-lg shadow-sm p-8">
            <h2 class="text-2xl font-fredoka text-gray-900 mb-6">
              {{ t("contact.map.title") }}
            </h2>
            <div class="aspect-w-16 aspect-h-9">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2663.8935044697736!2d-1.6640408!3d48.1358851!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x480ede64f2fcb4fb%3A0x5eeed88969f28c5f!2s283%20Av.%20G%C3%A9n%C3%A9ral%20George%20S.%20Patton%2C%2035000%20Rennes!5e0!3m2!1sfr!2sfr!4v1710835000000!5m2!1sfr!2sfr"
                width="100%"
                height="450"
                style="border: 0"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, maxLength } from "@vuelidate/validators";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import Dropdown from "primevue/dropdown";
import Button from "primevue/button";
import { useToast } from "primevue/usetoast";

const { t } = useI18n();
const toast = useToast();
const loading = ref(false);

const form = ref({
  firstName: "",
  lastName: "",
  email: "",
  subject: null,
  message: "",
});

const subjects = [
  { label: t("contact.form.subjects.general"), value: "general" },
  { label: t("contact.form.subjects.support"), value: "support" },
  { label: t("contact.form.subjects.business"), value: "business" },
];

const maxMessageLength = 500;

const rules = {
  firstName: { required },
  lastName: { required },
  email: { required, email },
  subject: { required },
  message: {
    required,
    minLength: minLength(10),
    maxLength: maxLength(maxMessageLength),
  },
};

const v$ = useVuelidate(rules, form);

const handleSubmit = async () => {
  const isValid = await v$.value.$validate();
  if (!isValid) return;

  loading.value = true;
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.add({
      severity: "success",
      summary: t("contact.form.success.title"),
      detail: t("contact.form.success.message"),
      life: 3000,
    });
    form.value = {
      firstName: "",
      lastName: "",
      email: "",
      subject: null,
      message: "",
    };
    v$.value.$reset();
  } catch (error) {
    toast.add({
      severity: "error",
      summary: t("contact.form.error.title"),
      detail: t("contact.form.error.message"),
      life: 3000,
    });
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.p-inputtextarea {
  resize: none !important;
}
</style>
