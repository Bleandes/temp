import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import ptBR from './pt-BR/common.json';
import enUS from './en-US/common.json';
import esES from './es-ES/common.json';

const resources = {
  'pt-BR': {
    translation: {
      ...ptBR,
    },
  },
  'es-ES': {
    translation: {
      ...esES,
    },
  },
  'en-US': {
    translation: {
      ...enUS,
    },
  },
};

i18n.use(initReactI18next).init({
  resources: resources,
  lng: navigator.language,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
