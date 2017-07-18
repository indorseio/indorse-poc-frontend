const manageTranslations = require('react-intl-translations-manager').default;
const paths = require('../config/paths');

manageTranslations({
  messagesDirectory: `${paths.appSrc}/resources/translations/extracted-messages`,
  translationsDirectory: `${paths.appSrc}/resources/translations/locales/`,
  languages: ['en'], // any language you need
});
