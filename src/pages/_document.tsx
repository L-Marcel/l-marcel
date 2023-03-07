import { Head, Html, Main, NextScript } from "next/document";
import { PageBody } from "../styles/document/styles";

function MyDocument() {
  return (
    <Html translate="no" className="dark">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&display=swap"
          rel="stylesheet"
        />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <PageBody>
        <Main />
        <NextScript />
      </PageBody>
    </Html>
  );
}

export default MyDocument;
