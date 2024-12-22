import i18n from 'i18next';
import i18NextHttpBackend from 'i18next-http-backend';
import {initReactI18next} from 'react-i18next';

export const SUPPORTED_LANGUAGES = [
  'en-US',
  'es-ES'
];

const LANGUAGE_LOCAL_STORAGE_KEY = 'selected-language';
const defaultNamespace = 'LanguageSelector';

const getStoredLanguage = () => {
  const storedLanguage = localStorage.getItem(LANGUAGE_LOCAL_STORAGE_KEY);

  if (!storedLanguage)
    return null;

  if (!SUPPORTED_LANGUAGES.includes(storedLanguage))
    return null;

  return storedLanguage;
};
 const storeLanguage = (lang) => lang
   ? localStorage.setItem(LANGUAGE_LOCAL_STORAGE_KEY, lang)
   : localStorage.removeItem(LANGUAGE_LOCAL_STORAGE_KEY);

export const init = ({ defaultLanguage }) =>
  i18n
    .use(i18NextHttpBackend)
    .use(initReactI18next)
    .init({
      lng: getStoredLanguage() ?? defaultLanguage,
      fallbackLng: defaultLanguage,
      supportedLngs: SUPPORTED_LANGUAGES,

      // Define a "default" namespace to avoid attempting to fetch a non-existent 'translation' namespace. This overrides the default behavior of i18next
      ns: [defaultNamespace],
      defaultNS: defaultNamespace,

      backend: {
        loadPath: '/component-locales/{{ns}}/{{lng}}/strings.json',
      }
    });

export const changeLanguage = async (language) => {
  if (!SUPPORTED_LANGUAGES.includes(language)) {
    throw new Error(`Language ${language} not supported!`);
  }

  await i18n.changeLanguage(language);
  storeLanguage(language);
}
