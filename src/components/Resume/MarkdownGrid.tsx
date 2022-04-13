import { Box, HStack, Stack, useBreakpointValue } from "@chakra-ui/react";
import { m } from "framer-motion";
import { ReactNode } from "react";
import { fadeToTopOnScroll } from "../../theme/animations/motion";

interface MarkdownGridProps extends BoxProps {
  items: any[];
};

function MarkdownGrid({
  items
}: MarkdownGridProps) {
  const stacks = useBreakpointValue({
    base: ["a"],
    xl: ["a", "b", "c", "d"],
    lg: ["a", "b"],
    md: ["a"],
    sm: ["a"]
  }) ?? [];

  if(!items || items?.length <= 0) {
    return null;
  };

  const qtdStacks = stacks.length;

  const rows = [];

  for(let c = 0; c < items.length/qtdStacks; c++) {
    let child = items.slice(c*qtdStacks, qtdStacks + (qtdStacks * c));
    rows.push(child);
  };

  const columns = rows.reduce((pre, cur) => {
    cur.length >= 1 && pre[0].push(cur[0]);
    cur.length >= 2 && pre[1].push(cur[1]);
    cur.length >= 3 && pre[2].push(cur[2]);
    cur.length >= 4 && pre[3].push(cur[3]);
    
    return pre;
  }, [[], [], [], []] as [ReactNode[], ReactNode[], ReactNode[], ReactNode[]]);

  return (
    <Box
      as={m.div}
      mt={1}
      position="relative"
      display="flex"
      justifyContent="flex-start"
      mb={[0, 5]}
      maxW="99vw"
      { ...fadeToTopOnScroll }
    >
      <HStack
        alignItems="flex-start"
        justifyContent="flex-start"
        spacing={8}
      >
        {stacks.map((a, i) => {
          if(i >= items.length) {
            return null;
          };

          return (
            <Stack
              key={a} 
              spacing={1}
              mb={["20px", 0, 0, 0, 0, 0]}
            >
              {columns.length > i && columns[i].map(item => {
                return item;
              })}
            </Stack>
          );
        })}
      </HStack>
    </Box>
  );
};

export { MarkdownGrid };