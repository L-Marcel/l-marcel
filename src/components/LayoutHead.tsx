import { useColorModeValue } from "@chakra-ui/react";
import Head from "next/head";

interface  LayoutHeadProps {
  locale: string;
  ptBRTitle?: string;
  title?: string;
};

function LayoutHead({ locale, title, ptBRTitle }:  LayoutHeadProps) {
  const favicon = useColorModeValue("favicon.ico", "favicon-dark.ico");
  const haveTitle = ptBRTitle || title;
  
  return (
    <Head>
      <title>L-Marcel{haveTitle && ":"} {locale === "pt-BR"? ptBRTitle:title}</title>
      <link rel="icon" type="image/x-icon" href={`/favicons/${favicon}`}/>
    </Head>
  );
};

export {  LayoutHead };