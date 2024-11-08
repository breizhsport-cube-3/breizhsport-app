<template>
  <footer class="bg-gray-900 text-gray-300">
    <div class="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- About -->
        <div class="space-y-4">
          <div class="flex items-center">
            <Logo dark class="text-white" />
            <h2 class="ml-2 text-xl font-fredoka text-white">Breizhsport</h2>
          </div>
          <p class="text-sm">
            {{ t("footer.about_text") }}
          </p>
          <div class="flex space-x-4">
            <a href="#" class="hover:text-primary-500">
              <i class="pi pi-facebook text-xl"></i>
            </a>
            <a href="#" class="hover:text-primary-500">
              <i class="pi pi-twitter text-xl"></i>
            </a>
            <a href="#" class="hover:text-primary-500">
              <i class="pi pi-instagram text-xl"></i>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-white font-medium mb-4">
            {{ t("footer.quick_links") }}
          </h3>
          <ul class="space-y-2">
            <li>
              <router-link to="/" class="text-sm hover:text-primary-500">
                {{ t("footer.home") }}
              </router-link>
            </li>
            <li>
              <router-link
                to="/products"
                class="text-sm hover:text-primary-500"
              >
                {{ t("footer.products") }}
              </router-link>
            </li>
            <li>
              <router-link to="/about" class="text-sm hover:text-primary-500">
                {{ t("footer.about") }}
              </router-link>
            </li>
            <li>
              <router-link to="/contact" class="text-sm hover:text-primary-500">
                {{ t("footer.contact") }}
              </router-link>
            </li>
            <li>
              <router-link to="/faq" class="text-sm hover:text-primary-500">
                {{ t("footer.faq") }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Categories -->
        <div>
          <h3 class="text-white font-medium mb-4">
            {{ t("footer.categories") }}
          </h3>
          <ul class="space-y-2">
            <li v-for="category in categories" :key="category.id">
              <router-link
                :to="`/products?category=${category.id}`"
                class="text-sm hover:text-primary-500"
              >
                {{ category.name }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h3 class="text-white font-medium mb-4">
            {{ t("footer.contact_us") }}
          </h3>
          <ul class="space-y-2">
            <li class="flex items-center text-sm">
              <i class="pi pi-map-marker mr-2"></i>
              <a
                href="https://www.google.com/maps/place/Conseil+r%C3%A9gional+de+Bretagne+-+Site+de+Patton/@48.1358851,-1.6640408,17z/data=!4m15!1m8!3m7!1s0x480ede64f2fcb4fb:0x5eeed88969f28c5f!2s283+Av.+G%C3%A9n%C3%A9ral+George+S.+Patton,+35000+Rennes!3b1!8m2!3d48.1358851!4d-1.6614659!16s%2Fg%2F11c1d7ywmh!3m5!1s0x480ede42a44056cf:0x5a117634ea28d852!8m2!3d48.135371!4d-1.662015!16s%2Fg%2F1tfm0vvp?entry=ttu&g_ep=EgoyMDI0MTAyOS4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                class="hover:text-primary-500"
              >
                283 Av. Général George S. Patton, 35000 Rennes
              </a>
            </li>
            <li class="flex items-center text-sm">
              <i class="pi pi-phone mr-2"></i>
              <a href="tel:+33299271010" class="hover:text-primary-500">
                +33 2 99 27 10 10
              </a>
            </li>
            <li class="flex items-center text-sm">
              <i class="pi pi-envelope mr-2"></i>
              <a
                href="mailto:contact@breizhsport.fr"
                class="hover:text-primary-500"
              >
                contact@breizhsport.fr
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom -->
      <div class="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
        <p>
          © {{ new Date().getFullYear() }} Breizhsport.
          {{ t("footer.rights") }}
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import Logo from "./Logo.vue";
import categoriesData from '../data/categories.json';
import { ref } from 'vue';

const { t } = useI18n();
const categories = ref(categoriesData.categories);
</script>
