import { ColorModeScript } from "@chakra-ui/react";
import { domAnimation } from "framer-motion";
import { AppProps } from "next/app";
import { Layout } from "../components/Layout";
import { AllProviders } from "../contexts/AllProviders";
import { theme } from "../theme/default";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient } from "react-query";

import "focus-visible/dist/focus-visible.min.js";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AllProviders 
      resetCSS 
      theme={theme}
      client={queryClient}
      features={domAnimation}
      reducedMotion="user"
    >
      <ColorModeScript initialColorMode="dark"/>
      <ReactQueryDevtools/>
      <Layout>
        <Component {...pageProps}/>
      </Layout>
    </AllProviders>
  );
};

export default MyApp;
