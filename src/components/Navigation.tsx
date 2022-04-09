import { Box, Link as CLink, LinkProps, useColorModeValue } from "@chakra-ui/react";
import { m } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";

interface NavigationProps extends LinkProps {
  type?: "first" | "last" | "common";
};

function Navigation({ type = "common", href, children, ...rest }: NavigationProps) {
  const color = useColorModeValue("secondary.600", "primary.600");
  const { asPath: path } = useRouter();
  let isPath = path === href;

  return (
    <Link href={href} passHref>
      <CLink
        as={m.a}
        {...rest}
      >
        <Box
          bgColor={isPath? "alt.100":"alt.50"}
          color={isPath && color}
          p={[3, 4, 3]}
          px={[5, 4, 4, 7]}
          borderBottomLeftRadius={type === "first" && 20}
          borderBottomRightRadius={type === "last" && 20}
          _hover={{
            bgColor: isPath? "alt.200":"alt.100"
          }}
          _active={{
            bgColor: isPath? "alt.300":"alt.200"
          }}
        >
          {children}
        </Box>
      </CLink>
    </Link>
  );
};

export { Navigation };