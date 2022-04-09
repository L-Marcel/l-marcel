import { Box, HStack, Icon, Stack, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { m, motion } from "framer-motion";
import {  BsFillCloudDownloadFill, BsFillMoonStarsFill } from "react-icons/bs";
import { FaSun } from "react-icons/fa";
import { fadeLayout } from "../theme/animations/motion";
import { FixedIconButton } from "./FixedIconButton";
import { Header } from "./Header";
import { Navigation } from "./Navigation";
import { Overlay } from "./Overlay";

function Layout({ children, ...rest }: BoxProps) {
  const { toggleColorMode } = useColorMode();

  const ColorModeIcon = useColorModeValue(BsFillMoonStarsFill, FaSun);

  return (
    <Box
      overflowY="scroll"
      id="scrollable"
      h="100%"
      maxH="100vh"
    >
      <Box
        position="relative"
        as={motion.div}
        p={8}
        minH="100vh"
        w="100%"
        layout
        {...rest}
        {...fadeLayout}
      >
        <Overlay/>
        <FixedIconButton
          aria-label="toggleColor"
          onClick={toggleColorMode}
          icon={<Icon as={ColorModeIcon}/>}
          zIndex={991}
        />
        <FixedIconButton
          aria-label="toggleColor"
          onClick={() => window.open("/curriculo.pdf", "_blank")}
          icon={<Icon as={BsFillCloudDownloadFill}/>}
          mt={[118, 100, 109, 86, 86, 76]}
        />
        <Box
          w="100%"
          top={0}
          left={0}
          position="absolute"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <HStack
            display="flex"
            justifyContent="center"
            ml={[0, 0, 450, 300, 300, 0]}
            w={["100%", "100%", "100%", "30%", "30%", "20%"]}
            spacing={0}
            h="100%"
            zIndex={4}
          >
            <Navigation type="first" href="/dev">Resume</Navigation>
            <Navigation href="/projects">Projects</Navigation>
            <Navigation type="last" href="/certificates">Certificates</Navigation>
          </HStack>
        </Box>
        <Header/>
        <Stack
          as={m.div}
          display="flex"
          flexDir="column"
          w="100%"
          mt="50px"
          alignItems="center"
          justifyContent="center"
          color="alt.700"
          spacing={4}
          layoutId="body"
        >
          {children}
        </Stack>
      </Box>
    </Box>
  );
};

export { Layout };