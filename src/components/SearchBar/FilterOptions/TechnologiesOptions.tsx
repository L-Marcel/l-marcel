import { Box, Checkbox, Text, Wrap } from "@chakra-ui/react";
import useFilterOptions from "../../../contexts/hooks/repositories/useFilterOptions";
import { getAllFIlterConfigIsActived } from "../../../utils/getAllFIlterConfigIsActived";
import { getDisabledOptions } from "../../../utils/getDisabledOptions";
import { getEnabledOptions } from "../../../utils/getEnabledOptions";
import { TechnologyFilterOption } from "./TechnologyFilterOption";

interface TechnologiesOptions {
  locale?: string;
};

function TechnologiesOptions({
  locale
}) {
  const { filterOptions, setFilterOptions } = useFilterOptions();
  const allIsChecked = getAllFIlterConfigIsActived(filterOptions.technologies?.data);
  const someIsChecked = filterOptions.technologies?.some;

  function disableAll() {
    setFilterOptions({
      ...filterOptions
    }, {
      ...filterOptions.technologies,
      data: getDisabledOptions(filterOptions.technologies?.data)
    });
  };

  function enableAll() {
    setFilterOptions({
      ...filterOptions,
    }, {
      ...filterOptions.technologies,
      data: getEnabledOptions(filterOptions.technologies?.data)
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
          {locale === "pt-BR"? "Tecnologas":"Technologies"}:
        </Text>
      </Box>
      <Wrap
        mt={2}
        display="flex"
      >
        {Object.entries(filterOptions.technologies?.data ?? {})
          .map(e => {
            const [key] = e;

            return (
              <TechnologyFilterOption
                key={`tech-${key}`}
                locale={locale}
                keyName={key}
              />
            );
          })
        }
      </Wrap>
    </Box>
  );
};

export { TechnologiesOptions };