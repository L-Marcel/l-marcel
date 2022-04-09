import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { m, motion } from "framer-motion";
import Link from "next/link";
import { fadeLayout, fadeToTop } from "../theme/animations/motion";
import { Profile } from "./Profile";
import { Span } from "./Span";

function Header() {
  return (
    <>
      <Box
        as={m.div}
        position="relative"
        layoutId="header"
        mt={[55, 50, 0, 0, 0, 0]}
        {...fadeLayout}
      >
        <Profile/>
        <Stack
          mt={["2px", "3px", "5px"]}
          ml={[55, 76]}
          spacing="2px"
          color="alt.700"
        >
          <Heading
            as={motion.h1}
            fontSize={[16, 24]}
            {...fadeToTop}
          >
            <Span>L</Span>ucas <Span>Marcel</Span> Silva de Brito
          </Heading>
          <Text 
            as={m.p}
            fontSize={[14, 18]}
            {...fadeToTop}
          >lmgh1312@gmail.com <Span>| l-marcel</Span></Text>
        </Stack>
      </Box>
    </>
  );
};

export { Header };