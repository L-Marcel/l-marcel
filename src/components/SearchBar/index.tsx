import { Box, Input, InputGroup, InputLeftElement, useBreakpointValue, useColorModeValue } from "@chakra-ui/react";
import { m, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { } from "react-icons/bi";
import useFilterOptions from "../../contexts/hooks/repositories/useFilterOptions";
import useShowOverlay from "../../contexts/hooks/useShowOverlay";
import { Filters } from "./Filter";
import NamedIcon from "../NamedIcon";
import useFilterIsOpen from "../../contexts/hooks/searchBar/useFilterIsOpen";

interface SearchBarTecnhologies {
  locale?: string;
  technologies: string[];
};

function SearchBar({ locale, technologies }: SearchBarTecnhologies) {
  const { setShowOverlay, overlayId } = useShowOverlay();
  const { filterIsOpen } = useFilterIsOpen();
  const { filterOptions, setFilterOptions } = useFilterOptions();
  const border = useColorModeValue("secondary-600", "primary-600");
  const color = useColorModeValue("secondary.600", "primary.600");
  const [isFocused, setIsFocused] = useState(false);
  const [w, mw] = useBreakpointValue({
    base: [350, 300],
    xl: [600,  450],
    lg: [550, 450],
    md: [600, 400],
    sm: [340, 300]
  }) ?? [];

  useEffect(() => {
    setFilterOptions({
      ...filterOptions
    }, technologies);
  }, [technologies]);

  function onChangeQuery(q: string) {
    setFilterOptions({
      ...filterOptions,
      query: q
    });
  };

  return (
    <Box
      layoutId="search-bar"
      as={motion.div}
      w={[300, 300, 400, 450, 500]}
      animate={filterIsOpen && overlayId === "filter"? "expand":"normal"}
      maxH="90%"
      transition="width .5s linear"
      position="sticky"
      ml={overlayId === "filter"? 0:[0, 0, 0, 300, 300, 0]}
      mt={overlayId === "filter"? "-80px!important":[0, 5, 0, 0, 0, "-20px"]}
      top={overlayId === "filter"? 0:"40px"}
      zIndex={overlayId === "filter"? 991:30}
      variants={{
        normal: {
          width: mw
        },
        expand: {
          width: w
        }
      }}
    >
      <InputGroup
        w="100%"
        onFocus={() => {
          setIsFocused(true);
          setShowOverlay(true, "filter");
        }}
        onBlur={() => {
          setIsFocused(false);
        }}
        onClick={() => {
          setShowOverlay(true, "filter");
        }}
      >
        <InputLeftElement
          as={m.div}
          pointerEvents="none"
          borderRadius={8}
          children={<NamedIcon name="search"/>}
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
          placeholder={locale === "pt-BR"? "Pesquisar por nome...":"Search by name..."}
          animate={isFocused? "focused":"initial"}
          onChange={(e) => {
            onChangeQuery(e.target.value);
            setShowOverlay(true, "filter");
          }}
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
      <Filters locale={locale}/>
    </Box>
  );
};

export { SearchBar };