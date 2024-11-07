<template>
  <div>
    <!-- Filters and Products -->
    <div class="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <!-- Search Bar -->
      <div class="mb-8">
        <div class="relative max-w-xl mx-auto">
          <span
            class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500"
          >
            <i class="pi pi-search text-lg"></i>
          </span>
          <InputText
            v-model="searchQuery"
            placeholder="Rechercher un produit..."
            class="w-full pl-10 pr-4 py-2 border-gray-200 rounded-lg focus:ring-primary-500 focus:border-primary-500"
            @input="debounceSearch"
          />
          <span
            v-if="searchQuery"
            class="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
            @click="clearSearch"
          >
            <i
              class="pi pi-times text-lg text-gray-400 hover:text-gray-600"
            ></i>
          </span>
        </div>

        <!-- Search Tags/Filters -->
        <div v-if="activeFilters.length > 0" class="mt-4 flex flex-wrap gap-2">
          <span
            v-for="filter in activeFilters"
            :key="filter.id"
            class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-700"
          >
            {{ filter.label }}
            <button
              @click="removeFilter(filter)"
              class="ml-2 focus:outline-none"
            >
              <i class="pi pi-times"></i>
            </button>
          </span>
        </div>
      </div>

      <div class="flex flex-col md:flex-row gap-8">
        <!-- Filters Sidebar -->
        <div class="w-full md:w-64 space-y-6">
          <div>
            <h3 class="text-lg font-medium">Catégories</h3>
            <div class="mt-2 space-y-2">
              <div
                v-for="category in categories"
                :key="category.id"
                class="flex items-center"
              >
                <Checkbox
                  v-model="selectedCategories"
                  :value="category.id"
                  :inputId="'category-' + category.id"
                />
                <label
                  :for="'category-' + category.id"
                  class="ml-2 text-sm text-gray-600"
                >
                  {{ category.name }}
                </label>
              </div>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-medium">Prix</h3>
            <div class="mt-2">
              <Slider
                v-model="priceRange"
                range
                :min="0"
                :max="200"
                class="mt-4"
              />
              <div class="flex justify-between mt-2 text-sm text-gray-600">
                <span>{{ priceRange[0] }}€</span>
                <span>{{ priceRange[1] }}€</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Products Grid -->
        <div class="flex-grow">
          <!-- No Results Message -->
          <div
            v-if="filteredProducts.length === 0"
            class="text-center py-12 bg-gray-50 rounded-lg"
          >
            <i class="pi pi-search text-4xl text-gray-300"></i>
            <p class="mt-4 text-gray-500">
              Aucun résultat trouvé pour "{{ searchQuery }}"
            </p>
            <Button
              label="Réinitialiser la recherche"
              text
              @click="resetSearch"
              class="mt-2"
            />
          </div>

          <!-- Products Grid (existant) -->
          <div
            v-else
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <div
              v-for="product in filteredProducts"
              :key="product.id"
              class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <router-link :to="'/product/' + product.id">
                <img
                  :src="product.image"
                  :alt="product.name"
                  class="w-full h-48 object-cover"
                />
              </router-link>
              <div class="p-4">
                <h3 class="font-medium">{{ product.name }}</h3>
                <p class="text-sm text-gray-600 mt-1">{{ product.price }}€</p>
                <Button
                  label="Ajouter au panier"
                  icon="pi pi-shopping-cart"
                  class="w-full mt-4"
                  @click="cartStore.addItem(product)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useCartStore } from "../stores/cart";
import Checkbox from "primevue/checkbox";
import Slider from "primevue/slider";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import debounce from "lodash/debounce"; // N'oubliez pas d'installer lodash

const cartStore = useCartStore();
const showCart = ref(false);
const selectedCategories = ref([]);
const priceRange = ref([0, 200]);
const searchQuery = ref("");

// Debounce search function
const debounceSearch = debounce(() => {
  performSearch();
}, 300);

// Active filters computation
const activeFilters = computed(() => {
  const filters = [];

  if (searchQuery.value) {
    filters.push({
      id: "search",
      label: `Recherche: ${searchQuery.value}`,
      type: "search",
    });
  }

  selectedCategories.value.forEach((catId) => {
    const category = categories.value.find((c) => c.id === catId);
    if (category) {
      filters.push({
        id: `cat-${catId}`,
        label: category.name,
        type: "category",
      });
    }
  });

  if (priceRange.value[0] > 0 || priceRange.value[1] < 200) {
    filters.push({
      id: "price",
      label: `Prix: ${priceRange.value[0]}€ - ${priceRange.value[1]}€`,
      type: "price",
    });
  }

  return filters;
});

// Updated filtered products computation
const filteredProducts = computed(() => {
  return products.value.filter((product) => {
    const matchesSearch =
      searchQuery.value === "" ||
      product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      product.description
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase());

    const matchesCategory =
      selectedCategories.value.length === 0 ||
      selectedCategories.value.includes(product.categoryId);

    const matchesPrice =
      product.price >= priceRange.value[0] &&
      product.price <= priceRange.value[1];

    return matchesSearch && matchesCategory && matchesPrice;
  });
});

// Filter management functions
const removeFilter = (filter) => {
  switch (filter.type) {
    case "search":
      searchQuery.value = "";
      break;
    case "category":
      const catId = parseInt(filter.id.split("-")[1]);
      selectedCategories.value = selectedCategories.value.filter(
        (id) => id !== catId,
      );
      break;
    case "price":
      priceRange.value = [0, 200];
      break;
  }
};

const clearSearch = () => {
  searchQuery.value = "";
};

const resetSearch = () => {
  searchQuery.value = "";
  selectedCategories.value = [];
  priceRange.value = [0, 200];
};

const performSearch = () => {
  // Ici vous pourriez ajouter une logique supplémentaire
  // comme le tracking des recherches ou l'appel à une API
  console.log("Searching for:", searchQuery.value);
};

// Mock data
const categories = ref([
  { id: 1, name: "Gouren" },
  { id: 2, name: "Boules" },
  { id: 3, name: "Jeux Traditionnels" },
]);

const products = ref([
  {
    id: 1,
    name: "Roched Gouren",
    description:
      "Vêtement traditionnel pour la pratique du Gouren, fait main en Bretagne",
    price: 89.99,
    image: "/images/products/roched.jpg",
    categoryId: 1,
  },
  // Ajouter plus de produits ici
]);
</script>

<style scoped>
.search-highlight {
  background-color: rgba(132, 204, 22, 0.2); /* primary-500 avec opacité */
  padding: 0 2px;
  border-radius: 2px;
}
</style>
