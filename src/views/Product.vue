<template>
  <!-- Product Details -->
  <div v-if="product" class="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Product Images -->
      <div class="space-y-4">
        <!-- Main Image -->
        <div
          class="aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg overflow-hidden relative group"
        >
          <img
            :src="selectedImage"
            :alt="product.name[currentLocale]"
            class="w-full h-full object-cover"
          />
          <!-- Navigation Arrows -->
          <div
            class="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <button
              @click="previousImage"
              class="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-600 hover:text-primary-600 transition-colors"
              :class="{ 'opacity-50 cursor-not-allowed': isFirstImage }"
              :disabled="isFirstImage"
            >
              <i class="pi pi-chevron-left"></i>
            </button>
            <button
              @click="nextImage"
              class="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-600 hover:text-primary-600 transition-colors"
              :class="{ 'opacity-50 cursor-not-allowed': isLastImage }"
              :disabled="isLastImage"
            >
              <i class="pi pi-chevron-right"></i>
            </button>
          </div>
        </div>

        <!-- Thumbnail Images -->
        <div class="grid grid-cols-4 gap-4">
          <button
            v-for="(image, index) in displayedImages"
            :key="index"
            @click="handleImageClick(index)"
            class="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden relative"
            :class="{ 'ring-2 ring-primary-500': selectedImage === image }"
          >
            <img
              :src="image"
              :alt="`${product.name} view ${index + 1}`"
              class="w-full h-full object-cover"
            />
            <!-- Overlay for last image when there are more images -->
            <div
              v-if="index === 3 && hasMoreImages"
              class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            >
              <span class="text-white font-medium text-lg"
                >+{{ remainingImages }}</span
              >
            </div>
          </button>
        </div>
      </div>

      <!-- Product Info -->
      <div class="space-y-6">
        <div class="space-y-1">
          <!-- Title -->
          <div class="flex items-start justify-between">
            <h1 class="text-3xl font-fredoka text-gray-900">
              {{ product.name[currentLocale] }}
            </h1>
          </div>

          <!-- Brand and Rating -->
          <div class="text-sm flex items-center gap-3">
            <a
              href="#"
              class="text-primary-600 hover:text-primary-700 font-medium"
            >
              {{ product.brand }}
            </a>
            <div class="flex items-center space-x-2">
              <div class="flex items-center">
                <i
                  v-for="i in 5"
                  :key="i"
                  class="pi"
                  :class="[
                    i <= Math.floor(product.rating)
                      ? 'pi-star-fill text-yellow-400'
                      : i <= product.rating
                        ? 'pi-star-half text-yellow-400'
                        : 'pi-star text-gray-300',
                  ]"
                ></i>
              </div>
              <a
                href="#reviews"
                class="text-sm text-gray-500 hover:text-gray-700"
              >
                ({{ product.reviewCount }} avis)
              </a>
            </div>
          </div>

          <!-- Price and Stock Status -->
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <span class="text-2xl font-medium text-primary-600">
                {{ product.price }}€
              </span>
              <span
                v-if="product.oldPrice"
                class="text-sm text-gray-500 line-through"
              >
                {{ product.oldPrice }}€
              </span>
              <span
                v-if="product.oldPrice"
                class="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded"
              >
                -{{ discountPercentage }}%
              </span>
            </div>
          </div>
        </div>

        <!-- Variants Selection -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Size Selection -->
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <h3 class="font-medium">{{ t("shop.product.size") }}</h3>
              <button
                @click="showSizeGuide = true"
                class="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"
              >
                <i class="pi pi-ruler"></i>
                {{ t("shop.product.size_guide") }}
              </button>
            </div>
            <div class="relative">
              <div
                class="flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth relative"
                ref="sizesContainer"
              >
                <button
                  v-for="size in product.sizes"
                  :key="size.id"
                  @click="selectedSize = size.id"
                  class="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-sm transition-colors"
                  :class="[
                    !size.available && 'opacity-50 cursor-not-allowed',
                    selectedSize === size.id
                      ? 'border-2 border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-2 border-gray-200 hover:border-gray-300 text-gray-700',
                  ]"
                  :disabled="!size.available"
                >
                  {{ size.label }}
                </button>
              </div>
              <!-- Gradient Overlays -->
              <div
                v-if="showSizeScrollLeft"
                class="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent pointer-events-none"
              ></div>
              <div
                v-if="showSizeScrollRight"
                class="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent pointer-events-none"
              ></div>
            </div>
          </div>

          <!-- Color Selection -->
          <div class="space-y-4">
            <h3 class="font-medium">{{ t("shop.product.color.title") }}</h3>
            <div class="relative">
              <div
                class="flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth relative"
                ref="colorsContainer"
              >
                <button
                  v-for="color in product.colors"
                  :key="color.id"
                  @click="selectedColor = color.id"
                  class="w-10 h-10 rounded-full flex-shrink-0 relative"
                  :class="{ 'opacity-75 cursor-not-allowed': !color.available }"
                  :disabled="!color.available"
                  :title="color.name[currentLocale]"
                >
                  <span
                    class="absolute inset-0 rounded-full"
                    :style="{ backgroundColor: color.value }"
                  ></span>
                  <span
                    class="absolute inset-0 rounded-full border-2"
                    :class="[
                      selectedColor === color.id
                        ? 'border-primary-500'
                        : 'border-gray-200',
                    ]"
                  ></span>
                  <!-- Icône de croix pour les couleurs indisponibles -->
                  <div
                    v-if="!color.available"
                    class="absolute inset-0 flex items-center justify-center"
                  >
                    <i
                      class="pi pi-times text-red-500 text-lg"
                      :class="{ 'text-white': !isLightColor(color.value) }"
                    ></i>
                  </div>
                </button>
              </div>
              <!-- Gradient Overlays -->
              <div
                v-if="showColorScrollLeft"
                class="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent pointer-events-none"
              ></div>
              <div
                v-if="showColorScrollRight"
                class="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent pointer-events-none"
              ></div>
            </div>
          </div>
        </div>

        <!-- Actions Section -->
        <div class="flex flex-col sm:flex-row gap-3">
          <template v-if="product.inStock">
            <!-- Quantity Selector -->
            <div
              class="inline-flex items-center border-2 border-gray-200 rounded-lg shrink-0"
            >
              <button
                @click="quantity > 1 && quantity--"
                class="px-3 py-2 text-gray-600 hover:text-primary-600 transition-colors"
                :class="{ 'opacity-50 cursor-not-allowed': quantity <= 1 }"
              >
                <i class="pi pi-minus"></i>
              </button>
              <span
                class="w-12 text-center font-medium border-x-2 border-gray-200 py-2"
              >
                {{ quantity }}
              </span>
              <button
                @click="quantity < 10 && quantity++"
                class="px-3 py-2 text-gray-600 hover:text-primary-600 transition-colors"
                :class="{ 'opacity-50 cursor-not-allowed': quantity >= 10 }"
              >
                <i class="pi pi-plus"></i>
              </button>
            </div>

            <!-- Add to Cart Button -->
            <Button
              :label="t('shop.product.add_to_cart')"
              icon="pi pi-shopping-cart"
              severity="primary"
              class="flex-1 hidden sm:flex [&>.p-button-label]:hidden md:[&>.p-button-label]:hidden lg:[&>.p-button-label]:block"
              @click="addToCart"
              :disabled="!selectedSize || !selectedColor"
            />

            <!-- Buy Now Button -->
            <Button
              :label="t('shop.product.buy_now')"
              icon="pi pi-credit-card"
              severity="success"
              class="w-full sm:flex-1 hidden sm:flex [&>.p-button-label]:hidden md:[&>.p-button-label]:hidden lg:[&>.p-button-label]:block"
              @click="buyNow"
              :disabled="!selectedSize || !selectedColor"
            />
          </template>

          <!-- Out of Stock Message -->
          <template v-else>
            <div
              class="flex-1 bg-red-50 border-2 border-red-200 rounded-lg p-3 text-center"
            >
              <span
                class="text-red-600 font-medium flex items-center justify-center gap-2"
              >
                <i class="pi pi-exclamation-circle"></i>
                {{ t("shop.product.out_of_stock") }}
              </span>
            </div>
          </template>
        </div>

        <!-- Description Section -->
        <div class="border-t pt-1">
          <div class="space-y-3">
            <!-- Main Description -->
            <Fieldset :legend="t('shop.product.description.title')">
              <p class="text-gray-600 leading-relaxed">
                {{ product.description[currentLocale] }}
              </p>
            </Fieldset>

            <div class="flex flex-row gap-3">
              <!-- Features List -->
              <Fieldset
                :legend="t('shop.product.description.features')"
                class="flex-1"
              >
                <ul class="space-y-3">
                  <li
                    v-for="(feature, index) in product.features[currentLocale]"
                    :key="index"
                    class="flex items-start gap-3"
                  >
                    <i class="pi pi-check-circle text-primary-500 mt-1"></i>
                    <span class="text-gray-600">{{ feature }}</span>
                  </li>
                </ul>
              </Fieldset>

              <!-- Care Instructions -->
              <Fieldset
                :legend="t('shop.product.description.care')"
                class="flex-1"
              >
                <ul class="space-y-3">
                  <li
                    v-for="(instruction, index) in product.careInstructions[
                      currentLocale
                    ]"
                    :key="index"
                    class="flex items-start gap-3"
                  >
                    <i class="pi pi-info-circle text-gray-400 mt-1"></i>
                    <span class="text-gray-600">{{ instruction }}</span>
                  </li>
                </ul>
              </Fieldset>
            </div>

            <!-- Carousel for Related Products -->
            <Carousel
              :value="relatedProducts"
              :numVisible="2"
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
      </div>
    </div>
  </div>
  <div v-else>
    <!-- Loading or Error Message -->
    <p>Loading product details...</p>
  </div>

  <!-- Size Guide Dialog -->
  <Dialog
    v-model:visible="showSizeGuide"
    :modal="true"
    :header="t('shop.product.size_guide')"
    class="max-w-2xl"
  >
    <div class="space-y-6">
      <!-- Size Chart -->
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th
                class="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {{ t("shop.product.size_guide_table.size") }}
              </th>
              <th
                class="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {{ t("shop.product.size_guide_table.chest") }}
              </th>
              <th
                class="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {{ t("shop.product.size_guide_table.waist") }}
              </th>
              <th
                class="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {{ t("shop.product.size_guide_table.hips") }}
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(row, index) in product.sizeGuideData" :key="index">
              <td class="px-4 py-3 text-sm font-medium text-gray-900">
                {{ row.size }}
              </td>
              <td class="px-4 py-3 text-sm text-gray-500">
                {{ row.chest }}
              </td>
              <td class="px-4 py-3 text-sm text-gray-500">
                {{ row.waist }}
              </td>
              <td class="px-4 py-3 text-sm text-gray-500">
                {{ row.hips }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- How to Measure -->
      <div class="space-y-4">
        <h4 class="font-medium text-gray-900">
          {{ t("shop.product.size_guide_how_to_measure.title") }}
        </h4>
        <ul class="space-y-2 text-sm text-gray-600">
          <li class="flex items-start gap-2">
            <i class="pi pi-check text-primary-500 mt-0.5"></i>
            {{ t("shop.product.size_guide_how_to_measure.chest") }}
          </li>
          <li class="flex items-start gap-2">
            <i class="pi pi-check text-primary-500 mt-0.5"></i>
            {{ t("shop.product.size_guide_how_to_measure.waist") }}
          </li>
          <li class="flex items-start gap-2">
            <i class="pi pi-check text-primary-500 mt-0.5"></i>
            {{ t("shop.product.size_guide_how_to_measure.hips") }}
          </li>
        </ul>
      </div>
    </div>
  </Dialog>

  <!-- Image Gallery Modal -->
  <Dialog
    v-model:visible="showGallery"
    :modal="true"
    :header="t('shop.product.gallery')"
    class="max-w-4xl"
  >
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
      <div
        v-for="(image, index) in product.images"
        :key="index"
        class="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden"
      >
        <img
          :src="image"
          :alt="`${product.name} view ${index + 1}`"
          class="w-full h-full object-cover cursor-pointer"
          @click="selectAndCloseGallery(image)"
        />
      </div>
    </div>
  </Dialog>

  <Toast />
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useCartStore } from "../stores/cart";
import Button from "primevue/button";
import { useI18n } from "vue-i18n";
import Dialog from "primevue/dialog";
import Fieldset from "primevue/fieldset";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import productsData from "../data/products.json";
import Carousel from "primevue/carousel";
import { useProductsStore } from "../stores/products";
import ProductCard from "../components/ProductCard.vue";
import OverlayPanel from "primevue/overlaypanel";
import Toast from 'primevue/toast';
import { useToast } from "primevue/usetoast";

