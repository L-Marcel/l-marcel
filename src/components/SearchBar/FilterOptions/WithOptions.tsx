import { Box, Checkbox, Text, Wrap } from "@chakra-ui/react";
import useFilterOptions from "../../../contexts/hooks/repositories/useFilterOptions";
import { getAllFIlterConfigIsActived } from "../../../utils/getAllFIlterConfigIsActived";
import { getDisabledOptions } from "../../../utils/getDisabledOptions";
import { getEnabledOptions } from "../../../utils/getEnabledOptions";
import { FilterOption } from "./FilterOption";

interface WithOptions {
  locale?: string;
};

function WithOptions({
  locale
}) {
  const { filterOptions, setFilterOptions } = useFilterOptions();
  const allIsChecked = getAllFIlterConfigIsActived(filterOptions.with);
  const someIsChecked = filterOptions.with.some;

  function disableAll() {
    setFilterOptions({
      ...filterOptions,
      with: getDisabledOptions(filterOptions.with)
    });
  };

  function enableAll() {
    setFilterOptions({
      ...filterOptions,
      with: getEnabledOptions(filterOptions.with)
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
          {locale === "pt-BR"? "Repositório":"Repository"}:
        </Text>
      </Box>
      <Wrap
        mt={2}
        display="flex"
      >
        {Object.entries(filterOptions.with)
          .filter(e => e[0] !== "some")
          .map(e => {
            const [key] = e;

            return (
              <FilterOption
                key={`with-${key}`}
                locale={locale}
                keyName={key}
                config="with"
              />
            );
          })
        }
      </Wrap>
    </Box>
  );
};

export { WithOptions };