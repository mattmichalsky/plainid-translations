import {changeLanguage, SUPPORTED_LANGUAGES} from '../../../services/translation';
import {useEffect, useState} from 'react';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import LanguageItem from './LanguageItem';

const LanguageList = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
`;

export default function LanguageSelector() {
  const {i18n} = useTranslation();
  const [languageLabels, setLanguageLabels] = useState({});

  useEffect(() => {
    const init = async () => {
      await i18n.reloadResources(SUPPORTED_LANGUAGES, import.meta.url);
      const labels = SUPPORTED_LANGUAGES.reduce((acc, lang) => {
        const resources = i18n.getResourceBundle(lang, import.meta.url);
        if (resources?.['LANGUAGE_PRETTY']) {
          acc[lang] = resources['LANGUAGE_PRETTY'];
        }
        return acc;
      }, {});
      setLanguageLabels(labels);
    }
    init();
  }, [i18n]);

  if (Object.keys(languageLabels).length < 1)
    return null;

  return (
    <LanguageList>
      {SUPPORTED_LANGUAGES.map(lang => (
        <LanguageItem key={lang}
                      label={languageLabels[lang]}
                      locale={lang}
                      isSelected={i18n.language === lang}
                      onLanguageChange={() => changeLanguage(lang)}/>))}
    </LanguageList>
  );
}
