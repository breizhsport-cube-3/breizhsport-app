<template>
  <nav class="bg-white shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <router-link to="/" class="flex items-center">
            <Logo />
            <h1 class="ml-2 text-xl font-fredoka text-primary-600">
              Breizhsport
            </h1>
          </router-link>
        </div>
        <div class="flex items-center space-x-2">
          <Button
            icon="pi pi-warehouse"
            rounded
            text
            @click="router.push('/products')"
          />
          <div class="flex items-center relative">
            <Button
              type="button"
              icon="pi pi-globe"
              rounded
              text
              @click="languageOP.toggle($event)"
            />
            <OverlayPanel
              ref="languageOP"
              class="w-[150px]"
              :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
              :showCloseIcon="true"
              appendTo="body"
              :baseZIndex="1000"
              :autoZIndex="true"
            >
              <div class="space-y-1">
                <button
                  v-for="option in localeOptions"
                  :key="option.code"
                  @click="
                    handleLocaleChange(option.code);
                    languageOP.hide();
                  "
                  class="w-full flex items-center gap-2 p-2 hover:bg-gray-50 rounded-md transition-colors"
                  :class="{ 'bg-gray-50': option.code === locale }"
                >
                  <span :class="`fi fi-${option.flag}`"></span>
                  <span class="text-sm">{{ option.label }}</span>
                </button>
              </div>
            </OverlayPanel>
          </div>
          <Divider layout="vertical" />
          <div class="relative inline-block">
            <Button
              ref="cartButton"
              icon="pi pi-shopping-cart"
              rounded
              text
              @click="toggleCart"
              :badge="cartStore.totalItems || '0'"
            >
            </Button>

            <OverlayPanel
              ref="cartOP"
              class="w-[400px]"
              :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
              :showCloseIcon="true"
              appendTo="body"
              :baseZIndex="1000"
              :autoZIndex="true"
            >
              <MiniCart />
            </OverlayPanel>
          </div>

          <div class="relative inline-block">
            <Button
              ref="userButton"
              icon="pi pi-user"
              rounded
              text
              @click="userOP.toggle($event)"
            >
            </Button>

            <OverlayPanel
              ref="userOP"
              class="w-[400px]"
              :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
              :showCloseIcon="true"
              appendTo="body"
              :baseZIndex="1000"
              :autoZIndex="true"
            >
              <div class="p-4">
                <template v-if="!authStore.isAuthenticated">
                  <div class="space-y-3">
                    <template v-if="showLoginForm">
                      <div class="space-y-3">
                        <h3 class="text-lg font-semibold">
                          {{ $t("auth.login.title") }}
                        </h3>

                        <form @submit.prevent="handleLogin" class="space-y-3">
                          <div class="flex flex-col gap-2">
                            <label for="email">{{
                              $t("auth.login.email")
                            }}</label>
                            <InputText
                              id="email"
                              v-model="loginForm.email"
                              type="email"
                              class="w-full"
                              :placeholder="$t('auth.login.email_placeholder')"
                              required
                            />
                          </div>

                          <div class="flex flex-col gap-2">
                            <label for="password">{{
                              $t("auth.login.password")
                            }}</label>
                            <Password
                              id="password"
                              v-model="loginForm.password"
                              class="w-full"
                              :placeholder="
                                $t('auth.login.password_placeholder')
                              "
                              :feedback="false"
                              required
                              toggleMask
                            />
                            <div class="text-right">
                              <Button
                                text
                                type="button"
                                @click="
                                  router.push('/forgot-password');
                                  userOP.hide();
                                "
                                class="p-0 text-sm text-primary"
                              >
                                {{ $t("auth.login.forgot_password") }}
                              </Button>
                            </div>
                          </div>

                          <div class="flex items-center gap-2">
                            <Button
                              icon="pi pi-arrow-left"
                              text
                              @click="showLoginForm = false"
                              class="p-0"
                            />
                            <Button
                              type="submit"
                              class="w-full"
                              severity="primary"
                              :loading="isLoading"
                            >
                              {{ $t("auth.login.submit") }}
                            </Button>
                          </div>
                        </form>
                      </div>
                    </template>

                    <template v-else>
                      <Button
                        class="w-full"
                        @click="showLoginForm = true"
                        severity="primary"
                      >
                        {{ $t("auth.login.title") }}
                      </Button>

                      <Divider>
                        <span class="text-sm text-gray-500">{{
                          $t("auth.or")
                        }}</span>
                      </Divider>

                      <Button
                        class="w-full"
                        @click="
                          router.push('/register');
                          userOP.hide();
                        "
                        severity="secondary"
                        outlined
                      >
                        {{ $t("auth.register.title") }}
                      </Button>
                    </template>
                  </div>
                </template>
                <template v-else>
                  <div class="space-y-3">
                    <div class="flex items-center gap-2 mb-4">
                      <i class="pi pi-user text-2xl text-primary-600"></i>
                      <div>
                        <h3 class="text-lg font-semibold">
                          {{ authStore.user?.name || "Utilisateur" }}
                        </h3>
                        <p class="text-sm text-gray-600">
                          {{ authStore.user?.email }}
                        </p>
                      </div>
                    </div>
                    <Button
                      class="w-full"
                      @click="
                        router.push('/account');
                        userOP.hide();
                      "
                      severity="secondary"
                    >
                      {{ $t("auth.my_account") }}
                    </Button>
                    <Button
                      class="w-full"
                      @click="handleLogout"
                      severity="danger"
                      outlined
                    >
                      {{ $t("auth.logout") }}
                    </Button>
                  </div>
                </template>
              </div>
            </OverlayPanel>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <div
    v-if="showPromotion"
    class="py-1 bg-primary-200/20 border-y border-primary-600"
  >
    <Vue3Marquee>
      <span class="text-primary-600">{{ $t("promotions.black_friday") }}</span>
    </Vue3Marquee>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useCartStore } from "../stores/cart";
import { useI18n } from "vue-i18n";
import Logo from "./Logo.vue";
import MiniCart from "./MiniCart.vue";
import OverlayPanel from "primevue/overlaypanel";
import Divider from "primevue/divider";
import { availableLocales, setLocale } from "../i18n";
import "flag-icons/css/flag-icons.min.css";
import Button from "primevue/button";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import { Vue3Marquee } from "vue3-marquee";

const cartStore = useCartStore();
const { locale } = useI18n();
const router = useRouter();
const authStore = useAuthStore();

const languageOP = ref();
const cartOP = ref();
const userOP = ref();

const localeOptions = Object.entries(availableLocales).map(([code, info]) => ({
  code,
  ...info,
}));

const handleLocaleChange = (code) => {
  setLocale(code);
};

const toggleCart = (event) => {
  event.stopPropagation();
  cartOP.value.toggle(event);
};

const handleLogout = async () => {
  await authStore.logout();
  userOP.value.hide();
  router.push("/");
};

const loginForm = ref({
  email: "",
  password: "",
});

const isLoading = ref(false);

const handleLogin = async () => {
  try {
    isLoading.value = true;
    await authStore.login(loginForm.value);
    userOP.value.hide();
    loginForm.value = { email: "", password: "" };
    showLoginForm.value = false;
  } catch (error) {
    console.error("Login failed:", error);
  } finally {
    isLoading.value = false;
  }
};

const showLoginForm = ref(false);

const showPromotion = computed(() => import.meta.env.VITE_PROMOTION_DAYS);
</script>
