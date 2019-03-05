const renderer = require("./renderer");

module.exports = function(content) {
  this.cacheable && this.cacheable();
  this.value = content;
  return renderer(this.resourcePath, content);
};
