import { Heading } from "@chakra-ui/react";
import { m } from "framer-motion";
import { GetStaticProps } from "next";
import { LayoutHead } from "../components/LayoutHead";
import { Span } from "../components/Span";
import { fadeToTop } from "../theme/animations/motion";

interface NotFoundProps {
  locale: string;
};

function NotFound({ locale }: NotFoundProps) {
  return (
    <>
      <LayoutHead
        locale={locale}
        title="404"
        ptBRTitle="404"
      />
      <Heading
        as={m.h1}
        mt={150}
        fontSize={[25, 35]}
        {...fadeToTop}
      >
        <Span>404</Span>: {locale === "pt-BR"? "Página não encontrada":"Page not found"}
      </Heading>
    </>
  );
};

export const getStaticProps: GetStaticProps = async({ locale }) => {
  return {
    props: { locale },
    revalidate: false
  };
};

export default NotFound;