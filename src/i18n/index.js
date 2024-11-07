import { createI18n } from "vue-i18n";
import fr from "../langs/fr.json";
import en from "../langs/en.json";

export const availableLocales = {
  fr: {
    label: 'Français',
    flag: 'fr'
  },
  en: {
    label: 'English',
    flag: 'gb'
  }
};

// Récupérer la langue stockée ou utiliser la langue par défaut
const savedLocale = localStorage.getItem('userLocale') || 'fr';

const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: "en",
  messages: {
    fr,
    en,
  },
});

// Créer une fonction pour changer la langue qui gère aussi le localStorage
export function setLocale(newLocale) {
  i18n.global.locale.value = newLocale;
  localStorage.setItem('userLocale', newLocale);
}

export default i18n;
