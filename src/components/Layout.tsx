import { Box, HStack, Stack, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { m } from "framer-motion";
import { fadeLayout } from "../theme/animations/motion";
import { FixedIconButton } from "./FixedIconButton";
import { Header } from "./Header";
import NamedIcon from "./NamedIcon";
import { Navigation } from "./Navigation";
import { Overlay } from "./Overlay";

function Layout({ children, ...rest }: BoxProps) {
  const { toggleColorMode } = useColorMode();

  const icon = useColorModeValue("moon", "sun");

  return (
    <Box
      overflowY="scroll"
      overflowX="hidden"
      id="scrollable"
      h="100%"
      maxH="100vh"
      overscrollBehaviorY="contain"
    >
      <Box
        position="relative"
        as={m.div}
        p={8}
        minH={["calc(100vh + 0.5px)", "calc(100vh + 0.5px)", "100vh"]}
        w="100%"
        {...rest}
        {...fadeLayout}
      >
        <Overlay/>
        <FixedIconButton
          aria-label="toggleColor"
          onClick={toggleColorMode}
          icon={<NamedIcon name={icon}/>}
          zIndex={999}
          mb={[74, 76, 76, 0, 0, 0]}
        />
        <FixedIconButton
          aria-label="download"
          onClick={() => window.open("/curriculo.pdf", "_blank")}
          icon={<NamedIcon name="download"/>}
          mt={[0, 0, 0, 74, 74, 76]}
        />
        <Box
          as={m.div}
          w="100%"
          top={0}
          left={0}
          position="absolute"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <HStack
            as={m.div}
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
            <Navigation type="last" href="/achievements">Achievements</Navigation>
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
          pb={["30px", 0, 0, 0, 0, 0]}
        >
          {children}
        </Stack>
      </Box>
    </Box>
  );
};

export { Layout };