module.exports = {
  i18n: {
    defaultLocale: "en-us",
    locales: ["en-us", "pt-br"],
    localeDetection: false,
  },
  localePath:
    typeof window === "undefined"
      ? // eslint-disable-next-line @typescript-eslint/no-var-requires
        require("path").resolve("./public/locales")
      : "/locales",
};
