const path = require("path");

module.exports = function(context, options) {
  const { customCss } = options || {};
  return {
    name: "theme-vivliostyle",
    getThemePath() {
      return path.resolve(__dirname, "./theme");
    },
    getClientModules() {
      return [customCss];
    }
  };
};
