import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

export const SUPPORTED_LANGUAGES = [
  'en-US',
  'es-ES'
];

const LANGUAGE_LOCAL_STORAGE_KEY = 'selected-language';
const defaultNamespace = 'components_HeaderPanel_LanguageSelector';

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

const customBackend = {
  type: 'backend',
  init(services, options = {}) {
    this.services = services;
    this.options = options;
  },
  async read(language, namespace, callback) {
    const modifiedNamespace = this.normalizeNamespaceOrUrl(namespace);
    const url = `/locales/${modifiedNamespace}/${language}/strings.json`;

    try {
      const response = await fetch(url).then(response => response.json());
      callback(null, response);
    } catch (e) {
      callback(e, null);
    }
  },
  normalizeNamespaceOrUrl(namespaceOrUrl) {
    const match = namespaceOrUrl.match(/\/src\/(.+?)\/[^/]+\.js$/);
    return !match ? namespaceOrUrl : match[1].replace(/\//g, '_');
  },
};

export const init = ({ defaultLanguage }) =>
  i18n
    .use(customBackend)
    .use(initReactI18next)
    .init({
      lng: getStoredLanguage() ?? defaultLanguage,
      fallbackLng: defaultLanguage,
      supportedLngs: SUPPORTED_LANGUAGES,

      // Define a "default" namespace to avoid attempting to fetch a non-existent 'translation' namespace. This overrides the default behavior of i18next
      ns: [defaultNamespace],
      defaultNS: defaultNamespace
    });

export const changeLanguage = async (language) => {
  if (!SUPPORTED_LANGUAGES.includes(language)) {
    throw new Error(`Language ${language} not supported!`);
  }

  await i18n.changeLanguage(language);
  storeLanguage(language);
}
