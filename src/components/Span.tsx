import { Text, TextProps } from "@chakra-ui/react";
import { AnimationProps, m } from "framer-motion";

interface SpanProps extends TextProps {
  variants?: AnimationProps["variants"]
};

function Span({ variants, ...rest }: SpanProps) {
  return (
    <Text
      as={m.span}
      color="var(--chakra-colors-primary-700)"
      {...rest}
    />
  );
};

export { Span };