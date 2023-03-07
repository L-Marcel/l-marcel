// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

module.exports = {
  debug: true,
  i18n: {
    defaultLocale: "pt-BR",
    locales: ["en-US", "pt-BR"],
    localeDetection: false,
  },
  localePath:
    typeof window === "undefined" ? path.resolve("./public/locales") : "/locales",
  reloadOnPrerender: process.env.NODE_ENV === "development",
};