const route = useRoute();
const cartStore = useCartStore();
const quantity = ref(1);
const selectedSize = ref(null);
const selectedImage = ref("");
const selectedColor = ref(null);
const selectedModel = ref(null);
const showSizeGuide = ref(false);

const { t, locale } = useI18n();
const currentLocale = computed(() => locale.value);

const sizesContainer = ref(null);
const colorsContainer = ref(null);
const showSizeScrollLeft = ref(false);
const showSizeScrollRight = ref(false);
const showColorScrollLeft = ref(false);
const showColorScrollRight = ref(false);

const showGallery = ref(false);

// Fetch the product based on the route ID
const product = ref(null);

onMounted(() => {
  const productId = parseInt(route.params.id, 10);
  product.value = productsData.find((p) => p.id === productId);

  if (product.value) {
    selectedImage.value = product.value.images[0];
  }
});

const displayedImages = computed(() => {
  return product.value.images.slice(0, 4);
});

const hasMoreImages = computed(() => {
  return product.value.images.length > 4;
});

const remainingImages = computed(() => {
  return product.value.images.length - 4;
});

// Fonction pour vérifier si le défilement est nécessaire
const checkScroll = () => {
  if (sizesContainer.value) {
    const { scrollLeft, scrollWidth, clientWidth } = sizesContainer.value;
    showSizeScrollLeft.value = scrollLeft > 0;
    showSizeScrollRight.value = scrollLeft + clientWidth < scrollWidth;
  }

  if (colorsContainer.value) {
    const { scrollLeft, scrollWidth, clientWidth } = colorsContainer.value;
    showColorScrollLeft.value = scrollLeft > 0;
    showColorScrollRight.value = scrollLeft + clientWidth < scrollWidth;
  }
};

