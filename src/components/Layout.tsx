import { Box, Icon, IconButton, Stack, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { m, motion } from "framer-motion";
import { ReactNode } from "react";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { FaSun } from "react-icons/fa";
import { fadeLayout, scaleOnInteract } from "../theme/animations/motion";
import { Header } from "./Header";

function Layout({ children, ...rest }: BoxProps) {
  const { toggleColorMode } = useColorMode();

  const primary = useColorModeValue("secondary.700", "primary.700");
  const ColorModeIcon = useColorModeValue(BsFillMoonStarsFill, FaSun);

  return (
    <Box
      as={motion.div}
      p={8}
      h="100vh"
      overflowY="auto"
      overflowX="hidden"
      layout
      {...rest}
      {...fadeLayout}
    >
      <IconButton
        as={m.button}
        position="absolute"
        top={0}
        right={0}
        m={6}
        aria-label="color-mode"
        bgColor="alt.50"
        onClick={toggleColorMode}
        icon={<Icon as={ColorModeIcon}/>}
        borderRadius={20}
        _hover={{
          bgColor: "alt.100"
        }}
        _active={{
          bgColor: "alt.200"
        }}
        borderBottom="2px"
        borderBottomColor={primary}
        layoutId="toggleButton"
        {...scaleOnInteract}
      />
      <Header/>
      <Stack
        as={m.div}
        display="flex"
        flexDir="column"
        w="100%"
        mt="40px"
        alignItems="center"
        justifyContent="center"
        color="alt.700"
        spacing={4}
        layoutId="body"
      >
        {children}
      </Stack>
    </Box>
  );
};

export { Layout };