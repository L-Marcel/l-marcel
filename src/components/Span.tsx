import { Text, TextProps, useColorModeValue } from "@chakra-ui/react";
import { AnimationProps, m } from "framer-motion";

interface SpanProps extends TextProps {
  variants?: AnimationProps["variants"]
};

function Span({ variants, ...rest }: SpanProps) {
  const primary = useColorModeValue(
    "var(--chakra-colors-secondary-700)", 
    "var(--chakra-colors-primary-700)"
  );

  return (
    <Text
      as={m.span}
      color={primary}
      {...rest}
    />
  );
};

export { Span };