import { Box, Heading } from "@chakra-ui/react";
import { m } from "framer-motion";
import { GetStaticProps } from "next";
import Link from "next/link";
import { Layout } from "../components/Layout";
import { fadeToTop } from "../theme/animations/motion";
import { getStaticUserData } from "../utils/getStaticUserData";

function Dev({ user }: PageProps) {
  return (
    <Box>
      <Link href="/">return</Link>
      <Heading as={m.h1} {...fadeToTop}>
        Test
      </Heading>
    </Box>
  );
};

export const getStaticProps: GetStaticProps = async() => {
  const data = await getStaticUserData({});
  return {
    props: data,
    revalidate: 60 * 60 * 24
  };
};


export default Dev;