import { createI18n } from "vue-i18n";
import fr from "../locales/fr.json";
import en from "../locales/en.json";
import br from "../locales/br.json";

export const availableLocales = {
  fr: {
    label: "Français",
    flag: "fr",
  },
  br: {
    label: "Breton",
    flag: "fr",
  },
  en: {
    label: "English",
    flag: "gb",
  },
};

const savedLocale = localStorage.getItem("userLocale") || "fr";

const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: "en",
  messages: {
    fr,
    en,
    br,
  },
});

export function setLocale(newLocale) {
  i18n.global.locale.value = newLocale;
  localStorage.setItem("userLocale", newLocale);
}

export default i18n;
