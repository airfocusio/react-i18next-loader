const reactI18next = require("react-i18next");

function enhancedUseTranslation(ns, opts) {
  return reactI18next.useTranslation(ns, opts);
}

module.exports = enhancedUseTranslation;
