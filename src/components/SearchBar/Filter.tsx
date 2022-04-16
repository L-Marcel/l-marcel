import { Box, Stack } from "@chakra-ui/react";
import { m } from "framer-motion";
import useFilterIsOpen from "../../contexts/hooks/searchBar/useFilterIsOpen";
import useShowOverlay from "../../contexts/hooks/useShowOverlay";
import { FilterButton } from "./FilterButton";
import { IsOptions } from "./FilterOptions/IsOptions";
import { TagOptions } from "./FilterOptions/TagOptions";
import { TechnologiesOptions } from "./FilterOptions/TechnologiesOptions";
import { WithOptions } from "./FilterOptions/WithOptions";

interface FiltersProps {
  locale?: string
};

function Filters({
  locale
}: FiltersProps) {
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
      overscrollBehaviorY="contain"
    >
      <Stack
        as={m.div}
        display="flex"
        flexDir="column"
        borderBottomLeftRadius={8}
        borderBottom={`2px solid var(--chakra-colors-priamry-600)!important`}
        position="relative"
        initial="close"
        spacing={4}
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
        maxH="60vh"
        overflowY="auto"
        overscrollBehaviorY="contain"
      >
        <WithOptions locale={locale}/>
        <IsOptions locale={locale}/>
        <TagOptions locale={locale}/>
        <TechnologiesOptions locale={locale}/>
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