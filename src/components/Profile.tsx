import { Box, Image } from "@chakra-ui/react";
import { m } from "framer-motion";
import { fadeToTop } from "../theme/animations/motion";

function Profile() {
  return (
    <Box
      as={m.div}
      position="absolute"
      top={0}
      left={0}
      p={2}
      m={8}
      bgColor="alt.200"
      _before={{
        content: "''",
        position: "absolute",
        left: "50%",
        top: "55%",
        w: "90%",
        h: "90%",
        bgColor: "alt.200",
        zIndex: -1
      }}
      {...fadeToTop}
    >
      <Image
        as={m.img}
        src="https://avatars.githubusercontent.com/u/62476762?v=4"
        h={[30, 50]}
        w={[30, 50]}
        {...fadeToTop}
      />
    </Box>
  );
};

export { Profile };