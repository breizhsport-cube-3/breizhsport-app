import { createI18n } from "vue-i18n";
import fr from "../langs/fr.json";
import en from "../langs/en.json";

export default createI18n({
  legacy: false,
  locale: "fr",
  fallbackLocale: "en",
  messages: {
    fr,
    en,
  },
});
