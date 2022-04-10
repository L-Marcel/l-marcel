import { IconButton, IconButtonProps, useColorModeValue } from "@chakra-ui/react";
import { m } from "framer-motion";
import useShowOverlay from "../contexts/hooks/useShowOverlay";
import { scaleOnInteract } from "../theme/animations/motion";

function FixedIconButton({ mt, mb, ...rest }: IconButtonProps) {
  const primary = useColorModeValue("secondary.700", "primary.700");
  const { showOverlay } = useShowOverlay();

  return (
    <IconButton
      as={m.button}
      position="fixed"
      top={[null, null, null, 0, 0, 0]}
      right={[0, 2, 0]}
      mr={showOverlay? [6, 8]:6}
      mt={mt ?? [68, 50, 6, 6, 6, 6]}
      mb={mb ?? [6, 6, 6, 0, 0, 0]}
      bottom={[0, 0, 0, null, null, null]}
      bgColor="buttons.100"
      borderRadius={20}
      _hover={{
        bgColor: "buttons.200"
      }}
      _active={{
        bgColor: "buttons.100"
      }}
      borderBottom="2px"
      zIndex={10}
      borderBottomColor={primary}
      {...rest}
      {...scaleOnInteract}
    />
);
};

export { FixedIconButton };