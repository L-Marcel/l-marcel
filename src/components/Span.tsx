import { Text, TextProps, useColorModeValue } from "@chakra-ui/react";
import { m } from "framer-motion";

function Span({ ...rest }: TextProps) {
  const primary = useColorModeValue(
    "var(--chakra-colors-secondary-700)", 
    "var(--chakra-colors-primary-700)"
  );

  return (
    <Text
      as={m.span}
      color={primary}
      variants={{
        hidden: {
          opacity: 0,
          x: -10
        },
        visible: {
          x: 0,
          opacity: 1,
          transition: {
            duration: 1
          }
        }
      }}
      {...rest}
    />
  );
};

export { Span };