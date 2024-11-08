<template>
  <div class="bg-gray-50 min-h-screen py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-fredoka text-gray-900 mb-4">
          {{ t("faq.title") }}
        </h1>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          {{ t("faq.subtitle") }}
        </p>
      </div>

      <!-- FAQ Categories -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div
          v-for="category in categories"
          :key="category"
          class="bg-white rounded-lg shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow"
          @click="scrollToCategory(category)"
        >
          <div
            class="flex items-center justify-center h-12 w-12 rounded-md bg-primary-100 text-primary-600 mx-auto mb-4"
          >
            <i :class="getCategoryIcon(category)" class="text-xl"></i>
          </div>
          <h3 class="text-lg font-medium text-gray-900 text-center">
            {{ t(`faq.categories.${category}`) }}
          </h3>
        </div>
      </div>

      <!-- FAQ Sections -->
      <div class="space-y-12">
        <div
          v-for="category in categories"
          :key="category"
          :id="category"
          class="scroll-mt-24"
        >
          <h2 class="text-2xl font-fredoka text-gray-900 mb-6">
            {{ t(`faq.categories.${category}`) }}
          </h2>
          <div class="space-y-4">
            <Accordion>
              <AccordionTab
                v-for="key in getQuestionKeys(category)"
                :key="key"
                :header="t(`faq.questions.${category}.${key}.question`)"
              >
                <p class="text-gray-600">
                  {{ t(`faq.questions.${category}.${key}.answer`) }}
                </p>
              </AccordionTab>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";

const { t } = useI18n();

const categories = ["shipping", "returns", "products", "payment"];

const getCategoryIcon = (category) => {
  const icons = {
    shipping: "pi pi-truck",
    returns: "pi pi-refresh",
    products: "pi pi-shopping-bag",
    payment: "pi pi-credit-card",
  };
  return icons[category];
};

const getQuestionKeys = (category) => {
  switch (category) {
    case "shipping":
      return ["time", "cost"];
    case "returns":
      return ["policy", "process"];
    case "products":
      return ["size", "stock"];
    case "payment":
      return ["methods", "security"];
    default:
      return [];
  }
};

const scrollToCategory = (category) => {
  const element = document.getElementById(category);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};
</script>
