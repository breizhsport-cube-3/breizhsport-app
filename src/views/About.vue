<template>
  <div class="bg-gray-50 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-fredoka text-gray-900 mb-4">
          {{ t("about.title") }}
        </h1>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          {{ t("about.subtitle") }}
        </p>
      </div>

      <!-- Main Content -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
        <div>
          <img
            src="../assets/images/about/about.jpg"
            alt="Breizhsport Store"
            class="rounded-lg shadow-sm w-full h-full object-cover"
          />
        </div>
        <div class="space-y-6">
          <h2 class="text-3xl font-fredoka text-gray-900">
            {{ t("about.story.title") }}
          </h2>
          <p class="text-gray-600">{{ t("about.story.content") }}</p>
          <div class="grid grid-cols-2 gap-6 mt-8">
            <div class="text-center">
              <div class="text-4xl font-fredoka text-primary-600 mb-2">10+</div>
              <div class="text-gray-600">{{ t("about.stats.years") }}</div>
            </div>
            <div class="text-center">
              <div class="text-4xl font-fredoka text-primary-600 mb-2">5000+</div>
              <div class="text-gray-600">{{ t("about.stats.customers") }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Values -->
      <div class="mb-12">
        <h2 class="text-3xl font-fredoka text-gray-900 text-center mb-8">
          {{ t("about.values.title") }}
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="(value, index) in values"
            :key="index"
            class="bg-white rounded-lg shadow-sm p-6 text-center"
          >
            <i :class="value.icon" class="text-4xl text-primary-500 mb-4"></i>
            <h3 class="text-xl font-fredoka text-gray-900 mb-2">
              {{ value.title }}
            </h3>
            <p class="text-gray-600">{{ value.description }}</p>
          </div>
        </div>
      </div>

      <!-- Team -->
      <div>
        <h2 class="text-3xl font-fredoka text-gray-900 text-center mb-8">
          {{ t("about.team.title") }}
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="(member, index) in team"
            :key="index"
            class="bg-white rounded-lg shadow-sm p-6 text-center"
          >
            <img
              :src="member.image"
              :alt="member.name"
              class="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 class="text-xl font-fredoka text-gray-900 mb-1">
              {{ member.name }}
            </h3>
            <p class="text-gray-600 mb-4">{{ member.position }}</p>
            <div class="flex justify-center space-x-4">
              <a
                v-for="(social, socialIndex) in member.socials"
                :key="socialIndex"
                :href="social.link"
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray-400 hover:text-primary-500"
              >
                <i :class="social.icon"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

// Import des images
import teamMember1 from "../assets/images/about/team/spencer-russell-C7FB7H-sXJs-unsplash.jpg";
import teamMember2 from "../assets/images/about/team/christina-wocintechchat-com-SJvDxw0azqw-unsplash.jpg";
import teamMember3 from "../assets/images/about/team/maaz-ijaz-xKn9Udjublw-unsplash.jpg";

const values = ref([
  {
    icon: "pi pi-heart text-primary-500",
    title: t("about.values.quality.title"),
    description: t("about.values.quality.description"),
  },
  {
    icon: "pi pi-globe text-primary-500",
    title: t("about.values.tradition.title"),
    description: t("about.values.tradition.description"),
  },
  {
    icon: "pi pi-users text-primary-500",
    title: t("about.values.community.title"),
    description: t("about.values.community.description"),
  },
]);

const team = ref([
  {
    name: "Yann Le Gall",
    position: t("about.team.positions.ceo"),
    image: teamMember1,
    socials: [
      {
        icon: "pi pi-linkedin",
        link: "#",
      },
      {
        icon: "pi pi-twitter",
        link: "#",
      },
    ],
  },
  {
    name: "Marie Kergoat",
    position: t("about.team.positions.marketing"),
    image: teamMember2,
    socials: [
      {
        icon: "pi pi-linkedin",
        link: "#",
      },
      {
        icon: "pi pi-twitter",
        link: "#",
      },
    ],
  },
  {
    name: "Alan Riou",
    position: t("about.team.positions.operations"),
    image: teamMember3,
    socials: [
      {
        icon: "pi pi-linkedin",
        link: "#",
      },
      {
        icon: "pi pi-twitter",
        link: "#",
      },
    ],
  },
]);
</script>
