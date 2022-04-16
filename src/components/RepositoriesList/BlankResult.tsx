import { Box, Heading, useColorModeValue } from "@chakra-ui/react";
import { m } from "framer-motion";
import NamedIcon from "../NamedIcon";

interface BlankResultProps {
  locale?: string;
};

function BlankResult({
  locale
}: BlankResultProps) {
  const primary = useColorModeValue("secondary.700", "primary.700")  
  return (
    <Box
      position="relative"
      mt={20}
      as={m.div}
      minH={100}
      p={5}
      textTransform="capitalize"
      justifyContent="flex-start"
      alignItems="center"
      display="flex"
    >
      <NamedIcon
        name="info" 
        h={30} 
        w={30}
        color={primary}
      />
      <Heading
        ml={2}
        fontSize={[14, 16]}
        lineHeight={[5, 6]}
        color={primary}
        my="auto"
      >
        {locale === "pt-BR"? "Nenhum repositório encontrado.":"No repository found."}
      </Heading>
    </Box>
  );
};

export { BlankResult };