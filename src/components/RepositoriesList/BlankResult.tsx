import { Box, Heading, useColorModeValue } from "@chakra-ui/react";
import { m } from "framer-motion";
import NamedIcon from "../NamedIcon";

interface BlankResultProps {
  locale?: string;
};

function BlankResult({
  locale
}: BlankResultProps) {
  const primary = useColorModeValue("secondary.700", "primary.700");
  
  return (
    <Box
      position="relative"
      as={m.div}
      w="100%"
      minH={100}
      bgColor="card"
      p={5}
      textTransform="capitalize"
      justifyContent="space-between"
      alignSelf="flex-start"
      borderRadius={10}
      borderBottom="2px"
      borderColor={primary}
    >
      <NamedIcon
        name="info" 
        h={30} 
        w={30}
        color="primary.500"
      />
      <Heading
        ml={2}
        fontSize={[14, 16]}
        lineHeight={[5, 6]}
        color="primary.500"
        my="auto"
      >
        {locale === "pt-BR"? "Nenhum repositório encontrado.":"No repository found."}
      </Heading>
    </Box>
  );
};

export { BlankResult };