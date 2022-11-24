import type { AppProps } from "next/app";
import "rc-slider/assets/index.css";
import "react-vertical-timeline-component/style.min.css";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Layout } from "../styles/document/styles";
import { Analytics } from "@vercel/analytics/react";
import "../styles/main.scss";
import "../styles/slider.scss";
import "../styles/timeline.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Layout>
        <Header/>
        <Component {...pageProps} />
        <Footer/>
      </Layout>
      <Analytics/>
    </>
  );
}

export default MyApp;
