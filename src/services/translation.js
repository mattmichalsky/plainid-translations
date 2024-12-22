import i18n from 'i18next';
import i18NextHttpBackend from 'i18next-http-backend';
import {initReactI18next} from 'react-i18next';

export const init = ({ supportedLanguages, defaultLanguage, currentLanguage }) =>
  i18n
    .use(i18NextHttpBackend)
    .use(initReactI18next)
    .init({
      lng: currentLanguage,
      fallbackLng: defaultLanguage,
      supportedLngs: supportedLanguages,
      backend: {
        loadPath: '/component-locales/{{ns}}/{{lng}}/strings.json',
      }
    });
