import { ColorModeScript } from "@chakra-ui/react";
import {domAnimation, LazyMotion, MotionConfig } from "framer-motion";
import { AppProps } from "next/app";
import { Layout } from "../components/Layout";
import { AllProviders } from "../contexts/AllProviders";
import { theme } from "../theme/default";

import "focus-visible/dist/focus-visible.min.js";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AllProviders resetCSS theme={theme}>
      <ColorModeScript initialColorMode="dark"/>
      <LazyMotion features={domAnimation}>
        <MotionConfig reducedMotion="user">
          <Layout>
            <Component {...pageProps}/>
          </Layout>
        </MotionConfig>
      </LazyMotion>
    </AllProviders>
  );
};

export default MyApp;
