import { Box, Heading } from "@chakra-ui/react";
import { m } from "framer-motion";
import { NamedIcon } from "../NamedIcon";

interface BlankResultProps {
  locale?: string;
};

function BlankResult({
  locale
}: BlankResultProps) {
  return (
    <Box
      position="relative"
      as={m.div}
      minH={100}
      p={5}
      pl={[0, 0, 0, 300, 300, 0]}
      justifyContent="flex-start"
      alignItems="center"
      display="flex"
    >
      <NamedIcon
        name="info" 
        h={30} 
        w={30}
        color="primary.700"
      />
      <Heading
        ml={2}
        fontSize={[14, 16]}
        lineHeight={[5, 6]}
        color="primary.700"
        my="auto"
      >
        {locale === "pt-BR"? "Nenhum repositório encontrado.":"No repository found."}
      </Heading>
    </Box>
  );
};

export { BlankResult };