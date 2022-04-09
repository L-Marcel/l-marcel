import { Heading } from "@chakra-ui/react";
import { m } from "framer-motion";
import { Span } from "../components/Span";
import { fadeToTop } from "../theme/animations/motion";

function NotFound() {
  return (
    <Heading
      as={m.h1}
      mt={150}
      fontSize={[25, 35]}
      {...fadeToTop}
    >
      <Span>404</Span>: Page not found
    </Heading>
  );
};

export default NotFound;