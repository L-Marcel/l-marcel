import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import colorsConfig from "./colors.json";

const { semanticTokens } = colorsConfig;

export const theme = extendTheme({
  initialColorMode: 'dark',
  useSystemColorMode: false,
  semanticTokens,
  fonts: {
    heading: "'Inter', sans-serif",
    body: "'Inter', sans-serif",
  },
  styles: {
    global: (props) => ({
      "*": {
        userSelect: "none",
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
        background: mode(semanticTokens.colors["primary.600"].default, semanticTokens.colors["primary.600"]._dark)(props)
      },
      "::-webkit-scrollbar-thumb:hover": {
        background: mode(semanticTokens.colors["primary.800"].default, semanticTokens.colors["primary.800"]._dark)(props)
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
        bgImage: `linear-gradient(to right, ${
          mode(semanticTokens.colors["primary.800"].default, semanticTokens.colors["primary.800"]._dark)(props)} 0%, ${
            mode(semanticTokens.colors["primary.500"].default, semanticTokens.colors["primary.500"]._dark)(props)} 100%);`
      },
      "button:hover": {
        filter: "brightness(0.95)"
      },
      ".js-focus-visible :focus:not([data-focus-visible-added])": { 
        outline: "none",
        boxShadow: "none" 
      },
      "*:focus": {
        boxShadow: "none !important"
      },
      "input:focus": {
        boxShadow: "none !important"
      },
      ".chakra-checkbox__control:not([data-checked])": {
        borderColor: "transparent!important",
        bgColor: "alt.100",
        color: "alpha.800",
        p: 1,
        h: 6,
        w: 6,
        borderRadius: 8
      },
      ".chakra-checkbox__control[data-focus]": {
        outline: "none!important",
        boxShadow: "none!important"
      },
      ".chakra-checkbox__control[data-checked]": {
        borderColor: "transparent!important",
        bgColor: `${mode(semanticTokens.colors.filterOption.default, semanticTokens.colors.filterOption._dark)(props)}!important`,
        color: "var(--chakra-colors-alpha-800)!important",
        p: 1,
        h: 6,
        w: 6,
        borderRadius: 8
      },
      ".chakra-checkbox__control[data-indeterminate]": {
        borderColor: "transparent!important",
        bgColor: `${mode(semanticTokens.colors.filterOption.default, semanticTokens.colors.filterOption._dark)(props)}!important`,
        color: "var(--chakra-colors-alpha-800)!important",
        p: 1,
        h: 6,
        w: 6,
        borderRadius: 8
      },
      ".vertical-timeline-element-date": {
        position: "absolute",
        top: "-12px",
        padding: "2px 9px !important",
        borderRadius: "8px",
        backgroundColor: "var(--chakra-colors-card)",
        color: "var(--chakra-colors-alt-800)",
        textTransform: "capitalize"
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