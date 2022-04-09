import { Box, BoxProps } from "@chakra-ui/react";
import { m } from "framer-motion";
import { fadeToTop } from "../theme/animations/motion";

function Background({ 
  children,
  ...rest
}: BoxProps) {
  return (
    <Box
      as={m.div}
      position="fixed"
      display="flex"
      {...rest}
      {...fadeToTop}
    >
     {children} 
    </Box>
  );
};

export { Background };