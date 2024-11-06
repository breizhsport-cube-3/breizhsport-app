<template>
  <div
    class="flex min-h-screen items-center justify-center bg-gradient-to-b from-primary-300 to-secondary-300 p-6 animate-background"
  >
    <Card class="w-full max-w-md space-y-4">
      <template #header>
        <div class="flex flex-col items-center justify-center">
          <div class="flex flex-row items-end">
            <Logo />
            <h1
              class="text-center font-fredoka text-2xl text-primary-600 sm:mt-6 sm:text-3xl md:text-4xl"
            >
              Breizhsport
            </h1>
          </div>
          <p class="mt-1 text-center text-xs text-gray-600 sm:text-sm">
            {{ t("auth.forgot_password.description") }}
          </p>
        </div>
      </template>

      <template #content>
        <form @submit.prevent="handleForgotPassword" class="space-y-4">
          <IftaLabel>
            <label
              for="email"
              class="block text-sm font-medium text-gray-700"
              >{{ t("auth.forgot_password.email") }}</label
            >
            <InputText
              id="email"
              v-model="formState.email"
              type="email"
              placeholder="user@breizhsport.com"
              class="w-full"
            />
          </IftaLabel>

          <Message
            v-if="message"
            severity="success"
            :closable="false"
            class="w-full"
          >
            {{ message }}
          </Message>

          <Message
            v-if="error"
            severity="error"
            :closable="false"
            class="w-full"
          >
            {{ error }}
          </Message>

          <Button
            type="submit"
            :label="t('auth.forgot_password.reset_password')"
            icon="pi pi-key"
            class="w-full"
          />
        </form>
      </template>

      <template #footer>
        <div class="text-center text-sm">
          <span class="text-gray-600">{{
            t("auth.forgot_password.remember_password")
          }}</span>
          <router-link
            to="/login"
            class="ml-1 text-primary-600 hover:text-primary-500"
          >
            {{ t("auth.forgot_password.sign_in") }}
          </router-link>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useI18n } from "vue-i18n";
import { useAuthStore } from "../stores/auth";
import Card from "primevue/card";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Message from "primevue/message";
import Logo from "../components/Logo.vue";
import { IftaLabel } from "primevue";

const { t } = useI18n();
const authStore = useAuthStore();

const formState = reactive({
  email: "",
});
const message = ref("");
const error = ref("");

const handleForgotPassword = async () => {
  message.value = "";
  error.value = "";

  try {
    // Implement your forgot password logic here
    message.value = "Password reset instructions have been sent to your email.";
  } catch (err) {
    console.error("Password reset request failed:", err);
    error.value = "Failed to send password reset email. Please try again.";
  }
};
</script>
