import { Box, Checkbox, Text, Wrap } from "@chakra-ui/react";
import useFilterOptions from "../../../contexts/hooks/repositories/useFilterOptions";
import { getAllFIlterConfigIsActived } from "../../../utils/getAllFIlterConfigIsActived";
import { getDisabledOptions } from "../../../utils/getDisabledOptions";
import { getEnabledOptions } from "../../../utils/getEnabledOptions";
import { FilterOption } from "./FilterOption";

interface IsOptions {
  locale?: string;
};

function IsOptions({
  locale
}) {
  const { filterOptions, setFilterOptions } = useFilterOptions();
  const allIsChecked = getAllFIlterConfigIsActived(filterOptions.is);
  const someIsChecked = filterOptions.is.some;

  function disableAll() {
    setFilterOptions({
      ...filterOptions,
      is: getDisabledOptions(filterOptions.is)
    });
  };

  function enableAll() {
    setFilterOptions({
      ...filterOptions,
      is: getEnabledOptions(filterOptions.is)
    });
  };

  return (
    <Box
      w="98%"
    >
      <Box 
        display="flex"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          if(allIsChecked) {
            disableAll();
          } else {
            enableAll();
          };
        }}
      >
        <Checkbox
          mr={2}
          isChecked={allIsChecked}
          isIndeterminate={someIsChecked && !allIsChecked}
          pointerEvents="none"
        />
        <Text>
          {locale === "pt-BR"? "Tipo":"Type"}:
        </Text>
      </Box>
      <Wrap
        mt={2}
        display="flex"
      >
        {Object.entries(filterOptions.is)
          .filter(e => e[0] !== "some")
          .map(e => {
            const [key] = e;

            return (
              <FilterOption
                key={`is-${key}`}
                locale={locale}
                keyName={key}
                config="is"
              />
            );
          })
        }
      </Wrap>
    </Box>
  );
};

export { IsOptions };