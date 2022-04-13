import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import colorsConfig from "./colors.json";

const { colors, semanticTokens } = colorsConfig;

export const theme = extendTheme({
  initialColorMode: 'dark',
  useSystemColorMode: false,
  semanticTokens,
  colors,
  fonts: {
    heading: "'Inter', sans-serif",
    body: "'Inter', sans-serif",
  },
  styles: {
    global: (props) => ({
      "*": {
        //userSelect: "none",
        transition: "filter .2s linear !important",
        WebkitTapHighlightColor: "transparent"
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
      html: {
        height: "-webkit-fill-available",
        overscrollBehaviorY: "contain"
      },
      body: {
        bg: mode(semanticTokens.colors.background.default, semanticTokens.colors.background._dark)(props),
        w: "100vw",
        h: "100vh",
        minHeight: "100vh",
        minH: "-webkit-fill-available",
        overscrollBehaviorY: "contain",
        overflowY: "hidden",
        overflowX: "hidden",
        isRandom: true
      },
      'div[role="progressbar"]': {
        bgColor: mode(colors.secondary[700], colors.primary[700])(props)
      },
      "button:hover": {
        filter: "brightness(0.95)"
      },
      ".js-focus-visible :focus:not([data-focus-visible-added])": { 
        outline: "none",
        boxShadow: "none" 
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
      },
      ".vertical-timeline-element-date": {
        position: "absolute",
        top: "-12px",
        padding: "2px 9px !important",
        borderRadius: "8px",
        backgroundColor: "var(--chakra-colors-card)",
        color: "var(--chakra-colors-alt-800)"
      },
      "@media only screen and (min-width: 1170px)": {
        ".vertical-timeline--two-columns .vertical-timeline-element-icon": {
          left: "calc(50% + 10px)",
        },
        ".vertical-timeline-element-date": {
          padding: ".8em 0 !important",
          backgroundColor: "transparent !important"
        },
      },
      ".vertical-timeline::before": {
        top: "50px"
      },
      ".vertical-timeline-element-content": {
        boxShadow: "none !important",
      }
    })
  }
});