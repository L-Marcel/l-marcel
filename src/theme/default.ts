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
        h: 5,
        background: mode(semanticTokens.colors["imageColorDefault.300"].default, semanticTokens.colors["imageColorDefault.300"]._dark)(props)
      },
      "::-webkit-scrollbar-thumb": {
        background: mode(colors.secondary[600], colors.primary[600])(props)
      },
      "::-webkit-scrollbar-thumb:hover": {
        background: mode(colors.secondary[800], colors.primary[800])(props)
      },
      body: {
        bg: mode(semanticTokens.colors.background.default, semanticTokens.colors.background._dark)(props),
        h: "100vh",
        w: "100vw",
        overflowY: "scroll",
        overflowX: "hidden",
        isRandom: true
      },
      'div[role="progressbar"]': {
        bgColor: mode(colors.secondary[700], colors.primary[700])(props)
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