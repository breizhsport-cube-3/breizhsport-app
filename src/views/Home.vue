<template>
  <div>
    <!-- Hero Section -->
    <div class="relative bg-gradient-to-b from-primary-50 to-white">
      <div
        class="absolute inset-0 flex flex-col justify-center items-center text-center bg-white bg-opacity-75 z-10"
      >
        <h2 class="text-4xl font-fredoka text-gray-900 sm:text-5xl">
          {{ t("home.hero_title") }}
        </h2>
        <p class="mt-4 text-xl text-gray-600">
          {{ t("home.hero_subtitle") }}
        </p>
        <div class="mt-8">
          <router-link
            to="/products"
            class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
          >
            {{ t("home.shop_now") }}
          </router-link>
        </div>
      </div>
      <Carousel
        :value="carouselImages"
        :numVisible="1"
        :numScroll="1"
        circular
        :autoplayInterval="7000"
        :showNavigators="false"
        :showIndicators="false"
      >
        <template #item="slotProps">
          <img :src="slotProps.data" class="w-full h-96 object-cover" />
        </template>
      </Carousel>
    </div>

    <!-- Featured Categories -->
    <div class="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="category in categories"
          :key="category.id"
          class="relative rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
          @click="navigateToProducts(category.id)"
        >
          <img
            :src="category.image"
            :alt="category.name"
            class="w-full h-64 object-cover"
          />
          <div
            class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center"
          >
            <h3 class="text-white text-xl font-fredoka">{{ category.name }}</h3>
          </div>
        </div>
      </div>
    </div>

    <!-- Related Products -->
    <div class="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <h2 class="text-3xl font-fredoka text-gray-900 text-center mb-8">
        {{ t("home.featured_products") }}
      </h2>
      <Carousel
        :value="featuredProducts"
        :numVisible="5"
        :numScroll="1"
        circular
        :responsiveOptions="responsiveOptions"
        :autoplayInterval="3000"
      >
        <template #item="slotProps">
          <ProductCard
            :product="slotProps.data"
            @showLogin="userOP.toggle($event)"
          />
        </template>
      </Carousel>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import Carousel from "primevue/carousel";
import { useProductsStore } from "../stores/products";
import ProductCard from "../components/ProductCard.vue";
import categoriesData from "../data/categories.json";
import { useRouter } from "vue-router";

const { t } = useI18n();
const productsStore = useProductsStore();
const userOP = ref();

const categories = ref(
  categoriesData.categories.map((category) => ({
    ...category,
    image: new URL(
      `../assets/images/home/categories/${category.image}`,
      import.meta.url,
    ).href,
  })),
);

const carouselImages = ref([]);
const imageModules = import.meta.glob(
  "../assets/images/home/slideshow/*.{png,jpg,jpeg,svg}",
);

for (const path in imageModules) {
  imageModules[path]().then((module) => {
    carouselImages.value.push(module.default);
  });
}

const featuredProducts = computed(() => {
  const allProducts = productsStore.getAllProducts;
  return allProducts.slice(0, 5); // Get first 5 products as featured
});

const responsiveOptions = ref([
  {
    breakpoint: "1245px",
    numVisible: 1,
    numScroll: 1,
  },
]);

const router = useRouter();

const navigateToProducts = (categoryId: number) => {
  router.push({
    path: "/products",
    query: { category: categoryId.toString() },
  });
};

// Load products when component mounts
onMounted(() => {
  productsStore.loadProducts();
});
</script>
