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
            {{ t("auth.register.description") }}
          </p>
        </div>
      </template>

      <template #content>
        <form @submit.prevent="handleRegister" class="space-y-4">
          <IftaLabel>
            <label
              for="firstName"
              class="block text-sm font-medium text-gray-700"
              >{{ t("auth.register.first_name") }}</label
            >
            <InputText
              id="firstName"
              v-model="formState.firstName"
              placeholder="John"
              class="w-full"
            />
          </IftaLabel>

          <IftaLabel>
            <label
              for="lastName"
              class="block text-sm font-medium text-gray-700"
              >{{ t("auth.register.last_name") }}</label
            >
            <InputText
              id="lastName"
              v-model="formState.lastName"
              placeholder="Doe"
              class="w-full"
            />
          </IftaLabel>

          <IftaLabel>
            <label
              for="email"
              class="block text-sm font-medium text-gray-700"
              >{{ t("auth.register.email") }}</label
            >
            <InputText
              id="email"
              v-model="formState.email"
              type="email"
              placeholder="user@breizhsport.com"
              class="w-full"
            />
          </IftaLabel>

          <IftaLabel>
            <Password
              v-model="formState.password"
              :feedback="true"
              toggleMask
              placeholder="••••••••"
              class="w-full"
              inputId="password"
            />
            <label
              for="password"
              class="block text-sm font-medium text-gray-700"
              >{{ t("auth.register.password") }}</label
            >
          </IftaLabel>

          <IftaLabel>
            <Password
              v-model="formState.passwordConfirmation"
              :feedback="false"
              toggleMask
              placeholder="••••••••"
              class="w-full"
              inputId="passwordConfirmation"
            />
            <label
              for="passwordConfirmation"
              class="block text-sm font-medium text-gray-700"
            >
              {{ t("auth.register.password_confirmation") }}
            </label>
          </IftaLabel>

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
            :label="t('auth.register.sign_up')"
            icon="pi pi-user-plus"
            class="w-full"
          />
        </form>
      </template>

      <template #footer>
        <div class="text-center text-sm">
          <span class="text-gray-600">{{
            t("auth.register.already_have_account")
          }}</span>
          <router-link
            to="/login"
            class="ml-1 text-primary-600 hover:text-primary-500"
          >
            {{ t("auth.register.sign_in") }}
          </router-link>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useAuthStore } from "../stores/auth";
import Card from "primevue/card";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Button from "primevue/button";
import Message from "primevue/message";
import Logo from "../components/Logo.vue";
import { IftaLabel } from "primevue";

const { t } = useI18n();
const router = useRouter();
const authStore = useAuthStore();

const formState = reactive({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  passwordConfirmation: "",
});
const error = ref("");

const handleRegister = async () => {
  error.value = "";

  if (formState.password !== formState.passwordConfirmation) {
    error.value = "Passwords do not match";
    return;
  }

  try {
    // Implement registration logic here
    console.log("Registering with:", formState);
    // After successful registration, log the user in and redirect to home
    await authStore.login(formState.email, formState.password);
    await router.push("/home");
  } catch (err) {
    console.error("Registration failed:", err);
    error.value = "Registration failed. Please try again.";
  }
};
</script>
