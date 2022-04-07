import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import colorsConfig from "./colors.json";

const { colors, semanticTokens } = colorsConfig;

export const theme = extendTheme({
  semanticTokens,
  colors,
  fonts: {
    heading: "'Inter', sans-serif",
    body: "'Inter', sans-serif",
  },
  styles: {
    global: (props) => ({
      "*": {
        userSelect: "none",
        transition: "filter .2s linear !important",
      },
      "::-webkit-scrollbar": {
        w: 2,
        mr: -2
      },
      "::-webkit-scrollbar-track": {
        //background: colors.primary[300]
      },
      "::-webkit-scrollbar-thumb": {
        //background: colors.primary[400]
      },
      "::-webkit-scrollbar-thumb:hover": {
        //background: colors.primary[500]
      },
      body: {
        bg: mode(semanticTokens.colors.background.default, semanticTokens.colors.background._dark)(props),
        h: "100vh",
        w: "100vw",
        overflow: "hidden",
        isRandom: true
      },
      "button:hover": {
        filter: "brightness(0.95)"
      },
      ".primary-progressbar > div[role='progressbar']": {
        //bg: colors.primary[500]
      },
      "*:focus": {
        boxShadow: "none !important"
      },
      "input:focus": {
        boxShadow: "none !important"
      },
      ".chakra-checkbox__control:not([data-checked])": {
        color: "var(--primary) !important",
        bgColor: "primary.100"
      }
    })
  }
});