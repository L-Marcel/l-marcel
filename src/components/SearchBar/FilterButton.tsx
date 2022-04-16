import { Box, Text } from "@chakra-ui/react";
import { m } from "framer-motion";
import useFilterOptions from "../../contexts/hooks/repositories/useFilterOptions";
import { getNumberOfActivedFilters } from "../../utils/getNumberOfActivedFilters";
import { NamedIcon } from "../NamedIcon";

interface FilterButtonProps {
  isOpen: boolean;
  onClick: () => void;
  locale?: string;
};

function FilterButton({
  isOpen,
  onClick,
  locale
}: FilterButtonProps) {
  const { filterOptions } = useFilterOptions();
  const numbOfActivedFilters = getNumberOfActivedFilters([
    filterOptions.is,
    filterOptions.with,
    filterOptions.technologies?.data
  ], filterOptions.tag !== "any"? 1:0);

  return (
    <Box
      as={m.div}
      position="relative"
      mt="-24px"
      role="icon"
      w="min-content"
      pt={3}
      _hover={{
        cursor: "pointer",
        "& #filter-button-icon": {
          bgColor: "alt.100"
        },
      }}
      whileHover={{
        marginTop: "-22px"
      }}
      onClick={onClick}
    >
      <Box
        display="flex"
        position="relative"
        ml={4}
        pt={3}
        px={2}
        pr={7}
        minW={0}
        minH={0}
        borderRadius={8}
        w="min-content"
        bgColor="search"
        aria-label="filter-button"
        zIndex={-1}
        borderLeft={`2px solid var(--chakra-colors-primary-600)!important`}
      >
        <Text
          fontSize={15}
          w="min-content"
        >
          {locale === "pt-BR"? "filtros":"filters"}
        </Text>
        <Box
          id="filter-button-icon"
          position="absolute"
          display="flex"
          bgColor="alt.50"
          right={0}
          top={0}
          p={1}
          pt="14.5px"
          h="100%"
          w={6}
          borderBottomRightRadius={8}
        >
          <NamedIcon
            name={isOpen? "up":"down"}
          />
        </Box>
        <Box
          as={m.div}
          position="absolute"
          display="flex"
          bgColor="primary.600"
          initial="initial"
          animate={numbOfActivedFilters? "actived":"initial"}
          left="90px"
          top={0}
          px={numbOfActivedFilters === 1? "8px":"7px"}
          pt="10px"
          h="100%"
          borderBottomRadius={8}
          variants={{
            initial: {
              y: -25,
            },
            actived: {
              y: 0
            }
          }}
        >
          <Text>{numbOfActivedFilters}</Text>
        </Box>
      </Box>
    </Box>
  );
};

export { FilterButton };