import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router";
import i18n from "./i18n";
import "primeicons/primeicons.css";

import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import ToastService from "primevue/toastservice";
import { useCartStore } from "./stores/cart";

const app = createApp(App);

app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});
app.use(createPinia());
app.use(router);
app.use(i18n);
app.use(ToastService);

// Initialize cart from localStorage
const cartStore = useCartStore();
cartStore.initializeCart();

app.mount("#app");