// Observer les changements de défilement
onMounted(() => {
  checkScroll();
  sizesContainer.value?.addEventListener("scroll", checkScroll);
  colorsContainer.value?.addEventListener("scroll", checkScroll);
  window.addEventListener("resize", checkScroll);
});

const toast = useToast();

const addToCart = () => {
  const selectedColorObject = product.value.colors.find(c => c.id === selectedColor.value);
  cartStore.addItem({
    ...product.value,
    size: selectedSize.value,
    color: selectedColor.value,
    colorData: selectedColorObject,
    quantity: quantity.value
  });
  
  // Utiliser le toast au lieu de l'overlay panel
  toast.add({
    severity: 'success',
    summary: t('shop.cart.added'),
    detail: t('shop.cart.added_detail'),
    life: 3000
  });
};

const isLightColor = (color) => {
  const [r, g, b] = color.match(/\w\w/g).map((x) => parseInt(x, 16));
  return r * 0.299 + g * 0.587 + b * 0.114 > 186;
};

const buyNow = () => {
  addToCart();
  router.push("/checkout");
};

const handleImageClick = (index) => {
  if (index === 3 && hasMoreImages.value) {
    showGallery.value = true;
  } else {
    selectedImage.value = displayedImages.value[index];
  }
};

const selectAndCloseGallery = (image) => {
  selectedImage.value = image;
  showGallery.value = false;
};

