import { Box, Button } from "@chakra-ui/react";
import { m } from "framer-motion";
import useFilterOptions from "../../../contexts/hooks/repositories/useFilterOptions";
import { 
  scaleOnInteract, 
  expandedFilterButtonIcon, 
  reverseExpandedFilterButton
} from "../../../theme/animations/motion";
import { getConfigOptionText } from "../../../utils/getConfigOptionText";
import { NamedIcon } from "../../NamedIcon";

interface FilterOptionProps {
  value: RepositoriesFilterOptionsTag;
  locale?: string;
};

function TagFilterOption({ 
  value, 
  locale 
}: FilterOptionProps) {
  const { filterOptions, setFilterOptions } = useFilterOptions();
  const options = filterOptions.tag;

  return (
    <Button
      as={m.button}
      bgColor={options === value? "filterOption":"alt.50"}
      px={3}
      py={1}
      minH="auto"
      position="relative"
      h="auto"
      fontWeight="medium"
      pb="5px"
      borderRadius={8}
      _hover={{
        bgColor: options === value && "filterOption.100"
      }}
      onClick={() => {
        setFilterOptions({
          ...filterOptions,
          tag: value
        });
      }}
      {...scaleOnInteract}
      initial="initial"
      animate={options === value? "selected":"initial"}
      {...reverseExpandedFilterButton}
    >
      {options === value && <Box
        as={m.div}
        mt="5px"
        position="absolute"
        left={2}
        {...expandedFilterButtonIcon}
      >
        <NamedIcon 
          name="check"
        />
      </Box>}
      {getConfigOptionText(value, locale)}
    </Button>
  );
};

export { TagFilterOption };