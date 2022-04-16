import { ColorModeScript } from "@chakra-ui/react";
import { domAnimation } from "framer-motion";
import { AppProps } from "next/app";
import { Layout } from "../components/Layout";
import { AllProviders } from "../contexts/AllProviders";
import { theme } from "../theme/default";

import "focus-visible/dist/focus-visible.min.js";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AllProviders 
      resetCSS 
      theme={theme}
      features={domAnimation}
      reducedMotion="user"
    >
      <ColorModeScript initialColorMode="dark"/>
      <Layout>
        <Component {...pageProps}/>
      </Layout>
    </AllProviders>
  );
};

export default MyApp;
