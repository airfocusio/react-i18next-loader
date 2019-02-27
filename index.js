const path = require('path')
const { convertToLanguageFirst } = require('./utils')

const extension = '.i18n'

module.exports = function(content) {
  this.cacheable && this.cacheable()
  this.value = content

  const filename = path.basename(this.resourcePath)
  const namespace = filename.substr(0, filename.length - extension.length)
  const translations = convertToLanguageFirst(JSON.parse(content))

  const output = `var i18next = require('i18next').default;
var reactI18next = require('react-i18next');
var translations = ${JSON.stringify(translations)};
Object.keys(translations).forEach(function(lng) {
  i18next.addResourceBundle(lng, ${JSON.stringify(namespace)}, translations[lng]);
});
module.exports = {
  namespace: ${JSON.stringify(namespace)},
  translations: translations,
  useTranslation: function() {
    return reactI18next.useTranslation(${JSON.stringify(namespace)});
  },
};
`

  return output
}
