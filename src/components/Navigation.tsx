import { Box, Link as CLink, LinkProps } from "@chakra-ui/react";
import { m } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";

interface NavigationProps extends LinkProps {
  type?: "first" | "last" | "common";
  locale?: string;
};

function Navigation({ 
  locale, 
  type = "common", 
  href, 
  children,
  p,
  px,
  ...rest 
}: NavigationProps) {
  const { asPath: path, locale: selectedLocale } = useRouter();
  
  let isPath = path === href;
  let isSelected = (isPath || selectedLocale === locale);

  return (
    <Link href={href ?? ""} locale={locale} passHref>
      <CLink
        as={m.a}
        {...rest}
      >
        <Box
          bgColor={isSelected? "alt.100":"alt.50"}
          color={isSelected && "primary.600"}
          p={p ?? [3, 4, 3]}
          px={px ?? [5, 4, 4, 7]}
          borderBottomLeftRadius={type === "first" && 20}
          borderBottomRightRadius={type === "last" && 20}
          borderTopLeftRadius={type === "first" && locale && 20}
          borderTopRightRadius={type === "last" && locale && 20}
          _hover={{
            bgColor: isSelected? "alt.200":"alt.100"
          }}
          _active={{
            bgColor: isSelected? "alt.300":"alt.200"
          }}
        >
          {children}
        </Box>
      </CLink>
    </Link>
  );
};

export { Navigation };