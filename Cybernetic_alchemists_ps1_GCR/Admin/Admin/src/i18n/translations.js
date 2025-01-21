import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Header translations
      'header.search': 'Search',
      'header.migration': 'Migration',
      'migration.import': 'Import Data',
      'migration.export': 'Export Data',
      'migration.connect': 'Connect to API',
      'migration.mapFields': 'Map Fields',
      'migration.uploadFile': 'Upload File',
      'migration.downloadData': 'Download Data',
      // Add other translations as needed
    }
  },
  // Add other languages as needed
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already does escaping
    }
  });

export default i18n;
