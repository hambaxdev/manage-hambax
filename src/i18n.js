import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./locales/en/translation.json";
import de from "./locales/de/translation.json";
import ru from "./locales/ru/translation.json";
import enGdpr from "./locales/en/gdpr.json";
import deGdpr from "./locales/de/gdpr.json";
import ruGdpr from "./locales/ru/gdpr.json";

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    supportedLngs: ["en", "de", "ru"],
    debug: true,
    resources: {
      en: { 
        translation: en,
        gdpr: enGdpr
      },
      de: { 
        translation: de,
        gdpr: deGdpr
      },
      ru: { 
        translation: ru,
        gdpr: ruGdpr
      },
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
