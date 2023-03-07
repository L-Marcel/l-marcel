module.exports = {
  i18n: {
    defaultLocale: "en-us",
    locales: ["en-us", "pt-br"],
    localeDetection: false,
  },
  reloadOnPrerender: process.env.NODE_ENV === "development",
};
