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
                  @click="handleLocaleChange(option.code); languageOP.hide()"
                  class="w-full flex items-center gap-2 p-2 hover:bg-gray-50 rounded-md transition-colors"
                  :class="{ 'bg-gray-50': option.code === locale }"
                >
                  <span :class="`fi fi-${option.flag}`"></span>
                  <span class="text-sm">{{ option.label }}</span>
                </button>
              </div>
            </OverlayPanel>
          </div>
          <div class="relative inline-block">
            <Button
              ref="cartButton"
              icon="pi pi-shopping-cart"
              rounded
              text
              @click="toggleCart"
              :badge="cartStore.totalItems"
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
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, } from 'vue';
import { useCartStore } from "../stores/cart";
import { useI18n } from "vue-i18n";
import Logo from "./Logo.vue";
import MiniCart from "./MiniCart.vue";
import OverlayPanel from "primevue/overlaypanel";
import { availableLocales, setLocale } from '../i18n';
import 'flag-icons/css/flag-icons.min.css';
import Button from 'primevue/button';
import { useRouter } from 'vue-router';

const cartStore = useCartStore();
const { t, locale } = useI18n();
const languageOP = ref();
const cartOP = ref();
const router = useRouter();

const localeOptions = Object.entries(availableLocales).map(([code, info]) => ({
  code,
  ...info
}));

const handleLocaleChange = (code) => {
  setLocale(code);
};

const toggleCart = (event) => {
  event.stopPropagation();
  cartOP.value.toggle(event);
};
</script>


