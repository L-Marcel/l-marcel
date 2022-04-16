import { Box } from "@chakra-ui/react";
import useShowOverlay from "../contexts/hooks/useShowOverlay";

function Overlay() {
  const { showOverlay, setShowOverlay } = useShowOverlay();

  if(!showOverlay) {
    return null;
  };

  return (
    <Box 
      position="fixed"
      overscrollBehavior="contain"
      overflowY="scroll"
      display="flex"
      top={0}
      bottom={0}
      left={0}
      right={0}
      h="100vh"
      w="100vw"
      bgColor="overlay"
      onClick={() => setShowOverlay(false, "none")}
      zIndex={990}
    />
  );
};

export { Overlay };