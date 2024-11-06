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
            {{ t("auth.login.description") }}
          </p>
        </div>
      </template>
      <template #content>
        <form @submit.prevent="handleLogin" class="space-y-4">
          <IftaLabel>
            <label
              for="email"
              class="block text-sm font-medium text-gray-700"
              >{{ t("auth.login.email") }}</label
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
              :feedback="false"
              toggleMask
              placeholder="••••••••"
              class="w-full"
              inputId="password"
            />
            <label for="password">{{ t("auth.login.password") }}</label>
          </IftaLabel>

          <div class="flex items-center">
            <Checkbox
              v-model="formState.rememberMe"
              :binary="true"
              inputId="remember-me"
            />
            <label for="remember-me" class="ml-2 block text-sm text-gray-700">
              {{ t("auth.login.remember_me") }}
            </label>
          </div>

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
            :label="t('auth.login.sign_in')"
            icon="pi pi-sign-in"
            class="w-full"
          />
        </form>
      </template>

      <template #footer>
        <div class="space-y-4 mt-4">
          <div class="text-center text-sm">
            <router-link
              to="/forgot-password"
              class="text-primary-600 hover:text-primary-500"
            >
              {{ t("auth.login.forgot_password") }}
            </router-link>
          </div>

          <div class="text-center text-sm">
            <span class="text-gray-600">{{
              t("auth.login.dont_have_account")
            }}</span>
            <router-link
              to="/register"
              class="ml-1 text-primary-600 hover:text-primary-500"
            >
              {{ t("auth.login.sign_up") }}
            </router-link>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
import { useI18n } from "vue-i18n";
import Card from "primevue/card";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Checkbox from "primevue/checkbox";
import Button from "primevue/button";
import Message from "primevue/message";
import Logo from "../components/Logo.vue";
import { IftaLabel } from "primevue";

const { t } = useI18n();
const formState = reactive({
  email: "",
  password: "",
  rememberMe: false,
});
const error = ref("");
const router = useRouter();
const authStore = useAuthStore();

const handleLogin = async () => {
  error.value = "";

  try {
    const success = await authStore.login(formState.email, formState.password);
    if (success) {
      await router.push("/home");
    } else {
      error.value = t("auth.login.invalid_credentials");
    }
  } catch (err) {
    console.error("Login failed:", err);
    error.value = t("auth.login.invalid_credentials");
  }
};
</script>
