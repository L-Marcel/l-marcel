//import Head from "next/head";

import { Box, Button, Heading, HStack, Icon, IconButton, Image, Stack, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { m } from "framer-motion";
import { GetStaticProps } from "next";
import { Header } from "../components/Header";
import { Span } from "../components/Span";
import { fadeToTop, scaleOnInteract } from "../theme/animations/motion";
import { getStaticUserData } from "../utils/getStaticUserData";

import { BsFillMoonStarsFill } from "react-icons/bs";
import { SiReact, SiNextdotjs, SiPrisma, SiGit, SiVisualstudiocode } from "react-icons/si";
import { FaNodeJs, FaSun } from "react-icons/fa";
import { FiFramer } from "react-icons/fi";
import { boxShadow } from "../theme/effects/shadow";
import { DeveloperImage } from "../components/images/svgs/DeveloperImage";
import { Layout } from "../components/Layout";
import Link from "next/link";

function Home({ user }: PageProps) {
  const primary = useColorModeValue("secondary.700", "primary.700");

  return (
    <>
      <Heading
        as={m.h1}
        fontSize={[20, 30]}
        {...fadeToTop}
      >
        A <Span
          bgColor="alt.50"
          p={1}
          px={3}
          borderRadius={20}
        >
          full-stack
        </Span> developer
      </Heading>
      <HStack 
        color={primary}
        fontSize={[19, 28]}
        {...boxShadow(true)}
      >
        <Box 
          as={m.div}
          {...fadeToTop}
        >
          <Icon 
            color="alt.700"
            as={SiNextdotjs}
          />
        </Box>
        <Box as={m.div} {...fadeToTop}><Icon as={SiReact}/></Box>
        <Box as={m.div} {...fadeToTop}><Icon as={FaNodeJs}/></Box>
        <Box as={m.div} {...fadeToTop}><Icon as={FiFramer}/></Box>
        <Box as={m.div} {...fadeToTop}><Icon as={SiPrisma}/></Box>
        <Box as={m.div} {...fadeToTop}><Icon as={SiGit}/></Box>
        <Box as={m.div} {...fadeToTop}><Icon as={SiVisualstudiocode}/></Box>
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
          borderBottomColor={primary}
          {...fadeToTop}
          {...scaleOnInteract}
        >
          click to <Span pl={1}>explore</Span>
        </Button>
      </Link>
      <Box
        position="absolute"
        w={[400, 400, 500, 500, 500, 600]}
        h="100%"
        display="flex"
        bottom={[-270, -250, -240, -190, -190, -160]}
        left={[-34, -10, -50, -20, -10, -14]}
      >
        <DeveloperImage/>
      </Box>
    </>
  );
};

export const getStaticProps: GetStaticProps = async() => {
  const data = await getStaticUserData({});
  return {
    props: data,
    revalidate: 60 * 60 * 24
  };
};

export default Home;