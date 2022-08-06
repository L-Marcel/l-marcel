import type { AppProps } from "next/app";
import { Header } from "../components/Header";
import "../styles/main.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header/>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