const currentImageIndex = computed(() => {
  return product.value.images.findIndex((img) => img === selectedImage.value);
});

const isFirstImage = computed(() => {
  return currentImageIndex.value === 0;
});

const isLastImage = computed(() => {
  return currentImageIndex.value === product.value.images.length - 1;
});

const previousImage = () => {
  if (!isFirstImage.value) {
    selectedImage.value = product.value.images[currentImageIndex.value - 1];
  }
};

const nextImage = () => {
  if (!isLastImage.value) {
    selectedImage.value = product.value.images[currentImageIndex.value + 1];
  }
};

window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    previousImage();
  } else if (e.key === "ArrowRight") {
    nextImage();
  }
});

const discountPercentage = computed(() => {
  if (!product.value.oldPrice) return 0;
  const discount =
    ((product.value.oldPrice - product.value.price) / product.value.oldPrice) *
    100;
  return Math.round(discount);
});

const router = useRouter();


const productsStore = useProductsStore();
const relatedProducts = computed(() => {
  const allProducts = productsStore.getAllProducts;
  return allProducts.slice(0, 5);
});

const viewProduct = (productId) => {
  router.push(`/product/${productId}`);
};

onMounted(() => {
  productsStore.loadProducts();
});

const responsiveOptions = ref([
  {
    breakpoint: "1245px",
    numVisible: 1,
    numScroll: 1,
  },
]);
</script>
<style scoped>
/* Ajout d'animations pour les sélections */
.color-transition {
  transition: all 0.2s ease-in-out;
}

button {
  transition: all 0.2s ease-in-out;
}

button:active {
  transform: scale(0.95);
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.p-carousel-item {
  width: 100%;
}

.related-products-carousel {
  .p-carousel-container {
    padding: 0 1rem;
  }

  :deep(.p-carousel-items-container) {
    margin: 0 -0.5rem;
  }

  :deep(.p-carousel-item) {
    padding: 0 0.5rem;
  }

  @media (max-width: 640px) {
    .p-carousel-container {
      padding: 0 0.5rem;
    }

    .p-button-sm {
      width: 2rem !important;
      height: 2rem !important;
    }
  }
}

/* Pour s'assurer que les boutons de navigation restent visibles */
:deep(.p-carousel-prev),
:deep(.p-carousel-next) {
  margin: 0 0.5rem;

  @media (max-width: 640px) {
    margin: 0 0.25rem;
  }
}
</style>
