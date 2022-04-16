import { Box, Stack, useColorModeValue } from "@chakra-ui/react";
import { m } from "framer-motion";
import useFilterIsOpen from "../../contexts/hooks/searchBar/useFilterIsOpen";
import useShowOverlay from "../../contexts/hooks/useShowOverlay";
import { FilterButton } from "./FilterButton";
import { IsOptions } from "./FilterOptions/IsOptions";
import { TagOptions } from "./FilterOptions/TagOptions";
import { WithOptions } from "./FilterOptions/WithOptions";

interface FiltersProps {
  locale?: string
};

function Filters({
  locale
}: FiltersProps) {
  const border = useColorModeValue("secondary-600", "primary-600");
  const { setShowOverlay, overlayId } = useShowOverlay();
  const { setFilterIsOpen, filterIsOpen } = useFilterIsOpen();

  return (
    <Box
      id="filter-box"
      position="absolute"
      display="flex"
      flexDir="column"
      w="100%"
      zIndex={-1}
    >
      <Stack
        as={m.div}
        display="flex"
        flexDir="column"
        borderBottomRadius={8}
        borderBottom={`2px solid var(--chakra-colors-${border})!important`}
        position="relative"
        initial="close"
        mx={2}
        p={4}
        mt={-4}
        pt="20px"
        animate={filterIsOpen && overlayId === "filter"? "open":"close"}
        bgColor="filter"
        variants={{
          close: {
            display: "none"
          },
          open: {
            display: "flex",
            marginTop: "-8px"
          }
        }}
      >
        <WithOptions locale={locale}/>
        <IsOptions locale={locale}/>
        <TagOptions locale={locale}/>
      </Stack>
      <FilterButton
        locale={locale}
        isOpen={filterIsOpen && overlayId === "filter"}
        onClick={() => {
          setShowOverlay(true, "filter");
          setFilterIsOpen(!filterIsOpen)
        }}
      />
    </Box>
  );
};

export { Filters };