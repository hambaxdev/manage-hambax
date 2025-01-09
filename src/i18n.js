import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./locales/en/translation.json";
import de from "./locales/de/translation.json";
import ru from "./locales/ru/translation.json";

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    supportedLngs: ["en", "de", "ru"],
    debug: true,
    resources: {
      en: { translation: en },
      de: { translation: de },
      ru: { translation: ru },
    },
    detection: {
      order: ["queryString", "cookie", "localStorage", "navigator", "htmlTag"],
      caches: ["cookie", "localStorage"],
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
