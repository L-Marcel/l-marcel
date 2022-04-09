import { Heading } from "@chakra-ui/react";
import { m } from "framer-motion";
import { Span } from "../components/Span";
import { fadeToTop } from "../theme/animations/motion";

function Certificates() {
  return (
    <Heading
      as={m.h1}
      mt={150}
      fontSize={[25, 35]}
      {...fadeToTop}
    >
      Wait! <Span>This page is in maintenance</Span>.
    </Heading>
  );
};

export default Certificates;