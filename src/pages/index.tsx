//import Head from "next/head";

import { Box, Button, Heading, HStack } from "@chakra-ui/react";
import { m } from "framer-motion";
import { Span } from "../components/Span";
import { fadeToTop, scaleOnInteract } from "../theme/animations/motion";

import { GetStaticProps } from "next";
import Link from "next/link";
import { Background } from "../components/Background";
import { DeveloperImage } from "../components/images/svgs/DeveloperImage";
import { LayoutHead } from "../components/LayoutHead";
import { NamedIcon } from "../components/NamedIcon";
interface HomeProps {
  locale: string;
};

function Home({ locale }: HomeProps) {
  return (
    <>
      <LayoutHead
        locale={locale}
      />
      <Heading
        as={m.h1}
        mt={[150, 120, "10%", "10%", "10%", "10%"]}
        fontSize={[20, 30]}
        {...fadeToTop}
      >
        { locale === "pt-BR"? <>Um desenvolvedor <Span
          bgColor="alt.50"
          p={1}
          px={3}
          borderRadius={20}
        >
          full-stack
        </Span></>:<>A <Span
          bgColor="alt.50"
          p={1}
          px={3}
          borderRadius={20}
        >
          full-stack
        </Span> developer</>}
      </Heading>
      <HStack 
        color="primary.700"
        fontSize={[19, 28]}
      >
        <Box 
          as={m.div}
          {...fadeToTop}
        >
          <NamedIcon color="alt.700" name="next.js"/>
        </Box>
        <Box as={m.div} {...fadeToTop}><NamedIcon name="react.js"/></Box>
        <Box as={m.div} {...fadeToTop}><NamedIcon name="node.js"/></Box>
        <Box as={m.div} {...fadeToTop}><NamedIcon name="react native"/></Box>
        <Box as={m.div} {...fadeToTop}><NamedIcon name="nest.js"/></Box>
        <Box as={m.div} {...fadeToTop}><NamedIcon name="framer motion"/></Box>
        <Box as={m.div} {...fadeToTop}><NamedIcon name="tailwind"/></Box>
        <Box as={m.div} {...fadeToTop}><NamedIcon name="prisma"/></Box>
        <Box as={m.div} {...fadeToTop}><NamedIcon name="jest"/></Box>
        <Box as={m.div} {...fadeToTop}><NamedIcon name="git"/></Box>
        <Box as={m.div} {...fadeToTop}><NamedIcon name="docker"/></Box>
        <Box as={m.div} {...fadeToTop}><NamedIcon name="vscode"/></Box>
      </HStack>
      
      <Link href="/dev">
        <Button
          as={m.button}
          bgColor="alt.50"
          px={4}
          color="alt.700"
          borderRadius={20}
          _active={{
            bgColor: "alt.200"
          }}
          _hover={{
            cursor: "pointer",
            bgColor: "alt.100"
          }}
          fontSize={[16, 20]}
          borderBottom="2px"
          borderBottomColor="primary.700"
          {...fadeToTop}
          {...scaleOnInteract}
        >
          {locale === "pt-BR"? <>clique para <Span pl={2}>explorar</Span></>:<>click to <Span pl={1}>explore</Span></>}
        </Button>
      </Link>
      <Background
        w={[400, 400, 500, 500, 500, 600]}
        h="100%"
        bottom={[-270, -250, -240, -190, -190, -160]}
        left={[-34, -10, -50, -20, -10, -14]}
        zIndex={-1}
      >
        <DeveloperImage/>
      </Background>
    </>
  );
};

export const getStaticProps: GetStaticProps = async({ locale }) => {
  return {
    props: { locale },
    revalidate: 60 * 60 * 24 * 7
  };
};


export default Home;