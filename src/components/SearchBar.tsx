import { Icon, Input, InputGroup, InputLeftElement, useColorModeValue } from "@chakra-ui/react";
import { m } from "framer-motion";
import { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import useFilterOptions from "../contexts/hooks/repositories/useFilterOptions";
import { fadeToTop } from "../theme/animations/motion";

interface SearchBarTecnhologies {
  technologies: string[];
};

function SearchBar({ technologies }: SearchBarTecnhologies) {
  const { filterOptions, setFilterOptions } = useFilterOptions();
  const border = useColorModeValue("secondary-700", "primary-700");
  const color = useColorModeValue("secondary.600", "primary.600");
  const [isFocused, setIsFocused] = useState(false);

  function onChangeQuery(q: string) {
    setFilterOptions({
      ...filterOptions,
      query: q
    }, technologies);
  };

  return (
    <InputGroup
      position="sticky"
      as={m.div}
      ml={[0, 0, 0, 300, 300, 0]}
      mt={[0, 0, 0, -20, -20, "-60px"]}
      top={"40px"}
      w={300}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      zIndex={30}
      {...fadeToTop}
    >
      <InputLeftElement
        as={m.div}
        pointerEvents="none"
        borderRadius={8}
        children={<Icon as={BiSearchAlt}/>}
        bgColor={isFocused && "alt.50"}
        color={isFocused && color}
      />
      <Input
        as={m.input}
        bgColor="search"
        border="none"
        borderBottom={`2px solid var(--chakra-colors-${border})!important`}
        borderRadius={8}
        _placeholder={{
          color: "alt.400"
        }}
        placeholder="Search by name..."
        animate={isFocused? "focused":"initial"}
        onChange={(e) => onChangeQuery(e.target.value)}
        variants={{
          initial: {
            paddingLeft: 35
          },
          focused: {
            paddingLeft: 50,
            transition: {
              durantion: 1
            }
          }
        }}
        _focus={{
          bgColor: "search.100"
        }}
      />
    </InputGroup>
  );
};

export { SearchBar };