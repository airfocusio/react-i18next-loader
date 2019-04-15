const crypto = require("crypto");
const path = require("path");
const { convertToLanguageFirst } = require("./utils");

const extension = ".i18n";

module.exports = function renderer(filepath, content) {
  const filename = path.basename(filepath);
  const hash = crypto
    .createHash("sha1")
    .update(content)
    .digest("base64");
  const namespace =
    filename.substr(0, filename.length - extension.length) +
    "__" +
    hash.substr(0, 5);
  const translations = convertToLanguageFirst(JSON.parse(content));

  return `var i18next = require('i18next').default;
var enhancedUseTranslation = require('./enhancedUseTranslation');
var translations = ${JSON.stringify(translations)};
var namespace = ${JSON.stringify(namespace)};
Object.keys(translations).forEach(function(lng) {
  i18next.addResourceBundle(lng, namespace, translations[lng]);
});
module.exports = {
  namespace: namespace,
  translations: translations,
  useTranslation: function() {
    return enhancedUseTranslation(namespace);
  },
};
`;
};
