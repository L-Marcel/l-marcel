import { Box, Button } from "@chakra-ui/react";
import { m } from "framer-motion";
import useFilterOptions from "../../../contexts/hooks/repositories/useFilterOptions";
import { 
  expandedFilterButton, 
  scaleOnInteract, 
  expandedFilterButtonIcon 
} from "../../../theme/animations/motion";
import { getConfigOptionText } from "../../../utils/getConfigOptionText";
import { NamedIcon } from "../../NamedIcon";

interface FilterOptionProps {
  config?: "with" | "is";
  keyName: string;
  locale?: string;
};

function FilterOption({ 
  config, 
  keyName: key, 
  locale 
}: FilterOptionProps) {
  const { filterOptions, setFilterOptions } = useFilterOptions();
  const options = config? filterOptions[config]:filterOptions;

  return (
    <Button
      as={m.button}
      bgColor={options[key]? "filterOption":"alt.50"}
      px={3}
      py={1}
      minH="auto"
      position="relative"
      h="auto"
      fontWeight="medium"
      pb="5px"
      borderRadius={8}
      _hover={{
        bgColor: options[key] && "filterOption.100"
      }}
      onClick={() => {
        setFilterOptions({
          ...filterOptions,
          [config ?? key]: config? {
            ...options,
            [key]: !options[key]
          }:!options[key]
        });
      }}
      {...scaleOnInteract}
      initial="initial"
      animate={options[key]? "selected":"initial"}
      {...expandedFilterButton}
    >
      {getConfigOptionText(key, locale)}
      {options[key] && <Box
        as={m.div}
        mt="5px"
        position="absolute"
        right={2}
        {...expandedFilterButtonIcon}
      >
        <NamedIcon 
          name="close"
        />
      </Box>}
    </Button>
  );
};

export { FilterOption };